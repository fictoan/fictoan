"use client";

// REACT CORE ==========================================================================================================
import React, { useState, useMemo } from "react";

// UI ==================================================================================================================
import { Div, Heading2, Text, Divider, Spinner, CodeBlock, InputField, RadioTabGroup, } from "fictoan-react";

// UTILS ===============================================================================================================
import { createThemeConfigurator } from "$utils/themeConfigurator";

// STYLES ==============================================================================================================
import "../../../styles/fictoan-theme.css";
import "./page-spinner.css";

// OTHER ===============================================================================================================
import { ComponentDocsLayout } from "../ComponentDocsLayout";

const SpinnerDocs = () => {
    // Props state
    const [size, setSize] = useState("medium");
    const [loadingText, setLoadingText] = useState("Loading...");

    // Theme configurator
    const SpinnerComponent = (varName: string) => {
        return varName.startsWith("spinner-");
    };

    const {
        interactiveElementRef,
        componentProps: themeProps,
        themeConfigurator,
    } = createThemeConfigurator<HTMLDivElement>("Spinner", SpinnerComponent);

    // Generate code
    const codeString = useMemo(() => {
        const props = [];
        if (size !== "medium") props.push(`size="${size}"`);
        if (loadingText && loadingText !== "Loading...") props.push(`loadingText="${loadingText}"`);

        const attrs = props.length ? `\n    ${props.join("\n    ")}\n` : " ";
        return `import { Spinner } from "fictoan-react";

<Spinner${attrs}/>`;
    }, [size, loadingText]);

    return (
        <ComponentDocsLayout pageId="page-spinner">
            {/* INTRO HEADER /////////////////////////////////////////////////////////////////////////////////////// */}
            <Div id="intro-header">
                <Heading2 id="component-name">
                    Spinner
                </Heading2>

                <Text id="component-description" weight="400">
                    A circular loading indicator for indeterminate, in-progress operations
                </Text>
            </Div>

            {/* INTRO NOTES //////////////////////////////////////////////////////////////////////////////////////// */}
            <Div id="intro-notes">
                <Divider kind="tertiary" verticalMargin="micro" />

                <Text>
                    Pure CSS — the ring spins via a <code>@keyframes</code> animation, with no JavaScript.
                </Text>

                <Text>
                    Announced to assistive tech as <code>role="status"</code> with <code>aria-live="polite"</code>. Set
                    {" "}<code>loadingText</code> to give screen-reader users a meaningful message (defaults to
                    {" "}<code>"Loading..."</code>).
                </Text>

                <Text>
                    Colour the ring with the <code>--spinner-border</code> theme variable, or any colour prop.
                </Text>
            </Div>

            {/* DEMO COMPONENT ///////////////////////////////////////////////////////////////////////////////////// */}
            <Div id="demo-component">
                <Spinner
                    ref={interactiveElementRef}
                    size={size as any}
                    loadingText={loadingText || undefined}
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
                        id="prop-size"
                        label="size"
                        options={[
                            { id: "size-tiny", value: "tiny", label: "tiny" },
                            { id: "size-small", value: "small", label: "small" },
                            { id: "size-medium", value: "medium", label: "medium" },
                            { id: "size-large", value: "large", label: "large" },
                            { id: "size-huge", value: "huge", label: "huge" },
                        ]}
                        value={size}
                        onChange={(val) => setSize(val)}
                        marginBottom="micro"
                    />

                    <InputField
                        label="loadingText"
                        value={loadingText}
                        onChange={(val) => setLoadingText(val)}
                        helpText="Screen-reader message announced while loading."
                        marginBottom="micro" isFullWidth
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

export default SpinnerDocs;
