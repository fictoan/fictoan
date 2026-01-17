"use client";

// REACT CORE ==========================================================================================================
import React, { useState, useMemo } from "react";

// UI ==================================================================================================================
import { Div, Heading2, Text, Divider, CodeBlock, RadioTabGroup, Checkbox } from "fictoan-react";

// UTILS ===============================================================================================================
import { createThemeConfigurator } from "$utils/themeConfigurator";

// STYLES ==============================================================================================================
import "../../../styles/fictoan-theme.css";
import "./page-code-block.css";

// OTHER ===============================================================================================================
import { ComponentDocsLayout } from "../ComponentDocsLayout";
import {
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

const languageSamples: Record<string, string> = {
    jsx: sampleJSXCode,
    bash: sampleBashCode,
    css: sampleCSSCode,
    html: sampleHTMLCode,
    python: samplePythonCode,
    rust: sampleRustCode,
    swift: sampleSwiftCode,
    kotlin: sampleKotlinCode,
    csharp: sampleCSharpCode,
    objectivec: sampleObjectiveCCode,
    markdown: sampleMarkdownCode,
};

const CodeBlockDocs = () => {
    // Props state
    const [language, setLanguage] = useState("jsx");
    const [withSyntaxHighlighting, setWithSyntaxHighlighting] = useState(true);
    const [showLineNumbers, setShowLineNumbers] = useState(false);
    const [showCopyButton, setShowCopyButton] = useState(true);

    // Theme configurator
    const CodeBlockComponent = (varName: string) => {
        return varName.startsWith("code-");
    };

    const {
        interactiveElementRef,
        componentProps: themeProps,
        themeConfigurator,
    } = createThemeConfigurator<HTMLPreElement>("CodeBlock", CodeBlockComponent);

    // Get sample code for selected language
    const sampleCode = languageSamples[language] || sampleJSXCode;

    // Generate code
    const codeString = useMemo(() => {
        const props = [];
        props.push(`    language="${language}"`);
        if (withSyntaxHighlighting) props.push(`    withSyntaxHighlighting`);
        if (showLineNumbers) props.push(`    showLineNumbers`);
        if (showCopyButton) props.push(`    showCopyButton`);

        return `<CodeBlock\n${props.join("\n")}\n>\n    {code}\n</CodeBlock>`;
    }, [language, withSyntaxHighlighting, showLineNumbers, showCopyButton]);

    return (
        <ComponentDocsLayout>
            {/* INTRO HEADER /////////////////////////////////////////////////////////////////////////////////////// */}
            <Div id="intro-header">
                <Heading2 id="component-name">
                    CodeBlock
                </Heading2>

                <Text id="component-description" weight="400">
                    A box to display multiple lines of code, with syntax highlighting
                </Text>
            </Div>

            {/* INTRO NOTES //////////////////////////////////////////////////////////////////////////////////////// */}
            <Div id="intro-notes">
                <Divider kind="tertiary" verticalMargin="micro" />

                <Text>
                    For embedded code block usage, wrap your code in <code>{"{[]}"}</code> for it to work.
                </Text>

                <Text>
                    For some languages such as JSX, you might need to wrap individual lines
                    with <code>``</code> backticks as well, and then do a <code>.join("\n")</code> at the end.
                </Text>

                <Text>
                    For inline code block usage, wrap with <code>{"<code></code>"}</code> tags.
                </Text>
            </Div>

            {/* DEMO COMPONENT ///////////////////////////////////////////////////////////////////////////////////// */}
            <Div id="demo-component">
                <CodeBlock
                    ref={interactiveElementRef}
                    source={sampleCode}
                    language={language}
                    withSyntaxHighlighting={withSyntaxHighlighting}
                    showLineNumbers={showLineNumbers}
                    showCopyButton={showCopyButton}
                    {...themeProps}
                />
            </Div>

            {/* PROPS CONFIG /////////////////////////////////////////////////////////////////////////////////////// */}
            <Div id="props-config">
                <CodeBlock language="tsx" withSyntaxHighlighting showCopyButton>
                    {codeString}
                </CodeBlock>

                <Div className="doc-controls">
                    <RadioTabGroup
                        id="prop-language"
                        label="language"
                        options={[
                            { id: "lang-jsx", value: "jsx", label: "jsx" },
                            { id: "lang-html", value: "html", label: "html" },
                            { id: "lang-css", value: "css", label: "css" },
                            { id: "lang-bash", value: "bash", label: "bash" },
                            { id: "lang-python", value: "python", label: "python" },
                            { id: "lang-rust", value: "rust", label: "rust" },
                        ]}
                        value={language}
                        onChange={(value) => setLanguage(value)}
                        marginBottom="micro"
                    />

                    <RadioTabGroup
                        id="prop-language-more"
                        label="more languages"
                        options={[
                            { id: "lang-swift", value: "swift", label: "swift" },
                            { id: "lang-kotlin", value: "kotlin", label: "kotlin" },
                            { id: "lang-csharp", value: "csharp", label: "csharp" },
                            { id: "lang-objc", value: "objectivec", label: "objc" },
                            { id: "lang-markdown", value: "markdown", label: "markdown" },
                        ]}
                        value={language}
                        onChange={(value) => setLanguage(value)}
                        marginBottom="micro"
                    />

                    <Checkbox
                        id="prop-withSyntaxHighlighting"
                        label="withSyntaxHighlighting"
                        checked={withSyntaxHighlighting}
                        onChange={(checked) => setWithSyntaxHighlighting(checked)}
                        helpText="Enable syntax highlighting for the code."
                        marginBottom="micro"
                    />

                    <Checkbox
                        id="prop-showLineNumbers"
                        label="showLineNumbers"
                        checked={showLineNumbers}
                        onChange={(checked) => setShowLineNumbers(checked)}
                        helpText="Display line numbers."
                        marginBottom="micro"
                    />

                    <Checkbox
                        id="prop-showCopyButton"
                        label="showCopyButton"
                        checked={showCopyButton}
                        onChange={(checked) => setShowCopyButton(checked)}
                        helpText="Show a button to copy the code."
                        marginBottom="micro"
                    />
                </Div>
            </Div>

            {/* THEME CONFIG /////////////////////////////////////////////////////////////////////////////////////// */}
            <Div id="theme-config">
                {themeConfigurator()}
            </Div>
        </ComponentDocsLayout>
    );
};

export default CodeBlockDocs;
