"use client";

// REACT CORE ==========================================================================================================
import React, { useState } from "react";

// UI ==================================================================================================================
import {
    Element,
    Card,
    Heading2,
    Text,
    Divider,
    Portion,
    Row,
    Callout,
    Article,
    Div,
    CodeBlock,
    Section,
    oklchColourDefinitions,
} from "fictoan-react";

// LOCAL COMPONENTS ====================================================================================================
import { ColorWheel } from "$components/ColorWheel/ColorWheel";
import { ColourConfigurator } from "$components/ColourConfigurator/ColourConfigurator";

// STYLES ==============================================================================================================
import "./page-colour.css";

// OTHER ===============================================================================================================
import { listOfColours, generateShades } from "./colours";
import { sampleUsage1, sampleUsage2, sampleUsage3 } from "./CodeSamples";

// Helper to convert hue/chroma to OKLCH CSS string
const toOklch = (hue, chroma, lightness = 0.65) => `oklch(${lightness} ${chroma} ${hue})`;

const ColourDocs = () => {
    const [copiedShade, setCopiedShade] = useState(null);

    // COPY COLOUR NAME TO CLIPBOARD ///////////////////////////////////////////////////////////////////////////////////
    const copyToClipboard = (shade) => {
        navigator.clipboard.writeText(shade)
            .then(() => {
                setCopiedShade(shade);
                setTimeout(() => setCopiedShade(null), 3000);
            })
            .catch(err => {
                console.error("Unable to copy colour name: ", err);
            });
    };

    return (
        <Article id="page-colour">
            {/* //////////////////////////////////////////////////////////////////////////////////////////////////// */}
            {/* INTRO */}
            {/* //////////////////////////////////////////////////////////////////////////////////////////////////// */}
            <Section id="basics" marginTop="medium" marginBottom="small">
                <Row horizontalPadding="huge">
                    <Portion>
                        <Heading2 id="component-name">
                            Colour
                        </Heading2>

                        <Text
                            id="component-description"
                            weight="400"
                        >
                            All the named colours available in Fictoan.
                        </Text>
                    </Portion>
                </Row>

                <Row horizontalPadding="huge" marginBottom="none">
                    <Portion>
                        <Text marginBottom="micro">
                            Fictoan comes with 22 different named colours, apart
                            from <code>black</code>, <code>white</code>, and <code>transparent</code>,
                            for adding colour to your elements.
                        </Text>

                        <Text marginBottom="micro">
                            There are three colour props&mdash;<br />
                            <code>textColour</code>,<br />
                            <code>bgColour</code>,<br />
                            <code>borderColour</code>,<br />
                            and they accept any value from the list of colours below. Use them like so&mdash;
                        </Text>

                        <Callout kind="info" marginBottom="none">
                            <Text textColour="black">
                                And oh, you can use either spelling colour/color in the props above.
                            </Text>
                        </Callout>
                    </Portion>
                </Row>

                <Divider kind="secondary" verticalMargin="small" horizontalMargin="huge" />

                {/* COLOUR WHEEL */}
                <Row horizontalPadding="huge" marginBottom="small">
                    <Portion>
                        <Text weight="600" marginBottom="nano">Colour list</Text>
                        <ColorWheel colours={oklchColourDefinitions} />
                    </Portion>

                    <Portion>
                        <Div className="colour-swatches-grid">
                            {Object.entries(oklchColourDefinitions)
                                .filter(([_, def]) => def.chroma > 0.1 || !["brown", "slate", "grey"].includes(_))
                                .sort((a, b) => a[1].hue - b[1].hue)
                                .map(([name, def]) => (
                                    <Card
                                        key={name}
                                        className="colour-swatch-item"
                                        padding="nano" shape="rounded"
                                    >
                                        <Div
                                            className="colour-swatch-preview"
                                            style={{ background : toOklch(def.hue, def.chroma) }}
                                        />
                                        <Text className="colour-swatch-name">{name}</Text>
                                        <Text className="colour-swatch-meta">{def.hue}°</Text>
                                    </Card>
                                ))
                            }
                        </Div>
                    </Portion>

                    <Portion>
                        <Text>Neutrals (low/zero chroma)</Text>

                        <Div className="colour-swatches-grid">
                            {Object.entries(oklchColourDefinitions)
                                .filter(([_, def]) => def.chroma <= 0.01 || ["brown", "slate"].includes(_))
                                .map(([name, def]) => (
                                    <Card
                                        key={name}
                                        className="neutral-swatch-item"
                                        padding="nano" shape="rounded"
                                    >
                                        <Div
                                            className="colour-swatch-preview"
                                            style={{
                                                background : toOklch(def.hue, Math.max(def.chroma, 0.02)),
                                                border     : def.chroma === 0 ? "1px solid #444" : "none",
                                            }}
                                        />
                                        <Text className="colour-swatch-name">{name}</Text>
                                        <Text className="colour-swatch-meta">chroma: {def.chroma}</Text>
                                    </Card>
                                ))
                            }
                        </Div>
                    </Portion>
                </Row>

                {/* //////////////////////////////////////////////////////////////////////////////////////////////// */}
                {/*  CONFIGURATOR */}
                {/* //////////////////////////////////////////////////////////////////////////////////////////////// */}
                <Row horizontalPadding="large" marginBottom="micro">
                    <Portion>
                        <ColourConfigurator />
                    </Portion>
                </Row>

                {/* USAGE EXAMPLES ///////////////////////////////////////////////////////////////////////////////// */}
                <Row horizontalPadding="huge" marginBottom="micro">
                    <Portion>
                        <Element as="div" id="usage-examples">
                            <Element as="div" marginBottom="micro">
                                <CodeBlock withSyntaxHighlighting source={sampleUsage1} language="jsx"
                                           marginBottom="nano" />
                                <Card padding="small" bgColour="crimson-light10" borderColour="pistachio-light30" />
                            </Element>

                            <Divider kind="tertiary" verticalMargin="micro" />

                            <Element as="div" marginBottom="micro">
                                <CodeBlock withSyntaxHighlighting source={sampleUsage2} language="jsx"
                                           marginBottom="nano" />
                                <Element as="section" bgColour="amber-light30" padding="small" />
                            </Element>

                            <Divider kind="tertiary" verticalMargin="micro" />

                            <Element as="div" marginBottom="micro">
                                <CodeBlock withSyntaxHighlighting source={sampleUsage3} language="jsx"
                                           marginBottom="nano" />
                                <Element as="ul" borderColour="cyan-dark10" bgColour="slate-light70" padding="micro">
                                    <Element as="li" borderColour="pink-light30">
                                        Hello
                                    </Element>

                                    <Element as="li" borderColour="spring-dark60">
                                        Hello
                                    </Element>

                                    <Element as="li" borderColour="blue">
                                        Hello
                                    </Element>
                                </Element>
                            </Element>
                        </Element>
                    </Portion>
                </Row>
            </Section>

            <Divider horizontalMargin="huge" kind="primary" verticalMargin="small" />

            {/* //////////////////////////////////////////////////////////////////////////////////////////////////// */}
            {/* LIST OF COLOURS */}
            {/* //////////////////////////////////////////////////////////////////////////////////////////////////// */}
            <Element as="section" id="colour-list">
                <Row horizontalPadding="huge" marginBottom="micro">
                    <Portion>
                        <Heading6 marginBottom="nano">List of colours</Heading6>
                        <Text>Use any of these below values as variables with the above props.</Text>
                    </Portion>
                </Row>

                <Row horizontalPadding="small" gutters="small" marginBottom="tiny">
                    {listOfColours.map((color) => (
                        <Portion desktopSpan="4" key={color}>
                            <Element as="div" className="colour-column" marginBottom="micro">
                                <Text weight="700" marginBottom="micro">{color}</Text>
                                {generateShades(color).map((shade) => (
                                    <Card
                                        key={shade}
                                        className="colour-card is-clickable"
                                        bgColour={shade}
                                        borderColour="transparent"
                                        padding="tiny"
                                        onClick={() => copyToClipboard(shade)}
                                    >
                                        <Text size="tiny" className="colour-name" textColour="white">
                                            {copiedShade === shade ? "Copied!" : shade}
                                        </Text>
                                    </Card>
                                ))}
                            </Element>
                        </Portion>
                    ))}

                    <Portion desktopSpan="one-fourth">
                        <Element as="div" className="colour-column" marginBottom="micro">
                            <Text weight="700" marginBottom="nano">black</Text>
                            <Card padding="tiny" bgColour="black" borderColour="grey" />
                        </Element>

                        <Element as="div" className="colour-column" marginBottom="micro">
                            <Text weight="700" marginBottom="nano">white</Text>
                            <Card padding="tiny" bgColour="white" borderColour="grey" />
                        </Element>

                        <Element as="div" className="colour-column" marginBottom="micro">
                            <Text weight="700" marginBottom="nano">transparent</Text>
                            <Card id="transparent-card" padding="tiny" borderColour="grey" />
                        </Element>
                    </Portion>
                </Row>
            </Element>
        </Article>
    );
};


export default ColourDocs;
