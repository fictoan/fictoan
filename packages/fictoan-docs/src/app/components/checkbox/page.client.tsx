"use client";

// REACT CORE ==========================================================================================================
import React, { useState, useMemo } from "react";

// UI ==================================================================================================================
import {
    Div, Heading6, Text, Divider, Checkbox, CheckboxGroup,
    Card, Form, Header, Row, Portion, Range, Select, CodeBlock,
} from "fictoan-react";

// LOCAL COMPONENTS ====================================================================================================
import { ComponentDocsLayout } from "../ComponentDocsLayout";
import { CheckboxConfigurator } from "./CheckboxConfigurator";
import { checkboxRegistry } from "./props.registry";

// UTILS ===============================================================================================================
import { useThemeVariables } from "$utils/useThemeVariables";

// STYLES ==============================================================================================================
import "../../../styles/fictoan-theme.css";
import "./page-checkbox.css";

// OTHER ===============================================================================================================
import { checkboxProps } from "./config";
import { colourOptions } from "../../colour/colours";

const CheckboxDocs = () => {
    const { componentVariables, handleVariableChange, cssVariablesList } = useThemeVariables(checkboxProps.variables);

    const [ props, setProps ] = useState<{ [key : string] : any }>({});
    const [ showGroup, setShowGroup ] = useState(false);
    const [ groupValue, setGroupValue ] = useState<string[]>([]);

    // Create group options with memoization
    const groupOptions = useMemo(() => [
        {
            id       : "option1",
            value    : "option1",
            label    : "Option 1",
            disabled : props.disabled || false,
        },
        { id : "option2", value : "option2", label : "Option 2" },
        { id : "option3", value : "option3", label : "Option 3" },
    ], [ props.disabled ]);

    // Update group value when defaultChecked changes
    React.useEffect(() => {
        if (showGroup) {
            setGroupValue(props.defaultChecked ? ["option1"] : []);
        }
    }, [ props.defaultChecked, showGroup ]);


    return (
        <ComponentDocsLayout>
            {/* INTRO HEADER /////////////////////////////////////////////////////////////////////////////////////// */}
            <Div id="intro-header">
                <Heading6 id="component-name">
                    Checkbox
                </Heading6>

                <Text
                    id="component-description"
                    weight="400"
                >
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
                    For a single on/off toggle, consider using the <a href="/components/switch">Switch</a> component instead.
                </Text>
            </Div>

            {/* DEMO COMPONENT ///////////////////////////////////////////////////////////////////////////////////// */}
            <Div id="demo-component">
                {showGroup ? (
                    <CheckboxGroup
                        name="checkbox-group"
                        options={groupOptions}
                        value={groupValue}
                        onChange={(values) => setGroupValue(values)}
                        align="horizontal"
                    />
                ) : (
                    <Checkbox
                        key={`checkbox-${props.defaultChecked}-${props.disabled}`}
                        {...props}
                    />
                )}
            </Div>

            {/* PROPS CONFIG /////////////////////////////////////////////////////////////////////////////////////// */}
            <Div id="props-config">
                <CheckboxConfigurator
                    registry={checkboxRegistry}
                    onPropsChange={setProps}
                    onGroupToggle={setShowGroup}
                />
            </Div>

            {/* THEME CONFIG /////////////////////////////////////////////////////////////////////////////////////// */}
            <Div id="theme-config">
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
                                        onChange={(value) => handleVariableChange(
                                            "checkbox-square-border-radius",
                                            value)}
                                        suffix={componentVariables["checkbox-square-border-radius"].unit}
                                        min={0} max={10} step={1}
                                    />
                                </Portion>

                                {/* BG DEFAULT ===================================================================== */}
                                <Portion desktopSpan="half">
                                    <Select
                                        label="Tick"
                                        options={[ {
                                            label    : "Select a colour",
                                            value    : "select-a-colour",
                                            disabled : true,
                                            selected : true,
                                        }, ...colourOptions ]}
                                        defaultValue={componentVariables["checkbox-tick"].defaultValue || "select-a-colour"}
                                        onChange={(value) => handleVariableChange("checkbox-tick", value)}
                                        isFullWidth
                                    />
                                </Portion>

                                {/* BG DEFAULT ===================================================================== */}
                                <Portion desktopSpan="half">
                                    <Select
                                        label="Square — default"
                                        options={[ {
                                            label    : "Select a colour",
                                            value    : "select-a-colour",
                                            disabled : true,
                                            selected : true,
                                        }, ...colourOptions ]}
                                        defaultValue={componentVariables["checkbox-square-bg-default"].defaultValue || "select-a-colour"}
                                        onChange={(value) => handleVariableChange("checkbox-square-bg-default", value)}
                                        isFullWidth
                                    />
                                </Portion>

                                {/* BG HOVER ======================================================================= */}
                                <Portion desktopSpan="half">
                                    <Select
                                        label="Square — hover"
                                        options={[ {
                                            label    : "Select a colour",
                                            value    : "select-a-colour",
                                            disabled : true,
                                            selected : true,
                                        }, ...colourOptions ]}
                                        defaultValue={componentVariables["checkbox-square-bg-hover"].defaultValue || "select-a-colour"}
                                        onChange={(value) => handleVariableChange("checkbox-square-bg-hover", value)}
                                        isFullWidth
                                    />
                                </Portion>

                                {/* BG CHECKED ===================================================================== */}
                                <Portion desktopSpan="half">
                                    <Select
                                        label="Square — checked"
                                        options={[ {
                                            label    : "Select a colour",
                                            value    : "select-a-colour",
                                            disabled : true,
                                            selected : true,
                                        }, ...colourOptions ]}
                                        defaultValue={componentVariables["checkbox-square-bg-checked"].defaultValue || "select-a-colour"}
                                        onChange={(value) => handleVariableChange("checkbox-square-bg-checked", value)}
                                        isFullWidth
                                    />
                                </Portion>

                                {/* BG DISABLED ==================================================================== */}
                                <Portion desktopSpan="half">
                                    <Select
                                        label="Square — disabled"
                                        options={[ {
                                            label    : "Select a colour",
                                            value    : "select-a-colour",
                                            disabled : true,
                                            selected : true,
                                        }, ...colourOptions ]}
                                        defaultValue={componentVariables["checkbox-square-bg-disabled"].defaultValue || "select-a-colour"}
                                        onChange={(value) => handleVariableChange("checkbox-square-bg-disabled", value)}
                                        isFullWidth
                                    />
                                </Portion>
                            </Row>
                        </Form>
                    </Card>
            </Div>
        </ComponentDocsLayout>
    );
};

export default CheckboxDocs;
