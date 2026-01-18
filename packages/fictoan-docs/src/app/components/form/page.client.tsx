"use client";

// REACT CORE ==========================================================================================================
import React, { useState, useMemo } from "react";

// UI ==================================================================================================================
import {
    Div,
    Heading2,
    Divider,
    Text,
    Form,
    RadioTabGroup,
    Checkbox,
    CodeBlock,
} from "fictoan-react";

// STYLES ==============================================================================================================
import "./page-form.css";

// OTHER ===============================================================================================================
import { ComponentDocsLayout } from "../ComponentDocsLayout";
import { SampleForm } from "./SampleForm";

const FormDocs = () => {
    const [selectedSpacing, setSelectedSpacing] = useState("small");
    const [selectedSize, setSelectedSize] = useState("medium");
    const [isJoint, setIsJoint] = useState(false);
    const [isButtonFullWidth, setIsButtonFullWidth] = useState(false);

    // Generate code
    const codeString = useMemo(() => {
        const sizeAttr = selectedSize !== "medium" ? ` size="${selectedSize}"` : "";
        return [
            `<Form${selectedSpacing ? ` spacing="${selectedSpacing}"` : ""}>`,
            `    <FormItemGroup${isJoint ? " isJoint" : ""}>`,
            `        <InputField label="First name"${sizeAttr} />`,
            `        <InputField label="Last name"${sizeAttr} />`,
            `    </FormItemGroup>\n`,
            `    <InputField label="Email"${sizeAttr} />\n`,
            `    <InputField label="Address"${sizeAttr} />\n`,
            `    <Button kind="primary"${isButtonFullWidth ? ` isFullWidth` : ""}>Submit</Button>`,
            `</Form>`,
        ].join("\n");
    }, [selectedSpacing, selectedSize, isJoint, isButtonFullWidth]);

    return (
        <ComponentDocsLayout pageId="page-form">
            {/* INTRO HEADER /////////////////////////////////////////////////////////////////////////////////////// */}
            <Div id="intro-header">
                <Heading2 id="component-name">Form</Heading2>

                <Text id="component-description" weight="400">
                    A parent wrapper for all form elements, used to space them evenly
                </Text>
            </Div>

            {/* INTRO NOTES //////////////////////////////////////////////////////////////////////////////////////// */}
            <Div id="intro-notes">
                <Divider kind="tertiary" verticalMargin="micro" />

                <Text>
                    The <code>Form</code> component is a wrapper that provides consistent spacing between
                    form elements. Use the <code>spacing</code> prop to control the gap between items.
                </Text>

                <Text>
                    Group related fields together with <code>FormItemGroup</code>, which can optionally
                    join inputs visually with the <code>isJoint</code> prop.
                </Text>
            </Div>

            {/* DEMO COMPONENT ///////////////////////////////////////////////////////////////////////////////////// */}
            <Div id="demo-component">
                <SampleForm
                    spacing={selectedSpacing}
                    size={selectedSize}
                    isJoint={isJoint}
                    isButtonFullWidth={isButtonFullWidth}
                />
            </Div>

            {/* PROPS CONFIG /////////////////////////////////////////////////////////////////////////////////////// */}
            <Div id="props-config">
                <CodeBlock language="jsx" withSyntaxHighlighting showCopyButton marginBottom="micro">
                    {codeString}
                </CodeBlock>

                <Div className="doc-controls">
                    <RadioTabGroup
                        id="spacing"
                        label="spacing"
                        name="spacing"
                        options={[
                            { id: "spacing-opt-0", value: "none", label: "none" },
                            { id: "spacing-opt-1", value: "nano", label: "nano" },
                            { id: "spacing-opt-2", value: "micro", label: "micro" },
                            { id: "spacing-opt-3", value: "tiny", label: "tiny" },
                            { id: "spacing-opt-4", value: "small", label: "small" },
                            { id: "spacing-opt-5", value: "medium", label: "medium" },
                            { id: "spacing-opt-6", value: "large", label: "large" },
                            { id: "spacing-opt-7", value: "huge", label: "huge" },
                        ]}
                        value={selectedSpacing}
                        onChange={(value) => setSelectedSpacing(value)}
                        helpText="Controls the vertical gap between form elements"
                    />

                    <Divider kind="secondary" horizontalMargin="none" marginTop="micro" />

                    <RadioTabGroup
                        id="size"
                        label="size"
                        name="size"
                        options={[
                            { id: "size-opt-0", value: "tiny", label: "tiny" },
                            { id: "size-opt-1", value: "small", label: "small" },
                            { id: "size-opt-2", value: "medium", label: "medium" },
                            { id: "size-opt-3", value: "large", label: "large" },
                        ]}
                        value={selectedSize}
                        onChange={(value) => setSelectedSize(value)}
                        helpText="Controls the size of form elements"
                    />

                    <Divider kind="secondary" horizontalMargin="none" marginTop="micro" />

                    <Checkbox
                        id="checkbox-is-joint"
                        label="isJoint"
                        checked={isJoint}
                        onChange={(checked) => setIsJoint(checked)}
                        helpText="Visually joins inputs inside a FormItemGroup"
                    />

                    <Divider kind="secondary" horizontalMargin="none" marginTop="micro" />

                    <Checkbox
                        id="checkbox-button-full-width"
                        label="isFullWidth (on Button)"
                        checked={isButtonFullWidth}
                        onChange={(checked) => setIsButtonFullWidth(checked)}
                        helpText="Makes the submit button span the full width"
                    />
                </Div>
            </Div>

            {/* THEME CONFIG /////////////////////////////////////////////////////////////////////////////////////// */}
            <Div id="theme-config">
                <Text textColour="slate">
                    The Form component inherits spacing from theme variables. Individual form elements
                    have their own theme configuration options.
                </Text>
            </Div>
        </ComponentDocsLayout>
    );
};

export default FormDocs;
