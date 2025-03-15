"use client";

// EXTERNAL DEPS =======================================================================================================
import React, { useState } from "react";

// INTERNAL DEPS =======================================================================================================
import {
    Element, Card, Heading1,
    Heading6, Text, Divider, Portion, Row, Callout, Article, FictoanColours, Div, OptionCard, OptionCardsGroup, CodeBlock
} from "fictoan-react";

// COMPONENTS ==========================================================================================================

// STYLES ==============================================================================================================
import "./page-colour.css";

// CODE SNIPPETS =======================================================================================================
import { sampleUsage1, sampleUsage2, sampleUsage3 } from "./CodeSamples";

// DATA ================================================================================================================
import { listOfColours, generateShades } from "./colours";

const ColourDocs = () => {
    const [selectedColour, setSelectedColour] = useState("");
    const [selectedLuminance, setSelectedLuminance] = useState("");
    const [selectedOpacity, setSelectedOpacity] = useState("");

    const [copiedShade, setCopiedShade] = useState(null);

    const alphaLevels = [0, 5, 10, 20, 30, 40, 50, 60, 70, 80, 90];
    const shadeLevels = [10, 20, 30, 40, 50, 60, 70, 80, 90];

    // COMPUTE THE CARD'S BACKGROUND COLOR /////////////////////////////////////////////////////////////////////////////
    const computedValues = React.useMemo(() => {
        // When transparent is selected with luminance or opacity
        if (selectedColour === "transparent" && (
            selectedLuminance || selectedOpacity
        )) {
            return {
                displayText : "Oh, Mr. Smarty-pants!",
                bgColour    : "transparent",
            };
        }

        if (!selectedColour) {
            return {
                displayText : "Select a colour",
                bgColour    : "",
            };
        }

        let computedBgColour = selectedColour;

        // Base case - just the color
        if (!selectedLuminance && !selectedOpacity) {
            return {
                displayText : selectedColour,
                bgColour    : selectedColour,
            };
        }

        // Only luminance selected
        if (selectedLuminance && !selectedOpacity) {
            computedBgColour = `${selectedColour}-${selectedLuminance}`;
        }
        // Only opacity selected
        else if (!selectedLuminance && selectedOpacity) {
            computedBgColour = `${selectedColour}-opacity${selectedOpacity}`;
        }
        // Both luminance and opacity selected
        else {
            computedBgColour = `${selectedColour}-${selectedLuminance}-opacity${selectedOpacity}`;
        }

        return {
            displayText : computedBgColour,
            bgColour    : computedBgColour,
        };

    }, [selectedColour, selectedLuminance, selectedOpacity]);

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
            <Element as="section" id="basics" marginTop="medium" marginBottom="small">
                <Row horizontalPadding="huge">
                    <Portion>
                        <Heading1 className="text-hue">Colour</Heading1>
                    </Portion>
                </Row>

                <Row horizontalPadding="huge" marginBottom="micro">
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

                        <Callout kind="info" marginBottom="small">
                            <Text textColour="black">
                                And oh, you can use either spelling colour/color in the props above.
                            </Text>
                        </Callout>
                    </Portion>
                </Row>

                {/* //////////////////////////////////////////////////////////////////////////////////////////////// */}
                {/*  CONFIGURATOR */}
                {/* //////////////////////////////////////////////////////////////////////////////////////////////// */}
                <Row horizontalPadding="large" marginBottom="micro" retainLayoutAlways>
                    <Portion>
                        {/* DEMO COMPONENT ///////////////////////////////////////////////////////////////////////// */}
                        <Div
                            id="configurator"
                            padding="small" shape="rounded"
                            data-centered-children
                        >
                            <Text
                                weight="600"
                                textColour="black"
                                marginBottom="micro"
                            >
                                {computedValues.displayText}
                            </Text>

                            <Card
                                verticalPadding="small" horizontalPadding="micro"
                                bgColour={computedValues.bgColour}
                            >
                                <CodeBlock withSyntaxHighlighting language="jsx" showCopyButton>
                                    {[
                                        `/* Example use */`,
                                        `<Card${computedValues.bgColour ? ` bgColour="${computedValues.bgColour}"` : ""}>`,
                                        "    Your content here",
                                        "</Card>"
                                    ].join("\n")}
                                </CodeBlock>
                            </Card>
                            <Div className="gradient-bg" />
                        </Div>
                    </Portion>

                    {/* STEP 1 — COLOUR //////////////////////////////////////////////////////////////////////////// */}
                    <Portion desktopSpan="one-third">
                        <Text align="centre" weight="600" marginBottom="nano">
                            First, pick a colour
                        </Text>

                        <OptionCardsGroup
                            showTickIcon
                            tickPosition="centre-right"
                            onSelectionChange={(selectedIds) => {
                                const colorId = Array.from(selectedIds)[0];
                                if (colorId) {
                                    const colorIndex = colorId.split("-")[1];
                                    setSelectedColour(FictoanColours[colorIndex]);
                                } else {
                                    setSelectedColour(""); // Deselection
                                }
                            }}
                        >
                            {FictoanColours.map((colour, index) => (
                                <OptionCard
                                    key={colour}
                                    id={`colour-${index}`}
                                    padding="nano"
                                    shape="rounded"
                                    marginBottom="nano"
                                    verticallyCentreItems
                                >
                                    <Div
                                        className="colour-indicator"
                                        shape="rounded" marginRight="nano" bgColour={colour}
                                    />
                                    <Text align="centre">{colour}</Text>
                                </OptionCard>
                            ))}
                        </OptionCardsGroup>
                    </Portion>

                    {/* STEP 2 — LUMINANCE ///////////////////////////////////////////////////////////////////////// */}
                    <Portion desktopSpan="one-third">
                        <Text align="centre" weight="600" marginBottom="nano">
                            ...then, luminance
                        </Text>
                        <OptionCardsGroup
                            showTickIcon
                            onSelectionChange={(selectedIds) => {
                                const luminanceId = Array.from(selectedIds)[0];
                                if (luminanceId) {
                                    setSelectedLuminance(luminanceId);
                                } else {
                                    setSelectedLuminance("");
                                }
                            }}
                        >
                            {/* Light shades */}
                            {shadeLevels.map((level) => (
                                <OptionCard
                                    key={`light${level}`}
                                    id={`light${level}`}
                                    padding="nano"
                                    shape="rounded"
                                    marginBottom="nano"
                                    verticallyCentreItems
                                >
                                    <Div
                                        className="colour-indicator"
                                        shape="rounded"
                                        padding="nano"
                                        marginRight="nano"
                                        borderColour="slate-dark10-opacity40"
                                        bgColour={selectedColour ? `${selectedColour}-light${level}` : "transparent"}
                                    />
                                    <Text align="centre">light{level}</Text>
                                </OptionCard>
                            ))}

                            {/* Dark shades */}
                            {shadeLevels.map((level) => (
                                <OptionCard
                                    key={`dark${level}`}
                                    id={`dark${level}`}
                                    padding="nano"
                                    shape="rounded"
                                    marginBottom="nano"
                                    verticallyCentreItems
                                >
                                    <Div
                                        className="colour-indicator"
                                        shape="rounded"
                                        padding="nano"
                                        marginRight="nano"
                                        borderColour="slate-dark10-opacity40"
                                        bgColour={selectedColour ? `${selectedColour}-dark${level}` : "transparent"}
                                    />
                                    <Text align="centre">dark{level}</Text>
                                </OptionCard>
                            ))}
                        </OptionCardsGroup>
                    </Portion>

                    {/* STEP 3 — OPACITY /////////////////////////////////////////////////////////////////////////// */}
                    <Portion desktopSpan="one-third">
                        <Text align="centre" weight="600" marginBottom="nano">
                            ...finally, opacity
                        </Text>

                        <OptionCardsGroup
                            showTickIcon
                            onSelectionChange={(selectedIds) => {
                                const opacityId = Array.from(selectedIds)[0];
                                if (opacityId) {
                                    const level = opacityId.split("-")[1];
                                    setSelectedOpacity(alphaLevels[parseInt(level)]);
                                } else {
                                    setSelectedOpacity("");
                                }
                            }}
                        >
                            {alphaLevels.map((level, index) => (
                                <OptionCard
                                    key={level}
                                    id={`level-${index}`}
                                    padding="nano" shape="rounded"
                                    marginBottom="nano"
                                    verticallyCentreItems
                                >
                                    <Div
                                        className="colour-indicator"
                                        shape="rounded"
                                        padding="nano"
                                        marginRight="nano"
                                        borderColour="slate-dark10-opacity40"
                                        bgColour={selectedColour ? `${selectedColour}-opacity${level}` : "transparent"}
                                    />
                                    <Text align="centre">{level}</Text>
                                </OptionCard>
                            ))}
                        </OptionCardsGroup>
                    </Portion>
                </Row>

                {/* USAGE EXAMPLES ///////////////////////////////////////////////////////////////////////////////// */}
                <Row horizontalPadding="huge" marginBottom="micro">
                    <Portion>
                        <Element as="div" id="usage-examples">
                            <Element as="div" marginBottom="micro">
                                <CodeBlock withSyntaxHighlighting source={sampleUsage1} language="jsx" marginBottom="nano" />
                                <Card padding="small" bgColour="crimson-light10" borderColour="pistachio-light30" />
                            </Element>

                            <Divider kind="tertiary" verticalMargin="micro" />

                            <Element as="div" marginBottom="micro">
                                <CodeBlock withSyntaxHighlighting source={sampleUsage2} language="jsx" marginBottom="nano" />
                                <Element as="section" bgColour="amber-light30" padding="small" />
                            </Element>

                            <Divider kind="tertiary" verticalMargin="micro" />

                            <Element as="div" marginBottom="micro">
                                <CodeBlock withSyntaxHighlighting source={sampleUsage3} language="jsx" marginBottom="nano" />
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
            </Element>

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
                        <Portion desktopSpan="one-fourth" key={color}>
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
                                        <Text size="small" className="colour-name" textColour="white">
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
