"use client";

// REACT CORE ==========================================================================================================
import React from "react";

// UI ==================================================================================================================
import { Div, Heading6, Text, Divider, InputField } from "fictoan-react";

// LOCAL COMPONENTS ====================================================================================================
import { PropsConfigurator } from "$components/PropsConfigurator/PropsConfigurator";
import { ComponentDocsLayout } from "../ComponentDocsLayout";

// UTILS ===============================================================================================================
import { createThemeConfigurator } from "$utils/themeConfigurator";

// STYLES ==============================================================================================================
import "../../../styles/fictoan-theme.css";
import "./input-field.css";

const InputFieldDocs = () => {
    const [props, setProps] = React.useState<{ [key: string]: any }>({});

    const InputFieldComponent = (varName: string) => {
        return varName.startsWith("input-");
    };

    const {
        interactiveElementRef,
        componentProps: themeConfig,
        themeConfigurator,
    } = createThemeConfigurator("InputField", InputFieldComponent);

    return (
        <ComponentDocsLayout>
            {/* INTRO HEADER /////////////////////////////////////////////////////////////////////////////////////// */}
            <Div id="intro-header">
                <Heading6 id="component-name">
                    Input field
                </Heading6>

                <Text
                    id="component-description"
                    weight="400"
                >
                    A text box to enter information
                </Text>
            </Div>

            {/* INTRO NOTES //////////////////////////////////////////////////////////////////////////////////////// */}
            <Div id="intro-notes">
                <Divider kind="tertiary" verticalMargin="micro" />

                <Text>
                    The input field also forms the styling base for Select, Textarea etc.
                </Text>
            </Div>

            {/* DEMO COMPONENT ///////////////////////////////////////////////////////////////////////////////////// */}
            <Div id="demo-component">
                <InputField
                    ref={interactiveElementRef}
                    label={props.label || "Label"}
                    {...themeConfig}
                    {...props}
                />
            </Div>

            {/* PROPS CONFIG /////////////////////////////////////////////////////////////////////////////////////// */}
            <Div id="props-config">
                <PropsConfigurator componentName="InputField" onPropsChange={setProps} />
            </Div>

            {/* THEME CONFIG /////////////////////////////////////////////////////////////////////////////////////// */}
            <Div id="theme-config">
                {themeConfigurator()}
            </Div>
        </ComponentDocsLayout>
    );
};

export default InputFieldDocs;
