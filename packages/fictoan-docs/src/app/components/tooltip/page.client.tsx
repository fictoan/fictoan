"use client";

// REACT CORE ==========================================================================================================
import React from "react";

// UI ==================================================================================================================
import { Div, Heading1, Heading4, Divider, Portion, Row, Text, Article, Tooltip, Button } from "fictoan-react";

// UTILS ===============================================================================================================
import { createPropsConfigurator } from "$utils/propsConfigurator";
import { createThemeConfigurator } from "$utils/themeConfigurator";

// STYLES ==============================================================================================================
import "../../../styles/fictoan-theme.css";
import "./page-tooltip.css";

// OTHER ===============================================================================================================
import { colourOptions } from "../../colour/colours";

const TooltipDocs = () => {
    const [sampleComponentId, setSampleComponentId] = React.useState("tooltip-target");

    const {
        propsConfigurator,
        componentProps: propsConfig,
        propValues
    } = createPropsConfigurator(
        "Tooltip",
        [
            "strings", "isTooltipFor", "showOn", "position",
        ],
        colourOptions,
        {
            canHaveChildren: true,
        }
    );

    const TooltipComponent = (varName: string) => {
        return varName.startsWith("tooltip-");
    };

    const {
        interactiveElementRef,
        componentProps: themeConfig,
        themeConfigurator,
    } = createThemeConfigurator("Tooltip", TooltipComponent);

    const tooltipTargetId = propValues.isTooltipFor || "tooltip-target";

    return (
        <Article id="page-badge">
            <Row horizontalPadding="huge" marginTop="medium" marginBottom="small">
                <Portion>
                    <Heading1>Tooltip</Heading1>
                    <Text size="large" marginBottom="small">
                        A small helper popup to display extra information
                    </Text>
                </Portion>

                <Portion>
                    
                    <ul>
                        <li>Requires an element with a specified ID to attach to. Can be any element with an ID.</li>
                        <li>Automatically positions itself to stay within viewport</li>
                        <li>Tooltip can have any React node as children</li>
                    </ul>
                </Portion>
            </Row>

            <Divider kind="primary" horizontalMargin="huge" verticalMargin="small" />

            {/* DEMO COMPONENT ///////////////////////////////////////////////////////////////////////////////////// */}
            <Row horizontalPadding="small" className="rendered-component">
                <Portion id="component-wrapper">
                    <Div
                        padding="small"
                        shape="rounded"
                        bgColour="slate-light80"
                        data-centered-children
                    >
                        <Div id={tooltipTargetId}>Tooltip target</Div>

                        <Tooltip
                            id="interactive-component"
                            ref={interactiveElementRef}
                            isTooltipFor={sampleComponentId}
                            {...propsConfig}
                            {...themeConfig}
                        >
                            This is a tooltip, you can add any content here
                        </Tooltip>
                    </Div>
                </Portion>
            </Row>

            <Row horizontalPadding="small">
                {/* PROPS CONFIGURATOR ///////////////////////////////////////////////////////////////////////////// */}
                <Portion desktopSpan="half">
                    {propsConfigurator()}
                </Portion>

                {/* THEME CONFIGURATOR ///////////////////////////////////////////////////////////////////////////// */}
                <Portion desktopSpan="half">
                    {themeConfigurator()}
                </Portion>
            </Row>
        </Article>
    );
};

export default TooltipDocs;
