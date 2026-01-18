"use client";

// REACT CORE ==========================================================================================================
import React, { useState, useMemo } from "react";

// UI ==================================================================================================================
import {
    Div,
    Heading2,
    Text,
    Divider,
    Checkbox,
    CheckboxGroup,
    Switch,
    SwitchGroup,
    CodeBlock,
    InputField,
    RadioTabGroup,
} from "fictoan-react";

// UTILS ===============================================================================================================
import { createThemeConfigurator } from "$utils/themeConfigurator";

// STYLES ==============================================================================================================
import "../../../styles/fictoan-theme.css";
import "./page-checkbox.css";

// OTHER ===============================================================================================================
import { ComponentDocsLayout } from "../ComponentDocsLayout";

const CheckboxDocs = () => {
    // Props state
    const [id, setId] = useState("checkbox-1");
    const [label, setLabel] = useState("Check me");
    const [defaultChecked, setDefaultChecked] = useState(false);
    const [disabled, setDisabled] = useState(false);
    const [helpText, setHelpText] = useState("");
    const [errorText, setErrorText] = useState("");
    const [labelFirst, setLabelFirst] = useState(false);
    const [size, setSize] = useState<"tiny" | "small" | "medium" | "large">("medium");
    const [columns, setColumns] = useState<number | undefined>(undefined);

    // Mode toggles
    const [componentType, setComponentType] = useState<"checkbox" | "switch">("checkbox");
    const [showGroup, setShowGroup] = useState(false);
    const [groupValue, setGroupValue] = useState<string[]>([]);

    // Theme configurator
    const CheckboxComponent = (varName: string) => {
        return varName.startsWith("checkbox-") || varName.startsWith("switch-");
    };

    const {
        interactiveElementRef,
        componentProps: themeProps,
        themeConfigurator,
    } = createThemeConfigurator<HTMLDivElement>("Checkbox", CheckboxComponent);

    // Group options
    const groupOptions = useMemo(() => [
        { id: "option1", value: "option1", label: "Option 1", disabled },
        { id: "option2", value: "option2", label: "Option 2" },
        { id: "option3", value: "option3", label: "Option 3" },
    ], [disabled]);

    // Generate code
    const codeString = useMemo(() => {
        const componentName = componentType === "checkbox" ? "Checkbox" : "Switch";

        if (showGroup) {
            const groupName = `${componentName}Group`;
            const groupProps = [];
            groupProps.push(`name="${componentType}-group"`);
            groupProps.push(`options={[
        { id: "option1", value: "option1", label: "Option 1"${disabled ? ", disabled: true" : ""} },
        { id: "option2", value: "option2", label: "Option 2" },
        { id: "option3", value: "option3", label: "Option 3" },
    ]}`);
            groupProps.push(`value={values}`);
            groupProps.push(`onChange={(vals) => setValues(vals)}`);
            if (labelFirst) groupProps.push(`labelFirst`);
            if (size !== "medium") groupProps.push(`size="${size}"`);
            if (columns) groupProps.push(`columns={${columns}}`);

            return `import { useState } from "react";
import { ${groupName} } from "fictoan-react";

const [values, setValues] = useState<string[]>([]);

<${groupName}
    ${groupProps.join("\n    ")}
/>`;
        }

        const props = [];
        props.push(`id="${id}"`);
        props.push(`label="${label}"`);
        props.push(`checked={checked}`);
        props.push(`onChange={(val) => setChecked(val)}`);
        if (disabled) props.push(`disabled`);
        if (helpText) props.push(`helpText="${helpText}"`);
        if (errorText) props.push(`errorText="${errorText}"`);
        if (labelFirst) props.push(`labelFirst`);
        if (size !== "medium") props.push(`size="${size}"`);

        return `import { useState } from "react";
import { ${componentName} } from "fictoan-react";

const [checked, setChecked] = useState(${defaultChecked});

<${componentName}
    ${props.join("\n    ")}
/>`;
    }, [componentType, showGroup, id, label, defaultChecked, disabled, helpText, errorText, labelFirst, size, columns]);

    return (
        <ComponentDocsLayout pageId="page-checkbox">
            {/* INTRO HEADER /////////////////////////////////////////////////////////////////////////////////////// */}
            <Div id="intro-header">
                <Heading2 id="component-name">
                    Checkbox
                </Heading2>

                <Text id="component-description" weight="400">
                    A click-to-toggle component to make a choice
                </Text>
            </Div>

            {/* INTRO NOTES //////////////////////////////////////////////////////////////////////////////////////// */}
            <Div id="intro-notes">
                <Divider kind="tertiary" verticalMargin="micro" />

                <Text>
                    Use checkboxes when users need to select multiple options from a list.
                </Text>

                <Text>
                    For a single on/off toggle, use the Switch variant instead.
                </Text>
            </Div>

            {/* DEMO COMPONENT ///////////////////////////////////////////////////////////////////////////////////// */}
            <Div id="demo-component">
                {showGroup ? (
                    componentType === "checkbox" ? (
                        <CheckboxGroup
                            name="checkbox-group"
                            options={groupOptions}
                            value={groupValue}
                            onChange={(values) => setGroupValue(values)}
                            align="horizontal"
                            labelFirst={labelFirst}
                            size={size}
                            columns={columns}
                        />
                    ) : (
                        <SwitchGroup
                            name="switch-group"
                            options={groupOptions}
                            value={groupValue}
                            onChange={(values) => setGroupValue(values)}
                            align="horizontal"
                            labelFirst={labelFirst}
                            size={size}
                            columns={columns}
                        />
                    )
                ) : (
                    componentType === "checkbox" ? (
                        <Checkbox
                            {...themeProps}
                            key={`checkbox-${defaultChecked}-${disabled}-${labelFirst}-${size}`}
                            id={id}
                            label={label}
                            defaultChecked={defaultChecked}
                            disabled={disabled}
                            helpText={helpText || undefined}
                            errorText={errorText || undefined}
                            labelFirst={labelFirst}
                            size={size}
                        />
                    ) : (
                        <Switch
                            {...themeProps}
                            key={`switch-${defaultChecked}-${disabled}-${labelFirst}-${size}`}
                            id={id}
                            label={label}
                            defaultChecked={defaultChecked}
                            disabled={disabled}
                            helpText={helpText || undefined}
                            errorText={errorText || undefined}
                            labelFirst={labelFirst}
                            size={size}
                        />
                    )
                )}
            </Div>

            {/* PROPS CONFIG /////////////////////////////////////////////////////////////////////////////////////// */}
            <Div id="props-config">
                <CodeBlock language="tsx" withSyntaxHighlighting showCopyButton>
                    {codeString}
                </CodeBlock>

                <Div className="doc-controls">
                    <RadioTabGroup
                        id="component-type"
                        label="Component type"
                        options={[
                            { id: "type-checkbox", value: "checkbox", label: "Checkbox" },
                            { id: "type-switch", value: "switch", label: "Switch" },
                        ]}
                        value={componentType}
                        onChange={(value) => setComponentType(value as "checkbox" | "switch")}
                        marginBottom="micro"
                    />

                    <Checkbox
                        id="show-group"
                        label="Show as group"
                        checked={showGroup}
                        onChange={(checked) => setShowGroup(checked)}
                        marginBottom="micro"
                    />

                    {!showGroup && (
                        <>
                            <InputField
                                label="id"
                                value={id}
                                onChange={(value) => setId(value)}
                                helpText="Unique identifier for the checkbox."
                                marginBottom="micro" isFullWidth
                            />

                            <InputField
                                label="label"
                                value={label}
                                onChange={(value) => setLabel(value)}
                                helpText="Text label displayed next to the checkbox."
                                marginBottom="micro" isFullWidth
                            />

                            <Checkbox
                                id="prop-defaultChecked"
                                label="defaultChecked"
                                checked={defaultChecked}
                                onChange={(checked) => setDefaultChecked(checked)}
                                helpText="Whether the checkbox is checked by default."
                                marginBottom="micro"
                            />

                            <Checkbox
                                id="prop-disabled"
                                label="disabled"
                                checked={disabled}
                                onChange={(checked) => setDisabled(checked)}
                                marginBottom="micro"
                            />

                            <InputField
                                label="helpText"
                                value={helpText}
                                onChange={(value) => setHelpText(value)}
                                helpText="Additional helper text displayed below."
                                marginBottom="micro" isFullWidth
                            />

                            <InputField
                                label="errorText"
                                value={errorText}
                                onChange={(value) => setErrorText(value)}
                                helpText="Error message to display."
                                marginBottom="micro" isFullWidth
                            />

                            <Checkbox
                                id="prop-labelFirst"
                                label="labelFirst"
                                checked={labelFirst}
                                onChange={(checked) => setLabelFirst(checked)}
                                helpText="Place the label before the control."
                                marginBottom="micro"
                            />

                            <RadioTabGroup
                                id="prop-size"
                                label="size"
                                options={[
                                    { id: "size-tiny", value: "tiny", label: "tiny" },
                                    { id: "size-small", value: "small", label: "small" },
                                    { id: "size-medium", value: "medium", label: "medium" },
                                    { id: "size-large", value: "large", label: "large" },
                                ]}
                                value={size}
                                onChange={(val) => setSize(val as "tiny" | "small" | "medium" | "large")}
                                helpText="Size of the checkbox/switch."
                                marginBottom="micro"
                            />
                        </>
                    )}

                    {showGroup && (
                        <>
                            <Checkbox
                                id="prop-disabled-group"
                                label="disabled (first option)"
                                checked={disabled}
                                onChange={(checked) => setDisabled(checked)}
                                helpText="Disable the first option in the group."
                                marginBottom="micro"
                            />

                            <Checkbox
                                id="prop-labelFirst-group"
                                label="labelFirst"
                                checked={labelFirst}
                                onChange={(checked) => setLabelFirst(checked)}
                                helpText="Place labels before each control."
                                marginBottom="micro"
                            />

                            <RadioTabGroup
                                id="prop-size-group"
                                label="size"
                                options={[
                                    { id: "size-tiny", value: "tiny", label: "tiny" },
                                    { id: "size-small", value: "small", label: "small" },
                                    { id: "size-medium", value: "medium", label: "medium" },
                                    { id: "size-large", value: "large", label: "large" },
                                ]}
                                value={size}
                                onChange={(val) => setSize(val as "tiny" | "small" | "medium" | "large")}
                                helpText="Size of each checkbox/switch."
                                marginBottom="micro"
                            />

                            <InputField
                                label="columns"
                                value={columns?.toString() || ""}
                                onChange={(value) => setColumns(value ? parseInt(value) : undefined)}
                                helpText="Number of columns for grid layout."
                                marginBottom="micro" isFullWidth
                            />
                        </>
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

export default CheckboxDocs;
