"use client";

// REACT CORE ==========================================================================================================
import React, { useEffect, useState } from "react";

// UI ==================================================================================================================
import { Heading1, Heading4, Divider, Portion, Row, Text, Article, Element, Form, Card, Header, RadioTabGroup, Select, Range, InputField, Button, CodeBlock } from "fictoan-react";

// UTILS ===============================================================================================================
import { toKebabCase } from "../../../utils/toKebabCase";
import { useThemeVariables } from "../../../utils/useThemeVariables";

// STYLES ==============================================================================================================
import "./page-radio-tab-group.css";

// OTHER ===============================================================================================================
import { colourOptions } from "../../colour/colours";
import { radioTabGroupProps } from "./config";

// Helper functions for localStorage
const saveToLocalStorage = (key, value) => {
    if (typeof window !== "undefined") {
        localStorage.setItem(key, JSON.stringify(value));
    }
};

const loadFromLocalStorage = (key, defaultValue) => {
    if (typeof window !== "undefined") {
        const saved = localStorage.getItem(key);
        return saved ? JSON.parse(saved) : defaultValue;
    }
    return defaultValue;
};

const RadioTabGroupDocs = () => {
    const {
        componentVariables,
        cssVariablesList,
        handleVariableChange,
    } = useThemeVariables(radioTabGroupProps.variables);

    const [label, setLabel] = useState(() => loadFromLocalStorage("radioTabGroup_label", "Choose destination"));
    const [name, setName] = useState(() => loadFromLocalStorage("radioTabGroup_name", "choose-destination"));
    const [manualNameSet, setManualNameSet] = useState(false);

    const [options, setOptions] = useState(() =>
        loadFromLocalStorage("radioTabGroup_options", [
            { id : "opt-1", value : "chennai", label : "Chennai" },
            { id : "opt-2", value : "berlin", label : "Berlin" },
            { id : "opt-3", value : "la-paz", label : "La Paz" },
            { id : "opt-4", value : "alberta", label : "Alberta" },
            { id : "opt-5", value : "perth", label : "Perth" },
        ]),
    );

    // Effects for persisting state changes
    useEffect(() => {
        saveToLocalStorage("radioTabGroup_label", label);

        // Update `name` automatically in kebab case if not manually set
        if (!manualNameSet) {
            const kebabName = toKebabCase(label);
            setName(kebabName);
            saveToLocalStorage("radioTabGroup_name", kebabName);
        }
    }, [label, manualNameSet]);

    useEffect(() => {
        saveToLocalStorage("radioTabGroup_name", name);
    }, [name]);

    // Cleanup effect
    useEffect(() => {
        return () => {
            localStorage.removeItem("radioTabGroup_label");
            localStorage.removeItem("radioTabGroup_name");
            localStorage.removeItem("radioTabGroup_options");
        };
    }, []);

    const handleNameChange = (value) => {
        setName(value);
        setManualNameSet(true); // Mark `name` as manually set
        saveToLocalStorage("radioTabGroup_name", value);
    };


    // Handler for option changes
    const handleOptionChange = (index, field, value) => {
        const newOptions = [...options];

        // Update field with new value
        newOptions[index][field] = value;

        // Automatically generate kebab-case `value` from `label` unless `value` was manually set
        if (field === "label" && !newOptions[index].manualValueSet) {
            newOptions[index].value = toKebabCase(value);
        }

        // If `value` is edited manually, prevent auto-generation
        if (field === "value") {
            newOptions[index].manualValueSet = true;
        }

        setOptions(newOptions);
        saveToLocalStorage("radioTabGroup_options", newOptions);
    };

    const [selectedTabValue, setSelectedTabValue] = useState(options[0].value);

    // Add new option
    const addOption = () => {
        if (options.length < 12) {
            const newOptions = [
                ...options,
                {
                    id: `opt-${options.length + 1}`,
                    value: "none",
                    label: `Option ${options.length + 1}`,
                    manualValueSet: false, // Track manual changes
                },
            ];
            setOptions(newOptions);
            saveToLocalStorage("radioTabGroup_options", newOptions);
        }
    };

    // Remove last option
    const removeLastOption = () => {
        if (options.length > 1) {
            const newOptions = options.slice(0, -1);
            setOptions(newOptions);
            saveToLocalStorage("radioTabGroup_options", newOptions);
        }
    };

    return (
        <Article id="page-card">
            <Row horizontalPadding="huge" marginTop="medium" marginBottom="tiny">
                <Portion>
                    <Heading1 marginBottom="micro">Radio tab group</Heading1>
                    <Text size="large" marginBottom="small">
                        A radio group but styled in a linear box
                    </Text>
                </Portion>

                <Portion>
                    
                    <ul>
                        <li>Each option takes the width of the longest option</li>
                    </ul>
                </Portion>
            </Row>

            <Divider kind="primary" horizontalMargin="huge" verticalMargin="small" />

            {/* //////////////////////////////////////////////////////////////////////////////////////////////////// */}
            {/*  CONFIGURATOR */}
            {/* //////////////////////////////////////////////////////////////////////////////////////////////////// */}
            <Row horizontalPadding="small" className="rendered-component">
                {/* DEMO COMPONENT ///////////////////////////////////////////////////////////////////////////////// */}
                <Portion id="component-wrapper">
                    <Element
                        as="div" padding="small" shape="rounded" bgColour="slate-light80"
                        data-centered-children
                    >
                        <RadioTabGroup
                            id="interactive-component"
                            label={label}
                            name={name}
                            options={options}
                            value={selectedTabValue}
                            onChange={(value) => setSelectedTabValue(value)}
                        />
                    </Element>
                </Portion>

                {/* CONFIGURATOR /////////////////////////////////////////////////////////////////////////////////// */}
                <Portion desktopSpan="half">
                    <Form>
                        <Card padding="micro" shape="rounded">
                            <Header verticallyCentreItems pushItemsToEnds marginBottom="micro">
                                <Text size="large" weight="700" textColour="white">
                                    Configure props
                                </Text>
                            </Header>

                            <Row marginBottom="none">
                                <Portion>
                                    <CodeBlock withSyntaxHighlighting language="jsx" showCopyButton>
                                        {[
                                            `// Paste this in your content file`,
                                            `<RadioTabGroup`,
                                            label ? `    label="${label}"` : null,
                                            name ? `    name="${name}"` : null,
                                            `    options={[`,
                                            ...options.map(opt =>
                                                `        { id: "${opt.id}", value: "${opt.value}", label: "${opt.label}" },`,
                                            ),
                                            `    ]}`,
                                            `/>`,
                                        ].filter(Boolean).join("\n")}
                                    </CodeBlock>
                                </Portion>

                                {/* GROUP LABEL ==================================================================== */}
                                <Portion desktopSpan="half">
                                    <InputField
                                        type="text"
                                        label="Group label"
                                        placeholder="Enter group label"
                                        value={label}
                                        onChange={(value) => setLabel(value)}
                                    />
                                </Portion>

                                {/* GROUP NAME ===================================================================== */}
                                <Portion desktopSpan="half">
                                    <InputField
                                        type="text"
                                        label="Group name"
                                        placeholder="Enter group name"
                                        value={name}
                                        onChange={handleNameChange}
                                    />
                                </Portion>

                                {/* OPTIONS ======================================================================== */}
                                <Portion>
                                    {options.map((option, index) => (
                                        <Row key={index}>
                                            <Portion desktopSpan="one-third">
                                                <InputField
                                                    type="text"
                                                    label={`Option ${index + 1} ID`}
                                                    placeholder="Enter ID"
                                                    value={option.id}
                                                    onChange={(value) => handleOptionChange(index, "id", value)}
                                                />
                                            </Portion>

                                            <Portion desktopSpan="one-third">
                                                <InputField
                                                    type="text"
                                                    label={`Option ${index + 1} label`}
                                                    placeholder="Enter label"
                                                    value={option.label}
                                                    onChange={(value) => handleOptionChange(index, "label", value)}
                                                />
                                            </Portion>

                                            <Portion desktopSpan="one-third">
                                                <InputField
                                                    type="text"
                                                    label={`Option ${index + 1} value`}
                                                    placeholder="Enter value"
                                                    value={option.value}
                                                    onChange={(value) => handleOptionChange(index, "value", value)}
                                                />
                                            </Portion>
                                        </Row>
                                    ))}
                                </Portion>

                                {/* ADD/REMOVE OPTIONS BUTTONS ===================================================== */}
                                <Portion>
                                    <Button
                                        type="button"
                                        kind="tertiary"
                                        size="small"
                                        onClick={addOption}
                                        disabled={options.length >= 12}
                                        marginRight="micro"
                                    >
                                        Add option
                                    </Button>

                                    <Button
                                        type="button"
                                        kind="tertiary"
                                        size="small"
                                        onClick={removeLastOption}
                                        disabled={options.length <= 1}
                                    >
                                        Remove last option
                                    </Button>
                                </Portion>
                            </Row>
                        </Card>
                    </Form>
                </Portion>

                {/* GLOBAL THEME /////////////////////////////////////////////////////////////////////////////////// */}
                <Portion desktopSpan="half">
                    <Card padding="micro" shape="rounded">
                        <Form>
                            <Header verticallyCentreItems pushItemsToEnds marginBottom="micro">
                                <Text size="large" weight="700" textColour="white">
                                    Set global theme values
                                </Text>
                            </Header>

                            <Row marginBottom="none">
                                <Portion>
                                    <CodeBlock
                                        withSyntaxHighlighting
                                        source={cssVariablesList}
                                        language="css"
                                        showCopyButton
                                        marginBottom="micro"
                                    />
                                </Portion>

                                {/* HEIGHT ============================================================================= */}
                                <Portion desktopSpan="half">
                                    <Range
                                        label="Height"
                                        value={componentVariables["radio-tabs-height"].value}
                                        onChange={(value) => handleVariableChange("radio-tabs-height", value)}
                                        min={0} max={100} step={1}
                                        suffix={componentVariables["radio-tabs-height"].unit}
                                    />
                                </Portion>

                                {/* VERTICAL GAP ====================================================================== */}
                                <Portion desktopSpan="half">
                                    <Range
                                        label="Vertical gap"
                                        value={componentVariables["radio-tabs-vertical-gap"].value}
                                        onChange={(value) => handleVariableChange("radio-tabs-vertical-gap", value)}
                                        min={0} max={50} step={1}
                                        suffix={componentVariables["radio-tabs-vertical-gap"].unit}
                                    />
                                </Portion>

                                {/* BACKGROUND COLOUR ================================================================= */}
                                <Portion desktopSpan="half">
                                    <Select
                                        label="Background colour"
                                        options={[{
                                            label    : "Select a colour",
                                            value    : "select-a-colour",
                                            disabled : true,
                                            selected : true,
                                        }, ...colourOptions]}
                                        defaultValue={componentVariables["radio-tabs-bg"].defaultValue || "select-a-colour"}
                                        onChange={(value) => handleVariableChange("radio-tabs-bg", value)}
                                        isFullWidth
                                    />
                                </Portion>

                                {/* BORDER COLOUR ==================================================================== */}
                                <Portion desktopSpan="half">
                                    <Select
                                        label="Border colour"
                                        options={[{
                                            label    : "Select a colour",
                                            value    : "select-a-colour",
                                            disabled : true,
                                            selected : true,
                                        }, ...colourOptions]}
                                        defaultValue={componentVariables["radio-tabs-border"].defaultValue || "select-a-colour"}
                                        onChange={(value) => handleVariableChange("radio-tabs-border", value)}
                                        isFullWidth
                                    />
                                </Portion>

                                {/* LABEL TEXT DEFAULT COLOUR ======================================================== */}
                                <Portion desktopSpan="half">
                                    <Select
                                        label="Default label text colour"
                                        options={[{
                                            label    : "Select a colour",
                                            value    : "select-a-colour",
                                            disabled : true,
                                            selected : true,
                                        }, ...colourOptions]}
                                        defaultValue={componentVariables["radio-tabs-label-text-default"].defaultValue || "select-a-colour"}
                                        onChange={(value) => handleVariableChange("radio-tabs-label-text-default", value)}
                                        isFullWidth
                                    />
                                </Portion>

                                {/* LABEL TEXT HOVER COLOUR ========================================================= */}
                                <Portion desktopSpan="half">
                                    <Select
                                        label="Hover label text colour"
                                        options={[{
                                            label    : "Select a colour",
                                            value    : "select-a-colour",
                                            disabled : true,
                                            selected : true,
                                        }, ...colourOptions]}
                                        defaultValue={componentVariables["radio-tabs-label-text-hover"].defaultValue || "select-a-colour"}
                                        onChange={(value) => handleVariableChange("radio-tabs-label-text-hover", value)}
                                        isFullWidth
                                    />
                                </Portion>

                                {/* LABEL BACKGROUND HOVER COLOUR =================================================== */}
                                <Portion desktopSpan="half">
                                    <Select
                                        label="Hover label background"
                                        options={[{
                                            label    : "Select a colour",
                                            value    : "select-a-colour",
                                            disabled : true,
                                            selected : true,
                                        }, ...colourOptions]}
                                        defaultValue={componentVariables["radio-tabs-label-bg-hover"].defaultValue || "select-a-colour"}
                                        onChange={(value) => handleVariableChange("radio-tabs-label-bg-hover", value)}
                                        isFullWidth
                                    />
                                </Portion>

                                {/* LABEL BACKGROUND ACTIVE COLOUR ================================================== */}
                                <Portion desktopSpan="half">
                                    <Select
                                        label="Active label background"
                                        options={[{
                                            label    : "Select a colour",
                                            value    : "select-a-colour",
                                            disabled : true,
                                            selected : true,
                                        }, ...colourOptions]}
                                        defaultValue={componentVariables["radio-tabs-label-bg-active"].defaultValue || "select-a-colour"}
                                        onChange={(value) => handleVariableChange("radio-tabs-label-bg-active", value)}
                                        isFullWidth
                                    />
                                </Portion>

                                {/* LABEL TEXT ACTIVE COLOUR ======================================================= */}
                                <Portion desktopSpan="half">
                                    <Select
                                        label="Active label text colour"
                                        options={[{
                                            label    : "Select a colour",
                                            value    : "select-a-colour",
                                            disabled : true,
                                            selected : true,
                                        }, ...colourOptions]}
                                        defaultValue={componentVariables["radio-tabs-label-text-active"].defaultValue || "select-a-colour"}
                                        onChange={(value) => handleVariableChange("radio-tabs-label-text-active", value)}
                                        isFullWidth
                                    />
                                </Portion>

                                {/* LABEL FOCUS BORDER COLOUR ====================================================== */}
                                <Portion desktopSpan="half">
                                    <Select
                                        label="Focus border colour"
                                        options={[{
                                            label    : "Select a colour",
                                            value    : "select-a-colour",
                                            disabled : true,
                                            selected : true,
                                        }, ...colourOptions]}
                                        defaultValue={componentVariables["radio-tabs-label-focus-border"].defaultValue || "select-a-colour"}
                                        onChange={(value) => handleVariableChange("radio-tabs-label-focus-border", value)}
                                        isFullWidth
                                    />
                                </Portion>
                            </Row>
                        </Form>
                    </Card>
                </Portion>
            </Row>
        </Article>
    );
};

export default RadioTabGroupDocs;
