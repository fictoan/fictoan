"use client";

// REACT CORE ==========================================================================================================
import React from "react";

// UI ==================================================================================================================
import { Button, Heading6, Div, Text, Divider } from "fictoan-react";

// LOCAL COMPONENTS ====================================================================================================
import { PropsConfigurator } from "$components/PropsConfigurator/PropsConfigurator";
import { ComponentDocsLayout } from "../ComponentDocsLayout";

// UTILS ===============================================================================================================
import { createThemeConfigurator } from "$utils/themeConfigurator";

// STYLES ==============================================================================================================
import "../../../styles/fictoan-theme.css";
import "./page-button.css";

const ButtonDocs = () => {
    const [ props, setProps ] = React.useState<{ [key: string]: any }>({});

    const ButtonComponent = (varName : string) => {
        return varName.startsWith("button-");
    };

    const {
        interactiveElementRef,
        componentProps : themeConfig,
        themeConfigurator,
    } = createThemeConfigurator("Button", ButtonComponent);

    return (
        <ComponentDocsLayout>
            {/* INTRO HEADER /////////////////////////////////////////////////////////////////////////////////////// */}
            <Div id="intro-header">
                <Heading6 id="component-name">
                    Button
                </Heading6>

                <Text
                    id="component-description"
                    weight="400"
                >
                    A clickable component to trigger an action or an event
                </Text>
            </Div>

            {/* INTRO NOTES //////////////////////////////////////////////////////////////////////////////////////// */}
            <Div id="intro-notes">
                <Divider kind="tertiary" verticalMargin="micro" />

                <Text>
                    For the <code>primary / secondary / tertiary</code> kinds, the background, text and border colours are
                    defined in the theme, to ensure consistency. The <code>custom</code> value lets you add them
                    manually.
                </Text>
            </Div>

            {/* DEMO COMPONENT ///////////////////////////////////////////////////////////////////////////////////// */}
            <Div id="demo-component">
                <Button
                    ref={interactiveElementRef}
                    {...props}
                    {...themeConfig}
                >
                    {props.children || "Button"}
                </Button>
            </Div>

            {/* PROPS CONFIG /////////////////////////////////////////////////////////////////////////////////////// */}
            <Div id="props-config">
                <PropsConfigurator componentName="Button" onPropsChange={setProps} />
            </Div>

            {/* THEME CONFIG /////////////////////////////////////////////////////////////////////////////////////// */}
            <Div id="theme-config">
                {themeConfigurator()}
            </Div>
        </ComponentDocsLayout>
    );
};

export default ButtonDocs;
