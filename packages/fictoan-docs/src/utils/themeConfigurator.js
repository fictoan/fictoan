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
    CodeBlock,
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
    // IMPORTANT: Check for numeric values and numeric strings - these are NEVER colors
    if (typeof value === 'number') {
        return false;
    }
    
    if (typeof value === 'string') {
        // If it's just a number (like "20") it's not a color
        if (/^\d+$/.test(value)) {
            return false;
        }
        
        // If it's a var(--XX) where XX is just a number, it's not a color
        if (value.startsWith("var(--")) {
            const varMatch = value.match(/var\(--(\d+)[^)]*\)/);
            if (varMatch) {
                console.log(`Detected var(--number) which is NOT a color: ${value}`);
                return false;
            }
        }
    }

    // Special known text/color variables
    const knownColorVars = [
        "transparent", "link-text-default", "paragraph-text-colour",
        "text-", "border-", "bg-", "background-", "color-", "colour-",
        "focus-color", "disabled", "hover",
    ];

    if (value?.startsWith("var(--")) {
        const varName = value.match(/var\(--([^)]+)\)/)?.[1];
        
        // If varName is purely numeric, it can't be a color
        if (varName && /^\d+$/.test(varName)) {
            console.log(`Variable name ${varName} is just a number, not a color`);
            return false;
        }

        // Check if it's a known color from the color list
        const isKnownColor = varName ? listOfColours.some(color =>
            varName === color || varName.startsWith(`${color}-`)) : false;

        // Check if it's a known text/color variable
        const isTextOrColorVar = varName ? knownColorVars.some(prefix =>
            varName === prefix || varName.startsWith(prefix) || varName.includes(prefix)) : false;

        // If it refers to another variable, try to resolve that variable    
        if (!isKnownColor && !isTextOrColorVar && varName) {
            try {
                const rootStyles = getComputedStyle(document.documentElement);
                const rootValue = rootStyles.getPropertyValue(`--${varName}`).trim();
                // Recursively check if the referenced variable is a color
                return isColorVariable(rootValue);
            } catch (e) {
                console.warn("Error resolving variable:", e);
            }
        }

        return isKnownColor || isTextOrColorVar;
    }
    return false;
};

// Extract the actual color value from a CSS variable ------------------------------------------------------------------
const extractColorValue = (value) => {
    if (value?.startsWith("var(--")) {
        const match = value.match(/var\(--([^)]+)\)/);
        const varName = match?.[1];

        if (varName) {
            // If the variable references another variable, resolve it
            try {
                const rootStyles = getComputedStyle(document.documentElement);
                const rootValue = rootStyles.getPropertyValue(`--${varName}`).trim();

                // If the root value is also a variable reference, resolve it recursively
                if (rootValue.startsWith("var(--")) {
                    return extractColorValue(rootValue);
                }

                // For displaying in the UI, we want to show the variable name, not the computed value
                return varName;
            } catch (e) {
                console.warn("Error resolving variable value:", e);
            }
        }

        return varName ?? null;
    }
    return null;
};

// NUMERICAL VARIABLE HANDLING =========================================================================================
// Check if a CSS variable contains a numerical value ------------------------------------------------------------------
const isNumericalVariable = (value) => {
    if (value?.startsWith("var(--")) {
        const varName = value.match(/var\(--([^)]+)\)/)?.[1];
        if (!varName) return false;

        try {
            const rootStyles = getComputedStyle(document.documentElement);
            const rootValue = rootStyles.getPropertyValue(`--${varName}`).trim();

            // If the root value is also a variable reference, resolve it recursively
            if (rootValue.startsWith("var(--")) {
                return isNumericalVariable(rootValue);
            }

            // Check if the value contains a number with unit
            return /^-?\d+(\.\d+)?(px|rem|em|vh|vw|%)$/.test(rootValue);
        } catch (e) {
            console.warn("Error checking numerical variable:", e);
            return false;
        }
    }
    return !isNaN(parseInt(value));
};

// Extract numerical value from a CSS variable -------------------------------------------------------------------------
const extractNumericalValue = (value) => {
    if (value?.startsWith("var(--")) {
        const varName = value.match(/var\(--([^)]+)\)/)?.[1];
        if (!varName) return 0;

        try {
            // Get the computed style value from the document
            const rootStyles = getComputedStyle(document.documentElement);

            // Get the computed value - this returns the actual pixel value
            const computedValue = rootStyles.getPropertyValue(`--${varName}`).trim();

            // Try to parse the value - if it's another variable reference, resolve it recursively
            if (computedValue.startsWith("var(--")) {
                return extractNumericalValue(computedValue);
            }

            // Try to parse the computed value directly
            const numericPart = computedValue.match(/^(-?\d+\.?\d*)/);
            if (numericPart && numericPart[1]) {
                return parseFloat(numericPart[1]);
            }

            // If we still can't parse it, return a default value
            return 0;
        } catch (e) {
            console.warn("Error extracting numerical value:", e);
            return 0;
        }
    }
    // For direct numeric values (not variable references)
    const numericPart = value?.match(/^(-?\d+\.?\d*)/);
    return numericPart ? parseFloat(numericPart[1]) : 0;
};

// Extract unit suffix (px, rem, etc) from a CSS value -----------------------------------------------------------------
const extractUnitSuffix = (value) => {
    if (value?.startsWith("var(--")) {
        const varName = value.match(/var\(--([^)]+)\)/)?.[1];
        if (!varName) return "px";

        try {
            const rootStyles = getComputedStyle(document.documentElement);
            const rootValue = rootStyles.getPropertyValue(`--${varName}`).trim();

            // If the root value is also a variable reference, resolve it recursively
            if (rootValue.startsWith("var(--")) {
                return extractUnitSuffix(rootValue);
            }

            const match = rootValue.match(/\d+([a-z%]+)/i);
            return match?.[1] || "px";
        } catch (e) {
            console.warn("Error extracting unit suffix:", e);
            return "px";
        }
    }
    const match = value?.match(/\d+([a-z%]+)/i);
    return match?.[1] || "px";
};

// Simple range input component that directly uses your Range component
const RangeInput = ({ name, defaultValue, onChange, suffix = "px" }) => {
    // Extract just the number part from any value, whether it's a string with units or a number
    const extractNumber = (value) => {
        if (value === null || value === undefined) return 0;
        if (typeof value === "number") return value;
        if (typeof value === "string") {
            const match = value.match(/^(-?\d+\.?\d*)/);
            return match ? parseFloat(match[1]) : 0;
        }
        return 0;
    };

    // Parse the initial value to a clean number
    const parsedDefaultValue = extractNumber(defaultValue);

    // Store current value in state as a pure number
    const [value, setValue] = useState(parsedDefaultValue);

    // Create a stable ID that won't change on re-renders
    const rangeId = useMemo(() => `range-${name.replace(/[^a-zA-Z0-9]/g, "-")}`, [name]);

    // Handle range slider changes - Range component passes a pure number
    const handleChange = useCallback((numValue) => {
        console.log(`Range changed: ${name} = ${numValue} (pure number)`);
        // Update our local state with the pure number
        setValue(numValue);
        // Pass the PURE NUMBER to parent - let parent handle any formatting
        onChange(name, numValue);
    }, [name, onChange]);

    // Update if defaultValue changes
    useEffect(() => {
        const newParsedValue = extractNumber(defaultValue);
        if (value !== newParsedValue) {
            console.log(`Range updating value: ${name} from ${value} to ${newParsedValue}`);
            setValue(newParsedValue);
        }
    }, [defaultValue, value, name]);

    // For debugging
    console.log(`RangeInput rendering: ${name}, defaultValue=${defaultValue}, parsed=${parsedDefaultValue}, current=${value}`);

    return (
        <Range
            id={rangeId}
            label={name}
            value={value} // Range expects a pure number
            min={0}
            max={32}
            step={1}
            suffix={suffix} // We still show the suffix in the UI, but don't include it in the value
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

            // Initial value - we'll check and potentially modify it
            let formattedValue = value;

            // Process and clean up values
            if (value && typeof value === "string") {
                // CASE 1: Check for numerical variables incorrectly wrapped in var(--) syntax
                if (value.startsWith("var(--") && /var\(--\d+/.test(value)) {
                    console.log(`Fixing incorrectly formatted numerical value: ${value}`);
                    // Extract the digit part and any suffix
                    const varMatch = value.match(/var\(--([\d\.]+)([^)]*)\)/);
                    if (varMatch) {
                        const numValue = varMatch[1];
                        const suffix = varMatch[2] || "px";
                        formattedValue = `${numValue}${suffix}`;
                        console.log(`Fixed numeric value to: ${formattedValue}`);
                    }
                }

                // CASE 2: Handle numerical variables that have been correctly formatted
                const isNumericValue = /^[\d\.]+[a-z%]+$/.test(value);
                if (isNumericValue) {
                    // Already correctly formatted as a numeric value with suffix
                    console.log(`Keeping correctly formatted numeric value: ${value}`);
                    formattedValue = value;
                }

                // CASE 3: Keep proper var(--color) references for color variables
                if (isColorVariable(value)) {
                    console.log(`Keeping color variable reference: ${value}`);
                    formattedValue = value;
                }
            }

            return `${paddedName} : ${formattedValue};`;
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
                if (!styleSheet.href || !styleSheet.href.includes(".css")) return;

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
                                } else if (typeof componentPrefix === "function") {
                                    // Handle function filter
                                    if (componentPrefix(varName)) {
                                        const value = rule.style.getPropertyValue(prop).trim();
                                        variables[varName] = value;
                                    }
                                } else if (typeof componentPrefix === "string" && varName.startsWith(componentPrefix)) {
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
        componentVariables : {},
        cssVariablesList   : "",
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
                                if (prop.startsWith("--") && (!filter || filter(prop.substring(2))
                                )) {
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

    // INITIALISATION EFFECT ===========================================================================================
    useEffect(() => {
        if (!isInitializedRef.current) {
            const vars = extractVariables();
            const formattedCss = formatCSSVariablesList(vars);
            setVariables({
                componentVariables : vars,
                cssVariablesList   : formattedCss,
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
        // Store original variable state before changes
        const originalVarValue = variables.componentVariables[varName];

        // CRITICAL: First check if this is definitely a number, regardless of any other type detection
        const isDefinitelyNumeric = 
            typeof newValue === "number" || 
            (typeof newValue === "string" && /^\d+$/.test(newValue));
        
        console.log(`Initial type check: ${varName}=${newValue}, type=${typeof newValue}, isNumeric=${isDefinitelyNumeric}`);
        
        // If it's definitely a number, force it to be treated as a number regardless of other detection
        let isColor = false;
        let isNumber = false;
        
        if (isDefinitelyNumeric) {
            // Force type detection to treat this as a number
            isNumber = true;
            isColor = false;
            console.log(`FORCING numeric processing for ${varName}=${newValue}`);
        } else {
            // For non-numeric values, use normal type detection
            isColor = isColorVariable(originalVarValue);
            isNumber = isNumericalVariable(originalVarValue);
        }

        console.log(`Processing variable change: varName=${varName}, newValue=${newValue}, isColor=${isColor}, isNumber=${isNumber}`);

        let cssValue;

        // STEP 1: Handle the formatting of the new value based on its type
        if (isColor) {
            // For color variables: use var(--color) format
            const colorValue = typeof newValue === "object" ? newValue.value : String(newValue);
            cssValue = `var(--${colorValue})`;
            console.log(`COLOR variable formatted as: ${cssValue}`);
        } else if (isNumber) {
            // For numerical values: NEVER use var(--), always use direct values with units

            // Make sure we have a clean number - Range passes pure numbers
            let numericValue;
            if (typeof newValue === "number") {
                numericValue = newValue;
                console.log(`Using numeric value directly: ${numericValue}`);
            } else {
                numericValue = Number(newValue);
                console.log(`Converted to number: ${newValue} → ${numericValue}`);
            }

            // Get the unit suffix from the original value
            const suffix = extractUnitSuffix(originalVarValue);
            console.log(`Using suffix: '${suffix}' from original value: ${originalVarValue}`);

            // Format as NUMBER + SUFFIX (e.g., "8px") - DIRECT VALUE, NOT VAR REFERENCE
            cssValue = `${numericValue}${suffix}`;

            // Double-check the value doesn't have var(--) format
            if (cssValue.startsWith("var(")) {
                console.error(`ERROR: Still getting var format: ${cssValue}, fixing...`);
                const fixMatch = cssValue.match(/var\(--([\d\.]+)([^)]*)\)/);
                if (fixMatch) {
                    cssValue = `${fixMatch[1]}${fixMatch[2] || suffix}`;
                    console.log(`Fixed to: ${cssValue}`);
                }
            }
            console.log(`NUMBER variable formatted as: ${cssValue}`);
        } else {
            // Default case for other types
            const stringValue = typeof newValue === "object" ? newValue.value : String(newValue);
            const suffix = extractUnitSuffix(originalVarValue);
            cssValue = `${stringValue}${suffix}`;
            console.log(`OTHER type formatted as: ${cssValue}`);
        }

        // STEP 2: Update the DOM element directly to show the change
        const element = interactiveElementRef.current;
        if (element) {
            console.log(`Setting element style --${varName} to ${cssValue}`);
            element.style.setProperty(`--${varName}`, cssValue);

            // Handle class updates for color changes
            if (isColor) {
                const colorValue = typeof newValue === "object" ? newValue.value : String(newValue);
                const classPrefix = varName.split("-")[0];
                const oldClasses = Array.from(element.classList)
                    .filter(cls => cls.startsWith(`${classPrefix}-`));
                oldClasses.forEach(cls => element.classList.remove(cls));

                if (colorValue) {
                    element.classList.add(`${classPrefix}-${colorValue}`);
                }
            }
        }

        // STEP 3: Update the state to reflect the new value
        setVariables(prev => {
            // Create a new copy of variables to avoid reference issues
            const updatedVars = { ...prev.componentVariables };

            // IMPORTANT: Store the formatted value
            updatedVars[varName] = cssValue;

            const newCssVariablesList = formatCSSVariablesList(updatedVars);
            console.log(`Updated CSS variables list: ${newCssVariablesList.slice(0, 100)}...`);

            return {
                componentVariables : updatedVars,
                cssVariablesList   : newCssVariablesList,
            };
        });

        console.log(`Updated ${varName} from ${originalVarValue} to ${cssValue}`);
    }, [variables.componentVariables, formatCSSVariablesList]);

    // THEME CONFIGURATOR UI COMPONENT /////////////////////////////////////////////////////////////////////////////////
    const themeConfigurator = useCallback(() => {
        // Use memoization to avoid recreating variables on every render
        console.log("Rendering themeConfigurator");
        // Process color variables -------------------------------------------------------------------------------------
        const colorVariables = Object.entries(variables.componentVariables)
            .filter(([_, value]) => isColorVariable(value))
            .map(([varName, value]) => ({
                    type         : "color",
                    name         : varName,
                    id           : `color-${varName}`, // Add unique ID
                    currentValue : extractColorValue(value),
                    defaultValue : extractColorValue(value),
                }
            ));

        // Process numerical variables ---------------------------------------------------------------------------------
        const numericalVariables = Object.entries(variables.componentVariables)
            .filter(([_, value]) => isNumericalVariable(value))
            .map(([varName, value]) => {
                try {
                    // Extract the computed numerical value - ensure it's a number
                    const numValue = parseFloat(extractNumericalValue(value));
                    const suffix = extractUnitSuffix(value);

                    // Create a stable ID that's based solely on the variable name
                    const uniqueId = `number-${varName.replace(/[^a-zA-Z0-9]/g, "-")}`;

                    // Make sure we have valid numbers
                    const safeNumValue = isNaN(numValue) ? 0 : numValue;

                    return {
                        type         : "number",
                        name         : varName,
                        id           : uniqueId,
                        currentValue : safeNumValue,
                        defaultValue : safeNumValue, // Ensure this is a number
                        suffix,
                    };
                } catch (error) {
                    console.error(`Error processing numerical variable ${varName}:`, error);
                    return null;
                }
            })
            .filter(Boolean); // Remove any null entries

        // Combine all variables and ensure no duplicates ---------------------------------------------------------------------------------------
        // Convert to a Map to ensure uniqueness by name
        const variableMap = new Map();
        [...colorVariables, ...numericalVariables].forEach(variable => {
            variableMap.set(variable.name, variable);
        });

        // Convert back to array
        const allVariables = Array.from(variableMap.values());
        if (allVariables.length === 0) return null;

        // Return configurator UI component ----------------------------------------------------------------------------
        return (
            <Card padding="micro" shape="rounded">
                <Header marginBottom="micro">
                    <Heading6 style={{ marginBottom : "4px" }}>
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
                    {allVariables.map(({ type, name, id, currentValue, defaultValue, suffix }) => {
                        // Render colour variable controls -------------------------------------------------------------
                        if (type === "color") {
                            const extendedOptions = [...colourOptionsWithShades];
                            if (defaultValue && !extendedOptions.find(opt => opt.value === defaultValue)) {
                                extendedOptions.unshift({
                                    customLabel : (
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
                                    label       : defaultValue,
                                    value       : defaultValue,
                                });
                            }

                            return (
                                <Portion desktopSpan="half" key={id || `color-${name}`} style={{ minWidth : "200px" }}>
                                    <ListBox
                                        label={name}
                                        options={extendedOptions}
                                        defaultValue={defaultValue}
                                        onChange={(value) => handleVariableChange(name, value)}
                                        allowCustomEntries
                                        isFullWidth
                                        placeholder={`Current: ${defaultValue}`}
                                    />
                                </Portion>
                            );
                        }

                        // Render numerical variable controls ----------------------------------------------------------
                        if (type === "number") {
                            // Only render if we have a valid numerical value
                            if (defaultValue === undefined || defaultValue === null) {
                                return null;
                            }

                            return (
                                <Portion desktopSpan="half" key={`range-container-${name}`}
                                         style={{ minWidth : "200px" }}>
                                    <RangeInput
                                        name={name}
                                        defaultValue={defaultValue}
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
    }, [variables.componentVariables, variables.cssVariablesList, handleVariableChange, componentName, colourOptionsWithShades]);

    // Create memoized component props ---------------------------------------------------------------------------------
    const componentProps = useMemo(() => ({
            id : "interactive-component",
        }
    ), []);

    // Return configurator interface -----------------------------------------------------------------------------------
    return {
        componentVariables : variables.componentVariables,
        componentProps,
        handleVariableChange,
        themeConfigurator,
        interactiveElementRef,
    };
};
