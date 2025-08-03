"use client";

// REACT CORE ==========================================================================================================
import React from "react";

// UI ==================================================================================================================
import { Div, Heading4, Divider, Portion, Row, Article, Button, Section, Heading6 } from "fictoan-react";

// UTILS ===============================================================================================================
import { createThemeConfigurator } from "$utils/themeConfigurator";

// STYLES ==============================================================================================================
import "../../../styles/fictoan-theme.css";
import "./page-button.css";

// OTHER ===============================================================================================================
import { PropsConfigurator } from "$components/PropsConfigurator/PropsConfigurator";

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
        <Article id="page-button">
            {/*  INTRO ///////////////////////////////////////////////////////////////////////////////////////////// */}
            <Section>
                <Row horizontalPadding="huge" marginTop="medium" marginBottom="small">
                    <Portion>
                        <Heading4 id="component-name">
                            Button
                        </Heading4>

                        <Heading6
                            id="component-description"
                            weight="400" marginBottom="small"
                        >
                            A clickable component to trigger an action or an event
                        </Heading6>
                    </Portion>

                    <Portion>
                        <ul>
                            <li>
                                The <code>kind</code> prop accepts <code>primary / secondary / tertiary</code> and
                                also <code>custom</code>
                            </li>
                            <li>
                                For the first three &ldquo;named&rdquo; types, the background, text and border colours are
                                defined in the theme, to ensure consistency. The <code>custom</code> value lets you add them
                                manually.
                            </li>
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
                            <Button
                                ref={interactiveElementRef}
                                {...props}
                                {...themeConfig}
                            >
                                {props.children || "Button"}
                            </Button>
                        </Div>
                    </Portion>
                </Row>

                <Row horizontalPadding="small">
                    {/* PROPS CONFIGURATOR ========================================================================= */}
                    <Portion desktopSpan="half">
                        <PropsConfigurator componentName="Button" onPropsChange={setProps} />
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

export default ButtonDocs;
