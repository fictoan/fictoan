"use client";

// REACT CORE ==========================================================================================================
import React, { useState, useMemo } from "react";

// UI ==================================================================================================================
import { Div, Heading2, Text, Divider, CodeBlock, InputField, RadioTabGroup } from "fictoan-react";

// UTILS ===============================================================================================================
import { createThemeConfigurator } from "$utils/themeConfigurator";

// STYLES ==============================================================================================================
import "../../../styles/fictoan-theme.css";
import "./page-divider.css";

// OTHER ===============================================================================================================
import { ComponentDocsLayout } from "../ComponentDocsLayout";

const DividerDocs = () => {
    // Props state
    const [kind, setKind] = useState("primary");
    const [height, setHeight] = useState("");

    // Theme configurator
    const DividerComponent = (varName: string) => {
        return varName.startsWith("divider-");
    };

    const {
        interactiveElementRef,
        componentProps: themeProps,
        themeConfigurator,
    } = createThemeConfigurator<HTMLHRElement>("Divider", DividerComponent);

    // Generate code
    const codeString = useMemo(() => {
        const props = [];
        if (kind) props.push(`kind="${kind}"`);
        if (height) props.push(`height="${height}"`);

        const propsString = props.length > 0 ? ` ${props.join(" ")}` : "";
        return `import { Divider } from "fictoan-react";

<Divider${propsString} />`;
    }, [kind, height]);

    return (
        <ComponentDocsLayout pageId="page-divider">
            {/* INTRO HEADER /////////////////////////////////////////////////////////////////////////////////////// */}
            <Div id="intro-header">
                <Heading2 id="component-name">
                    Divider
                </Heading2>

                <Text id="component-description" weight="400">
                    A horizontal line to separate content
                </Text>
            </Div>

            {/* INTRO NOTES //////////////////////////////////////////////////////////////////////////////////////// */}
            <Div id="intro-notes">
                <Divider kind="tertiary" verticalMargin="micro" />

                <Text>
                    Is a self-closing element.
                </Text>

                <Text>
                    Use the <code>kind</code> prop to set the visual weight of the divider.
                </Text>

                <Text>
                    The <code>label</code> prop sets an accessible aria-label for screen readers.
                </Text>
            </Div>

            {/* DEMO COMPONENT ///////////////////////////////////////////////////////////////////////////////////// */}
            <Div id="demo-component">
                <Divider
                    ref={interactiveElementRef}
                    kind={kind as any}
                    height={height || undefined}
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
                        id="prop-kind"
                        label="kind"
                        options={[
                            { id: "kind-primary", value: "primary", label: "primary" },
                            { id: "kind-secondary", value: "secondary", label: "secondary" },
                            { id: "kind-tertiary", value: "tertiary", label: "tertiary" },
                        ]}
                        value={kind}
                        onChange={(value) => setKind(value)}
                        helpText="Sets the visual weight of the divider."
                        marginBottom="micro"
                    />

                    <InputField
                        label="height"
                        value={height}
                        onChange={(value) => setHeight(value)}
                        helpText="Custom height for the divider (e.g., '2px', '4px')."
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

export default DividerDocs;
