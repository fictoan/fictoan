"use client";

// REACT CORE ==========================================================================================================
import React, { useState, useMemo } from "react";

// UI ==================================================================================================================
import { Div, Heading6, Text, Divider, ProgressBar, CodeBlock, InputField, Range, RadioTabGroup, } from "fictoan-react";

// UTILS ===============================================================================================================
import { createThemeConfigurator } from "$utils/themeConfigurator";

// STYLES ==============================================================================================================
import "../../../styles/fictoan-theme.css";
import "./page-progress-bar.css";

// OTHER ===============================================================================================================
import { ComponentDocsLayout } from "../ComponentDocsLayout";

const ProgressBarDocs = () => {
    // Props state
    const [label, setLabel] = useState("Loading");
    const [value, setValue] = useState(65);
    const [max, setMax] = useState(100);
    const [suffix, setSuffix] = useState("%");
    const [height, setHeight] = useState(8);
    const [shape, setShape] = useState("rounded");

    // Theme configurator
    const ProgressBarComponent = (varName: string) => {
        return varName.startsWith("progress-bar-");
    };

    const {
        interactiveElementRef,
        componentProps: themeProps,
        themeConfigurator,
    } = createThemeConfigurator<HTMLProgressElement>("ProgressBar", ProgressBarComponent);

    // Generate code
    const codeString = useMemo(() => {
        const props = [];
        if (label) props.push(`label="${label}"`);
        props.push(`value={progress}`);
        if (max !== 100) props.push(`max={${max}}`);
        if (suffix) props.push(`suffix="${suffix}"`);
        if (height !== 8) props.push(`height="${height}px"`);
        if (shape !== "rounded") props.push(`shape="${shape}"`);

        return `import { useState } from "react";
import { ProgressBar } from "fictoan-react";

const [progress, setProgress] = useState(${value});

<ProgressBar
    ${props.join("\n    ")}
/>`;
    }, [label, value, max, suffix, height, shape]);

    return (
        <ComponentDocsLayout>
            {/* INTRO HEADER /////////////////////////////////////////////////////////////////////////////////////// */}
            <Div id="intro-header">
                <Heading6 id="component-name">
                    Progress bar
                </Heading6>

                <Text id="component-description" weight="400">
                    A visual representation of the completion of a task
                </Text>
            </Div>

            {/* INTRO NOTES //////////////////////////////////////////////////////////////////////////////////////// */}
            <Div id="intro-notes">
                <Divider kind="tertiary" verticalMargin="micro" />

                <Text>
                    Always takes up 100% width of its parent.
                </Text>

                <Text>
                    Use <code>fillColour</code> and <code>bgColour</code> to customise colors.
                </Text>
            </Div>

            {/* DEMO COMPONENT ///////////////////////////////////////////////////////////////////////////////////// */}
            <Div id="demo-component">
                <ProgressBar
                    ref={interactiveElementRef}
                    label={label || undefined}
                    value={value}
                    max={max}
                    suffix={suffix || undefined}
                    height={`${height}px`}
                    shape={shape as any}
                    {...themeProps}
                />
            </Div>

            {/* PROPS CONFIG /////////////////////////////////////////////////////////////////////////////////////// */}
            <Div id="props-config">
                <CodeBlock language="tsx" withSyntaxHighlighting showCopyButton>
                    {codeString}
                </CodeBlock>

                <Div className="doc-controls">
                    <InputField
                        label="label"
                        value={label}
                        onChange={(val) => setLabel(val)}
                        helpText="Label text displayed above the progress bar."
                        marginBottom="micro" isFullWidth
                    />

                    <Range
                        label="value"
                        min={0}
                        max={max}
                        value={value}
                        onChange={(val: number) => setValue(Number(val))}
                        suffix={suffix}
                        helpText="Current progress value."
                        marginBottom="micro" isFullWidth
                    />

                    <Range
                        label="max"
                        min={1}
                        max={200}
                        value={max}
                        onChange={(val: number) => setMax(Number(val))}
                        helpText="Maximum value (default 100)."
                        marginBottom="micro" isFullWidth
                    />

                    <InputField
                        label="suffix"
                        value={suffix}
                        onChange={(val) => setSuffix(val)}
                        helpText="Suffix shown after the value (e.g., %)."
                        marginBottom="micro" isFullWidth
                    />

                    <Range
                        label="height"
                        min={4}
                        max={32}
                        value={height}
                        onChange={(val: number) => setHeight(Number(val))}
                        suffix="px"
                        helpText="Also accepts px, em, rem, %, vh, vw, etc."
                        marginBottom="micro" isFullWidth
                    />

                    <RadioTabGroup
                        id="prop-shape"
                        label="shape"
                        options={[
                            { id: "shape-rounded", value: "rounded", label: "rounded" },
                            { id: "shape-curved", value: "curved", label: "curved" },
                        ]}
                        value={shape}
                        onChange={(val) => setShape(val)}
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

export default ProgressBarDocs;
