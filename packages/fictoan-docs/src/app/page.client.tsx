"use client";

// REACT CORE ==========================================================================================================
import Link from "next/link";
import React from "react";

// UI ==================================================================================================================
import {
    Div,
    Article,
    Divider,
    Portion,
    Row,
    Text,
    Heading4,
    Heading6,
    Card,
    Section,
    Heading2,
    Header,
    Badge,
} from "fictoan-react";

// LOCAL COMPONENTS ====================================================================================================
import { CodeComparison } from "$components/CodeComparison/CodeComparison";
import { ComponentGrid } from "$components/ComponentGrid/ComponentGrid";
import { IntroCode } from "$components/IntroCode/IntroCode";

// ASSETS ==============================================================================================================
import ManifestoIcon from "../assets/icons/manifesto.svg";

// STYLES ==============================================================================================================
import "./home.css";

// OTHER ===============================================================================================================
import { PenLine, Zap, Palette, Gauge, Layers, Minimize2, FileCode, Feather, Package, RefreshCw } from "lucide-react";

const HomePage = () => {
    return (
        <Article id="home-page">
            {/* HERO /////////////////////////////////////////////////////////////////////////////////////////////// */}
            <Section id="hero-section" verticalPadding="medium">
                <Row horizontalPadding="medium" marginBottom="none">
                    <Portion desktopSpan="two-third">
                        <Heading2 fontStyle="serif" weight="400" marginBottom="nano">
                            React UI in plain English
                        </Heading2>

                        <Heading4 weight="400" opacity="80" marginBottom="micro">
                            Components so obvious, anyone can ship them
                        </Heading4>

                        <Text size="large" marginBottom="small">
                            Props that read like prose. Pure CSS, zero runtime. The UI library your designers will
                            actually use.
                        </Text>
                    </Portion>

                    <Portion desktopSpan="one-third" />
                </Row>

                <Div id="intro-code-section-bg" />
            </Section>

            {/* INTRO CODE ///////////////////////////////////////////////////////////////////////////////////////// */}
            <Section id="intro-code-section">
                <IntroCode />
            </Section>

            {/* DIFFERENTIATORS //////////////////////////////////////////////////////////////////////////////////// */}
            <Section id="differentiators-section" verticalPadding="small">
                <Row horizontalPadding="medium" gutters="large" marginBottom="none">
                    <Portion desktopSpan="two-third">
                        <Heading2 fontStyle="serif" weight="400" marginBottom="nano">
                            What makes Fictoan different
                        </Heading2>
                    </Portion>

                    <Portion desktopSpan="one-third" />

                    <Portion desktopSpan="half">
                        <Card className="differentiator-card" padding="micro" shape="rounded" shadow="soft">
                            <Header>
                                <FileCode size={24} strokeWidth={2} stroke="var(--pistachio)" />

                                <Heading6 weight="400" opacity="80" marginBottom="micro" marginTop="nano">
                                    No cryptic class names
                                </Heading6>
                            </Header>

                            <Text>
                                Semantic props like <code>bgColour</code> and <code>marginBottom</code>, not abbreviated
                                utility classes to memorise.
                            </Text>
                        </Card>
                    </Portion>

                    <Portion desktopSpan="half">
                        <Card className="differentiator-card" padding="micro" shape="rounded" shadow="soft">
                            <Header>
                                <Feather size={24} strokeWidth={2} stroke="var(--pistachio)" />

                                <Heading6 weight="400" opacity="80" marginBottom="micro" marginTop="nano">
                                    No runtime CSS
                                </Heading6>
                            </Header>

                            <Text>
                                Pure CSS variables. No style injection, no hydration mismatch, no flash of unstyled
                                content.
                            </Text>
                        </Card>
                    </Portion>

                    <Portion desktopSpan="half">
                        <Card className="differentiator-card" padding="micro" shape="rounded" shadow="soft">
                            <Header>
                                <Package size={24} strokeWidth={2} stroke="var(--pistachio)" />

                                <Heading6 weight="400" opacity="80" marginBottom="micro" marginTop="nano">
                                    No assembly required
                                </Heading6>
                            </Header>

                            <Text>
                                Components are styled and ready to use. No building your own design system from
                                primitives.
                            </Text>
                        </Card>
                    </Portion>

                    <Portion desktopSpan="half">
                        <Card className="differentiator-card" padding="micro" shape="rounded" shadow="soft">
                            <Header>
                                <RefreshCw size={24} strokeWidth={2} stroke="var(--pistachio)" />

                                <Heading6 weight="400" opacity="80" marginBottom="micro" marginTop="nano">
                                    No copy-paste to maintain
                                </Heading6>
                            </Header>

                            <Text>
                                An actual library with updates. You don't own (and maintain) hundreds of component
                                files.
                            </Text>
                        </Card>
                    </Portion>
                </Row>
            </Section>

            {/* COMPARISON ///////////////////////////////////////////////////////////////////////////////////////// */}
            <CodeComparison />

            {/* BULLET POINTS ////////////////////////////////////////////////////////////////////////////////////// */}
            <Section id="usp-section" verticalPadding="medium">
                {/* GROUP 1 ======================================================================================== */}
                <Row
                    id="usp-group-1"
                    horizontalPadding="medium" gutters="large" marginBottom="medium"
                >
                    <Portion desktopSpan="two-third">
                        <Heading2 fontStyle="serif" weight="400" marginBottom="nano">
                            Ship faster
                        </Heading2>
                    </Portion>

                    <Portion desktopSpan="one-third" />

                    <Portion desktopSpan="one-third">
                        <Card
                            id="usp-card-1" className="usp-card"
                            padding="micro" shape="rounded" shadow="soft"
                        >
                            <Header>
                                <PenLine size={24} strokeWidth={2} stroke="var(--pistachio)" />

                                <Heading6 weight="400" opacity="80" marginBottom="micro" marginTop="nano">
                                    Code the way you design
                                </Heading6>
                            </Header>

                            <Text>
                                Plain-English props, attributes and values. No complex keywords or convoluted
                                abbreviations to remember.
                            </Text>
                        </Card>
                    </Portion>

                    <Portion desktopSpan="one-third">
                        <Card
                            id="usp-card-2" className="usp-card"
                            padding="micro" shape="rounded" shadow="soft"
                        >
                            <Header>
                                <Zap size={24} strokeWidth={2} stroke="var(--pistachio)" />

                                <Heading6 weight="400" opacity="80" marginBottom="nano" marginTop="nano">
                                    0 – 1 in minutes
                                </Heading6>
                            </Header>

                            <Text>
                                Built for rapid iteration, so you can quickly create complex pages and layouts. Modular
                                too, so you can build on top for specific needs.
                            </Text>
                        </Card>
                    </Portion>

                    <Portion desktopSpan="one-third">
                        <Card
                            id="usp-card-3" className="usp-card"
                            padding="micro" shape="rounded" shadow="soft"
                        >
                            <Header>
                                <Palette size={24} strokeWidth={2} stroke="var(--pistachio)" />

                                <Heading6 weight="400" opacity="80" marginBottom="nano" marginTop="nano">
                                    One theme to rule them all
                                </Heading6>
                            </Header>

                            <Text>
                                Every single configurable aspect of the UI is controlled by a single theme file. Create
                                as many as you need, and switch.
                            </Text>
                        </Card>
                    </Portion>
                </Row>

                {/* GROUP 2 ======================================================================================== */}
                <Row
                    id="usp-group-2"
                    horizontalPadding="medium" gutters="large" marginBottom="tiny"
                >
                    <Portion desktopSpan="two-third">
                        <Heading2 fontStyle="serif" weight="400" marginBottom="nano">
                            Ship lighter
                        </Heading2>
                    </Portion>

                    <Portion desktopSpan="one-third" />

                    <Portion desktopSpan="one-third">
                        <Card
                            id="usp-card-4" className="usp-card"
                            padding="micro" shape="rounded" shadow="soft"
                        >
                            <Header>
                                <Gauge size={24} strokeWidth={2} stroke="var(--pistachio)" />

                                <Heading6 weight="400" opacity="80" marginBottom="nano" marginTop="nano">
                                    Performant
                                </Heading6>
                            </Header>

                            <Text>
                                100 on Lighthouse performance, and Best Practices. No JS, plain CSS styling. No
                                dependency bloat. As close to the metal as it gets. How apps were meant to be built.
                            </Text>
                        </Card>
                    </Portion>

                    <Portion desktopSpan="one-third">
                        <Card
                            id="usp-card-5" className="usp-card"
                            padding="micro" shape="rounded" shadow="soft"
                        >
                            <Header>
                                <Layers size={24} strokeWidth={2} stroke="var(--pistachio)" />

                                <Heading6 weight="400" opacity="80" marginBottom="nano" marginTop="nano">
                                    Clear separation of concerns
                                </Heading6>
                            </Header>

                            <Text>
                                Leave the pixel-perfection to the designers, so you can focus on logic and
                                functionality. Move faster, eliminate the dreaded back-and-forth.
                            </Text>
                        </Card>
                    </Portion>

                    <Portion desktopSpan="one-third">
                        <Card
                            id="usp-card-6" className="usp-card"
                            padding="micro" shape="rounded" shadow="soft"
                        >
                            <Header>
                                <Minimize2 size={24} strokeWidth={2} stroke="var(--pistachio)" />

                                <Heading6 weight="400" opacity="80" marginBottom="nano" marginTop="nano">
                                    Write little CSS
                                </Heading6>
                            </Header>

                            <Text>
                                Extremely declarative syntax to style everything with meaningful markup and
                                self-explanatory props.
                            </Text>
                        </Card>
                    </Portion>
                </Row>
            </Section>

            {/* COMPONENT GRID ///////////////////////////////////////////////////////////////////////////////////// */}
            <Section id="component-grid" verticalPadding="medium">
                <Row horizontalPadding="medium">
                    <Portion>
                        <Heading4 fontStyle="serif" weight="400" marginBottom="nano">
                            Some components
                        </Heading4>
                    </Portion>

                    <Portion>
                        <ComponentGrid />
                        <Heading4 fontStyle="serif" weight="400" marginTop="micro">...and many more.</Heading4>
                    </Portion>
                </Row>

                {/* <Div id="component-grid-bg" /> */}
            </Section>

            {/* MANIFESTO ////////////////////////////////////////////////////////////////////////////////////////// */}
            <Section id="manifesto" verticalPadding="medium">
                <Row horizontalPadding="medium" marginBottom="none">
                    <Portion>
                        <Div className="manifesto-card" shadow="soft">
                            <Div className="manifesto-card-content">
                                <Row marginBottom="none" isFullHeight>
                                    <Portion desktopSpan="half">
                                        <Div layoutAsFlexbox isFullHeight stackVertically pushItemsToEnds>
                                            <Header>
                                                <Heading4
                                                    fontStyle="serif" weight="400" textColour="blue-light30"
                                                    marginBottom="nano"
                                                >
                                                    UI frameworks got complicated. We went the other way.
                                                </Heading4>

                                                <Text textColour="blue-light50" marginBottom="micro">
                                                    When designers can read code, everyone ships faster.
                                                </Text>
                                            </Header>

                                            <Link href="/manifesto">
                                                <Text size="large" textColour="amber">
                                                    Read our manifesto&nbsp;&rarr;
                                                </Text>
                                            </Link>
                                        </Div>
                                    </Portion>
                                </Row>

                                <ManifestoIcon />
                            </Div>

                            <Div id="manifesto-card-bg" />
                        </Div>
                    </Portion>
                </Row>

                <Div id="manifesto-section-bg" />
            </Section>
        </Article>
    );
};

export default HomePage;
