"use client";

// REACT CORE ==========================================================================================================
import React, { useState, useMemo } from "react";

// UI ==================================================================================================================
import {
    Div,
    Heading2,
    Text,
    Divider,
    ListBox,
    CodeBlock,
    InputField,
    Checkbox,
} from "fictoan-react";

// UTILS ===============================================================================================================
import { createThemeConfigurator } from "$utils/themeConfigurator";

// STYLES ==============================================================================================================
import "../../../styles/fictoan-theme.css";
import "./page-list-box.css";

// OTHER ===============================================================================================================
import { ComponentDocsLayout } from "../ComponentDocsLayout";

// Sample options for the demo
const sampleOptions = [
    { value: "apple", label: "Apple" },
    { value: "banana", label: "Banana" },
    { value: "cherry", label: "Cherry" },
    { value: "dragonfruit", label: "Dragonfruit" },
    { value: "elderberry", label: "Elderberry" },
    { value: "fig", label: "Fig" },
    { value: "grape", label: "Grape" },
];

const ListBoxDocs = () => {
    // Selected value state
    const [selectedValues, setSelectedValues] = useState<string | string[]>("");

    // Props state
    const [label, setLabel] = useState("Choose a fruit");
    const [placeholder, setPlaceholder] = useState("Select an option");
    const [helpText, setHelpText] = useState("");
    const [allowMultiSelect, setAllowMultiSelect] = useState(false);
    const [selectionLimit, setSelectionLimit] = useState<number | undefined>(undefined);
    const [allowCustomEntries, setAllowCustomEntries] = useState(false);
    const [disabled, setDisabled] = useState(false);
    const [isFullWidth, setIsFullWidth] = useState(false);

    // Theme configurator
    const ListBoxComponent = (varName: string) => {
        return varName.startsWith("list-box-");
    };

    const {
        interactiveElementRef,
        componentProps: themeProps,
        themeConfigurator,
    } = createThemeConfigurator<HTMLDivElement>("ListBox", ListBoxComponent);

    // Handle selection change
    const handleSelectionChange = (value: string | string[]) => {
        setSelectedValues(value);
    };

    // Generate code
    const codeString = useMemo(() => {
        const props = [];
        props.push(`options={options}`);
        if (label) props.push(`label="${label}"`);
        if (placeholder !== "Select an option") props.push(`placeholder="${placeholder}"`);
        if (helpText) props.push(`helpText="${helpText}"`);
        if (allowMultiSelect) props.push(`allowMultiSelect`);
        if (allowMultiSelect && selectionLimit) props.push(`selectionLimit={${selectionLimit}}`);
        if (allowCustomEntries) props.push(`allowCustomEntries`);
        if (disabled) props.push(`disabled`);
        if (isFullWidth) props.push(`isFullWidth`);
        props.push(`value={value}`);
        props.push(`onChange={(val) => setValue(val)}`);

        const stateType = allowMultiSelect ? "string[]" : "string";
        const stateDefault = allowMultiSelect ? "[]" : '""';

        return `import { useState } from "react";
import { ListBox } from "fictoan-react";

const options = [
    { value: "apple", label: "Apple" },
    { value: "banana", label: "Banana" },
    { value: "cherry", label: "Cherry" },
];

const [value, setValue] = useState<${stateType}>(${stateDefault});

<ListBox
    ${props.join("\n    ")}
/>`;
    }, [label, placeholder, helpText, allowMultiSelect, selectionLimit, allowCustomEntries, disabled, isFullWidth]);

    return (
        <ComponentDocsLayout pageId="page-list-box">
            {/* INTRO HEADER /////////////////////////////////////////////////////////////////////////////////////// */}
            <Div id="intro-header">
                <Heading2 id="component-name">
                    List box
                </Heading2>

                <Text id="component-description" weight="400">
                    A customisable dropdown with single and multi-select support
                </Text>
            </Div>

            {/* INTRO NOTES //////////////////////////////////////////////////////////////////////////////////////// */}
            <Div id="intro-notes">
                <Divider kind="tertiary" verticalMargin="micro" />

                <Text>
                    Supports both single and multi-select modes.
                </Text>

                <Text>
                    Searchable options with fuzzy matching built in.
                </Text>

                <Text>
                    Enable <code>allowCustomEntries</code> to let users add new options.
                </Text>
            </Div>

            {/* DEMO COMPONENT ///////////////////////////////////////////////////////////////////////////////////// */}
            <Div id="demo-component">
                <ListBox
                    {...themeProps}
                    ref={interactiveElementRef}
                    id="demo-listbox"
                    options={sampleOptions}
                    label={label || undefined}
                    placeholder={placeholder}
                    helpText={helpText || undefined}
                    allowMultiSelect={allowMultiSelect}
                    selectionLimit={allowMultiSelect ? selectionLimit : undefined}
                    allowCustomEntries={allowCustomEntries}
                    disabled={disabled}
                    isFullWidth={isFullWidth}
                    onChange={handleSelectionChange}
                    value={selectedValues}
                />

                <Div marginTop="nano">
                    {selectedValues && (Array.isArray(selectedValues) ? selectedValues.length > 0 : selectedValues !== "") ? (
                        <Text size="small">
                            Selected: {Array.isArray(selectedValues)
                                ? selectedValues.join(", ")
                                : selectedValues
                            }
                        </Text>
                    ) : (
                        <Text textColour="slate" size="small">
                            Make a selection from the list above.
                        </Text>
                    )}
                </Div>
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
                        helpText="The label text for the list box."
                        marginBottom="micro" isFullWidth
                    />

                    <InputField
                        label="placeholder"
                        value={placeholder}
                        onChange={(value) => setPlaceholder(value)}
                        helpText="Placeholder text when nothing is selected."
                        marginBottom="micro" isFullWidth
                    />

                    <InputField
                        label="helpText"
                        value={helpText}
                        onChange={(value) => setHelpText(value)}
                        helpText="Helper text shown below the list box."
                        marginBottom="micro" isFullWidth
                    />

                    <Checkbox
                        id="prop-allowMultiSelect"
                        label="allowMultiSelect"
                        checked={allowMultiSelect}
                        onChange={() => {
                            const newValue = !allowMultiSelect;
                            setAllowMultiSelect(newValue);
                            setSelectedValues(newValue ? [] : "");
                            if (!newValue) setSelectionLimit(undefined);
                        }}
                        helpText="Allow selecting multiple options."
                        marginBottom="micro"
                    />

                    {allowMultiSelect && (
                        <InputField
                            label="selectionLimit"
                            type="number"
                            value={selectionLimit?.toString() || ""}
                            onChange={(value) => setSelectionLimit(value ? parseInt(value, 10) : undefined)}
                            helpText="Maximum number of options that can be selected."
                            marginBottom="micro" isFullWidth
                        />
                    )}

                    <Checkbox
                        id="prop-allowCustomEntries"
                        label="allowCustomEntries"
                        checked={allowCustomEntries}
                        onChange={() => setAllowCustomEntries(!allowCustomEntries)}
                        helpText="Allow users to add custom options."
                        marginBottom="micro"
                    />

                    <Checkbox
                        id="prop-disabled"
                        label="disabled"
                        checked={disabled}
                        onChange={() => setDisabled(!disabled)}
                        helpText="Disables the list box."
                        marginBottom="micro"
                    />

                    <Checkbox
                        id="prop-isFullWidth"
                        label="isFullWidth"
                        checked={isFullWidth}
                        onChange={() => setIsFullWidth(!isFullWidth)}
                        helpText="Makes the list box full width."
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

export default ListBoxDocs;
