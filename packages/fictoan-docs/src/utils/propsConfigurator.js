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

        // For CodeBlock, set default language and sample code
        if (componentName === "CodeBlock") {
            defaults.language = "jsx";
            // Set default usage approach for CodeBlock
            defaults.source = "import"; // This controls import vs embed approach
            // We'll store the actual code content in sourceContent
            defaults.sourceContent = ""; // Will be filled by the page component
        }

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
                // Skip usage prop for CodeBlock - will handle separately
                if (componentName === "CodeBlock" && key === "usage") {
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
        const reactImports = new Set();

        // For Tooltip, we need Div component too
        if (componentName === "Tooltip") {
            imports.add("Div");
        }

        // For Drawer, we need showDrawer, hideDrawer utilities and Button component
        if (componentName === "Drawer") {
            imports.add("Button");
            imports.add("Text");
            imports.add("showDrawer");
            imports.add("hideDrawer");
        }

        const importsString = [
            reactImports.size > 0 ? `import React, { ${Array.from(reactImports).join(", ")} } from "react";` : null,
            `import { ${Array.from(imports).join(", ")} } from "fictoan-react";`,
        ].filter(Boolean).join("\n");

        // STEP 1c : CONDITIONAL ADDITIONAL PROPS ======================================================================
        // Add any component-specific conditional props (like onDelete for Badge)
        const additionalProps = propValues.withDelete
            ? `    onDelete={() => doSomething()}`
            : ``;

        // STEP 1d : SPECIAL HANDLING FOR CODE BLOCK USAGE =============================================================
        if (componentName === "CodeBlock") {
            const usageApproach = propValues.source || "import";

            // Generate common props for both examples
            const commonProps = [
                "    language=\"jsx\"",
                "    withSyntaxHighlighting",
                "    showCopyButton",
                "    showLineNumbers",
            ].join("\n");

            if (usageApproach === "import") {
                return [
                    `{/* Option 1: Import approach */}`,
                    `import { ${componentName} } from "fictoan-react";`,
                    `import { sampleCode } from "./codeSamples.js";`,
                    ``,
                    `<${componentName}`,
                    commonProps,
                    `    source={sampleCode}`,
                    `/>`,
                ].filter(Boolean).join("\n");
            } else if (usageApproach === "inline") {
                // Sample code for inline approach
                const inlineCode = [
                    `import React from "react";`,
                    `import { CodeBlock } from "fictoan-react";`,
                    `import { sampleCode } from "./sampleCode";`,
                    ``,
                    `<CodeBlock`,
                    `    language="jsx"`,
                    `    withSyntaxHighlighting`,
                    `    showCopyButton`,
                    `    showLineNumbers`,
                    `    source={sampleCode}`,
                    `/>`,
                ];

                return [
                    `{/* Option 2: Inline approach */}`,
                    `import { ${componentName} } from "fictoan-react";`,
                    ``,
                    `<${componentName}`,
                    commonProps,
                    `>`,
                    `{[`,
                    ...inlineCode.map(line => `    \`${line}\``),
                    `].join("\\n")}`,
                    `</${componentName}>`,
                ].filter(Boolean).join("\n");
            }
        }

        // STEP 2 : CONSOLIDATE PROPS ==================================================================================
        const hasProps = props.length > 0 || additionalProps || reactNodeProps;

        // STEP 3 : OPENING TAG ========================================================================================
        let codeStructure = [];

        switch (componentName) {
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
                    hasProps && ">",
                );
                break;
            }

            // Special handling for Drawer component ---------------------------------------------------------------
            case "Drawer": {
                // Add trigger button first
                codeStructure.push(
                    `<Button onClick={() => showDrawer("sample-drawer")}>`,
                    `    Open drawer`,
                    `</Button>\n`,
                );

                // Generate drawer props, ensuring id is always included
                const drawerProps = Object.entries(propValues)
                    .filter(([key, value]) => {
                        if (key === "content" || key === "children") return false;
                        return value !== undefined && value !== "select-default";
                    })
                    .map(([key, value]) => {
                        const config = MASTER_PROPS_CONFIG[key];
                        if (config?.type === "boolean") {
                            return value === true ? `    ${key}` : null;
                        }
                        return `    ${key}="${value}"`;
                    })
                    .filter(Boolean)
                    .join("\n");

                // Add required id prop and optional label
                const requiredProps = [
                    `    id="sample-drawer"`,
                    propValues.content && `    label="${propValues.content}"`,
                ].filter(Boolean).join("\n");

                // Build drawer opening tag
                const allDrawerProps = [requiredProps, drawerProps].filter(Boolean).join("\n");
                const hasDrawerProps = allDrawerProps.length > 0;

                codeStructure.push(
                    `<${componentName}${hasDrawerProps ? "" : ">"}`,
                    hasDrawerProps && allDrawerProps,
                    hasDrawerProps && ">",
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
                    hasProps && (componentConfig.isSelfClosing ? "/>" : ">"
                    ),
                );
            }
        }

        // STEP 4 : ADD CONTENT AND CLOSING TAGS =======================================================================
        // Children content only for non-self-closing components
        if (!componentConfig.isSelfClosing) {
            // Special content handling for Drawer
            if (componentName === "Drawer") {
                codeStructure.push(
                    `    <Text>Your drawer content goes here</Text>`,
                    `    <Button onClick={() => hideDrawer("sample-drawer")}>`,
                    `        Close drawer`,
                    `    </Button>`,
                );
            } else {
                // Add children content for other components
                const content = propValues.children || (componentName === "Badge" ? propValues.content : null
                );

                if (content) {
                    codeStructure.push(content);
                }
            }

            // Add closing tag -----------------------------------------------------------------------------------------
            codeStructure.push(`</${componentName}>`);
        }

        // STEP 5 : Put it all together ================================================================================
        const componentCode = codeStructure.filter(Boolean).join("\n");

        // STEP 6 : Add component-specific setup code ==================================================================
        const setupCode = [];

        return [
            `{/* Paste this in your content file */}`,
            importsString,
            ` `,
            ...setupCode,
            componentCode,
        ].filter(Boolean).join("\n");
    }, [componentName, propValues, componentConfig, propsToConfig]);

    // GENERATE CONTROLS FOR DIFFERENT PROP TYPES //////////////////////////////////////////////////////////////////////
    const generateControl = useCallback((propName) => {
        console.log(`Generating control for: ${propName}`);
        const config = MASTER_PROPS_CONFIG[propName];
        if (!config) {
            console.log(`No config found for prop: ${propName}`);
            return null;
        }

        const { type, label, options } = config;

        switch (type) {
            // RADIOTABGROUP FOR SPACING, SHAPE, SIZE, AND EMPHASIS ====================================================
            case "spacing":
            case "shape":
            case "size":
            case "position":
            case "emphasis":
            case "showOn":
            case "source":
                // Special handling for CodeBlock usage to switch between import/embed approaches
                return (
                    <Portion key={propName}>
                        <RadioTabGroup
                            id={propName}
                            label={propName}
                            name={propName}
                            // Get the variant options or fall back to default options
                            options={options || config.variants?.[componentName.toLowerCase()] || config.variants?.default || []}
                            value={propValues[propName]}
                            onChange={(value) => {
                                handlePropChange(propName, value);
                            }}
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

            // LISTBOX FOR LANGUAGE SELECTION ==========================================================================
            case "language":
                // For CodeBlock page - special handling to update the sample code based on language
                if (componentName === "CodeBlock") {
                    const [selectedLanguage, setSelectedLanguage] = useState(propValues.language || "jsx");

                    const handleLanguageChange = (value) => {
                        // Update the language prop
                        handlePropChange("language", value);
                        // Update local state for this component
                        setSelectedLanguage(value);

                        // If we're in the CodeBlock page, we need to trigger the sample code update
                        if (typeof window !== "undefined") {
                            // Create and dispatch a custom event
                            const event = new CustomEvent("codeblock-language-changed", {
                                detail : { language : value },
                            });
                            window.dispatchEvent(event);
                        }
                    };

                    return (
                        <Portion key={propName} desktopSpan="whole">
                            <ListBox
                                id="language"
                                label="Language"
                                name="list-of-languages"
                                options={[
                                    { label : "Bash", value : "bash" },
                                    { label : "CSharp", value : "csharp" },
                                    { label : "CSS", value : "css" },
                                    { label : "HTML", value : "html" },
                                    { label : "JSX", value : "jsx" },
                                    { label : "Kotlin", value : "kotlin" },
                                    { label : "Markdown", value : "markdown" },
                                    { label : "ObjectiveC", value : "objectivec" },
                                    { label : "Python", value : "python" },
                                    { label : "Rust", value : "rust" },
                                    { label : "Swift", value : "swift" },
                                ]}
                                onChange={handleLanguageChange}
                                value={selectedLanguage}
                                isFullWidth
                            />
                        </Portion>
                    );
                }

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
                                size={size}
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
        setPropValues,
    };
};
