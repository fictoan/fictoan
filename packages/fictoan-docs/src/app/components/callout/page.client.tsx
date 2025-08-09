"use client";

// REACT CORE ==========================================================================================================
import React, { useState } from "react";

// UI ==================================================================================================================
import { Div, Heading4, Divider, Portion, Row, Article, Callout, Section, Heading6 } from "fictoan-react";

// UTILS ===============================================================================================================
import { createThemeConfigurator } from "$utils/themeConfigurator";

// STYLES ==============================================================================================================
import "../../../styles/fictoan-theme.css";
import "./page-callout.css";

// OTHER ===============================================================================================================
import { PropsConfigurator } from "$components/PropsConfigurator/PropsConfigurator";

const CalloutDocs = () => {
    const [ props, setProps ] = React.useState<{ [key: string]: any }>({});

    const CalloutComponent = (varName: string) => {
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
                        <Heading4 id="component-name">
                            Callout
                        </Heading4>

                        <Heading6
                            id="component-description"
                            weight="400" marginBottom="small"
                        >
                            A box that can be used to highlight important information. It comes in four
                            variants.
                        </Heading6>
                    </Portion>

                    <Portion>
                        
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
                                ref={interactiveElementRef}
                                {...props}
                                {...themeConfig}
                            >
                                {props.children || "Content goes here"}
                            </Callout>
                        </Div>
                    </Portion>
                </Row>

                <Row horizontalPadding="small">
                    {/* PROPS CONFIGURATOR ========================================================================= */}
                    <Portion desktopSpan="half">
                        <PropsConfigurator componentName="Callout" onPropsChange={setProps} />
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
