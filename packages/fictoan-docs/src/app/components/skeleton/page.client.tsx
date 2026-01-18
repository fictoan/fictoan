"use client";

// REACT CORE ==========================================================================================================
import React, { useState, useMemo } from "react";

// UI ==================================================================================================================
import {
    Div,
    Heading2,
    Text,
    Divider,
    CodeBlock,
    RadioTabGroup,
    InputField,
    Range,
    Skeleton,
    SkeletonGroup,
} from "fictoan-react";

// UTILS ===============================================================================================================
import { createThemeConfigurator } from "$utils/themeConfigurator";

// STYLES ==============================================================================================================
import "../../../styles/fictoan-theme.css";
import "./page-skeleton.css";

// OTHER ===============================================================================================================
import { ComponentDocsLayout } from "../ComponentDocsLayout";

const SkeletonDocs = () => {
    // SkeletonGroup props
    const [direction, setDirection] = useState("vertical");
    const [repeat, setRepeat] = useState(3);
    const [spacing, setSpacing] = useState("micro");
    const [effect, setEffect] = useState("wave");

    // Skeleton props
    const [width, setWidth] = useState("200px");
    const [height, setHeight] = useState("12px");
    const [variant, setVariant] = useState("line");
    const [shape, setShape] = useState("rounded");

    // Theme configurator
    const SkeletonComponent = (varName: string) => {
        return varName.startsWith("skeleton-");
    };

    const {
        interactiveElementRef,
        componentProps: themeProps,
        themeConfigurator,
    } = createThemeConfigurator("Skeleton", SkeletonComponent);

    // Handle variant change - update height for circles
    const handleVariantChange = (value: string) => {
        setVariant(value);
        if (value === "circle") {
            setHeight(width);
        }
    };

    // Handle width change - update height for circles
    const handleWidthChange = (value: string) => {
        setWidth(value);
        if (variant === "circle") {
            setHeight(value);
        }
    };

    // Generate code
    const codeString = useMemo(() => {
        const groupProps = [];
        if (direction !== "vertical") groupProps.push(`    direction="${direction}"`);
        if (repeat !== 1) groupProps.push(`    repeat={${repeat}}`);
        if (spacing !== "small") groupProps.push(`    spacing="${spacing}"`);
        if (effect !== "wave") groupProps.push(`    effect="${effect}"`);

        const skeletonProps = [];
        skeletonProps.push(`        width="${width}"`);
        skeletonProps.push(`        height="${height}"`);
        if (variant !== "line") skeletonProps.push(`        variant="${variant}"`);
        if (shape !== "none") skeletonProps.push(`        shape="${shape}"`);

        const groupPropsString = groupProps.length > 0 ? `\n${groupProps.join("\n")}\n` : "";

        return `<SkeletonGroup${groupPropsString}>
    <Skeleton
${skeletonProps.join("\n")}
    />
</SkeletonGroup>`;
    }, [direction, repeat, spacing, effect, width, height, variant, shape]);

    return (
        <ComponentDocsLayout pageId="page-skeleton">
            {/* INTRO HEADER /////////////////////////////////////////////////////////////////////////////////////// */}
            <Div id="intro-header">
                <Heading2 id="component-name">
                    Skeleton
                </Heading2>

                <Text id="component-description" weight="400">
                    A placeholder preview for content that is loading, with grouping capabilities
                </Text>
            </Div>

            {/* INTRO NOTES //////////////////////////////////////////////////////////////////////////////////////// */}
            <Div id="intro-notes">
                <Divider kind="tertiary" verticalMargin="micro" />

                <Text>
                    Use <code>SkeletonGroup</code> to repeat and animate multiple skeletons together.
                    Supports pulse and wave effects, with configurable direction and spacing.
                </Text>
            </Div>

            {/* DEMO COMPONENT ///////////////////////////////////////////////////////////////////////////////////// */}
            <Div id="demo-component">
                <SkeletonGroup
                    // @ts-ignore
                    ref={interactiveElementRef}
                    direction={direction as "vertical" | "horizontal"}
                    repeat={repeat}
                    spacing={spacing as any}
                    effect={effect as "pulse" | "wave" | "none"}
                    {...themeProps}
                >
                    <Skeleton
                        width={width}
                        height={height}
                        variant={variant as "line" | "circle" | "block"}
                        shape={shape as any}
                    />
                </SkeletonGroup>
            </Div>

            {/* PROPS CONFIG /////////////////////////////////////////////////////////////////////////////////////// */}
            <Div id="props-config">
                <CodeBlock language="tsx" withSyntaxHighlighting showCopyButton>
                    {codeString}
                </CodeBlock>

                <Div className="doc-controls">
                    <Text weight="700" marginBottom="nano">SkeletonGroup</Text>

                    <RadioTabGroup
                        id="prop-direction"
                        label="direction"
                        options={[
                            { id: "dir-vertical", value: "vertical", label: "vertical" },
                            { id: "dir-horizontal", value: "horizontal", label: "horizontal" },
                        ]}
                        value={direction}
                        onChange={(value) => setDirection(value)}
                        marginBottom="micro"
                    />

                    <Range
                        label="repeat"
                        value={repeat}
                        onChange={(value: number) => setRepeat(value)}
                        min={1}
                        max={10}
                        step={1}
                        marginBottom="micro"
                        isFullWidth
                    />

                    <RadioTabGroup
                        id="prop-spacing"
                        label="spacing"
                        options={[
                            { id: "spacing-nano", value: "nano", label: "nano" },
                            { id: "spacing-micro", value: "micro", label: "micro" },
                            { id: "spacing-tiny", value: "tiny", label: "tiny" },
                            { id: "spacing-small", value: "small", label: "small" },
                            { id: "spacing-medium", value: "medium", label: "medium" },
                        ]}
                        value={spacing}
                        onChange={(value) => setSpacing(value)}
                        marginBottom="micro"
                    />

                    <RadioTabGroup
                        id="prop-effect"
                        label="effect"
                        options={[
                            { id: "effect-none", value: "none", label: "none" },
                            { id: "effect-pulse", value: "pulse", label: "pulse" },
                            { id: "effect-wave", value: "wave", label: "wave" },
                        ]}
                        value={effect}
                        onChange={(value) => setEffect(value)}
                        marginBottom="micro"
                    />

                    <Divider kind="secondary" verticalMargin="micro" />

                    <Text weight="700" marginBottom="nano">Skeleton</Text>

                    <InputField
                        label="width"
                        value={width}
                        onChange={handleWidthChange}
                        marginBottom="micro"
                        isFullWidth
                    />

                    <InputField
                        label="height"
                        value={height}
                        onChange={(value) => setHeight(value)}
                        disabled={variant === "circle"}
                        helpText={variant === "circle" ? "Height matches width for circles" : undefined}
                        marginBottom="micro"
                        isFullWidth
                    />

                    <RadioTabGroup
                        id="prop-variant"
                        label="variant"
                        options={[
                            { id: "variant-line", value: "line", label: "line" },
                            { id: "variant-circle", value: "circle", label: "circle" },
                            { id: "variant-block", value: "block", label: "block" },
                        ]}
                        value={variant}
                        onChange={handleVariantChange}
                        marginBottom="micro"
                    />

                    <RadioTabGroup
                        id="prop-shape"
                        label="shape"
                        options={[
                            { id: "shape-none", value: "none", label: "none" },
                            { id: "shape-rounded", value: "rounded", label: "rounded" },
                        ]}
                        value={shape}
                        onChange={(value) => setShape(value)}
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

export default SkeletonDocs;
