"use client";

// REACT CORE ==========================================================================================================
import React from "react";

// UI ==================================================================================================================
import { Button, ButtonGroup, Heading6, Div, Text, Divider } from "fictoan-react";

// LOCAL COMPONENTS ====================================================================================================
import { PropsConfiguratorNew } from "$components/PropsConfigurator/PropsConfiguratorNew";

// UTILS ===============================================================================================================
import { createThemeConfigurator } from "$utils/themeConfigurator";

// STYLES ==============================================================================================================
import "../../../styles/fictoan-theme.css";
import "./page-button-group.css";

// OTHER ===============================================================================================================
import { ComponentDocsLayout } from "../ComponentDocsLayout";
import { buttonGroupRegistry } from "./props.registry";

const ButtonGroupDocs = () => {
    const [ props, setProps ] = React.useState<{ [key: string]: any }>({});

    const ButtonGroupComponent = (varName : string) => {
        return varName.startsWith("button-group-");
    };

    const {
        interactiveElementRef,
        componentProps : themeConfig,
        themeConfigurator,
    } = createThemeConfigurator("ButtonGroup", ButtonGroupComponent);

    return (
        <ComponentDocsLayout>
            {/* INTRO HEADER /////////////////////////////////////////////////////////////////////////////////////// */}
            <Div id="intro-header">
                <Heading6 id="component-name">
                    ButtonGroup
                </Heading6>

                <Text
                    id="component-description"
                    weight="400"
                >
                    A wrapper to group multiple buttons together with seamless borders
                </Text>
            </Div>

            {/* INTRO NOTES //////////////////////////////////////////////////////////////////////////////////////// */}
            <Div id="intro-notes">
                <Divider kind="tertiary" verticalMargin="micro" />

                <Text>
                    By default, buttons are joined with no gap and the inner border-radii are flattened. Only the
                    outermost buttons retain their border-radius. Use <code>isJoint=false</code> to add spacing
                    between buttons.
                </Text>
            </Div>

            {/* DEMO COMPONENT ///////////////////////////////////////////////////////////////////////////////////// */}
            <Div id="demo-component">
                <ButtonGroup
                    ref={interactiveElementRef}
                    {...props}
                    {...themeConfig}
                >
                    <Button kind="tertiary">Left</Button>
                    <Button kind="tertiary">Middle with long text</Button>
                    <Button kind="tertiary">Right</Button>
                </ButtonGroup>
            </Div>

            {/* PROPS CONFIG /////////////////////////////////////////////////////////////////////////////////////// */}
            <Div id="props-config">
                <PropsConfiguratorNew registry={buttonGroupRegistry} onPropsChange={setProps} />
            </Div>

            {/* THEME CONFIG /////////////////////////////////////////////////////////////////////////////////////// */}
            <Div id="theme-config">
                {themeConfigurator()}
            </Div>
        </ComponentDocsLayout>
    );
};

export default ButtonGroupDocs;
