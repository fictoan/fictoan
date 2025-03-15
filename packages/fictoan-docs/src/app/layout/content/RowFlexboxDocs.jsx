"use client";

import React from "react";

import { Card, Element, Heading1,
    Heading2,
    Heading3,
    Heading4,
    Heading5,
    Heading6, Portion, Row, Text, Article } from "fictoan-react";

import { CodeBlock } from "fictoan-react/components";
import { sampleFlexboxRow, sampleGridRow } from "../CodeSamples";

const RowFlexboxDocs = () => {
    return (
        <>
            <div>
                <Row horizontalPadding="huge">
                    <Portion>
                        <Heading6 weight="700">Flexbox</Heading6>
                        <Text marginBottom="nano">
                            The flexbox-based grid is a simpler version of the grid layout.
                        </Text>

                        <CodeBlock withSyntaxHighlighting source={sampleFlexboxRow} language="jsx" marginBottom="micro" />

                        <Text marginBottom="nano">
                            This creates a row with 24 columns.
                        </Text>
                    </Portion>
                </Row>

                {/* DEMONSTRATION ====================================== */}
                <Element
                    as="div"
                    marginBottom="micro" paddingLeft="tiny" paddingRight="tiny"
                >

                    <Card className="screen-desktop" shape="rounded" shadow="hard">
                        <Element as="div" className="title-bar" bgColour="slate-light80">
                            <Text textColour="red">●</Text>
                            <Text textColour="amber">●</Text>
                            <Text textColour="green">●</Text>
                        </Element>

                        <Row bgColour="slate-10" marginBottom="none" isFullHeight>
                            <Portion desktopSpan="1" bgColour="sky-light-80" paddingTop="micro">
                                <Text hideOnTabletPortrait hideOnMobile size="small" align="centre">1</Text>
                            </Portion>
                            <Portion desktopSpan="1" bgColour="sky-light-80" paddingTop="micro">
                                <Text hideOnTabletPortrait hideOnMobile size="small" align="centre">2</Text>
                            </Portion>
                            <Portion desktopSpan="1" bgColour="sky-light-80" paddingTop="micro">
                                <Text hideOnTabletPortrait hideOnMobile size="small" align="centre">3</Text>
                            </Portion>
                            <Portion desktopSpan="1" bgColour="sky-light-80" paddingTop="micro">
                                <Text hideOnTabletPortrait hideOnMobile size="small" align="centre">4</Text>
                            </Portion>
                            <Portion desktopSpan="1" bgColour="sky-light-80" paddingTop="micro">
                                <Text hideOnTabletPortrait hideOnMobile size="small" align="centre">5</Text>
                            </Portion>
                            <Portion desktopSpan="1" bgColour="sky-light-80" paddingTop="micro">
                                <Text hideOnTabletPortrait hideOnMobile size="small" align="centre">6</Text>
                            </Portion>
                            <Portion desktopSpan="1" bgColour="sky-light-80" paddingTop="micro">
                                <Text hideOnTabletPortrait hideOnMobile size="small" align="centre">7</Text>
                            </Portion>
                            <Portion desktopSpan="1" bgColour="sky-light-80" paddingTop="micro">
                                <Text hideOnTabletPortrait hideOnMobile size="small" align="centre">8</Text>
                            </Portion>
                            <Portion desktopSpan="1" bgColour="sky-light-80" paddingTop="micro">
                                <Text hideOnTabletPortrait hideOnMobile size="small" align="centre">9</Text>
                            </Portion>
                            <Portion desktopSpan="1" bgColour="sky-light-80" paddingTop="micro">
                                <Text hideOnTabletPortrait hideOnMobile size="small" align="centre">10</Text>
                            </Portion>
                            <Portion desktopSpan="1" bgColour="sky-light-80" paddingTop="micro">
                                <Text hideOnTabletPortrait hideOnMobile size="small" align="centre">11</Text>
                            </Portion>
                            <Portion desktopSpan="1" bgColour="sky-light-80" paddingTop="micro">
                                <Text hideOnTabletPortrait hideOnMobile size="small" align="centre">12</Text>
                            </Portion>
                            <Portion desktopSpan="1" bgColour="sky-light-80" paddingTop="micro">
                                <Text hideOnTabletPortrait hideOnMobile size="small" align="centre">13</Text>
                            </Portion>
                            <Portion desktopSpan="1" bgColour="sky-light-80" paddingTop="micro">
                                <Text hideOnTabletPortrait hideOnMobile size="small" align="centre">14</Text>
                            </Portion>
                            <Portion desktopSpan="1" bgColour="sky-light-80" paddingTop="micro">
                                <Text hideOnTabletPortrait hideOnMobile size="small" align="centre">15</Text>
                            </Portion>
                            <Portion desktopSpan="1" bgColour="sky-light-80" paddingTop="micro">
                                <Text hideOnTabletPortrait hideOnMobile size="small" align="centre">16</Text>
                            </Portion>
                            <Portion desktopSpan="1" bgColour="sky-light-80" paddingTop="micro">
                                <Text hideOnTabletPortrait hideOnMobile size="small" align="centre">17</Text>
                            </Portion>
                            <Portion desktopSpan="1" bgColour="sky-light-80" paddingTop="micro">
                                <Text hideOnTabletPortrait hideOnMobile size="small" align="centre">18</Text>
                            </Portion>
                            <Portion desktopSpan="1" bgColour="sky-light-80" paddingTop="micro">
                                <Text hideOnTabletPortrait hideOnMobile size="small" align="centre">19</Text>
                            </Portion>
                            <Portion desktopSpan="1" bgColour="sky-light-80" paddingTop="micro">
                                <Text hideOnTabletPortrait hideOnMobile size="small" align="centre">20</Text>
                            </Portion>
                            <Portion desktopSpan="1" bgColour="sky-light-80" paddingTop="micro">
                                <Text hideOnTabletPortrait hideOnMobile size="small" align="centre">21</Text>
                            </Portion>
                            <Portion desktopSpan="1" bgColour="sky-light-80" paddingTop="micro">
                                <Text hideOnTabletPortrait hideOnMobile size="small" align="centre">22</Text>
                            </Portion>
                            <Portion desktopSpan="1" bgColour="sky-light-80" paddingTop="micro">
                                <Text hideOnTabletPortrait hideOnMobile size="small" align="centre">23</Text>
                            </Portion>
                            <Portion desktopSpan="1" bgColour="sky-light-80" paddingTop="micro">
                                <Text hideOnTabletPortrait hideOnMobile size="small" align="centre">24</Text>
                            </Portion>
                        </Row>
                    </Card>
                </Element>

                <Row horizontalPadding="huge">
                    <Portion>
                        <Text marginBottom="nano">
                            Now you can add content to it using the <code>Portion</code> component.
                        </Text>
                    </Portion>
                </Row>
            </div>
        </>
    );
};

export default RowFlexboxDocs;
