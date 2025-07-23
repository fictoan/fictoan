// OTHER ===============================================================================================================
import { fileURLToPath } from "url";
import { join, dirname } from "path";
import { readFile, writeFile } from "fs/promises";

const __dirname = dirname(fileURLToPath(import.meta.url));

export interface EnhanceComponentParams {
    componentName   : string;
    enhancements    : {
        addLoadingState    ? : boolean;
        addDisabledState   ? : boolean;
        addSizeVariants    ? : boolean;
        addShapeVariants   ? : boolean;
        addResponsiveProps ? : boolean;
        addCustomProps     ? : string[];
        addVariants        ? : string[];
    };
    description   ? : string;
}

export async function enhanceComponentTool(params : EnhanceComponentParams) {
    try {
        const {componentName, enhancements, description = ""} = params;

        // Find the component files
        const componentsPath = join(__dirname, "../../../fictoan-react/src/components");
        const componentDir = join(componentsPath, componentName);
        const componentFile = join(componentDir, `${componentName}.tsx`);
        const cssFile = join(componentDir, `${componentName.toLowerCase()}.css`);

        // Check if component exists
        let componentContent : string;
        let cssContent : string;

        try {
            componentContent = await readFile(componentFile, "utf-8");
            cssContent = await readFile(cssFile, "utf-8");
        } catch (error) {
            return {
                content : [ {
                    type : "text",
                    text : `❌ Component '${componentName}' not found. Use the create_component tool to create new components first.`,
                } ],
            };
        }

        // Analyze existing component
        const analysis = analyzeComponent(componentContent, cssContent);
        const enhancements_applied : string[] = [];

        // Apply enhancements
        let updatedTsContent = componentContent;
        let updatedCssContent = cssContent;
        let updatedThemeVars = "";

        if (enhancements.addLoadingState && !analysis.hasLoadingState) {
            const result = addLoadingState(updatedTsContent, updatedCssContent, componentName);
            updatedTsContent = result.typescript;
            updatedCssContent = result.css;
            updatedThemeVars += result.themeVars;
            enhancements_applied.push("Loading state");
        }

        if (enhancements.addDisabledState && !analysis.hasDisabledState) {
            const result = addDisabledState(updatedTsContent, updatedCssContent, componentName);
            updatedTsContent = result.typescript;
            updatedCssContent = result.css;
            updatedThemeVars += result.themeVars;
            enhancements_applied.push("Disabled state");
        }

        if (enhancements.addSizeVariants && !analysis.hasSizeVariants) {
            const result = addSizeVariants(updatedTsContent, updatedCssContent, componentName);
            updatedTsContent = result.typescript;
            updatedCssContent = result.css;
            enhancements_applied.push("Size variants (tiny, small, medium, large, huge)");
        }

        if (enhancements.addShapeVariants && !analysis.hasShapeVariants) {
            const result = addShapeVariants(updatedTsContent, updatedCssContent, componentName);
            updatedTsContent = result.typescript;
            updatedCssContent = result.css;
            enhancements_applied.push("Shape variants (rounded, curved)");
        }

        if (enhancements.addResponsiveProps && !analysis.hasResponsiveProps) {
            const result = addResponsiveProps(updatedTsContent, componentName);
            updatedTsContent = result.typescript;
            enhancements_applied.push("Responsive props (hideOnMobile, showOnlyOnDesktop, etc.)");
        }

        if (enhancements.addCustomProps && enhancements.addCustomProps.length > 0) {
            const result = addCustomProps(updatedTsContent, enhancements.addCustomProps);
            updatedTsContent = result.typescript;
            enhancements_applied.push(`Custom props: ${enhancements.addCustomProps.join(", ")}`);
        }

        if (enhancements.addVariants && enhancements.addVariants.length > 0) {
            const result = addVariants(updatedTsContent, updatedCssContent, componentName, enhancements.addVariants);
            updatedTsContent = result.typescript;
            updatedCssContent = result.css;
            enhancements_applied.push(`New variants: ${enhancements.addVariants.join(", ")}`);
        }

        // Write updated files
        if (enhancements_applied.length > 0) {
            await writeFile(componentFile, updatedTsContent);
            await writeFile(cssFile, updatedCssContent);

            // Add theme variables if any
            if (updatedThemeVars.trim()) {
                await updateThemeFile(componentName, updatedThemeVars);
            }
        }

        if (enhancements_applied.length === 0) {
            return {
                content : [ {
                    type : "text",
                    text : `ℹ️ **${componentName} already has the requested enhancements**

The component already includes all the features you requested. No changes were made.

**Current features:**
- Loading state: ${analysis.hasLoadingState ? "✓" : "✗"}
- Disabled state: ${analysis.hasDisabledState ? "✓" : "✗"}
- Size variants: ${analysis.hasSizeVariants ? "✓" : "✗"}
- Shape variants: ${analysis.hasShapeVariants ? "✓" : "✗"}
- Responsive props: ${analysis.hasResponsiveProps ? "✓" : "✗"}`,
                } ],
            };
        }

        return {
            content : [ {
                type : "text",
                text : `✅ **${componentName} enhanced successfully!**

**Enhancements applied:**
${enhancements_applied.map(e => `- ${e}`).join("\n")}

**Files updated:**
- ${componentName}.tsx (TypeScript interface and component logic)
- ${componentName.toLowerCase()}.css (styles and variants)
${updatedThemeVars ? `- theme.css (new CSS variables)` : ""}

**Next steps:**
1. Run \`yarn rebuild\` to build the enhanced component
2. Test the new features in your application
3. Update documentation if needed

${description ? `\n**Enhancement notes:** ${description}` : ""}`,
            } ],
        };

    } catch (error) {
        return {
            content : [ {
                type : "text",
                text : `❌ Error enhancing component: ${error instanceof Error ? error.message : "Unknown error"}`,
            } ],
        };
    }
}

interface ComponentAnalysis {
    hasLoadingState    : boolean;
    hasDisabledState   : boolean;
    hasSizeVariants    : boolean;
    hasShapeVariants   : boolean;
    hasResponsiveProps : boolean;
    currentProps       : string[];
}

function analyzeComponent(tsContent : string, cssContent : string) : ComponentAnalysis {
    return {
        hasLoadingState    : tsContent.includes("isLoading") && cssContent.includes("is-loading"),
        hasDisabledState   : tsContent.includes("isDisabled") && cssContent.includes("is-disabled"),
        hasSizeVariants    : tsContent.includes("size?:") && cssContent.includes(".size-"),
        hasShapeVariants   : tsContent.includes("shape?:") && cssContent.includes(".shape-"),
        hasResponsiveProps : tsContent.includes("hideOnMobile") || tsContent.includes("showOnlyOnDesktop"),
        currentProps       : extractProps(tsContent),
    };
}

function extractProps(tsContent : string) : string[] {
    const propsMatch = tsContent.match(/interface\s+\w+Props[^{]*{([^}]+)}/s);
    if (!propsMatch) return [];

    const propsText = propsMatch[1];
    const propLines = propsText.split("\n").filter(line => line.includes(":")).map(line => {
        const match = line.match(/^\s*(\w+)\s*\??\s*:/);
        return match ? match[1] : null;
    }).filter(Boolean);

    return propLines as string[];
}

function addLoadingState(tsContent : string, cssContent : string, componentName : string) {
    // Add isLoading prop to interface
    const propsInterfaceRegex = /(interface\s+\w+Props[^{]*{[^}]*)(})/s;
    const updatedTs = tsContent.replace(propsInterfaceRegex, (match, before, after) => {
        if (match.includes("isLoading")) return match;
        return `${before}    isLoading?: boolean;\n${after}`;
    });

    // Add isLoading to component props and logic
    const componentRegex = /(\({ [^}]*)(\} = props, ref)/s;
    const tsWithLoadingProp = updatedTs.replace(componentRegex, (match, before, after) => {
        if (match.includes("isLoading")) return match;
        return `${before}, isLoading${after}`;
    });

    // Add loading className logic
    const classNameLogicRegex = /(let classNames = \[\];[\s\S]*?)(return \()/;
    const tsWithLoadingLogic = tsWithLoadingProp.replace(classNameLogicRegex, (match, before, after) => {
        if (match.includes("isLoading")) return match;
        return `${before}
        if (isLoading) {
            classNames.push("is-loading");
        }
        ${after}`;
    });

    // Add CSS for loading state
    const cssWithLoading = cssContent + `

/* LOADING STATE ========================================================================================= */
[data-${componentName.toLowerCase()}].is-loading {
    pointer-events: none;
    opacity: 0.7;
    cursor: not-allowed;
}

[data-${componentName.toLowerCase()}].is-loading::after {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    width: 16px;
    height: 16px;
    margin: -8px 0 0 -8px;
    border: 2px solid var(--${componentName.toLowerCase()}-spinner-loading, var(--hue));
    border-top-color: transparent;
    border-radius: 50%;
    animation: spin 1s linear infinite;
}

@keyframes spin {
    to { transform: rotate(360deg); }
}`;

    const themeVars = `
    --${componentName.toLowerCase()}-spinner-loading         : var(--hue);`;

    return {
        typescript : tsWithLoadingLogic,
        css        : cssWithLoading,
        themeVars,
    };
}

function addDisabledState(tsContent : string, cssContent : string, componentName : string) {
    // Add isDisabled prop to interface
    const propsInterfaceRegex = /(interface\s+\w+Props[^{]*{[^}]*)(})/s;
    const updatedTs = tsContent.replace(propsInterfaceRegex, (match, before, after) => {
        if (match.includes("isDisabled")) return match;
        return `${before}    isDisabled?: boolean;\n${after}`;
    });

    // Add isDisabled to component props and logic
    const componentRegex = /(\({ [^}]*)(\} = props, ref)/s;
    const tsWithDisabledProp = updatedTs.replace(componentRegex, (match, before, after) => {
        if (match.includes("isDisabled")) return match;
        return `${before}, isDisabled${after}`;
    });

    // Add disabled className logic and aria-disabled
    const classNameLogicRegex = /(let classNames = \[\];[\s\S]*?)(return \()/;
    const tsWithDisabledLogic = tsWithDisabledProp.replace(classNameLogicRegex, (match, before, after) => {
        if (match.includes("isDisabled")) return match;
        return `${before}
        if (isDisabled) {
            classNames.push("is-disabled");
        }
        ${after}`;
    });

    // Add aria-disabled to Element
    const elementRegex = /(<Element<[^>]+>[^>]*)((\s+{\.\.\.props}\s+\/>)|(>))/;
    const tsWithAriaDisabled = tsWithDisabledLogic.replace(elementRegex, (match, before, after) => {
        if (match.includes("aria-disabled")) return match;
        return `${before}
                aria-disabled={isDisabled}${after}`;
    });

    // Add CSS for disabled state
    const cssWithDisabled = cssContent + `

/* DISABLED STATE ======================================================================================== */
[data-${componentName.toLowerCase()}].is-disabled {
    pointer-events: none;
    opacity: 0.5;
    cursor: not-allowed;
    background-color: var(--${componentName.toLowerCase()}-bg-disabled);
    color: var(--${componentName.toLowerCase()}-text-disabled);
    border-color: var(--${componentName.toLowerCase()}-border-disabled);
}`;

    const themeVars = `
    --${componentName.toLowerCase()}-bg-disabled             : var(--slate-light60);
    --${componentName.toLowerCase()}-text-disabled           : var(--slate);
    --${componentName.toLowerCase()}-border-disabled         : var(--slate-light60);`;

    return {
        typescript : tsWithAriaDisabled,
        css        : cssWithDisabled,
        themeVars,
    };
}

function addSizeVariants(tsContent : string, cssContent : string, componentName : string) {
    // Add size prop to interface
    const propsInterfaceRegex = /(interface\s+\w+Props[^{]*{[^}]*)(})/s;
    const updatedTs = tsContent.replace(propsInterfaceRegex, (match, before, after) => {
        if (match.includes("size?:")) return match;
        return `${before}    size?: "nano" | "micro" | "tiny" | "small" | "medium" | "large" | "huge";\n${after}`;
    });

    // Add size to component props and logic
    const componentRegex = /(\({ [^}]*)(\} = props, ref)/s;
    const tsWithSizeProp = updatedTs.replace(componentRegex, (match, before, after) => {
        if (match.includes("size")) return match;
        return `${before}, size = "medium"${after}`;
    });

    // Add size className logic
    const classNameLogicRegex = /(let classNames = \[\];[\s\S]*?)(return \()/;
    const tsWithSizeLogic = tsWithSizeProp.replace(classNameLogicRegex, (match, before, after) => {
        if (match.includes("size")) return match;
        return `${before}
        if (size) {
            classNames.push(\`size-\${size}\`);
        }
        ${after}`;
    });

    // Add CSS for size variants
    const cssWithSizes = cssContent + `

/* SIZE VARIANTS ========================================================================================= */
[data-${componentName.toLowerCase()}].size-nano {
    padding: var(--nano);
    font-size: var(--text-nano);
}

[data-${componentName.toLowerCase()}].size-micro {
    padding: var(--micro);
    font-size: var(--text-micro);
}

[data-${componentName.toLowerCase()}].size-tiny {
    padding: var(--tiny);
    font-size: var(--text-tiny);
}

[data-${componentName.toLowerCase()}].size-small {
    padding: var(--small);
    font-size: var(--text-small);
}

[data-${componentName.toLowerCase()}].size-medium {
    padding: var(--medium);
    font-size: var(--text-medium);
}

[data-${componentName.toLowerCase()}].size-large {
    padding: var(--large);
    font-size: var(--text-large);
}

[data-${componentName.toLowerCase()}].size-huge {
    padding: var(--huge);
    font-size: var(--text-huge);
}`;

    return {
        typescript : tsWithSizeLogic,
        css        : cssWithSizes,
    };
}

function addShapeVariants(tsContent : string, cssContent : string, componentName : string) {
    // Add shape prop to interface
    const propsInterfaceRegex = /(interface\s+\w+Props[^{]*{[^}]*)(})/s;
    const updatedTs = tsContent.replace(propsInterfaceRegex, (match, before, after) => {
        if (match.includes("shape?:")) return match;
        return `${before}    shape?: "rounded" | "curved";\n${after}`;
    });

    // Add shape to component props and logic
    const componentRegex = /(\({ [^}]*)(\} = props, ref)/s;
    const tsWithShapeProp = updatedTs.replace(componentRegex, (match, before, after) => {
        if (match.includes("shape")) return match;
        return `${before}, shape${after}`;
    });

    // Add shape className logic
    const classNameLogicRegex = /(let classNames = \[\];[\s\S]*?)(return \()/;
    const tsWithShapeLogic = tsWithShapeProp.replace(classNameLogicRegex, (match, before, after) => {
        if (match.includes("shape")) return match;
        return `${before}
        if (shape) {
            classNames.push(\`shape-\${shape}\`);
        }
        ${after}`;
    });

    // Add CSS for shape variants
    const cssWithShapes = cssContent + `

/* SHAPE VARIANTS ======================================================================================== */
[data-${componentName.toLowerCase()}].shape-rounded {
    border-radius: var(--global-border-radius);
}

[data-${componentName.toLowerCase()}].shape-curved {
    border-radius: var(--global-border-radius-curved);
}`;

    return {
        typescript : tsWithShapeLogic,
        css        : cssWithShapes,
    };
}

function addResponsiveProps(tsContent : string, componentName : string) {
    // This would add common responsive props from CommonAndHTMLProps
    // Since these are already available through Element inheritance,
    // we just need to document that they're available

    return {
        typescript : tsContent, // No changes needed - already inherited from CommonAndHTMLProps
    };
}

function addCustomProps(tsContent : string, customProps : string[]) {
    // Add custom props to interface
    const propsInterfaceRegex = /(interface\s+\w+Props[^{]*{[^}]*)(})/s;
    const updatedTs = tsContent.replace(propsInterfaceRegex, (match, before, after) => {
        const newProps = customProps.map(prop => `    ${prop}?: string;`).join("\n");
        return `${before}${newProps}\n${after}`;
    });

    return {
        typescript : updatedTs,
    };
}

function addVariants(tsContent : string, cssContent : string, componentName : string, variants : string[]) {
    // Add variant prop to interface
    const propsInterfaceRegex = /(interface\s+\w+Props[^{]*{[^}]*)(})/s;
    const variantOptions = variants.map(v => `"${v}"`).join(" | ");
    const updatedTs = tsContent.replace(propsInterfaceRegex, (match, before, after) => {
        if (match.includes("variant?:")) {
            // Update existing variant prop
            return match.replace(/variant\?:\s*[^;]+;/, `variant?: ${variantOptions};`);
        } else {
            // Add new variant prop
            return `${before}    variant?: ${variantOptions};\n${after}`;
        }
    });

    // Add variant to component props and logic
    const componentRegex = /(\({ [^}]*)(\} = props, ref)/s;
    const tsWithVariantProp = updatedTs.replace(componentRegex, (match, before, after) => {
        if (match.includes("variant")) return match;
        return `${before}, variant${after}`;
    });

    // Add variant className logic
    const classNameLogicRegex = /(let classNames = \[\];[\s\S]*?)(return \()/;
    const tsWithVariantLogic = tsWithVariantProp.replace(classNameLogicRegex, (match, before, after) => {
        if (match.includes("variant")) return match;
        return `${before}
        if (variant) {
            classNames.push(\`variant-\${variant}\`);
        }
        ${after}`;
    });

    // Add CSS for variants
    const variantCss = variants.map(variant => `
[data-${componentName.toLowerCase()}].variant-${variant} {
    /* Add specific styles for ${variant} variant */
    background-color: var(--${componentName.toLowerCase()}-variant-${variant}-bg, var(--hue));
    color: var(--${componentName.toLowerCase()}-variant-${variant}-text, var(--white));
    border-color: var(--${componentName.toLowerCase()}-variant-${variant}-border, var(--hue));
}`).join("");

    const cssWithVariants = cssContent + `

/* VARIANT STYLES ======================================================================================== */${variantCss}`;

    return {
        typescript : tsWithVariantLogic,
        css        : cssWithVariants,
    };
}

async function updateThemeFile(componentName : string, themeVariables : string) {
    const themePath = join(__dirname, "../../../fictoan-react/src/styles/theme.css");

    try {
        const currentContent = await readFile(themePath, "utf-8");

        // Check if component variables already exist
        const componentVarRegex = new RegExp(`/\\* ${componentName.toUpperCase()} [=]+`);
        if (componentVarRegex.test(currentContent)) {
            // Update existing variables
            const componentSectionRegex = new RegExp(
                `(/\\* ${componentName.toUpperCase()} [=]+[\\s\\S]*?:root \\{[\\s\\S]*?)(\\})`,
            );
            const updatedContent = currentContent.replace(componentSectionRegex, (match, before, after) => {
                return before + themeVariables + "\n" + after;
            });
            await writeFile(themePath, updatedContent);
        } else {
            // Add new variables section
            const newSection = `\n\n/* ${componentName.toUpperCase()} ============================================================================================= */\n:root {${themeVariables}\n}`;
            const updatedContent = currentContent + newSection;
            await writeFile(themePath, updatedContent);
        }
    } catch (error) {
        console.error("Failed to update theme file:", error);
    }
}