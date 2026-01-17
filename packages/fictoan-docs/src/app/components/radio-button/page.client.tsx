"use client";

// REACT CORE ==========================================================================================================
import React, { useState, useMemo } from "react";

// UI ==================================================================================================================
import {
    Div,
    Heading2,
    Text,
    Divider,
    RadioGroup,
    RadioButton,
    CodeBlock,
    InputField,
    RadioTabGroup,
    Checkbox,
}from "fictoan-react";

// UTILS ===============================================================================================================
import { createThemeConfigurator } from "$utils/themeConfigurator";

// STYLES ==============================================================================================================
import "../../../styles/fictoan-theme.css";
import "./page-radio-button.css";

// OTHER ===============================================================================================================
import { ComponentDocsLayout } from "../ComponentDocsLayout";

const RadioButtonDocs = () => {
    // Mode toggle
    const [mode, setMode] = useState<"group" | "individual">("group");

    // Selected value state
    const [selectedValue, setSelectedValue] = useState("option-1");

    // Props state
    const [label, setLabel] = useState("Choose an option");
    const [helpText, setHelpText] = useState("");
    const [align, setAlign] = useState("vertical");
    const [disabled, setDisabled] = useState(false);
    const [disabledOptionIndex, setDisabledOptionIndex] = useState<number | null>(null);

    // Theme configurator
    const RadioButtonComponent = (varName: string) => {
        return varName.startsWith("radio-");
    };

    const {
        interactiveElementRef,
        componentProps: themeProps,
        themeConfigurator,
    } = createThemeConfigurator<HTMLDivElement>("RadioButton", RadioButtonComponent);

    // Sample options
    const baseOptions = [
        { id: "opt-1", value: "option-1", label: "Option 1" },
        { id: "opt-2", value: "option-2", label: "Option 2" },
        { id: "opt-3", value: "option-3", label: "Option 3" },
    ];

    // Options with disabled state applied
    const options = baseOptions.map((opt, index) => ({
        ...opt,
        disabled: mode === "group" && disabledOptionIndex === index,
    }));

    // Generate code
    const codeString = useMemo(() => {
        if (mode === "group") {
            const props = [];
            props.push(`id="my-radio-group"`);
            props.push(`name="my-radio-group"`);
            if (label) props.push(`label="${label}"`);
            if (helpText) props.push(`helpText="${helpText}"`);

            // Build options string with disabled if applicable
            const optionsStr = baseOptions.map((opt, index) => {
                const disabledStr = disabledOptionIndex === index ? ", disabled: true" : "";
                return `        { id: "${opt.id}", value: "${opt.value}", label: "${opt.label}"${disabledStr} }`;
            }).join(",\n");
            props.push(`options={[\n${optionsStr},\n    ]}`);

            props.push(`value={value}`);
            props.push(`onChange={(val) => setValue(val)}`);
            if (align !== "vertical") props.push(`align="${align}"`);

            return `import { useState } from "react";
import { RadioGroup } from "fictoan-react";

const [value, setValue] = useState("option-1");

<RadioGroup
    ${props.join("\n    ")}
/>`;
        } else {
            return `import { useState } from "react";
import { RadioButton } from "fictoan-react";

const [value, setValue] = useState("option-1");

<RadioButton
    id="radio-1"
    name="my-radio-group"
    value="option-1"
    label="Option 1"
    checked={value === "option-1"}
    onChange={(val) => setValue(val)}${disabled ? `\n    disabled` : ""}
/>

<RadioButton
    id="radio-2"
    name="my-radio-group"
    value="option-2"
    label="Option 2"
    checked={value === "option-2"}
    onChange={(val) => setValue(val)}${disabled ? `\n    disabled` : ""}
/>

<RadioButton
    id="radio-3"
    name="my-radio-group"
    value="option-3"
    label="Option 3"
    checked={value === "option-3"}
    onChange={(val) => setValue(val)}${disabled ? `\n    disabled` : ""}
/>`;
        }
    }, [mode, label, helpText, align, disabled, disabledOptionIndex]);

    return (
        <ComponentDocsLayout>
            {/* INTRO HEADER /////////////////////////////////////////////////////////////////////////////////////// */}
            <Div id="intro-header">
                <Heading2 id="component-name">
                    Radio button
                </Heading2>

                <Text id="component-description" weight="400">
                    An input to select one of many options
                </Text>
            </Div>

            {/* INTRO NOTES //////////////////////////////////////////////////////////////////////////////////////// */}
            <Div id="intro-notes">
                <Divider kind="tertiary" verticalMargin="micro" />

                <Text>
                    Use <code>RadioGroup</code> for a group of radio buttons with shared state.
                </Text>

                <Text>
                    Use <code>RadioButton</code> individually for custom layouts.
                </Text>

                <Text>
                    The <code>align</code> prop controls horizontal or vertical layout.
                </Text>
            </Div>

            {/* DEMO COMPONENT ///////////////////////////////////////////////////////////////////////////////////// */}
            <Div id="demo-component">
                {mode === "group" ? (
                    <RadioGroup
                        ref={interactiveElementRef}
                        name="demo-radio-group"
                        label={label || undefined}
                        helpText={helpText || undefined}
                        options={options}
                        value={selectedValue}
                        onChange={(value) => setSelectedValue(value)}
                        align={align as any}
                        {...themeProps}
                    />
                ) : (
                    <Div ref={interactiveElementRef} {...themeProps}>
                        <RadioButton
                            id="radio-1"
                            name="demo-individual"
                            value="option-1"
                            label="Option 1"
                            checked={selectedValue === "option-1"}
                            onChange={(value) => setSelectedValue(value)}
                            disabled={disabled}
                        />
                        <RadioButton
                            id="radio-2"
                            name="demo-individual"
                            value="option-2"
                            label="Option 2"
                            checked={selectedValue === "option-2"}
                            onChange={(value) => setSelectedValue(value)}
                            disabled={disabled}
                        />
                        <RadioButton
                            id="radio-3"
                            name="demo-individual"
                            value="option-3"
                            label="Option 3"
                            checked={selectedValue === "option-3"}
                            onChange={(value) => setSelectedValue(value)}
                            disabled={disabled}
                        />
                    </Div>
                )}

                <Div marginTop="nano">
                    <Text size="small">
                        Selected: {selectedValue}
                    </Text>
                </Div>
            </Div>

            {/* PROPS CONFIG /////////////////////////////////////////////////////////////////////////////////////// */}
            <Div id="props-config">
                <CodeBlock language="tsx" withSyntaxHighlighting showCopyButton>
                    {codeString}
                </CodeBlock>

                <Div className="doc-controls">
                    <RadioTabGroup
                        id="prop-mode"
                        label="Usage mode"
                        options={[
                            { id: "mode-group", value: "group", label: "RadioGroup" },
                            { id: "mode-individual", value: "individual", label: "Individual" },
                        ]}
                        value={mode}
                        onChange={(val) => setMode(val as "group" | "individual")}
                        helpText="Choose between grouped or individual radio buttons."
                        marginBottom="micro"
                    />

                    {mode === "group" && (
                        <>
                            <InputField
                                label="label"
                                value={label}
                                onChange={(val) => setLabel(val)}
                                helpText="Label text for the radio group."
                                marginBottom="micro" isFullWidth
                            />

                            <InputField
                                label="helpText"
                                value={helpText}
                                onChange={(val) => setHelpText(val)}
                                helpText="Helper text shown below the group."
                                marginBottom="micro" isFullWidth
                            />

                            <RadioTabGroup
                                id="prop-align"
                                label="align"
                                options={[
                                    { id: "align-vertical", value: "vertical", label: "vertical" },
                                    { id: "align-horizontal", value: "horizontal", label: "horizontal" },
                                ]}
                                value={align}
                                onChange={(val) => setAlign(val)}
                                helpText="Layout direction of the options."
                                marginBottom="micro"
                            />
                        </>
                    )}

                    {mode === "group" ? (
                        <Checkbox
                            id="prop-disabled"
                            label={disabledOptionIndex !== null
                                ? `disabled (${baseOptions[disabledOptionIndex].label})`
                                : "disabled"}
                            checked={disabledOptionIndex !== null}
                            onChange={() => {
                                if (disabledOptionIndex !== null) {
                                    setDisabledOptionIndex(null);
                                } else {
                                    const randomIndex = Math.floor(Math.random() * baseOptions.length);
                                    setDisabledOptionIndex(randomIndex);
                                }
                            }}
                            helpText="Disables a random radio button option."
                            marginBottom="micro"
                        />
                    ) : (
                        <Checkbox
                            id="prop-disabled"
                            label="disabled"
                            checked={disabled}
                            onChange={() => setDisabled(!disabled)}
                            helpText="Disables all radio buttons."
                            marginBottom="micro"
                        />
                    )}
                </Div>
            </Div>

            {/* THEME CONFIG /////////////////////////////////////////////////////////////////////////////////////// */}
            <Div id="theme-config">
                {themeConfigurator()}
            </Div>
        </ComponentDocsLayout>
    );
};

export default RadioButtonDocs;
