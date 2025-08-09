"use client";

// REACT CORE ==========================================================================================================
import React from "react";

// UI ==================================================================================================================
import { Heading1, Heading4, Divider, Portion, Row, Text, Article, Div, Card, Section } from "fictoan-react";

// UTILS ===============================================================================================================
import { createThemeConfigurator } from "$utils/themeConfigurator";

// STYLES ==============================================================================================================
import "../../../styles/fictoan-theme.css";
import "./page-card.css";

// OTHER ===============================================================================================================
import { PropsConfigurator } from "$components/PropsConfigurator/PropsConfigurator";

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
        <Article id="page-card">
            <Section>
                <Row horizontalPadding="huge" marginTop="medium" marginBottom="tiny">
                    <Portion>
                        <Heading4 id="component-name">
                            Card
                        </Heading4>

                        <Heading4
                            id="component-description"
                            weight="400" marginBottom="small"
                        >
                            A box to put all sorts of content inside
                        </Heading4>
                    </Portion>

                    <Portion>
                        
                        <ul>
                            <li>Accepts any React node as a child</li>
                            <li>The card always takes up 100% width of its parent</li>
                            <li>It grows to take the height of its content</li>
                            <li>Border-radius values work only when <code>shape="rounded"</code> is present</li>
                        </ul>
                    </Portion>
                </Row>
            </Section>

            <Divider kind="primary" horizontalMargin="huge" verticalMargin="small" />

            {/* DEMO COMPONENT ///////////////////////////////////////////////////////////////////////////////////// */}
            <Row horizontalPadding="small" className="rendered-component">
                <Portion id="component-wrapper">
                    <Div
                        padding="small"
                        shape="rounded"
                        bgColour="slate-light80"
                        data-centered-children
                    >
                        <Card
                            ref={interactiveElementRef}
                            {...props}
                            {...themeConfig}
                        >
                            {props.children || "Content shows up here"}
                        </Card>
                    </Div>
                </Portion>
            </Row>

            <Row horizontalPadding="small">
                {/* PROPS CONFIGURATOR ///////////////////////////////////////////////////////////////////////////// */}
                <Portion desktopSpan="half">
                    <PropsConfigurator componentName="Card" onPropsChange={setProps} />
                </Portion>

                {/* THEME CONFIGURATOR ///////////////////////////////////////////////////////////////////////////// */}
                <Portion desktopSpan="half">
                    {themeConfigurator()}
                </Portion>
            </Row>
        </Article>
    );
};

export default CardDocs;
