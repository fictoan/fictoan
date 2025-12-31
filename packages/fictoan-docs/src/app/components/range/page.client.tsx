"use client";

// REACT CORE ==========================================================================================================
import React, { useState } from "react";

// UI ==================================================================================================================
import {
    Element,
    Heading1,
    Heading4,
    Divider,
    Portion,
    Row,
    Text,
    Article,
    Card,
    Form,
    Header,
    Checkbox,
    Range,
    Select,
    CodeBlock,
    InputField,
} from "fictoan-react";

// UTILS ===============================================================================================================
import { useThemeVariables } from "$utils/useThemeVariables";

// STYLES ==============================================================================================================
import "./page-range.css";

// OTHER ===============================================================================================================
import { colourOptions } from "../../colour/colours";
import { rangeProps } from "./config";

const RangeDocs = () => {
    const {componentVariables, handleVariableChange, cssVariablesList} = useThemeVariables(rangeProps.variables);

    // Single-thumb range state
    const [ rangeValue, setRangeValue ] = useState(50);
    const [ selectedMin, setSelectedMin ] = useState(0);
    const [ selectedMax, setSelectedMax ] = useState(100);
    const [ selectedStep, setSelectedStep ] = useState(1);
    const [ selectedSuffix, setSelectedSuffix ] = useState("px");
    const [ showLabel, setShowLabel ] = useState(true);
    const [ rangeLabel, setRangeLabel ] = useState("Label");

    // Dual-thumb range state
    const [ dualRangeValue, setDualRangeValue ] = useState<[ number, number ]>([ 25, 75 ]);
    const [ dualMin, setDualMin ] = useState(0);
    const [ dualMax, setDualMax ] = useState(100);
    const [ dualStep, setDualStep ] = useState(5);
    const [ dualSuffix, setDualSuffix ] = useState("USD");
    const [ showDualLabel, setShowDualLabel ] = useState(true);
    const [ dualRangeLabel, setDualRangeLabel ] = useState("Price range");

    return (
        <Article id="page-range">
            <Row horizontalPadding="huge" marginTop="medium" marginBottom="small">
                <Portion>
                    <Heading1>Range</Heading1>
                    <Text size="large" marginBottom="small">
                        A fully custom slider component that allows users to select a single value or a range of values.
                        Built with the same architecture as modern frameworks like Material-UI, shadcn/ui, and Radix UI.
                    </Text>
                </Portion>

                <Portion>
                    <Heading4 marginTop="micro">Features</Heading4>
                    <ul>
                        <li><strong>Single-thumb mode</strong> – Select one value (pass a number)</li>
                        <li><strong>Dual-thumb mode</strong> – Select a range (pass an array <code>[min, max]</code>)
                        </li>
                        <li><strong>Custom implementation</strong> – Full styling control, no browser inconsistencies
                        </li>
                        <li><strong>Fully accessible</strong> – Keyboard navigation (Arrow keys, Home/End, PageUp/Down)
                        </li>
                        <li><strong>Touch-friendly</strong> – Mouse, touch, and pointer events</li>
                        <li><strong>ARIA compliant</strong> – Proper roles and labels for screen readers</li>
                        <li><strong>Collision prevention</strong> – Dual-thumb handles can't pass each other</li>
                        <li><strong>Step snapping</strong> – Values snap to defined increments</li>
                    </ul>
                </Portion>
            </Row>

            <Divider kind="primary" horizontalMargin="huge" verticalMargin="small" />

            {/* //////////////////////////////////////////////////////////////////////////////////////////////////// */}
            {/*  SINGLE-THUMB CONFIGURATOR */}
            {/* //////////////////////////////////////////////////////////////////////////////////////////////////// */}
            <Row horizontalPadding="huge" marginTop="medium" marginBottom="tiny">
                <Portion>
                    <Heading4>Single-Thumb Range</Heading4>
                    <Text marginBottom="micro">
                        Select a single value by passing a number to the <code>value</code> prop.
                        The <code>onChange</code> handler receives the value directly (not an event).
                    </Text>
                </Portion>
            </Row>

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
                            onChange={(value : React.SetStateAction<number>) => setRangeValue(value)}
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
                                    <CodeBlock withSyntaxHighlighting language="jsx" showCopyButton
                                               marginBottom="micro">
                                        {[
                                            `// Paste this in your content file`,
                                            `const [value, setValue] = useState(${rangeValue});`,
                                            ` `,
                                            `<Range`,
                                            showLabel ? `    label="${rangeLabel}"` : null,
                                            `    value={value}`,
                                            `    onChange={(value) => setValue(value)}`,
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
                                            onChange={(value : React.SetStateAction<string>) => setRangeLabel(value)}
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
                                        onChange={(value : React.SetStateAction<string>) => setSelectedMin(Number(value))}
                                    />
                                </Portion>

                                {/* MAX VALUE ===================================================================== */}
                                <Portion desktopSpan="half">
                                    <InputField
                                        type="number"
                                        label="Max value"
                                        value={selectedMax}
                                        onChange={(value : React.SetStateAction<string>) => setSelectedMax(Number(value))}
                                    />
                                </Portion>

                                {/* STEP VALUE ==================================================================== */}
                                <Portion>
                                    <InputField
                                        type="number"
                                        label="Step size"
                                        value={selectedStep}
                                        onChange={(value : React.SetStateAction<string>) => setSelectedStep(Number(value))}
                                    />

                                    <Divider kind="secondary" horizontalMargin="none" verticalMargin="nano" />
                                </Portion>

                                {/* SUFFIX ======================================================================== */}
                                <Portion>
                                    <InputField
                                        type="text"
                                        label="Suffix"
                                        value={selectedSuffix}
                                        onChange={(value : React.SetStateAction<string>) => setSelectedSuffix((value))}
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
                                        options={[ {
                                            label    : "Select a colour",
                                            value    : "select-a-colour",
                                            disabled : true,
                                            selected : true,
                                        },
                                            ...colourOptions ]}
                                        defaultValue={componentVariables["range-track-bg"].defaultValue || "select-a-colour"}
                                        onChange={(value) => handleVariableChange("range-track-bg", value)}
                                        isFullWidth
                                    />
                                </Portion>

                                {/* THUMB BACKGROUND ============================================================= */}
                                <Portion desktopSpan="half">
                                    <Select
                                        label="Thumb background"
                                        options={[ {
                                            label    : "Select a colour",
                                            value    : "select-a-colour",
                                            disabled : true,
                                            selected : true,
                                        },
                                            ...colourOptions ]}
                                        defaultValue={componentVariables["range-thumb-bg"].defaultValue || "select-a-colour"}
                                        onChange={(value) => handleVariableChange("range-thumb-bg", value)}
                                        isFullWidth
                                    />
                                </Portion>

                                {/* THUMB BORDER ================================================================ */}
                                <Portion desktopSpan="half">
                                    <Select
                                        label="Thumb border"
                                        options={[ {
                                            label    : "Select a colour",
                                            value    : "select-a-colour",
                                            disabled : true,
                                            selected : true,
                                        },
                                            ...colourOptions ]}
                                        defaultValue={componentVariables["range-thumb-border"].defaultValue || "select-a-colour"}
                                        onChange={(value) => handleVariableChange("range-thumb-border", value)}
                                        isFullWidth
                                    />
                                </Portion>

                                {/* FOCUS BORDER ================================================================= */}
                                <Portion desktopSpan="half">
                                    <Select
                                        label="Focus border"
                                        options={[ {
                                            label    : "Select a colour",
                                            value    : "select-a-colour",
                                            disabled : true,
                                            selected : true,
                                        },
                                            ...colourOptions ]}
                                        defaultValue={componentVariables["range-border-focus"].defaultValue || "select-a-colour"}
                                        onChange={(value) => handleVariableChange("range-border-focus", value)}
                                        isFullWidth
                                    />
                                </Portion>

                                {/* FOCUS OUTLINE ================================================================ */}
                                <Portion desktopSpan="half">
                                    <Select
                                        label="Focus outline"
                                        options={[ {
                                            label    : "Select a colour",
                                            value    : "select-a-colour",
                                            disabled : true,
                                            selected : true,
                                        },
                                            ...colourOptions ]}
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

            <Divider kind="primary" horizontalMargin="huge" verticalMargin="medium" />

            {/* //////////////////////////////////////////////////////////////////////////////////////////////////// */}
            {/*  DUAL-THUMB CONFIGURATOR */}
            {/* //////////////////////////////////////////////////////////////////////////////////////////////////// */}
            <Row horizontalPadding="huge" marginTop="medium" marginBottom="tiny">
                <Portion>
                    <Heading4>Dual-Thumb Range</Heading4>
                    <Text marginBottom="micro">
                        Select a range of values by passing an array <code>[min, max]</code> to
                        the <code>value</code> prop.
                        The <code>onChange</code> handler receives the updated array with both values.
                    </Text>
                </Portion>
            </Row>

            <Row horizontalPadding="small" className="rendered-component">
                {/* DEMO COMPONENT ///////////////////////////////////////////////////////////////////////////////// */}
                <Portion id="component-wrapper">
                    <Element
                        as="div" padding="small" shape="rounded" bgColour="slate-light80"
                        data-centered-children
                    >
                        <Range
                            id="dual-range"
                            label={showDualLabel ? dualRangeLabel : undefined}
                            value={dualRangeValue}
                            onChange={(value: React.SetStateAction<[number, number]>) => setDualRangeValue(value)}
                            min={dualMin}
                            max={dualMax}
                            step={dualStep}
                            suffix={dualSuffix}
                            minLabel="Minimum value"
                            maxLabel="Maximum value"
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
                                    <CodeBlock withSyntaxHighlighting language="jsx" showCopyButton
                                               marginBottom="micro">
                                        {[
                                            `// Paste this in your content file`,
                                            `const [value, setValue] = useState<[number, number]>([${dualRangeValue[0]}, ${dualRangeValue[1]}]);`,
                                            ` `,
                                            `<Range`,
                                            `    id="dual-range"`,
                                            showDualLabel ? `    label="${dualRangeLabel}"` : null,
                                            `    value={value}`,
                                            `    onChange={(value) => setValue(value)}`,
                                            `    min={${dualMin}}`,
                                            `    max={${dualMax}}`,
                                            `    step={${dualStep}}`,
                                            dualSuffix ? `    suffix="${dualSuffix}"` : null,
                                            `    minLabel="Minimum value"`,
                                            `    maxLabel="Maximum value"`,
                                            `/>`,
                                        ].filter(Boolean).join("\n")}
                                    </CodeBlock>
                                </Portion>

                                {/* SHOW LABEL ===================================================================== */}
                                <Portion>
                                    <Checkbox
                                        id="checkbox-dual-label"
                                        name="checkbox-dual-label"
                                        label="Show label"
                                        checked={showDualLabel}
                                        onChange={() => setShowDualLabel(!showDualLabel)}
                                    />

                                    <Divider kind="secondary" horizontalMargin="none" verticalMargin="nano" />
                                </Portion>

                                {/* LABEL TEXT ==================================================================== */}
                                {showDualLabel && (
                                    <Portion>
                                        <InputField
                                            type="text"
                                            label="Label text"
                                            value={dualRangeLabel}
                                            onChange={(value) => setDualRangeLabel(value)}
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
                                        value={dualMin}
                                        onChange={(value) => setDualMin(Number(value))}
                                    />
                                </Portion>

                                {/* MAX VALUE ===================================================================== */}
                                <Portion desktopSpan="half">
                                    <InputField
                                        type="number"
                                        label="Max value"
                                        value={dualMax}
                                        onChange={(value) => setDualMax(Number(value))}
                                    />
                                </Portion>

                                {/* STEP VALUE ==================================================================== */}
                                <Portion>
                                    <InputField
                                        type="number"
                                        label="Step size"
                                        value={dualStep}
                                        onChange={(value) => setDualStep(Number(value))}
                                    />

                                    <Divider kind="secondary" horizontalMargin="none" verticalMargin="nano" />
                                </Portion>

                                {/* SUFFIX ======================================================================== */}
                                <Portion>
                                    <InputField
                                        type="text"
                                        label="Suffix"
                                        value={dualSuffix}
                                        onChange={(value) => setDualSuffix(value)}
                                    />
                                </Portion>

                                {/* CURRENT VALUES ================================================================ */}
                                <Portion>
                                    <Divider kind="secondary" horizontalMargin="none" verticalMargin="nano" />
                                    <Text size="small" marginTop="nano">
                                        <strong>Current range:</strong> {dualRangeValue[0]} – {dualRangeValue[1]}
                                    </Text>
                                </Portion>
                            </Row>
                        </Card>
                    </Form>
                </Portion>
            </Row>
        </Article>
    );
};

export default RangeDocs;
