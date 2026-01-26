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
    Heading1,
    Heading2,
    Header,
    Badge,
    CodeBlock,
}from "fictoan-react";

// LOCAL COMPONENTS ====================================================================================================
import { CodeComparison } from "$components/CodeComparison/CodeComparison";
import { ComponentGrid } from "$components/ComponentGrid/ComponentGrid";
import { DensityGridPattern } from "$components/DensityGridPattern/DensityGridPattern";
import { IntroCode } from "$components/IntroCode/IntroCode";

// ASSETS ==============================================================================================================
import AirplaneIcon from "../assets/icons/pictograms/paper-airplane.svg";
import DocumentIcon from "../assets/icons/pictograms/dead-document.svg";
import GhostIcon from "../assets/icons/pictograms/ghost.svg";
import LightingIcon from "../assets/icons/pictograms/lightning-bolt.svg";

// STYLES ==============================================================================================================
import "./home.css";

const HomePage = () => {
    return (
        <Article id="home-page">
            {/* HERO /////////////////////////////////////////////////////////////////////////////////////////////// */}
            <Section id="hero-section" verticalPadding="tiny">
                <Row horizontalPadding="medium" marginBottom="none">
                    <Portion>
                        <Card id="hero-card" padding="large" shape="rounded" shadow="soft">
                            <Row marginBottom="none">
                                <Portion desktopSpan="two-third">
                                    <Heading1 textColour="white">
                                        Make UI code readable again.
                                    </Heading1>

                                    <Heading4 textColour="white" marginBottom="tiny">
                                        Components so obvious, and props that read like prose.
                                    </Heading4>

                                    <Heading4 weight="400" textColour="white" marginBottom="small">
                                        Pure CSS, zero runtime. A library so simple, and UI code that can be
                                        maintained by designers.
                                    </Heading4>
                                </Portion>
                            </Row>

                            <Div id="hero-card-bg" />
                        </Card>
                    </Portion>
                </Row>
            </Section>

            {/* INTRO CODE ///////////////////////////////////////////////////////////////////////////////////////// */}
            <Section id="intro-code-section" marginBottom="small">
                <IntroCode />
            </Section>

            {/* QUICKSTART ///////////////////////////////////////////////////////////////////////////////////////// */}
            <Section id="quickstart-section" marginBottom="small">
                <Row horizontalPadding="medium">
                    <Portion desktopSpan="half">
                        <Heading4 marginBottom="micro">Quickstart</Heading4>
                        <CodeBlock
                            language="bash"
                            withSyntaxHighlighting
                            showCopyButton
                            source={`pnpm add fictoan-react@2.0.0-beta.6
# or
yarn add fictoan-react@2.0.0-beta.6
# or
npm install fictoan-react@2.0.0-beta.6`}
                        />
                    </Portion>

                    <Portion desktopSpan="half">
                        <Heading4 marginBottom="micro">Claude Code skill</Heading4>
                        <Text marginBottom="nano">
                            This repo includes a{" "}
                            <Link href="https://github.com/fictoan/fictoan/blob/main/.claude/skills/fictoan.md">
                                Claude Code skill
                            </Link>{" "}
                            that teaches Claude the Fictoan component patterns. Just run:
                        </Text>
                        <CodeBlock
                            language="bash"
                            withSyntaxHighlighting
                            showCopyButton
                            source="/fictoan"
                        />
                    </Portion>
                </Row>
            </Section>

            {/* DIFFERENTIATORS //////////////////////////////////////////////////////////////////////////////////// */}
            <Section id="differentiators-section" paddingTop="small">
                <DensityGridPattern
                    dotSize={12} gap={24}
                    color="var(--green)" opacity={0.24}
                    fadeDirection="to-bottom"
                    height="80%"
                />

                <Row horizontalPadding="medium" marginBottom="small">
                    <Portion desktopSpan="two-third">s
                        <Heading4>
                            What’s different
                        </Heading4>
                    </Portion>

                    <Portion desktopSpan="one-third" />

                    <Portion desktopSpan="half">
                        <Card className="differentiator-card" padding="micro" shape="rounded">
                            <Header>
                                <GhostIcon />

                                <Heading6 marginTop="nano">
                                    No cryptic class names
                                </Heading6>
                            </Header>

                            <Text>
                                Semantic props
                                like <code>bgColour</code>, <code>marginBottom</code>, <code>horizontallyCentreThis</code>,
                                and <code>stackVertically</code> etc, not abbreviated utility classes to memorise. And,
                                you can use either British and US spelling for props!</Text>
                        </Card>
                    </Portion>

                    <Portion desktopSpan="half">
                        <Card className="differentiator-card" padding="micro" shape="rounded">
                            <Header>
                                <LightingIcon />

                                <Heading6 marginTop="nano">
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
                        <Card className="differentiator-card" padding="micro" shape="rounded">
                            <Header>
                                <AirplaneIcon />

                                <Heading6 marginTop="nano">
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
                        <Card className="differentiator-card" padding="micro" shape="rounded">
                            <Header>
                                <DocumentIcon />

                                <Heading6 marginTop="nano">
                                    No copy-paste to maintain
                                </Heading6>
                            </Header>

                            <Text>
                                An actual library with updates. You don’t need to setup and maintain hundreds of
                                component files.
                            </Text>
                        </Card>
                    </Portion>
                </Row>
            </Section>

            {/* COMPARISON ///////////////////////////////////////////////////////////////////////////////////////// */}
            <Section id="comparison-section">
                <CodeComparison />
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
        </Article>
    );
};

export default HomePage;
