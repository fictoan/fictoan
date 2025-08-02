"use client";

// REACT CORE ==========================================================================================================
import React from "react";

// UI ==================================================================================================================
import { Article, Section, Div, Heading4, Heading6, Divider, Row, Portion, Text, Accordion } from "fictoan-react";

// UTILS ===============================================================================================================
import { createThemeConfigurator } from "$utils/themeConfigurator";

// STYLES ==============================================================================================================
import "../../../styles/fictoan-theme.css";
import "./page-accordion.css";

// OTHER ===============================================================================================================
import { PropsConfigurator } from "$components/PropsConfigurator/PropsConfigurator";

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
        <Article id="page-accordion">
            {/*  INTRO ///////////////////////////////////////////////////////////////////////////////////////////// */}
            <Section>
                <Row horizontalPadding="huge" marginTop="medium" marginBottom="small">
                    <Portion>
                        <Heading4 id="component-name">
                            Accordion
                        </Heading4>

                        <Heading6
                            id="component-description"
                            weight="400" marginBottom="small"
                        >
                            A simple click to expand/collapse block element.
                        </Heading6>
                    </Portion>

                    <Portion>
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
                                {...props}
                                {...themeConfig}
                                summary={<Text>Click me</Text>}
                            >
                                {props.label || "Accordion"}
                            </Accordion>
                        </Div>
                    </Portion>
                </Row>

                <Row horizontalPadding="small">
                    {/* PROPS CONFIGURATOR ========================================================================= */}
                    <Portion desktopSpan="half">
                        <PropsConfigurator componentName="Accordion" onPropsChange={setProps} />
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