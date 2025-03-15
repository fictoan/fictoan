"use client";

// EXTERNAL DEPS =======================================================================================================
import React, { useEffect, useState } from "react";

// INTERNAL DEPS =======================================================================================================
import {
    Element,
    Heading1,
    Heading2,
    Heading3,
    Heading4,
    Heading5,
    Heading6,
    Divider,
    Portion,
    Row,
    Text,
    Article,
    Form,
    Card,
    Header,
    Range,
    Select,
    InputField,
    Meter,
    Button, RadioTabGroup, SelectWithSearch, Checkbox, Div,
CodeBlock
} from "fictoan-react";

// COMPONENTS ==========================================================================================================

// STYLES ==============================================================================================================
import "./page-meter.css";

// HOOKS ===============================================================================================================
import { useThemeVariables } from "../../../utils/useThemeVariables";

// UTILS ===============================================================================================================
import { colourOptions } from "../../colour/colours";

// DATA ================================================================================================================
import { meterProps } from "./config";

const MeterDocs = () => {
    // SAMPLE ==========================================================================================================

    // CUSTOMISE =======================================================================================================
    const [min, setMin] = useState();
    const [max, setMax] = useState();
    const [low, setLow] = useState();
    const [high, setHigh] = useState();
    const [optimum, setOptimum] = useState();
    const [value, setValue] = useState("");
    const [label, setLabel] = useState("");
    const [suffix, setSuffix] = useState("");

    const [showOptimumMarker, setShowOptimumMarker] = useState(false);

    // THEME ===========================================================================================================
    const { componentVariables, handleVariableChange, cssVariablesList } = useThemeVariables(meterProps.variables);


    const setSampleValues = () => {
        setMin(0);
        setMax(100);
        setLow(25);
        setHigh(75);
        setOptimum(90);
        setValue(50);
        setLabel("Exam result");
        setSuffix("%");
    };

    return (
        <Article id="page-meter">
            <Row horizontalPadding="huge" marginTop="medium" marginBottom="small">
                <Portion>
                    <Heading1>Meter</Heading1>
                    <Text size="large" marginBottom="small">
                        A bar to measure a scalar value within a known range, usually used to measure percentages
                    </Text>
                </Portion>

                <Portion>
                    <Heading4 marginBottom="micro">Characteristics</Heading4>
                    <Text>&bull; Always takes up 100% width of its parent</Text>
                    <Text>
                        &bull; The range of values containing the <code>optimum</code> value gets
                        the <code>high</code> colour, currently set to green
                    </Text>
                    <Text>
                        &bull; The next range of values gets the <code>low</code> threshold colour, currently set to
                        amber
                    </Text>
                    <Text>
                        &bull; The range of values furthest from that gets the <code>low</code> threshold colour,
                        currently set to red
                    </Text>
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
                    >
                        <Meter
                            id="interactive-component"
                            {...(
                                min !== undefined ? { min : min } : {}
                            )}
                            {...(
                                max !== undefined ? { max : max } : {}
                            )}
                            {...(
                                low !== undefined ? { low : low } : {}
                            )}
                            {...(
                                high !== undefined ? { high : high } : {}
                            )}
                            {...(
                                optimum !== undefined ? { optimum : optimum } : {}
                            )}
                            {...(
                                value !== undefined ? { value : value } : {}
                            )}
                            {...(
                                label !== undefined ? { label : label } : {}
                            )}
                            {...(
                                suffix !== undefined ? { suffix : suffix } : {}
                            )}
                            {...(
                                showOptimumMarker !== undefined ? { showOptimumMarker : showOptimumMarker } : {}
                            )}
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
                                    <CodeBlock withSyntaxHighlighting language="jsx" showCopyButton>
                                        {[
                                            `// Paste this in your content file`,
                                            `<Meter`,
                                            min ? `    min="${min}"` : null,
                                            max ? `    max="${max}"` : null,
                                            low ? `    low="${low}"` : null,
                                            high ? `    high="${high}"` : null,
                                            optimum ? `    optimum="${optimum}"` : null,
                                            value ? `    value="${value}"` : null,
                                            label ? `    label="${label}"` : null,
                                            suffix ? `    unit="${suffix}"` : null,
                                            showOptimumMarker ? `    showOptimumMarker` : null,
                                            `/>`,
                                        ].filter(Boolean).join("\n")}
                                    </CodeBlock>
                                </Portion>

                                {/* SAMPLES ======================================================================== */}
                                <Portion desktopSpan="half">
                                    <Button
                                        type="button"
                                        size="small"
                                        kind="tertiary"
                                        onClick={setSampleValues}
                                        marginTop="micro"
                                    >
                                        Load sample values
                                    </Button>
                                </Portion>

                                <Portion desktopSpan="half" />

                                {/* MIN ============================================================================ */}
                                <Portion desktopSpan="half">
                                    <InputField
                                        type="number"
                                        label="Min possible value"
                                        placeholder="Enter a number"
                                        value={min}
                                        onChange={(value) => setMin(value)}
                                    />
                                </Portion>

                                {/* MAX ============================================================================ */}
                                <Portion desktopSpan="half">
                                    <InputField
                                        type="number"
                                        label="Max possible value"
                                        placeholder="Enter a number"
                                        value={max}
                                        onChange={(value) => setMax(value)}
                                    />
                                </Portion>

                                {/* LOW ============================================================================ */}
                                <Portion desktopSpan="half">
                                    <InputField
                                        type="number"
                                        label="Low threshold"
                                        placeholder="Enter a number"
                                        value={low}
                                        onChange={(value) => setLow(value)}
                                    />
                                </Portion>

                                {/* HIGH =========================================================================== */}
                                <Portion desktopSpan="half">
                                    <InputField
                                        type="number"
                                        label="High threshold"
                                        placeholder="Enter a number"
                                        value={high}
                                        onChange={(value) => setHigh(value)}
                                    />
                                </Portion>

                                {/* OPTIMUM ======================================================================== */}
                                <Portion desktopSpan="half">
                                    <InputField
                                        type="number"
                                        label="Optimum value"
                                        placeholder="Enter a number"
                                        value={optimum}
                                        onChange={(value) => setOptimum(value)}
                                    />
                                </Portion>

                                {/* OPTIMUM ======================================================================== */}
                                <Portion desktopSpan="half">
                                    <Div marginTop="micro">
                                        <Checkbox
                                            id="checkbox-show-optimum-marker"
                                            value="checkbox-show-optimum-marker"
                                            name="checkbox-show-optimum-marker"
                                            label="Show optimum marker"
                                            onChange={() => setShowOptimumMarker(!showOptimumMarker)}
                                        />
                                    </Div>
                                </Portion>

                                {/* VALUE ========================================================================== */}
                                <Portion>
                                    <Range
                                        label="Current value"
                                        value={value}
                                        onChange={(value) => setValue(value)}
                                        suffix={suffix}
                                        min={0} max={max} step={1}
                                    />
                                </Portion>

                                {/* LABEL ========================================================================== */}
                                <Portion desktopSpan="half">
                                    <InputField
                                        type="text"
                                        label="Label"
                                        placeholder="Enter text"
                                        value={label}
                                        onChange={(value) => setLabel(value)}
                                    />
                                </Portion>

                                {/* SUFFIX ========================================================================= */}
                                <Portion desktopSpan="half">
                                    <InputField
                                        type="text"
                                        label="Suffix"
                                        placeholder="Enter text"
                                        value={suffix}
                                        onChange={(value) => setSuffix(value)}
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
                            <Header verticallyCentreItems pushItemsToEnds marginBottom="micro">
                                <Text size="large" weight="700" textColour="white">
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

                                {/* BG COLOUR ====================================================================== */}
                                <Portion desktopSpan="half">
                                    <Select
                                        label="Background colour"
                                        options={[{
                                            label    : "Select a colour",
                                            value    : "select-a-colour",
                                            disabled : true,
                                            selected : true,
                                        }, ...colourOptions]}
                                        defaultValue={componentVariables["meter-bg"].defaultValue || "select-a-colour"}
                                        onChange={(value) => handleVariableChange("meter-bg", value)}
                                        isFullWidth
                                    />
                                </Portion>

                                {/* BG COLOUR ====================================================================== */}
                                <Portion desktopSpan="half">
                                    <Select
                                        label="Border colour"
                                        options={[{
                                            label    : "Select a colour",
                                            value    : "select-a-colour",
                                            disabled : true,
                                            selected : true,
                                        }, ...colourOptions]}
                                        defaultValue={componentVariables["meter-border"].defaultValue || "select-a-colour"}
                                        onChange={(value) => handleVariableChange("meter-border", value)}
                                        isFullWidth
                                    />
                                </Portion>

                                {/* BORDER RADIUS ================================================================== */}
                                <Portion desktopSpan="half">
                                    <Range
                                        label="Border width"
                                        value={componentVariables["meter-border-width"].value}
                                        onChange={(value) => handleVariableChange("meter-border-width", value)}
                                        suffix={componentVariables["meter-border-width"].unit}
                                        min={0} max={50} step={1}
                                    />
                                </Portion>

                                {/* HEIGHT ========================================================================= */}
                                <Portion desktopSpan="half">
                                    <Range
                                        label="Height"
                                        value={componentVariables["meter-height"].value}
                                        onChange={(value) => handleVariableChange("meter-height", value)}
                                        suffix={componentVariables["meter-height"].unit}
                                        min={0} max={200} step={1}
                                    />
                                </Portion>

                                {/* BORDER RADIUS ================================================================== */}
                                <Portion desktopSpan="half">
                                    <Range
                                        label="Border radius"
                                        value={componentVariables["meter-border-radius"].value}
                                        onChange={(value) => handleVariableChange("meter-border-radius", value)}
                                        suffix={componentVariables["meter-border-radius"].unit}
                                        min={0} max={50} step={1}
                                    />
                                </Portion>

                                <Portion desktopSpan="half" />

                                {/* LABEL ========================================================================== */}
                                <Portion desktopSpan="half">
                                    <Select
                                        label="Label colour"
                                        options={[{
                                            label    : "Select a colour",
                                            value    : "select-a-colour",
                                            disabled : true,
                                            selected : true,
                                        }, ...colourOptions]}
                                        defaultValue={componentVariables["meter-label"].defaultValue || "select-a-colour"}
                                        onChange={(value) => handleVariableChange("meter-label", value)}
                                        isFullWidth
                                    />
                                </Portion>

                                {/* VALUE COLOUR =================================================================== */}
                                <Portion desktopSpan="half">
                                    <Select
                                        label="Value colour"
                                        options={[{
                                            label    : "Select a colour",
                                            value    : "select-a-colour",
                                            disabled : true,
                                            selected : true,
                                        }, ...colourOptions]}
                                        defaultValue={componentVariables["meter-value"].defaultValue || "select-a-colour"}
                                        onChange={(value) => handleVariableChange("meter-value", value)}
                                        isFullWidth
                                    />
                                </Portion>

                                {/* LOW COLOUR ===================================================================== */}
                                <Portion desktopSpan="half">
                                    <Select
                                        label="Very low threshold colour"
                                        options={[{
                                            label    : "Select a colour",
                                            value    : "select-a-colour",
                                            disabled : true,
                                            selected : true,
                                        }, ...colourOptions]}
                                        defaultValue={componentVariables["meter-danger"].defaultValue || "select-a-colour"}
                                        onChange={(value) => handleVariableChange("meter-danger", value)}
                                        isFullWidth
                                    />
                                </Portion>

                                {/* LOW COLOUR ===================================================================== */}
                                <Portion desktopSpan="half">
                                    <Select
                                        label="Low threshold colour"
                                        options={[{
                                            label    : "Select a colour",
                                            value    : "select-a-colour",
                                            disabled : true,
                                            selected : true,
                                        }, ...colourOptions]}
                                        defaultValue={componentVariables["meter-low"].defaultValue || "select-a-colour"}
                                        onChange={(value) => handleVariableChange("meter-low", value)}
                                        isFullWidth
                                    />
                                </Portion>

                                {/* LOW COLOUR ===================================================================== */}
                                <Portion desktopSpan="half">
                                    <Select
                                        label="High threshold colour"
                                        options={[{
                                            label    : "Select a colour",
                                            value    : "select-a-colour",
                                            disabled : true,
                                            selected : true,
                                        }, ...colourOptions]}
                                        defaultValue={componentVariables["meter-optimum"].defaultValue || "select-a-colour"}
                                        onChange={(value) => handleVariableChange("meter-optimum", value)}
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

export default MeterDocs;
