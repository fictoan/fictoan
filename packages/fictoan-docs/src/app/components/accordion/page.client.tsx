"use client";

// REACT CORE ==========================================================================================================
import React from "react";

// UI ==================================================================================================================
import { Article, Section, Div, Heading1, Heading4, Divider, Row, Portion, Text, Accordion } from "fictoan-react";

// UTILS ===============================================================================================================
import { createPropsConfigurator } from "$utils/propsConfigurator";
import { createThemeConfigurator } from "$utils/themeConfigurator";

// STYLES ==============================================================================================================
import "$styles/fictoan-theme.css";
import "./page-accordion.css";

// OTHER ===============================================================================================================
import { colourOptions } from "../../colour/colours";

const AccordionDocs : React.FC = () => {
    const {
        propsConfigurator,
        componentProps : propsConfig,
    } = createPropsConfigurator(
        "Accordion", [
            "summary",
            "isFullWidth",
        ],
        colourOptions,
        {
            canHaveChildren : true,
            isSelfClosing   : false,
            defaultChildren : null,
        },
    );

    const AccordionComponent = (varName : string) : boolean => {
        return varName.startsWith("accordion-");
    };

    const {
        interactiveElementRef,
        componentProps : themeConfig,
        themeConfigurator,
    } = createThemeConfigurator("Accordion", AccordionComponent);

    return (
        <Article id="page-toast">
            {/*  INTRO ///////////////////////////////////////////////////////////////////////////////////////////// */}
            <Section>
                <Row horizontalPadding="huge" marginTop="medium" marginBottom="small">
                    <Portion>
                        <Heading1>Accordion</Heading1>
                        <Text size="large" marginBottom="small">
                            A simple click to expand/collapse block element.
                        </Text>
                    </Portion>

                    <Portion>
                        <Heading4 marginBottom="micro">Characteristics</Heading4>
                        <ul>
                            <li>
                                The <code>summary</code> accepts any React node as a child. Feel free to style it
                                however
                                you want with any element.
                            </li>
                            <li>The component is typically used with the <code>isFullWidth</code> prop</li>
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
                            <Accordion
                                ref={interactiveElementRef}
                                {...propsConfig}
                                {...themeConfig}
                                summary={<Text>Click me</Text>}
                            >
                                <Text>Accordion content</Text>
                                {propsConfig.content}
                            </Accordion>
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

export default AccordionDocs;