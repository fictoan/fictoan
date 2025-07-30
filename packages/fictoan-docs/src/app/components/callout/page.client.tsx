"use client";

// EXTERNAL DEPS =======================================================================================================
import React, { useState } from "react";

// INTERNAL DEPS =======================================================================================================
import {
    Div,
    Heading1,
    Heading4,
    Divider,
    Portion,
    Row,
    Text,
    Article,
    Callout,
    Section,
} from "fictoan-react";

// STYLES ==============================================================================================================
import "./page-callout.css";
import "../../../styles/fictoan-theme.css";

// HOOKS ===============================================================================================================
import { createPropsConfigurator } from "../../../utils/propsConfigurator";
import { createThemeConfigurator } from "../../../utils/themeConfigurator";

// UTILS ===============================================================================================================
import { colourOptions } from "../../colour/colours";

const CalloutDocs = () => {
    // PROPS CONFIG ====================================================================================================
    const {
        propsConfigurator,
        componentProps: propsConfig,
    } = createPropsConfigurator(
        "Callout",
        [
            "kind",
        ],
        colourOptions,
        {
            canHaveChildren: true,
            isSelfClosing : false
        }
    );

    // THEME CONFIG ====================================================================================================
    const CalloutComponent = (varName) => {
        return varName.startsWith("callout-");
    };

    const {
        interactiveElementRef,
        componentProps: themeConfig,
        themeConfigurator,
    } = createThemeConfigurator("Callout", CalloutComponent);

    return (
        <Article id="page-callout">
            {/*  INTRO ///////////////////////////////////////////////////////////////////////////////////////////// */}
            <Section>
                <Row horizontalPadding="huge" marginTop="medium" marginBottom="small">
                    <Portion>
                        <Heading1>Callout</Heading1>
                        <Text size="large" marginBottom="small">
                            A box that can be used to highlight important information. It comes in four
                            variants.
                        </Text>
                    </Portion>

                    <Portion>
                        <Heading4 marginBottom="micro">Characteristics</Heading4>
                        <ul>
                            <li>Accepts any React node as a child</li>
                        </ul>
                    </Portion>
                </Row>
            </Section>

            <Divider kind="primary" horizontalMargin="huge" verticalMargin="small" />

            {/* INTERACTIVE COMPONENT ////////////////////////////////////////////////////////////////////////////// */}
            <Section>
                {/* DEMO COMPONENT ================================================================================= */}
                <Row id="component-wrapper" horizontalPadding="small" className="rendered-component">
                    <Portion>
                        <Div
                            padding="small"
                            shape="rounded"
                            bgColour="slate-light80"
                            data-centered-children
                        >
                            <Callout
                                id="interactive-component"
                                ref={interactiveElementRef}
                                {...propsConfig}
                                {...themeConfig}
                            >
                                Content goes here
                            </Callout>
                        </Div>
                    </Portion>
                </Row>

                <Row horizontalPadding="small">
                    {/* PROPS CONFIGURATOR ========================================================================= */}
                    <Portion desktopSpan="half">
                        {propsConfigurator()}
                    </Portion>

                    {/* THEME CONFIGURATOR ========================================================================= */}
                    <Portion desktopSpan="half">
                        {themeConfigurator()}
                    </Portion>
                </Row>
            </Section>
        </Article>
    );
};

export default CalloutDocs;
