"use client";

// EXTERNAL DEPS =======================================================================================================
import React, { useState } from "react";

// INTERNAL DEPS =======================================================================================================
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
CodeBlock
} from "fictoan-react";

// COMPONENTS ==========================================================================================================

// STYLES ==============================================================================================================
import "./page-checkbox.css";

// HOOKS ===============================================================================================================
import { useThemeVariables } from "../../../utils/useThemeVariables";

// UTILS ===============================================================================================================
import { colourOptions } from "../../colour/colours";

// DATA ================================================================================================================
import { checkboxProps } from "./config";

const CheckboxDocs = () => {
    const { componentVariables, handleVariableChange, cssVariablesList } = useThemeVariables(checkboxProps.variables);

    // SAMPLE ==========================================================================================================

    // CUSTOMISE =======================================================================================================
    const [isSwitch, setIsSwitch] = useState(false);
    const [defaultChecked, setDefaultChecked] = useState(false);
    const [defaultDisabled, setDefaultDisabled] = useState(false);

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
                            The Checkbox and the Switch are the exact same underneath, the only difference is how they look
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
                        {isSwitch ? (
                            <Switch
                                key={`switch-${defaultChecked}`}
                                id="switch-1"
                                value="switch-1"
                                name="switch-1"
                                label="Check me"
                                defaultChecked={defaultChecked}
                                disabled={defaultDisabled}
                            />
                        ) : (
                            <Checkbox
                                key={`checkbox-${defaultChecked}`}
                                id="checkbox-1"
                                value="checkbox-1"
                                name="checkbox-1"
                                label="Check me"
                                defaultChecked={defaultChecked}
                                disabled={defaultDisabled}
                            />
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
                                    <CodeBlock withSyntaxHighlighting language="jsx" showCopyButton marginBottom="micro">
                                        {[
                                            `// Paste this in your content file`,
                                            isSwitch ? `<Switch` : `<Checkbox`,
                                            `    id="${isSwitch ? "switch-1" : "checkbox-1"}"`,
                                            `    value="${isSwitch ? "switch-1" : "checkbox-1"}"`,
                                            `    name="${isSwitch ? "switch-1" : "checkbox-1"}"`,
                                            `    label="Check me"`,
                                            defaultChecked ? `   defaultChecked` : null,
                                            defaultDisabled ? `   disabled` : null,
                                            `/>`,
                                        ].filter(Boolean).join("\n")}
                                    </CodeBlock>
                                </Portion>

                                {/* POSITION ======================================================================= */}
                                <Portion>
                                    {isSwitch ?
                                        <Switch
                                            id="checkbox-switch-switcher"
                                            value="checkbox-switch-switcher"
                                            name="checkbox-switch-switcher"
                                            label="Make it a switch"
                                            checked={isSwitch}
                                            onChange={() => setIsSwitch(!isSwitch)}
                                        />
                                        :
                                        <Checkbox
                                            id="checkbox-switch-switcher"
                                            value="checkbox-switch-switcher"
                                            name="checkbox-switch-switcher"
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
                                        value="checkbox-default-checked"
                                        name="checkbox-default-checked"
                                        label="Checked by default"
                                        onChange={() => setDefaultChecked(!defaultChecked)}
                                    />

                                    <Divider kind="secondary" horizontalMargin="none" marginTop="micro" />
                                </Portion>

                                {/* DISABLED ======================================================================= */}
                                <Portion>
                                    <Checkbox
                                        id="checkbox-default-disabled"
                                        value="checkbox-default-disabled"
                                        name="checkbox-default-disabled"
                                        label="Disabled"
                                        onChange={() => setDefaultDisabled(!defaultDisabled)}
                                    />
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
