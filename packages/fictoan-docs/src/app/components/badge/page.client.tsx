"use client";

// REACT CORE ==========================================================================================================
import React from "react";

// UI ==================================================================================================================
import { Div, Heading6, Text, Divider, Badge } from "fictoan-react";

// LOCAL COMPONENTS ====================================================================================================
import { PropsConfiguratorNew } from "$components/PropsConfigurator/PropsConfiguratorNew";
import { ComponentDocsLayout } from "../ComponentDocsLayout";
import { badgeRegistry } from "./props.registry";

// UTILS ===============================================================================================================
import { createThemeConfigurator } from "$utils/themeConfigurator";

// STYLES ==============================================================================================================
import "../../../styles/fictoan-theme.css";
import "./page-badge.css";

const BadgeDocs = () => {
    const [ props, setProps ] = React.useState<{ [key: string]: any }>({});

    const BadgeComponent = (varName : string) => {
        return varName.startsWith("badge-");
    };

    const {
        interactiveElementRef,
        componentProps : themeConfig,
        themeConfigurator,
    } = createThemeConfigurator("Badge", BadgeComponent);

    return (
        <ComponentDocsLayout>
            {/* INTRO HEADER /////////////////////////////////////////////////////////////////////////////////////// */}
            <Div id="intro-header">
                <Heading6 id="component-name">
                    Badge
                </Heading6>

                <Text
                    id="component-description"
                    weight="400"
                >
                    A small inline element that can be used to highlight a piece of information.
                </Text>
            </Div>

            {/* INTRO NOTES //////////////////////////////////////////////////////////////////////////////////////// */}
            <Div id="intro-notes">
                <Divider kind="tertiary" verticalMargin="micro" />

                <Text>
                    You have to manually align the Badge with its sibling.
                </Text>

                <Text>
                    Default size is <code>medium</code>.
                </Text>

                <Text>
                    Use the <code>actionIcon</code> prop to add an action button with icons
                    like <code>cross</code>, <code>tick</code>, <code>plus</code>, or <code>minus</code>.
                </Text>
            </Div>

            {/* DEMO COMPONENT ///////////////////////////////////////////////////////////////////////////////////// */}
            <Div id="demo-component">
                <Badge
                    ref={interactiveElementRef}
                    {...props}
                    {...themeConfig}
                    actionIcon={props.actionIcon || undefined}
                    onActionClick={props.actionIcon ? () => console.log("Action clicked") : undefined}
                >
                    {props.children || "Badge"}
                </Badge>
            </Div>

            {/* PROPS CONFIG /////////////////////////////////////////////////////////////////////////////////////// */}
            <Div id="props-config">
                <PropsConfiguratorNew registry={badgeRegistry} onPropsChange={setProps} />
            </Div>

            {/* THEME CONFIG /////////////////////////////////////////////////////////////////////////////////////// */}
            <Div id="theme-config">
                {themeConfigurator()}
            </Div>
        </ComponentDocsLayout>
    );
};

export default BadgeDocs;