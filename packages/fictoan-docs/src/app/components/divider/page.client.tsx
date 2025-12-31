"use client";

// REACT CORE ==========================================================================================================
import React from "react";

// UI ==================================================================================================================
import { Element, Heading1, Heading4, Divider, Portion, Row, Text, Article, Section, Div } from "fictoan-react";

// UTILS ===============================================================================================================
import { createThemeConfigurator } from "$utils/themeConfigurator";

// STYLES ==============================================================================================================
import "../../../styles/fictoan-theme.css";
import "./page-divider.css";

// OTHER ===============================================================================================================
import { PropsConfigurator } from "$components/PropsConfigurator/PropsConfigurator";

const DividerDocs = () => {
    const [ props, setProps ] = React.useState<{ [key: string]: any }>({});

    const DividerComponent = (varName : string) => {
        return varName.startsWith("divider-");
    };

    const {
        interactiveElementRef,
        componentProps : themeConfig,
        themeConfigurator,
    } = createThemeConfigurator("Divider", DividerComponent);

    return (
        <Article id="page-divider">
            {/*  INTRO ///////////////////////////////////////////////////////////////////////////////////////////// */}
            <Section>
                <Row horizontalPadding="huge" marginTop="medium" marginBottom="small">
                    <Portion>
                        <Heading4 id="component-name">
                            Divider
                        </Heading4>

                        <Heading4
                            id="component-description"
                            weight="400" marginBottom="small"
                        >
                            A horizontal line to separate content
                        </Heading4>
                    </Portion>

                    <Portion>
                        <ul>
                            <li>Is a self-closing element</li>
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
                            <Divider
                                ref={interactiveElementRef}
                                {...props}
                                {...themeConfig}
                            />
                        </Div>
                    </Portion>
                </Row>

                <Row horizontalPadding="small">
                    {/* PROPS CONFIGURATOR ========================================================================= */}
                    <Portion desktopSpan="half">
                        <PropsConfigurator componentName="Divider" onPropsChange={setProps} />
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

export default DividerDocs;
