"use client";

// EXTERNAL DEPS =======================================================================================================
import React, { useEffect, useState } from "react";
import Link from "next/link";

// INTERNAL DEPS =======================================================================================================
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
    Card,
    Form,
    Header,
    Select,
    Breadcrumbs,
    Div,
    CodeBlock,
} from "fictoan-react";

// STYLES ==============================================================================================================
import "./page-breadcrumbs.css";

// HOOKS ===============================================================================================================
import { useThemeVariables } from "../../../utils/useThemeVariables";
import { createPropsConfigurator } from "../../../utils/propsConfigurator";

// UTILS ===============================================================================================================
import { colourOptions } from "../../colour/colours";

// DATA ================================================================================================================
import { breadcrumbsProps } from "./config";


const BreadcrumbsDocs = () => {
    const [selectedBgColour, setSelectedBgColour] = useState("");
    const [showCurrentPageMessage, setShowCurrentPageMessage] = useState(false);

    // PROPS CONFIGURATOR //////////////////////////////////////////////////////////////////////////////////////////////
    const {
        propsConfigurator,
        componentProps: propsConfig,
    } = createPropsConfigurator(
        "Breadcrumbs",
        ["separator", "spacing"],
        colourOptions,
        {
            isSelfClosing: false,
            canHaveChildren: true,
            defaultChildren: `    <Link href="/">Home</Link>
    <Link href="/components">Components</Link>
    <Link href="/components/breadcrumbs">Breadcrumbs</Link>`
        }
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

    const {
        componentVariables,
        handleVariableChange,
        cssVariablesList,
    } = useThemeVariables(breadcrumbsProps.variables);

    return (
        <Article id="page-breadcrumbs">
            <Row horizontalPadding="huge" marginTop="medium" marginBottom="small">
                <Portion>
                    <Heading1>Breadcrumbs</Heading1>
                    <Text size="large" marginBottom="small">
                        A set of links to show the current page’s hierarchy
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

            {/* //////////////////////////////////////////////////////////////////////////////////////////////////// */}
            {/*  CONFIGURATOR */}
            {/* //////////////////////////////////////////////////////////////////////////////////////////////////// */}
            <Row horizontalPadding="small" className="rendered-component">
                {/* DEMO COMPONENT ///////////////////////////////////////////////////////////////////////////////// */}
                <Portion id="component-wrapper">
                    <Div padding="small" shape="rounded" bgColour="slate-light80">
                        {showCurrentPageMessage && (
                            <Badge shape="rounded" id="current-page-message">That’s this page 🙂</Badge>
                        )}

                        <Breadcrumbs
                            id="interactive-component"
                            {...(
                                selectedBgColour !== undefined ? { bgColour : selectedBgColour } : {}
                            )}
                            {...propsConfig}
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

                {/* CONFIGURATOR /////////////////////////////////////////////////////////////////////////////////// */}
                <Portion desktopSpan="half">
                    {propsConfigurator()}
                </Portion>

                {/* GLOBAL THEME /////////////////////////////////////////////////////////////////////////////////// */}
                <Portion desktopSpan="half">
                    <Card padding="micro" shape="rounded">
                        <Form>
                            <Header verticallyCentreItems pushItemsToEnds marginBottom="micro">
                                <Text size="large" weight="700" textColour="white">
                                    Set global theme values
                                </Text>
                            </Header>

                            <Row marginBottom="none">
                                <Portion>
                                    <CodeBlock
                                        withSyntaxHighlighting
                                        source={cssVariablesList}
                                        language="css"
                                        showCopyButton
                                        marginBottom="micro"
                                    />
                                </Portion>

                                {/* BG COLOUR ====================================================================== */}
                                <Portion desktopSpan="half">
                                    <Select
                                        id="bg-colour"
                                        label="Wrapper BG colour"
                                        options={[{
                                            label    : "Select a colour",
                                            value    : "select-a-colour",
                                            disabled : true,
                                            selected : true,
                                        }, ...colourOptions]}
                                        defaultValue={componentVariables["breadcrumbs-wrapper-bg"].defaultValue || "select-a-colour"}
                                        onChange={(value) => handleVariableChange("breadcrumbs-wrapper-bg", value)}
                                        isFullWidth
                                    />
                                </Portion>

                                <Portion desktopSpan="half" />

                                {/* ITEM COLOUR ==================================================================== */}
                                <Portion desktopSpan="half">
                                    <Select
                                        id="item-colour"
                                        label="Item colour"
                                        options={[{
                                            label    : "Select a colour",
                                            value    : "select-a-colour",
                                            disabled : true,
                                            selected : true,
                                        }, ...colourOptions]}
                                        defaultValue={componentVariables["breadcrumb-item-text-colour"] || "select-a-colour"}
                                        onChange={(value) => handleVariableChange("breadcrumb-item-text-colour", value)}
                                        isFullWidth
                                    />
                                </Portion>

                                {/* ITEM ACTIVE COLOUR ============================================================= */}
                                <Portion desktopSpan="half">
                                    <Select
                                        id="item-active-colour"
                                        label="Active item colour"
                                        options={[{
                                            label    : "Select a colour",
                                            value    : "select-a-colour",
                                            disabled : true,
                                            selected : true,
                                        }, ...colourOptions]}
                                        defaultValue={componentVariables["breadcrumb-item-text-colour-active"] || "select-a-colour"}
                                        onChange={(value) => handleVariableChange("breadcrumb-item-text-colour-active", value)}
                                        isFullWidth
                                    />
                                </Portion>

                                {/* ITEM SEPARATOR COLOUR ========================================================== */}
                                <Portion desktopSpan="half">
                                    <Select
                                        id="separator-colour"
                                        label="Separator colour"
                                        options={[{
                                            label    : "Select a colour",
                                            value    : "select-a-colour",
                                            disabled : true,
                                            selected : true,
                                        }, ...colourOptions]}
                                        defaultValue={componentVariables["breadcrumb-item-separator-colour"] || "select-a-colour"}
                                        onChange={(value) => handleVariableChange("breadcrumb-item-separator-colour", value)}
                                        isFullWidth
                                    />
                                </Portion>
                            </Row>
                        </Form>
                    </Card>
                </Portion>
            </Row>
        </Article>
    );
};

export default BreadcrumbsDocs;
