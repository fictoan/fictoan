"use client";

// REACT CORE ==========================================================================================================
import React from "react";

// UI ==================================================================================================================
import { Div, Heading4, Divider, Portion, Row, Article, Tabs, Section, Heading6, Text } from "fictoan-react";

// UTILS ===============================================================================================================
import { createThemeConfigurator } from "$utils/themeConfigurator";

// STYLES ==============================================================================================================
import "../../../styles/fictoan-theme.css";
import "./page-tabs.css";

// OTHER ===============================================================================================================
import { PropsConfigurator } from "$components/PropsConfigurator/PropsConfigurator";

const TabsDocs = () => {
    const [ props, setProps ] = React.useState<{ [key: string]: any }>({});

    const TabsComponent = (varName : string) => {
        return varName.startsWith("tabs-") || varName.startsWith("tab-");
    };

    const {
        interactiveElementRef,
        componentProps : themeConfig,
        themeConfigurator,
    } = createThemeConfigurator("Tabs", TabsComponent);

    // Default tabs data for the demo
    const defaultTabs = [
        {
            key      : "tab1",
            label    : "Tab 1",
            hasAlert : false,
            content  : <Text>Content for tab 1</Text>
        },
        {
            key      : "tab2", 
            label    : "Tab 2",
            hasAlert : false,
            content  : <Text>Content for tab 2</Text>
        },
        {
            key      : "tab3",
            label    : "Tab 3", 
            hasAlert : false,
            content  : <Text>Content for tab 3</Text>
        },
    ];

    // Merge default tabs with any tabs from props
    const tabsData = props.tabs || defaultTabs;

    return (
        <Article id="page-tabs">
            {/*  INTRO ///////////////////////////////////////////////////////////////////////////////////////////// */}
            <Section>
                <Row horizontalPadding="huge" marginTop="medium" marginBottom="small">
                    <Portion>
                        <Heading4 id="component-name">
                            Tabs
                        </Heading4>

                        <Heading6
                            id="component-description"
                            weight="400" marginBottom="small"
                        >
                            A way to display multiple blocks of content, one at a time
                        </Heading6>
                    </Portion>

                    <Portion>
                        <Text>&bull; </Text>
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
                        >
                            <Tabs
                                ref={interactiveElementRef}
                                {...props}
                                {...themeConfig}
                                tabs={tabsData}
                            />
                        </Div>
                    </Portion>
                </Row>

                <Row horizontalPadding="small">
                    {/* PROPS CONFIGURATOR ========================================================================= */}
                    <Portion desktopSpan="half">
                        <PropsConfigurator componentName="Tabs" onPropsChange={setProps} />
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

export default TabsDocs;