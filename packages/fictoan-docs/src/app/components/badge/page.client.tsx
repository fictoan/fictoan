"use client";

// REACT CORE ==========================================================================================================
import React, { useState, useMemo } from "react";

// UI ==================================================================================================================
import { Div, Heading2, Text, Divider, Badge, CodeBlock, InputField, RadioTabGroup, } from "fictoan-react";

// UTILS ===============================================================================================================
import { createThemeConfigurator } from "$utils/themeConfigurator";

// STYLES ==============================================================================================================
import "../../../styles/fictoan-theme.css";
import "./page-badge.css";

// OTHER ===============================================================================================================
import { ComponentDocsLayout } from "../ComponentDocsLayout";

const BadgeDocs = () => {
    // Props state
    const [children, setChildren] = useState("Badge");
    const [size, setSize] = useState("medium");
    const [shape, setShape] = useState("rounded");
    const [actionIcon, setActionIcon] = useState("");
    const [actionAriaLabel, setActionAriaLabel] = useState("Do something");

    // Theme configurator
    const BadgeComponent = (varName: string) => {
        return varName.startsWith("badge-");
    };

    const {
        interactiveElementRef,
        componentProps: themeProps,
        themeConfigurator,
    } = createThemeConfigurator<HTMLDivElement>("Badge", BadgeComponent);

    // Generate code
    const codeString = useMemo(() => {
        const props = [];
        if (size && size !== "medium") props.push(`    size="${size}"`);
        if (shape && shape !== "rounded") props.push(`    shape="${shape}"`);
        if (actionIcon) {
            props.push(`    actionIcon="${actionIcon}"`);
            props.push(`    actionAriaLabel="${actionAriaLabel}"`);
            props.push(`    onActionClick={() => console.log("Action clicked")}`);
        }

        const propsString = props.length > 0 ? `\n${props.join("\n")}\n` : "";
        return `import { Badge } from "fictoan-react";

<Badge${propsString}>\n    ${children}\n</Badge>`;
    }, [children, size, shape, actionIcon, actionAriaLabel]);

    return (
        <ComponentDocsLayout pageId="page-badge">
            {/* INTRO HEADER /////////////////////////////////////////////////////////////////////////////////////// */}
            <Div id="intro-header">
                <Heading2 id="component-name">
                    Badge
                </Heading2>

                <Text id="component-description" weight="400">
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
                    size={size as any}
                    shape={shape as any}
                    actionIcon={actionIcon as any || undefined}
                    actionAriaLabel={actionIcon ? actionAriaLabel : undefined}
                    onActionClick={actionIcon ? () => console.log("Action clicked") : undefined}
                    {...themeProps}
                >
                    {children}
                </Badge>
            </Div>

            {/* PROPS CONFIG /////////////////////////////////////////////////////////////////////////////////////// */}
            <Div id="props-config">
                <CodeBlock language="tsx" withSyntaxHighlighting showCopyButton>
                    {codeString}
                </CodeBlock>

                <Div className="doc-controls">
                    <InputField
                        label="children"
                        value={children}
                        onChange={(value) => setChildren(value)}
                        helpText="The text content of the badge. Also accepts React nodes."
                        marginBottom="micro" isFullWidth
                    />

                    <RadioTabGroup
                        id="prop-size"
                        label="size"
                        options={[
                            { id: "size-nano", value: "nano", label: "nano" },
                            { id: "size-micro", value: "micro", label: "micro" },
                            { id: "size-tiny", value: "tiny", label: "tiny" },
                            { id: "size-small", value: "small", label: "small" },
                            { id: "size-medium", value: "medium", label: "medium" },
                            { id: "size-large", value: "large", label: "large" },
                            { id: "size-huge", value: "huge", label: "huge" },
                        ]}
                        value={size}
                        onChange={(value) => setSize(value)}
                        marginBottom="micro"
                    />

                    <RadioTabGroup
                        id="prop-shape"
                        label="shape"
                        options={[
                            { id: "shape-rounded", value: "rounded", label: "rounded" },
                            { id: "shape-curved", value: "curved", label: "curved" },
                        ]}
                        value={shape}
                        onChange={(value) => setShape(value)}
                        marginBottom="micro"
                    />

                    <RadioTabGroup
                        id="prop-actionIcon"
                        label="actionIcon"
                        options={[
                            { id: "actionIcon-none", value: "", label: "none" },
                            { id: "actionIcon-tick", value: "tick", label: "tick" },
                            { id: "actionIcon-cross", value: "cross", label: "cross" },
                            { id: "actionIcon-plus", value: "plus", label: "plus" },
                            { id: "actionIcon-minus", value: "minus", label: "minus" },
                        ]}
                        value={actionIcon}
                        onChange={(value) => setActionIcon(value)}
                        helpText="Shows an action button with the selected icon."
                        marginBottom="micro"
                    />

                    {actionIcon && (
                        <InputField
                            label="actionAriaLabel"
                            value={actionAriaLabel}
                            onChange={(value) => setActionAriaLabel(value)}
                            helpText="Accessible label for the action button."
                            marginBottom="micro" isFullWidth
                        />
                    )}
                </Div>
            </Div>

            {/* THEME CONFIG /////////////////////////////////////////////////////////////////////////////////////// */}
            <Div id="theme-config">
                {themeConfigurator()}
            </Div>
        </ComponentDocsLayout>
    );
};

export default BadgeDocs;
