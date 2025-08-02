"use client";

// REACT CORE ==========================================================================================================
import React, { useState } from "react";

// UI ==================================================================================================================
import { Element, Heading1, Heading2, Heading4, Divider, Portion, Row, Text, Article, Button, Drawer, Div, showDrawer, hideDrawer } from "fictoan-react";

// UTILS ===============================================================================================================
import { createPropsConfigurator } from "$utils/propsConfigurator";
import { createThemeConfigurator } from "$utils/themeConfigurator";

// STYLES ==============================================================================================================
import "./page-drawer.css";

// OTHER ===============================================================================================================
import { colourOptions } from "../../colour/colours";

const DrawerDocs : React.FC = () => {
    const {
        propsConfigurator,
        componentProps : propsConfig,
    } = createPropsConfigurator(
        "Drawer",
        [
            "strings",
            "position",
            "size",
            "padding",
            "showOverlay",
            "blurOverlay",
            "isDismissible",
            "closeOnClickOutside",
        ],
        colourOptions,
        {
            isSelfClosing   : false,
            canHaveChildren : true,
            defaultChildren : null,
        },
    );

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
                            onClick={() => showDrawer("interactive-component")}
                            kind="primary"
                        >
                            Open the drawer
                        </Button>
                    </Element>
                </Portion>

                {/* PROPS CONFIGURATOR ============================================================================= */}
                <Portion desktopSpan="half">
                    {propsConfigurator()}
                </Portion>

                {/* THEME CONFIGURATOR ============================================================================= */}
                <Portion desktopSpan="half">
                    {themeConfigurator()}
                </Portion>
            </Row>

            {/* SAMPLE DRAWER ////////////////////////////////////////////////////////////////////////////////////// */}
            <Drawer
                id="interactive-component"
                ref={interactiveElementRef}
                position={propsConfig.position || "right"}
                {...(propsConfig.size ? {size : propsConfig.size} : {})}
                {...(propsConfig.padding ? {padding : propsConfig.padding} : {})}
                {...(typeof propsConfig.showOverlay === "boolean" ? {showOverlay : propsConfig.showOverlay} : {})}
                {...(typeof propsConfig.blurOverlay === "boolean" ? {blurOverlay : propsConfig.blurOverlay} : {})}
                {...(typeof propsConfig.isDismissible === "boolean" ? {isDismissible : propsConfig.isDismissible} : {})}
                {...(typeof propsConfig.closeOnClickOutside === "boolean" ? {closeOnClickOutside : propsConfig.closeOnClickOutside} : {})}
                label={propsConfig.content || "Sample drawer"}
                {...(({id, ...rest}) => rest)(themeConfig)}
            >
                <Heading2 textColour="green" marginBottom="nano">Hello</Heading2>

                <Text marginBottom="micro">
                    You can add all sorts of content here inside the info panel.
                </Text>

                <Button
                    kind="secondary"
                    onClick={() => hideDrawer("interactive-component")}
                >
                    Close
                </Button>

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