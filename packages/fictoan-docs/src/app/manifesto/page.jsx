// EXTERNAL DEPS ///////////////////////////////////////////////////////////////
import React from "react";

// INTERNAL DEPS ///////////////////////////////////////////////////////////////
import {
    Element,
    Row,
    Portion,
    Heading1,
    Text,
    Divider,
    Article,
} from "fictoan-react";

// COMPONENTS //////////////////////////////////////////////////////////////////

// STYLES //////////////////////////////////////////////////////////////////////
import "./page-manifesto.css";

// ASSETS //////////////////////////////////////////////////////////////////////

export const metadata = {
    title       : "Manifesto — Fictoan UI",
    description : "Why learning code is valuable as a designer, and the time is now to be a generalist",
    openGraph   : {
        title       : "Manifesto — Fictoan UI",
        description : "Why learning code is valuable as a designer, and the time is now to be a generalist",
        url         : "https://fictoan.io/manifesto",
        siteName    : "Fictoan UI",
        images      : [
            {
                url    : "https://fictoan.io/components/option-card/opengraph-image",
                width  : 1200,
                height : 630,
                alt    : "Manifesto — Fictoan UI",
            },
        ],
        locale      : "en_US",
        type        : "website",
    },
    twitter     : {
        card        : "summary_large_image",
        title       : "Manifesto — Fictoan UI",
        description : "Why learning code is valuable as a designer, and the time is now to be a generalist",
        images      : ["https://fictoan.io/components/option-card/opengraph-image"],
    },
};

const Manifesto = () => {
    return (
        <Article id="page-manifesto">
            {/* INTRO ////////////////////////////////////////////////////////////////////////////////////////////// */}
            <Row horizontalPadding="large" marginTop="medium" marginBottom="medium">
                {/* PROBLEM ================================================ */}
                <Portion>
                    <Text weight="700" marginBottom="small">MANIFESTO</Text>
                </Portion>

                <Portion desktopSpan="half">
                    <Heading1 weight="400" marginBottom="micro">
                        The hand-off process is broken
                    </Heading1>

                    <Text size="large" marginBottom="micro">
                        Hand-offs are treated akin to passing baton, and a its-your-problem-now attitude.
                    </Text>

                    <Text size="large" marginBottom="micro">
                        Designers and developers bickering over details is a common sight.
                    </Text>

                    <Text size="large" marginBottom="micro">
                        Back and forth over specifics is a massive time-sponge.
                    </Text>

                    <Text size="large" marginBottom="micro">
                        It shouldn’t be this way.
                    </Text>
                </Portion>

                <Portion desktopSpan="4" tabletPortraitSpan="one-third" />

                {/* VIDEO ================================================== */}
                <Portion desktopSpan="one-third" tabletPortraitSpan="one-third">
                    <video id="handoff-video" autoPlay muted loop>
                        <source src="/handoff.mp4" />
                    </video>
                </Portion>
            </Row>

            {/* IDEOLOGY /////////////////////////////////////////////////////////////////////////////////////////// */}
            <Row horizontalPadding="large" marginTop="medium" marginBottom="medium">
                <Portion desktopSpan="half">
                    <Heading1 weight="400" marginBottom="micro">
                        Pixel perfection is a designer’s job
                    </Heading1>
                </Portion>

                <Portion desktopSpan="half">
                    <Text size="large" marginBottom="micro">
                        A meticulously-crafted Figma file should not be the end of the line. A designer should be
                        able to translate that to reality—and not let other interpret it as they see fit.
                    </Text>

                    <Text size="large" marginBottom="micro">
                        Instead of constant back and forth with the dev about specifics, why not made the changes in
                        code directly, and save time and headaches?
                    </Text>
                </Portion>
            </Row>

            <Divider kind="secondary" horizontalMargin="large" marginTop="medium" marginBottom="medium" />

            {/* APPROACH /////////////////////////////////////////////////////////////////////////////////////////// */}
            <Row horizontalPadding="small">
                <Portion desktopSpan="one-sixth" />

                <Portion desktopSpan="two-third">
                    <Heading1 weight="400" marginBottom="small">
                        The margin’s off? The hover state is the wrong tint? The font weight feels wrong?
                    </Heading1>

                    <Heading1 weight="400" marginBottom="small">
                        Sacrilege, yes. But wait—why not just fix it instead of raising a ticket?
                    </Heading1>

                    <Heading1 weight="400" marginBottom="small">
                        It’s not that scary.
                    </Heading1>

                    <Heading1
                        id="down-arrow"
                        as="h1" weight="400" align="centre"
                    >
                        🡐
                    </Heading1>
                </Portion>
            </Row>

            <Row horizontalPadding="small" marginBottom="medium">
                <Portion desktopSpan="one-sixth" />

                <Portion desktopSpan="two-third">
                    <Heading1 weight="400" marginBottom="micro">
                        Enter FICTOAN
                    </Heading1>

                    <Text size="huge" marginBottom="micro">
                        Fictoan stems from the idea that true hand-off between the designer and developer must be in
                        code, rather than a set of static images or art-boards.
                    </Text>

                    <Text size="huge" marginBottom="micro">
                        The designer should be in complete control of the interface and the experience, rather than the
                        developer trying to interpret the designer’s intentions via a document.
                    </Text>

                    <Text size="huge" marginBottom="micro">
                        That way, the designer can focus on usability, accessibility, and aesthetics, while the
                        developer can focus on performance, scalability, and maintainability.
                    </Text>

                    <Text size="huge" marginBottom="micro">
                        The goal must be to build and ship, and not bicker whose job it is to fix UI bugs. These things
                        are best left to the designer, so that the developer can spend their time on things like
                        performance and deployments.
                    </Text>
                </Portion>
            </Row>

            {/* APPROACH /////////////////////////////////////////////////////////////////////////////////////////// */}
            <Row horizontalPadding="small">
                <Portion desktopSpan="one-sixth" />

                <Portion desktopSpan="two-third">
                    <Text size="huge">
                        While design tools are getting better and powerful by the day, there’s nothing really quite the
                        same as passing off working code. We think this will remain true for quite some time, and in the
                        meanwhile, see how we can make the lives of a designer and a developer easier.
                    </Text>
                </Portion>
            </Row>

            <Row horizontalPadding="small" marginBottom="medium">
                <Portion desktopSpan="one-sixth" />

                <Portion desktopSpan="two-third">
                    <Text size="huge" marginBottom="micro">
                        The other principle Fictoan is built around is simplicity and obviousness. This is best
                        reflected in the naming conventions and the prop nomenclature.
                    </Text>

                    <Text size="huge">
                        The idea is to remove the entry barriers for people dipping their toes into code for the
                        first time, especially for those from a design background. The easiest way to do this is to
                        simply keep everything in plain English, and not introduce complexities and conditional
                        hierarchies, that is most often the case with most other frameworks.
                    </Text>
                </Portion>
            </Row>
        </Article>
    );
};

export default Manifesto;
