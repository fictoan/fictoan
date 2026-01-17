// REACT CORE ==========================================================================================================
import React, { useState, useEffect, useCallback, useMemo, useRef } from "react";

// UI ==================================================================================================================
import { ListBox, Row, Portion, Text, Div, Range, Header, CodeBlock, } from "fictoan-react";

// OTHER ===============================================================================================================
import { colourOptionsWithShades, listOfColours } from "../app/colour/colours";

type VariableFilter = string | string[] | ((varName: string) => boolean);

interface VariablesState {
    componentVariables : Record<string, string>;
    cssVariablesList   : string;
}

interface ColourVariable {
    type         : "colour";
    name         : string;
    currentValue : string | null;
}

interface NumericalVariable {
    type         : "number";
    name         : string;
    currentValue : number;
    suffix       : string;
}

type ThemeVariable = ColourVariable | NumericalVariable;

interface RangeInputProps {
    name           : string;
    defaultValue   : number;
    onChange       : (name: string, value: number) => void;
    suffix       ? : string;
}

interface ThemeConfiguratorReturn<T extends HTMLElement = HTMLElement> {
    componentVariables    : Record<string, string>;
    componentProps        : { id: string };
    handleVariableChange  : (varName: string, newValue: unknown) => void;
    themeConfigurator     : () => React.ReactNode;
    interactiveElementRef : React.RefObject<T>;
}

const findLongestVarNameLength = (variables: Record<string, string>): number => {
    const keys = Object.keys(variables);
    return keys.length ? Math.max(...keys.map(name => name.length + 2)) : 0;
};

const isColourVariable = (value: unknown): boolean => {
    if (!value || typeof value !== "string") return false;
    if (/^\d+$/.test(value)) return false;

    if (value.startsWith("var(--")) {
        const varName = value.match(/var\(--([^)]+)\)/)?.[1];
        if (!varName || /^\d+$/.test(varName)) return false;

        const isKnownColour = listOfColours.some((colour: string) =>
            varName === colour || varName.startsWith(`${colour}-`)
        );

        const colourKeywords = ["text", "border", "bg", "background", "color", "colour", "hover", "disabled", "focus"];
        const hasColourKeyword = colourKeywords.some(keyword =>
            varName.includes(keyword)
        );

        return isKnownColour || hasColourKeyword;
    }

    return false;
};

const isNumericalVariable = (value: unknown): boolean => {
    if (!value || typeof value !== "string") return false;

    if (value.startsWith("var(--")) {
        const varName = value.match(/var\(--([^)]+)\)/)?.[1];
        if (!varName) return false;

        try {
            const rootStyles = getComputedStyle(document.documentElement);
            const rootValue = rootStyles.getPropertyValue(`--${varName}`).trim();

            if (rootValue.startsWith("var(--")) {
                return isNumericalVariable(rootValue);
            }

            return /^-?\d+(\.\d+)?(px|rem|em|vh|vw|%)$/.test(rootValue);
        } catch {
            return false;
        }
    }

    return !isNaN(parseInt(value));
};

const extractColourValue = (value: string): string | null => {
    if (!value?.startsWith("var(--")) return null;

    const varName = value.match(/var\(--([^)]+)\)/)?.[1];
    if (!varName) return null;

    try {
        const rootStyles = getComputedStyle(document.documentElement);
        const rootValue = rootStyles.getPropertyValue(`--${varName}`).trim();

        if (rootValue.startsWith("var(--")) {
            return extractColourValue(rootValue);
        }

        return varName;
    } catch {
        return varName;
    }
};

const extractNumericalValue = (value: string | undefined): number => {
    if (value?.startsWith("var(--")) {
        const varName = value.match(/var\(--([^)]+)\)/)?.[1];
        if (!varName) return 0;

        try {
            const rootStyles = getComputedStyle(document.documentElement);
            const computedValue = rootStyles.getPropertyValue(`--${varName}`).trim();

            if (computedValue.startsWith("var(--")) {
                return extractNumericalValue(computedValue);
            }

            const match = computedValue.match(/^(-?\d+\.?\d*)/);
            return match ? parseFloat(match[1]) : 0;
        } catch {
            return 0;
        }
    }

    const match = value?.match(/^(-?\d+\.?\d*)/);
    return match ? parseFloat(match[1]) : 0;
};

const extractUnitSuffix = (value: string | undefined): string => {
    if (value?.startsWith("var(--")) {
        const varName = value.match(/var\(--([^)]+)\)/)?.[1];
        if (!varName) return "px";

        try {
            const rootStyles = getComputedStyle(document.documentElement);
            const rootValue = rootStyles.getPropertyValue(`--${varName}`).trim();

            if (rootValue.startsWith("var(--")) {
                return extractUnitSuffix(rootValue);
            }

            const match = rootValue.match(/\d+([a-z%]+)/i);
            return match?.[1] || "px";
        } catch {
            return "px";
        }
    }

    const match = value?.match(/\d+([a-z%]+)/i);
    return match?.[1] || "px";
};

const extractThemeVariables = (filter: VariableFilter): Record<string, string> => {
    const variables: Record<string, string> = {};

    try {
        Array.from(document.styleSheets).forEach(styleSheet => {
            try {
                if (!styleSheet.href?.includes(".css")) return;

                Array.from(styleSheet.cssRules || []).forEach(rule => {
                    const styleRule = rule as CSSStyleRule;
                    if (styleRule.selectorText === "#interactive-component" || styleRule.selectorText === ":root") {
                        Array.from(styleRule.style).forEach(prop => {
                            if (!prop.startsWith("--")) return;

                            const varName = prop.substring(2);
                            let shouldInclude = false;

                            if (Array.isArray(filter)) {
                                shouldInclude = filter.some(prefix => varName.startsWith(prefix));
                            } else if (typeof filter === "function") {
                                shouldInclude = filter(varName);
                            } else if (typeof filter === "string") {
                                shouldInclude = varName.startsWith(filter);
                            }

                            if (shouldInclude) {
                                variables[varName] = styleRule.style.getPropertyValue(prop).trim();
                            }
                        });
                    }
                });
            } catch {
                // Skip cross-origin stylesheets
            }
        });
    } catch {
        // Could not read stylesheets
    }

    return variables;
};

const formatVariablesList = (vars: Record<string, string>): string => {
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

const RangeInput: React.FC<RangeInputProps> = ({ name, defaultValue, onChange, suffix = "px" }) => {
    const extractNumber = (value: unknown): number => {
        if (value === null || value === undefined) return 0;
        if (typeof value === "number") return value;
        if (typeof value === "string") {
            const match = value.match(/^(-?\d+\.?\d*)/);
            return match ? parseFloat(match[1]) : 0;
        }
        return 0;
    };

    const [value, setValue] = useState(extractNumber(defaultValue));
    const rangeId = useMemo(() => `range-${name.replace(/[^a-zA-Z0-9]/g, "-")}`, [name]);

    const handleChange = useCallback((numValue: number) => {
        setValue(numValue);
        onChange(name, numValue);
    }, [name, onChange]);

    useEffect(() => {
        const newValue = extractNumber(defaultValue);
        if (value !== newValue) {
            setValue(newValue);
        }
    }, [defaultValue]);

    return (
        <Range
            id={rangeId}
            label={name}
            value={value}
            min={0}
            max={32}
            step={1}
            suffix={suffix}
            onChange={handleChange}
            isFullWidth
        />
    );
};

export const createThemeConfigurator = <T extends HTMLElement = HTMLElement>(
    componentName: string,
    filter: VariableFilter
): ThemeConfiguratorReturn<T> => {
    const [variables, setVariables] = useState<VariablesState>({
        componentVariables: {},
        cssVariablesList: "",
    });

    const interactiveElementRef = useRef<T>(null);
    const isInitialisedRef = useRef(false);

    // Extract variables on mount
    useEffect(() => {
        if (isInitialisedRef.current) return;

        const vars = extractThemeVariables(filter);
        const formattedCss = formatVariablesList(vars);

        setVariables({
            componentVariables: vars,
            cssVariablesList: formattedCss,
        });

        isInitialisedRef.current = true;

        const element = interactiveElementRef.current;
        if (element) {
            Object.entries(vars).forEach(([name, value]) => {
                element.style.setProperty(`--${name}`, value);
            });
        }
    }, [filter]);

    // Handle variable changes
    const handleVariableChange = useCallback((varName: string, newValue: unknown) => {
        const originalValue = variables.componentVariables[varName];
        const isNumeric = typeof newValue === "number" || (typeof newValue === "string" && /^\d+$/.test(newValue));

        let cssValue: string;

        if (isNumeric) {
            const suffix = extractUnitSuffix(originalValue);
            cssValue = `${newValue}${suffix}`;
        } else if (isColourVariable(originalValue)) {
            const colourValue = typeof newValue === "object" && newValue !== null && "value" in newValue
                ? (newValue as { value: string }).value
                : String(newValue);
            cssValue = `var(--${colourValue})`;
        } else {
            cssValue = String(newValue);
        }

        const element = interactiveElementRef.current;
        if (element) {
            element.style.setProperty(`--${varName}`, cssValue);
        }

        setVariables(prev => {
            const updatedVars = { ...prev.componentVariables, [varName]: cssValue };
            return {
                componentVariables: updatedVars,
                cssVariablesList: formatVariablesList(updatedVars),
            };
        });
    }, [variables.componentVariables]);

    // Render configurator UI
    const themeConfigurator = useCallback((): React.ReactNode => {
        const colourVars: ColourVariable[] = Object.entries(variables.componentVariables)
            .filter(([_, value]) => isColourVariable(value))
            .map(([name, value]) => ({
                type: "colour" as const,
                name,
                currentValue: extractColourValue(value),
            }));

        const numericalVars: NumericalVariable[] = Object.entries(variables.componentVariables)
            .filter(([_, value]) => isNumericalVariable(value))
            .map(([name, value]) => ({
                type: "number" as const,
                name,
                currentValue: extractNumericalValue(value),
                suffix: extractUnitSuffix(value),
            }));

        const allVars: ThemeVariable[] = [...colourVars, ...numericalVars];
        if (allVars.length === 0) return null;

        return (
            <Div id="theme-configurator">
                <Header marginBottom="micro">
                    <Text>This will affect all {componentName} elements</Text>
                </Header>

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
                    {allVars.map((variable) => {
                        if (variable.type === "colour") {
                            const { name, currentValue } = variable;
                            const options = [...colourOptionsWithShades];
                            if (currentValue && !options.find((opt: { value: string }) => opt.value === currentValue)) {
                                options.unshift({
                                    customLabel: (
                                        <Div verticallyCentreItems>
                                            <Div
                                                className="color-option"
                                                bgColour={currentValue}
                                                padding="nano"
                                                shape="rounded"
                                            />
                                            <Text marginLeft="nano">{currentValue}</Text>
                                        </Div>
                                    ),
                                    label: currentValue,
                                    value: currentValue,
                                });
                            }

                            return (
                                <Portion desktopSpan="half" key={`colour-${name}`} style={{ minWidth: "200px" }}>
                                    <ListBox
                                        label={name}
                                        options={options}
                                        defaultValue={currentValue || undefined}
                                        onChange={(value) => handleVariableChange(name, value)}
                                        allowCustomEntries
                                        placeholder={`Current: ${currentValue}`}
                                        isFullWidth
                                    />
                                </Portion>
                            );
                        }

                        if (variable.type === "number") {
                            const { name, currentValue, suffix } = variable;
                            return (
                                <Portion desktopSpan="half" key={`range-${name}`} style={{ minWidth: "200px" }}>
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
            </Div>
        );
    }, [variables.componentVariables, variables.cssVariablesList, handleVariableChange, componentName]);

    const componentProps = useMemo(() => ({
        id: "interactive-component",
    }), []);

    return {
        componentVariables: variables.componentVariables,
        componentProps,
        handleVariableChange,
        themeConfigurator,
        interactiveElementRef,
    };
};
