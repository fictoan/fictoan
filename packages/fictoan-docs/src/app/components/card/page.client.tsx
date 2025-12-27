"use client";

// REACT CORE ==========================================================================================================
import React from "react";

// UI ==================================================================================================================
import { Div, Heading6, Text, Divider, Card } from "fictoan-react";

// LOCAL COMPONENTS ====================================================================================================
import { PropsConfiguratorNew } from "$components/PropsConfigurator/PropsConfiguratorNew";
import { ComponentDocsLayout } from "../ComponentDocsLayout";
import { cardRegistry } from "./props.registry";

// UTILS ===============================================================================================================
import { createThemeConfigurator } from "$utils/themeConfigurator";

// STYLES ==============================================================================================================
import "../../../styles/fictoan-theme.css";
import "./page-card.css";

const CardDocs = () => {
    const [ props, setProps ] = React.useState<{ [key: string]: any }>({});

    const CardComponent = (varName : string) => {
        return varName.startsWith("card-");
    };

    const {
        interactiveElementRef,
        componentProps : themeConfig,
        themeConfigurator,
    } = createThemeConfigurator("Card", CardComponent);

    return (
        <ComponentDocsLayout>
            {/* INTRO HEADER /////////////////////////////////////////////////////////////////////////////////////// */}
            <Div id="intro-header">
                <Heading6 id="component-name">
                    Card
                </Heading6>

                <Text
                    id="component-description"
                    weight="400"
                >
                    A box to put all sorts of content inside
                </Text>
            </Div>

            {/* INTRO NOTES //////////////////////////////////////////////////////////////////////////////////////// */}
            <Div id="intro-notes">
                <Divider kind="tertiary" verticalMargin="micro" />

                <Text>
                    Accepts any React node as a child.
                </Text>

                <Text>
                    The card always takes up 100% width of its parent and grows to the height of its content.
                </Text>

                <Text>
                    Border-radius values work only when <code>shape="rounded"</code> is present.
                </Text>
            </Div>

            {/* DEMO COMPONENT ///////////////////////////////////////////////////////////////////////////////////// */}
            <Div id="demo-component">
                <Card
                    ref={interactiveElementRef}
                    {...props}
                    {...themeConfig}
                >
                    {props.children || "Content shows up here"}
                </Card>
            </Div>

            {/* PROPS CONFIG /////////////////////////////////////////////////////////////////////////////////////// */}
            <Div id="props-config">
                <PropsConfiguratorNew registry={cardRegistry} onPropsChange={setProps} />
            </Div>

            {/* THEME CONFIG /////////////////////////////////////////////////////////////////////////////////////// */}
            <Div id="theme-config">
                {themeConfigurator()}
            </Div>
        </ComponentDocsLayout>
    );
};

export default CardDocs;
