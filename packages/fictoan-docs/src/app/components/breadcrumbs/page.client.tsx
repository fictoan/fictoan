"use client";

// REACT CORE ==========================================================================================================
import Link from "next/link";
import React, { useState, useMemo } from "react";

// UI ==================================================================================================================
import { Div, Heading2, Text, Divider, Breadcrumbs, CodeBlock, InputField, RadioTabGroup } from "fictoan-react";

// LOCAL COMPONENTS ====================================================================================================
import { ComponentDocsLayout } from "../ComponentDocsLayout";

// UTILS ===============================================================================================================
import { createThemeConfigurator } from "$utils/themeConfigurator";

// STYLES ==============================================================================================================
import "../../../styles/fictoan-theme.css";
import "./page-breadcrumbs.css";

const BreadcrumbsDocs = () => {
    // Props state
    const [separator, setSeparator] = useState("/");
    const [spacing, setSpacing] = useState("small");

    // Theme configurator
    const BreadcrumbsComponent = (varName: string) => {
        return varName.startsWith("breadcrumb") || varName.startsWith("breadcrumbs");
    };

    const {
        interactiveElementRef,
        componentProps: themeProps,
        themeConfigurator,
    } = createThemeConfigurator<HTMLDivElement>("Breadcrumbs", BreadcrumbsComponent);

    // Generate code
    const codeString = useMemo(() => {
        const props = [];
        if (separator && separator !== "/") props.push(`    separator="${separator}"`);
        if (spacing && spacing !== "small") props.push(`    spacing="${spacing}"`);

        const propsString = props.length > 0 ? `\n${props.join("\n")}\n` : "";
        return `<Breadcrumbs${propsString}>
    <Link href="/">Home</Link>
    <Link href="/components">Components</Link>
    <Link href="/components/breadcrumbs">Breadcrumbs</Link>
</Breadcrumbs>`;
    }, [separator, spacing]);

    return (
        <ComponentDocsLayout pageId="page-breadcrumbs">
            {/* INTRO HEADER /////////////////////////////////////////////////////////////////////////////////////// */}
            <Div id="intro-header">
                <Heading2 id="component-name">
                    Breadcrumbs
                </Heading2>

                <Text id="component-description" weight="400">
                    A set of links to show the current page's hierarchy
                </Text>
            </Div>

            {/* INTRO NOTES //////////////////////////////////////////////////////////////////////////////////////// */}
            <Div id="intro-notes">
                <Divider kind="tertiary" verticalMargin="micro" />

                <Text>
                    The component accepts React nodes as children.
                </Text>

                <Text>
                    Use Link components from your router for navigation.
                </Text>
            </Div>

            {/* DEMO COMPONENT ///////////////////////////////////////////////////////////////////////////////////// */}
            <Div id="demo-component">
                <Breadcrumbs
                    ref={interactiveElementRef}
                    separator={separator}
                    spacing={spacing as any}
                    {...themeProps}
                >
                    <Link href="/">Home</Link>
                    <Link href="/components">Components</Link>
                    <Link href="/components/breadcrumbs">Breadcrumbs</Link>
                </Breadcrumbs>
            </Div>

            {/* PROPS CONFIG /////////////////////////////////////////////////////////////////////////////////////// */}
            <Div id="props-config">
                <CodeBlock language="tsx" withSyntaxHighlighting showCopyButton>
                    {codeString}
                </CodeBlock>

                <Div className="doc-controls">
                    <InputField
                        label="separator"
                        value={separator}
                        onChange={(value) => setSeparator(value)}
                        helpText="Character(s) to separate breadcrumb items."
                        marginBottom="micro" isFullWidth
                    />

                    <RadioTabGroup
                        id="prop-spacing"
                        label="spacing"
                        options={[
                            { id: "spacing-none", value: "none", label: "none" },
                            { id: "spacing-nano", value: "nano", label: "nano" },
                            { id: "spacing-micro", value: "micro", label: "micro" },
                            { id: "spacing-tiny", value: "tiny", label: "tiny" },
                            { id: "spacing-small", value: "small", label: "small" },
                            { id: "spacing-medium", value: "medium", label: "medium" },
                            { id: "spacing-large", value: "large", label: "large" },
                            { id: "spacing-huge", value: "huge", label: "huge" },
                        ]}
                        value={spacing}
                        onChange={(value) => setSpacing(value)}
                        helpText="Space between breadcrumb items."
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

export default BreadcrumbsDocs;
