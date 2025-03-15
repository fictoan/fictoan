import { useState, useCallback } from "react";
import {
    RadioTabGroup,
    Row,
    Portion,
    Card,
    Header,
    Heading6,
    Text,
    CodeBlock,
    ListBox,
    Checkbox,
    InputField,
} from "fictoan-react";

import { MASTER_PROPS_CONFIG } from "./masterPropsConfig";

export const createPropsConfigurator = (
    componentName,
    propsToConfig = [],
    colorOptions = [],
    componentConfig = {
        canHaveChildren : false,
        isSelfClosing   : false,
        defaultChildren : null,
    }) => {
    // INITIALISE STATE WITH UNDEFINED VALUES //////////////////////////////////////////////////////////////////////////
    const [propValues, setPropValues] = useState(() => {
        const defaults = {
            // Set default children for components that can have them
            children : componentConfig.defaultChildren || null,
        };

        propsToConfig.forEach(prop => {
            const config = MASTER_PROPS_CONFIG[prop];

            if (config?.type === "text") {
                // Handle the strings config
                if (prop === "strings") {
                    const componentSpecific = config[componentName];
                    const defaultConfig = config.default;
                    const defaultValue = componentSpecific?.value || defaultConfig?.value;

                    if (defaultValue) {
                        // For Tooltip, we want to use this as isTooltipFor ============================================
                        if (componentName === "Tooltip") {
                            defaults.isTooltipFor = defaultValue;
                            // Also set content to maintain sync with input
                            defaults.content = defaultValue;
                        } else {
                            defaults.content = defaultValue;
                        }
                    }
                }
            }

            // Handle emphasis defaults ================================================================================
            if (config?.type === "emphasis" && config?.defaultValues?.[componentName.toLowerCase()]) {
                defaults[prop] = config.defaultValues[componentName.toLowerCase()];
            }
        });
        return defaults;
    });

    // GENERIC HANDLER FOR PROP CHANGES ////////////////////////////////////////////////////////////////////////////////
    const handlePropChange = useCallback((propName, value) => {
        setPropValues(prev => {
            // Only update if value is meaningful
            if (value === "select-default" || value === "none" || value === undefined) {
                const newProps = { ...prev };
                delete newProps[propName];
                return newProps;
            }

            // Special handling for Tooltip ============================================================================
            if (componentName === "Tooltip") {
                // If we're updating content or isTooltipFor, update both to stay in sync
                if (propName === "content" || propName === "isTooltipFor") {
                    return {
                        ...prev,
                        content      : value,
                        isTooltipFor : value,
                    };
                }
            }

            return { ...prev, [propName] : value };
        });
    }, [componentName]);

    // GENERATE JSX FOR THE CODE BLOCK /////////////////////////////////////////////////////////////////////////////////
    const generateCodeString = useCallback(() => {
        // STEP 1 : Generate props string from propValues ==============================================================
        const props = Object.entries(propValues)
            .filter(([key, value]) => {
                // Don't include content if it's being handled by contentStrategy
                if (key === "content" && componentConfig.canHaveChildren) {
                    return false;
                }
                // Don't include children in props string
                if (key === "children") {
                    return false;
                }
                return value !== undefined && value !== "select-default";
            })
            .map(([key, value]) => {
                // Special handling for boolean props
                const config = MASTER_PROPS_CONFIG[key];
                if (config?.type === "boolean") {
                    return value === true ? `    ${key}` : null;
                }

                return `    ${key}="${value}"`;
            })
            .filter(Boolean)
            .join("\n");


        // STEP 1a : Handle props that are react nodes, if any =========================================================
        const reactNodeProps = Object.entries(MASTER_PROPS_CONFIG)
            .filter(([key]) => propsToConfig.includes(key) && MASTER_PROPS_CONFIG[key].type === "reactNode")
            .map(([key, config]) => {
                return `    ${key}={(
        ${config.defaultValue}
    )}`;
            })
            .join("\n");

        // STEP 1b : Handle additional imports =========================================================================
        const imports = new Set([componentName]);
        // For Tooltip, we need Div component too
        if (componentName === "Tooltip") {
            imports.add("Div");
        }
        const importsString = `import { ${Array.from(imports).join(", ")} } from "fictoan-react";`;

        // STEP 1c : CONDITIONAL ADDITIONAL PROPS ======================================================================
        // Add any component-specific conditional props (like onDelete for Badge)
        const additionalProps = propValues.withDelete
            ? `    onDelete={() => doSomething()}`
            : ``;

        // STEP 2 : CONSOLIDATE PROPS ==================================================================================
        const hasProps = props.length > 0 || additionalProps || reactNodeProps;

        // STEP 3 : OPENING TAG ========================================================================================
        let codeStructure = [];

        switch(componentName) {
            // Need extra demo div for Tooltip -------------------------------------------------------------------------
            case "Tooltip": {
                const targetId = propValues.isTooltipFor || "tooltip-target";
                codeStructure.push(`<Div id="${targetId}">Tooltip target</Div>\n`);

                // Add Tooltip with props
                codeStructure.push(
                    `<${componentName}${hasProps ? "" : ">"}`,
                    hasProps && props,
                    hasProps && additionalProps,
                    hasProps && reactNodeProps,
                    hasProps && ">"
                );
                break;
            }

            // Regular component opening tag ---------------------------------------------------------------------------
            default: {
                codeStructure.push(
                    `<${componentName}${hasProps ? "" : componentConfig.isSelfClosing ? " />" : ">"}`,
                    hasProps && props,
                    hasProps && additionalProps,
                    hasProps && reactNodeProps,
                    hasProps && (componentConfig.isSelfClosing ? "/>" : ">")
                );
            }
        }

        // STEP 4 : ADD CONTENT AND CLOSING TAGS =======================================================================
        // Children content only for non-self-closing components
        if (!componentConfig.isSelfClosing) {
            // Add children content ------------------------------------------------------------------------------------
            const content = propValues.children || (componentName === "Badge" ? propValues.content : null);

            if (content) {
                codeStructure.push(content);
            }

            // Add closing tag -----------------------------------------------------------------------------------------
            codeStructure.push(`</${componentName}>`);
        }

        // STEP 5 : Put it all together ================================================================================
        const componentCode = codeStructure.filter(Boolean).join("\n");

        return [
            `{/* Paste this in your content file */}`,
            importsString,
            ` `,
            componentCode
        ].filter(Boolean).join("\n");
    }, [componentName, propValues, componentConfig, propsToConfig]);

    // GENERATE CONTROLS FOR DIFFERENT PROP TYPES //////////////////////////////////////////////////////////////////////
    const generateControl = useCallback((propName) => {
        const config = MASTER_PROPS_CONFIG[propName];
        if (!config) return null;

        const { type, label, options } = config;

        switch (type) {
            // RADIOTABGROUP FOR SPACING, SHAPE, SIZE, AND EMPHASIS ====================================================
            case "spacing":
            case "shape":
            case "size":
            case "position":
            case "emphasis":
            case "showOn":

                return (
                    <Portion key={propName}>
                        <RadioTabGroup
                            id={propName}
                            label={label}
                            name={propName}
                            // Get the variant options or fall back to default options
                            options={options || config.variants?.[componentName.toLowerCase()] || config.variants?.default || []}
                            value={propValues[propName]}
                            onChange={(value) => handlePropChange(propName, value)}
                        />
                    </Portion>
                );

            // LISTBOX FOR COLOR PROPS =================================================================================
            case "select":
                const { defaultOption } = config;
                return (
                    <Portion key={propName} desktopSpan="half">
                        <ListBox
                            label={label}
                            options={[
                                {
                                    label    : defaultOption,
                                    value    : undefined,
                                    disabled : true,
                                    selected : !propValues[propName],
                                },
                                ...colorOptions,
                            ]}
                            value={propValues[propName]}
                            onChange={(value) => handlePropChange(propName, value)}
                            isFullWidth
                        />
                    </Portion>
                );

            // CHECKBOX FOR BOOLEAN PROPS ==============================================================================
            case "boolean":
                return (
                    <Portion key={propName} desktopSpan="half" verticallyCentreItems>
                        <Checkbox
                            id={propName}
                            label={label}
                            name={propName}
                            checked={propValues[propName] || false}
                            onChange={(checked) => handlePropChange(propName, checked)}
                        />
                    </Portion>
                );

            // INPUT FOR TEXT PROPS ====================================================================================
            case "text": {
                const componentSpecific = config[componentName];
                const defaultConfig = config.default;
                const labelText = componentSpecific?.label || defaultConfig?.label;
                const helpText = componentSpecific?.helpText;

                // Special handling for strings config
                if (propName === "strings") {
                    const componentSpecific = config[componentName];
                    const defaultConfig = config.default;
                    const labelText = componentSpecific?.label || defaultConfig?.label;
                    const helpText = componentSpecific?.helpText;

                    return (
                        <Portion key={propName}>
                            <InputField
                                type="text"
                                label={labelText}
                                placeholder={labelText}
                                value={propValues.content}  // Note: we use content here
                                onChange={(value) => handlePropChange("content", value)}
                                helpText={helpText}
                                isFullWidth
                            />
                        </Portion>
                    );
                }

                return (
                    <Portion key={propName}>
                        <InputField
                            type="text"
                            label={labelText}
                            placeholder={labelText}
                            value={propValues[propName]}
                            onChange={(value) => handlePropChange(propName, value)}
                            helpText={helpText}
                            isFullWidth
                        />
                    </Portion>
                );
            }

            default:
                return null;
        }
    }, [propValues, handlePropChange, colorOptions]);

    // GET VALID CONFIGURATION FOR REQUESTED PROPS /////////////////////////////////////////////////////////////////////
    const validProps = propsToConfig.filter(prop => MASTER_PROPS_CONFIG[prop]);

    // Component props based on current values - filter out undefined and select-default values ========================
    const componentProps = Object.fromEntries(
        Object.entries(propValues)
            .filter(([_, value]) => value !== undefined && value !== "select-default"),
    );

    // GENERATE PROPS CONFIGURATOR /////////////////////////////////////////////////////////////////////////////////////
    const propsConfigurator = () => (
        <Card padding="micro" shape="rounded">
            <Header marginBottom="micro">
                <Heading6 style={{ marginBottom : "4px" }}>
                    Configure props
                </Heading6>
                <Text size="small">
                    This is for individual instances of {componentName}
                </Text>
            </Header>

            <Row marginBottom="none">
                <Portion>
                    <CodeBlock
                        withSyntaxHighlighting
                        language="jsx"
                        showCopyButton
                        marginBottom="micro"
                    >
                        {generateCodeString()}
                    </CodeBlock>
                </Portion>

                {validProps.map(generateControl)}
            </Row>
        </Card>
    );

    return {
        propsConfigurator,
        componentProps,
        propValues,
    };
};
