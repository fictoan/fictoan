"use client";

// REACT CORE ==========================================================================================================
import Link from "next/link";
import React from "react";

// UI ==================================================================================================================
import { Div, Heading6, Text, Divider, Breadcrumbs } from "fictoan-react";

// LOCAL COMPONENTS ====================================================================================================
import { PropsConfiguratorNew } from "$components/PropsConfigurator/PropsConfiguratorNew";
import { ComponentDocsLayout } from "../ComponentDocsLayout";
import { breadcrumbsRegistry } from "./props.registry";

// UTILS ===============================================================================================================
import { createThemeConfigurator } from "$utils/themeConfigurator";

// STYLES ==============================================================================================================
import "../../../styles/fictoan-theme.css";
import "./page-breadcrumbs.css";

const BreadcrumbsDocs = () => {
    const [ props, setProps ] = React.useState<{ [key: string]: any }>({});

    const BreadcrumbsComponent = (varName : string) => {
        return varName.startsWith("breadcrumb") || varName.startsWith("breadcrumbs");
    };

    const {
        interactiveElementRef,
        componentProps : themeConfig,
        themeConfigurator,
    } = createThemeConfigurator("Breadcrumbs", BreadcrumbsComponent);

    return (
        <ComponentDocsLayout>
            {/* INTRO HEADER /////////////////////////////////////////////////////////////////////////////////////// */}
            <Div id="intro-header">
                <Heading6 id="component-name">
                    Breadcrumbs
                </Heading6>

                <Text
                    id="component-description"
                    weight="400"
                >
                    A set of links to show the current page's hierarchy
                </Text>
            </Div>

            {/* INTRO NOTES //////////////////////////////////////////////////////////////////////////////////////// */}
            <Div id="intro-notes">
                <Divider kind="tertiary" verticalMargin="micro" />

                <Text>
                    The component accepts React nodes as children.
                </Text>

                <Text>
                    Use Link components from your router for navigation.
                </Text>
            </Div>

            {/* DEMO COMPONENT ///////////////////////////////////////////////////////////////////////////////////// */}
            <Div id="demo-component">
                <Breadcrumbs
                    ref={interactiveElementRef}
                    {...props}
                    {...themeConfig}
                >
                    <Link href="/">Home</Link>
                    <Link href="/components">Components</Link>
                    <Link href="/components/breadcrumbs">Breadcrumbs</Link>
                </Breadcrumbs>
            </Div>

            {/* PROPS CONFIG /////////////////////////////////////////////////////////////////////////////////////// */}
            <Div id="props-config">
                <PropsConfiguratorNew registry={breadcrumbsRegistry} onPropsChange={setProps} />
            </Div>

            {/* THEME CONFIG /////////////////////////////////////////////////////////////////////////////////////// */}
            <Div id="theme-config">
                {themeConfigurator()}
            </Div>
        </ComponentDocsLayout>
    );
};

export default BreadcrumbsDocs;
