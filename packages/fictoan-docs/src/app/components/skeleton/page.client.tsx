"use client";

import React, { useState } from "react";
import {
    Heading1,
    Divider,
    Portion,
    Row,
    Text,
    Article,
    Card,
    Form,
    Header,
    RadioTabGroup,
    InputField,
    CodeBlock,
    Select,
    Skeleton,
    SkeletonGroup,
    Div, Range,
} from "fictoan-react";

import "./page-skeleton.css";

import { useThemeVariables } from "../../../utils/useThemeVariables";
import { colourOptions } from "../../colour/colours";
import { skeletonProps } from "./config";

const SkeletonDocs = () => {
    const { componentVariables, handleVariableChange, cssVariablesList } = useThemeVariables(skeletonProps.variables);

    // Group props
    const [direction, setDirection] = useState("vertical");
    const [repeat, setRepeat] = useState(3);
    const [spacing, setSpacing] = useState("micro");
    const [groupEffect, setGroupEffect] = useState("wave");

    // Child Skeleton props
    const [width, setWidth] = useState("200px");
    const [height, setHeight] = useState("12px");
    const [variant, setVariant] = useState("line");
    const [shape, setShape] = useState("rounded");

    // Add handler for variant change that updates height for circles
    const handleVariantChange = (value) => {
        const newVariant = value;
        setVariant(newVariant);

        // If switching to circle variant, set height to match width
        if (newVariant === "circle") {
            setHeight(width);
        }
    };

    // Add handler for width change that updates height for circles
    const handleWidthChange = (value) => {
        const newWidth = value;
        setWidth(newWidth);

        // If circle variant, update height to match width
        if (variant === "circle") {
            setHeight(newWidth);
        }
    };

    return (
        <Article id="page-skeleton">
            <Row horizontalPadding="huge" marginTop="medium" marginBottom="small">
                <Portion>
                    <Heading1>Skeleton</Heading1>
                    <Text size="large" marginBottom="small">
                        A placeholder preview for content that is loading, with grouping capabilities.
                    </Text>
                </Portion>
            </Row>

            <Divider kind="primary" horizontalMargin="huge" verticalMargin="small" />

            <Row horizontalPadding="small" className="rendered-component">
                {/* DEMO COMPONENT */}
                <Portion id="component-wrapper">
                    <Div
                        padding="small"
                        shape="rounded"
                        bgColour="slate-light80"
                        data-centered-children
                    >
                        <SkeletonGroup
                            direction={direction}
                            repeat={repeat}
                            spacing={spacing}
                            effect={groupEffect}
                        >
                            <Skeleton
                                width={width}
                                height={height}
                                variant={variant}
                                shape={shape}
                            />
                        </SkeletonGroup>
                    </Div>
                </Portion>

                {/* CONFIGURATOR /////////////////////////////////////////////////////////////////////////////////// */}
                <Portion desktopSpan="half">
                    <Form>
                        <Card padding="micro" shape="rounded">
                            <Header verticallyCentreItems pushItemsToEnds marginBottom="micro">
                                <Text size="large" weight="700" textColour="white">
                                    Customise props
                                </Text>
                            </Header>

                            <Row marginBottom="none">
                                <Portion>
                                    <CodeBlock withSyntaxHighlighting language="jsx" showCopyButton marginBottom="micro">
                                        {[
                                            `// Paste this in your content file`,
                                            `<SkeletonGroup`,
                                            `    direction="${direction}"`,
                                            `    repeat="${repeat}"`,
                                            `    spacing="${spacing}"`,
                                            `    effect="${groupEffect}"`,
                                            `>`,
                                            `    <Skeleton`,
                                            `        width="${width}" height="${height}"`,
                                            `        variant="${variant}"`,
                                            `        shape="${shape}"`,
                                            `    />`,
                                            `</SkeletonGroup>`,
                                        ].filter(Boolean).join("\n")}
                                    </CodeBlock>
                                </Portion>

                                {/* GROUP CONFIGURATION */}
                                <Portion>
                                    <Text weight="700" marginBottom="nano">Group properties</Text>
                                </Portion>

                                <Portion desktopSpan="half">
                                    <RadioTabGroup
                                        id="direction"
                                        label="Direction"
                                        name="direction"
                                        options={[
                                            { id : "vertical", value : "vertical", label : "vertical" },
                                            { id : "horizontal", value : "horizontal", label : "horizontal" },
                                        ]}
                                        value={direction}
                                        onChange={(value) => setDirection(value)}
                                    />
                                </Portion>

                                <Portion desktopSpan="half">
                                    <Range
                                        label="Repeat"
                                        value={repeat}
                                        onChange={(value) => setRepeat(parseInt(value))}
                                        min={1} max={10} step={1}
                                    />
                                </Portion>

                                <Portion>
                                    <RadioTabGroup
                                        id="spacing"
                                        label="Spacing"
                                        name="spacing"
                                        options={[
                                            { id : "spacing-nano", value : "nano", label : "nano" },
                                            { id : "spacing-micro", value : "micro", label : "micro" },
                                            { id : "spacing-tiny", value : "tiny", label : "tiny" },
                                            { id : "spacing-small", value : "small", label : "small" },
                                            { id : "spacing-medium", value : "medium", label : "medium" },
                                            { id : "spacing-large", value : "large", label : "large" },
                                            { id : "spacing-huge", value : "huge", label : "huge" },
                                        ]}
                                        value={spacing}
                                        onChange={(value) => setSpacing(value)}
                                    />
                                </Portion>

                                <Portion>
                                    <RadioTabGroup
                                        id="effect"
                                        label="Effect"
                                        name="effect"
                                        options={[
                                            { id : "effect-none", value : "none", label : "none" },
                                            { id : "effect-pulse", value : "pulse", label : "pulse" },
                                            { id : "effect-wave", value : "wave", label : "wave" },
                                        ]}
                                        value={groupEffect}
                                        onChange={(value) => setGroupEffect(value)}
                                    />
                                </Portion>
                            </Row>

                            <Divider kind="secondary" horizontalMargin="none" verticalMargin="micro" />

                            <Row marginBottom="none">
                                {/* CHILD SKELETON CONFIGURATION */}
                                <Portion>
                                    <Text weight="700" marginBottom="nano">Child Skeleton Properties</Text>
                                </Portion>

                                <Portion desktopSpan="half">
                                    <InputField
                                        type="text"
                                        label="Width"
                                        placeholder="Width"
                                        value={width}
                                        onChange={handleWidthChange}
                                    />
                                </Portion>

                                <Portion desktopSpan="half">
                                    <InputField
                                        type="text"
                                        label="Height"
                                        placeholder="Height"
                                        value={height}
                                        onChange={(value) => setHeight(value)}
                                        disabled={variant === "circle"}
                                        helpText={variant === "circle" ? "Height matches width for circles" : undefined}
                                    />
                                </Portion>

                                <Portion desktopSpan="half">
                                    <RadioTabGroup
                                        id="variant"
                                        label="Variant"
                                        name="variant"
                                        options={[
                                            { id : "variant-line", value : "line", label : "line" },
                                            { id : "variant-circle", value : "circle", label : "circle" },
                                            { id : "variant-block", value : "block", label : "block" },
                                        ]}
                                        value={variant}
                                        onChange={handleVariantChange}
                                    />
                                </Portion>

                                <Portion desktopSpan="half">
                                    <RadioTabGroup
                                        id="shape"
                                        label="Shape"
                                        name="shape"
                                        options={[
                                            { id : "shape-none", value : "none", label : "none" },
                                            { id : "shape-rounded", value : "rounded", label : "rounded" },
                                        ]}
                                        value={shape}
                                        onChange={(value) => setShape(value)}
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

                                <Portion desktopSpan="half">
                                    <Select
                                        label="Background colour"
                                        options={[{
                                            label    : "Select a colour",
                                            value    : "select-a-colour",
                                            disabled : true,
                                            selected : true,
                                        },
                                            ...colourOptions,
                                        ]}
                                        defaultValue={skeletonProps.variables["skeleton-bg"].defaultValue || "select-a-colour"}
                                        onChange={(value) => handleVariableChange("skeleton-bg", value)}
                                        isFullWidth
                                    />
                                </Portion>

                                <Portion desktopSpan="half">
                                    <Select
                                        label="Highlight colour"
                                        options={[{
                                            label    : "Select a colour",
                                            value    : "select-a-colour",
                                            disabled : true,
                                            selected : true,
                                        },
                                            ...colourOptions,
                                        ]}
                                        defaultValue={skeletonProps.variables["skeleton-highlight"].defaultValue || "select-a-colour"}
                                        onChange={(value) => handleVariableChange("skeleton-highlight", value)}
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

export default SkeletonDocs;
