"use client";

// REACT CORE ==========================================================================================================
import React, { useState, useMemo } from "react";

// UI ==================================================================================================================
import {
    Div,
    Heading2,
    Text,
    Divider,
    Range,
    CodeBlock,
    InputField,
    RadioTabGroup,
    Checkbox,
} from "fictoan-react";

// UTILS ===============================================================================================================
import { createThemeConfigurator } from "$utils/themeConfigurator";

// STYLES ==============================================================================================================
import "../../../styles/fictoan-theme.css";
import "./page-range.css";

// OTHER ===============================================================================================================
import { ComponentDocsLayout } from "../ComponentDocsLayout";

const RangeDocs = () => {
    // Mode toggle
    const [mode, setMode] = useState<"single" | "dual">("single");

    // Single-thumb state
    const [singleValue, setSingleValue] = useState(50);
    const [singleMin, setSingleMin] = useState(0);
    const [singleMax, setSingleMax] = useState(100);
    const [singleStep, setSingleStep] = useState(1);

    // Dual-thumb state
    const [dualValue, setDualValue] = useState<[number, number]>([25, 75]);
    const [dualMin, setDualMin] = useState(0);
    const [dualMax, setDualMax] = useState(100);
    const [dualStep, setDualStep] = useState(5);

    // Common props
    const [label, setLabel] = useState("Select a value");
    const [suffix, setSuffix] = useState("");
    const [showLabel, setShowLabel] = useState(true);
    const [disabled, setDisabled] = useState(false);
    const [isFullWidth, setIsFullWidth] = useState(true);

    // Theme configurator
    const RangeComponent = (varName: string) => {
        return varName.startsWith("range-");
    };

    const {
        interactiveElementRef,
        componentProps: themeProps,
        themeConfigurator,
    } = createThemeConfigurator<HTMLInputElement>("Range", RangeComponent);

    // Generate code
    const codeString = useMemo(() => {
        if (mode === "single") {
            const props = [];
            props.push(`id="my-range"`);
            if (showLabel && label) props.push(`label="${label}"`);
            props.push(`value={value}`);
            props.push(`onChange={(val) => setValue(val)}`);
            if (singleMin !== 0) props.push(`min={${singleMin}}`);
            if (singleMax !== 100) props.push(`max={${singleMax}}`);
            if (singleStep !== 1) props.push(`step={${singleStep}}`);
            if (suffix) props.push(`suffix="${suffix}"`);
            if (disabled) props.push(`disabled`);
            if (isFullWidth) props.push(`isFullWidth`);

            return `import { useState } from "react";
import { Range } from "fictoan-react";

const [value, setValue] = useState(${singleValue});

<Range
    ${props.join("\n    ")}
/>`;
        } else {
            const props = [];
            props.push(`id="my-range"`);
            if (showLabel && label) props.push(`label="${label}"`);
            props.push(`value={value}`);
            props.push(`onChange={(val) => setValue(val)}`);
            if (dualMin !== 0) props.push(`min={${dualMin}}`);
            if (dualMax !== 100) props.push(`max={${dualMax}}`);
            if (dualStep !== 1) props.push(`step={${dualStep}}`);
            if (suffix) props.push(`suffix="${suffix}"`);
            props.push(`minLabel="Minimum value"`);
            props.push(`maxLabel="Maximum value"`);
            if (disabled) props.push(`disabled`);
            if (isFullWidth) props.push(`isFullWidth`);

            return `import { useState } from "react";
import { Range } from "fictoan-react";

const [value, setValue] = useState<[number, number]>([${dualValue[0]}, ${dualValue[1]}]);

<Range
    ${props.join("\n    ")}
/>`;
        }
    }, [mode, label, showLabel, suffix, disabled, isFullWidth, singleValue, singleMin, singleMax, singleStep, dualValue, dualMin, dualMax, dualStep]);

    return (
        <ComponentDocsLayout>
            {/* INTRO HEADER /////////////////////////////////////////////////////////////////////////////////////// */}
            <Div id="intro-header">
                <Heading2 id="component-name">
                    Range
                </Heading2>

                <Text id="component-description" weight="400">
                    A slider component for selecting a single value or a range of values
                </Text>
            </Div>

            {/* INTRO NOTES //////////////////////////////////////////////////////////////////////////////////////// */}
            <Div id="intro-notes">
                <Divider kind="tertiary" verticalMargin="micro" />

                <Text>
                    Pass a <code>number</code> for single-thumb mode, or <code>[min, max]</code> array for dual-thumb mode.
                </Text>

                <Text>
                    Fully accessible with keyboard navigation (Arrow keys, Home/End, PageUp/Down).
                </Text>

                <Text>
                    In dual-thumb mode, handles can't pass each other (collision prevention).
                </Text>
            </Div>

            {/* DEMO COMPONENT ///////////////////////////////////////////////////////////////////////////////////// */}
            <Div id="demo-component">
                {mode === "single" ? (
                    <Range
                        {...themeProps}
                        ref={interactiveElementRef}
                        id="demo-range"
                        label={showLabel ? label : undefined}
                        value={singleValue}
                        onChange={(val: number) => setSingleValue(val)}
                        min={singleMin}
                        max={singleMax}
                        step={singleStep}
                        suffix={suffix || undefined}
                        disabled={disabled}
                        isFullWidth={isFullWidth}
                    />
                ) : (
                    <Range
                        {...themeProps}
                        ref={interactiveElementRef}
                        id="demo-range"
                        label={showLabel ? label : undefined}
                        value={dualValue}
                        onChange={(val: [number, number]) => setDualValue(val)}
                        min={dualMin}
                        max={dualMax}
                        step={dualStep}
                        suffix={suffix || undefined}
                        minLabel="Minimum value"
                        maxLabel="Maximum value"
                        disabled={disabled}
                        isFullWidth={isFullWidth}
                    />
                )}

                <Div marginTop="nano">
                    <Text size="small">
                        {mode === "single"
                            ? `Value: ${singleValue}`
                            : `Range: ${dualValue[0]} – ${dualValue[1]}`
                        }
                    </Text>
                </Div>
            </Div>

            {/* PROPS CONFIG /////////////////////////////////////////////////////////////////////////////////////// */}
            <Div id="props-config">
                <CodeBlock language="tsx" withSyntaxHighlighting showCopyButton>
                    {codeString}
                </CodeBlock>

                <Div className="doc-controls">
                    <RadioTabGroup
                        id="prop-mode"
                        label="Mode"
                        options={[
                            { id: "mode-single", value: "single", label: "Single thumb" },
                            { id: "mode-dual", value: "dual", label: "Dual thumb" },
                        ]}
                        value={mode}
                        onChange={(val) => setMode(val as "single" | "dual")}
                        helpText="Single thumb for one value, dual thumb for a range."
                        marginBottom="micro"
                    />

                    <Checkbox
                        id="prop-showLabel"
                        label="Show label"
                        checked={showLabel}
                        onChange={() => setShowLabel(!showLabel)}
                        marginBottom="micro"
                    />

                    {showLabel && (
                        <InputField
                            label="label"
                            value={label}
                            onChange={(val) => setLabel(val)}
                            helpText="Label text displayed above the range."
                            marginBottom="micro" isFullWidth
                        />
                    )}

                    {mode === "single" ? (
                        <>
                            <Range
                                id="prop-min"
                                label="min"
                                min={-100}
                                max={singleMax - 1}
                                value={singleMin}
                                onChange={(val: number) => setSingleMin(val)}
                                helpText="Minimum value."
                                marginBottom="micro" isFullWidth
                            />

                            <Range
                                id="prop-max"
                                label="max"
                                min={singleMin + 1}
                                max={200}
                                value={singleMax}
                                onChange={(val: number) => setSingleMax(val)}
                                helpText="Maximum value."
                                marginBottom="micro" isFullWidth
                            />

                            <Range
                                id="prop-step"
                                label="step"
                                min={1}
                                max={20}
                                value={singleStep}
                                onChange={(val: number) => setSingleStep(val)}
                                helpText="Step increment."
                                marginBottom="micro" isFullWidth
                            />
                        </>
                    ) : (
                        <>
                            <Range
                                id="prop-min-dual"
                                label="min"
                                min={-100}
                                max={dualMax - 1}
                                value={dualMin}
                                onChange={(val: number) => setDualMin(val)}
                                helpText="Minimum value."
                                marginBottom="micro" isFullWidth
                            />

                            <Range
                                id="prop-max-dual"
                                label="max"
                                min={dualMin + 1}
                                max={200}
                                value={dualMax}
                                onChange={(val: number) => setDualMax(val)}
                                helpText="Maximum value."
                                marginBottom="micro" isFullWidth
                            />

                            <Range
                                id="prop-step-dual"
                                label="step"
                                min={1}
                                max={20}
                                value={dualStep}
                                onChange={(val: number) => setDualStep(val)}
                                helpText="Step increment."
                                marginBottom="micro" isFullWidth
                            />
                        </>
                    )}

                    <InputField
                        label="suffix"
                        value={suffix}
                        onChange={(val) => setSuffix(val)}
                        helpText="Suffix shown after the value (e.g., px, %, USD)."
                        marginBottom="micro" isFullWidth
                    />

                    <Checkbox
                        id="prop-disabled"
                        label="disabled"
                        checked={disabled}
                        onChange={() => setDisabled(!disabled)}
                        helpText="Disables the range input."
                        marginBottom="micro"
                    />

                    <Checkbox
                        id="prop-isFullWidth"
                        label="isFullWidth"
                        checked={isFullWidth}
                        onChange={() => setIsFullWidth(!isFullWidth)}
                        helpText="Makes the range take full width of its container."
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

export default RangeDocs;
