"use client";

// REACT CORE ==========================================================================================================
import React, { useState, useEffect, useCallback, useMemo } from "react";

// UI ==================================================================================================================
import { CodeBlock, Div, Text, Header, Form, Button, Divider } from "fictoan-react";

// LIB =================================================================================================================
import { PropsRegistryConfig, ResolvedProp, ControlType } from "$/lib/props-registry/types";
import { getControlComponent, inferControlType } from "$/lib/props-registry/controls";
import { getOrderedPropNames } from "$/lib/props-registry/createPropsRegistry";

// STYLES ==============================================================================================================
import "../../../components/PropsConfigurator/props-configurator.css";

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

interface CheckboxConfiguratorProps {
    registry      : PropsRegistryConfig;
    onPropsChange : (props : Record<string, any>) => void;
    onGroupToggle : (isGroup : boolean) => void;
}

// Parse enum type string into options
function parseEnumType(typeString : string) {
    return typeString
        .split("|")
        .map((v) => v.trim().replace(/['"]/g, ""))
        .filter((v) => v && v !== "undefined")
        .map((value) => ({ value, label : value }));
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

    let options = config.options;
    if (!options && typeString.includes("|")) {
        options = parseEnumType(typeString);
    }

    const control : ControlType = config.control || inferControlType(propName, typeString, options);
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

export const CheckboxConfigurator : React.FC<CheckboxConfiguratorProps> = ({
    registry,
    onPropsChange,
    onGroupToggle,
}) => {
    const [ props, setProps ] = useState<Record<string, any>>({});
    const [ componentMeta, setComponentMeta ] = useState<ComponentMetadata | null>(null);
    const [ showGroup, setShowGroup ] = useState(false);

    // Load component metadata and initialize props with defaults
    useEffect(() => {
        const meta = (metadata as unknown as Record<string, ComponentMetadata>)[registry.component];
        setComponentMeta(meta || null);

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

    // Notify parent of group toggle
    useEffect(() => {
        onGroupToggle(showGroup);
    }, [ showGroup, onGroupToggle ]);

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

        if (showGroup) {
            const groupName = `${componentName.toLowerCase()}-group`;
            const propsToShow = Object.entries(props).filter(([ key, value ]) => {
                if (key === "id" || key === "label") return false;
                if (value === undefined || value === null || value === "") return false;
                if (value === false) return false;
                return true;
            });

            const optionProps = propsToShow
                .map(([ key, value ]) => {
                    if (typeof value === "boolean" && value) {
                        return `            ${key}`;
                    }
                    return null;
                })
                .filter(Boolean);

            // Determine initial value based on defaultChecked
            const initialValue = props.defaultChecked ? `["option1"]` : `[]`;

            return [
                `<${componentName}Group`,
                `    name="${groupName}"`,
                `    options={[`,
                `        {`,
                `            id: "option1",`,
                `            value: "option1",`,
                `            label: "Option 1",`,
                ...optionProps.map(p => `${p},`),
                `        },`,
                `        { id: "option2", value: "option2", label: "Option 2" },`,
                `        { id: "option3", value: "option3", label: "Option 3" },`,
                `    ]}`,
                `    value={${initialValue}}`,
                `    onChange={(values) => console.log(values)}`,
                `/>`,
            ].join("\n");
        }

        const propsEntries = Object.entries(props).filter(([ key, value ]) => {
            if (key === "label") return false; // Label shown separately
            if (value === undefined || value === null || value === "") return false;
            if (value === false) return false;
            return true;
        });

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

        const labelValue = props.label || "Check me";
        const labelProp = `    label="${labelValue}"`;

        if (propsString) {
            return `<${componentName}\n${propsString}\n${labelProp}\n/>`;
        }
        return `<${componentName}\n${labelProp}\n/>`;
    }, [ registry.component, props, showGroup ]);

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

                    <Divider kind="secondary" horizontalMargin="none" marginTop="micro" />

                    {/* Group Toggle Button */}
                    <Button
                        type="button"
                        size="small"
                        kind="secondary"
                        onClick={() => setShowGroup(!showGroup)}
                    >
                        {showGroup ? `Show single ${registry.component.toLowerCase()}` : `Create ${registry.component.toLowerCase()} group`}
                    </Button>
                </Form>
            </Div>
        </Div>
    );
};
