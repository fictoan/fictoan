// EXTERNAL DEPS =======================================================================================================
import { useState, useEffect, useCallback, useMemo, useRef } from "react";

// INTERNAL DEPS =======================================================================================================
import {
    ListBox,
    Row,
    Portion,
    Heading6,
    Text,
    Div,
    Range,
    Card,
    Header,
    CodeBlock
} from "fictoan-react";

// DATA ================================================================================================================
import { colourOptionsWithShades, listOfColours } from "../app/colour/colours";

// Calculate the maximum length of variable names for formatting =======================================================
const findLongestVarNameLength = (variables) => {
    return Math.max(...Object.keys(variables).map(varName => varName.length + 2));
};

// COLOR VARIABLE HANDLING =============================================================================================
// Check if a CSS variable value refers to a color variable ------------------------------------------------------------
const isColorVariable = (value) => {
    // Special known text/color variables
    const knownColorVars = [
        "transparent", "link-text-default", "paragraph-text-colour", 
        "text-", "border-", "bg-", "background-", "color-", "colour-"
    ];
    
    if (value?.startsWith("var(--")) {
        const varName = value.match(/var\(--([^)]+)\)/)?.[1];
        
        // Check if it's a known color from the color list
        const isKnownColor = varName ? listOfColours.some(color => 
            varName === color || varName.startsWith(`${color}-`)) : false;
            
        // Check if it's a known text/color variable
        const isTextOrColorVar = varName ? knownColorVars.some(prefix => 
            varName === prefix || varName.startsWith(prefix)) : false;
            
        return isKnownColor || isTextOrColorVar;
    }
    return false;
};

// Extract the actual color value from a CSS variable ------------------------------------------------------------------
const extractColorValue = (value) => {
    if (value?.startsWith("var(--")) {
        const match = value.match(/var\(--([^)]+)\)/);
        return match?.[1] ?? null;
    }
    return null;
};

// NUMERICAL VARIABLE HANDLING =========================================================================================
// Check if a CSS variable contains a numerical value ------------------------------------------------------------------
const isNumericalVariable = (value) => {
    if (value?.startsWith("var(--")) {
        const varName = value.match(/var\(--([^)]+)\)/)?.[1];
        if (!varName) return false;
        const rootStyles = getComputedStyle(document.documentElement);
        const rootValue = rootStyles.getPropertyValue(`--${varName}`).trim();
        return !isNaN(parseInt(rootValue));
    }
    return !isNaN(parseInt(value));
};

// Extract numerical value from a CSS variable -------------------------------------------------------------------------
const extractNumericalValue = (value) => {
    if (value?.startsWith("var(--")) {
        const varName = value.match(/var\(--([^)]+)\)/)?.[1];
        if (!varName) return 0;
        const rootStyles = getComputedStyle(document.documentElement);
        const rootValue = rootStyles.getPropertyValue(`--${varName}`).trim();
        return parseInt(rootValue) || 0;
    }
    return parseInt(value) || 0;
};

// Extract unit suffix (px, rem, etc) from a CSS value -----------------------------------------------------------------
const extractUnitSuffix = (value) => {
    if (value?.startsWith("var(--")) {
        const varName = value.match(/var\(--([^)]+)\)/)?.[1];
        if (!varName) return "px";
        const rootStyles = getComputedStyle(document.documentElement);
        const rootValue = rootStyles.getPropertyValue(`--${varName}`).trim();
        const match = rootValue.match(/[0-9.]+([a-z%]+)/i);
        return match?.[1] || "px";
    }
    const match = value?.match(/[0-9.]+([a-z%]+)/i);
    return match?.[1] || "px";
};

// RANGE INPUT COMPONENT ///////////////////////////////////////////////////////////////////////////////////////////////
const RangeInput = ({ name, defaultValue, onChange, suffix = "px" }) => {
    const [rangeValue, setRangeValue] = useState(defaultValue);

    const handleChange = useCallback((newValue) => {
        // newValue is already a number from Range component
        setRangeValue(newValue);
        onChange(name, `${newValue}${suffix}`);
    }, [name, onChange, suffix]);

    return (
        <Range
            label={`${name}`}
            value={rangeValue}
            min={0}
            max={32}
            step={1}
            suffix={suffix}
            onChange={handleChange}
            isFullWidth
        />
    );
};

// Format CSS variables into a readable string for display =============================================================
const formatVariablesList = (vars) => {
    if (!Object.keys(vars).length) return "";

    const longestLength = findLongestVarNameLength(vars);
    const variablesList = Object.entries(vars)
        .map(([name, value]) => {
            const fullVarName = `--${name}`;
            const paddedName = fullVarName.padEnd(longestLength);
            return `${paddedName} : ${value};`;
        })
        .join("\n");

    return `/* Paste this in your theme file */\n${variablesList}`;
};

// Extract variables from theme CSS files ==============================================================================
const extractThemeVariables = (componentPrefix) => {
    const variables = {};
    
    try {
        // Iterate through all stylesheets
        Array.from(document.styleSheets).forEach(styleSheet => {
            try {
                // Skip non-CSS files or external stylesheets
                if (!styleSheet.href || !styleSheet.href.includes('.css')) return;
                
                Array.from(styleSheet.cssRules || styleSheet.rules).forEach(rule => {
                    // Look for rules containing #interactive-component or :root selectors
                    if (rule.selectorText === "#interactive-component" || rule.selectorText === ":root") {
                        // Extract CSS variables from the rule
                        Array.from(rule.style).forEach(prop => {
                            if (prop.startsWith("--")) {
                                const varName = prop.substring(2);
                                // Check if the variable matches our component prefix
                                if (Array.isArray(componentPrefix)) {
                                    // Handle multiple prefixes
                                    if (componentPrefix.some(prefix => varName.startsWith(prefix))) {
                                        const value = rule.style.getPropertyValue(prop).trim();
                                        variables[varName] = value;
                                    }
                                } else if (typeof componentPrefix === 'function') {
                                    // Handle function filter
                                    if (componentPrefix(varName)) {
                                        const value = rule.style.getPropertyValue(prop).trim();
                                        variables[varName] = value;
                                    }
                                } else if (typeof componentPrefix === 'string' && varName.startsWith(componentPrefix)) {
                                    // Handle string prefix
                                    const value = rule.style.getPropertyValue(prop).trim();
                                    variables[varName] = value;
                                }
                            }
                        });
                    }
                });
            } catch (e) {
                // Skip cross-origin stylesheets silently
            }
        });
    } catch (e) {
        console.warn("Could not read theme stylesheets:", e);
    }
    
    return variables;
};

// THEME CONFIGURATOR CREATOR //////////////////////////////////////////////////////////////////////////////////////////
export const createThemeConfigurator = (componentName, filter) => {
    // STATE AND REFS ==================================================================================================
    const [variables, setVariables] = useState({
        componentVariables: {},
        cssVariablesList: "",
    });

    const interactiveElementRef = useRef(null);
    const isInitializedRef = useRef(false);

    // CSS VARIABLE FORMATTING =========================================================================================
    // Format CSS variables into a readable string for display ---------------------------------------------------------
    const formatCSSVariablesList = useCallback((vars) => {
        return formatVariablesList(vars);
    }, []);

    // VARIABLE EXTRACTION =============================================================================================
    // Extract CSS variables from stylesheets --------------------------------------------------------------------------
    const extractVariables = useCallback(() => {
        // First try to extract variables from theme files
        const themeVars = extractThemeVariables(filter);
        
        // If we found theme variables, use them
        if (Object.keys(themeVars).length > 0) {
            return themeVars;
        }
        
        // Otherwise fall back to extracting from the component's inline styles
        const extractedVars = {};
        try {
            Array.from(document.styleSheets).forEach(styleSheet => {
                try {
                    Array.from(styleSheet.cssRules || styleSheet.rules).forEach(rule => {
                        if (rule.style && rule.selectorText === "#interactive-component") {
                            Array.from(rule.style).forEach(prop => {
                                if (prop.startsWith("--") && (!filter || filter(prop.substring(2)))) {
                                    const value = rule.style.getPropertyValue(prop).trim();
                                    extractedVars[prop.substring(2)] = value;
                                }
                            });
                        }
                    });
                } catch (e) {
                    // Skip cross-origin stylesheets silently
                }
            });
        } catch (e) {
            console.warn("Could not read stylesheets:", e);
        }
        return extractedVars;
    }, [filter]);

    // INITIALIZATION EFFECT ===========================================================================================
    useEffect(() => {
        if (!isInitializedRef.current) {
            const vars = extractVariables();
            const formattedCss = formatCSSVariablesList(vars);
            setVariables({
                componentVariables: vars,
                cssVariablesList: formattedCss,
            });
            isInitializedRef.current = true;
            
            // Apply the variables to the interactive element if it exists
            const element = interactiveElementRef.current;
            if (element) {
                Object.entries(vars).forEach(([name, value]) => {
                    element.style.setProperty(`--${name}`, value);
                });
            }
        }
    }, [extractVariables, formatCSSVariablesList]);

    // VARIABLE CHANGE HANDLER =========================================================================================
    const handleVariableChange = useCallback((varName, newValue) => {
        // Ensure newValue is a string
        const stringValue = typeof newValue === "object" ? newValue.value : String(newValue);

        // Check if the variable is a color variable
        const isColor = Object.entries(variables.componentVariables)
            .some(([name, value]) => name === varName && isColorVariable(value));

        const cssValue = isColor ? `var(--${newValue})` : newValue;
        const property = `--${varName}`;

        // Update the interactive element's styles ---------------------------------------------------------------------
        const element = interactiveElementRef.current;
        if (element) {
            element.style.setProperty(property, cssValue);

            // Handle colour-specific class updates --------------------------------------------------------------------
            if (isColor) {
                const classPrefix = varName.split("-")[0];
                const oldClasses = Array.from(element.classList)
                    .filter(cls => cls.startsWith(`${classPrefix}-`));
                oldClasses.forEach(cls => element.classList.remove(cls));

                // Only add the class if stringValue is valid
                if (stringValue && typeof stringValue === "string") {
                    element.classList.add(`${classPrefix}-${stringValue}`);
                }
            }
        }

        // Update state with new variable values -----------------------------------------------------------------------
        setVariables(prev => {
            const updatedVars = {
                ...prev.componentVariables,
                [varName]: cssValue
            };
            return {
                componentVariables: updatedVars,
                cssVariablesList: formatCSSVariablesList(updatedVars)
            };
        });
    }, [variables.componentVariables, formatCSSVariablesList]);

    // THEME CONFIGURATOR UI COMPONENT /////////////////////////////////////////////////////////////////////////////////
    const themeConfigurator = useCallback(() => {
        // Process color variables -------------------------------------------------------------------------------------
        const colorVariables = Object.entries(variables.componentVariables)
            .filter(([_, value]) => isColorVariable(value))
            .map(([varName, value]) => ({
                type: "color",
                name: varName,
                currentValue: extractColorValue(value),
                defaultValue: extractColorValue(value),
            }));

        // Process numerical variables ---------------------------------------------------------------------------------
        const numericalVariables = Object.entries(variables.componentVariables)
            .filter(([_, value]) => isNumericalVariable(value))
            .map(([varName, value]) => {
                const numValue = extractNumericalValue(value);
                const suffix = extractUnitSuffix(value);
                return {
                    type: "number",
                    name: varName,
                    currentValue: numValue,
                    defaultValue: numValue,
                    suffix,
                };
            });

        // Combine all variables ---------------------------------------------------------------------------------------
        const allVariables = [...colorVariables, ...numericalVariables];
        if (allVariables.length === 0) return null;

        // Return configurator UI component ----------------------------------------------------------------------------
        return (
            <Card padding="micro" shape="rounded">
                <Header marginBottom="micro">
                    <Heading6 style={{ marginBottom: "4px" }}>
                        Set global theme values
                    </Heading6>
                    <Text size="small">
                        This will affect all {componentName} elements
                    </Text>
                </Header>

                {/* Theme code ------------------------------------------------------------------------------------- */}
                <Row marginBottom="none">
                    <Portion>
                        <CodeBlock
                            withSyntaxHighlighting
                            source={variables.cssVariablesList}
                            language="css"
                            showCopyButton
                            marginBottom="micro"
                        />
                    </Portion>
                </Row>

                <Row marginBottom="none">
                    {allVariables.map(({ type, name, currentValue, defaultValue, suffix }) => {
                        // Render colour variable controls -------------------------------------------------------------
                        if (type === "color") {
                            const extendedOptions = [...colourOptionsWithShades];
                            if (defaultValue && !extendedOptions.find(opt => opt.value === defaultValue)) {
                                extendedOptions.unshift({
                                    customLabel: (
                                        <Div verticallyCentreItems>
                                            <Div
                                                className="color-option"
                                                bgColour={defaultValue}
                                                padding="nano"
                                                shape="rounded"
                                            />
                                            <Text marginLeft="nano">{defaultValue}</Text>
                                        </Div>
                                    ),
                                    label: defaultValue,
                                    value: defaultValue,
                                });
                            }

                            return (
                                <Portion desktopSpan="half" key={name}>
                                    <ListBox
                                        label={name}
                                        options={extendedOptions}
                                        defaultValue={defaultValue}
                                        onChange={(value) => handleVariableChange(name, value)}
                                        allowCustomEntries
                                        isFullWidth
                                    />
                                </Portion>
                            );
                        }

                        // Render numerical variable controls ----------------------------------------------------------
                        if (type === "number") {
                            return (
                                <Portion desktopSpan="half" key={name}>
                                    <RangeInput
                                        name={name}
                                        defaultValue={currentValue}
                                        onChange={handleVariableChange}
                                        suffix={suffix}
                                    />
                                </Portion>
                            );
                        }

                        return null;
                    })}
                </Row>
            </Card>
        );
    }, [variables.componentVariables, variables.cssVariablesList, handleVariableChange, componentName]);

    // Create memoized component props ---------------------------------------------------------------------------------
    const componentProps = useMemo(() => ({
        id: "interactive-component",
    }), []);

    // Return configurator interface -----------------------------------------------------------------------------------
    return {
        componentVariables: variables.componentVariables,
        componentProps,
        handleVariableChange,
        themeConfigurator,
        interactiveElementRef
    };
};
