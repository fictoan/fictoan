// REACT CORE ==========================================================================================================
import React, { useState, useEffect } from "react";

// UI ==================================================================================================================
import { CodeBlock, Checkbox, RadioTabGroup, InputField, Callout, Div, Text, Header, Card, Heading6, Spinner, Range } from "fictoan-react";

// STYLES ==============================================================================================================
import "./props-configurator.css";

// OTHER ===============================================================================================================
import metadata from "fictoan-react/dist/props-metadata.json";

interface PropDeclaration {
        fileName : string;
        name     : string;
}

interface PropParent {
        fileName : string;
        name     : string;
}

interface PropType {
        name : string;
}

interface PropDefinition {
        defaultValue ? : { value : any } | null | undefined;
        description  ? : string;
        name           : string;
        parent       ? : PropParent;
        declarations ? : PropDeclaration[];
        required     ? : boolean;
        type           : PropType;
}

interface ComponentMetadata {
        displayName : string;
        description : string;
        props       : { [key : string] : PropDefinition };
}

interface EnhancementOption {
        id    : string;
        value : string;
        label : string;
}

interface PropEnhancement {
        label               ? : string;
        control             ? : string;
        group               ? : string;
        hidden              ? : boolean;
        options             ? : EnhancementOption[];
        alwaysIncludeInCode ? : boolean;
        codeValue           ? : string;
}

interface Enhancements {
        [key : string] : PropEnhancement;
}

interface ComponentTemplate {
        hasChildren     ? : boolean;
        childrenContent ? : string;
}

interface PropsConfiguratorProps {
        componentName : string;
        onPropsChange : (props : { [key : string] : any }) => void;
}

// A helper function to get the initial state from metadata
const getInitialProps = (componentMetadata : ComponentMetadata) => {
    const initialProps : { [key : string] : any } = {};
    for (const propName in componentMetadata.props) {
        const prop = componentMetadata.props[propName];
        // Filter out common props from Element/constants.ts for initial state
        if (prop.parent && prop.parent.fileName.includes("fictoan-react/src/components/Element/constants.ts")) {
            continue;
        }

        if (prop.defaultValue) {
            initialProps[propName] = prop.defaultValue.value;
        } else if (prop.type.name === "boolean") {
            initialProps[propName] = false;
        }
    }
    return initialProps;
};

// A helper function to get default children content for components
const getDefaultChildrenContent = (componentName: string): string => {
    switch (componentName) {
        case "Accordion":
            return "Accordion content goes here";
        case "Button":
            return "Button";
        case "Callout":
            return "Important information goes here";
        case "Card":
            return "Card content goes here";
        case "Drawer":
            return "Drawer content goes here";
        default:
            return componentName;
    }
};

export const PropsConfigurator : React.FC<PropsConfiguratorProps> = ({componentName, onPropsChange}) => {
    const [ componentMetadataObj, setComponentMetadataObj ] = useState<ComponentMetadata | null>(null);
    const [ props, setProps ] = useState<{ [key : string] : any }>({});
    const [ childrenContent, setChildrenContent ] = useState<string>("");
    const [ enhancements, setEnhancements ] = useState<Enhancements | null>(null);
    const [ componentTemplate, setComponentTemplate ] = useState<ComponentTemplate | null>(null);
    const [ staleEnhancements, setStaleEnhancements ] = useState<string[]>([]);

    // TEMPORARY: The current implementation consumes fictoan-react/dist/props-metadata.json,
    // which is a build artifact derived from the component source. This is transitional.
    // We will migrate to an analyzer-first path that reads types directly from source with an
    // ephemeral, dev-only cache and no long-lived stored metadata. See SOURCE_OF_TRUTH.md.
    useEffect(() => {
        if (process.env.NODE_ENV !== "production") {
            // eslint-disable-next-line no-console
            console.warn(
                "[PropsConfigurator] Using transitional props-metadata.json. " +
                "Analyzer-first mode will remove reliance on persisted metadata.",
            );
        }
        // Run once on mount
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Analyzer-first: try to analyze from source (stub for Accordion), fall back to legacy metadata
    useEffect(() => {
        let cancelled = false;
        const load = async () => {
            try {
                const {analyzeComponent} = await import("../../lib/type-analyzer/TypeAnalyzer");
                const analyzed = await analyzeComponent(componentName);
                const fallback = (metadata as any)[componentName] as ComponentMetadata;
                const chosen = analyzed || fallback;
                if (!cancelled) {
                    setComponentMetadataObj(chosen);
                    const initialProps = getInitialProps(chosen);

                    // Set sensible defaults for special props
                    if (componentName === "Accordion" && chosen?.props?.summary) {
                        initialProps.summary = "Click to expand";
                    }
                    if (componentName === "Callout" && chosen?.props?.kind) {
                        initialProps.kind = "info";
                    }
                    if (componentName === "Divider" && chosen?.props?.kind) {
                        initialProps.kind = "primary";
                    }
                    if (componentName === "Drawer" && chosen?.props?.id) {
                        initialProps.id = "sample-drawer";
                    }

                    setProps(initialProps);

                    // Initialize children content if analyzer indicates children prop or for special components
                    if (chosen?.props && ((chosen.props as any).children || componentName === "Button" || componentName === "Card" || componentName === "Drawer")) {
                        setChildrenContent(getDefaultChildrenContent(componentName));
                    }
                }
            } catch (e) {
                const fallback = (metadata as any)[componentName] as ComponentMetadata;
                if (!cancelled) {
                    setComponentMetadataObj(fallback);
                    setProps(getInitialProps(fallback));
                    if (fallback?.props && (fallback.props as any).children) {
                        setChildrenContent(getDefaultChildrenContent(componentName));
                    }
                }
            }
        };
        load();
        return () => {
            cancelled = true;
        };
    }, [ componentName ]);

    useEffect(() => {
        const importEnhancements = async () => {
            try {
                const {
                    enhancements : importedEnhancements,
                    componentTemplate : importedTemplate,
                } = await import(`../../app/components/${componentName.toLowerCase()}/props.enhancements.ts`);

                setEnhancements(importedEnhancements);
                setComponentTemplate(importedTemplate || null);

                // Set initial children content if component has children
                if (importedTemplate?.hasChildren) {
                    setChildrenContent(importedTemplate.childrenContent || componentName);
                }

                if (componentMetadataObj) {
                    const metadataProps = Object.keys(componentMetadataObj.props);
                    const enhancementProps = Object.keys(importedEnhancements);
                    const stale = enhancementProps.filter(prop => !metadataProps.includes(prop));
                    setStaleEnhancements(stale);
                }

            } catch (error) {
                console.log(`No enhancements file found for ${componentName}`);
            }
        };

        importEnhancements();
    }, [ componentName, componentMetadataObj ]);

    useEffect(() => {
        const hasChildrenFromMetadata = !!componentMetadataObj?.props?.children;
        const isSpecialChildrenComponent = componentName === "Button" || componentName === "Card" || componentName === "Drawer"; // Components that use children for content
        const isChildrenTextEditable = (componentTemplate?.hasChildren || hasChildrenFromMetadata || isSpecialChildrenComponent) && componentName !== "Breadcrumbs";
        const propsWithChildren = isChildrenTextEditable
            ? {...props, children : childrenContent}
            : props;
        onPropsChange(propsWithChildren);
    }, [ props, childrenContent, componentTemplate, componentMetadataObj, componentName, onPropsChange ]);

    const handlePropChange = (propName : string) => (value : string | boolean) => {
        setProps(prevProps => ({
            ...prevProps,
            [propName] : value,
        }));
    };

    const handleChildrenChange = (value : string) => {
        setChildrenContent(value);
    };

    const generateCodeString = () => {
        // Use the intelligent CodeGenerator for better code generation
        const {CodeGenerator} = require("../../lib/code-generator/CodeGenerator");

        if (componentMetadataObj) {
            const generator = new CodeGenerator(
                componentName,
                componentMetadataObj,
                props,
                childrenContent,
            );

            // Show complete code with imports for better developer experience
            return generator.generateCompleteCode();
        }

        // Fallback to simple generation if metadata not available
        const configuredProps = Object.entries(props)
            .map(([ key, value ]) => {
                if (typeof value === "boolean" && value === true) {
                    return `    ${key}`;
                }
                if (typeof value === "string" && value) {
                    return `    ${key}="${value}"`;
                }
                return null;
            })
            .filter(Boolean);

        const propsString = configuredProps.join("\n");

        if (childrenContent) {
            return `<${componentName}\n${propsString}\n>\n    ${childrenContent}\n</${componentName}>`;
        }

        return `<${componentName}\n${propsString}\n/>`;
    };

    if (!componentMetadataObj) {
        return (
            <Div horizontallyCentreThis marginTop="micro">
                <Spinner />
                <div>Loading component metadata…</div>
            </Div>
        );
    }

    const renderPropControl = (propName : string, prop : PropDefinition) : React.ReactNode | null => {
        // Filter out common props from Element/constants.ts for rendering
        if ((prop as any).parent && (prop as any).parent.fileName && (prop as any).parent.fileName.includes(
            "fictoan-react/src/components/Element/constants.ts")) {
            return null;
        }

        // For Button component, hide the label prop since we use children for content
        if (componentName === "Button" && propName === "label") {
            return null;
        }

        // For Card component, hide the heading prop since it's only for accessibility
        if (componentName === "Card" && propName === "heading") {
            return null;
        }

        // For Divider component, hide the label prop since it's only for accessibility
        if (componentName === "Divider" && propName === "label") {
            return null;
        }

        // For Drawer component, hide label and description props since they're accessibility-only
        if (componentName === "Drawer" && (propName === "label" || propName === "description")) {
            return null;
        }

        const enhancement = enhancements ? enhancements[propName] : null;

        if (enhancement?.hidden) {
            return null;
        }

        const label = enhancement?.label || propName;
        const propType = prop.type.name;

        // Prioritize options from enhancement file
        if (enhancement?.options) {
            return (
                <RadioTabGroup
                    key={propName}
                    id={`prop-config-${propName}`}
                    name={propName}
                    label={label}
                    options={enhancement.options}
                    value={props[propName]}
                    onChange={handlePropChange(propName)}
                />
            );
        }

        if (propType === "boolean") {
            // Check if this boolean prop has a default value of true
            const hasDefaultTrue = prop.defaultValue?.value === true;
            const displayLabel = hasDefaultTrue ? `${label} (on by default)` : label;
            
            return (
                <Checkbox
                    key={propName}
                    id={`prop-config-${propName}`}
                    name={propName}
                    label={displayLabel}
                    checked={props[propName] !== undefined ? props[propName] : hasDefaultTrue}
                    onChange={handlePropChange(propName)}
                />
            );
        }

        // Special handling for Divider height prop - use Range input
        if (componentName === "Divider" && propName === "height") {
            return (
                <Range
                    key={propName}
                    id={`prop-config-${propName}`}
                    name={propName}
                    label={`${label}`}
                    min={1} max={20} step={1}
                    value={parseInt(props[propName]) || 1}
                    suffix="px"
                    onChange={(value: number) => handlePropChange(propName)(`${value}px`)}
                />
            );
        }

        if (propType.includes("|")) { // This is a simple way to detect enums
            const options = propType.split("|").map((option : string) => {
                const value = option.trim().replace(/\'/g, "");
                return {id : `prop-config-${propName}-${value}`, value : value, label : value};
            });

            return (
                <RadioTabGroup
                    key={propName}
                    id={`prop-config-${propName}`}
                    name={propName}
                    label={label}
                    options={options}
                    value={props[propName]}
                    onChange={handlePropChange(propName)}
                />
            );
        }

        if (propType === "string") {
            return (
                <InputField
                    key={propName}
                    id={`prop-config-${propName}`}
                    name={propName}
                    label={label}
                    value={props[propName] || ""}
                    onChange={handlePropChange(propName)}
                />
            );
        }

        // Handle ReactNode props (like summary) as text inputs
        if (propType === "ReactNode" && propName !== "children") {
            return (
                <InputField
                    key={propName}
                    id={`prop-config-${propName}`}
                    name={propName}
                    label={label}
                    value={props[propName] || ""}
                    onChange={handlePropChange(propName)}
                />
            );
        }

        return null;
    };

    // Filter out common props and render as a simple list
    const filteredMetadataProps = Object.entries(componentMetadataObj.props).filter(([ propName, prop ]) => {
        // In analyzer-first mode, parent may be undefined; guard accordingly
        return !(prop.parent && (prop.parent as any).fileName && (prop.parent as any).fileName.includes(
            "fictoan-react/src/components/Element/constants.ts"));
    });

    const propControls = filteredMetadataProps.map(([ propName, prop ]) => renderPropControl(propName, prop as any))
        .filter(Boolean);

    return (
        <Card
            id="props-configurator"
            padding="micro" shape="rounded"
        >
            <Header marginBottom="micro">
                <Heading6 style={{marginBottom : "4px"}}>
                    Configure props
                </Heading6>
                <Text size="small">
                    This is for individual instances of {componentName}
                </Text>
            </Header>

            {staleEnhancements.length > 0 && (
                <Callout kind="error" marginBottom="micro">
                    <Text>The following enhancements are stale and should be removed:</Text>
                    <ul>
                        {staleEnhancements.map(prop => <li key={prop}>{prop}</li>)}
                    </ul>
                </Callout>
            )}

            <CodeBlock
                language="tsx"
                withSyntaxHighlighting
                showCopyButton
                marginBottom="micro"
            >
                {generateCodeString()}
            </CodeBlock>

            <Div id="props-group">
                {(componentName !== "Breadcrumbs") && (componentTemplate?.hasChildren || !!componentMetadataObj?.props?.children || componentName === "Button" || componentName === "Card" || componentName === "Drawer") && (
                    <InputField
                        id="children-content"
                        name="children"
                        label="Content"
                        value={childrenContent}
                        onChange={handleChildrenChange}
                        marginBottom="micro"
                    />
                )}

                {propControls.length === 0 && !enhancements ? (
                    <Callout kind="info" marginBottom="micro">
                        <Text>
                            This component inherits common props
                            like <code>padding</code>, <code>shape</code>, <code>bgColour</code>,
                            and <code>borderColour</code> from the Element system.
                        </Text>
                    </Callout>
                ) : (
                    propControls.map((control, index) => (
                        <React.Fragment key={index}>
                            {control}
                        </React.Fragment>
                    ))
                )}
            </Div>
        </Card>
    );
};