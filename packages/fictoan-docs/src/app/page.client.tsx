"use client";

// REACT CORE ==========================================================================================================
import Link from "next/link";
import React from "react";

// UI ==================================================================================================================
import { Div, Article, Divider, Portion, Row, Text, Heading4, Heading5, Card, Section, Heading2, Span } from "fictoan-react";

// LOCAL COMPONENTS ====================================================================================================
import { ComponentGrid } from "$components/ComponentGrid/ComponentGrid";
import { IntroCode } from "$components/IntroCode/IntroCode";

// ASSETS ==============================================================================================================
import ManifestoIcon from "../assets/icons/manifesto.svg";

// STYLES ==============================================================================================================
import "../styles/home.css";

const HomePage = () => {
    return (
        <Article id="home-page">
            {/* HERO /////////////////////////////////////////////////////////////////////////////////////////////// */}
            <Section id="intro-code" verticalPadding="small">
                <IntroCode />
            </Section>

            {/* COMPONENT GRID ///////////////////////////////////////////////////////////////////////////////////// */}
            <Section id="component-grid" verticalPadding="medium">
                <Row horizontalPadding="medium">
                    <Portion>
                        <Heading4 weight="400" marginBottom="nano">
                            Some components
                        </Heading4>
                    </Portion>

                    <Portion>
                        <ComponentGrid />
                        <Heading4 weight="400" marginTop="micro">...and many more.</Heading4>
                    </Portion>
                </Row>
            </Section>

            {/* BULLET POINTS ////////////////////////////////////////////////////////////////////////////////////// */}
            <Section id="usp-section" verticalPadding="medium">
                {/* GROUP 1 ======================================================================================== */}
                <Row horizontalPadding="medium" gutters="large" marginBottom="tiny">
                    <Portion desktopSpan="two-third">
                        <Heading2 marginBottom="nano">
                            As simple as it gets.
                        </Heading2>
                    </Portion>

                    <Portion desktopSpan="one-third" />

                    <Portion desktopSpan="half">
                        <Card
                            id="usp-card-1" className="usp-card"
                            padding="micro" shape="rounded" shadow="soft"
                        >
                            <Heading5 weight="400" opacity="80" marginBottom="micro">
                                Code the way you design
                            </Heading5>

                            <Text>
                                Plain-English props, attributes and values. No complex keywords or convoluted
                                abbreviations to remember.
                            </Text>
                        </Card>
                    </Portion>

                    <Portion desktopSpan="half">
                        <Card
                            id="usp-card-2" className="usp-card"
                            bgColour="green-dark70" borderColour="green-dark50"
                            padding="micro" shape="rounded" shadow="soft"
                        >
                            <Heading5 weight="400" opacity="80" marginBottom="nano">
                                0 – 1 in minutes
                            </Heading5>

                            <Text>
                                Built for rapid iteration, so you can quickly create complex pages and layouts. Modular
                                too, so you can build on top for specific needs.
                            </Text>
                        </Card>
                    </Portion>

                    <Portion desktopSpan="half">
                        <Card
                            id="usp-card-3" className="usp-card"
                            bgColour="salmon-dark70" borderColour="salmon-dark50"
                            padding="micro" shape="rounded" shadow="soft"
                        >
                            <Heading5 weight="400" opacity="80" marginBottom="nano">
                                One theme to rule them all
                            </Heading5>

                            <Text>
                                Every single configurable aspect of the UI is controlled by a single theme file. Create
                                as many as you need, and switch.
                            </Text>
                        </Card>
                    </Portion>
                </Row>

                <Divider kind="tertiary" horizontalMargin="medium" verticalMargin="tiny" />

                {/* GROUP 2 ======================================================================================== */}
                <Row horizontalPadding="medium" gutters="large" marginBottom="tiny">
                    <Portion desktopSpan="two-third">
                        <Heading2 marginBottom="nano">
                            But wait, there’s more!
                        </Heading2>
                    </Portion>

                    <Portion desktopSpan="one-third" />

                    <Portion desktopSpan="half">
                        <Card
                            id="usp-card-4" className="usp-card"
                            bgColour="violet-dark70" borderColour="violet-dark50"
                            padding="micro" shape="rounded" shadow="soft"
                        >
                            <Heading5 weight="400" opacity="80" marginBottom="nano">
                                Performant
                            </Heading5>

                            <Text>
                                100 on Lighthouse performance, and Best Practices. No JS, plain CSS styling. No
                                dependency bloat. As close to the metal as it gets. How apps were meant to be built.
                            </Text>
                        </Card>
                    </Portion>

                    <Portion desktopSpan="half">
                        <Card
                            id="usp-card-5" className="usp-card"
                            bgColour="teal-dark70" borderColour="teal-dark50"
                            padding="micro" shape="rounded" shadow="soft"
                        >
                            <Heading5 weight="400" opacity="80" marginBottom="nano">
                                Clear separation of concerns
                            </Heading5>

                            <Text>
                                Leave the pixel-perfection to the designers, so you can focus on logic and
                                functionality. Move faster, eliminate the dreaded back-and-forth.
                            </Text>
                        </Card>
                    </Portion>

                    <Portion desktopSpan="half">
                        <Card
                            id="usp-card-5" className="usp-card"
                            bgColour="teal-dark70" borderColour="teal-dark50"
                            padding="micro" shape="rounded" shadow="soft"
                        >
                            <Heading5 weight="400" opacity="80" marginBottom="nano">
                                Write little CSS
                            </Heading5>

                            <Text>
                                Extremely declarative syntax to style everything with meaningful markup and
                                self-explanatory props.
                            </Text>
                        </Card>
                    </Portion>
                </Row>

                <video id="fictoan-bg" autoPlay muted loop>
                    <source src="/logo-render1.mp4" />
                </video>
            </Section>

            {/* MANIFESTO ////////////////////////////////////////////////////////////////////////////////////////// */}
            <Section id="manifesto" verticalPadding="medium">
                <Row horizontalPadding="medium" marginBottom="none">
                    <Portion>
                        <Div className="manifesto-card" shadow="soft">
                            <Div className="manifesto-card-content">
                                <Row marginBottom="none">
                                    <Portion desktopSpan="half">
                                        <Heading4 textColour="blue-light30" marginBottom="micro">
                                            We want to blur the lines between designers and developers.
                                        </Heading4>

                                        <Link href="/manifesto">
                                            <Text size="large" textColour="amber">
                                                Read our manifesto&nbsp;&rarr;
                                            </Text>
                                        </Link>
                                    </Portion>
                                </Row>

                                <ManifestoIcon />
                            </Div>

                            <Div id="manifesto-card-bg" />
                        </Div>
                    </Portion>
                </Row>

                <Div className="gradient-bg" />
            </Section>
        </Article>
    );
};

export default HomePage;
