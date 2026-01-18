"use client";

// REACT CORE ==========================================================================================================
import React, { useState, useMemo } from "react";

// UI ==================================================================================================================
import { Div, Heading2, Text, Divider, Accordion, Checkbox, CodeBlock, TextArea } from "fictoan-react";

// UTILS ===============================================================================================================
import { createThemeConfigurator } from "$utils/themeConfigurator";

// STYLES ==============================================================================================================
import "../../../styles/fictoan-theme.css";
import "./page-accordion.css";

// OTHER ===============================================================================================================
import { ComponentDocsLayout } from "../ComponentDocsLayout";

const AccordionDocs = () => {
    // Props state
    const [summary, setSummary] = useState("Click to expand");
    const [children, setChildren] = useState("Accordion content goes here.");
    const [isOpen, setIsOpen] = useState(false);

    // Theme configurator
    const {
        interactiveElementRef,
        componentProps: themeProps,
        themeConfigurator,
    } = createThemeConfigurator<HTMLDetailsElement>("Accordion", "accordion-");

    // Generate code
    const codeString = useMemo(() => {
        const props = [];
        props.push(`    summary="${summary}"`);
        if (isOpen) props.push(`    isOpen`);

        return `<Accordion\n${props.join("\n")}\n>\n    ${children}\n</Accordion>`;
    }, [summary, children, isOpen]);

    return (
        <ComponentDocsLayout pageId="page-accordion">
            {/* INTRO HEADER /////////////////////////////////////////////////////////////////////////////////////// */}
            <Div id="intro-header">
                <Heading2 id="component-name">
                    Accordion
                </Heading2>

                <Text id="component-description" weight="400">
                    A simple click to expand/collapse block element.
                </Text>
            </Div>

            {/* INTRO NOTES //////////////////////////////////////////////////////////////////////////////////////// */}
            <Div id="intro-notes">
                <Divider kind="tertiary" verticalMargin="micro" />

                <Text>
                    The <code>summary</code> accepts any React node as a child. Feel free to style it
                    however you want with any element.
                </Text>

                <Text>
                    The component is typically used with the <code>isFullWidth</code> prop.
                </Text>
            </Div>

            {/* DEMO COMPONENT ///////////////////////////////////////////////////////////////////////////////////// */}
            <Div id="demo-component">
                <Accordion
                    key={`accordion-${isOpen}`}
                    ref={interactiveElementRef}
                    summary={summary}
                    isOpen={isOpen}
                    {...themeProps}
                >
                    {children}
                </Accordion>
            </Div>

            {/* PROPS CONFIG /////////////////////////////////////////////////////////////////////////////////////// */}
            <Div id="props-config">
                <CodeBlock language="tsx" withSyntaxHighlighting showCopyButton>
                    {codeString}
                </CodeBlock>

                <Div className="doc-controls">
                    <TextArea
                        label="summary"
                        value={summary}
                        onChange={(value) => setSummary(value)}
                        helpText="The clickable header text. Accepts React nodes for complex content."
                        rows={2}
                        marginBottom="micro" isFullWidth
                    />

                    <TextArea
                        label="children"
                        value={children}
                        onChange={(value) => setChildren(value)}
                        helpText="The expandable content. Accepts React nodes."
                        rows={3}
                        marginBottom="micro" isFullWidth
                    />

                    <Checkbox
                        id="prop-isOpen"
                        label="isOpen"
                        checked={isOpen}
                        onChange={(checked) => setIsOpen(checked)}
                        helpText="Sets the initial open state. The native details element manages its own state after that."
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

export default AccordionDocs;
