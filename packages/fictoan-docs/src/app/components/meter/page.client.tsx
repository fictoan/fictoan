"use client";

// REACT CORE ==========================================================================================================
import React from "react";

// UI ==================================================================================================================
import { Div, Heading4, Divider, Portion, Row, Article, Meter, Section, Heading6, Text, Range, Card } from "fictoan-react";

// LOCAL COMPONENTS ====================================================================================================
import { PropsConfigurator } from "$components/PropsConfigurator/PropsConfigurator";

// UTILS ===============================================================================================================
import { createThemeConfigurator } from "$utils/themeConfigurator";

// STYLES ==============================================================================================================
import "../../../styles/fictoan-theme.css";
import "./page-meter.css";

const MeterDocs = () => {
    const [ props, setProps ] = React.useState<{ [key: string]: any }>({});
    
    // Interactive controls for numeric values
    const [ minValue, setMinValue ] = React.useState(0);
    const [ maxValue, setMaxValue ] = React.useState(100);
    const [ lowValue, setLowValue ] = React.useState(25);
    const [ highValue, setHighValue ] = React.useState(75);
    const [ optimumValue, setOptimumValue ] = React.useState(90);
    const [ currentValue, setCurrentValue ] = React.useState(50);
    const [ heightValue, setHeightValue ] = React.useState(24);

    const MeterComponent = (varName : string) => {
        return varName.startsWith("meter-");
    };

    const {
        interactiveElementRef,
        componentProps : themeConfig,
        themeConfigurator,
    } = createThemeConfigurator("Meter", MeterComponent);

    return (
        <Article id="page-meter">
            {/*  INTRO ///////////////////////////////////////////////////////////////////////////////////////////// */}
            <Section>
                <Row horizontalPadding="huge" marginTop="medium" marginBottom="small">
                    <Portion>
                        <Heading4 id="component-name">
                            Meter
                        </Heading4>

                        <Heading6
                            id="component-description"
                            weight="400" marginBottom="small"
                        >
                            A bar to measure a scalar value within a known range, usually used to measure percentages
                        </Heading6>
                    </Portion>

                    <Portion>
                        <ul>
                            <li>Always takes up 100% width of its parent</li>
                            <li>
                                The range of values containing the <code>optimum</code> value gets
                                the <code>high</code> colour, currently set to green
                            </li>
                            <li>
                                The next range of values gets the <code>low</code> threshold colour, currently set to
                                amber
                            </li>
                            <li>
                                The range of values furthest from that gets the <code>low</code> threshold colour,
                                currently set to red
                            </li>
                        </ul>
                    </Portion>
                </Row>
            </Section>

            <Divider kind="primary" horizontalMargin="huge" verticalMargin="small" />

            {/* INTERACTIVE COMPONENT ////////////////////////////////////////////////////////////////////////////// */}
            <Section>
                {/* DEMO COMPONENT ================================================================================= */}
                <Row id="component-wrapper" horizontalPadding="small" className="rendered-component">
                    <Portion>
                        <Div
                            padding="small"
                            shape="rounded"
                            bgColour="slate-light80"
                        >
                            <Meter
                                ref={interactiveElementRef}
                                min={minValue}
                                max={maxValue}
                                low={lowValue}
                                high={highValue}
                                value={currentValue}
                                optimum={optimumValue}
                                height={`${heightValue}px`}
                                label={props.label || "Sample meter"}
                                suffix={props.suffix || "%"}
                                {...props}
                                {...themeConfig}
                            />
                        </Div>
                    </Portion>
                </Row>

                <Row horizontalPadding="small">
                    {/* INTERACTIVE CONFIGURATOR ================================================================== */}
                    <Portion desktopSpan="half">
                        <Card padding="micro" shape="rounded">
                            <Text size="large" weight="700" textColour="white" marginBottom="micro">
                                Configure props
                            </Text>

                            {/* MIN/MAX VALUES */}
                            <Row marginBottom="micro">
                                <Portion desktopSpan="half">
                                    <Range
                                        label="Min value"
                                        value={minValue}
                                        onChange={(value) => setMinValue(Number(value))}
                                        min={0}
                                        max={50}
                                        step={1}
                                    />
                                </Portion>
                                <Portion desktopSpan="half">
                                    <Range
                                        label="Max value"
                                        value={maxValue}
                                        onChange={(value) => setMaxValue(Number(value))}
                                        min={50}
                                        max={200}
                                        step={1}
                                    />
                                </Portion>
                            </Row>

                            {/* LOW/HIGH THRESHOLDS */}
                            <Row marginBottom="micro">
                                <Portion desktopSpan="half">
                                    <Range
                                        label="Low threshold"
                                        value={lowValue}
                                        onChange={(value) => setLowValue(Number(value))}
                                        min={minValue}
                                        max={maxValue}
                                        step={1}
                                    />
                                </Portion>
                                <Portion desktopSpan="half">
                                    <Range
                                        label="High threshold"
                                        value={highValue}
                                        onChange={(value) => setHighValue(Number(value))}
                                        min={minValue}
                                        max={maxValue}
                                        step={1}
                                    />
                                </Portion>
                            </Row>

                            {/* OPTIMUM/CURRENT VALUES */}
                            <Row marginBottom="micro">
                                <Portion desktopSpan="half">
                                    <Range
                                        label="Optimum value"
                                        value={optimumValue}
                                        onChange={(value) => setOptimumValue(Number(value))}
                                        min={minValue}
                                        max={maxValue}
                                        step={1}
                                    />
                                </Portion>
                                <Portion desktopSpan="half">
                                    <Range
                                        label="Current value"
                                        value={currentValue}
                                        onChange={(value) => setCurrentValue(Number(value))}
                                        min={minValue}
                                        max={maxValue}
                                        step={1}
                                        suffix={props.suffix || "%"}
                                    />
                                </Portion>
                            </Row>

                            {/* HEIGHT VALUE */}
                            <Row marginBottom="micro">
                                <Portion desktopSpan="half">
                                    <Range
                                        label="Height"
                                        value={heightValue}
                                        onChange={(value) => setHeightValue(Number(value))}
                                        min={8}
                                        max={100}
                                        step={1}
                                        suffix="px"
                                    />
                                </Portion>
                            </Row>

                            {/* OTHER PROPS CONFIGURATOR */}
                            <PropsConfigurator componentName="Meter" onPropsChange={setProps} />
                        </Card>
                    </Portion>

                    {/* THEME CONFIGURATOR ========================================================================= */}
                    <Portion desktopSpan="half">
                        {themeConfigurator()}
                    </Portion>
                </Row>
            </Section>

        </Article>
    );
};

export default MeterDocs;
