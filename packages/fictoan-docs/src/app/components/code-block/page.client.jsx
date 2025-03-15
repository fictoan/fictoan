"use client";

// EXTERNAL DEPS =======================================================================================================
import React, { useState } from "react";

// INTERNAL DEPS =======================================================================================================
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
CodeBlock
} from "fictoan-react";

// COMPONENTS ==========================================================================================================

// STYLES ==============================================================================================================
import "./page-code-block.css";

// HOOKS ===============================================================================================================
import { useThemeVariables } from "../../../utils/useThemeVariables";

// UTILS ===============================================================================================================
import { colourOptions } from "../../colour/colours";

// DATA ================================================================================================================
import { toastProps } from "./config";
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

const CodeBlockDocs = () => {

    // SAMPLE ==========================================================================================================
    const [selectedApproach, setSelectedApproach] = useState("import");
    const [enableCopyButton, setEnableCopyButton] = useState(false);
    const [enableLineNumbers, setEnableLineNumbers] = useState(false);
    const [selectedLanguage, setSelectedLanguage] = useState("bash");
    const [selectedSampleCode, setSelectedSampleCode] = useState(sampleBashCode);

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
                            For some languages such as JSX, you might need to wrap the lines with <code>``</code> backticks
                            as well
                        </li>
                    </ul>

                    <ul>
                        <li>
                            For inline code block usage, wrap with tags <code>{"<code> </code>"}</code> for it to work
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
                        <CodeBlock
                            withSyntaxHighlighting
                            source={selectedSampleCode}
                            language={selectedLanguage}
                            showCopyButton={enableCopyButton}
                            showLineNumbers={enableLineNumbers}
                        />
                    </Div>
                </Portion>

                {/* CONFIGURATOR /////////////////////////////////////////////////////////////////////////////////// */}
                <Portion desktopSpan="half">
                    <Form spacing="none">
                        <Card padding="micro" shape="rounded">
                            <Header verticallyCentreItems pushItemsToEnds marginBottom="micro">
                                <Text size="large" weight="700" textColour="white">
                                    Configure props
                                </Text>
                            </Header>

                            <Row marginBottom="none">
                                <Portion>
                                    {selectedApproach === "embed" ? (
                                            <CodeBlock withSyntaxHighlighting language="jsx" showCopyButton marginBottom="micro">
                                                {[
                                                    `// Paste this in your content file`,
                                                    selectedApproach === "import" ? `import { sampleCode } from "./codeSamples.js"; \n` : null,
                                                    `<CodeBlock`,
                                                    `    language="${selectedLanguage}"`,
                                                    enableCopyButton ? `    showCopyButton` : null,
                                                    enableLineNumbers ? `    showLineNumbers` : null,
                                                    `>`,
                                                    `{[`,
                                                    ...selectedSampleCode.split("\n").map(line => `    \`${line.replace(/`/g, "\\`")}\``),
                                                    `]}`,
                                                    `</CodeBlock>`,
                                                ].filter(Boolean).join("\n")}
                                            </CodeBlock>
                                        )
                                        : (
                                            <CodeBlock withSyntaxHighlighting language="jsx" showCopyButton marginBottom="micro">
                                                {[
                                                    `// Paste this in your content file`,
                                                    selectedApproach === "import" ? `import { sampleCode } from "./codeSamples.js"; \n` : null,
                                                    `<CodeBlock`,
                                                    `    source={sampleCode}`,
                                                    `    language="${selectedLanguage}"`,
                                                    enableCopyButton ? `    showCopyButton` : null,
                                                    enableLineNumbers ? `    showLineNumbers` : null,
                                                    `>`,
                                                ].filter(Boolean).join("\n")}
                                            </CodeBlock>
                                        )
                                    }
                                </Portion>

                                {/* COPY BUTTON ==================================================================== */}
                                <Portion desktopSpan="half">
                                    <Select
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
                                        onChange={(value) => {
                                            setSelectedLanguage(value);
                                            showSelectedLanguageCode(value);
                                        }}
                                        isFullWidth
                                    />
                                </Portion>

                                <Portion>
                                    <Divider kind="secondary" horizontalMargin="none" verticalMargin="micro" />
                                </Portion>

                                {/* SHAPE ========================================================================== */}
                                <Portion>
                                    <RadioTabGroup
                                        id="usage" label="Usage" name="usage"
                                        options={[
                                            { id : "approach-opt-0", value : "import", label : "import" },
                                            { id : "approach-opt-1", value : "embed", label : "embed" },
                                        ]}
                                        value={selectedApproach}
                                        onChange={(value) => setSelectedApproach(value !== "none" ? value : undefined)}
                                    />

                                    <Divider kind="secondary" horizontalMargin="none" verticalMargin="micro" />
                                </Portion>

                                {/* COPY BUTTON ==================================================================== */}
                                <Portion>
                                    <Checkbox
                                        id="checkbox-copy-button"
                                        value="checkbox-copy-button"
                                        name="checkbox-copy-button"
                                        label="Show Copy button"
                                        checked={enableCopyButton}
                                        onChange={(checked) => setEnableCopyButton(checked)}
                                    />

                                    <Divider kind="secondary" horizontalMargin="none" verticalMargin="micro" />
                                </Portion>

                                {/* LINE NUMBERS =================================================================== */}
                                <Portion>
                                    <Checkbox
                                        id="checkbox-line-numbers"
                                        value="checkbox-line-numbers"
                                        name="checkbox-line-numbers"
                                        label="Show line numbers"
                                        checked={enableLineNumbers}
                                        onChange={(checked) => setEnableLineNumbers(checked)}
                                    />
                                </Portion>
                            </Row>
                        </Card>
                    </Form>
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
