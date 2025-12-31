"use client";

// REACT CORE ==========================================================================================================
import React, { useState, useMemo } from "react";

// UI ==================================================================================================================
import {
    Div, Heading6, Text, Divider, Switch, SwitchGroup,
    Card, Form, Header, Row, Portion, Select, CodeBlock,
} from "fictoan-react";

// LOCAL COMPONENTS ====================================================================================================
import { ComponentDocsLayout } from "../ComponentDocsLayout";
import { SwitchConfigurator } from "./SwitchConfigurator";
import { switchRegistry } from "./props.registry";

// UTILS ===============================================================================================================
import { useThemeVariables } from "$utils/useThemeVariables";

// STYLES ==============================================================================================================
import "../../../styles/fictoan-theme.css";
import "./page-switch.css";

// OTHER ===============================================================================================================
import { switchProps } from "./config";
import { colourOptions } from "../../colour/colours";

const SwitchDocs = () => {
    const { componentVariables, handleVariableChange, cssVariablesList } = useThemeVariables(switchProps.variables);

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
                    Switch
                </Heading6>

                <Text
                    id="component-description"
                    weight="400"
                >
                    A toggle component for on/off states
                </Text>
            </Div>

            {/* INTRO NOTES //////////////////////////////////////////////////////////////////////////////////////// */}
            <Div id="intro-notes">
                <Divider kind="tertiary" verticalMargin="micro" />

                <Text>
                    Use switches for settings that take effect immediately, like toggling features on or off.
                </Text>

                <Text>
                    For selecting multiple items from a list, consider using the <a href="/components/checkbox">Checkbox</a> component instead.
                </Text>
            </Div>

            {/* DEMO COMPONENT ///////////////////////////////////////////////////////////////////////////////////// */}
            <Div id="demo-component">
                {showGroup ? (
                    <SwitchGroup
                        name="switch-group"
                        options={groupOptions}
                        value={groupValue}
                        onChange={(values) => setGroupValue(values)}
                        align="horizontal"
                    />
                ) : (
                    <Switch
                        key={`switch-${props.defaultChecked}-${props.disabled}`}
                        {...props}
                    />
                )}
            </Div>

            {/* PROPS CONFIG /////////////////////////////////////////////////////////////////////////////////////// */}
            <Div id="props-config">
                <SwitchConfigurator
                    registry={switchRegistry}
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

                            {/* SWITCH ///////////////////////////////////////////////////////////////////////////// */}
                            <Row marginBottom="none">
                                <Portion>
                                    <Text weight="700" size="large">Switch</Text>
                                </Portion>

                                {/* BG DEFAULT ===================================================================== */}
                                <Portion desktopSpan="half">
                                    <Select
                                        label="Switch — default"
                                        options={[ {
                                            label    : "Select a colour",
                                            value    : "select-a-colour",
                                            disabled : true,
                                            selected : true,
                                        }, ...colourOptions ]}
                                        defaultValue={componentVariables["switch-bg-default"].defaultValue || "select-a-colour"}
                                        onChange={(value) => handleVariableChange("switch-bg-default", value)}
                                        isFullWidth
                                    />
                                </Portion>

                                {/* BG DEFAULT ===================================================================== */}
                                <Portion desktopSpan="half">
                                    <Select
                                        label="Slider — default"
                                        options={[ {
                                            label    : "Select a colour",
                                            value    : "select-a-colour",
                                            disabled : true,
                                            selected : true,
                                        }, ...colourOptions ]}
                                        defaultValue={componentVariables["switch-slider-bg-default"].defaultValue || "select-a-colour"}
                                        onChange={(value) => handleVariableChange("switch-slider-bg-default", value)}
                                        isFullWidth
                                    />
                                </Portion>

                                {/* BG HOVER ======================================================================= */}
                                <Portion desktopSpan="half">
                                    <Select
                                        label="Switch — hover"
                                        options={[ {
                                            label    : "Select a colour",
                                            value    : "select-a-colour",
                                            disabled : true,
                                            selected : true,
                                        }, ...colourOptions ]}
                                        defaultValue={componentVariables["switch-bg-hover"].defaultValue || "select-a-colour"}
                                        onChange={(value) => handleVariableChange("switch-bg-hover", value)}
                                        isFullWidth
                                    />
                                </Portion>

                                {/* BG HOVER ======================================================================= */}
                                <Portion desktopSpan="half">
                                    <Select
                                        label="Slider — hover"
                                        options={[ {
                                            label    : "Select a colour",
                                            value    : "select-a-colour",
                                            disabled : true,
                                            selected : true,
                                        }, ...colourOptions ]}
                                        defaultValue={componentVariables["switch-slider-bg-hover"].defaultValue || "select-a-colour"}
                                        onChange={(value) => handleVariableChange("switch-slider-bg-hover", value)}
                                        isFullWidth
                                    />
                                </Portion>

                                {/* BG CHECKED ===================================================================== */}
                                <Portion desktopSpan="half">
                                    <Select
                                        label="Switch — checked"
                                        options={[ {
                                            label    : "Select a colour",
                                            value    : "select-a-colour",
                                            disabled : true,
                                            selected : true,
                                        }, ...colourOptions ]}
                                        defaultValue={componentVariables["switch-bg-checked"].defaultValue || "select-a-colour"}
                                        onChange={(value) => handleVariableChange("switch-bg-checked", value)}
                                        isFullWidth
                                    />
                                </Portion>

                                {/* BG CHECKED ===================================================================== */}
                                <Portion desktopSpan="half">
                                    <Select
                                        label="Slider — checked"
                                        options={[ {
                                            label    : "Select a colour",
                                            value    : "select-a-colour",
                                            disabled : true,
                                            selected : true,
                                        }, ...colourOptions ]}
                                        defaultValue={componentVariables["switch-slider-bg-checked"].defaultValue || "select-a-colour"}
                                        onChange={(value) => handleVariableChange("switch-slider-bg-checked", value)}
                                        isFullWidth
                                    />
                                </Portion>

                                {/* BG DISABLED ==================================================================== */}
                                <Portion desktopSpan="half">
                                    <Select
                                        label="Switch — disabled"
                                        options={[ {
                                            label    : "Select a colour",
                                            value    : "select-a-colour",
                                            disabled : true,
                                            selected : true,
                                        }, ...colourOptions ]}
                                        defaultValue={componentVariables["switch-bg-disabled"].defaultValue || "select-a-colour"}
                                        onChange={(value) => handleVariableChange("switch-bg-disabled", value)}
                                        isFullWidth
                                    />
                                </Portion>

                                {/* BG DISABLED ==================================================================== */}
                                <Portion desktopSpan="half">
                                    <Select
                                        label="Slider — disabled"
                                        options={[ {
                                            label    : "Select a colour",
                                            value    : "select-a-colour",
                                            disabled : true,
                                            selected : true,
                                        }, ...colourOptions ]}
                                        defaultValue={componentVariables["switch-slider-bg-disabled"].defaultValue || "select-a-colour"}
                                        onChange={(value) => handleVariableChange("switch-slider-bg-disabled", value)}
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

export default SwitchDocs;
