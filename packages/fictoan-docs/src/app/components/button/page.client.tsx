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
    const [variant, setVariant] = useState("");
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
        if (variant) props.push(`    variant="${variant}"`);
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
    }, [children, kind, variant, size, shape, isLoading, label, bgColour, borderColour, textColour]);

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
                    The <code>kind</code> prop controls the visual emphasis&mdash;<code>primary</code> is
                    solid, <code>secondary</code> is tinted, and <code>tertiary</code> is outlined. Hover and
                    active states are computed automatically
                    using <code>color-mix()</code>. The <code>variant</code> prop
                    switches the colour palette to <code>success</code>, <code>warning</code>,
                    or <code>danger</code>. Use <code>custom</code> for full manual control.
                </Text>
            </Div>

            {/* DEMO COMPONENT ///////////////////////////////////////////////////////////////////////////////////// */}
            <Div id="demo-component">
                <Button
                    ref={interactiveElementRef}
                    kind={kind as any}
                    variant={variant as any || undefined}
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

                    {kind !== "custom" && (
                        <RadioTabGroup
                            id="prop-variant"
                            label="variant"
                            options={[
                                { id: "variant-none", value: "", label: "none" },
                                { id: "variant-success", value: "success", label: "success" },
                                { id: "variant-warning", value: "warning", label: "warning" },
                                { id: "variant-danger", value: "danger", label: "danger" },
                            ]}
                            value={variant}
                            onChange={(value) => setVariant(value)}
                            helpText="Switches the colour palette. Hover and active states are computed automatically."
                            marginBottom="micro"
                        />
                    )}

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
                <Text weight="700" marginBottom="micro">Theme variables</Text>

                <Text marginBottom="micro">
                    Set <code>primary-bg</code> and <code>primary-text</code> to define the base
                    button colour. Secondary and tertiary derive from it
                    automatically&mdash;secondary mixes the primary colour
                    with <code>--body-bg</code>, tertiary uses it for text and border. Hover and
                    active states are computed using <code>color-mix()</code>. You can override
                    any of the six values independently.
                </Text>

                <CodeBlock language="css" withSyntaxHighlighting showCopyButton marginBottom="small">
{`--button-primary-bg     : var(--blue);
--button-primary-text   : var(--white);

--button-secondary-bg   : color-mix(in oklch, var(--button-primary-bg), var(--body-bg) 80%);
--button-secondary-text : var(--button-primary-bg);

--button-tertiary-bg    : transparent;
--button-tertiary-text  : var(--button-primary-bg);`}
                </CodeBlock>

                <Text weight="700" marginBottom="micro">Variant colours</Text>

                <Text marginBottom="micro">
                    Variants switch the colour palette. They
                    override <code>--button-primary-bg</code> and <code>--button-primary-text</code> at
                    the element level, and secondary and tertiary re-derive automatically.
                </Text>

                <CodeBlock language="css" withSyntaxHighlighting showCopyButton marginBottom="small">
{`--button-success-bg   : var(--green);
--button-success-text : var(--white);

--button-warning-bg   : var(--amber);
--button-warning-text : var(--white);

--button-danger-bg    : var(--red);
--button-danger-text  : var(--white);`}
                </CodeBlock>

                <Text weight="700" marginBottom="micro">Full manual control</Text>

                <Text marginBottom="micro">
                    Use <code>kind="custom"</code> with the <code>bgColour</code>, <code>textColour</code>,
                    and <code>borderColour</code> props for complete control over the button appearance
                    without any computed styles.
                </Text>
            </Div>
        </ComponentDocsLayout>
    );
};

export default ButtonDocs;
