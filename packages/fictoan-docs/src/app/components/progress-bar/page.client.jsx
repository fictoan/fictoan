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
    RadioTabGroup,
    Range,
    Select,
    ProgressBar,
    InputField,
CodeBlock
} from "fictoan-react";

// COMPONENTS ==========================================================================================================

// STYLES ==============================================================================================================
import "./page-progress-bar.css";

// HOOKS ===============================================================================================================
import { useThemeVariables } from "../../../utils/useThemeVariables";

// UTILS ===============================================================================================================
import { colourOptions } from "../../colour/colours";

// DATA ================================================================================================================
import { progressProps } from "./config";

const ProgressBarDocs = () => {
    // SAMPLE ==========================================================================================================
    const [max, setMax] = useState("");
    const [value, setValue] = useState("");
    const [label, setLabel] = useState("");
    const [suffix, setSuffix] = useState("");

    const [selectedShape, setSelectedShape] = useState("");

    // CUSTOMISE =======================================================================================================

    // THEME ===========================================================================================================
    const { componentVariables, handleVariableChange, cssVariablesList } = useThemeVariables(progressProps.variables);

    return (
        <Article id="page-progress">
            <Row horizontalPadding="huge" marginTop="medium" marginBottom="small">
                <Portion>
                    <Heading1>Progress bar</Heading1>
                    <Text size="large" marginBottom="small">
                        A progress bar is a visual representation of the completion of a task.
                    </Text>
                </Portion>

                <Portion>
                    <Heading4 marginBottom="micro">Characteristics</Heading4>
                    <ul>
                        <li>Always takes up 100% width of its parent</li>
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
                    >
                        <ProgressBar
                            id="interactive-component"
                            {...(
                                selectedShape !== undefined ? { shape : selectedShape } : {}
                            )}
                            {...(
                                max !== undefined ? { max : max } : {}
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
                                            `<ProgressBar`,
                                            max ? `    max="${max}"` : null,
                                            value ? `    value="${value}"` : null,
                                            label ? `    label="${label}"` : null,
                                            suffix ? `    unit="${suffix}"` : null,
                                            `/>`,
                                        ].filter(Boolean).join("\n")}
                                    </CodeBlock>
                                </Portion>

                                {/* SHAPE ========================================================================== */}
                                <Portion>
                                    <RadioTabGroup
                                        id="shape" label="Shape" name="shape"
                                        options={[
                                            { id : "shape-opt-0", value : "none", label : "none" },
                                            { id : "shape-opt-1", value : "rounded", label : "rounded" },
                                            { id : "shape-opt-2", value : "curved", label : "curved" },
                                        ]}
                                        value={selectedShape}
                                        onChange={(value) => setSelectedShape(value !== "none" ? value : undefined)}
                                    />

                                    <Divider kind="secondary" horizontalMargin="none" verticalMargin="nano" />
                                </Portion>

                                <Portion desktopSpan="half">
                                    <InputField
                                        type="number"
                                        label="Max possible value"
                                        placeholder="Enter a number"
                                        onChange={(value) => setMax(value)}
                                    />
                                </Portion>

                                <Portion desktopSpan="half">
                                    <Range
                                        label="Current value"
                                        value={value}
                                        onChange={(value) => setValue(value)}
                                        suffix={suffix}
                                        min={0} max={max} step={1}
                                    />
                                </Portion>

                                <Portion desktopSpan="half">
                                    <InputField
                                        type="text"
                                        label="Label"
                                        placeholder="Enter text"
                                        onChange={(value) => setLabel(value)}
                                    />
                                </Portion>

                                <Portion desktopSpan="half">
                                    <InputField
                                        type="text"
                                        label="Suffix"
                                        placeholder="Enter text"
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

                                {/* HEIGHT ========================================================================= */}
                                <Portion desktopSpan="half">
                                    <Range
                                        label="Height"
                                        value={componentVariables["progress-bar-height"].value}
                                        onChange={(value) => handleVariableChange("progress-bar-height", value)}
                                        suffix={componentVariables["progress-bar-height"].unit}
                                        min={0} max={200} step={1}
                                    />
                                </Portion>

                                {/* HEIGHT ========================================================================= */}
                                <Portion desktopSpan="half">
                                    <Range
                                        label="Border radius"
                                        value={componentVariables["progress-bar-border-radius"].value}
                                        onChange={(value) => handleVariableChange("progress-bar-border-radius", value)}
                                        suffix={componentVariables["progress-bar-border-radius"].unit}
                                        min={0} max={50} step={1}
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
                                        defaultValue={componentVariables["progress-bar-bg"].defaultValue || "select-a-colour"}
                                        onChange={(value) => handleVariableChange("progress-bar-bg", value)}
                                        isFullWidth
                                    />
                                </Portion>

                                {/* BG COLOUR ====================================================================== */}
                                <Portion desktopSpan="half">
                                    <Select
                                        label="Fill colour"
                                        options={[{
                                            label    : "Select a colour",
                                            value    : "select-a-colour",
                                            disabled : true,
                                            selected : true,
                                        }, ...colourOptions]}
                                        defaultValue={componentVariables["progress-bar-fill"].defaultValue || "select-a-colour"}
                                        onChange={(value) => handleVariableChange("progress-bar-fill", value)}
                                        isFullWidth
                                    />
                                </Portion>

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
                                        defaultValue={componentVariables["progress-bar-label"].defaultValue || "select-a-colour"}
                                        onChange={(value) => handleVariableChange("progress-bar-label", value)}
                                        isFullWidth
                                    />
                                </Portion>

                                {/* BG COLOUR ====================================================================== */}
                                <Portion desktopSpan="half">
                                    <Select
                                        label="Value colour"
                                        options={[{
                                            label    : "Select a colour",
                                            value    : "select-a-colour",
                                            disabled : true,
                                            selected : true,
                                        }, ...colourOptions]}
                                        defaultValue={componentVariables["progress-bar-value"].defaultValue || "select-a-colour"}
                                        onChange={(value) => handleVariableChange("progress-bar-value", value)}
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

export default ProgressBarDocs;
