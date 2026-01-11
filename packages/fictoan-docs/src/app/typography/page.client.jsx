"use client";

// REACT CORE ==========================================================================================================
import React, { useEffect, useRef, useState } from "react";

// UI ==================================================================================================================
import {
    Element,
    Heading1,
    Heading2,
    Heading3,
    Heading4,
    Heading5,
    Heading6,
    Divider,
    Portion,
    Row,
    Text,
    Article,
    CodeBlock,
    Hyperlink,
    Section,
    Card,
    Range,
}from "fictoan-react";

// LOCAL COMPONENTS ====================================================================================================
import { PropsList } from "../../components/PropsList/PropsList";

// STYLES ==============================================================================================================
import "./page-typography.css";

// OTHER ===============================================================================================================
import { listOfHeadingProps, listOfTextProps } from "./propsList";
import { sampleFontImport, sampleHeadings, sampleTextSizing, sampleTextTheme, } from "./CodeSamples";

const TypographyDocs = () => {
    const [fontSizes, setFontSizes] = useState({});
    const [baseFontSize, setBaseFontSize] = useState(1);
    const [typeScale, setTypeScale] = useState(1.125);

    const h1Ref = useRef(null);
    const h2Ref = useRef(null);
    const h3Ref = useRef(null);
    const h4Ref = useRef(null);
    const h5Ref = useRef(null);
    const h6Ref = useRef(null);
    const pRef = useRef(null);
    const demoRef = useRef(null);

    // Calculate sizes directly from state values (more reliable than getComputedStyle)
    const calculateSizes = () => {
        // Get viewport width in pixels
        const viewportWidth = window.innerWidth;
        const remSize = 16; // browser default

        // Calculate fluid factor: 0 at 320px, 1 at 1600px
        const minWidth = 320;
        const maxWidth = 1600;
        const fluid = Math.max(0, Math.min(1, (viewportWidth - minWidth) / (maxWidth - minWidth)));

        // Base size is fixed (what user sets)
        const base = baseFontSize * remSize;

        // Scale varies with viewport (±0.04 from the set value)
        const scale = typeScale - 0.04 + 0.08 * fluid;

        // Calculate each size level
        const medium = base;
        const large = medium * scale;
        const huge = large * scale;
        const mega = huge * scale;
        const giga = mega * scale;
        const tera = giga * scale;
        const peta = tera * scale;

        return {
            size1: `${Math.round(peta)}px`,   // H1
            size2: `${Math.round(tera)}px`,   // H2
            size3: `${Math.round(giga)}px`,   // H3
            size4: `${Math.round(mega)}px`,   // H4
            size5: `${Math.round(huge)}px`,   // H5
            size6: `${Math.round(large)}px`,  // H6
            size7: `${Math.round(medium)}px`, // Body
        };
    };

    // Update CSS variables and recalculate sizes
    useEffect(() => {
        document.documentElement.style.setProperty("--base-font-size", `${baseFontSize}rem`);
        document.documentElement.style.setProperty("--type-scale", typeScale);
        setFontSizes(calculateSizes());
    }, [baseFontSize, typeScale]);

    // Recalculate on viewport resize
    useEffect(() => {
        setFontSizes(calculateSizes());

        const handleResize = () => setFontSizes(calculateSizes());
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [baseFontSize, typeScale]);

    return (
        <Article id="page-typography">
            {/* INTRO ////////////////////////////////////////////////////////////////////////////////////////////// */}
            <Row horizontalPadding="huge" marginTop="medium" marginBottom="small">
                <Portion>
                    <Heading1 className="test-heading">Typography</Heading1>
                </Portion>
            </Row>

            <PropsList propData={listOfHeadingProps} />

            <Element as="div" marginTop="small" />

            <PropsList propData={listOfTextProps} />

            {/* BASICS ///////////////////////////////////////////////////////////////////////////////////////////// */}
            <Section id="basics">
                <Row horizontalPadding="huge" marginTop="medium">
                    <Portion>
                        <Heading4 marginBottom="nano">Basics</Heading4>
                        <Text>
                            There are three main kinds of type elements—the<code>Heading</code>, <code>Text</code> and
                            links.
                        </Text>
                    </Portion>
                </Row>

                <Row horizontalPadding="huge" marginBottom="micro">
                    <Portion desktopSpan="half">
                        <Range
                            label={`Base font size`}
                            min={0.75}
                            max={1.5}
                            step={0.25}
                            value={baseFontSize}
                            suffix=" rem"
                            onChange={(value) => setBaseFontSize(value)}
                            isFullWidth
                        />
                    </Portion>

                    <Portion desktopSpan="half">
                        <Range
                            label={`Type scale: ${typeScale.toFixed(4)}`}
                            min={1.0}
                            max={1.5}
                            step={0.01}
                            value={typeScale}
                            onChange={(value) => setTypeScale(value)}
                        />
                    </Portion>
                </Row>

                <Row horizontalPadding="small">
                    <Portion>
                        <Card padding="micro" shape="rounded" ref={demoRef}>
                            <Heading1 ref={h1Ref} marginBottom="nano">H1 — {fontSizes.size1}</Heading1>
                            <Heading2 ref={h2Ref} marginBottom="nano">H2 — {fontSizes.size2}</Heading2>
                            <Heading3 ref={h3Ref} marginBottom="nano">H3 — {fontSizes.size3}</Heading3>
                            <Heading4 ref={h4Ref} marginBottom="nano">H4 — {fontSizes.size4}</Heading4>
                            <Heading5 ref={h5Ref} marginBottom="nano">H5 — {fontSizes.size5}</Heading5>
                            <Heading6 ref={h6Ref} marginBottom="nano">H6 — {fontSizes.size6}</Heading6>
                            <Text ref={pRef} marginBottom="nano">Body — {fontSizes.size7}</Text>

                            <Text>
                                <Hyperlink href="https://fictoan.io/">Link — {fontSizes.size7}</Hyperlink>
                            </Text>
                        </Card>
                    </Portion>
                </Row>
            </Section>

            <Divider kind="primary" horizontalMargin="huge" verticalMargin="small" />

            {/* HEADINGS /////////////////////////////////////////////////////////////////////////////////////////// */}
            <Element as="section" id="headings">
                <Row horizontalPadding="huge">
                    <Portion>
                        <Heading4 marginBottom="nano">Heading</Heading4>
                        <Text>The <code>Heading</code> element comes in six sizes, like so&mdash;</Text>
                    </Portion>

                    <Portion>
                        <CodeBlock withSyntaxHighlighting source={sampleHeadings} showCopyButton language="jsx" />
                    </Portion>
                </Row>

                <Divider kind="primary" horizontalMargin="huge" verticalMargin="small" />
            </Element>

            {/* TEXT and LINKS ///////////////////////////////////////////////////////////////////////////////////// */}
            <Section id="text">
                <Row horizontalPadding="huge">
                    <Portion>
                        <Heading4 marginBottom="nano">Text and links</Heading4>
                        <Text>The <code>Text</code> element pretty straight-forward&mdash;</Text>
                    </Portion>

                    <Portion>
                        <CodeBlock withSyntaxHighlighting showCopyButton language="jsx" marginBottom="micro">
                            &lt;Text&gt;Some text&lt;/Text&gt;
                        </CodeBlock>

                        <Text marginBottom="nano">For links, you can use the <code>Hyperlink</code> element.</Text>
                        <CodeBlock withSyntaxHighlighting showCopyButton language="jsx">
                            &lt;Hyperlink href="https://fictoan.io/"&gt;Link text&lt;/Hyperlink&gt;
                        </CodeBlock>
                    </Portion>
                </Row>

                <Divider kind="primary" horizontalMargin="huge" verticalMargin="small" />
            </Section>

            {/* COLOURING ////////////////////////////////////////////////////////////////////////////////////////// */}
            <Section id="text">
                <Row horizontalPadding="huge">
                    <Portion>
                        <Heading4 marginBottom="nano">Colouring</Heading4>
                        <Text marginBottom="micro">
                            The <code>textColour</code> / <code>textColor</code> prop let’s you add, well, colour to the
                            text. You can check out the full list of colours in the <a href="/colour">Colour</a> page.
                        </Text>
                    </Portion>

                    <Portion>
                        <CodeBlock withSyntaxHighlighting language="jsx" marginTop="nano">
                            &lt;Heading6 textColour="red-light30"&gt;I’m red-light30&lt;/Heading6&gt;
                        </CodeBlock>
                        <Heading6
                            marginBottom="micro" marginTop="nano"
                            textColour="red-light30"
                        >
                            I’m red-light30
                        </Heading6>
                    </Portion>

                    <Portion>
                        <CodeBlock withSyntaxHighlighting language="jsx" marginTop="nano">
                            &lt;Text textColor="violet-dark10"&gt;I’m violet-dark10&lt;/Text&gt;
                        </CodeBlock>
                        <Text
                            marginBottom="micro" marginTop="nano"
                            textColor="violet-dark10"
                        >
                            I’m violet-dark10
                        </Text>
                    </Portion>

                    <Portion>
                        <CodeBlock withSyntaxHighlighting language="jsx" marginTop="nano">
                            &lt;Heading4 textColour="pistachio"&gt;I’m pistachio&lt;/Heading4&gt;
                        </CodeBlock>
                        <Heading4
                            marginBottom="micro" marginTop="nano"
                            textColour="pistachio"
                        >
                            I’m pistachio
                        </Heading4>
                    </Portion>

                    <Portion>
                        <Text>
                            The link colouring is handled globally in the theme. but there’s nothing really stopping you
                            from doing this—
                        </Text>
                    </Portion>
                </Row>

                <Divider kind="primary" horizontalMargin="huge" verticalMargin="small" />
            </Section>

            {/* GLOBAL STYLING ///////////////////////////////////////////////////////////////////////////////////// */}
            <Section id="global-styling">
                <Row horizontalPadding="huge">
                    <Portion>
                        <Heading4 marginBottom="nano">Global variables</Heading4>
                    </Portion>

                    <Portion>
                        <Text marginBottom="micro">
                            The theme file is where you can set global defaults for entire project.
                        </Text>

                        <CodeBlock
                            withSyntaxHighlighting
                            source={sampleTextTheme}
                            language="jsx"
                            marginBottom="micro"
                        />

                        <Divider kind="secondary" verticalMargin="micro" />
                    </Portion>

                    <Portion>
                        <Heading6 marginBottom="nano">Loading custom fonts</Heading6>
                    </Portion>

                    <Portion>
                        <Text marginBottom="micro">
                            Before changing the font-family values in the theme, you need to load the font in your
                            project. Here’s an example of how it’s done in the boilerplate.
                        </Text>

                        <CodeBlock withSyntaxHighlighting source={sampleFontImport} language="jsx"
                                   marginBottom="micro" />

                        <Text marginBottom="micro">
                            Add the font files to your project, and import them in the <code>fonts.css</code> file,
                            using the <code>@font-face</code> rule.
                        </Text>

                        <Text marginBottom="nano">
                            Just add your font to the project, import it, and add the names here.
                        </Text>
                    </Portion>
                </Row>

                <Divider kind="primary" horizontalMargin="huge" verticalMargin="small" />
            </Section>

            {/* SIZING ///////////////////////////////////////////////////////////////////////////////////////////// */}
            <Section id="fluid-typography">
                <Row horizontalPadding="huge">
                    <Portion>
                        <Heading4 marginBottom="nano">Fluid typography</Heading4>
                    </Portion>

                    <Portion>
                        <Text marginBottom="nano">
                            Instead of text suddenly jumping between sizes at specific breakpoints, fluid typography
                            creates a smooth transition between your smallest and largest sizes. Think of it like a
                            slider that moves between two points:
                        </Text>
                        <Text marginBottom="nano">A minimum size, for mobile screens</Text>
                        <Text marginBottom="nano">A maximum size, for desktop screens</Text>

                        <Text>
                            As the screen size changes, the text sizes adjust proportionally. This means your typography
                            looks great at any screen size, not just at specific breakpoints.
                        </Text>

                        <Divider kind="secondary" verticalMargin="micro" />

                        {/* CUSTOMISING THE SCALE ================================================================== */}
                        <Heading6 marginBottom="nano">Customising the scale</Heading6>
                        <Text marginBottom="micro">
                            You can adjust how the scale behaves by changing two variables in your theme:
                        </Text>

                        <CodeBlock withSyntaxHighlighting language="css" showCopyButton marginBottom="nano">
                            {`:root {
    --base-font-size : 1rem;   /* Body text size */
    --type-scale     : 1.125;  /* Ratio between steps */
}`}
                        </CodeBlock>

                        <Text marginBottom="micro">
                            The <code>type-scale</code> determines how much bigger each step gets. A larger ratio means
                            more dramatic size differences between levels.
                        </Text>

                        <Divider kind="secondary" verticalMargin="micro" />

                        {/* HOW THE MATH WORKS ===================================================================== */}
                        <Heading6 marginTop="micro" marginBottom="nano">How it works</Heading6>
                        <Text marginBottom="micro">
                            Fictoan automatically scales your typography based on viewport width:
                        </Text>

                        <Text marginBottom="nano">1. At 320px (mobile), your base size stays
                            at <code>--base-font-size</code></Text>
                        <Text marginBottom="nano">2. At 1600px (desktop), the base grows by 25% (e.g., 1rem →
                            1.25rem)</Text>
                        <Text marginBottom="nano">3. Each step up multiplies by <code>--type-scale</code></Text>

                        <Text marginTop="micro" marginBottom="micro">
                            For example, with the defaults (1rem base, 1.125 scale):
                        </Text>
                        <Text marginLeft="micro" marginBottom="nano">• On mobile: medium=16px, large=18px,
                            huge=20px...</Text>
                        <Text marginLeft="micro" marginBottom="nano">• On desktop: medium=20px, large=23px,
                            huge=25px...</Text>

                        <Divider kind="secondary" verticalMargin="micro" />

                        <Heading6 marginBottom="nano">Common type scales</Heading6>
                        <Text marginBottom="nano">• <code>1.067</code> — Minor second (subtle, tight hierarchy)</Text>
                        <Text marginBottom="nano">• <code>1.125</code> — Major second (balanced, default)</Text>
                        <Text marginBottom="nano">• <code>1.200</code> — Minor third (moderate contrast)</Text>
                        <Text marginBottom="nano">• <code>1.250</code> — Major third (strong hierarchy)</Text>
                        <Text marginBottom="nano">• <code>1.333</code> — Perfect fourth (dramatic, editorial)</Text>

                        <Divider kind="secondary" verticalMargin="micro" />

                        <Heading6 marginBottom="nano">Customising the system</Heading6>
                        <Text marginTop="micro" marginBottom="nano">Tips:</Text>
                        <Text marginBottom="nano">• Keep <code>--base-font-size</code> at 1rem for accessibility
                            (respects user's browser settings)</Text>
                        <Text marginBottom="nano">• Larger scale ratios create more dramatic size differences</Text>
                        <Text marginBottom="nano">• Smaller scale ratios create more subtle hierarchies</Text>
                        <Text>• Test your changes across different screen sizes to ensure readability</Text>
                    </Portion>
                </Row>

                <Divider horizontalMargin="huge" kind="secondary" marginTop="micro" marginBottom="micro" />

                <Row horizontalPadding="huge" marginBottom="micro">
                    <Portion>
                        <Heading6 marginBottom="nano">Text sizing</Heading6>
                    </Portion>

                    <Portion>
                        <Text marginBottom="micro">
                            Now, you might not want to use headings every time you want to change the size of the text.
                            For this, you can use a prop called <code>size</code> to increase or decrease body font.
                        </Text>

                        <Text size="nano">Nano text</Text>
                        <Text size="micro">Micro text</Text>
                        <Text size="tiny">Tiny text</Text>
                        <Text size="small">Small text</Text>
                        <Text size="medium">Medium text</Text>
                        <Text size="large">Large text</Text>
                        <Text size="huge">Huge text</Text>
                    </Portion>

                    <Portion>
                        <CodeBlock withSyntaxHighlighting source={sampleTextSizing} language="jsx" />
                    </Portion>
                </Row>
            </Section>
        </Article>
    );
};

export default TypographyDocs;
