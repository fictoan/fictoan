"use client";

// REACT CORE ==========================================================================================================
import React, { useState, useMemo, useEffect } from "react";

// UI ==================================================================================================================
import { Button, ButtonGroup, Heading2, Div, Text, Divider, CodeBlock, Checkbox, RadioTabGroup } from "fictoan-react";

// LOCAL COMPONENTS ====================================================================================================
import { ComponentDocsLayout } from "../ComponentDocsLayout";

// UTILS ===============================================================================================================
import { createThemeConfigurator } from "$utils/themeConfigurator";

// STYLES ==============================================================================================================
import "../../../styles/fictoan-theme.css";
import "./page-button-group.css";

const ButtonGroupDocs = () => {
    // Props state
    const [isJoint, setIsJoint] = useState(true);
    const [spacing, setSpacing] = useState("");
    const [equaliseWidth, setEqualiseWidth] = useState(false);
    const [stackVertically, setStackVertically] = useState(false);

    // Notify sidebar when stackVertically changes
    useEffect(() => {
        window.dispatchEvent(new CustomEvent("buttonGroupOrientationChange", {
            detail: { isVertical: stackVertically }
        }));
    }, [stackVertically]);

    // Theme configurator
    const ButtonGroupComponent = (varName: string) => {
        return varName.startsWith("button-group-");
    };

    const {
        interactiveElementRef,
        componentProps: themeProps,
        themeConfigurator,
    } = createThemeConfigurator<HTMLDivElement>("ButtonGroup", ButtonGroupComponent);

    // Generate code
    const codeString = useMemo(() => {
        const props = [];
        if (!isJoint) props.push(`    isJoint={false}`);
        if (!isJoint && spacing) props.push(`    spacing="${spacing}"`);
        if (equaliseWidth) props.push(`    equaliseWidth`);
        if (stackVertically) props.push(`    stackVertically`);

        const propsString = props.length > 0 ? `\n${props.join("\n")}\n` : "";
        return `<ButtonGroup${propsString}>
    <Button kind="tertiary">Left</Button>
    <Button kind="tertiary">Middle</Button>
    <Button kind="tertiary">Right</Button>
</ButtonGroup>`;
    }, [isJoint, spacing, equaliseWidth, stackVertically]);

    return (
        <ComponentDocsLayout pageId="page-button-group">
            {/* INTRO HEADER /////////////////////////////////////////////////////////////////////////////////////// */}
            <Div id="intro-header">
                <Heading2 id="component-name">
                    ButtonGroup
                </Heading2>

                <Text id="component-description" weight="400">
                    A wrapper to group multiple buttons together with seamless borders
                </Text>
            </Div>

            {/* INTRO NOTES //////////////////////////////////////////////////////////////////////////////////////// */}
            <Div id="intro-notes">
                <Divider kind="tertiary" verticalMargin="micro" />

                <Text>
                    By default, buttons are joined with no gap and the inner border-radii are flattened. Only the
                    outermost buttons retain their border-radius. Use <code>isJoint=false</code> to add spacing
                    between buttons.
                </Text>
            </Div>

            {/* DEMO COMPONENT ///////////////////////////////////////////////////////////////////////////////////// */}
            <Div id="demo-component">
                <ButtonGroup
                    ref={interactiveElementRef}
                    isJoint={isJoint}
                    spacing={!isJoint && spacing ? spacing as any : undefined}
                    equaliseWidth={equaliseWidth}
                    stackVertically={stackVertically}
                    {...themeProps}
                >
                    <Button kind="tertiary">Left</Button>
                    <Button kind="tertiary">Middle with long text</Button>
                    <Button kind="tertiary">Right</Button>
                </ButtonGroup>
            </Div>

            {/* PROPS CONFIG /////////////////////////////////////////////////////////////////////////////////////// */}
            <Div id="props-config">
                <CodeBlock language="tsx" withSyntaxHighlighting showCopyButton>
                    {codeString}
                </CodeBlock>

                <Div className="doc-controls">
                    <Checkbox
                        id="prop-isJoint"
                        label="isJoint"
                        checked={isJoint}
                        onChange={(checked) => setIsJoint(checked)}
                        helpText="Joins buttons seamlessly with collapsed borders."
                        marginBottom="micro"
                    />

                    {!isJoint && (
                        <RadioTabGroup
                            id="prop-spacing"
                            label="spacing"
                            options={[
                                { id: "spacing-none", value: "none", label: "none" },
                                { id: "spacing-nano", value: "nano", label: "nano" },
                                { id: "spacing-micro", value: "micro", label: "micro" },
                                { id: "spacing-tiny", value: "tiny", label: "tiny" },
                                { id: "spacing-small", value: "small", label: "small" },
                                { id: "spacing-medium", value: "medium", label: "medium" },
                                { id: "spacing-large", value: "large", label: "large" },
                                { id: "spacing-huge", value: "huge", label: "huge" },
                            ]}
                            value={spacing}
                            onChange={(value) => setSpacing(value)}
                            helpText="Gap between buttons (only applies when isJoint is false)."
                            marginBottom="micro"
                        />
                    )}

                    <Checkbox
                        id="prop-equaliseWidth"
                        label="equaliseWidth"
                        checked={equaliseWidth}
                        onChange={(checked) => setEqualiseWidth(checked)}
                        helpText="Makes all buttons take equal width."
                        marginBottom="micro"
                    />

                    <Checkbox
                        id="prop-stackVertically"
                        label="stackVertically"
                        checked={stackVertically}
                        onChange={(checked) => setStackVertically(checked)}
                        helpText="Stack buttons vertically instead of horizontally."
                        marginBottom="micro"
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

export default ButtonGroupDocs;
