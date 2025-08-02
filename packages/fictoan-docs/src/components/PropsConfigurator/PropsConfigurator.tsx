// REACT CORE ==========================================================================================================
import React, { useState, useEffect } from "react";

// UI ==================================================================================================================
import { CodeBlock, Checkbox, RadioTabGroup, InputField, Callout, Div, Text, Header, Card, Heading6 } from "fictoan-react";

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
    defaultValue   : { value : any } | null;
    description    : string;
    name           : string;
    parent       ? : PropParent;
    declarations ? : PropDeclaration[];
    required       : boolean;
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

export const PropsConfigurator : React.FC<PropsConfiguratorProps> = ({componentName, onPropsChange}) => {
    const componentMetadata : ComponentMetadata = (metadata as any)[componentName];
    const [ props, setProps ] = useState<{ [key : string] : any }>(getInitialProps(componentMetadata));
    const [ enhancements, setEnhancements ] = useState<Enhancements | null>(null);
    const [ componentTemplate, setComponentTemplate ] = useState<ComponentTemplate | null>(null);
    const [ staleEnhancements, setStaleEnhancements ] = useState<string[]>([]);

    useEffect(() => {
        const importEnhancements = async () => {
            try {
                const {
                    enhancements: importedEnhancements,
                    componentTemplate: importedTemplate
                } = await import(`../../app/components/${componentName.toLowerCase()}/props.enhancements.ts`);
                
                setEnhancements(importedEnhancements);
                setComponentTemplate(importedTemplate || null);

                const metadataProps = Object.keys(componentMetadata.props);
                const enhancementProps = Object.keys(importedEnhancements);
                const stale = enhancementProps.filter(prop => !metadataProps.includes(prop));
                setStaleEnhancements(stale);

            } catch (error) {
                console.log(`No enhancements file found for ${componentName}`);
            }
        };

        importEnhancements();
    }, [ componentName, componentMetadata.props ]);

    useEffect(() => {
        onPropsChange(props);
    }, [ props, onPropsChange ]);

    const handlePropChange = (propName : string) => (value : string | boolean) => {
        setProps(prevProps => ({
            ...prevProps,
            [propName] : value,
        }));
    };

    const generateCodeString = () => {
        const configuredProps = Object.entries(props)
            .map(([ key, value ]) => {
                // Only show boolean props when they're true
                if (typeof value === "boolean" && value === true) {
                    return `    ${key}`;
                }
                // Only show string props when they have a value
                if (typeof value === "string" && value) {
                    return `    ${key}="${value}"`;
                }
                return null;
            })
            .filter(Boolean);

        // Add props that should always be included in code from enhancements
        const alwaysIncludeProps = enhancements ? 
            Object.entries(enhancements)
                .filter(([ key, enhancement ]) => enhancement.alwaysIncludeInCode)
                .map(([ key, enhancement ]) => {
                    if (enhancement.codeValue) {
                        return `    ${key}=${enhancement.codeValue}`;
                    }
                    return `    ${key}`;
                })
            : [];

        const allProps = [...configuredProps, ...alwaysIncludeProps];
        const propsString = allProps.join("\n");

        // Handle children content from componentTemplate
        if (componentTemplate?.hasChildren) {
            const childrenContent = componentTemplate.childrenContent || "Component content";
            const indentedChildren = `    ${childrenContent}`;
            return `<${componentName}\n${propsString}\n>\n${indentedChildren}\n</${componentName}>`;
        }

        return `<${componentName}\n${propsString}\n/>`;
    };

    if (!componentMetadata) {
        return <div>Component not found in metadata.</div>;
    }

    const renderPropControl = (propName : string, prop : PropDefinition) : React.ReactNode | null => {
        // Filter out common props from Element/constants.ts for rendering
        if (prop.parent && prop.parent.fileName.includes("fictoan-react/src/components/Element/constants.ts")) {
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
            return (
                <Checkbox
                    key={propName}
                    id={`prop-config-${propName}`}
                    name={propName}
                    label={label}
                    checked={props[propName] || false}
                    onChange={handlePropChange(propName)}
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

        return null;
    };

    // Filter out common props and render as a simple list
    const filteredMetadataProps = Object.entries(componentMetadata.props).filter(([ propName, prop ]) => {
        return !(prop.parent && prop.parent.fileName.includes("fictoan-react/src/components/Element/constants.ts"));
    });

    const propControls = filteredMetadataProps.map(([ propName, prop ]) => renderPropControl(propName, prop)).filter(Boolean);

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

            <CodeBlock language="tsx" marginBottom="micro">
                {generateCodeString()}
            </CodeBlock>

            <Div id="props-group">
                {propControls.map((control, index) => (
                    <React.Fragment key={index}>
                        {control}
                    </React.Fragment>
                ))}
            </Div>
        </Card>
    );
};