"use client";

// FRAMEWORK ===========================================================================================================
import React, { useState } from "react";

// FICTOAN =============================================================================================================
import {
    Div,
    Heading1,
    Heading4,
    Divider,
    Portion,
    Row,
    Text,
    Article,
    Card,
    Form,
    Header,
    Select,
    InputField,
    Range,
    Checkbox,
    RadioTabGroup,
    CodeBlock, ListBox,
} from "fictoan-react";

// STYLES ==============================================================================================================
import "./page-code-block.css";

// OTHER ===============================================================================================================
import {
    sampleCodeBlock,
    sampleBashCode,
    sampleRustCode,
    sampleCSSCode,
    sampleCSharpCode,
    sampleHTMLCode,
    sampleJSXCode,
    sampleKotlinCode,
    sampleMarkdownCode,
    sampleObjectiveCCode,
    samplePythonCode,
    sampleSwiftCode,
} from "./CodeSamples";
import { colourOptions } from "../../colour/colours";
import { createPropsConfigurator } from "../../../utils/propsConfigurator";
import { toastProps } from "./config";
import { useThemeVariables } from "../../../utils/useThemeVariables";

const CodeBlockDocs = () => {
    // SAMPLE ==========================================================================================================
    const [selectedApproach, setSelectedApproach] = useState("import");
    const [enableCopyButton, setEnableCopyButton] = useState(false);
    const [enableLineNumbers, setEnableLineNumbers] = useState(false);
    const [selectedLanguage, setSelectedLanguage] = useState("jsx");
    const [selectedSampleCode, setSelectedSampleCode] = useState(sampleJSXCode);

    // Event listener for language changes from the configurator
    React.useEffect(() => {
        const handleLanguageChange = (event) => {
            const language = event.detail.language;
            setSelectedLanguage(language);
            showSelectedLanguageCode(language);
        };

        window.addEventListener("codeblock-language-changed", handleLanguageChange);

        return () => {
            window.removeEventListener("codeblock-language-changed", handleLanguageChange);
        };
    }, []);


    // PROPS CONFIG ====================================================================================================
    const {
        propsConfigurator,
        componentProps : propsConfig,
        propValues,
        setPropValues,
    } = createPropsConfigurator(
        "CodeBlock",
        [
            "usage", // Add usage type to handle import/embed approach
            "source",
            "language", // Custom type that will be handled in propsConfigurator
            "showCopyButton",
            "showLineNumbers",
            "description",
            "withSyntaxHighlighting",
            "makeEditable",
        ],
        colourOptions,
        {
            canHaveChildren : true,
            isSelfClosing   : false,
        },
    );

    // Track usage value changes
    const [currentUsage, setCurrentUsage] = useState("import");
    
    // Listen for changes to the usage prop from the RadioTabGroup
    React.useEffect(() => {
        if (propValues && propValues.source !== undefined) {
            console.log("Current source/usage value:", propValues.source);
            setCurrentUsage(propValues.source);
        }
    }, [propValues]);
    
    // Update the source property when selectedSampleCode changes
    React.useEffect(() => {
        if (setPropValues && selectedSampleCode) {
            setPropValues(prev => {
                return { ...prev, source : selectedSampleCode };
            });
        }
    }, [selectedSampleCode, setPropValues]);

    const showSelectedLanguageCode = (language) => {
        switch (language) {
            case "bash":
                setSelectedSampleCode(sampleBashCode);
                break;
            case "csharp":
                setSelectedSampleCode(sampleCSharpCode);
                break;
            case "html":
                setSelectedSampleCode(sampleHTMLCode);
                break;
            case "css":
                setSelectedSampleCode(sampleCSSCode);
                break;
            case "swift":
                setSelectedSampleCode(sampleSwiftCode);
                break;
            case "rust":
                setSelectedSampleCode(sampleRustCode);
                break;
            case "python":
                setSelectedSampleCode(samplePythonCode);
                break;
            case "kotlin":
                setSelectedSampleCode(sampleKotlinCode);
                break;
            case "jsx":
                setSelectedSampleCode(sampleJSXCode);
                break;
            case "objectivec":
                setSelectedSampleCode(sampleObjectiveCCode);
                break;
            case "markdown":
                setSelectedSampleCode(sampleMarkdownCode);
                break;
            default:
                setSelectedSampleCode(sampleBashCode);
        }
    };

    // CUSTOMISE =======================================================================================================

    // THEME ===========================================================================================================
    const { componentVariables, handleVariableChange, cssVariablesList } = useThemeVariables(toastProps.variables);


    return (
        <Article id="page-code-block">
            <Row horizontalPadding="huge" marginTop="medium" marginBottom="small">
                <Portion>
                    <Heading1>Code block</Heading1>
                    <Text size="large" marginBottom="small">
                        A box to display multiple lines of code, with syntax highlighting
                    </Text>
                </Portion>

                <Portion>
                    <Heading4 marginBottom="micro">Characteristics</Heading4>
                    <ul>
                        <li>
                            For embedded code block usage, wrap your code in <code>{"{[]}"}</code> for it to work
                        </li>
                        <li>
                            For some languages such as JSX, you might need to wrap individual lines
                            with <code>``</code> backticks as well, and then do a <code>.join("\n")</code> at the end.
                        </li>
                    </ul>

                    <ul>
                        <li>
                            For inline code block usage, wrap with tags <code>{"<code></code>"}</code> for it to work
                        </li>
                    </ul>
                </Portion>
            </Row>

            <Divider kind="primary" horizontalMargin="huge" verticalMargin="small" />

            {/* //////////////////////////////////////////////////////////////////////////////////////////////////// */}
            {/*  CONFIGURATOR */}
            {/* //////////////////////////////////////////////////////////////////////////////////////////////////// */}
            <Row horizontalPadding="small" className="rendered-component">
                {/* DEMO COMPONENT ///////////////////////////////////////////////////////////////////////////////// */}
                <Portion id="component-wrapper">
                    <Div padding="micro" shape="rounded" bgColour="slate-light80"
                         data-centered-children
                    >
                        {currentUsage === "import" ? (
                            <CodeBlock
                                id="interactive-component"
                                source={selectedSampleCode}
                                language={propValues.language || "jsx"}
                                showCopyButton={propValues.showCopyButton}
                                showLineNumbers={propValues.showLineNumbers}
                                withSyntaxHighlighting={propValues.withSyntaxHighlighting}
                                makeEditable={propValues.makeEditable}
                            />
                        ) : (
                            <CodeBlock
                                id="interactive-component"
                                language={propValues.language || "jsx"}
                                showCopyButton={propValues.showCopyButton}
                                showLineNumbers={propValues.showLineNumbers}
                                withSyntaxHighlighting={propValues.withSyntaxHighlighting}
                                makeEditable={propValues.makeEditable}
                            >
                                {[
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
                                    `/>`
                                ].join("\n")}
                            </CodeBlock>
                        )}
                    </Div>
                </Portion>

                {/* CONFIGURATOR /////////////////////////////////////////////////////////////////////////////////// */}
                <Portion desktopSpan="half">
                    {propsConfigurator()}
                </Portion>

                {/* GLOBAL THEME /////////////////////////////////////////////////////////////////////////////////// */}
                <Portion desktopSpan="half">
                    <Card padding="micro" shape="rounded">
                        <Form>
                            <Header verticallyCentreItems pushItemsToEnds>
                                <Text size="large" weight="700" textColour="white" marginBottom="nano">
                                    Set global theme values
                                </Text>
                            </Header>

                            <Row marginBottom="none">
                                <Portion>
                                    <CodeBlock
                                        withSyntaxHighlighting
                                        source={cssVariablesList}
                                        language="css"
                                        showCopyButton
                                        marginBottom="micro"
                                    />
                                </Portion>
                            </Row>

                            {/* COMMON ///////////////////////////////////////////////////////////////////////////// */}
                            <Row marginBottom="none">
                                <Portion>
                                    <Text weight="700" size="large">Common</Text>
                                </Portion>

                                {/* BG COLOUR ====================================================================== */}
                                <Portion desktopSpan="half">
                                    <InputField
                                        label="Font"
                                        defaultValue={componentVariables["code-font"].defaultValue}
                                        onChange={(value) => handleVariableChange("code-font", value)}
                                        isFullWidth
                                    />
                                </Portion>
                            </Row>

                            <Divider kind="secondary" verticalMargin="micro" />

                            {/* INLINE ///////////////////////////////////////////////////////////////////////////// */}
                            <Row marginBottom="none">
                                <Portion>
                                    <Text weight="700" size="large">Inline</Text>
                                </Portion>

                                {/* BACKGROUND ===================================================================== */}
                                <Portion desktopSpan="half">
                                    <Select
                                        label="Background"
                                        options={[{
                                            label    : "Select a colour",
                                            value    : "select-a-colour",
                                            disabled : true,
                                            selected : true,
                                        }, ...colourOptions]}
                                        defaultValue={componentVariables["code-inline-bg"].defaultValue || "select-a-colour"}
                                        onChange={(value) => handleVariableChange("code-inline-bg", value)}
                                        isFullWidth
                                    />
                                </Portion>

                                {/* TEXT =========================================================================== */}
                                <Portion desktopSpan="half">
                                    <Select
                                        label="Text"
                                        options={[{
                                            label    : "Select a colour",
                                            value    : "select-a-colour",
                                            disabled : true,
                                            selected : true,
                                        }, ...colourOptions]}
                                        defaultValue={componentVariables["code-inline-text"].defaultValue || "select-a-colour"}
                                        onChange={(value) => handleVariableChange("code-inline-text", value)}
                                        isFullWidth
                                    />
                                </Portion>

                                {/* FONT SIZE ====================================================================== */}
                                <Portion desktopSpan="half">
                                    <Range
                                        label="Font size"
                                        value={componentVariables["code-inline-font-size"].value}
                                        onChange={(value) => handleVariableChange("code-inline-font-size", value)}
                                        suffix={componentVariables["code-inline-font-size"].unit}
                                        min={0} max={20} step={0.1}
                                    />
                                </Portion>

                                {/* BORDER RADIUS ================================================================== */}
                                <Portion desktopSpan="half">
                                    <Range
                                        label="Border radius"
                                        value={componentVariables["code-inline-border-radius"].value}
                                        onChange={(value) => handleVariableChange("code-inline-border-radius", value)}
                                        suffix={componentVariables["code-inline-border-radius"].unit}
                                        min={0} max={20} step={0.1}
                                    />
                                </Portion>
                            </Row>

                            <Divider kind="secondary" verticalMargin="micro" />

                            {/* BLOCK ////////////////////////////////////////////////////////////////////////////// */}
                            <Row marginBottom="none">
                                <Portion>
                                    <Text weight="700" size="large">Block</Text>
                                </Portion>

                                {/* BACKGROUND ===================================================================== */}
                                <Portion desktopSpan="half">
                                    <Select
                                        label="Background"
                                        options={[{
                                            label    : "Select a colour",
                                            value    : "select-a-colour",
                                            disabled : true,
                                            selected : true,
                                        }, ...colourOptions]}
                                        defaultValue={componentVariables["code-block-bg"].defaultValue || "select-a-colour"}
                                        onChange={(value) => handleVariableChange("code-block-bg", value)}
                                        isFullWidth
                                    />
                                </Portion>

                                {/* TEXT =========================================================================== */}
                                <Portion desktopSpan="half">
                                    <Select
                                        label="Text"
                                        options={[{
                                            label    : "Select a colour",
                                            value    : "select-a-colour",
                                            disabled : true,
                                            selected : true,
                                        }, ...colourOptions]}
                                        defaultValue={componentVariables["code-block-text"].defaultValue || "select-a-colour"}
                                        onChange={(value) => handleVariableChange("code-block-text", value)}
                                        isFullWidth
                                    />
                                </Portion>

                                {/* FONT SIZE ====================================================================== */}
                                <Portion desktopSpan="half">
                                    <Range
                                        label="Font size"
                                        value={componentVariables["code-block-font-size"].value}
                                        onChange={(value) => handleVariableChange("code-block-font-size", value)}
                                        suffix={componentVariables["code-block-font-size"].unit}
                                        min={0} max={20} step={0.1}
                                    />
                                </Portion>

                                {/* LINE HEIGHT ==================================================================== */}
                                <Portion desktopSpan="half">
                                    <Range
                                        label="Line height"
                                        value={componentVariables["code-block-line-height"].value}
                                        onChange={(value) => handleVariableChange("code-block-line-height", value)}
                                        min={1} max={3} step={0.1}
                                    />
                                </Portion>

                                {/* BORDER RADIUS ================================================================== */}
                                <Portion desktopSpan="half">
                                    <Range
                                        label="Border radius"
                                        value={componentVariables["code-block-border-radius"].value}
                                        onChange={(value) => handleVariableChange("code-block-border-radius", value)}
                                        suffix={componentVariables["code-block-border-radius"].unit}
                                        min={0} max={20} step={0.1}
                                    />
                                </Portion>

                                {/* LINE NUMBERS =================================================================== */}
                                <Portion desktopSpan="half">
                                    <Select
                                        label="Line numbers"
                                        options={[{
                                            label    : "Select a colour",
                                            value    : "select-a-colour",
                                            disabled : true,
                                            selected : true,
                                        }, ...colourOptions]}
                                        defaultValue={componentVariables["code-block-line-numbers"].defaultValue || "select-a-colour"}
                                        onChange={(value) => handleVariableChange("code-block-line-numbers", value)}
                                        isFullWidth
                                    />
                                </Portion>
                            </Row>

                            <Divider kind="secondary" verticalMargin="micro" />

                            {/* COPY BUTTON //////////////////////////////////////////////////////////////////////// */}
                            <Row marginBottom="none">
                                <Portion>
                                    <Text weight="700" size="large">Copy button</Text>
                                </Portion>

                                {/* COPY BUTTON BACKGROUND ======================================================= */}
                                <Portion desktopSpan="half">
                                    <Select
                                        label="Copy button background"
                                        options={[{
                                            label    : "Select a colour",
                                            value    : "select-a-colour",
                                            disabled : true,
                                            selected : true,
                                        }, ...colourOptions]}
                                        defaultValue={componentVariables["code-block-copy-button-bg"].defaultValue || "select-a-colour"}
                                        onChange={(value) => handleVariableChange("code-block-copy-button-bg", value)}
                                        isFullWidth
                                    />
                                </Portion>

                                {/* COPY BUTTON TEXT ============================================================== */}
                                <Portion desktopSpan="half">
                                    <Select
                                        label="Copy button text"
                                        options={[{
                                            label    : "Select a colour",
                                            value    : "select-a-colour",
                                            disabled : true,
                                            selected : true,
                                        }, ...colourOptions]}
                                        defaultValue={componentVariables["code-block-copy-button-text"].defaultValue || "select-a-colour"}
                                        onChange={(value) => handleVariableChange("code-block-copy-button-text", value)}
                                        isFullWidth
                                    />
                                </Portion>

                                {/* COPY BUTTON BORDER ============================================================ */}
                                <Portion desktopSpan="half">
                                    <Select
                                        label="Copy button border"
                                        options={[{
                                            label    : "Select a colour",
                                            value    : "select-a-colour",
                                            disabled : true,
                                            selected : true,
                                        }, ...colourOptions]}
                                        defaultValue={componentVariables["code-block-copy-button-border"].defaultValue || "select-a-colour"}
                                        onChange={(value) => handleVariableChange("code-block-copy-button-border", value)}
                                        isFullWidth
                                    />
                                </Portion>

                                <Portion desktopSpan="half" />

                                {/* COPIED BADGE BACKGROUND ====================================================== */}
                                <Portion desktopSpan="half">
                                    <Select
                                        label="Copied badge background"
                                        options={[{
                                            label    : "Select a colour",
                                            value    : "select-a-colour",
                                            disabled : true,
                                            selected : true,
                                        }, ...colourOptions]}
                                        defaultValue={componentVariables["code-block-copied-badge-bg"].defaultValue || "select-a-colour"}
                                        onChange={(value) => handleVariableChange("code-block-copied-badge-bg", value)}
                                        isFullWidth
                                    />
                                </Portion>

                                {/* COPIED BADGE TEXT ============================================================== */}
                                <Portion desktopSpan="half">
                                    <Select
                                        label="Copied badge text"
                                        options={[{
                                            label    : "Select a colour",
                                            value    : "select-a-colour",
                                            disabled : true,
                                            selected : true,
                                        }, ...colourOptions]}
                                        defaultValue={componentVariables["code-block-copied-badge-text"].defaultValue || "select-a-colour"}
                                        onChange={(value) => handleVariableChange("code-block-copied-badge-text", value)}
                                        isFullWidth
                                    />
                                </Portion>

                                {/* COPIED BADGE BORDER =========================================================== */}
                                <Portion desktopSpan="half">
                                    <Select
                                        label="Copied badge border"
                                        options={[{
                                            label    : "Select a colour",
                                            value    : "select-a-colour",
                                            disabled : true,
                                            selected : true,
                                        }, ...colourOptions]}
                                        defaultValue={componentVariables["code-block-copied-badge-border"].defaultValue || "select-a-colour"}
                                        onChange={(value) => handleVariableChange("code-block-copied-badge-border", value)}
                                        isFullWidth
                                    />
                                </Portion>
                            </Row>

                            <Divider kind="secondary" verticalMargin="micro" />

                            {/* COPY BUTTON //////////////////////////////////////////////////////////////////////// */}
                            <Row marginBottom="none">
                                <Portion>
                                    <Text weight="700" size="large">Tokens</Text>
                                    <Text>Did you really expect 45 dropdowns here?</Text>
                                </Portion>
                            </Row>
                        </Form>
                    </Card>
                </Portion>
            </Row>
        </Article>
    );
};

export default CodeBlockDocs;
