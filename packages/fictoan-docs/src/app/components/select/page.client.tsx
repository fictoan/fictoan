"use client";

// REACT CORE ==========================================================================================================
import React, { useState, useMemo } from "react";

// UI ==================================================================================================================
import {
    Div,
    Heading6,
    Text,
    Divider,
    Select,
    CodeBlock,
    InputField,
    Checkbox,
    RadioTabGroup,
} from "fictoan-react";

// UTILS ===============================================================================================================
import { createThemeConfigurator } from "$utils/themeConfigurator";

// STYLES ==============================================================================================================
import "../../../styles/fictoan-theme.css";
import "./page-select.css";

// OTHER ===============================================================================================================
import { ComponentDocsLayout } from "../ComponentDocsLayout";

const SelectDocs = () => {
    // Props state
    const [label, setLabel] = useState("Choose a fruit");
    const [helpText, setHelpText] = useState("");
    const [selectedValue, setSelectedValue] = useState("");
    const [disabled, setDisabled] = useState(false);
    const [isFullWidth, setIsFullWidth] = useState(false);

    // Sample options
    const options = [
        { label: "Apple", value: "apple" },
        { label: "Banana", value: "banana" },
        { label: "Cherry", value: "cherry" },
        { label: "Dragon fruit", value: "dragon-fruit" },
        { label: "Elderberry", value: "elderberry" },
    ];

    // Theme configurator
    const SelectComponent = (varName: string) => {
        return varName.startsWith("select-") || varName.startsWith("input-field-");
    };

    const {
        interactiveElementRef,
        componentProps: themeProps,
        themeConfigurator,
    } = createThemeConfigurator<HTMLSelectElement>("Select", SelectComponent);

    // Generate code
    const codeString = useMemo(() => {
        const props = [];
        if (label) props.push(`label="${label}"`);
        props.push(`options={[
        { label: "Apple", value: "apple" },
        { label: "Banana", value: "banana" },
        { label: "Cherry", value: "cherry" },
    ]}`);
        props.push(`value={value}`);
        props.push(`onChange={(val) => setValue(val)}`);
        if (helpText) props.push(`helpText="${helpText}"`);
        if (disabled) props.push(`disabled`);
        if (isFullWidth) props.push(`isFullWidth`);

        return `import { useState } from "react";
import { Select } from "fictoan-react";

const [value, setValue] = useState("${selectedValue}");

<Select
    ${props.join("\n    ")}
/>`;
    }, [label, helpText, selectedValue, disabled, isFullWidth]);

    return (
        <ComponentDocsLayout>
            {/* INTRO HEADER /////////////////////////////////////////////////////////////////////////////////////// */}
            <Div id="intro-header">
                <Heading6 id="component-name">
                    Select
                </Heading6>

                <Text id="component-description" weight="400">
                    A native select dropdown for picking a choice from a list
                </Text>
            </Div>

            {/* INTRO NOTES //////////////////////////////////////////////////////////////////////////////////////// */}
            <Div id="intro-notes">
                <Divider kind="tertiary" verticalMargin="micro" />

                <Text>
                    Uses the native <code>&lt;select&gt;</code> element for best accessibility and mobile support.
                </Text>

                <Text>
                    Width adapts to the longest option. Use <code>isFullWidth</code> to fill the container.
                </Text>

                <Text>
                    Theming inherits from InputField, with <code>select-chevron</code> for the dropdown arrow.
                </Text>
            </Div>

            {/* DEMO COMPONENT ///////////////////////////////////////////////////////////////////////////////////// */}
            <Div id="demo-component">
                <Select
                    ref={interactiveElementRef}
                    label={label || undefined}
                    options={options}
                    value={selectedValue || undefined}
                    onChange={(value) => setSelectedValue(value)}
                    helpText={helpText || undefined}
                    disabled={disabled}
                    isFullWidth={isFullWidth}
                    {...themeProps}
                />

                {selectedValue && (
                    <Div marginTop="nano">
                        <Text size="small">
                            Selected: {selectedValue}
                        </Text>
                    </Div>
                )}
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
                        onChange={(val) => setLabel(val)}
                        helpText="Label text displayed above the select."
                        marginBottom="micro" isFullWidth
                    />

                    <InputField
                        label="helpText"
                        value={helpText}
                        onChange={(val) => setHelpText(val)}
                        helpText="Helper text shown below the select."
                        marginBottom="micro" isFullWidth
                    />

                    <RadioTabGroup
                        id="prop-value"
                        label="value"
                        options={[
                            { id: "value-none", value: "", label: "None" },
                            { id: "value-apple", value: "apple", label: "Apple" },
                            { id: "value-banana", value: "banana", label: "Banana" },
                            { id: "value-cherry", value: "cherry", label: "Cherry" },
                        ]}
                        value={selectedValue}
                        onChange={(val) => setSelectedValue(val)}
                        helpText="Currently selected value."
                        marginBottom="micro"
                    />

                    <Checkbox
                        id="prop-disabled"
                        label="disabled"
                        checked={disabled}
                        onChange={() => setDisabled(!disabled)}
                        helpText="Disables the select input."
                        marginBottom="micro"
                    />

                    <Checkbox
                        id="prop-isFullWidth"
                        label="isFullWidth"
                        checked={isFullWidth}
                        onChange={() => setIsFullWidth(!isFullWidth)}
                        helpText="Makes the select take full width of its container."
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

export default SelectDocs;
