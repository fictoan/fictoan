"use client";

// REACT CORE ==========================================================================================================
import React, { useState, useMemo } from "react";

// UI ==================================================================================================================
import {
    Div,
    Heading2,
    Text,
    Divider,
    CodeBlock,
    Checkbox,
    RadioTabGroup,
    InputField,
} from "fictoan-react";

// UTILS ===============================================================================================================
import { createThemeConfigurator } from "$utils/themeConfigurator";

// STYLES ==============================================================================================================
import "../../../styles/fictoan-theme.css";
import "./page-radio-tab-group.css";

// OTHER ===============================================================================================================
import { ComponentDocsLayout } from "../ComponentDocsLayout";

const RadioTabGroupDocs = () => {
    // Props state
    const [label, setLabel] = useState("Choose destination");
    const [helpText, setHelpText] = useState("");
    const [disableOneOption, setDisableOneOption] = useState(false);
    const [required, setRequired] = useState(false);

    // Demo state
    const [selectedValue, setSelectedValue] = useState("chennai");

    const options = [
        { id: "opt-1", value: "chennai", label: "Chennai" },
        { id: "opt-2", value: "berlin", label: "Berlin", disabled: disableOneOption },
        { id: "opt-3", value: "la-paz", label: "La Paz" },
        { id: "opt-4", value: "alberta", label: "Alberta" },
    ];

    // Theme configurator
    const RadioTabGroupComponent = (varName: string) => {
        return varName.startsWith("radio-tabs-");
    };

    const {
        interactiveElementRef,
        componentProps: themeProps,
        themeConfigurator,
    } = createThemeConfigurator("RadioTabGroup", RadioTabGroupComponent);

    // Generate code
    const codeString = useMemo(() => {
        const props = [];
        props.push(`    id="destination-selector"`);
        if (label) props.push(`    label="${label}"`);
        if (helpText) props.push(`    helpText="${helpText}"`);
        if (required) props.push(`    required`);
        props.push(`    options={[`);
        options.forEach(opt => {
            const optProps = `id: "${opt.id}", value: "${opt.value}", label: "${opt.label}"${opt.disabled ? ", disabled: true" : ""}`;
            props.push(`        { ${optProps} },`);
        });
        props.push(`    ]}`);
        props.push(`    value={selectedValue}`);
        props.push(`    onChange={(value) => setSelectedValue(value)}`);

        return `<RadioTabGroup\n${props.join("\n")}\n/>`;
    }, [label, helpText, required, options]);

    return (
        <ComponentDocsLayout pageId="page-radio-tab-group">
            {/* INTRO HEADER /////////////////////////////////////////////////////////////////////////////////////// */}
            <Div id="intro-header">
                <Heading2 id="component-name">
                    Radio Tab Group
                </Heading2>

                <Text id="component-description" weight="400">
                    A radio button group styled as a horizontal tab-like selector
                </Text>
            </Div>

            {/* INTRO NOTES //////////////////////////////////////////////////////////////////////////////////////// */}
            <Div id="intro-notes">
                <Divider kind="tertiary" verticalMargin="micro" />

                <Text>
                    Each option takes the width of its content. Supports keyboard navigation with arrow keys.
                    Automatically scrolls when options overflow the container.
                </Text>
            </Div>

            {/* DEMO COMPONENT ///////////////////////////////////////////////////////////////////////////////////// */}
            <Div id="demo-component">
                <RadioTabGroup
                    {...themeProps}
                    // @ts-ignore
                    ref={interactiveElementRef}
                    id="interactive-component"
                    label={label || undefined}
                    helpText={helpText || undefined}
                    required={required}
                    options={options}
                    value={selectedValue}
                    onChange={(value) => setSelectedValue(value)}
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
                        helpText="The label displayed above the group."
                        marginBottom="micro"
                        isFullWidth
                    />

                    <InputField
                        label="helpText"
                        value={helpText}
                        onChange={(value) => setHelpText(value)}
                        helpText="Helper text displayed below the group."
                        marginBottom="micro"
                        isFullWidth
                    />

                    <Checkbox
                        id="prop-disabled"
                        label="disabled (Berlin option)"
                        checked={disableOneOption}
                        onChange={(checked) => setDisableOneOption(checked)}
                        helpText="Disables an individual option."
                        marginBottom="micro"
                    />

                    <Checkbox
                        id="prop-required"
                        label="required"
                        checked={required}
                        onChange={(checked) => setRequired(checked)}
                        helpText="Marks the field as required."
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

export default RadioTabGroupDocs;
