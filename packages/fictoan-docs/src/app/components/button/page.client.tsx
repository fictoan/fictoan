"use client";

// REACT CORE ==========================================================================================================
import React, { useState } from "react";

// UI ==================================================================================================================
import { Element, Heading1, Heading4, Divider, Portion, Row, Text, Article, Card, Form, Header, Select, Button, Range, CodeBlock, Heading6 } from "fictoan-react";

// UTILS ===============================================================================================================
import { createPropsConfigurator } from "$utils/propsConfigurator";
import { createThemeConfigurator } from "$utils/themeConfigurator";

// STYLES ==============================================================================================================
import "./page-button.css";

// OTHER ===============================================================================================================
import { colourOptions } from "../../colour/colours";

const ButtonDocs = () => {
    // PROPS CONFIGURATOR ///////////////////////////////////////////////////////////////////////////////////////////////
    const {
        propsConfigurator,
        componentProps : propsConfig,
    } = createPropsConfigurator(
        "Button", [
            "strings", "kind", "size", "shape", "shadow", "bgColour", "textColour", "borderColour", "isLoading",
        ],
        colourOptions,
        {
            isSelfClosing   : false,
            canHaveChildren : true,
            // @ts-ignore
            defaultChildren : "Button",
        },
    );

    // THEME CONFIGURATOR //////////////////////////////////////////////////////////////////////////////////////////////
    const ButtonComponent = (varName : string) => {
        return varName.startsWith("button-");
    };

    const {
        interactiveElementRef,
        componentProps : themeConfig,
        themeConfigurator,
    } = createThemeConfigurator("Button", ButtonComponent);

    return (
        <Article id="page-component">
            <Row horizontalPadding="huge" marginTop="medium">
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

            <Divider kind="primary" horizontalMargin="huge" verticalMargin="small" />

            {/* //////////////////////////////////////////////////////////////////////////////////////////////////// */}
            {/*  CONFIGURATOR */}
            {/* //////////////////////////////////////////////////////////////////////////////////////////////////// */}
            <Row horizontalPadding="small" className="rendered-component">
                {/* DEMO COMPONENT ///////////////////////////////////////////////////////////////////////////////// */}
                <Portion id="component-wrapper">
                    <Element
                        as="div" padding="small" shape="rounded" bgColour="slate-light80"
                        data-centered-children
                    >
                        <Button
                            ref={interactiveElementRef}
                            {...propsConfig}
                            {...themeConfig}
                        >
                            {propsConfig.content}
                        </Button>
                    </Element>
                </Portion>

                {/* CONFIGURATOR /////////////////////////////////////////////////////////////////////////////////// */}
                <Portion desktopSpan="half">
                    {propsConfigurator()}
                </Portion>

                {/* THEME CONFIGURATOR //////////////////////////////////////////////////////////////////////////// */}
                <Portion desktopSpan="half">
                    {themeConfigurator()}
                </Portion>
            </Row>
        </Article>
    );
};

export default ButtonDocs;
