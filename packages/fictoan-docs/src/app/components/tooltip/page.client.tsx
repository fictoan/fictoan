"use client";

// REACT CORE ==========================================================================================================
import React from "react";

// UI ==================================================================================================================
import { Div, Heading6, Text, Divider, Tooltip } from "fictoan-react";

// LOCAL COMPONENTS ====================================================================================================
import { PropsConfiguratorNew } from "$components/PropsConfigurator/PropsConfiguratorNew";
import { ComponentDocsLayout } from "../ComponentDocsLayout";
import { tooltipRegistry } from "./props.registry";

// STYLES ==============================================================================================================
import "../../../styles/fictoan-theme.css";
import "./page-tooltip.css";

const TooltipDocs = () => {
    const [props, setProps] = React.useState<{ [key: string]: any }>({});

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
                    <li>Automatically positions itself to stay within viewport.</li>
                    <li>Tooltip can have any React node as children.</li>
                    <li>
                        Uses a singleton pattern internally—only one tooltip DOM element exists regardless
                        of how many <code>&lt;Tooltip&gt;</code> components you use, making it highly performant.
                    </li>
                </ul>
            </Div>

            {/* DEMO COMPONENT ///////////////////////////////////////////////////////////////////////////////////// */}
            <Div id="demo-component">
                <Div id="tooltip-target">Tooltip target</Div>

                <Tooltip
                    isTooltipFor="tooltip-target"
                    position={props.position}
                    showOn={props.showOn}
                >
                    {props.children || "This is a tooltip"}
                </Tooltip>
            </Div>

            {/* PROPS CONFIG /////////////////////////////////////////////////////////////////////////////////////// */}
            <Div id="props-config">
                <PropsConfiguratorNew registry={tooltipRegistry} onPropsChange={setProps} />
            </Div>
        </ComponentDocsLayout>
    );
};

export default TooltipDocs;
