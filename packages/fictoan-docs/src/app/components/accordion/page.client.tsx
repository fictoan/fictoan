"use client";

// REACT CORE ==========================================================================================================
import React from "react";

// UI ==================================================================================================================
import { Div, Heading6, Text, Divider, Accordion } from "fictoan-react";

// LOCAL COMPONENTS ====================================================================================================
import { PropsConfigurator } from "$components/PropsConfigurator/PropsConfigurator";
import { ComponentDocsLayout } from "../ComponentDocsLayout";

// UTILS ===============================================================================================================
import { createThemeConfigurator } from "$utils/themeConfigurator";

// STYLES ==============================================================================================================
import "../../../styles/fictoan-theme.css";
import "./page-accordion.css";

const AccordionDocs = () => {
    const [ props, setProps ] = React.useState<{ [key: string]: any }>({});

    const AccordionComponent = (varName : string) : boolean => {
        return varName.startsWith("accordion-");
    };

    const {
        interactiveElementRef,
        componentProps : themeConfig,
        themeConfigurator,
    } = createThemeConfigurator("Accordion", AccordionComponent);

    return (
        <ComponentDocsLayout>
            {/* INTRO HEADER /////////////////////////////////////////////////////////////////////////////////////// */}
            <Div id="intro-header">
                <Heading6 id="component-name">
                    Accordion
                </Heading6>

                <Text
                    id="component-description"
                    weight="400"
                >
                    A simple click to expand/collapse block element.
                </Text>
            </Div>

            {/* INTRO NOTES //////////////////////////////////////////////////////////////////////////////////////// */}
            <Div id="intro-notes">
                <Divider kind="tertiary" verticalMargin="micro" />

                <Text>
                    The <code>summary</code> accepts any React node as a child. Feel free to style it
                    however you want with any element.
                </Text>

                <Text>
                    The component is typically used with the <code>isFullWidth</code> prop.
                </Text>
            </Div>

            {/* DEMO COMPONENT ///////////////////////////////////////////////////////////////////////////////////// */}
            <Div id="demo-component">
                <Accordion
                    ref={interactiveElementRef}
                    summary={props.summary || "Click to expand"}
                    {...themeConfig}
                    {...props}
                >
                    {props.children || "Accordion content goes here"}
                </Accordion>
            </Div>

            {/* PROPS CONFIG /////////////////////////////////////////////////////////////////////////////////////// */}
            <Div id="props-config">
                <PropsConfigurator componentName="Accordion" onPropsChange={setProps} />
            </Div>

            {/* THEME CONFIG /////////////////////////////////////////////////////////////////////////////////////// */}
            <Div id="theme-config">
                {themeConfigurator()}
            </Div>
        </ComponentDocsLayout>
    );
};

export default AccordionDocs;