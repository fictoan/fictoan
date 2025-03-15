import { useState, useEffect } from "react";
import { ListBox, Range, Row, Portion } from "fictoan-react";
import { colourOptions } from "../app/colour/colours";

export const useThemeVariables = (variablesStructure, targetElementId = "interactive-component") => {
    // Helper functions stay the same
    const findLongestVarNameLength = (variables) => {
        return Math.max(...Object.keys(variables).map(varName => varName.length));
    };

    const generateCSSVariablesList = (variables) => {
        const longestVarNameLength = findLongestVarNameLength(variables);
        const variablesString = Object.entries(variables).map(([varName, varDetails]) => {
            let cssValue;
            switch (varDetails.type) {
                case "value-unit":
                    cssValue = `${varDetails.value}${varDetails.unit}`;
                    break;
                case "reference":
                    cssValue = `var(--${varDetails.value})`;
                    break;
                case "string":
                    cssValue = `"${varDetails.value}"`;
                    break;
                default:
                    cssValue = varDetails.value;
            }
            const paddedVarName = varName.padEnd(longestVarNameLength);
            return `--${paddedVarName} : ${cssValue};`;
        }).join("\n");

        return "/* Paste this in your theme file */\n" + variablesString;
    };

    function getDefaultVariableValues() {
        // Read from the root element initially, but we'll apply changes only to the target
        const root = document.documentElement;
        const styles = getComputedStyle(root);

        return Object.entries(variablesStructure).reduce((acc, [key, varStruct]) => {
            const computedValue = styles.getPropertyValue(key).trim();
            let value, unit;

            if (varStruct.type === "value-unit") {
                const match = computedValue.match(/^(\d+(?:\.\d+)?)/);
                value = match ? parseFloat(match[1]) : varStruct.defaultValue;
                unit = varStruct.unit;
            } else if (varStruct.type === "reference" &&
                (
                    varStruct.defaultValue.includes("light") ||
                    varStruct.defaultValue.includes("dark") ||
                    varStruct.defaultValue.includes("colour") ||
                    varStruct.defaultValue.includes("color")
                )) {
                if (computedValue.startsWith("var(--")) {
                    const match = computedValue.match(/var\((--[\w-]+)\)/);
                    value = match ? match[1].substring(2) : varStruct.defaultValue;
                } else {
                    value = computedValue || varStruct.defaultValue;
                }
                if (value.startsWith("--")) {
                    value = value.substring(2);
                }
                unit = "";
            } else {
                value = computedValue || varStruct.defaultValue;
                unit = "";
            }

            acc[key] = {
                ...varStruct,
                value : value,
                unit  : unit,
            };

            return acc;
        }, {});
    }

    const [componentVariables, setComponentVariables] = useState(getDefaultVariableValues());
    const [cssVariablesList, setCssVariablesList] = useState(generateCSSVariablesList(componentVariables));

    const handleVariableChange = (varName, newValue) => {
        setComponentVariables(prevValues => {
            const currentVar = prevValues[varName];
            let updatedVar = { ...currentVar };

            if (currentVar.type === "reference" && !isNaN(newValue) && [
                "global-border-width",
                "global-border-radius",
            ].includes(currentVar.defaultValue)) {
                updatedVar = {
                    ...updatedVar,
                    type  : "value-unit",
                    value : newValue,
                    unit  : "px",
                };
            } else {
                updatedVar.value = newValue;
            }

            return {
                ...prevValues,
                [varName] : updatedVar,
            };
        });
    };

    const generateControlsForVariable = (varName, varDetails) => {
        const humanReadableLabel = varName
            .split("-")
            .map(word => word.charAt(0) + word.slice(1))
            .join(" ");

        switch (varDetails.type) {
            case "value-unit":
                return (
                    <Portion desktopSpan="half" key={varName}>
                        <Range
                            label={humanReadableLabel}
                            value={varDetails.value}
                            onChange={(value) => handleVariableChange(varName, value)}
                            min={0}
                            max={varDetails.max || 50}
                            step={varDetails.step || 1}
                            suffix={varDetails.unit}
                        />
                    </Portion>
                );

            case "reference": {
                const isColorReference = varDetails.defaultValue.includes("light") ||
                    varDetails.defaultValue.includes("dark") ||
                    varDetails.defaultValue.includes("colour") ||
                    varDetails.defaultValue.includes("color") ||
                    colourOptions.some(opt => opt.value === varDetails.defaultValue);

                if (isColorReference) {
                    return (
                        <Portion desktopSpan="half" key={varName}>
                            <ListBox
                                label={humanReadableLabel}
                                options={[
                                    {
                                        label    : "Select a colour",
                                        value    : "select-a-colour",
                                        disabled : true,
                                        selected : true,
                                    },
                                    ...colourOptions.map(option => (
                                        {
                                            label       : option.label || option.value,
                                            value       : option.value,
                                            customLabel : option.customLabel,
                                        }
                                    )),
                                ]}
                                defaultValue={varDetails.value || "select-a-colour"}
                                onChange={(value) => handleVariableChange(varName, Array.isArray(value) ? value[0] : value)}
                                isFullWidth
                            />
                        </Portion>
                    );
                }
                break;
            }

            default:
                return null;
        }
    };

    const generateAllControls = () => {
        const controls = Object.entries(componentVariables)
            .map(([varName, varDetails]) =>
                generateControlsForVariable(varName, varDetails),
            )
            .filter(Boolean);

        return (
            <Row marginBottom="none">
                {controls}
            </Row>
        );
    };

    useEffect(() => {
        setCssVariablesList(generateCSSVariablesList(componentVariables));
    }, [componentVariables]);

    // Key change: Apply styles to the target element instead of documentElement
    useEffect(() => {
        const targetElement = document.getElementById(targetElementId);
        if (!targetElement) return;

        Object.entries(componentVariables).forEach(([key, varDetails]) => {
            let cssValue;
            if (varDetails.type === "value-unit") {
                cssValue = `${varDetails.value}${varDetails.unit}`;
            } else if (varDetails.type === "reference") {
                cssValue = `var(--${varDetails.value})`;
            } else if (varDetails.type === "string") {
                cssValue = `"${varDetails.value}"`;
            } else {
                cssValue = varDetails.value;
            }
            targetElement.style.setProperty(`--${key}`, cssValue);
        });

        // Cleanup function to remove styles when unmounting
        return () => {
            Object.keys(componentVariables).forEach((key) => {
                targetElement.style.removeProperty(`--${key}`);
            });
        };
    }, [componentVariables, targetElementId]);

    return {
        componentVariables,
        handleVariableChange,
        cssVariablesList,
        controls : generateAllControls,
    };
};

export const useThemeVariablesFromCSS = (filter = null) => {
    const [variables, setVariables] = useState({});

    useEffect(() => {
        const styles = getComputedStyle(document.documentElement);
        const cssVars = {};

        // Get all CSS custom properties
        for (let i = 0; i < styles.length; i++) {
            const prop = styles[i];
            if (prop.startsWith("--")) {
                const name = prop.substring(2); // Remove '--' prefix
                if (!filter || filter(name)) {
                    const value = styles.getPropertyValue(prop).trim();
                    cssVars[name] = value;
                }
            }
        }

        setVariables(cssVars);
    }, [filter]);

    return variables;
};
