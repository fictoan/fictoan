"use client";

// REACT CORE ==========================================================================================================
import React, { useState } from "react";

// UI ==================================================================================================================
import { Element, Heading1, Heading2, Divider, Portion, Row, Text, Article, Button, Drawer, Div, showDrawer, hideDrawer } from "fictoan-react";

// UTILS ===============================================================================================================
import { createThemeConfigurator } from "$utils/themeConfigurator";

// STYLES ==============================================================================================================
import "./page-drawer.css";

// OTHER ===============================================================================================================
import { PropsConfigurator } from "$components/PropsConfigurator/PropsConfigurator";

const DrawerDocs : React.FC = () => {
    const [ props, setProps ] = React.useState<{ [key: string]: any }>({});
    
    // Ensure consistent drawer ID across all references
    const drawerId = props.id || "interactive-component";

    const DrawerComponent = (varName : string) => {
        return varName.startsWith("drawer-");
    };

    const {
        interactiveElementRef,
        componentProps : themeConfig,
        themeConfigurator,
    } = createThemeConfigurator("Drawer", DrawerComponent);

    return (
        <Article id="page-drawer">
            <Row horizontalPadding="huge" marginTop="medium" marginBottom="small">
                <Portion>
                    <Heading1>Drawer</Heading1>
                    <Text size="large" marginBottom="small">
                        The component is a panel that opens from any designated side of the screen.
                    </Text>
                </Portion>

                <Portion>
                    
                    <ul>
                        <li>Accepts any React node as children</li>
                        <li>
                            You can add as many Drawers you want on a page, as long as you match the IDs to the right
                            triggers
                        </li>
                    </ul>
                </Portion>
            </Row>

            <Divider kind="primary" horizontalMargin="huge" verticalMargin="small" />

            {/* DEMO COMPONENT ///////////////////////////////////////////////////////////////////////////////////// */}
            <Row horizontalPadding="small" className="rendered-component">
                <Portion id="component-wrapper">
                    <Element
                        as="div" padding="small" shape="rounded" bgColour="slate-light80"
                        data-centered-children
                    >
                        <Button
                            onClick={() => showDrawer(drawerId)}
                            kind="primary"
                        >
                            Open the drawer
                        </Button>
                    </Element>
                </Portion>

                {/* PROPS CONFIGURATOR ============================================================================= */}
                <Portion desktopSpan="half">
                    <PropsConfigurator componentName="Drawer" onPropsChange={setProps} />
                </Portion>

                {/* THEME CONFIGURATOR ============================================================================= */}
                <Portion desktopSpan="half">
                    {themeConfigurator()}
                </Portion>
            </Row>

            {/* SAMPLE DRAWER ////////////////////////////////////////////////////////////////////////////////////// */}
            <Drawer
                ref={interactiveElementRef}
                {...props}
                {...themeConfig}
                id={drawerId}
                zIndex={60000}
            >
                {props.children || (
                    <>
                        <Heading2 textColour="green" marginBottom="nano">Hello</Heading2>   

                        <Text marginBottom="micro">
                            You can add all sorts of content here inside the info panel.
                        </Text>

                        <Button
                            kind="secondary"
                            onClick={() => hideDrawer(drawerId)}
                        >
                            Close
                        </Button>
                    </>
                )}

                <Div marginTop="large" marginBottom="medium">
                    <Text weight="700" marginBottom="small">
                        Here is some text so the drawer content can scroll
                    </Text>

                    <Heading1 weight="400" marginBottom="small">
                        First heading.
                    </Heading1>

                    <Text size="large" marginBottom="small">
                        Second line.
                    </Text>

                    <Text size="large" marginBottom="small">
                        Third line.
                    </Text>

                    <Text size="large" marginBottom="small">
                        Fourth line.
                    </Text>

                    <Text size="large" marginBottom="small">
                        You guessed it, fifth line.
                    </Text>
                </Div>
            </Drawer>
        </Article>
    );
};

export default DrawerDocs;