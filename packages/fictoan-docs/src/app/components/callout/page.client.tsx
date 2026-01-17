"use client";

// REACT CORE ==========================================================================================================
import React, { useState, useMemo } from "react";

// UI ==================================================================================================================
import { Div, Heading2, Text, Divider, Callout, CodeBlock, InputField, TextArea, RadioTabGroup } from "fictoan-react";

// UTILS ===============================================================================================================
import { createThemeConfigurator } from "$utils/themeConfigurator";

// STYLES ==============================================================================================================
import "../../../styles/fictoan-theme.css";
import "./page-callout.css";

// OTHER ===============================================================================================================
import { ComponentDocsLayout } from "../ComponentDocsLayout";

const CalloutDocs = () => {
    // Props state
    const [kind, setKind] = useState("info");
    const [children, setChildren] = useState("Content goes here");

    // Theme configurator
    const CalloutComponent = (varName: string) => {
        return varName.startsWith("callout-");
    };

    const {
        interactiveElementRef,
        componentProps: themeProps,
        themeConfigurator,
    } = createThemeConfigurator<HTMLDivElement>("Callout", CalloutComponent);

    // Generate code
    const codeString = useMemo(() => {
        const props = [];
        if (kind && kind !== "info") props.push(`    kind="${kind}"`);

        const propsString = props.length > 0 ? `\n${props.join("\n")}\n` : "";
        return `<Callout${propsString}>\n    ${children}\n</Callout>`;
    }, [kind, children]);

    return (
        <ComponentDocsLayout>
            {/* INTRO HEADER /////////////////////////////////////////////////////////////////////////////////////// */}
            <Div id="intro-header">
                <Heading2 id="component-name">
                    Callout
                </Heading2>

                <Text id="component-description" weight="400">
                    A box that can be used to highlight important information. It comes in four variants.
                </Text>
            </Div>

            {/* INTRO NOTES //////////////////////////////////////////////////////////////////////////////////////// */}
            <Div id="intro-notes">
                <Divider kind="tertiary" verticalMargin="micro" />

                <Text>
                    Accepts any React node as a child.
                </Text>

                <Text>
                    Use the <code>kind</code> prop to set the variant: info, success, warning, or error.
                </Text>
            </Div>

            {/* DEMO COMPONENT ///////////////////////////////////////////////////////////////////////////////////// */}
            <Div id="demo-component">
                <Callout
                    ref={interactiveElementRef}
                    kind={kind as any}
                    {...themeProps}
                >
                    {children}
                </Callout>
            </Div>

            {/* PROPS CONFIG /////////////////////////////////////////////////////////////////////////////////////// */}
            <Div id="props-config">
                <CodeBlock language="tsx" withSyntaxHighlighting showCopyButton>
                    {codeString}
                </CodeBlock>

                <Div className="doc-controls">
                    <RadioTabGroup
                        id="prop-kind"
                        label="kind"
                        options={[
                            { id: "kind-info", value: "info", label: "info" },
                            { id: "kind-success", value: "success", label: "success" },
                            { id: "kind-warning", value: "warning", label: "warning" },
                            { id: "kind-error", value: "error", label: "error" },
                        ]}
                        value={kind}
                        onChange={(value) => setKind(value)}
                        marginBottom="micro"
                    />

                    <TextArea
                        label="children"
                        value={children}
                        onChange={(value) => setChildren(value)}
                        helpText="The main content of the callout."
                        rows={3}
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

export default CalloutDocs;
