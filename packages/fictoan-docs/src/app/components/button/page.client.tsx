"use client";

// REACT CORE ==========================================================================================================
import React, { useState, useMemo } from "react";

// UI ==================================================================================================================
import { Button, Heading2, Div, Text, Divider, CodeBlock, InputField, RadioTabGroup, Checkbox, ListBox } from "fictoan-react";

// LOCAL COMPONENTS ====================================================================================================
import { ComponentDocsLayout } from "../ComponentDocsLayout";

// UTILS ===============================================================================================================
import { createThemeConfigurator } from "$utils/themeConfigurator";

// DATA ================================================================================================================
import { colourOptions } from "../../colour/colours";

// STYLES ==============================================================================================================
import "../../../styles/fictoan-theme.css";
import "./page-button.css";

const ButtonDocs = () => {
    // Props state
    const [children, setChildren] = useState("Button");
    const [kind, setKind] = useState("primary");
    const [size, setSize] = useState("medium");
    const [shape, setShape] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [label, setLabel] = useState("");

    // Custom kind colours
    const [bgColour, setBgColour] = useState("");
    const [borderColour, setBorderColour] = useState("");
    const [textColour, setTextColour] = useState("");

    // Theme configurator
    const ButtonComponent = (varName: string) => {
        return varName.startsWith("button-");
    };

    const {
        interactiveElementRef,
        componentProps: themeProps,
        themeConfigurator,
    } = createThemeConfigurator<HTMLButtonElement>("Button", ButtonComponent);

    // Generate code
    const codeString = useMemo(() => {
        const props = [];
        if (kind && kind !== "primary") props.push(`    kind="${kind}"`);
        if (size && size !== "medium") props.push(`    size="${size}"`);
        if (shape) props.push(`    shape="${shape}"`);
        if (isLoading) props.push(`    isLoading`);
        if (label) props.push(`    label="${label}"`);
        if (kind === "custom") {
            if (bgColour) props.push(`    bgColour="${bgColour}"`);
            if (borderColour) props.push(`    borderColour="${borderColour}"`);
            if (textColour) props.push(`    textColour="${textColour}"`);
        }

        const propsString = props.length > 0 ? `\n${props.join("\n")}\n` : "";
        return `<Button${propsString}>\n    ${children}\n</Button>`;
    }, [children, kind, size, shape, isLoading, label, bgColour, borderColour, textColour]);

    return (
        <ComponentDocsLayout pageId="page-button">
            {/* INTRO HEADER /////////////////////////////////////////////////////////////////////////////////////// */}
            <Div id="intro-header">
                <Heading2 id="component-name">
                    Button
                </Heading2>

                <Text id="component-description" weight="400">
                    A clickable component to trigger an action or an event
                </Text>
            </Div>

            {/* INTRO NOTES //////////////////////////////////////////////////////////////////////////////////////// */}
            <Div id="intro-notes">
                <Divider kind="tertiary" verticalMargin="micro" />

                <Text>
                    For the <code>primary / secondary / tertiary</code> kinds, the background, text and border colours are
                    defined in the theme, to ensure consistency. The <code>custom</code> value lets you add them
                    manually.
                </Text>
            </Div>

            {/* DEMO COMPONENT ///////////////////////////////////////////////////////////////////////////////////// */}
            <Div id="demo-component">
                <Button
                    ref={interactiveElementRef}
                    kind={kind as any}
                    size={size as any}
                    shape={shape as any || undefined}
                    isLoading={isLoading}
                    label={label || undefined}
                    bgColour={kind === "custom" && bgColour ? bgColour : undefined}
                    borderColour={kind === "custom" && borderColour ? borderColour : undefined}
                    textColour={kind === "custom" && textColour ? textColour : undefined}
                    {...themeProps}
                >
                    {children}
                </Button>
            </Div>

            {/* PROPS CONFIG /////////////////////////////////////////////////////////////////////////////////////// */}
            <Div id="props-config">
                <CodeBlock language="tsx" withSyntaxHighlighting showCopyButton>
                    {codeString}
                </CodeBlock>

                <Div className="doc-controls">
                    <InputField
                        label="children"
                        value={children}
                        onChange={(value) => setChildren(value)}
                        helpText="The text content of the button."
                        marginBottom="micro" isFullWidth
                    />

                    <RadioTabGroup
                        id="prop-kind"
                        label="kind"
                        options={[
                            { id: "kind-primary", value: "primary", label: "primary" },
                            { id: "kind-secondary", value: "secondary", label: "secondary" },
                            { id: "kind-tertiary", value: "tertiary", label: "tertiary" },
                            { id: "kind-custom", value: "custom", label: "custom" },
                        ]}
                        value={kind}
                        onChange={(value) => setKind(value)}
                        marginBottom="micro"
                    />

                    {kind === "custom" && (
                        <>
                            <ListBox
                                label="bgColour"
                                options={colourOptions}
                                value={bgColour}
                                onChange={(value) => setBgColour(value as string)}
                                placeholder="Select background colour"
                                marginBottom="micro"
                                isFullWidth
                            />

                            <ListBox
                                label="borderColour"
                                options={colourOptions}
                                value={borderColour}
                                onChange={(value) => setBorderColour(value as string)}
                                placeholder="Select border colour"
                                marginBottom="micro"
                                isFullWidth
                            />

                            <ListBox
                                label="textColour"
                                options={colourOptions}
                                value={textColour}
                                onChange={(value) => setTextColour(value as string)}
                                placeholder="Select text colour"
                                marginBottom="micro"
                                isFullWidth
                            />
                        </>
                    )}

                    <RadioTabGroup
                        id="prop-size"
                        label="size"
                        options={[
                            { id: "size-none", value: "none", label: "none" },
                            { id: "size-nano", value: "nano", label: "nano" },
                            { id: "size-micro", value: "micro", label: "micro" },
                            { id: "size-tiny", value: "tiny", label: "tiny" },
                            { id: "size-small", value: "small", label: "small" },
                            { id: "size-medium", value: "medium", label: "medium" },
                            { id: "size-large", value: "large", label: "large" },
                            { id: "size-huge", value: "huge", label: "huge" },
                        ]}
                        value={size}
                        onChange={(value) => setSize(value)}
                        marginBottom="micro"
                    />

                    <RadioTabGroup
                        id="prop-shape"
                        label="shape"
                        options={[
                            { id: "shape-none", value: "", label: "none" },
                            { id: "shape-rounded", value: "rounded", label: "rounded" },
                            { id: "shape-curved", value: "curved", label: "curved" },
                        ]}
                        value={shape}
                        onChange={(value) => setShape(value)}
                        marginBottom="micro"
                    />

                    <Checkbox
                        id="prop-isLoading"
                        label="isLoading"
                        checked={isLoading}
                        onChange={(checked) => setIsLoading(checked)}
                        helpText="Shows a loading spinner."
                        marginBottom="micro"
                    />

                    <InputField
                        label="label"
                        value={label}
                        onChange={(value) => setLabel(value)}
                        helpText="Accessible label for screen readers."
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

export default ButtonDocs;
