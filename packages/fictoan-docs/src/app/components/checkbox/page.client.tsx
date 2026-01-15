"use client";

// REACT CORE ==========================================================================================================
import React, { useState, useEffect, useCallback, useMemo } from "react";

// UI ==================================================================================================================
import {
    Div,
    Heading6,
    Text,
    Divider,
    Checkbox,
    CheckboxGroup,
    Switch,
    SwitchGroup,
    CodeBlock,
    Header,
    Form,
    RadioTabGroup,
}from "fictoan-react";

// LOCAL COMPONENTS ====================================================================================================
import "../../../components/PropsConfigurator/props-configurator.css";

// LIB =================================================================================================================
import { ResolvedProp, ControlType } from "$/lib/props-registry/types";
import { getControlComponent, inferControlType } from "$/lib/props-registry/controls";
import { getOrderedPropNames } from "$/lib/props-registry/createPropsRegistry";

// STYLES ==============================================================================================================
import "../../../styles/fictoan-theme.css";
import "./page-checkbox.css";

// OTHER ===============================================================================================================
import metadata from "fictoan-react/dist/props-metadata.json";
import { ComponentDocsLayout } from "../ComponentDocsLayout";
import { checkboxRegistry } from "./props.registry";

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

const CheckboxDocs = () => {
    const [ props, setProps ] = useState<Record<string, any>>({});
    const [ showGroup, setShowGroup ] = useState(false);
    const [ groupValue, setGroupValue ] = useState<string[]>([]);
    const [ componentType, setComponentType ] = useState<"checkbox" | "switch">("checkbox");
    const [ componentMeta, setComponentMeta ] = useState<ComponentMetadata | null>(null);

    // Load component metadata and initialize props with defaults
    useEffect(() => {
        const meta = (metadata as unknown as Record<string, ComponentMetadata>)[checkboxRegistry.component];
        setComponentMeta(meta || null);

        const initialProps : Record<string, any> = {};
        for (const [ propName, config ] of Object.entries(checkboxRegistry.props)) {
            if (config.defaultValue !== undefined) {
                initialProps[propName] = config.defaultValue;
            }
        }
        setProps(initialProps);
    }, []);

    // Create group options with memoization
    const groupOptions = useMemo(() => [
        {
            id       : "option1",
            value    : "option1",
            label    : "Option 1",
            disabled : props.disabled || false,
        },
        { id : "option2", value : "option2", label : "Option 2" },
        { id : "option3", value : "option3", label : "Option 3" },
    ], [ props.disabled ]);

    // Update group value when defaultChecked changes
    useEffect(() => {
        if (showGroup) {
            setGroupValue(props.defaultChecked ? ["option1"] : []);
        }
    }, [ props.defaultChecked, showGroup ]);

    // Handle prop value change
    const handlePropChange = useCallback((propName : string) => (value : any) => {
        setProps((prev) => ({
            ...prev,
            [propName] : value,
        }));
    }, []);

    // Debug handlers
    const handleComponentTypeChange = (value : string) => {
        console.log("Component type changing to:", value, "from:", componentType);
        setComponentType(value as "checkbox" | "switch");
    };

    const handleShowGroupChange = (checked : boolean) => {
        console.log("Show group changing to:", checked, "from:", showGroup);
        setShowGroup(checked);
    };

    console.log("Render - componentType:", componentType, "showGroup:", showGroup);

    // Generate code string
    const generateCodeString = useCallback(() => {
        const componentName = componentType === "checkbox" ? "Checkbox" : "Switch";

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
            if (key === "label") return false;
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
    }, [ componentType, props, showGroup ]);

    // Get prop names in registry order
    const orderedPropNames = getOrderedPropNames(checkboxRegistry);

    // Resolve all props
    const resolvedProps = orderedPropNames.map((propName) => {
        const config = checkboxRegistry.props[propName];
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

    const displayName = componentType === "checkbox" ? "Checkbox" : "Switch";

    return (
        <ComponentDocsLayout>
            {/* INTRO HEADER /////////////////////////////////////////////////////////////////////////////////////// */}
            <Div id="intro-header">
                <Heading6 id="component-name">
                    Checkbox
                </Heading6>

                <Text
                    id="component-description"
                    weight="400"
                >
                    A click-to-toggle component to make a choice
                </Text>
            </Div>

            {/* INTRO NOTES //////////////////////////////////////////////////////////////////////////////////////// */}
            <Div id="intro-notes">
                <Divider kind="tertiary" verticalMargin="micro" />

                <Text>
                    Use checkboxes when users need to select multiple options from a list.
                </Text>

                <Text>
                    For a single on/off toggle, use the Switch variant instead.
                </Text>
            </Div>

            {/* DEMO COMPONENT ///////////////////////////////////////////////////////////////////////////////////// */}
            <Div id="demo-component">
                {showGroup ? (
                    componentType === "checkbox" ? (
                        <CheckboxGroup
                            name="checkbox-group"
                            options={groupOptions}
                            value={groupValue}
                            onChange={(values) => setGroupValue(values)}
                            align="horizontal"
                        />
                    ) : (
                        <SwitchGroup
                            name="switch-group"
                            options={groupOptions}
                            value={groupValue}
                            onChange={(values) => setGroupValue(values)}
                            align="horizontal"
                        />
                    )
                ) : (
                    componentType === "checkbox" ? (
                        <Checkbox
                            key={`checkbox-${props.defaultChecked}-${props.disabled}`}
                            {...props}
                        />
                    ) : (
                        <Switch
                            key={`switch-${props.defaultChecked}-${props.disabled}`}
                            {...props}
                        />
                    )
                )}
            </Div>

            {/* PROPS CONFIG /////////////////////////////////////////////////////////////////////////////////////// */}
            <Div id="props-config">
                <Div id="props-configurator-new">
                    <Header marginBottom="micro">
                        <Text>Configure {displayName} props</Text>
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

                        {/* Component Type Toggle */}
                        <RadioTabGroup
                            id="component-type-toggle"
                            name="component-type-toggle"
                            label="Component type"
                            options={[
                                { id : "type-checkbox", value : "checkbox", label : "Checkbox" },
                                { id : "type-switch", value : "switch", label : "Switch" },
                            ]}
                            value={componentType}
                            onChange={handleComponentTypeChange}
                        />

                        {/* Group Toggle */}
                        <Checkbox
                            id="show-as-group-toggle"
                            label="Show as group"
                            checked={showGroup}
                            onChange={handleShowGroupChange}
                        />
                    </Div>
                </Div>
            </Div>
        </ComponentDocsLayout>
    );
};

export default CheckboxDocs;
