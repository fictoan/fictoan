"use client";

// EXTERNAL DEPS =======================================================================================================
import React from "react";

// INTERNAL DEPS =======================================================================================================
import {
    Heading2,
    Heading4, Divider, Portion, Row, Text, Article, CodeBlock, Heading6, Button, useTheme, Callout,
} from "fictoan-react";

// COMPONENTS ==========================================================================================================
import { SearchableCodeBlock } from "./SearchableCodeBlock";

// STYLES ==============================================================================================================
import "./page-theming.css";

// CODE SNIPPETS =======================================================================================================
import {
    sampleThemeFile1, sampleThemeFile2, sampleThemeFile3,
    sampleThemeProviderSetup,
    sampleSwitcherSetup,
    sampleThemeGlobals,
    sampleFictoanTheme,
} from "./CodeSamples";

const ThemeDocs = () => {
    return (
        <Article id="page-theming">
            {/* INTRO ////////////////////////////////////////////////////////////////////////////////////////////// */}
            <Row horizontalPadding="huge" marginTop="medium" marginBottom="small">
                <Portion>
                    <Heading2 marginBottom="micro">Theme</Heading2>
                    <Text size="large">
                        A comprehensive list of variables to change the look and feel of your app from a single
                        place.
                    </Text>
                </Portion>
            </Row>

            {/* GLOBALS //////////////////////////////////////////////////////////////////////////////////////////// */}
            <Row horizontalPadding="huge">
                <Portion>
                    <Heading4 marginBottom="small">Usage</Heading4>

                    {/* STEP 1 — Create theme files ================================================================ */}
                    <Heading6 marginBottom="nano">Step 1 — Create theme files</Heading6>
                    <Text marginBottom="micro">
                        Create separate CSS files for each theme you need, and wrap your variables in a recognisable
                        class name.
                    </Text>

                    <CodeBlock withSyntaxHighlighting source={sampleThemeFile1} language="css" marginBottom="micro" />
                    <CodeBlock withSyntaxHighlighting source={sampleThemeFile2} language="css" marginBottom="micro" />

                    <Text marginBottom="nano">
                        Or for more specific needs—
                    </Text>

                    <CodeBlock withSyntaxHighlighting source={sampleThemeFile3} language="css" />

                    <Divider kind="secondary" verticalMargin="micro" />

                    {/* STEP 2 — Create theme files ================================================================ */}
                    <Heading6 marginBottom="nano">Step 2 — Setup ThemeProvider</Heading6>
                    <Text marginBottom="micro">
                        Then, in your main app entry point create a <code>ThemeProvider</code> component, and wrap your
                        app in it.
                    </Text>

                    <CodeBlock withSyntaxHighlighting source={sampleThemeProviderSetup} language="jsx" />

                    <Divider kind="secondary" verticalMargin="micro" />

                    {/* STEP 3 — Add theme switching =============================================================== */}
                    <Heading6 marginBottom="nano">Step 3 — Switching themes</Heading6>
                    <Text marginBottom="micro">
                        Now, you can either have apply themes directly, or use a toggle approach.
                    </Text>

                    <CodeBlock withSyntaxHighlighting source={sampleSwitcherSetup} language="jsx"
                               marginBottom="micro" />

                    <Text marginBottom="micro">
                        That&rsquo;s it!
                    </Text>

                    <Callout kind="info">
                        <Text textColour="black">
                            The reason why we need to create a separate ThemeButtons component is because
                            the <code>useTheme</code> hook would otherwise run before <code>ThemeProvider</code> is
                            rendered, and that would cause it have no context of the themes.
                        </Text>
                    </Callout>
                </Portion>
            </Row>

            <Divider kind="primary" horizontalMargin="huge" verticalMargin="small" />

            {/* VARIABLES ========================================================================================== */}
            <Row horizontalPadding="huge">
                <Portion>
                    <Heading4 marginBottom="micro">Variables</Heading4>

                    <Text size="large" weight="700" textColour="white" marginBottom="nano">Globals</Text>

                    <CodeBlock withSyntaxHighlighting source={sampleThemeGlobals} language="css" marginBottom="micro" />
                </Portion>
            </Row>

            <Divider kind="secondary" horizontalMargin="huge" verticalMargin="micro" />


            {/* THEME ============================================================================================== */}
            <Row horizontalPadding="huge">
                <Portion>
                    <Text size="large" weight="700" textColour="white" marginBottom="nano">Full Fictoan theme</Text>

                    <SearchableCodeBlock source={sampleFictoanTheme} language="css" marginBottom="micro" />
                </Portion>
            </Row>
        </Article>
    );
};

export default ThemeDocs;
