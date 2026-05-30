"use client";

// REACT CORE ==========================================================================================================
import React, { useState, useMemo } from "react";
import Link from "next/link";

// UI ==================================================================================================================
import {
    Div,
    Heading2,
    Text,
    Divider,
    CodeBlock,
    Checkbox,
    RadioTabGroup,
    Range,
    InputField,
    PinInputField,
} from "fictoan-react";

// STYLES ==============================================================================================================
import "../../../styles/fictoan-theme.css";
import "./pin-input-field.css";

// OTHER ===============================================================================================================
import { ComponentDocsLayout } from "../ComponentDocsLayout";

const PinInputFieldDocs = () => {
    // Props state
    const [numberOfFields, setNumberOfFields] = useState(4);
    const [type, setType] = useState("number");
    const [mask, setMask] = useState(false);
    const [isOTP, setIsOTP] = useState(false);
    const [autoFocus, setAutoFocus] = useState(false);
    const [pasteFromClipboard, setPasteFromClipboard] = useState("enabled");
    const [isFullWidth, setIsFullWidth] = useState(false);
    const [label, setLabel] = useState("Verification code");
    const [helpText, setHelpText] = useState("");
    const [errorText, setErrorText] = useState("");
    const [required, setRequired] = useState(false);
    const [size, setSize] = useState("medium");

    // Generate code
    const codeString = useMemo(() => {
        const props = [];
        props.push(`    numberOfFields={${numberOfFields}}`);
        if (label) props.push(`    label="${label}"`);
        if (helpText) props.push(`    helpText="${helpText}"`);
        if (errorText) props.push(`    errorText="${errorText}"`);
        if (required) props.push(`    required`);
        if (size !== "medium") props.push(`    size="${size}"`);
        if (type !== "number") props.push(`    type="${type}"`);
        if (mask) props.push(`    mask`);
        if (isOTP) props.push(`    isOTP`);
        if (autoFocus) props.push(`    autoFocus`);
        if (pasteFromClipboard !== "enabled") props.push(`    pasteFromClipboard="${pasteFromClipboard}"`);
        if (isFullWidth) props.push(`    isFullWidth`);

        return `<PinInputField\n${props.join("\n")}\n/>`;
    }, [numberOfFields, label, helpText, errorText, required, size, type, mask, isOTP, autoFocus, pasteFromClipboard, isFullWidth]);

    return (
        <ComponentDocsLayout pageId="page-pin-input-field">
            {/* INTRO HEADER /////////////////////////////////////////////////////////////////////////////////////// */}
            <Div id="intro-header">
                <Heading2 id="component-name">
                    Pin Input Field
                </Heading2>

                <Text id="component-description" weight="400">
                    A set of single-character input fields for entering PINs, OTPs, and verification codes
                </Text>
            </Div>

            {/* INTRO NOTES //////////////////////////////////////////////////////////////////////////////////////// */}
            <Div id="intro-notes">
                <Divider kind="tertiary" verticalMargin="micro" />

                <Text>
                    Supports numeric and alphanumeric input, optional masking for sensitive data, and OTP auto-fill
                    on supported devices. Arrow keys navigate between fields, and paste is supported.
                </Text>

                <Text>
                    Wraps in a FormItem, so it also accepts the standard <code>label</code>, <code>helpText</code>,
                    <code>errorText</code>, <code>required</code> and <code>size</code> props.
                </Text>
            </Div>

            {/* DEMO COMPONENT ///////////////////////////////////////////////////////////////////////////////////// */}
            <Div id="demo-component">
                <PinInputField
                    numberOfFields={numberOfFields}
                    label={label}
                    helpText={helpText || undefined}
                    errorText={errorText || undefined}
                    required={required}
                    size={size as any}
                    type={type as "number" | "alphanumeric"}
                    mask={mask}
                    isOTP={isOTP}
                    autoFocus={autoFocus}
                    pasteFromClipboard={pasteFromClipboard as "enabled" | "disabled"}
                    isFullWidth={isFullWidth}
                />
            </Div>

            {/* PROPS CONFIG /////////////////////////////////////////////////////////////////////////////////////// */}
            <Div id="props-config">
                <CodeBlock language="tsx" withSyntaxHighlighting showCopyButton>
                    {codeString}
                </CodeBlock>

                <Div className="doc-controls">
                    <Range
                        label="numberOfFields"
                        value={numberOfFields}
                        onChange={(value: number) => setNumberOfFields(value)}
                        min={2}
                        max={8}
                        step={1}
                        marginBottom="micro"
                        isFullWidth
                    />

                    <InputField
                        label="label"
                        value={label}
                        onChange={(value) => setLabel(value)}
                        marginBottom="micro"
                    />

                    <InputField
                        label="helpText"
                        value={helpText}
                        onChange={(value) => setHelpText(value)}
                        marginBottom="micro"
                    />

                    <InputField
                        label="errorText"
                        value={errorText}
                        onChange={(value) => setErrorText(value)}
                        marginBottom="micro"
                    />

                    <Checkbox
                        id="prop-required"
                        label="required"
                        checked={required}
                        onChange={(checked) => setRequired(checked)}
                        helpText="Marks the field required and shows the asterisk marker."
                        marginBottom="micro"
                    />

                    <RadioTabGroup
                        id="prop-size"
                        label="size"
                        options={[
                            { id: "pin-size-micro", value: "micro", label: "micro" },
                            { id: "pin-size-tiny", value: "tiny", label: "tiny" },
                            { id: "pin-size-small", value: "small", label: "small" },
                            { id: "pin-size-medium", value: "medium", label: "medium" },
                            { id: "pin-size-large", value: "large", label: "large" },
                        ]}
                        value={size}
                        onChange={(value) => setSize(value)}
                        marginBottom="micro"
                    />

                    <RadioTabGroup
                        id="prop-type"
                        label="type"
                        options={[
                            { id: "type-number", value: "number", label: "number" },
                            { id: "type-alphanumeric", value: "alphanumeric", label: "alphanumeric" },
                        ]}
                        value={type}
                        onChange={(value) => setType(value)}
                        marginBottom="micro"
                    />

                    <Checkbox
                        id="prop-mask"
                        label="mask"
                        checked={mask}
                        onChange={(checked) => setMask(checked)}
                        helpText="Hides entered characters with dots."
                        marginBottom="micro"
                    />

                    <Checkbox
                        id="prop-isOTP"
                        label="isOTP"
                        checked={isOTP}
                        onChange={(checked) => setIsOTP(checked)}
                        helpText="Enables OTP auto-fill on supported devices."
                        marginBottom="micro"
                    />

                    <Checkbox
                        id="prop-autoFocus"
                        label="autoFocus"
                        checked={autoFocus}
                        onChange={(checked) => setAutoFocus(checked)}
                        helpText="Focuses the first input on mount."
                        marginBottom="micro"
                    />

                    <RadioTabGroup
                        id="prop-pasteFromClipboard"
                        label="pasteFromClipboard"
                        options={[
                            { id: "paste-enabled", value: "enabled", label: "enabled" },
                            { id: "paste-disabled", value: "disabled", label: "disabled" },
                        ]}
                        value={pasteFromClipboard}
                        onChange={(value) => setPasteFromClipboard(value)}
                        marginBottom="micro"
                    />

                    <Checkbox
                        id="prop-isFullWidth"
                        label="isFullWidth"
                        checked={isFullWidth}
                        onChange={(checked) => setIsFullWidth(checked)}
                        helpText="Makes the input group span the full width."
                        marginBottom="micro"
                    />
                </Div>
            </Div>

            {/* THEME CONFIG /////////////////////////////////////////////////////////////////////////////////////// */}
            <Div id="theme-config">
                <Text>Same as <Link href="/components/input-field">InputField</Link>.</Text>
            </Div>
        </ComponentDocsLayout>
    );
};

export default PinInputFieldDocs;
