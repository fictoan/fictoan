"use client";

// REACT CORE ==========================================================================================================
import React from "react";

// UI ==================================================================================================================
import { Div, Heading6, Text, Divider, Callout } from "fictoan-react";

// LOCAL COMPONENTS ====================================================================================================
import { PropsConfiguratorNew } from "$components/PropsConfigurator/PropsConfiguratorNew";
import { ComponentDocsLayout } from "../ComponentDocsLayout";
import { calloutRegistry } from "./props.registry";

// UTILS ===============================================================================================================
import { createThemeConfigurator } from "$utils/themeConfigurator";

// STYLES ==============================================================================================================
import "../../../styles/fictoan-theme.css";
import "./page-callout.css";

const CalloutDocs = () => {
    const [ props, setProps ] = React.useState<{ [key: string]: any }>({});

    const CalloutComponent = (varName : string) => {
        return varName.startsWith("callout-");
    };

    const {
        interactiveElementRef,
        componentProps : themeConfig,
        themeConfigurator,
    } = createThemeConfigurator("Callout", CalloutComponent);

    return (
        <ComponentDocsLayout>
            {/* INTRO HEADER /////////////////////////////////////////////////////////////////////////////////////// */}
            <Div id="intro-header">
                <Heading6 id="component-name">
                    Callout
                </Heading6>

                <Text
                    id="component-description"
                    weight="400"
                >
                    A box that can be used to highlight important information. It comes in four variants.
                </Text>
            </Div>

            {/* INTRO NOTES //////////////////////////////////////////////////////////////////////////////////////// */}
            <Div id="intro-notes">
                <Divider kind="tertiary" verticalMargin="micro" />

                <Text>
                    Accepts any React node as a child.
                </Text>

                <Text>
                    Use the <code>kind</code> prop to set the variant: info, success, warning, or error.
                </Text>
            </Div>

            {/* DEMO COMPONENT ///////////////////////////////////////////////////////////////////////////////////// */}
            <Div id="demo-component">
                <Callout
                    ref={interactiveElementRef}
                    {...props}
                    {...themeConfig}
                >
                    {props.children || "Content goes here"}
                </Callout>
            </Div>

            {/* PROPS CONFIG /////////////////////////////////////////////////////////////////////////////////////// */}
            <Div id="props-config">
                <PropsConfiguratorNew registry={calloutRegistry} onPropsChange={setProps} />
            </Div>

            {/* THEME CONFIG /////////////////////////////////////////////////////////////////////////////////////// */}
            <Div id="theme-config">
                {themeConfigurator()}
            </Div>
        </ComponentDocsLayout>
    );
};

export default CalloutDocs;
