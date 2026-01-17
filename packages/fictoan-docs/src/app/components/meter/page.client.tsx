"use client";

// REACT CORE ==========================================================================================================
import React, { useState, useMemo } from "react";

// UI ==================================================================================================================
import { Div, Heading2, Text, Divider, Meter, CodeBlock, InputField, Range, Checkbox, } from "fictoan-react";

// UTILS ===============================================================================================================
import { createThemeConfigurator } from "$utils/themeConfigurator";

// STYLES ==============================================================================================================
import "../../../styles/fictoan-theme.css";
import "./page-meter.css";

// OTHER ===============================================================================================================
import { ComponentDocsLayout } from "../ComponentDocsLayout";

const MeterDocs = () => {
    // Props state
    const [label, setLabel] = useState("Progress");
    const [suffix, setSuffix] = useState("%");
    const [min, setMin] = useState(0);
    const [max, setMax] = useState(100);
    const [low, setLow] = useState(25);
    const [high, setHigh] = useState(75);
    const [optimum, setOptimum] = useState(90);
    const [value, setValue] = useState(50);
    const [height, setHeight] = useState(24);
    const [showOptimumMarker, setShowOptimumMarker] = useState(false);

    // Theme configurator
    const MeterComponent = (varName: string) => {
        return varName.startsWith("meter-");
    };

    const {
        interactiveElementRef,
        componentProps: themeProps,
        themeConfigurator,
    } = createThemeConfigurator<HTMLMeterElement>("Meter", MeterComponent);

    // Generate code
    const codeString = useMemo(() => {
        const props = [];
        if (label) props.push(`label="${label}"`);
        props.push(`min={${min}}`);
        props.push(`max={${max}}`);
        props.push(`low={${low}}`);
        props.push(`high={${high}}`);
        props.push(`value={meterValue}`);
        if (optimum) props.push(`optimum={${optimum}}`);
        if (showOptimumMarker) props.push(`showOptimumMarker`);
        if (suffix) props.push(`suffix="${suffix}"`);
        if (height !== 24) props.push(`height="${height}px"`);

        return `import { useState } from "react";
import { Meter } from "fictoan-react";

const [meterValue, setMeterValue] = useState(${value});

<Meter
    ${props.join("\n    ")}
/>`;
    }, [label, min, max, low, high, value, optimum, showOptimumMarker, suffix, height]);

    return (
        <ComponentDocsLayout>
            {/* INTRO HEADER /////////////////////////////////////////////////////////////////////////////////////// */}
            <Div id="intro-header">
                <Heading2 id="component-name">
                    Meter
                </Heading2>

                <Text id="component-description" weight="400">
                    A bar to measure a scalar value within a known range
                </Text>
            </Div>

            {/* INTRO NOTES //////////////////////////////////////////////////////////////////////////////////////// */}
            <Div id="intro-notes">
                <Divider kind="tertiary" verticalMargin="micro" />

                <Text>
                    Always takes up 100% width of its parent.
                </Text>

                <Text>
                    The range containing the <code>optimum</code> value shows green, the next range shows amber, and the furthest range shows red.
                </Text>

                <Text>
                    Use <code>showOptimumMarker</code> to display a visual marker at the optimum position.
                </Text>
            </Div>

            {/* DEMO COMPONENT ///////////////////////////////////////////////////////////////////////////////////// */}
            <Div id="demo-component">
                <Meter
                    ref={interactiveElementRef}
                    label={label || undefined}
                    min={min}
                    max={max}
                    low={low}
                    high={high}
                    value={value}
                    optimum={optimum}
                    showOptimumMarker={showOptimumMarker}
                    suffix={suffix || undefined}
                    isFullWidth
                    height={`${height}px`}
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
                        helpText="Label text displayed above the meter."
                        marginBottom="micro" isFullWidth
                    />

                    <InputField
                        label="suffix"
                        value={suffix}
                        onChange={(val) => setSuffix(val)}
                        helpText="Suffix shown after the value (e.g., %, px)."
                        marginBottom="micro" isFullWidth
                    />

                    <Range
                        label="value"
                        min={min}
                        max={max}
                        value={value}
                        onChange={(val : number) => setValue(Number(val))}
                        suffix={suffix}
                        helpText="Current value of the meter."
                        marginBottom="micro" isFullWidth
                    />

                    <Range
                        label="min"
                        min={0}
                        max={50}
                        value={min}
                        onChange={(val : number) => setMin(Number(val))}
                        helpText="Minimum value of the range."
                        marginBottom="micro" isFullWidth
                    />

                    <Range
                        label="max"
                        min={50}
                        max={200}
                        value={max}
                        onChange={(val : number) => setMax(Number(val))}
                        helpText="Maximum value of the range."
                        marginBottom="micro" isFullWidth
                    />

                    <Range
                        label="low"
                        min={min}
                        max={max}
                        value={low}
                        onChange={(val : number) => setLow(Number(val))}
                        helpText="Low threshold value."
                        marginBottom="micro" isFullWidth
                    />

                    <Range
                        label="high"
                        min={min}
                        max={max}
                        value={high}
                        onChange={(val : number) => setHigh(Number(val))}
                        helpText="High threshold value."
                        marginBottom="micro" isFullWidth
                    />

                    <Range
                        label="optimum"
                        min={min}
                        max={max}
                        value={optimum}
                        onChange={(val : number) => setOptimum(Number(val))}
                        helpText="Optimum value for the meter."
                        marginBottom="micro" isFullWidth
                    />

                    <Range
                        label="height"
                        min={8}
                        max={64}
                        value={height}
                        onChange={(val : number) => setHeight(Number(val))}
                        suffix="px"
                        helpText="Height of the meter bar."
                        marginBottom="micro" isFullWidth
                    />

                    <Checkbox
                        id="prop-showOptimumMarker"
                        label="showOptimumMarker"
                        checked={showOptimumMarker}
                        onChange={() => setShowOptimumMarker(!showOptimumMarker)}
                        helpText="Shows a marker at the optimum position."
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

export default MeterDocs;
