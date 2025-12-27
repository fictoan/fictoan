"use client";

// REACT CORE ==========================================================================================================
import React, { useState, useEffect, useCallback } from "react";

// UI ==================================================================================================================
import { CodeBlock, Div, Text, Header, InputField } from "fictoan-react";

// LIB =================================================================================================================
import { getControlComponent, inferControlType } from "$/lib/props-registry/controls";
import { PropsRegistryConfig, ResolvedProp, PropOption, ControlType } from "$/lib/props-registry/types";
import { isPropVisible, getOrderedPropNames } from "$/lib/props-registry/createPropsRegistry";

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

// Resolve a prop from metadata + registry config
function resolveProp(
    propName : string,
    propMeta : PropMetadata,
    registry : PropsRegistryConfig,
    currentValue : any,
) : ResolvedProp {
    const config = registry.props?.[propName] || {};
    const typeString = propMeta.type?.name || "string";

    // Determine options
    let options : PropOption[] | undefined = config.options as PropOption[] | undefined;
    if (!options && typeString.includes("|")) {
        options = parseEnumType(typeString);
    }

    // Determine control type
    let control : ControlType = config.control || inferControlType(propName, typeString, options);

    // Determine default value
    const defaultValue = config.defaultValue ?? propMeta.defaultValue?.value ?? undefined;

    return {
        name        : propName,
        label       : config.label || propName,
        description : config.description || propMeta.description || "",
        control,
        options,
        min         : config.min,
        max         : config.max,
        step        : config.step,
        unit        : config.unit,
        required    : propMeta.required ?? false,
        defaultValue,
        currentValue,
        hidden      : config.hidden ?? false,
        disabled    : config.disabled ?? false,
    };
}

// Check if a prop is inherited from Element/CommonProps
function isInheritedProp(propMeta : PropMetadata) : boolean {
    return propMeta.parent?.fileName?.includes("Element/constants") ?? false;
}

export const PropsConfiguratorNew : React.FC<PropsConfiguratorNewProps> = ({
    registry,
    onPropsChange,
}) => {
    const [ props, setProps ] = useState<Record<string, any>>({});
    const [ childrenContent, setChildrenContent ] = useState<string>("");
    const [ componentMeta, setComponentMeta ] = useState<ComponentMetadata | null>(null);

    // Load component metadata
    useEffect(() => {
        const meta = (metadata as unknown as Record<string, ComponentMetadata>)[registry.component];
        if (meta) {
            setComponentMeta(meta);

            // Initialize props with defaults from registry
            const initialProps : Record<string, any> = {};
            if (registry.demo?.defaultProps) {
                Object.assign(initialProps, registry.demo.defaultProps);
            }
            setProps(initialProps);

            // Initialize children content
            if (registry.demo?.hasChildren && registry.demo?.childrenContent) {
                setChildrenContent(
                    typeof registry.demo.childrenContent === "string"
                        ? registry.demo.childrenContent
                        : "",
                );
            }
        }
    }, [ registry ]);

    // Notify parent of prop changes
    useEffect(() => {
        const propsWithChildren = registry.demo?.hasChildren
            ? {...props, children : childrenContent}
            : props;
        onPropsChange(propsWithChildren);
    }, [ props, childrenContent, registry.demo?.hasChildren, onPropsChange ]);

    // Handle prop value change
    const handlePropChange = useCallback((propName : string) => (value : any) => {
        setProps((prev) => ({
            ...prev,
            [propName] : value,
        }));
    }, []);

    // Handle children content change
    const handleChildrenChange = useCallback((value : string) => {
        setChildrenContent(value);
    }, []);

    // Generate code string
    const generateCodeString = useCallback(() => {
        const componentName = registry.component;
        const propsEntries = Object.entries(props).filter(([ _, value ]) => {
            // Filter out undefined/null values and empty strings
            if (value === undefined || value === null || value === "") return false;
            // Filter out false booleans (they're the default)
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

        if (registry.demo?.hasChildren && childrenContent) {
            if (propsString) {
                return `<${componentName}\n${propsString}\n>\n    ${childrenContent}\n</${componentName}>`;
            }
            return `<${componentName}>\n    ${childrenContent}\n</${componentName}>`;
        }

        if (propsString) {
            return `<${componentName}\n${propsString}\n/>`;
        }
        return `<${componentName} />`;
    }, [ registry.component, props, childrenContent, registry.demo?.hasChildren ]);

    // Render loading state
    if (!componentMeta) {
        return (
            <Div padding="small">
                <Text>Loading component metadata...</Text>
            </Div>
        );
    }

    // Get list of inherited prop names
    const inheritedPropNames = Object.entries(componentMeta.props)
        .filter(([ _, meta ]) => isInheritedProp(meta))
        .map(([ name ]) => name);

    // Get visible prop names
    const allPropNames = Object.keys(componentMeta.props).filter((propName) => {
        const propMeta = componentMeta.props[propName];
        // Skip inherited props unless explicitly shown
        if (isInheritedProp(propMeta)) {
            if (registry.hideInheritedProps !== false) {
                return registry.showInheritedProps?.includes(propName) ?? false;
            }
        }
        // Check registry visibility
        return isPropVisible(propName, registry, inheritedPropNames);
    });

    // Order props
    const orderedPropNames = getOrderedPropNames(allPropNames, registry);

    // Resolve all props
    const resolvedProps = orderedPropNames.map((propName) => {
        const propMeta = componentMeta.props[propName];
        return resolveProp(propName, propMeta, registry, props[propName]);
    }).filter((p) => !p.hidden);

    // Render a single prop control
    const renderPropControl = (resolvedProp : ResolvedProp) => {
        const ControlComponent = getControlComponent(resolvedProp.control);
        return (
            <Div key={resolvedProp.name} className="prop-control" marginBottom="nano">
                <ControlComponent
                    prop={resolvedProp}
                    value={resolvedProp.currentValue}
                    onChange={handlePropChange(resolvedProp.name)}
                />
            </Div>
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

            {/* Children Content Editor */}
            {registry.demo?.hasChildren && (
                <InputField
                    id="children-content"
                    name="children"
                    label="Content"
                    value={childrenContent}
                    onChange={handleChildrenChange}
                    marginBottom="micro"
                />
            )}

            {/* Props */}
            <Div id="props-list">
                {resolvedProps.map(renderPropControl)}
            </Div>
        </Div>
    );
};
