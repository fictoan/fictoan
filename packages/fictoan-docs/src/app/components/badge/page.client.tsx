"use client";

// REACT CORE ==========================================================================================================
import React from "react";

// UI ==================================================================================================================
import { Div, Heading4, Divider, Portion, Row, Article, Badge, Section, Heading6 } from "fictoan-react";

// UTILS ===============================================================================================================
import { createPropsConfigurator } from "$utils/propsConfigurator";
import { createThemeConfigurator } from "$utils/themeConfigurator";

// STYLES ==============================================================================================================
import "../../../styles/fictoan-theme.css";
import "./page-badge.css";

// OTHER ===============================================================================================================
import { colourOptions } from "../../colour/colours";

const BadgeDocs = () => {
    const {
        propsConfigurator,
        componentProps : propsConfig,
    } = createPropsConfigurator(
        "Badge", [
            "strings",
            "size",
            "shape",
            "bgColour",
            "borderColour",
            "textColour",
            "withDelete",
        ],
        colourOptions,
        {
            isSelfClosing   : false,
            canHaveChildren : true,
            defaultChildren : null,
        },
    );

    const BadgeComponent = (varName : string) => {
        return varName.startsWith("badge-");
    };

    const {
        interactiveElementRef,
        componentProps : themeConfig,
        themeConfigurator,
    } = createThemeConfigurator("Badge", BadgeComponent);

    return (
        <Article id="page-badge">
            {/*  INTRO ///////////////////////////////////////////////////////////////////////////////////////////// */}
            <Section>
                <Row horizontalPadding="huge" marginTop="medium" marginBottom="small">
                    <Portion>
                        <Heading4 id="component-name">
                            Badge
                        </Heading4>

                        <Heading6
                            id="component-description"
                            weight="400" marginBottom="small"
                        >
                            A small inline element that can be used to highlight a piece of information.
                        </Heading6>
                    </Portion>

                    <Portion>
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
