"use client";

// REACT CORE ==========================================================================================================
import React from "react";

// UI ==================================================================================================================
import { Row, Portion, Heading1, Text, Divider, Article } from "fictoan-react";

// STYLES ==============================================================================================================
import "./page-manifesto.css";

const ManifestoPage = () => {
    return (
        <Article id="page-manifesto">
            {/* PROBLEM ======================================================================================== */}
            <Row horizontalPadding="large" marginTop="medium" marginBottom="medium">
                <Portion>
                    <Text weight="700" marginBottom="small">MANIFESTO</Text>
                </Portion>

                <Portion desktopSpan="half">
                    <Heading1 weight="400" marginBottom="micro">
                        UI code has become needlessly complex
                    </Heading1>

                    <Text size="large" marginBottom="micro">
                        Utility classes that read like hieroglyphics. CSS-in-JS that bloats your bundle and breaks
                        hydration. "Headless" primitives that leave you building your own design system.
                    </Text>

                    <Text size="large" marginBottom="micro">
                        Copy-paste component libraries that are now your code to maintain. Forever.
                    </Text>

                    <Text size="large" marginBottom="micro">
                        You come back to your own code six months later and need a decoder ring.
                    </Text>

                    <Text size="large" marginBottom="micro">
                        It doesn't have to be this way.
                    </Text>
                </Portion>

                <Portion desktopSpan="4" hideOnTabletPortrait hideOnMobile />

                <Portion desktopSpan="one-third" hideOnTabletPortrait hideOnMobile>
                    <video id="handoff-video" autoPlay muted loop>
                        <source src="/handoff.mp4" />
                    </video>
                </Portion>
            </Row>

            {/* IDEOLOGY ======================================================================================= */}
            <Row horizontalPadding="large" marginTop="medium" marginBottom="medium">
                <Portion desktopSpan="half">
                    <Heading1 weight="400" marginBottom="micro">
                        Readability is a feature
                    </Heading1>
                </Portion>

                <Portion desktopSpan="half">
                    <Text size="large" marginBottom="micro">
                        Code is read far more often than it's written. Your future self, your teammates, the next
                        person on the project—they all need to understand what's happening at a glance.
                    </Text>

                    <Text size="large" marginBottom="micro">
                        Props should say what they mean. A component's purpose should be obvious. Coming back to your
                        UI code shouldn't require archaeology.
                    </Text>
                </Portion>
            </Row>

            <Divider kind="secondary" horizontalMargin="large" marginTop="medium" marginBottom="medium" />

            {/* THE QUESTION =================================================================================== */}
            <Row horizontalPadding="small">
                <Portion desktopSpan="one-sixth" hideOnTabletPortrait hideOnMobile />

                <Portion desktopSpan="two-third">
                    <Heading1 weight="400" marginBottom="small">
                        Why does a card with some padding need a mental lookup table?
                    </Heading1>

                    <Heading1 weight="400" marginBottom="small">
                        Why are we optimising for keystrokes over clarity?
                    </Heading1>

                    <Heading1 weight="400" marginBottom="small">
                        Why does "simple" require so much configuration?
                    </Heading1>

                    <Heading1
                        id="down-arrow"
                        as="h1" weight="400" align="centre"
                    >
                        🡐
                    </Heading1>
                </Portion>
            </Row>

            {/* ENTER FICTOAN ================================================================================== */}
            <Row horizontalPadding="small" marginBottom="medium">
                <Portion desktopSpan="one-sixth" hideOnTabletPortrait hideOnMobile />

                <Portion desktopSpan="two-third">
                    <Heading1 weight="400" marginBottom="micro">
                        Enter Fictoan
                    </Heading1>

                    <Text size="huge" marginBottom="micro">
                        Plain English props that say exactly what they do. <code>bgColour</code>, <code>marginBottom</code>, <code>shadow="soft"</code>, <code>horizontallyCentreThis</code>. No
                        abbreviations to memorise, no utility class cheat sheets.
                    </Text>

                    <Text size="huge" marginBottom="micro">
                        Pure CSS with zero runtime. No style injection, no hydration mismatch, no flash of unstyled
                        content. Just CSS variables that work everywhere.
                    </Text>

                    <Text size="huge" marginBottom="micro">
                        Complete, styled components—not primitives you need to assemble. A Card is a card. A Button
                        looks like a button. Out of the box.
                    </Text>

                    <Text size="huge" marginBottom="micro">
                        An actual library you install and update. Not hundreds of component files copy-pasted into
                        your codebase that you now own forever.
                    </Text>
                </Portion>
            </Row>

            {/* THE BONUS ====================================================================================== */}
            <Row horizontalPadding="small">
                <Portion desktopSpan="one-sixth" hideOnTabletPortrait hideOnMobile />

                <Portion desktopSpan="two-third">
                    <Heading1 weight="400" marginBottom="micro">
                        And here's the bonus
                    </Heading1>

                    <Text size="huge" marginBottom="micro">
                        Code this obvious can be read by anyone. Including designers.
                    </Text>
                </Portion>
            </Row>

            <Row horizontalPadding="small" marginBottom="medium">
                <Portion desktopSpan="one-sixth" hideOnTabletPortrait hideOnMobile />

                <Portion desktopSpan="two-third">
                    <Text size="huge" marginBottom="micro">
                        That margin that's 2px off? That hover state with the wrong tint? Instead of a ticket and
                        three rounds of review, they can just fix it. Or at least understand exactly what needs to
                        change.
                    </Text>

                    <Text size="huge" marginBottom="micro">
                        Less back-and-forth. Less context-switching. More shipping.
                    </Text>

                    <Text size="huge">
                        Your time stays on architecture, performance, the hard problems. The UI layer becomes
                        something everyone can contribute to—because everyone can read it.
                    </Text>
                </Portion>
            </Row>
        </Article>
    );
};

export default ManifestoPage;
