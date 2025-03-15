"use client";

// EXTERNAL DEPS =======================================================================================================
import React from "react";

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
    Badge,
    Section,
} from "fictoan-react";

// STYLES ==============================================================================================================
import "./page-badge.css";
import "../../../styles/fictoan-theme.css";

// HOOKS ===============================================================================================================
import { createPropsConfigurator } from "../../../utils/propsConfigurator";
import { createThemeConfigurator } from "../../../utils/themeConfigurator";

// UTILS ===============================================================================================================
import { colourOptions } from "../../colour/colours";

const BadgeDocs = () => {
    // PROPS CONFIG ====================================================================================================
    const {
        propsConfigurator,
        componentProps: propsConfig,
    } = createPropsConfigurator(
        "Badge", [
            "strings",
            "size",
            "shape",
            "bgColour",
            "borderColour",
            "textColour",
            "withDelete"
        ],
        colourOptions,
        {
            isSelfClosing : false,
            canHaveChildren : true,
        }
    );

    // THEME CONFIG ====================================================================================================
    const BadgeComponent = (varName) => {
        return varName.startsWith("badge-");
    };

    const {
        interactiveElementRef,
        componentProps: themeConfig,
        themeConfigurator,
    } = createThemeConfigurator("Badge", BadgeComponent);

    return (
        <Article id="page-badge">
            {/*  INTRO ///////////////////////////////////////////////////////////////////////////////////////////// */}
            <Section>
                <Row horizontalPadding="huge" marginTop="medium" marginBottom="small">
                    <Portion>
                        <Heading1>Badge</Heading1>
                        <Text size="large" marginBottom="small">
                            The badge is a small inline element that can be used to highlight a piece of information.
                        </Text>
                    </Portion>

                    <Portion>
                        <Heading4 marginBottom="micro">Characteristics</Heading4>
                        <ul>
                            <li>You have to manually align the Badge with its sibling</li>
                            <li>Default size is <code>medium</code></li>
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
                            <Badge
                                id="interactive-component"
                                ref={interactiveElementRef}
                                {...propsConfig}
                                {...themeConfig}
                            >
                                {propsConfig.content}
                            </Badge>
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

export default BadgeDocs;
