// EXTERNAL DEPS =======================================================================================================
import React from "react";

// INTERNAL DEPS =======================================================================================================
import {
    Heading2, Heading4, Divider, Portion, Row, Text, Article, CodeBlock
} from "fictoan-react";

// COMPONENTS ==========================================================================================================
import { PropsList } from "../../components/PropsList/PropsList";

// STYLES ==============================================================================================================
import "./base-element.css";

// CODE SNIPPETS =======================================================================================================
import { sampleElement } from "./CodeSamples";

// DATA ================================================================================================================
import { listOfBaseElementProps } from "./propsList";

export const metadata = {
    title       : "Base element — Fictoan UI",
    description : "A common wrapper tag so you can add Fictoan props to any element",
    openGraph   : {
        title       : "Base element — Fictoan UI",
        description : "A common wrapper tag so you can add Fictoan props to any element",
        url         : "https://fictoan.io/base-element",
        siteName    : "Fictoan UI",
        images      : [
            {
                url    : "https://fictoan.io/base-element/opengraph-image",
                width  : 1200,
                height : 630,
                alt    : "Base element — Fictoan UI",
            },
        ],
        locale      : "en_US",
        type        : "website",
    },
    twitter     : {
        card        : "summary_large_image",
        title       : "Base element — Fictoan UI",
        description : "A common wrapper tag so you can add Fictoan props to any element",
        images      : ["https://fictoan.io/base-element/opengraph-image"],
    },
};

const BaseElementDocs = () => {
    return (
        <Article id="page-base-element">
            {/* //////////////////////////////////////////////////////////////////////////////////////////////////// */}
            {/* INTRO */}
            {/* //////////////////////////////////////////////////////////////////////////////////////////////////// */}
            <Row horizontalPadding="huge" marginTop="medium">
                <Portion>
                    <Heading2 marginBottom="micro">Base element</Heading2>
                    <Text marginBottom="micro">
                        This is a common wrapper tag that lets you use the Fictoan props, such as <code>marginTop</code>,
                        or <code>horizontallyCentreThis</code> etc.
                    </Text>

                    <Text marginBottom="micro">
                        While <code>Element</code> supports all HTML entities, you can explicitly use some tags
                        natively:
                        <code>Article</code>,
                        <code>Aside</code>,
                        <code>Body</code>,
                        <code>Div</code>,
                        <code>Footer</code>,
                        <code>Header</code>,
                        <code>Main</code>,
                        <code>Nav</code>,
                        <code>Section</code>, and <code>Span</code>.
                    </Text>
                </Portion>
            </Row>

            <PropsList propData={listOfBaseElementProps} />

            <Divider kind="primary" horizontalMargin="huge" verticalMargin="tiny" />

            {/* //////////////////////////////////////////////////////////////////////////////////////////////////// */}
            {/* USAGE */}
            {/* //////////////////////////////////////////////////////////////////////////////////////////////////// */}
            <Row horizontalPadding="huge">
                <Portion>
                    <Heading4 marginBottom="micro">Usage</Heading4>

                    <CodeBlock withSyntaxHighlighting source={sampleElement} language="jsx" />

                    <Text marginTop="micro" marginBottom="micro">
                        Not adding the <code>as</code> prop will render a <code>div</code> element by default.
                    </Text>
                </Portion>
            </Row>
        </Article>
    );
};

export default BaseElementDocs;
