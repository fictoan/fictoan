"use client";

// REACT CORE ==========================================================================================================
import React from "react";

// UI ==================================================================================================================
import { Div, Heading6, Text, Divider, Tooltip } from "fictoan-react";

// LOCAL COMPONENTS ====================================================================================================
import { PropsConfigurator } from "$components/PropsConfigurator/PropsConfigurator";
import { ComponentDocsLayout } from "../ComponentDocsLayout";

// UTILS ===============================================================================================================
import { createThemeConfigurator } from "$utils/themeConfigurator";

// STYLES ==============================================================================================================
import "../../../styles/fictoan-theme.css";
import "./page-tooltip.css";

const TooltipDocs = () => {
    const [props, setProps] = React.useState<{ [key: string]: any }>({});

    const TooltipComponent = (varName: string) => {
        return varName.startsWith("tooltip-");
    };

    const {
        interactiveElementRef,
        componentProps: themeConfig,
        themeConfigurator,
    } = createThemeConfigurator("Tooltip", TooltipComponent);

    // Get the tooltip target ID from props or use default
    const tooltipTargetId = props.isTooltipFor || "tooltip-target";

    return (
        <ComponentDocsLayout>
            {/* INTRO HEADER /////////////////////////////////////////////////////////////////////////////////////// */}
            <Div id="intro-header">
                <Heading6 id="component-name">
                    Tooltip
                </Heading6>

                <Text
                    id="component-description"
                    weight="400"
                >
                    A small helper popup to display extra information
                </Text>
            </Div>

            {/* INTRO NOTES //////////////////////////////////////////////////////////////////////////////////////// */}
            <Div id="intro-notes">
                <Divider kind="tertiary" verticalMargin="micro" />

                <ul>
                    <li>Requires an element with a specified ID to attach to. Can be any element with an ID.</li>
                    <li>Automatically positions itself to stay within viewport</li>
                    <li>Tooltip can have any React node as children</li>
                </ul>
            </Div>

            {/* DEMO COMPONENT ///////////////////////////////////////////////////////////////////////////////////// */}
            <Div id="demo-component">
                <Div id={tooltipTargetId}>Tooltip target</Div>

                <Tooltip
                    ref={interactiveElementRef}
                    isTooltipFor={tooltipTargetId}
                    {...props}
                    {...themeConfig}
                >
                    {props.children || "This is a tooltip, you can add any content here"}
                </Tooltip>
            </Div>

            {/* PROPS CONFIG /////////////////////////////////////////////////////////////////////////////////////// */}
            <Div id="props-config">
                <PropsConfigurator componentName="Tooltip" onPropsChange={setProps} />
            </Div>

            {/* THEME CONFIG /////////////////////////////////////////////////////////////////////////////////////// */}
            <Div id="theme-config">
                {themeConfigurator()}
            </Div>
        </ComponentDocsLayout>
    );
};

export default TooltipDocs;
