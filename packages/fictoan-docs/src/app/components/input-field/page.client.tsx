"use client";

// REACT CORE ==========================================================================================================
import React, { useState, useMemo } from "react";

// UI ==================================================================================================================
import { Div, Heading2, Text, Divider, InputField, CodeBlock, RadioTabGroup, Checkbox, } from "fictoan-react";

// UTILS ===============================================================================================================
import { createThemeConfigurator } from "$utils/themeConfigurator";

// STYLES ==============================================================================================================
import "../../../styles/fictoan-theme.css";
import "./input-field.css";

// OTHER ===============================================================================================================
import { ComponentDocsLayout } from "../ComponentDocsLayout";

const InputFieldDocs = () => {
    // Props state
    const [label, setLabel] = useState("Label");
    const [placeholder, setPlaceholder] = useState("");
    const [helpText, setHelpText] = useState("");
    const [errorText, setErrorText] = useState("");
    const [type, setType] = useState("text");
    const [size, setSize] = useState("medium");
    const [required, setRequired] = useState(false);
    const [disabled, setDisabled] = useState(false);
    const [validateThis, setValidateThis] = useState(false);
    const [innerTextLeft, setInnerTextLeft] = useState("");
    const [innerTextRight, setInnerTextRight] = useState("");
    const [innerIconLeft, setInnerIconLeft] = useState("");
    const [innerIconRight, setInnerIconRight] = useState("");

    // Simple icon components for demo
    const icons: Record<string, React.ReactNode> = {
        search: <span>🔍</span>,
        user: <span>👤</span>,
        mail: <span>✉️</span>,
        lock: <span>🔒</span>,
    };

    // Theme configurator
    const InputFieldComponent = (varName: string) => {
        return varName.startsWith("input-");
    };

    const {
        interactiveElementRef,
        componentProps: themeProps,
        themeConfigurator,
    } = createThemeConfigurator<HTMLInputElement>("InputField", InputFieldComponent);

    // Generate code
    const codeString = useMemo(() => {
        const props = [];
        if (label) props.push(`label="${label}"`);
        if (placeholder) props.push(`placeholder="${placeholder}"`);
        props.push(`value={value}`);
        props.push(`onChange={(val) => setValue(val)}`);
        if (helpText) props.push(`helpText="${helpText}"`);
        if (errorText) props.push(`errorText="${errorText}"`);
        if (type !== "text") props.push(`type="${type}"`);
        if (size !== "medium") props.push(`size="${size}"`);
        if (innerTextLeft) props.push(`innerTextLeft="${innerTextLeft}"`);
        if (innerTextRight) props.push(`innerTextRight="${innerTextRight}"`);
        if (innerIconLeft) props.push(`innerIconLeft={<IconComponent />}`);
        if (innerIconRight) props.push(`innerIconRight={<IconComponent />}`);
        if (required) props.push(`required`);
        if (disabled) props.push(`disabled`);
        if (validateThis) props.push(`validateThis`);

        return `import { useState } from "react";
import { InputField } from "fictoan-react";

const [value, setValue] = useState("");

<InputField
    ${props.join("\n    ")}
/>`;
    }, [label, placeholder, helpText, errorText, type, size, innerTextLeft, innerTextRight, innerIconLeft, innerIconRight, required, disabled, validateThis]);

    return (
        <ComponentDocsLayout pageId="page-input-field">
            {/* INTRO HEADER /////////////////////////////////////////////////////////////////////////////////////// */}
            <Div id="intro-header">
                <Heading2 id="component-name">
                    Input field
                </Heading2>

                <Text id="component-description" weight="400">
                    A text box to enter information
                </Text>
            </Div>

            {/* INTRO NOTES //////////////////////////////////////////////////////////////////////////////////////// */}
            <Div id="intro-notes">
                <Divider kind="tertiary" verticalMargin="micro" />

                <Text>
                    The input field also forms the styling base for Select, Textarea etc.
                </Text>

                <Text>
                    Use <code>validateThis</code> to enable built-in HTML5 validation feedback.
                </Text>

                <Text>
                    Add side elements with <code>innerIconLeft</code>, <code>innerIconRight</code>, <code>innerTextLeft</code>, or <code>innerTextRight</code>.
                </Text>
            </Div>

            {/* DEMO COMPONENT ///////////////////////////////////////////////////////////////////////////////////// */}
            <Div id="demo-component">
                <InputField
                    ref={interactiveElementRef}
                    label={label}
                    placeholder={placeholder || undefined}
                    helpText={helpText || undefined}
                    errorText={errorText || undefined}
                    type={type as any}
                    size={size as any}
                    innerTextLeft={innerTextLeft || undefined}
                    innerTextRight={innerTextRight || undefined}
                    innerIconLeft={innerIconLeft ? icons[innerIconLeft] : undefined}
                    innerIconRight={innerIconRight ? icons[innerIconRight] : undefined}
                    required={required}
                    disabled={disabled}
                    validateThis={validateThis}
                    {...themeProps}
                />
            </Div>

            {/* PROPS CONFIG /////////////////////////////////////////////////////////////////////////////////////// */}
            <Div id="props-config">
                <CodeBlock language="tsx" withSyntaxHighlighting showCopyButton>
                    {codeString}
                </CodeBlock>

                <Div className="doc-controls">
                    <InputField
                        label="label"
                        value={label}
                        onChange={(value) => setLabel(value)}
                        helpText="The label text for the input."
                        marginBottom="micro" isFullWidth
                    />

                    <InputField
                        label="placeholder"
                        value={placeholder}
                        onChange={(value) => setPlaceholder(value)}
                        helpText="Placeholder text shown when empty."
                        marginBottom="micro" isFullWidth
                    />

                    <InputField
                        label="helpText"
                        value={helpText}
                        onChange={(value) => setHelpText(value)}
                        helpText="Helper text shown below the input."
                        marginBottom="micro" isFullWidth
                    />

                    <InputField
                        label="errorText"
                        value={errorText}
                        onChange={(value) => setErrorText(value)}
                        helpText="Error message shown when invalid."
                        marginBottom="micro" isFullWidth
                    />

                    <RadioTabGroup
                        id="prop-type"
                        label="type"
                        options={[
                            { id: "type-text", value: "text", label: "text" },
                            { id: "type-password", value: "password", label: "password" },
                            { id: "type-email", value: "email", label: "email" },
                            { id: "type-number", value: "number", label: "number" },
                            { id: "type-tel", value: "tel", label: "tel" },
                            { id: "type-url", value: "url", label: "url" },
                        ]}
                        value={type}
                        onChange={(value) => setType(value)}
                        helpText="The HTML input type."
                        marginBottom="micro"
                    />

                    <RadioTabGroup
                        id="prop-size"
                        label="size"
                        options={[
                            { id: "size-micro", value: "micro", label: "micro" },
                            { id: "size-tiny", value: "tiny", label: "tiny" },
                            { id: "size-small", value: "small", label: "small" },
                            { id: "size-medium", value: "medium", label: "medium" },
                            { id: "size-large", value: "large", label: "large" },
                        ]}
                        value={size}
                        onChange={(value) => setSize(value)}
                        helpText="Size of the input field."
                        marginBottom="micro"
                    />

                    <InputField
                        label="innerTextLeft"
                        value={innerTextLeft}
                        onChange={(value) => setInnerTextLeft(value)}
                        placeholder="e.g. $, https://"
                        helpText="Text element on the left side."
                        marginBottom="micro" isFullWidth
                    />

                    <InputField
                        label="innerTextRight"
                        value={innerTextRight}
                        onChange={(value) => setInnerTextRight(value)}
                        placeholder="e.g. .com, kg"
                        helpText="Text element on the right side."
                        marginBottom="micro" isFullWidth
                    />

                    <RadioTabGroup
                        id="prop-innerIconLeft"
                        label="innerIconLeft"
                        options={[
                            { id: "iconLeft-none", value: "", label: "None" },
                            { id: "iconLeft-search", value: "search", label: "🔍" },
                            { id: "iconLeft-user", value: "user", label: "👤" },
                            { id: "iconLeft-mail", value: "mail", label: "✉️" },
                            { id: "iconLeft-lock", value: "lock", label: "🔒" },
                        ]}
                        value={innerIconLeft}
                        onChange={(value) => setInnerIconLeft(value)}
                        helpText="Icon on the left side."
                        marginBottom="micro"
                    />

                    <RadioTabGroup
                        id="prop-innerIconRight"
                        label="innerIconRight"
                        options={[
                            { id: "iconRight-none", value: "", label: "None" },
                            { id: "iconRight-search", value: "search", label: "🔍" },
                            { id: "iconRight-user", value: "user", label: "👤" },
                            { id: "iconRight-mail", value: "mail", label: "✉️" },
                            { id: "iconRight-lock", value: "lock", label: "🔒" },
                        ]}
                        value={innerIconRight}
                        onChange={(value) => setInnerIconRight(value)}
                        helpText="Icon on the right side."
                        marginBottom="micro"
                    />

                    <Checkbox
                        id="prop-required"
                        label="required"
                        checked={required}
                        onChange={() => setRequired(!required)}
                        helpText="Marks the field as required."
                        marginBottom="micro"
                    />

                    <Checkbox
                        id="prop-disabled"
                        label="disabled"
                        checked={disabled}
                        onChange={() => setDisabled(!disabled)}
                        helpText="Disables the input field."
                        marginBottom="micro"
                    />

                    <Checkbox
                        id="prop-validateThis"
                        label="validateThis"
                        checked={validateThis}
                        onChange={() => {
                            const newValue = !validateThis;
                            setValidateThis(newValue);
                            if (newValue) {
                                setType("email");
                                setErrorText("Please enter valid email");
                            }
                        }}
                        helpText="Enables built-in HTML5 validation feedback. Sets type to email for demo."
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

export default InputFieldDocs;
