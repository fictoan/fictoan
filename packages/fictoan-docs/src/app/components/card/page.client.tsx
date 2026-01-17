"use client";

// REACT CORE ==========================================================================================================
import React, { useState, useMemo } from "react";

// UI ==================================================================================================================
import { Div, Heading2, Text, Divider, Card, CodeBlock, TextArea } from "fictoan-react";

// UTILS ===============================================================================================================
import { createThemeConfigurator } from "$utils/themeConfigurator";

// STYLES ==============================================================================================================
import "../../../styles/fictoan-theme.css";
import "./page-card.css";

// OTHER ===============================================================================================================
import { ComponentDocsLayout } from "../ComponentDocsLayout";

const CardDocs = () => {
    // Props state
    const [children, setChildren] = useState("Content shows up here");

    // Theme configurator
    const CardComponent = (varName: string) => {
        return varName.startsWith("card-");
    };

    const {
        interactiveElementRef,
        componentProps: themeProps,
        themeConfigurator,
    } = createThemeConfigurator<HTMLDivElement>("Card", CardComponent);

    // Generate code
    const codeString = useMemo(() => {
        return `<Card>\n    ${children}\n</Card>`;
    }, [children]);

    return (
        <ComponentDocsLayout>
            {/* INTRO HEADER /////////////////////////////////////////////////////////////////////////////////////// */}
            <Div id="intro-header">
                <Heading2 id="component-name">
                    Card
                </Heading2>

                <Text id="component-description" weight="400">
                    A box to put all sorts of content inside
                </Text>
            </Div>

            {/* INTRO NOTES //////////////////////////////////////////////////////////////////////////////////////// */}
            <Div id="intro-notes">
                <Divider kind="tertiary" verticalMargin="micro" />

                <Text>
                    Accepts any React node as a child.
                </Text>

                <Text>
                    The card always takes up 100% width of its parent and grows to the height of its content.
                </Text>

                <Text>
                    Border-radius values work only when <code>shape="rounded"</code> is present.
                </Text>
            </Div>

            {/* DEMO COMPONENT ///////////////////////////////////////////////////////////////////////////////////// */}
            <Div id="demo-component">
                <Card
                    ref={interactiveElementRef}
                    {...themeProps}
                >
                    {children}
                </Card>
            </Div>

            {/* PROPS CONFIG /////////////////////////////////////////////////////////////////////////////////////// */}
            <Div id="props-config">
                <CodeBlock language="tsx" withSyntaxHighlighting showCopyButton>
                    {codeString}
                </CodeBlock>

                <Div className="doc-controls">
                    <TextArea
                        label="children"
                        value={children}
                        onChange={(value) => setChildren(value)}
                        helpText="The main content of the card."
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

export default CardDocs;
