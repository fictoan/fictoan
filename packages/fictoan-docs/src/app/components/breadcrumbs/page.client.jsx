"use client";

// FRAMEWORK ===========================================================================================================
import Link from "next/link";
import React, { useEffect, useState } from "react";

// FICTOAN =============================================================================================================
import {
    Element,
    Heading1,
    Heading4,
    Divider,
    Portion,
    Row,
    Text,
    Article,
    Badge,
    Breadcrumbs,
    Div,
    Section,
} from "fictoan-react";

// STYLES ==============================================================================================================
import "./page-breadcrumbs.css";
import "../../../styles/fictoan-theme.css";

// OTHER ===============================================================================================================
import { colourOptions } from "../../colour/colours";
import { createPropsConfigurator } from "../../../utils/propsConfigurator";
import { createThemeConfigurator } from "../../../utils/themeConfigurator";

const BreadcrumbsDocs = () => {
    const [showCurrentPageMessage, setShowCurrentPageMessage] = useState(false);

    // PROPS CONFIGURATOR //////////////////////////////////////////////////////////////////////////////////////////////
    const {
        propsConfigurator,
        componentProps : propsConfig,
    } = createPropsConfigurator(
        "Breadcrumbs",
        ["separator", "spacing"],
        colourOptions,
        {
            isSelfClosing   : false,
            canHaveChildren : true,
            defaultChildren : `    <Link href="/">Home</Link>
    <Link href="/components">Components</Link>
    <Link href="/components/breadcrumbs">Breadcrumbs</Link>`,
        },
    );

    useEffect(() => {
        let timer;
        if (showCurrentPageMessage) {
            timer = setTimeout(() => {
                setShowCurrentPageMessage(false);
            }, 3000);
        }

        return () => clearTimeout(timer);
    }, [showCurrentPageMessage]);

    // THEME CONFIG ====================================================================================================
    // The filter ensures we only show breadcrumb-related variables
    const BreadcrumbsComponent = (varName) => {
        return varName.startsWith("breadcrumb") || varName.startsWith("breadcrumbs");
    };

    const {
        interactiveElementRef,
        componentProps: themeConfig,
        themeConfigurator,
    } = createThemeConfigurator("Breadcrumbs", BreadcrumbsComponent);

    return (
        <Article id="page-breadcrumbs">
            <Row horizontalPadding="huge" marginTop="medium" marginBottom="small">
                <Portion>
                    <Heading1>Breadcrumbs</Heading1>
                    <Text size="large" marginBottom="small">
                        A set of links to show the current page's hierarchy
                    </Text>
                </Portion>

                <Portion>
                    <Heading4 marginBottom="micro">Characteristics</Heading4>
                    <ul>
                        <li>The BreadcrumbItem accepts React nodes</li>
                        <li>Use <code>current</code> prop to indicate active page</li>
                    </ul>
                </Portion>
            </Row>

            <Divider kind="primary" horizontalMargin="huge" verticalMargin="small" />

            {/* INTERACTIVE COMPONENT ////////////////////////////////////////////////////////////////////////////// */}
            <Section>
                {/* DEMO COMPONENT ================================================================================= */}
                <Row id="component-wrapper" horizontalPadding="small" className="rendered-component">
                    <Portion>
                        <Div padding="small" shape="rounded" bgColour="slate-light80">
                            {showCurrentPageMessage && (
                                <Badge shape="rounded" id="current-page-message">That's this page 🙂</Badge>
                            )}

                            <Breadcrumbs
                                id="interactive-component"
                                ref={interactiveElementRef}
                                {...propsConfig}
                                {...themeConfig}
                            >
                                <Link href="/">Home</Link>
                                <Link href="/components">Components</Link>
                                <Link
                                    href="/components/breadcrumbs"
                                    onClick={() => setShowCurrentPageMessage(true)}
                                >
                                    Breadcrumbs
                                </Link>
                            </Breadcrumbs>
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

export default BreadcrumbsDocs;
