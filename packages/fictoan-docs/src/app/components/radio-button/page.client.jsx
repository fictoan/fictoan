"use client";

// EXTERNAL DEPS =======================================================================================================
import React, { useEffect, useState } from "react";

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
    Select,
    Range, Checkbox, Switch, RadioButton,
    CodeBlock, RadioGroup,
} from "fictoan-react";

// COMPONENTS ==========================================================================================================

// STYLES ==============================================================================================================
import "./page-radio-button.css";

// HOOKS ===============================================================================================================
import { useThemeVariables } from "../../../utils/useThemeVariables";

// UTILS ===============================================================================================================
import { colourOptions } from "../../colour/colours";

// DATA ================================================================================================================
import { radioButtonProps } from "./config";

const RadioButtonDocs = () => {

    // SAMPLE ==========================================================================================================

    // CUSTOMISE =======================================================================================================
    const [defaultChecked, setDefaultChecked] = useState("yes");
    const [userSelectedRadio, setUserSelectedRadio] = useState("");
    const [isDisabled, setIsDisabled] = useState({ yes: false, no: false, maybe: false });

    // THEME ===========================================================================================================
    const { componentVariables, handleVariableChange, cssVariablesList } = useThemeVariables(radioButtonProps.variables);

    const handleDefaultCheckedChange = (checked) => {
        setDefaultChecked(checked);
    };

    const handleRadioChange = (value) => {
        setUserSelectedRadio(value);
    };

    const handleDisableChange = (value) => {
        const id = value.split("-").pop(); // Extract yes/no/maybe from the ID
        setIsDisabled((prev) => ({ ...prev, [id]: !prev[id] }));
    };

    const isChecked = (value) => {
        if (userSelectedRadio) {
            return userSelectedRadio === value;
        }
        return defaultChecked === value;
    };

    // THEME ===========================================================================================================


    return (
        <Article id="page-component">
            <Row horizontalPadding="huge" marginTop="medium" marginBottom="small">
                <Portion>
                    <Heading1>Radio button</Heading1>
                    <Text size="large" marginBottom="small">
                        An input to select one of many options
                    </Text>
                </Portion>

                <Portion>
                    <Heading4 marginBottom="micro">Characteristics</Heading4>
                    <Text>&bull; </Text>
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
                        <RadioGroup
                            id="radio-1"
                            name="demo-group"
                            value={userSelectedRadio || defaultChecked} // Use controlled value
                            options={[
                                { id: "radio-1", value: "yes", label: "Yes", disabled: isDisabled.yes },
                                { id: "radio-2", value: "no", label: "No", disabled: isDisabled.no },
                                { id: "radio-3", value: "maybe", label: "Maybe", disabled: isDisabled.maybe },
                            ]}
                            onChange={handleRadioChange}
                        />
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
                                            `<RadioButton`,
                                            `    id="checkbox-1"`,
                                            `    value="checkbox-1"`,
                                            `    name="checkbox-group"`,
                                            `    label="Yes"`,
                                            defaultChecked === "yes" ? `   defaultChecked` : null,
                                            isDisabled.yes ? `   disabled` : null,
                                            `/> \n`,
                                            `<RadioButton`,
                                            `    id="checkbox-2"`,
                                            `    value="checkbox-2"`,
                                            `    name="checkbox-group"`,
                                            `    label="No"`,
                                            defaultChecked === "no" ? `   defaultChecked` : null,
                                            isDisabled.no ? `   disabled` : null,
                                            `/> \n`,
                                            `<RadioButton`,
                                            `    id="checkbox-3"`,
                                            `    value="checkbox-3"`,
                                            `    name="checkbox-group"`,
                                            `    label="Maybe"`,
                                            defaultChecked === "maybe" ? `   defaultChecked` : null,
                                            isDisabled.maybe ? `   disabled` : null,
                                            `/> \n`,
                                        ].filter(Boolean).join("\n")}
                                    </CodeBlock>
                                </Portion>

                                {/* CHECKED ======================================================================== */}
                                <Portion>
                                    <RadioButton
                                        id="control-radio-yes"
                                        name="control-group"
                                        value="yes"
                                        label="Check 'Yes' by default"
                                        checked={defaultChecked === "yes"}
                                        onChange={handleDefaultCheckedChange}
                                    />
                                    <RadioButton
                                        id="control-radio-no"
                                        name="control-group"
                                        value="no"
                                        label="Check 'No' by default"
                                        checked={defaultChecked === "no"}
                                        onChange={handleDefaultCheckedChange}
                                    />
                                    <RadioButton
                                        id="control-radio-maybe"
                                        name="control-group"
                                        value="maybe"
                                        label="Check 'Maybe' by default"
                                        checked={defaultChecked === "maybe"}
                                        onChange={handleDefaultCheckedChange}
                                    />
                                    <RadioButton
                                        id="control-radio-none"
                                        name="control-group"
                                        value="none"
                                        label="Check none"
                                        checked={defaultChecked === "none"}
                                        onChange={handleDefaultCheckedChange}
                                    />

                                    <Divider kind="secondary" horizontalMargin="none" marginTop="micro" />
                                </Portion>

                                {/* DISABLED ======================================================================= */}
                                <Portion>
                                    <Checkbox
                                        id="checkbox-disable-first"
                                        value="checkbox-disable-yes"
                                        name="checkbox-disable"
                                        label="Disable 'Yes'"
                                        checked={isDisabled.yes}
                                        onChange={() => handleDisableChange("checkbox-disable-yes")}
                                    />

                                    <Checkbox
                                        id="checkbox-disable-second"
                                        value="checkbox-disable-no"
                                        name="checkbox-disable"
                                        label="Disable 'No'"
                                        checked={isDisabled.no}
                                        onChange={() => handleDisableChange("checkbox-disable-no")}
                                    />

                                    <Checkbox
                                        id="checkbox-disable-third"
                                        value="checkbox-disable-maybe"
                                        name="checkbox-disable"
                                        label="Disable 'Maybe'"
                                        checked={isDisabled.maybe}
                                        onChange={() => handleDisableChange("checkbox-disable-maybe")}
                                    />

                                    <Divider kind="secondary" horizontalMargin="none" marginTop="micro" />
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
                                {/* BG DEFAULT ===================================================================== */}
                                <Portion desktopSpan="half">
                                    <Select
                                        label="Circle — default"
                                        options={[{
                                            label    : "Select a colour",
                                            value    : "select-a-colour",
                                            disabled : true,
                                            selected : true,
                                        }, ...colourOptions]}
                                        defaultValue={componentVariables["radio-circle-bg-default"].defaultValue || "select-a-colour"}
                                        onChange={(value) => handleVariableChange("radio-circle-bg-default", value)}
                                        isFullWidth
                                    />
                                </Portion>

                                {/* BG HOVER ======================================================================= */}
                                <Portion desktopSpan="half">
                                    <Select
                                        label="Circle — hover"
                                        options={[{
                                            label    : "Select a colour",
                                            value    : "select-a-colour",
                                            disabled : true,
                                            selected : true,
                                        }, ...colourOptions]}
                                        defaultValue={componentVariables["radio-circle-bg-hover"].defaultValue || "select-a-colour"}
                                        onChange={(value) => handleVariableChange("radio-circle-bg-hover", value)}
                                        isFullWidth
                                    />
                                </Portion>

                                {/* BG CHECKED ===================================================================== */}
                                <Portion desktopSpan="half">
                                    <Select
                                        label="Circle — checked"
                                        options={[{
                                            label    : "Select a colour",
                                            value    : "select-a-colour",
                                            disabled : true,
                                            selected : true,
                                        }, ...colourOptions]}
                                        defaultValue={componentVariables["radio-circle-bg-checked"].defaultValue || "select-a-colour"}
                                        onChange={(value) => handleVariableChange("radio-circle-bg-checked", value)}
                                        isFullWidth
                                    />
                                </Portion>

                                {/* BG DISABLED ==================================================================== */}
                                <Portion desktopSpan="half">
                                    <Select
                                        label="Circle — disabled"
                                        options={[{
                                            label    : "Select a colour",
                                            value    : "select-a-colour",
                                            disabled : true,
                                            selected : true,
                                        }, ...colourOptions]}
                                        defaultValue={componentVariables["radio-circle-bg-disabled"].defaultValue || "select-a-colour"}
                                        onChange={(value) => handleVariableChange("radio-circle-bg-disabled", value)}
                                        isFullWidth
                                    />
                                </Portion>

                                {/* BG DISABLED ==================================================================== */}
                                <Portion desktopSpan="half">
                                    <Select
                                        label="Dot"
                                        options={[{
                                            label    : "Select a colour",
                                            value    : "select-a-colour",
                                            disabled : true,
                                            selected : true,
                                        }, ...colourOptions]}
                                        defaultValue={componentVariables["radio-button-dot"].defaultValue || "select-a-colour"}
                                        onChange={(value) => handleVariableChange("radio-button-dot", value)}
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

export default RadioButtonDocs;
