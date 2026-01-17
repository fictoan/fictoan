"use client";

// REACT CORE ==========================================================================================================
import Link from "next/link";
import React, { useState } from "react";

// UI ==================================================================================================================
import { Element, Heading2, Heading4, Heading6, Divider, Portion, Row, Text, Article, Card, Header, Select, Range, SidebarWrapper, SidebarHeader, SidebarItem, SidebarFooter, CodeBlock, Section, Div, Footer } from "fictoan-react";

// UTILS ===============================================================================================================
import { useThemeVariables } from "$utils/useThemeVariables";

// ASSETS ==============================================================================================================
import FictoanIcon from "../../../assets/images/fictoan-icon.svg";
import FictoanLogo from "../../../assets/images/fictoan-logo.svg";
import HomeIcon from "../../../assets/icons/home.svg";
import ThemeSwitchIcon from "../../../assets/icons/theme.svg";

// STYLES ==============================================================================================================
import "./page-sidebar.css";

// OTHER ===============================================================================================================
import { colourOptions } from "../../colour/colours";
import { sidebarProps } from "./config";

const SidebarDocs = () => {
    const { componentVariables, handleVariableChange, cssVariablesList } = useThemeVariables(sidebarProps.variables) as {
        componentVariables: Record<string, { value: number | string; defaultValue?: string; unit?: string }>;
        handleVariableChange: (varName: string, value: string | number) => void;
        cssVariablesList: string;
    };

    const [sidebarState, setSidebarState] = useState("");
    const headerOnClick = () => {
        setSidebarState(sidebarState === "collapsed" ? "" : "collapsed");
    };

    return (
        <Article id="page-sidebar">
            <Row horizontalPadding="huge" marginTop="medium" marginBottom="small">
                <Portion>
                    <Heading2>Sidebar</Heading2>
                    <Text size="large" marginBottom="small">
                        A list of links inside a vertical container
                    </Text>
                </Portion>

                <Portion>
                    
                    <Text>&bull; </Text>
                </Portion>
            </Row>

            <Divider kind="primary" horizontalMargin="huge" verticalMargin="small" />

            {/* //////////////////////////////////////////////////////////////////////////////////////////////////// */}
            {/* EXAMPLE SETUP */}
            {/* //////////////////////////////////////////////////////////////////////////////////////////////////// */}
            <Section id="example-setup" marginBottom="huge">
                {/* BASIC SETUP ==================================================================================== */}
                <Row className="example-component-row" horizontalPadding="small">
                    <Portion>
                        <Heading6 marginBottom="micro">Basic setup</Heading6>
                    </Portion>

                    <Portion desktopSpan="half">
                        <Div className="example-component-content">
                            <CodeBlock withSyntaxHighlighting language="tsx" marginBottom="nano">
                                {[
                                    `// Paste this in your content file`,
                                    `<SidebarWrapper>`,
                                    `    <SidebarHeader>`,
                                    `    </SidebarHeader> \n`,
                                    `    <SidebarFooter>`,
                                    `    </SidebarFooter>`,
                                    `</SidebarWrapper> \n`,
                                    `<ContentWrapper>`,
                                    `    {/* Your content */}`,
                                    `</ContentWrapper>`,
                                ].filter(Boolean).join("\n")}
                            </CodeBlock>

                            <Text marginBottom="nano">
                                You can set this up on your root layout, or any page that needs a sidebar.
                            </Text>
                        </Div>
                    </Portion>

                    <Portion
                        className="example-component-demo"
                        desktopSpan="half"
                    >
                        <Div padding="small" shape="rounded" bgColour="slate-light80">
                            <Div id="demo-page-content">
                                <Div id="demo-sidebar">
                                    <Header id="demo-sidebar-header">
                                        <Text textColour="black">
                                            &lt;SidebarHeader&gt;
                                        </Text>
                                    </Header>

                                    <Text textColour="black" align="centre">
                                        &lt;SidebarWrapper&gt;
                                    </Text>

                                    <Footer id="demo-sidebar-footer">
                                        <Text textColour="black">
                                            &lt;SidebarFooter&gt;
                                        </Text>
                                    </Footer>
                                </Div>

                                <Text textColour="black" margin="micro">
                                    &lt;ContentWrapper&gt;
                                </Text>
                            </Div>
                        </Div>
                    </Portion>
                </Row>
            </Section>


            {/* //////////////////////////////////////////////////////////////////////////////////////////////////// */}
            {/*  CONFIGURATOR */}
            {/* //////////////////////////////////////////////////////////////////////////////////////////////////// */}
            <Row horizontalPadding="small" className="rendered-component">
                {/* DEMO COMPONENT ///////////////////////////////////////////////////////////////////////////////// */}
                <Portion desktopSpan="half" id="component-wrapper">
                    <Element
                        as="div" padding="small" shape="rounded" bgColour="slate-light80"
                        data-centered-children isFullHeight
                    >
                        <SidebarWrapper
                            className={`${sidebarState === "collapsed" ? "collapsed" : ""}`}
                        >
                            {/* HEADER */}
                            <SidebarHeader onClick={headerOnClick}>
                                <div className="header-logo">
                                    <FictoanLogo />
                                </div>

                                <div className="header-icon">
                                    <FictoanIcon />
                                </div>
                            </SidebarHeader>

                            <Link href="/getting-started">
                                <SidebarItem>
                                    <HomeIcon />
                                    <Text>Home</Text>
                                </SidebarItem>
                            </Link>

                            <SidebarFooter>
                                <SidebarItem>
                                    <ThemeSwitchIcon />
                                    <Text>Theme</Text>
                                </SidebarItem>
                            </SidebarFooter>
                        </SidebarWrapper>
                    </Element>
                </Portion>

                <Portion desktopSpan="half">
                    <Card padding="micro" shape="rounded">
                        <Header verticallyCentreItems pushItemsToEnds>
                            <Text size="large" weight="700" textColour="white" marginBottom="nano">
                                Set global theme values
                            </Text>
                        </Header>

                        <CodeBlock
                            withSyntaxHighlighting
                            source={cssVariablesList}
                            language="css"
                            showCopyButton
                            marginBottom="micro"
                        />

                        <Row marginBottom="none">
                            {/* BG COLOUR ================================================================== */}
                            <Portion desktopSpan="half">
                                <Select
                                    label="Background"
                                    options={[{
                                        label    : "Select a colour",
                                        value    : "select-a-colour",
                                        disabled : true,
                                        selected : true,
                                    }, ...colourOptions]}
                                    defaultValue={componentVariables["sidebar-bg"].defaultValue || "select-a-colour"}
                                    onChange={(value) => handleVariableChange("sidebar-bg", value)}
                                    isFullWidth
                                />
                            </Portion>

                            <Portion desktopSpan="half" />

                            {/* WIDTH ====================================================================== */}
                            <Portion desktopSpan="half">
                                <Range
                                    label="Width — default"
                                    value={componentVariables["sidebar-width-default"].value as number}
                                    onChange={(value: number) => handleVariableChange("sidebar-width-default", value)}
                                    suffix={componentVariables["sidebar-width-default"].unit}
                                    min={48} max={320} step={1}
                                />
                            </Portion>

                            {/* WIDTH ====================================================================== */}
                            <Portion desktopSpan="half">
                                <Range
                                    label="Width — collapsed"
                                    value={componentVariables["sidebar-width-default"].value as number}
                                    onChange={(value: number) => handleVariableChange("sidebar-width-default", value)}
                                    min={0} max={50} step={1}
                                    suffix={componentVariables["sidebar-width-default"].unit}
                                />
                            </Portion>
                        </Row>
                    </Card>
                </Portion>
            </Row>
        </Article>
    );
};

export default SidebarDocs;
