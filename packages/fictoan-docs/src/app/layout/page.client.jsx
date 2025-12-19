"use client";

// REACT CORE ==========================================================================================================
import React, { useState } from "react";

// UI ==================================================================================================================
import { Card, Element, Heading1, Heading2, Heading3, Heading4, Heading5, Heading6, Divider, Portion, Row, Table, Tabs, Text, Article, Div, Header, RadioTabGroup, Checkbox, Button, Select, CodeBlock } from "fictoan-react";

// STYLES ==============================================================================================================
import "./page-layout.css";

// OTHER ===============================================================================================================
import { sampleNamedPortions, sampleResonsiveness, sampleRowAndPortion1, sampleRowAndPortion3, sampleRowAndPortion4, sampleTurnOffResponsiveness } from "./CodeSamples";

const LayoutDocs = () => {
    const [ gutters, setGutters ]                     = useState("small");
    const [ horizontalPadding, setHorizontalPadding ] = useState("medium");
    const [ retainLayout, setRetainLayout ]           = useState(false);

    // Portion states
    const [ portions, setPortions ] = useState([ {
        desktopSpan         : "half",
        tabletLandscapeSpan : "half",
        tabletPortraitSpan  : "whole",
        mobileSpan          : "whole",
    } ]);

    const spanOptions = [
        { label : "Select width", value : "0", disabled : true },
        { label : "1 column", value : "1" },
        { label : "2 — one-twelfth", value : "one-twelfth" },
        { label : "3 — one-eighth", value : "one-eighth" },
        { label : "4 — one-sixth", value : "one-sixth" },
        { label : "5 columns", value : "5" },
        { label : "6 — one-fourth", value : "one-fourth" },
        { label : "7 columns", value : "7" },
        { label : "8 — one-third", value : "one-third" },
        { label : "9 columns", value : "9" },
        { label : "10 — five-twelfth", value : "five-twelfth" },
        { label : "11 columns", value : "11" },
        { label : "12 — half", value : "half" },
        { label : "13 columns", value : "13" },
        { label : "14 — seven-twelfth", value : "seven-twelfth" },
        { label : "15 columns", value : "15" },
        { label : "16 — two-third", value : "two-third" },
        { label : "17 columns", value : "17" },
        { label : "18 — three-fourth", value : "three-fourth" },
        { label : "19 columns", value : "19" },
        { label : "20 — five-sixth", value : "five-sixth" },
        { label : "21 — seven-eighth", value : "seven-eighth" },
        { label : "22 — eleven-twelfth", value : "eleven-twelfth" },
        { label : "23 columns", value : "23" },
        { label : "24 — whole", value : "whole" },
    ];

    return (
        <>
            <head>
                <title>Layout — Fictoan documentation</title>
            </head>

            <article id="page-layout">
                <Row horizontalPadding="huge" marginTop="medium" marginBottom="small">
                    <Portion>
                        <Heading1>Row and Portion</Heading1>
                        <Text size="large" marginBottom="small">
                            These two components form the layout scaffolding for all your UI needs
                        </Text>
                    </Portion>

                    <Portion>
                        
                        <ul>
                            <li>The Row is a logical block-level element to separate content on your page</li>
                            <li>A page can have unlimited Rows and each Row can have unlimited Portions as children</li>
                            <li>Portion widths have to be explicitly set, or they will take the entire width</li>
                            <li>Portions move to the next line if no space is available</li>
                        </ul>
                    </Portion>
                </Row>

                <Divider kind="primary" horizontalMargin="huge" verticalMargin="small" />

                {/* //////////////////////////////////////////////////////////////////////////////////////////////// */}
                {/*   BASICS  */}
                {/* //////////////////////////////////////////////////////////////////////////////////////////////// */}
                <Element as="section" id="basics">
                    {/* CONFIGURATOR /////////////////////////////////////////////////////////////////////////////////////// */}
                    <Row horizontalPadding="small" className="rendered-component">
                        {/* DEMO COMPONENT ///////////////////////////////////////////////////////////////////////////////// */}
                        <Portion id="component-wrapper" marginBottom="small">
                            <Div
                                padding="micro" shape="rounded" bgColour="slate-light80"
                                data-centered-children
                            >
                                <Card className="screen-desktop" shape="rounded" shadow="hard"
                                      borderColour="slate-light40">
                                    <Element as="div" className="title-bar" bgColour="slate-light40">
                                        <Text textColour="red">●</Text>
                                        <Text textColour="amber">●</Text>
                                        <Text textColour="green">●</Text>
                                    </Element>

                                    <Row
                                        className="demo-row"
                                        horizontalPadding={horizontalPadding}
                                        gutters={gutters}
                                        retainLayoutAlways={retainLayout}
                                    >
                                        {portions.map((portion, index) => (
                                            <Portion
                                                key={index}
                                                desktopSpan={portion.desktopSpan}
                                                tabletLandscapeSpan={portion.tabletLandscapeSpan}
                                                tabletPortraitSpan={portion.tabletPortraitSpan}
                                                mobileSpan={portion.mobileSpan}
                                                bgColour="sky-light20"
                                                padding="nano"
                                            >
                                                <Text size="small" align="center">
                                                    P. {index + 1}
                                                </Text>
                                            </Portion>
                                        ))}
                                    </Row>

                                    <Row
                                        horizontalPadding={horizontalPadding}
                                        gutters={gutters}
                                        retainLayoutAlways={retainLayout}
                                        bgColour="slate-10"
                                        marginBottom="none" isFullHeight
                                    >
                                        <Portion desktopSpan="1" bgColour="sky-light60" paddingTop="micro">
                                            <Text hideOnTabletPortrait hideOnMobile size="small" align="centre">1</Text>
                                        </Portion>
                                        <Portion desktopSpan="1" bgColour="sky-light60" paddingTop="micro">
                                            <Text hideOnTabletPortrait hideOnMobile size="small" align="centre">2</Text>
                                        </Portion>
                                        <Portion desktopSpan="1" bgColour="sky-light60" paddingTop="micro">
                                            <Text hideOnTabletPortrait hideOnMobile size="small" align="centre">3</Text>
                                        </Portion>
                                        <Portion desktopSpan="1" bgColour="sky-light60" paddingTop="micro">
                                            <Text hideOnTabletPortrait hideOnMobile size="small" align="centre">4</Text>
                                        </Portion>
                                        <Portion desktopSpan="1" bgColour="sky-light60" paddingTop="micro">
                                            <Text hideOnTabletPortrait hideOnMobile size="small" align="centre">5</Text>
                                        </Portion>
                                        <Portion desktopSpan="1" bgColour="sky-light60" paddingTop="micro">
                                            <Text hideOnTabletPortrait hideOnMobile size="small" align="centre">6</Text>
                                        </Portion>
                                        <Portion desktopSpan="1" bgColour="sky-light60" paddingTop="micro">
                                            <Text hideOnTabletPortrait hideOnMobile size="small" align="centre">7</Text>
                                        </Portion>
                                        <Portion desktopSpan="1" bgColour="sky-light60" paddingTop="micro">
                                            <Text hideOnTabletPortrait hideOnMobile size="small" align="centre">8</Text>
                                        </Portion>
                                        <Portion desktopSpan="1" bgColour="sky-light60" paddingTop="micro">
                                            <Text hideOnTabletPortrait hideOnMobile size="small" align="centre">9</Text>
                                        </Portion>
                                        <Portion desktopSpan="1" bgColour="sky-light60" paddingTop="micro">
                                            <Text hideOnTabletPortrait hideOnMobile size="small"
                                                  align="centre">10</Text>
                                        </Portion>
                                        <Portion desktopSpan="1" bgColour="sky-light60" paddingTop="micro">
                                            <Text hideOnTabletPortrait hideOnMobile size="small"
                                                  align="centre">11</Text>
                                        </Portion>
                                        <Portion desktopSpan="1" bgColour="sky-light60" paddingTop="micro">
                                            <Text hideOnTabletPortrait hideOnMobile size="small"
                                                  align="centre">12</Text>
                                        </Portion>
                                        <Portion desktopSpan="1" bgColour="sky-light60" paddingTop="micro">
                                            <Text hideOnTabletPortrait hideOnMobile size="small"
                                                  align="centre">13</Text>
                                        </Portion>
                                        <Portion desktopSpan="1" bgColour="sky-light60" paddingTop="micro">
                                            <Text hideOnTabletPortrait hideOnMobile size="small"
                                                  align="centre">14</Text>
                                        </Portion>
                                        <Portion desktopSpan="1" bgColour="sky-light60" paddingTop="micro">
                                            <Text hideOnTabletPortrait hideOnMobile size="small"
                                                  align="centre">15</Text>
                                        </Portion>
                                        <Portion desktopSpan="1" bgColour="sky-light60" paddingTop="micro">
                                            <Text hideOnTabletPortrait hideOnMobile size="small"
                                                  align="centre">16</Text>
                                        </Portion>
                                        <Portion desktopSpan="1" bgColour="sky-light60" paddingTop="micro">
                                            <Text hideOnTabletPortrait hideOnMobile size="small"
                                                  align="centre">17</Text>
                                        </Portion>
                                        <Portion desktopSpan="1" bgColour="sky-light60" paddingTop="micro">
                                            <Text hideOnTabletPortrait hideOnMobile size="small"
                                                  align="centre">18</Text>
                                        </Portion>
                                        <Portion desktopSpan="1" bgColour="sky-light60" paddingTop="micro">
                                            <Text hideOnTabletPortrait hideOnMobile size="small"
                                                  align="centre">19</Text>
                                        </Portion>
                                        <Portion desktopSpan="1" bgColour="sky-light60" paddingTop="micro">
                                            <Text hideOnTabletPortrait hideOnMobile size="small"
                                                  align="centre">20</Text>
                                        </Portion>
                                        <Portion desktopSpan="1" bgColour="sky-light60" paddingTop="micro">
                                            <Text hideOnTabletPortrait hideOnMobile size="small"
                                                  align="centre">21</Text>
                                        </Portion>
                                        <Portion desktopSpan="1" bgColour="sky-light60" paddingTop="micro">
                                            <Text hideOnTabletPortrait hideOnMobile size="small"
                                                  align="centre">22</Text>
                                        </Portion>
                                        <Portion desktopSpan="1" bgColour="sky-light60" paddingTop="micro">
                                            <Text hideOnTabletPortrait hideOnMobile size="small"
                                                  align="centre">23</Text>
                                        </Portion>
                                        <Portion desktopSpan="1" bgColour="sky-light60" paddingTop="micro">
                                            <Text hideOnTabletPortrait hideOnMobile size="small"
                                                  align="centre">24</Text>
                                        </Portion>
                                    </Row>
                                </Card>
                            </Div>
                        </Portion>

                        {/* CONFIGURATOR */}
                        <Portion desktopSpan="two-third">
                            <CodeBlock withSyntaxHighlighting language="jsx" showCopyButton marginBottom="micro">
                                {[
                                    `// Paste this in your content file`,
                                    `<Row`,
                                    `    gutters="${gutters}"`,
                                    `    horizontalPadding="${horizontalPadding}"`,
                                    retainLayout ? `    retainLayoutAlways` : null,
                                    `>`,
                                    ...portions.map((p, index) => [
                                        `    <Portion`,
                                        `        desktopSpan="${p.desktopSpan}"`,
                                        `        tabletLandscapeSpan="${p.tabletLandscapeSpan}"`,
                                        `        tabletPortraitSpan="${p.tabletPortraitSpan}"`,
                                        `        mobileSpan="${p.mobileSpan}"`,
                                        `    >`,
                                        `        P. ${index + 1}`,
                                        `    </Portion>`,
                                    ]).flat(),
                                    `</Row>`,
                                ].filter(Boolean).join("\n")}
                            </CodeBlock>

                            <Card padding="micro" shape="rounded">
                                <Header verticallyCentreItems pushItemsToEnds marginBottom="micro">
                                    <Text size="large" weight="700" textColour="white">
                                        Row configuration
                                    </Text>
                                </Header>

                                <Row marginBottom="micro">
                                    <Portion>
                                        <RadioTabGroup
                                            id="horizontal-padding"
                                            label="Horizontal padding"
                                            name="horizontal-padding"
                                            options={[
                                                { id : "hp-none", label : "none", value : "none" },
                                                { id : "hp-nano", label : "nano", value : "nano" },
                                                { id : "hp-micro", label : "micro", value : "micro" },
                                                { id : "hp-tiny", label : "tiny", value : "tiny" },
                                                { id : "hp-small", label : "small", value : "small" },
                                                { id : "hp-medium", label : "medium", value : "medium" },
                                                { id : "hp-large", label : "large", value : "large" },
                                                { id : "hp-huge", label : "huge", value : "huge" },
                                            ]}
                                            value={horizontalPadding}
                                            onChange={(value) => setHorizontalPadding(value)}
                                        />
                                    </Portion>

                                    <Portion>
                                        <RadioTabGroup
                                            id="gutters"
                                            label="Gutters"
                                            name="gutters"
                                            options={[
                                                { id : "gutters-none", label : "none", value : "none" },
                                                { id : "gutters-nano", label : "nano", value : "nano" },
                                                { id : "gutters-micro", label : "micro", value : "micro" },
                                                { id : "gutters-tiny", label : "tiny", value : "tiny" },
                                                { id : "gutters-small", label : "small", value : "small" },
                                                { id : "gutters-medium", label : "medium", value : "medium" },
                                                { id : "gutters-large", label : "large", value : "large" },
                                                { id : "gutters-huge", label : "huge", value : "huge" },
                                            ]}
                                            value={gutters}
                                            onChange={(value) => setGutters(value)}
                                        />
                                    </Portion>

                                    <Portion>
                                        <Checkbox
                                            id="retain-layout"
                                            name="retain-layout"
                                            label="Retain layout always"
                                            checked={retainLayout}
                                            onChange={(checked) => setRetainLayout(checked)}
                                        />
                                    </Portion>
                                </Row>

                                <Divider kind="secondary" horizontalMargin="none" verticalMargin="micro" />

                                <Header
                                    verticallyCentreItems pushItemsToEnds
                                    verticalMargin="micro"
                                >
                                    <Text size="large" weight="700" textColour="white">
                                        Portions
                                    </Text>

                                    <Button
                                        kind="primary"
                                        size="small"
                                        onClick={() => setPortions([ ...portions, {
                                            desktopSpan         : "half",
                                            tabletLandscapeSpan : "half",
                                            tabletPortraitSpan  : "whole",
                                            mobileSpan          : "whole",
                                        } ])}
                                        disabled={portions.length >= 4}
                                    >
                                        Add Portion
                                    </Button>
                                </Header>

                                {portions.map((portion, index) => (
                                    <Card key={index} padding="micro" shape="rounded" marginBottom="nano">
                                        <Row marginBottom="none">
                                            <Portion>
                                                <Header verticallyCentreItems pushItemsToEnds marginBottom="nano">
                                                    <Text weight="600">Portion {index + 1}</Text>

                                                    {portions.length > 1 && (
                                                        <Button
                                                            kind="custom"
                                                            size="small" shape="rounded"
                                                            bgColour="transparent" borderColour="red" textColour="red"
                                                            onClick={() => {
                                                                const newPortions = portions.filter((_, i) => i !== index);
                                                                setPortions(newPortions);
                                                            }}
                                                        >
                                                            Remove
                                                        </Button>
                                                    )}
                                                </Header>
                                            </Portion>

                                            <Portion desktopSpan="half">
                                                <Select
                                                    label="Desktop span"
                                                    options={spanOptions}
                                                    defaultValue={portion.desktopSpan}
                                                    onChange={(value) => {
                                                        const newPortions              = [ ...portions ];
                                                        newPortions[index].desktopSpan = value;
                                                        setPortions(newPortions);
                                                    }}
                                                    isFullWidth
                                                />
                                            </Portion>

                                            <Portion desktopSpan="half">
                                                <Select
                                                    label="Tablet landscape"
                                                    options={spanOptions}
                                                    defaultValue={portion.tabletLandscapeSpan}
                                                    onChange={(value) => {
                                                        const newPortions                      = [ ...portions ];
                                                        newPortions[index].tabletLandscapeSpan = value;
                                                        setPortions(newPortions);
                                                    }}
                                                    isFullWidth
                                                />
                                            </Portion>

                                            <Portion desktopSpan="half">
                                                <Select
                                                    label="Tablet portrait"
                                                    options={spanOptions}
                                                    defaultValue={portion.tabletPortraitSpan}
                                                    onChange={(value) => {
                                                        const newPortions                     = [ ...portions ];
                                                        newPortions[index].tabletPortraitSpan = value;
                                                        setPortions(newPortions);
                                                    }}
                                                    isFullWidth
                                                />
                                            </Portion>

                                            <Portion desktopSpan="half">
                                                <Select
                                                    label="Mobile"
                                                    options={spanOptions}
                                                    defaultValue={portion.mobileSpan}
                                                    onChange={(value) => {
                                                        const newPortions             = [ ...portions ];
                                                        newPortions[index].mobileSpan = value;
                                                        setPortions(newPortions);
                                                    }}
                                                    isFullWidth
                                                />
                                            </Portion>
                                        </Row>
                                    </Card>
                                ))}
                            </Card>
                        </Portion>
                    </Row>

                    <Divider kind="primary" horizontalMargin="huge" verticalMargin="tiny" />
                </Element>


                {/* //////////////////////////////////////////////////////////////////////////////////////////////// */}
                {/*  RESPONSIVENESS */}
                {/* //////////////////////////////////////////////////////////////////////////////////////////////// */}
                <Element as="section" id="responsiveness">
                    <Row horizontalPadding="huge" marginBottom="nano">
                        <Portion>
                            <Heading6 marginBottom="nano">Responsive behaviour</Heading6>
                            <Text marginBottom="micro">
                                There are four breakpoints as listed below. Using these, you can control the behaviour
                                of a <code>Portion</code> element across devices. The default prop is{" "}
                                <code>desktopSpan</code>, but you can add three
                                more—<code>tabletLandscapeSpan</code>,{" "}
                                <code>tabletPortraitSpan</code> and <code>mobileSpan</code>.
                            </Text>
                        </Portion>

                        <Portion desktopSpan="half" tabletLandscapeSpan="half" tabletPortraitSpan="half">
                            <Text className="weight-600 no-margin-bottom">Mobile</Text>
                            <Text>Less than 600px wide</Text>
                            <code>mobileSpan</code>
                        </Portion>

                        <Portion desktopSpan="half" tabletLandscapeSpan="half" tabletPortraitSpan="half">
                            <Text className="weight-600 no-margin-bottom">Tab portrait</Text>
                            <Text>601px to 900px</Text>
                            <code>tabletPortraitSpan</code>
                        </Portion>

                        <Portion desktopSpan="half" tabletLandscapeSpan="half" tabletPortraitSpan="half">
                            <Text className="weight-600 no-margin-bottom">Tab landscape</Text>
                            <Text>901px to 1200px</Text>
                            <code>tabletLandscapeSpan</code>
                        </Portion>

                        <Portion desktopSpan="half" tabletLandscapeSpan="half" tabletPortraitSpan="half">
                            <Text className="weight-600 no-margin-bottom">Desktop</Text>
                            <Text>1201px and above</Text>
                            <code>desktopSpan</code>
                        </Portion>

                        <Portion>
                            <CodeBlock withSyntaxHighlighting source={sampleResonsiveness} language="jsx" />
                        </Portion>
                    </Row>

                    {/* DEMONSTRATION ========================================== */}
                    <Element as="div" paddingLeft="tiny" paddingRight="tiny" marginBottom="small">
                        <Card className="screen-desktop screen-short" shape="rounded" shadow="hard">
                            <Element as="div" className="title-bar" bgColour="slate-light40">
                                <Text textColour="red">●</Text>
                                <Text textColour="amber">●</Text>
                                <Text textColour="green">●</Text>
                            </Element>

                            <Row className="demo-row" style={{ "top" : "80px" }} marginBottom="none">
                                <Portion desktopSpan="one-sixth" tabletLandscapeSpan="8" tabletPortraitSpan="half"
                                         mobileSpan="two-third"
                                         bgColour="sky-light20">
                                    <Text size="small" fontStyle="monospace"
                                          showOnlyOnDesktop>&nbsp;&nbsp;&nbsp;&nbsp;one-sixth</Text>
                                    <Text size="small" fontStyle="monospace"
                                          showOnlyOnTabletLandscape>&nbsp;&nbsp;&nbsp;&nbsp;one-third</Text>
                                    <Text size="small" fontStyle="monospace"
                                          showOnlyOnTabletPortrait>&nbsp;&nbsp;&nbsp;&nbsp;half</Text>
                                    <Text size="small" fontStyle="monospace"
                                          showOnlyOnMobile>&nbsp;&nbsp;&nbsp;&nbsp;two-third</Text>
                                </Portion>
                            </Row>

                            <Row bgColour="slate-10" marginBottom="none" isFullHeight retainLayoutAlways>
                                <Portion desktopSpan="1" bgColour="sky-light60" paddingTop="micro" />
                                <Portion desktopSpan="1" bgColour="sky-light60" paddingTop="micro" />
                                <Portion desktopSpan="1" bgColour="sky-light60" paddingTop="micro" />
                                <Portion desktopSpan="1" bgColour="sky-light-60" paddingTop="micro" />
                                <Portion desktopSpan="1" bgColour="sky-light-60" paddingTop="micro" />
                                <Portion desktopSpan="1" bgColour="sky-light-60" paddingTop="micro" />
                                <Portion desktopSpan="1" bgColour="sky-light-60" paddingTop="micro" />
                                <Portion desktopSpan="1" bgColour="sky-light-60" paddingTop="micro" />
                                <Portion desktopSpan="1" bgColour="sky-light-60" paddingTop="micro" />
                                <Portion desktopSpan="1" bgColour="sky-light-60" paddingTop="micro" />
                                <Portion desktopSpan="1" bgColour="sky-light-60" paddingTop="micro" />
                                <Portion desktopSpan="1" bgColour="sky-light-60" paddingTop="micro" />
                                <Portion desktopSpan="1" bgColour="sky-light-60" paddingTop="micro" />
                                <Portion desktopSpan="1" bgColour="sky-light-60" paddingTop="micro" />
                                <Portion desktopSpan="1" bgColour="sky-light-60" paddingTop="micro" />
                                <Portion desktopSpan="1" bgColour="sky-light-60" paddingTop="micro" />
                                <Portion desktopSpan="1" bgColour="sky-light-60" paddingTop="micro" />
                                <Portion desktopSpan="1" bgColour="sky-light-60" paddingTop="micro" />
                                <Portion desktopSpan="1" bgColour="sky-light-60" paddingTop="micro" />
                                <Portion desktopSpan="1" bgColour="sky-light-60" paddingTop="micro" />
                                <Portion desktopSpan="1" bgColour="sky-light-60" paddingTop="micro" />
                                <Portion desktopSpan="1" bgColour="sky-light-60" paddingTop="micro" />
                                <Portion desktopSpan="1" bgColour="sky-light-60" paddingTop="micro" />
                                <Portion desktopSpan="1" bgColour="sky-light-60" paddingTop="micro" />
                            </Row>
                        </Card>
                    </Element>

                    <Divider horizontalMargin="huge" kind="secondary" verticalMargin="tiny" />

                    <Row horizontalPadding="huge">
                        <Portion>
                            <Heading6>Turn off responsiveness</Heading6>
                            <Text>You can also turn off the responsiveness across these breakpoints by using the
                                following
                                props.</Text>
                        </Portion>

                        <Portion>
                            <CodeBlock withSyntaxHighlighting source={sampleTurnOffResponsiveness} language="jsx" />
                        </Portion>
                    </Row>
                </Element>
            </article>
        </>
    );
};

export default LayoutDocs;
