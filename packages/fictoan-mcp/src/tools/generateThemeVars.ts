// OTHER ===============================================================================================================
import { globby } from "globby";
import { join, dirname } from "path";
import { mkdir } from "fs/promises";
import { readFile, writeFile } from "fs/promises";

interface ThemeVariableConfig {
    componentName     : string;
    baseVariables     : string[];
    stateVariations ? : string[];
    colorModifiers  ? : string[];
    customVariables ? : { [key : string] : string };
}

interface GeneratedVariable {
    name        : string;
    value       : string;
    description : string;
    category    : "base" | "state" | "color" | "custom";
}

export async function generateThemeVarsTool(args : {
    componentName : string;
    baseVariables? : string[];
    includeStates? : boolean;
    includeColorModifiers? : boolean;
    customVariables? : { [key : string] : string };
    outputToGlobalTheme? : boolean;
}) : Promise<{
    content : [ {
        type : "text";
        text : string;
    } ];
}> {
    try {
        const {
                  componentName,
                  baseVariables         = [],
                  includeStates         = true,
                  includeColorModifiers = true,
                  customVariables       = {},
                  outputToGlobalTheme   = false,
              } = args;

        // Check if component exists
        const componentPath = await findComponentPath(componentName);
        if (!componentPath) {
            return {
                content : [ {
                    type : "text",
                    text : `❌ Component "${componentName}" not found`,
                } ],
            };
        }

        // Generate theme variables
        const config : ThemeVariableConfig = {
            componentName,
            baseVariables   : baseVariables.length > 0 ? baseVariables : getDefaultBaseVariables(componentName),
            stateVariations : includeStates ? getDefaultStateVariations() : undefined,
            colorModifiers  : includeColorModifiers ? getDefaultColorModifiers() : undefined,
            customVariables,
        };

        const generatedVars = await generateVariables(config);

        // Generate CSS content
        const cssContent = generateCSSContent(componentName, generatedVars);

        // Write to component CSS file or global theme
        if (outputToGlobalTheme) {
            await addToGlobalTheme(componentName, generatedVars);
        } else {
            await writeToComponentCSS(componentPath, cssContent);
        }

        // Generate report
        const report = generateThemeVarReport(componentName, generatedVars, outputToGlobalTheme);

        return {
            content : [ {
                type : "text",
                text : report,
            } ],
        };

    } catch (error) {
        return {
            content : [ {
                type : "text",
                text : `❌ Error generating theme variables: ${error instanceof Error ? error.message : String(error)}`,
            } ],
        };
    }
}

async function findComponentPath(componentName : string) : Promise<string | null> {
    const patterns = [
        `../fictoan-react/src/components/**/${componentName}.tsx`,
        `../fictoan-react/src/components/**/${componentName}/*.tsx`,
    ];

    const files = await globby(patterns, {
        cwd      : process.cwd(),
        absolute : true,
    });

    return files.find(file => !file.endsWith("index.tsx")) || null;
}

function getDefaultBaseVariables(componentName : string) : string[] {
    const component = componentName.toLowerCase();

    // Component-specific defaults
    const componentDefaults : { [key : string] : string[] } = {
        button    : [ "bg", "color", "border", "border-radius", "padding", "font-size", "font-weight" ],
        card      : [ "bg", "border", "border-radius", "padding", "shadow", "color" ],
        input     : [ "bg", "border", "border-radius", "padding", "color", "placeholder-color" ],
        modal     : [ "bg", "overlay-bg", "border-radius", "shadow", "color", "backdrop-filter" ],
        toast     : [ "bg", "color", "border", "border-radius", "shadow", "transform" ],
        badge     : [ "bg", "color", "border-radius", "padding", "font-size", "font-weight" ],
        tab       : [ "bg", "color", "border", "active-bg", "active-color" ],
        accordion : [ "bg", "color", "border", "header-bg", "content-bg" ],
        tooltip   : [ "bg", "color", "border-radius", "padding", "font-size", "shadow" ],
    };

    return componentDefaults[component] || [ "bg", "color", "border", "border-radius", "padding" ];
}

function getDefaultStateVariations() : string[] {
    return [ "default", "hover", "active", "focus", "disabled" ];
}

function getDefaultColorModifiers() : string[] {
    return [ "light", "dark", "transparent" ];
}

async function generateVariables(config : ThemeVariableConfig) : Promise<GeneratedVariable[]> {
    const variables : GeneratedVariable[] = [];
    const prefix = `--${config.componentName.toLowerCase()}`;

    // Base variables
    config.baseVariables.forEach(baseVar => {
        variables.push({
            name        : `${prefix}-${baseVar}`,
            value       : getDefaultValue(baseVar),
            description : `Base ${baseVar} for ${config.componentName}`,
            category    : "base",
        });
    });

    // State variations
    if (config.stateVariations) {
        config.baseVariables.forEach(baseVar => {
            config.stateVariations!.forEach(state => {
                if (state !== "default") { // Skip default as it's covered by base
                    variables.push({
                        name        : `${prefix}-${state}-${baseVar}`,
                        value       : getStateValue(baseVar, state),
                        description : `${state.charAt(0)
                            .toUpperCase() + state.slice(1)} ${baseVar} for ${config.componentName}`,
                        category    : "state",
                    });
                }
            });
        });
    }

    // Color modifiers
    if (config.colorModifiers) {
        const colorVars = config.baseVariables.filter(v =>
            v.includes("color") || v.includes("bg") || v === "border",
        );

        colorVars.forEach(colorVar => {
            config.colorModifiers!.forEach(modifier => {
                variables.push({
                    name        : `${prefix}-${colorVar}-${modifier}`,
                    value       : getColorModifierValue(colorVar, modifier),
                    description : `${modifier.charAt(0)
                        .toUpperCase() + modifier.slice(1)} ${colorVar} variant for ${config.componentName}`,
                    category    : "color",
                });
            });
        });
    }

    // Custom variables
    Object.entries(config.customVariables || {}).forEach(([ key, value ]) => {
        variables.push({
            name        : `${prefix}-${key}`,
            value,
            description : `Custom ${key} for ${config.componentName}`,
            category    : "custom",
        });
    });

    return variables;
}

function getDefaultValue(variable : string) : string {
    const defaults : { [key : string] : string } = {
        "bg"                : "var(--ff-color-surface)",
        "color"             : "var(--ff-color-text)",
        "border"            : "1px solid var(--ff-color-border)",
        "border-radius"     : "var(--ff-radius-default)",
        "padding"           : "var(--ff-space-medium)",
        "font-size"         : "var(--ff-text-size-medium)",
        "font-weight"       : "var(--ff-text-weight-normal)",
        "shadow"            : "var(--ff-shadow-default)",
        "placeholder-color" : "var(--ff-color-text-light)",
        "overlay-bg"        : "var(--ff-color-overlay)",
        "backdrop-filter"   : "blur(8px)",
        "transform"         : "translateY(0)",
        "active-bg"         : "var(--ff-color-accent)",
        "active-color"      : "var(--ff-color-accent-text)",
        "header-bg"         : "var(--ff-color-surface-alt)",
        "content-bg"        : "var(--ff-color-surface)",
    };

    return defaults[variable] || "inherit";
}

function getStateValue(variable : string, state : string) : string {
    const stateValues : { [key : string] : { [key : string] : string } } = {
        hover    : {
            "bg"        : "var(--ff-color-surface-hover)",
            "color"     : "var(--ff-color-text-hover)",
            "border"    : "1px solid var(--ff-color-border-hover)",
            "shadow"    : "var(--ff-shadow-hover)",
            "transform" : "translateY(-1px)",
        },
        active   : {
            "bg"        : "var(--ff-color-surface-active)",
            "color"     : "var(--ff-color-text-active)",
            "border"    : "1px solid var(--ff-color-border-active)",
            "shadow"    : "var(--ff-shadow-active)",
            "transform" : "translateY(0)",
        },
        focus    : {
            "bg"     : "var(--ff-color-surface-focus)",
            "border" : "2px solid var(--ff-color-accent)",
            "shadow" : "0 0 0 2px var(--ff-color-accent-alpha)",
        },
        disabled : {
            "bg"      : "var(--ff-color-surface-disabled)",
            "color"   : "var(--ff-color-text-disabled)",
            "border"  : "1px solid var(--ff-color-border-disabled)",
            "shadow"  : "none",
            "opacity" : "0.6",
        },
    };

    return stateValues[state]?.[variable] || getDefaultValue(variable);
}

function getColorModifierValue(variable : string, modifier : string) : string {
    const modifierValues : { [key : string] : { [key : string] : string } } = {
        light       : {
            "bg"     : "color-mix(in srgb, var(--ff-color-surface) 80%, white)",
            "color"  : "var(--ff-color-text-light)",
            "border" : "1px solid var(--ff-color-border-light)",
        },
        dark        : {
            "bg"     : "color-mix(in srgb, var(--ff-color-surface) 80%, black)",
            "color"  : "var(--ff-color-text-dark)",
            "border" : "1px solid var(--ff-color-border-dark)",
        },
        transparent : {
            "bg"     : "transparent",
            "border" : "1px solid transparent",
        },
    };

    return modifierValues[modifier]?.[variable] || getDefaultValue(variable);
}

function generateCSSContent(componentName : string, variables : GeneratedVariable[]) : string {
    const className = `.ff-${componentName.toLowerCase()}`;
    let css = `/* ${componentName} Theme Variables */\n\n`;

    css += `${className} {\n`;

    // Group variables by category
    const categories = [ "base", "state", "color", "custom" ];

    categories.forEach(category => {
        const categoryVars = variables.filter(v => v.category === category);
        if (categoryVars.length > 0) {
            css += `  /* ${category.charAt(0).toUpperCase() + category.slice(1)} variables */\n`;
            categoryVars.forEach(variable => {
                css += `  ${variable.name}: ${variable.value};\n`;
            });
            css += `\n`;
        }
    });

    css += `}\n\n`;

    // Add state-specific selectors
    const stateVars = variables.filter(v => v.category === "state");
    if (stateVars.length > 0) {
        const states = [ "hover", "active", "focus", "disabled" ];

        states.forEach(state => {
            const stateVariables = stateVars.filter(v => v.name.includes(`-${state}-`));
            if (stateVariables.length > 0) {
                const selector = state === "disabled"
                    ? `${className}[disabled], ${className}[aria-disabled="true"]`
                    : `${className}:${state}`;

                css += `${selector} {\n`;
                stateVariables.forEach(variable => {
                    const baseVarName = variable.name.replace(`-${state}`, "");
                    css += `  ${baseVarName}: ${variable.value};\n`;
                });
                css += `}\n\n`;
            }
        });
    }

    // Add utility classes for color modifiers
    const colorVars = variables.filter(v => v.category === "color");
    if (colorVars.length > 0) {
        const modifiers = [ "light", "dark", "transparent" ];

        modifiers.forEach(modifier => {
            const modifierVars = colorVars.filter(v => v.name.includes(`-${modifier}`));
            if (modifierVars.length > 0) {
                css += `${className}.${modifier} {\n`;
                modifierVars.forEach(variable => {
                    const baseVarName = variable.name.replace(`-${modifier}`, "");
                    css += `  ${baseVarName}: ${variable.value};\n`;
                });
                css += `}\n\n`;
            }
        });
    }

    return css;
}

async function writeToComponentCSS(componentPath : string, cssContent : string) : Promise<void> {
    const cssPath = componentPath.replace(".tsx", ".css");

    try {
        // Try to read existing CSS file
        const existingCSS = await readFile(cssPath, "utf-8");

        // Check if theme variables already exist
        if (existingCSS.includes("/* Theme Variables */") || existingCSS.includes("Theme Variables")) {
            // Replace existing theme variables section
            const updatedCSS = existingCSS.replace(
                /\/\* .* Theme Variables \*\/[\s\S]*?(?=\/\*|$)/,
                cssContent,
            );
            await writeFile(cssPath, updatedCSS);
        } else {
            // Prepend theme variables to existing CSS
            await writeFile(cssPath, cssContent + "\n" + existingCSS);
        }
    } catch (error) {
        // CSS file doesn't exist, create it
        await mkdir(dirname(cssPath), {recursive : true});
        await writeFile(cssPath, cssContent);
    }
}

async function addToGlobalTheme(componentName : string, variables : GeneratedVariable[]) : Promise<void> {
    const themePath = "../fictoan-react/src/styles/theme.css";

    try {
        const existingTheme = await readFile(themePath, "utf-8");

        let themeSection = `\n/* ${componentName} Component Variables */\n:root {\n`;
        variables.forEach(variable => {
            themeSection += `  ${variable.name}: ${variable.value}; /* ${variable.description} */\n`;
        });
        themeSection += `}\n`;

        // Check if component variables already exist in theme
        const componentSectionRegex = new RegExp(`\\/\\* ${componentName} Component Variables \\*\\/[\\s\\S]*?(?=\\/\\*|$)`);

        if (componentSectionRegex.test(existingTheme)) {
            // Replace existing section
            const updatedTheme = existingTheme.replace(componentSectionRegex, themeSection.trim());
            await writeFile(themePath, updatedTheme);
        } else {
            // Append to end of file
            await writeFile(themePath, existingTheme + themeSection);
        }
    } catch (error) {
        throw new Error(`Failed to update global theme: ${error}`);
    }
}

function generateThemeVarReport(componentName : string, variables : GeneratedVariable[], isGlobal : boolean) : string {
    let report = `# Theme Variables Generated for ${componentName}\n\n`;

    report += `**Total Variables Generated**: ${variables.length}\n`;
    report += `**Output Location**: ${isGlobal ? "Global theme file" : "Component CSS file"}\n\n`;

    // Summary by category
    const categories = [ "base", "state", "color", "custom" ];
    categories.forEach(category => {
        const categoryVars = variables.filter(v => v.category === category);
        if (categoryVars.length > 0) {
            report += `**${category.charAt(0).toUpperCase() + category.slice(1)} Variables**: ${categoryVars.length}\n`;
        }
    });

    report += `\n## Generated Variables\n\n`;

    // Group and display variables
    categories.forEach(category => {
        const categoryVars = variables.filter(v => v.category === category);
        if (categoryVars.length > 0) {
            report += `### ${category.charAt(0).toUpperCase() + category.slice(1)} Variables\n\n`;

            categoryVars.forEach(variable => {
                report += `- \`${variable.name}\`: \`${variable.value}\`\n`;
                report += `  *${variable.description}*\n\n`;
            });
        }
    });

    // Usage examples
    report += `## Usage Examples\n\n`;
    report += `### In CSS\n\`\`\`css\n`;
    report += `.my-custom-${componentName.toLowerCase()} {\n`;
    report += `  background: var(--${componentName.toLowerCase()}-bg);\n`;
    report += `  color: var(--${componentName.toLowerCase()}-color);\n`;
    report += `  border: var(--${componentName.toLowerCase()}-border);\n`;
    report += `}\n\`\`\`\n\n`;

    report += `### In Component\n\`\`\`tsx\n`;
    report += `<${componentName}\n`;
    report += `  style={{\n`;
    report += `    '--${componentName.toLowerCase()}-bg': 'var(--ff-color-accent)',\n`;
    report += `    '--${componentName.toLowerCase()}-color': 'white'\n`;
    report += `  } as React.CSSProperties}\n`;
    report += `>\n`;
    report += `  Custom themed ${componentName.toLowerCase()}\n`;
    report += `</${componentName}>\n`;
    report += `\`\`\`\n\n`;

    // Best practices
    report += `## Best Practices\n\n`;
    report += `1. **Consistency**: Use the generated variables instead of hardcoded values\n`;
    report += `2. **Customization**: Override variables using CSS custom properties\n`;
    report += `3. **States**: Leverage state-specific variables for interactive components\n`;
    report += `4. **Theme Integration**: All variables reference global Fictoan theme tokens\n`;
    report += `5. **Performance**: CSS custom properties enable efficient runtime theming\n\n`;

    report += `✅ Theme variables successfully generated and integrated!`;

    return report;
}