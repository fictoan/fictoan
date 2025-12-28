"use client";

// REACT CORE ==========================================================================================================
import React, { useState, useEffect, useCallback } from "react";

// UI ==================================================================================================================
import { CodeBlock, Div, Text, Header, Form } from "fictoan-react";

// LIB =================================================================================================================
import { PropsRegistryConfig, ResolvedProp, PropOption, ControlType } from "$/lib/props-registry/types";
import { getControlComponent, inferControlType } from "$/lib/props-registry/controls";
import { getOrderedPropNames } from "$/lib/props-registry/createPropsRegistry";

// STYLES ==============================================================================================================
import "./props-configurator.css";

// OTHER ===============================================================================================================
import metadata from "fictoan-react/dist/props-metadata.json";

interface PropMetadata {
    name           : string;
    type           : { name : string };
    required     ? : boolean;
    defaultValue ? : { value : any };
    description  ? : string;
    parent       ? : { fileName : string; name : string };
}

interface ComponentMetadata {
    displayName : string;
    description : string;
    props       : Record<string, PropMetadata>;
}

interface PropsConfiguratorNewProps {
    registry      : PropsRegistryConfig;
    onPropsChange : (props : Record<string, any>) => void;
}

// Parse enum type string into options
function parseEnumType(typeString : string) : PropOption[] {
    return typeString
        .split("|")
        .map((v) => v.trim().replace(/['"]/g, ""))
        .filter((v) => v && v !== "undefined")
        .map((value) => ({value, label : value}));
}

// Resolve a prop from registry config + optional metadata
function resolveProp(
    propName : string,
    config : {
        control? : ControlType; label? : string; options? : any;
        defaultValue? : any; hidden? : boolean; inputProps? : Record<string, any>
    },
    propMeta : PropMetadata | undefined,
    currentValue : any,
) : ResolvedProp {
    const typeString = propMeta?.type?.name || "string";

    // Determine options
    let options : PropOption[] | undefined = config.options as PropOption[] | undefined;
    if (!options && typeString.includes("|")) {
        options = parseEnumType(typeString);
    }

    // Determine control type
    const control : ControlType = config.control || inferControlType(propName, typeString, options);

    // Determine default value
    const defaultValue = config.defaultValue ?? propMeta?.defaultValue?.value ?? undefined;

    return {
        name         : propName,
        label        : config.label || propName,
        control,
        options,
        defaultValue,
        currentValue,
        hidden       : config.hidden ?? false,
        inputProps   : config.inputProps,
    };
}

export const PropsConfiguratorNew : React.FC<PropsConfiguratorNewProps> = ({
    registry,
    onPropsChange,
}) => {
    const [ props, setProps ] = useState<Record<string, any>>({});
    const [ componentMeta, setComponentMeta ] = useState<ComponentMetadata | null>(null);

    // Load component metadata and initialize props with defaults
    useEffect(() => {
        const meta = (metadata as unknown as Record<string, ComponentMetadata>)[registry.component];
        setComponentMeta(meta || null);

        // Initialize props with defaults from registry
        const initialProps : Record<string, any> = {};
        for (const [ propName, config ] of Object.entries(registry.props)) {
            if (config.defaultValue !== undefined) {
                initialProps[propName] = config.defaultValue;
            }
        }
        setProps(initialProps);
    }, [ registry ]);

    // Notify parent of prop changes
    useEffect(() => {
        onPropsChange(props);
    }, [ props, onPropsChange ]);

    // Handle prop value change
    const handlePropChange = useCallback((propName : string) => (value : any) => {
        setProps((prev) => ({
            ...prev,
            [propName] : value,
        }));
    }, []);

    // Generate code string
    const generateCodeString = useCallback(() => {
        const componentName = registry.component;
        const childrenValue = props.children;
        const alwaysShowProps = registry.alwaysShowProps || [];

        const propsEntries = Object.entries(props).filter(([ key, value ]) => {
            if (key === "children") return false;
            // Always include props marked in alwaysShowProps
            if (alwaysShowProps.includes(key)) return true;
            if (value === undefined || value === null || value === "") return false;
            if (value === false) return false;
            return true;
        });

        // Add alwaysShowProps that aren't in props yet (use their default values from registry)
        for (const propName of alwaysShowProps) {
            if (!propsEntries.find(([key]) => key === propName)) {
                const propConfig = registry.props[propName];
                if (propConfig?.defaultValue !== undefined) {
                    propsEntries.push([propName, propConfig.defaultValue]);
                }
            }
        }

        const propsString = propsEntries
            .map(([ key, value ]) => {
                if (typeof value === "boolean" && value) {
                    return `    ${key}`;
                }
                if (typeof value === "string") {
                    return `    ${key}="${value}"`;
                }
                if (typeof value === "number") {
                    return `    ${key}={${value}}`;
                }
                return `    ${key}={${JSON.stringify(value)}}`;
            })
            .join("\n");

        let componentCode: string;
        if (childrenValue) {
            if (propsString) {
                componentCode = `<${componentName}\n${propsString}\n>\n    ${childrenValue}\n</${componentName}>`;
            } else {
                componentCode = `<${componentName}>\n    ${childrenValue}\n</${componentName}>`;
            }
        } else if (propsString) {
            componentCode = `<${componentName}\n${propsString}\n/>`;
        } else {
            componentCode = `<${componentName} />`;
        }

        // Add prefix and suffix if provided
        const prefix = registry.codePrefix ? `${registry.codePrefix}\n\n` : "";
        const suffix = registry.codeSuffix ? `\n\n${registry.codeSuffix}` : "";

        return `${prefix}${componentCode}${suffix}`;
    }, [ registry, props ]);

    // Get prop names in registry order
    const orderedPropNames = getOrderedPropNames(registry);

    // Resolve all props
    const resolvedProps = orderedPropNames.map((propName) => {
        const config = registry.props[propName];
        const propMeta = componentMeta?.props?.[propName];
        return resolveProp(propName, config, propMeta, props[propName]);
    }).filter((p) => !p.hidden);

    // Render a single prop control
    const renderPropControl = (resolvedProp : ResolvedProp) => {
        const ControlComponent = getControlComponent(resolvedProp.control);
        return (
            <ControlComponent
                key={resolvedProp.name}
                prop={resolvedProp}
                value={resolvedProp.currentValue}
                onChange={handlePropChange(resolvedProp.name)}
            />
        );
    };

    return (
        <Div id="props-configurator-new">
            <Header marginBottom="micro">
                <Text>Configure {registry.component} props</Text>
            </Header>

            {/* Code Preview */}
            <CodeBlock
                language="tsx"
                withSyntaxHighlighting
                showCopyButton
                marginBottom="micro"
            >
                {generateCodeString()}
            </CodeBlock>

            {/* Props */}
            <Div id="props-list">
                <Form spacing="medium">
                    {resolvedProps.map(renderPropControl)}
                </Form>
            </Div>
        </Div>
    );
};
