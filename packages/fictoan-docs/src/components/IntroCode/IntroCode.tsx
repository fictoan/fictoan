"use client";

// REACT CORE ==========================================================================================================
import Link from "next/link";
import React, { useState } from "react";

// UI ==================================================================================================================
import {
    Button,
    Div,
    Heading1,
    Heading4,
    Heading5,
    Portion,
    Row,
    Switch,
    Text,
    CodeBlock,
    type SpacingTypes,
    type WeightTypes,
    type SpanTypes,
    type ColourPropTypes,
    type EmphasisTypes,
} from "fictoan-react";

// STYLES ==============================================================================================================
import "./intro-code.css";

export const IntroCode = () => {
    const flipACoin = () => Math.random() >= 0.5;

    const [rowProps, setRowProps] = useState<{
        horizontalPadding: SpacingTypes;
        marginTop: SpacingTypes;
        marginBottom: SpacingTypes;
    }>({
        horizontalPadding : "medium",
        marginTop         : "tiny",
        marginBottom      : "tiny",
    });

    const [portion1Props, setPortion1Props] = useState<{
        desktopSpan: SpanTypes;
    }>({
        desktopSpan : "half",
    });

    const [portion2Props, setPortion2Props] = useState<{
        desktopSpan: SpanTypes;
    }>({
        desktopSpan : "half",
    });

    const [mainHeadingProps, setMainHeadingProps] = useState<{
        textColour: ColourPropTypes;
        marginBottom: SpacingTypes;
        weight: WeightTypes;
    }>({
        textColour   : "blue",
        marginBottom : "nano",
        weight       : "700",
    });

    const [taglineProps, setTaglineProps] = useState<{
        textColour: ColourPropTypes;
        marginBottom: SpacingTypes;
        weight: WeightTypes;
    }>({
        textColour   : "blue-light30",
        marginBottom : "micro",
        weight       : "400",
    });

    const [subHeading1Props, setSubHeading1Props] = useState<{
        weight: WeightTypes;
        marginBottom: SpacingTypes;
    }>({
        weight       : "400",
        marginBottom : "micro",
    });

    const [subHeading2Props, setSubHeading2Props] = useState<{
        weight: WeightTypes;
        marginBottom: SpacingTypes;
    }>({
        weight       : "400",
        marginBottom : "micro",
    });

    const [buttonProps, setButtonProps] = useState<{
        kind: EmphasisTypes;
    }>({
        kind : "primary",
    });

    const handleCodeChange = (newContent: string) => {
        const newProps = parseCodeToProperties(newContent);

        // Update all component props based on parsed content
        setRowProps(prev => ({ ...prev, ...newProps.Row } as typeof prev));

        // Update portions
        if (newProps.Portion[0]) setPortion1Props(newProps.Portion[0] as typeof portion1Props);
        if (newProps.Portion[1]) setPortion2Props(newProps.Portion[1] as typeof portion2Props);

        // Update headings
        setMainHeadingProps(prev => ({ ...prev, ...newProps.Heading1 } as typeof prev));
        if (newProps.Heading5[0]) setSubHeading1Props(prev => ({ ...prev, ...newProps.Heading5[0] } as typeof prev));
        if (newProps.Heading5[1]) setSubHeading2Props(prev => ({ ...prev, ...newProps.Heading5[1] } as typeof prev));

        // Update button
        setButtonProps(prev => ({ ...prev, ...newProps.Button } as typeof prev));
    };

    const parseCodeToProperties = (codeContent: string) => {
        const propRegex = /<(Heading1|Heading5|Row|Portion|Button)\s+(.*?)>/gs;
        const propertiesRegex = /(\w+)="([^"]+)"/g;
        const newProps: {
            Row: Record<string, string>;
            Portion: Record<string, string>[];
            Heading1: Record<string, string>;
            Heading5: Record<string, string>[];
            Button: Record<string, string>;
        } = {
            Row      : {},
            Portion  : [],
            Heading1 : {},
            Heading5 : [],
            Button   : {},
        };

        let tagMatch;
        while ((
            tagMatch = propRegex.exec(codeContent)
        ) !== null) {
            const tagName = tagMatch[1] as "Heading1" | "Heading5" | "Row" | "Portion" | "Button";
            const tagProperties = tagMatch[2];
            let tagProps: Record<string, string> = {};

            let propsMatch;
            while ((
                propsMatch = propertiesRegex.exec(tagProperties)
            ) !== null) {
                const propName = propsMatch[1];
                const propValue = propsMatch[2];
                tagProps[propName] = propValue;
            }

            if (tagName === "Portion" || tagName === "Heading5") {
                newProps[tagName].push(tagProps);
            } else {
                newProps[tagName] = tagProps;
            }
        }

        return newProps;
    };


    const [vizMode, setVizMode] = useState(true);
    const numberOfPortions = 24;

    return (
        <Div id="intro-code">
            {/* ROW VISUALISATION ================================================================================== */}
            <Div id="viz-row-wrapper">
                {vizMode && (
                    <Row id="viz-row" horizontalPadding={rowProps.horizontalPadding} retainLayoutAlways>
                        {Array.from({ length : numberOfPortions }, (_, index) => (
                            <Portion key={index} desktopSpan="1">
                                <Text align="centre">{index + 1}</Text>
                            </Portion>
                        ))}
                    </Row>
                )}

                {/* MAIN ROW =========================================================================================== */}
                <Row {...rowProps}>
                    <Portion {...portion1Props} className={`demo-portion ${vizMode ? "border-red" : ""}`}>
                        <Heading1 {...mainHeadingProps} fontStyle="serif">
                            As simple as describing it
                        </Heading1>

                        <Heading4 {...taglineProps}>
                            Props that make sense at first glance
                        </Heading4>

                        <Link href="/getting-started">
                            <Button {...buttonProps}>
                                Get started &rarr;
                            </Button>
                        </Link>

                        {vizMode && (
                            <Text className="portion-width-indicator">
                                {portion1Props.desktopSpan}
                            </Text>
                        )}
                    </Portion>

                    <Portion {...portion2Props} className={`demo-portion ${vizMode ? "border-red" : ""}`}>
                        <Heading5 {...subHeading1Props}>
                            No abbreviations to decode. No documentation to dig through. Just readable syntax.
                        </Heading5>

                        <Heading5 {...subHeading2Props}>
                            Go ahead—edit the code below.
                        </Heading5>

                        {vizMode && (
                            <Text className="portion-width-indicator">
                                {portion2Props.desktopSpan}
                            </Text>
                        )}
                    </Portion>
                </Row>
            </Div>

            {/* EDITABLE CODE BLOCK ================================================================================ */}
            <Row horizontalPadding="medium" gutters="large" verticalMargin="small">
                <Portion>
                    <Div verticallyCentreItems pushItemsToEnds>
                        <Text textColour="blue" weight="700">
                            GO AHEAD, EDIT THESE PROPS AND VALUES HERE—
                        </Text>

                        <Switch
                            id="viz-switch"
                            name="viz-switch"
                            label="Visualise the Row"
                            checked={vizMode}
                            onChange={(checked) => setVizMode(checked)}
                        />
                    </Div>
                </Portion>

                <Portion>
                    <Div id="intro-code-block">
                        <CodeBlock
                            withSyntaxHighlighting
                            language="jsx"
                            showCopyButton
                            makeEditable
                            suppressContentEditableWarning={true}
                            onChange={handleCodeChange}
                            marginBottom="micro" shadow="soft"
                        >
                            {[
                                `<Row horizontalPadding="medium" marginTop="tiny" marginBottom="small"> {/* Try "none", "small", "medium", "large" or "huge" */}`,
                                `    <Portion desktopSpan="half"> {/* Try "one-third", or whole numbers between 1–24 */}`,
                                `        <Heading1 textColour="blue-light20" marginBottom="nano" weight="700">`,
                                `            As simple as describing it.`,
                                `        </Heading1> \n`,
                                `        <Heading4 marginBottom="micro">`,
                                `            Props that make sense at first glance`,
                                `        </Heading4> \n`,
                                `        <Button kind="primary"> {/* "secondary", or kind="custom" with bgColour="amber" textColour="black" */}`,
                                `            Get started &rarr;`,
                                `        </Button>`,
                                `    </Portion> \n`,
                                `    <Portion desktopSpan="half"> {/* Try adding mobileSpan="half" */}`,
                                `        <Heading5 weight="400" marginBottom="micro">`,
                                `            No abbreviations to decode. No documentation to dig through. Just readable syntax.`,
                                `        </Heading5>\n`,
                                `        <Heading5 weight="400" marginBottom="micro">`,
                                `            Go ahead—try editing this code.`,
                                `        </Heading5>`,
                                `    </Portion>`,
                                `</Row>`,
                            ].filter(Boolean).join("\n")}
                        </CodeBlock>

                        <Heading5 weight="400">
                            Wasn&rsquo;t that some simple, elegant syntax?
                        </Heading5>
                    </Div>
                </Portion>
            </Row>
        </Div>
    );
};
