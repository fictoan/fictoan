"use client";

// REACT CORE ==========================================================================================================
import React, { useState, useMemo } from "react";

// UI ==================================================================================================================
import { Div, Heading6, Text, Divider, Tooltip, CodeBlock, RadioTabGroup, InputField, } from "fictoan-react";

// UTILS ===============================================================================================================
import { createThemeConfigurator } from "$utils/themeConfigurator";

// STYLES ==============================================================================================================
import "../../../styles/fictoan-theme.css";
import "./page-tooltip.css";

// OTHER ===============================================================================================================
import { ComponentDocsLayout } from "../ComponentDocsLayout";

const TooltipDocs = () => {
    // Props state
    const [position, setPosition] = useState("top");
    const [showOn, setShowOn] = useState("hover");
    const [tooltipContent, setTooltipContent] = useState("This is a tooltip");

    // Theme configurator
    const TooltipComponent = (varName: string) => {
        return varName.startsWith("tooltip-");
    };

    const {
        interactiveElementRef,
        componentProps: themeProps,
        themeConfigurator,
    } = createThemeConfigurator<HTMLDivElement>("Tooltip", TooltipComponent);

    // Generate code
    const codeString = useMemo(() => {
        const props = [];
        props.push(`isTooltipFor="my-element-id"`);
        if (position !== "top") props.push(`position="${position}"`);
        if (showOn !== "hover") props.push(`showOn="${showOn}"`);

        return `import { Tooltip, Div } from "fictoan-react";

<Div id="my-element-id">
    Hover over me
</Div>

<Tooltip
    ${props.join("\n    ")}
>
    ${tooltipContent}
</Tooltip>`;
    }, [position, showOn, tooltipContent]);

    return (
        <ComponentDocsLayout>
            {/* INTRO HEADER /////////////////////////////////////////////////////////////////////////////////////// */}
            <Div id="intro-header">
                <Heading6 id="component-name">
                    Tooltip
                </Heading6>

                <Text id="component-description" weight="400">
                    A small helper popup to display extra information
                </Text>
            </Div>

            {/* INTRO NOTES //////////////////////////////////////////////////////////////////////////////////////// */}
            <Div id="intro-notes">
                <Divider kind="tertiary" verticalMargin="micro" />

                <Text>
                    Requires an element with a specified ID to attach to via <code>isTooltipFor</code>.
                </Text>

                <Text>
                    Automatically repositions to stay within viewport boundaries.
                </Text>

                <Text>
                    Uses a singleton pattern—only one tooltip DOM element exists for performance.
                </Text>
            </Div>

            {/* DEMO COMPONENT ///////////////////////////////////////////////////////////////////////////////////// */}
            <Div id="demo-component">
                <Div
                    {...themeProps}
                    id="tooltip-target"
                    ref={interactiveElementRef}
                    className="tooltip-demo-target"
                >
                    {showOn === "hover" ? "Hover over me" : "Click me"}
                </Div>

                <Tooltip
                    isTooltipFor="tooltip-target"
                    position={position as any}
                    showOn={showOn as any}
                    zIndex={500000}
                >
                    {tooltipContent}
                </Tooltip>
            </Div>

            {/* PROPS CONFIG /////////////////////////////////////////////////////////////////////////////////////// */}
            <Div id="props-config">
                <CodeBlock language="tsx" withSyntaxHighlighting showCopyButton>
                    {codeString}
                </CodeBlock>

                <Div className="doc-controls">
                    <RadioTabGroup
                        id="prop-position"
                        label="position"
                        options={[
                            { id: "position-top", value: "top", label: "top" },
                            { id: "position-bottom", value: "bottom", label: "bottom" },
                            { id: "position-left", value: "left", label: "left" },
                            { id: "position-right", value: "right", label: "right" },
                        ]}
                        value={position}
                        onChange={(val) => setPosition(val)}
                        helpText="Preferred position (auto-adjusts if needed)."
                        marginBottom="micro"
                    />

                    <RadioTabGroup
                        id="prop-showOn"
                        label="showOn"
                        options={[
                            { id: "showOn-hover", value: "hover", label: "hover" },
                            { id: "showOn-click", value: "click", label: "click" },
                        ]}
                        value={showOn}
                        onChange={(val) => setShowOn(val)}
                        helpText="Trigger event for showing the tooltip."
                        marginBottom="micro"
                    />

                    <InputField
                        label="Tooltip content"
                        value={tooltipContent}
                        onChange={(val) => setTooltipContent(val)}
                        helpText="Text or content to display in the tooltip."
                        marginBottom="micro" isFullWidth
                    />
                </Div>
            </Div>

            {/* THEME CONFIG /////////////////////////////////////////////////////////////////////////////////////// */}
            <Div id="theme-config">
                {themeConfigurator()}
            </Div>
        </ComponentDocsLayout>
    );
};

export default TooltipDocs;
