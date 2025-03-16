"use client";

// FRAMEWORK ===========================================================================================================
import React, { useState, useEffect, useMemo } from "react";

// FICTOAN =============================================================================================================
import {
    Element,
    Heading1,
    Heading2,
    Heading3,
    Heading4,
    Heading5,
    Heading6,
    Divider,
    Portion,
    Row,
    Text,
    Article,
    Card,
    Form,
    Header,
    RadioTabGroup,
    Select,
    ToastItem,
    ToastsWrapper,
    Button,
    Range, Checkbox, Switch,
    CodeBlock,
    CheckboxGroup,
    SwitchGroup,
} from "fictoan-react";

// STYLES ==============================================================================================================
import "./page-checkbox.css";

// OTHER ===============================================================================================================
import { checkboxProps } from "./config";
import { colourOptions } from "../../colour/colours";
import { useThemeVariables } from "../../../utils/useThemeVariables";

const CheckboxDocs = () => {
    const { componentVariables, handleVariableChange, cssVariablesList } = useThemeVariables(checkboxProps.variables);

    // SAMPLE ==========================================================================================================

    // CUSTOMISE =======================================================================================================
    const [isSwitch, setIsSwitch] = useState(false);
    const [defaultChecked, setDefaultChecked] = useState(false);
    const [defaultDisabled, setDefaultDisabled] = useState(false);
    const [showGroup, setShowGroup] = useState(false);
    const [groupValue, setGroupValue] = useState([]);
    const [currentlyShown, setCurrentlyShown] = useState(isSwitch ? "switch" : "checkbox");

    // Create group options with memoization to update when dependencies change
    const groupOptions = useMemo(() => [
        {
            id             : "option1",
            value          : "option1",
            label          : "Option 1",
            defaultChecked : defaultChecked,
            disabled       : defaultDisabled,
        },
        { id : "option2", value : "option2", label : "Option 2" },
        { id : "option3", value : "option3", label : "Option 3" },
    ], [defaultChecked, defaultDisabled]);

    // Update currentlyShown whenever isSwitch changes
    useEffect(() => {
        setCurrentlyShown(isSwitch ? "switch" : "checkbox");
    }, [isSwitch]);

    // THEME ===========================================================================================================


    return (
        <Article id="page-component">
            <Row horizontalPadding="huge" marginTop="medium" marginBottom="small">
                <Portion>
                    <Heading1>Checkbox / Switch</Heading1>
                    <Text size="large" marginBottom="small">
                        A click-to-toggle component to make a choice
                    </Text>
                </Portion>

                <Portion>
                    <Heading4 marginBottom="micro">Characteristics</Heading4>
                    <ul>
                        <li>
                            The Checkbox and the Switch are the exact same underneath, the only difference is how they
                            look
                        </li>
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
                        {showGroup ? (
                            isSwitch ? (
                                <SwitchGroup
                                    name="switch-group"
                                    options={groupOptions}
                                    value={groupValue}
                                    onChange={(values) => setGroupValue(values)}
                                />
                            ) : (
                                <CheckboxGroup
                                    name="checkbox-group"
                                    options={groupOptions}
                                    value={groupValue}
                                    onChange={(values) => setGroupValue(values)}
                                />
                            )
                        ) : (
                            isSwitch ? (
                                <Switch
                                    key={`switch-${defaultChecked}`}
                                    id="switch-1"
                                    label="Check me"
                                    defaultChecked={defaultChecked}
                                    disabled={defaultDisabled}
                                />
                            ) : (
                                <Checkbox
                                    key={`checkbox-${defaultChecked}`}
                                    id="checkbox-1"
                                    label="Check me"
                                    defaultChecked={defaultChecked}
                                    disabled={defaultDisabled}
                                />
                            )
                        )}
                    </Element>
                </Portion>

                {/* CONFIGURATOR /////////////////////////////////////////////////////////////////////////////////// */}
                <Portion desktopSpan="half">
                    <Form spacing="none">
                        <Card padding="micro" shape="rounded">
                            <Header verticallyCentreItems pushItemsToEnds marginBottom="micro">
                                <Text size="large" weight="700" textColour="white">
                                    Configure props
                                </Text>
                            </Header>

                            <Row marginBottom="none">
                                <Portion>
                                    <CodeBlock
                                        withSyntaxHighlighting language="jsx" showCopyButton
                                        marginBottom="micro"
                                    >
                                        {showGroup ? (
                                            [
                                                `// Paste this in your content file`,
                                                isSwitch ? `<SwitchGroup` : `<CheckboxGroup`,
                                                `    name="${isSwitch ? "switch-group" : "checkbox-group"}"`,
                                                `    options={[`,
                                                `        { `,
                                                `            id: "option1", `,
                                                `            value: "option1", `,
                                                `            label: "Option 1",`,
                                                defaultChecked ? `            defaultChecked,` : null,
                                                defaultDisabled ? `            disabled,` : null,
                                                `        },`,
                                                `        { id: "option2", value: "option2", label: "Option 2" },`,
                                                `        { id: "option3", value: "option3", label: "Option 3" },`,
                                                `    ]}`,
                                                `    value={${JSON.stringify(groupValue)}}`,
                                                `    onChange={(values) => setGroupValue(values)}`,
                                                `/>`,
                                            ].filter(Boolean).join("\n")
                                        ) : (
                                            [
                                                `// Paste this in your content file`,
                                                isSwitch ? `<Switch` : `<Checkbox`,
                                                `    id="${isSwitch ? "switch-1" : "checkbox-1"}"`,
                                                `    value="${isSwitch ? "switch-1" : "checkbox-1"}"`,
                                                `    name="${isSwitch ? "switch-1" : "checkbox-1"}"`,
                                                `    label="Check me"`,
                                                defaultChecked ? `    defaultChecked` : null,
                                                defaultDisabled ? `    disabled` : null,
                                                `/>`,
                                            ].filter(Boolean).join("\n")
                                        )}
                                    </CodeBlock>
                                </Portion>

                                {/* POSITION ======================================================================= */}
                                <Portion>
                                    {isSwitch ?
                                        <Switch
                                            id="checkbox-switch-switcher"
                                            label="Make it a switch"
                                            checked={isSwitch}
                                            onChange={() => setIsSwitch(!isSwitch)}
                                        />
                                        :
                                        <Checkbox
                                            id="checkbox-switch-switcher"
                                            label="Make it a switch"
                                            onChange={() => setIsSwitch(!isSwitch)}
                                        />
                                    }

                                    <Divider kind="secondary" horizontalMargin="none" marginTop="micro" />
                                </Portion>

                                {/* CHECKED ======================================================================== */}
                                <Portion>
                                    <Checkbox
                                        id="checkbox-default-checked"
                                        label={showGroup ? "First item checked by default" : "Checked by default"}
                                        onChange={() => setDefaultChecked(!defaultChecked)}
                                    />

                                    <Divider kind="secondary" horizontalMargin="none" marginTop="micro" />
                                </Portion>

                                {/* DISABLED ======================================================================= */}
                                <Portion>
                                    <Checkbox
                                        id="checkbox-default-disabled"
                                        label={showGroup ? "First item disabled" : "Disabled"}
                                        onChange={() => setDefaultDisabled(!defaultDisabled)}
                                    />

                                    <Divider kind="secondary" horizontalMargin="none" marginTop="micro" />
                                </Portion>

                                {/* GROUP ========================================================================= */}
                                <Portion>
                                    <Button
                                        id="create-group-button"
                                        type="button" size="small"
                                        kind="secondary"
                                        onClick={() => {
                                            setShowGroup(!showGroup);
                                            if (!showGroup) {
                                                setGroupValue([]);
                                            }
                                        }}
                                    >
                                        {showGroup ? `Show single ${currentlyShown}` : `Create a ${currentlyShown} group`}
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
                            <Header verticallyCentreItems pushItemsToEnds>
                                <Text size="large" weight="700" textColour="white" marginBottom="nano">
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
                            </Row>

                            {/* CHECKBOX /////////////////////////////////////////////////////////////////////////// */}
                            <Row marginBottom="none">
                                <Portion>
                                    <Text weight="700" size="large">Checkbox</Text>
                                </Portion>

                                {/* BORDER RADIUS ================================================================== */}
                                <Portion desktopSpan="half">
                                    <Range
                                        label="Border radius"
                                        value={componentVariables["checkbox-square-border-radius"].value}
                                        onChange={(value) => handleVariableChange("checkbox-square-border-radius", value)}
                                        suffix={componentVariables["checkbox-square-border-radius"].unit}
                                        min={0} max={10} step={1}
                                    />
                                </Portion>

                                {/* BG DEFAULT ===================================================================== */}
                                <Portion desktopSpan="half">
                                    <Select
                                        label="Tick"
                                        options={[{
                                            label    : "Select a colour",
                                            value    : "select-a-colour",
                                            disabled : true,
                                            selected : true,
                                        }, ...colourOptions]}
                                        defaultValue={componentVariables["checkbox-tick"].defaultValue || "select-a-colour"}
                                        onChange={(value) => handleVariableChange("checkbox-tick", value)}
                                        isFullWidth
                                    />
                                </Portion>

                                {/* BG DEFAULT ===================================================================== */}
                                <Portion desktopSpan="half">
                                    <Select
                                        label="Square — default"
                                        options={[{
                                            label    : "Select a colour",
                                            value    : "select-a-colour",
                                            disabled : true,
                                            selected : true,
                                        }, ...colourOptions]}
                                        defaultValue={componentVariables["checkbox-square-bg-default"].defaultValue || "select-a-colour"}
                                        onChange={(value) => handleVariableChange("checkbox-square-bg-default", value)}
                                        isFullWidth
                                    />
                                </Portion>

                                {/* BG HOVER ======================================================================= */}
                                <Portion desktopSpan="half">
                                    <Select
                                        label="Square — hover"
                                        options={[{
                                            label    : "Select a colour",
                                            value    : "select-a-colour",
                                            disabled : true,
                                            selected : true,
                                        }, ...colourOptions]}
                                        defaultValue={componentVariables["checkbox-square-bg-hover"].defaultValue || "select-a-colour"}
                                        onChange={(value) => handleVariableChange("checkbox-square-bg-hover", value)}
                                        isFullWidth
                                    />
                                </Portion>

                                {/* BG CHECKED ===================================================================== */}
                                <Portion desktopSpan="half">
                                    <Select
                                        label="Square — checked"
                                        options={[{
                                            label    : "Select a colour",
                                            value    : "select-a-colour",
                                            disabled : true,
                                            selected : true,
                                        }, ...colourOptions]}
                                        defaultValue={componentVariables["checkbox-square-bg-checked"].defaultValue || "select-a-colour"}
                                        onChange={(value) => handleVariableChange("checkbox-square-bg-checked", value)}
                                        isFullWidth
                                    />
                                </Portion>

                                {/* BG DISABLED ==================================================================== */}
                                <Portion desktopSpan="half">
                                    <Select
                                        label="Square — disabled"
                                        options={[{
                                            label    : "Select a colour",
                                            value    : "select-a-colour",
                                            disabled : true,
                                            selected : true,
                                        }, ...colourOptions]}
                                        defaultValue={componentVariables["checkbox-square-bg-disabled"].defaultValue || "select-a-colour"}
                                        onChange={(value) => handleVariableChange("checkbox-square-bg-disabled", value)}
                                        isFullWidth
                                    />
                                </Portion>
                            </Row>

                            <Divider kind="secondary" verticalMargin="micro" />

                            {/* SWITCH ///////////////////////////////////////////////////////////////////////////// */}
                            <Row marginBottom="none">
                                <Portion>
                                    <Text weight="700" size="large">Switch</Text>
                                </Portion>

                                {/* BG DEFAULT ===================================================================== */}
                                <Portion desktopSpan="half">
                                    <Select
                                        label="Switch — default"
                                        options={[{
                                            label    : "Select a colour",
                                            value    : "select-a-colour",
                                            disabled : true,
                                            selected : true,
                                        }, ...colourOptions]}
                                        defaultValue={componentVariables["switch-bg-default"].defaultValue || "select-a-colour"}
                                        onChange={(value) => handleVariableChange("switch-bg-default", value)}
                                        isFullWidth
                                    />
                                </Portion>

                                {/* BG DEFAULT ===================================================================== */}
                                <Portion desktopSpan="half">
                                    <Select
                                        label="Slider — default"
                                        options={[{
                                            label    : "Select a colour",
                                            value    : "select-a-colour",
                                            disabled : true,
                                            selected : true,
                                        }, ...colourOptions]}
                                        defaultValue={componentVariables["switch-slider-bg-default"].defaultValue || "select-a-colour"}
                                        onChange={(value) => handleVariableChange("switch-slider-bg-default", value)}
                                        isFullWidth
                                    />
                                </Portion>

                                {/* BG HOVER ======================================================================= */}
                                <Portion desktopSpan="half">
                                    <Select
                                        label="Switch — hover"
                                        options={[{
                                            label    : "Select a colour",
                                            value    : "select-a-colour",
                                            disabled : true,
                                            selected : true,
                                        }, ...colourOptions]}
                                        defaultValue={componentVariables["switch-bg-hover"].defaultValue || "select-a-colour"}
                                        onChange={(value) => handleVariableChange("switch-bg-hover", value)}
                                        isFullWidth
                                    />
                                </Portion>

                                {/* BG HOVER ======================================================================= */}
                                <Portion desktopSpan="half">
                                    <Select
                                        label="Slider — hover"
                                        options={[{
                                            label    : "Select a colour",
                                            value    : "select-a-colour",
                                            disabled : true,
                                            selected : true,
                                        }, ...colourOptions]}
                                        defaultValue={componentVariables["switch-slider-bg-hover"].defaultValue || "select-a-colour"}
                                        onChange={(value) => handleVariableChange("switch-slider-bg-hover", value)}
                                        isFullWidth
                                    />
                                </Portion>

                                {/* BG CHECKED ===================================================================== */}
                                <Portion desktopSpan="half">
                                    <Select
                                        label="Switch — checked"
                                        options={[{
                                            label    : "Select a colour",
                                            value    : "select-a-colour",
                                            disabled : true,
                                            selected : true,
                                        }, ...colourOptions]}
                                        defaultValue={componentVariables["switch-bg-checked"].defaultValue || "select-a-colour"}
                                        onChange={(value) => handleVariableChange("switch-bg-checked", value)}
                                        isFullWidth
                                    />
                                </Portion>

                                {/* BG CHECKED ===================================================================== */}
                                <Portion desktopSpan="half">
                                    <Select
                                        label="Slider — checked"
                                        options={[{
                                            label    : "Select a colour",
                                            value    : "select-a-colour",
                                            disabled : true,
                                            selected : true,
                                        }, ...colourOptions]}
                                        defaultValue={componentVariables["switch-slider-bg-checked"].defaultValue || "select-a-colour"}
                                        onChange={(value) => handleVariableChange("switch-slider-bg-checked", value)}
                                        isFullWidth
                                    />
                                </Portion>

                                {/* BG DISABLED ==================================================================== */}
                                <Portion desktopSpan="half">
                                    <Select
                                        label="Switch — disabled"
                                        options={[{
                                            label    : "Select a colour",
                                            value    : "select-a-colour",
                                            disabled : true,
                                            selected : true,
                                        }, ...colourOptions]}
                                        defaultValue={componentVariables["switch-bg-disabled"].defaultValue || "select-a-colour"}
                                        onChange={(value) => handleVariableChange("switch-bg-disabled", value)}
                                        isFullWidth
                                    />
                                </Portion>

                                {/* BG DISABLED ==================================================================== */}
                                <Portion desktopSpan="half">
                                    <Select
                                        label="Slider — disabled"
                                        options={[{
                                            label    : "Select a colour",
                                            value    : "select-a-colour",
                                            disabled : true,
                                            selected : true,
                                        }, ...colourOptions]}
                                        defaultValue={componentVariables["switch-slider-bg-disabled"].defaultValue || "select-a-colour"}
                                        onChange={(value) => handleVariableChange("switch-slider-bg-disabled", value)}
                                        isFullWidth
                                    />
                                </Portion>
                            </Row>

                            <Divider kind="secondary" verticalMargin="micro" />
                        </Form>
                    </Card>
                </Portion>
            </Row>
        </Article>
    );
};

export default CheckboxDocs;
