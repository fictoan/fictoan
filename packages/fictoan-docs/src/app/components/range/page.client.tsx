"use client";

// REACT CORE ==========================================================================================================
import React, { useState } from "react";

// UI ==================================================================================================================
import { Element, Heading1, Heading4, Divider, Portion, Row, Text, Article, Card, Form, Header, Checkbox, Range, Select, CodeBlock, InputField } from "fictoan-react";

// UTILS ===============================================================================================================
import { useThemeVariables } from "../../../utils/useThemeVariables";

// STYLES ==============================================================================================================
import "./page-range.css";

// OTHER ===============================================================================================================
import { colourOptions } from "../../colour/colours";
import { rangeProps } from "./config";

const RangeDocs = () => {
    const { componentVariables, handleVariableChange, cssVariablesList } = useThemeVariables(rangeProps.variables);

    const [rangeValue, setRangeValue] = useState(50);
    const [selectedMin, setSelectedMin] = useState(0);
    const [selectedMax, setSelectedMax] = useState(100);
    const [selectedStep, setSelectedStep] = useState(1);
    const [selectedSuffix, setSelectedSuffix] = useState("px");
    const [showLabel, setShowLabel] = useState(true);
    const [rangeLabel, setRangeLabel] = useState("Label");

    return (
        <Article id="page-range">
            <Row horizontalPadding="huge" marginTop="medium" marginBottom="small">
                <Portion>
                    <Heading1>Range</Heading1>
                    <Text size="large" marginBottom="small">
                        The Range component is an input slider that allows users to select a value within a specified
                        range.
                    </Text>
                </Portion>

                <Portion>
                    
                    <ul>
                        <li>Supports min and max values</li>
                        <li>Configurable step size</li>
                        <li>Optional label and suffix</li>
                        <li>Real-time value display</li>
                    </ul>
                </Portion>
            </Row>

            <Divider kind="primary" horizontalMargin="huge" verticalMargin="small" />

            {/* //////////////////////////////////////////////////////////////////////////////////////////////////// */}
            {/*  CONFIGURATOR */}
            {/* //////////////////////////////////////////////////////////////////////////////////////////////////// */}
            <Row horizontalPadding="small" className="rendered-component">
                {/* DEMO COMPONENT ///////////////////////////////////////////////////////////////////////////////// */}
                <Portion id="component-wrapper">
                    <Element
                        as="div" padding="small" shape="rounded" bgColour="slate-light80"
                        data-centered-children
                    >
                        <Range
                            label={showLabel ? rangeLabel : undefined}
                            value={rangeValue}
                            onChange={(value) => setRangeValue(Number(value))}
                            min={selectedMin}
                            max={selectedMax}
                            step={selectedStep}
                            suffix={selectedSuffix}
                        />
                    </Element>
                </Portion>

                {/* CONFIGURATOR /////////////////////////////////////////////////////////////////////////////////// */}
                <Portion desktopSpan="half">
                    <Form>
                        <Card padding="micro" shape="rounded">
                            <Header verticallyCentreItems pushItemsToEnds marginBottom="micro">
                                <Text size="large" weight="700" textColour="white">
                                    Configure props
                                </Text>
                            </Header>

                            <Row marginBottom="none">
                                <Portion>
                                    <CodeBlock withSyntaxHighlighting language="jsx" showCopyButton marginBottom="micro">
                                        {[
                                            `// Paste this in your content file`,
                                            `const [value, setValue] = useState(${rangeValue});`,
                                            ` `,
                                            `<Range`,
                                            showLabel ? `    label="${rangeLabel}"` : null,
                                            `    value={${rangeValue}}`,
                                            `    min={${selectedMin}}`,
                                            `    max={${selectedMax}}`,
                                            `    step={${selectedStep}}`,
                                            selectedSuffix ? `    suffix="${selectedSuffix}"` : null,
                                            `/>`,
                                        ].filter(Boolean).join("\n")}
                                    </CodeBlock>
                                </Portion>

                                {/* SHOW LABEL ===================================================================== */}
                                <Portion>
                                    <Checkbox
                                        id="checkbox-label"
                                        value="checkbox-label"
                                        name="checkbox-label"
                                        label="Show label"
                                        checked={showLabel}
                                        onChange={() => setShowLabel(!showLabel)}
                                    />

                                    <Divider kind="secondary" horizontalMargin="none" verticalMargin="nano" />
                                </Portion>

                                {/* LABEL TEXT ==================================================================== */}
                                {showLabel && (
                                    <Portion>
                                        <InputField
                                            type="text"
                                            value={rangeLabel}
                                            onChange={(value: React.SetStateAction<string>) => setRangeLabel(value)}
                                            placeholder="Enter label text"
                                        />

                                        <Divider kind="secondary" horizontalMargin="none" verticalMargin="nano" />
                                    </Portion>
                                )}

                                {/* MIN VALUE ===================================================================== */}
                                <Portion desktopSpan="half">
                                    <InputField
                                        type="number"
                                        label="Min value"
                                        value={selectedMin}
                                        onChange={(value: React.SetStateAction<string>) => setSelectedMin(Number(value))}
                                    />
                                </Portion>

                                {/* MAX VALUE ===================================================================== */}
                                <Portion desktopSpan="half">
                                    <InputField
                                        type="number"
                                        label="Max value"
                                        value={selectedMax}
                                        onChange={(value: React.SetStateAction<string>) => setSelectedMax(Number(value))}
                                    />
                                </Portion>

                                {/* STEP VALUE ==================================================================== */}
                                <Portion>
                                    <InputField
                                        type="number"
                                        label="Step size"
                                        value={selectedStep}
                                        onChange={(value: React.SetStateAction<string>) => setSelectedStep(Number(value))}
                                    />

                                    <Divider kind="secondary" horizontalMargin="none" verticalMargin="nano" />
                                </Portion>

                                {/* SUFFIX ======================================================================== */}
                                <Portion>
                                    <InputField
                                        type="text"
                                        label="Suffix"
                                        value={selectedSuffix}
                                        onChange={(value: React.SetStateAction<string>) => setSelectedSuffix((value))}
                                    />
                                </Portion>
                            </Row>
                        </Card>
                    </Form>
                </Portion>

                {/* GLOBAL THEME /////////////////////////////////////////////////////////////////////////////////// */}
                <Portion desktopSpan="half">
                    <Card padding="micro" shape="rounded">
                        <Form>
                            <Header verticallyCentreItems pushItemsToEnds>
                                <Text size="large" weight="700" textColour="white" marginBottom="nano">
                                    Set global theme values
                                </Text>
                            </Header>

                            <Row marginBottom="none">
                                <Portion>
                                    <CodeBlock
                                        withSyntaxHighlighting
                                        source={cssVariablesList}
                                        language="css"
                                        showCopyButton
                                        marginBottom="micro"
                                    />
                                </Portion>

                                {/* TRACK BACKGROUND ============================================================== */}
                                <Portion desktopSpan="half">
                                    <Select
                                        label="Track background"
                                        options={[{
                                            label    : "Select a colour",
                                            value    : "select-a-colour",
                                            disabled : true,
                                            selected : true,
                                        },
                                            ...colourOptions]}
                                        defaultValue={componentVariables["range-track-bg"].defaultValue || "select-a-colour"}
                                        onChange={(value) => handleVariableChange("range-track-bg", value)}
                                        isFullWidth
                                    />
                                </Portion>

                                {/* THUMB BACKGROUND ============================================================= */}
                                <Portion desktopSpan="half">
                                    <Select
                                        label="Thumb background"
                                        options={[{
                                            label    : "Select a colour",
                                            value    : "select-a-colour",
                                            disabled : true,
                                            selected : true,
                                        },
                                            ...colourOptions]}
                                        defaultValue={componentVariables["range-thumb-bg"].defaultValue || "select-a-colour"}
                                        onChange={(value) => handleVariableChange("range-thumb-bg", value)}
                                        isFullWidth
                                    />
                                </Portion>

                                {/* THUMB BORDER ================================================================ */}
                                <Portion desktopSpan="half">
                                    <Select
                                        label="Thumb border"
                                        options={[{
                                            label    : "Select a colour",
                                            value    : "select-a-colour",
                                            disabled : true,
                                            selected : true,
                                        },
                                            ...colourOptions]}
                                        defaultValue={componentVariables["range-thumb-border"].defaultValue || "select-a-colour"}
                                        onChange={(value) => handleVariableChange("range-thumb-border", value)}
                                        isFullWidth
                                    />
                                </Portion>

                                {/* FOCUS BORDER ================================================================= */}
                                <Portion desktopSpan="half">
                                    <Select
                                        label="Focus border"
                                        options={[{
                                            label    : "Select a colour",
                                            value    : "select-a-colour",
                                            disabled : true,
                                            selected : true,
                                        },
                                            ...colourOptions]}
                                        defaultValue={componentVariables["range-border-focus"].defaultValue || "select-a-colour"}
                                        onChange={(value) => handleVariableChange("range-border-focus", value)}
                                        isFullWidth
                                    />
                                </Portion>

                                {/* FOCUS OUTLINE ================================================================ */}
                                <Portion desktopSpan="half">
                                    <Select
                                        label="Focus outline"
                                        options={[{
                                            label    : "Select a colour",
                                            value    : "select-a-colour",
                                            disabled : true,
                                            selected : true,
                                        },
                                            ...colourOptions]}
                                        defaultValue={componentVariables["range-outline-focus"].defaultValue || "select-a-colour"}
                                        onChange={(value) => handleVariableChange("range-outline-focus", value)}
                                        isFullWidth
                                    />
                                </Portion>
                            </Row>
                        </Form>
                    </Card>
                </Portion>
            </Row>
        </Article>
    );
};

export default RangeDocs;
