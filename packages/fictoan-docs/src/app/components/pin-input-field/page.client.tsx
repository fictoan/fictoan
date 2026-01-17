"use client";

// REACT CORE ==========================================================================================================
import React, { useState, useMemo } from "react";
import Link from "next/link";

// UI ==================================================================================================================
import {
    Div,
    Heading6,
    Text,
    Divider,
    CodeBlock,
    Checkbox,
    RadioTabGroup,
    Range,
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

    // Generate code
    const codeString = useMemo(() => {
        const props = [];
        props.push(`    numberOfFields={${numberOfFields}}`);
        if (type !== "number") props.push(`    type="${type}"`);
        if (mask) props.push(`    mask`);
        if (isOTP) props.push(`    isOTP`);
        if (autoFocus) props.push(`    autoFocus`);
        if (pasteFromClipboard !== "enabled") props.push(`    pasteFromClipboard="${pasteFromClipboard}"`);
        if (isFullWidth) props.push(`    isFullWidth`);

        return `<PinInputField\n${props.join("\n")}\n/>`;
    }, [numberOfFields, type, mask, isOTP, autoFocus, pasteFromClipboard, isFullWidth]);

    return (
        <ComponentDocsLayout>
            {/* INTRO HEADER /////////////////////////////////////////////////////////////////////////////////////// */}
            <Div id="intro-header">
                <Heading6 id="component-name">
                    Pin Input Field
                </Heading6>

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
            </Div>

            {/* DEMO COMPONENT ///////////////////////////////////////////////////////////////////////////////////// */}
            <Div id="demo-component">
                <PinInputField
                    numberOfFields={numberOfFields}
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
                        onChange={(value) => setNumberOfFields(value)}
                        min={2}
                        max={8}
                        step={1}
                        marginBottom="micro"
                        isFullWidth
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
