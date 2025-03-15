"use client";

// EXTERNAL DEPS =======================================================================================================
import React, { useEffect, useRef, useState } from "react";

// INTERNAL DEPS =======================================================================================================
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
    Table,
    Text,
    Article,
    CodeBlock, Hyperlink, Section,
} from "fictoan-react";

// COMPONENTS ==========================================================================================================
import { PropsList } from "../../components/PropsList/PropsList";

// STYLES ==============================================================================================================
import "./page-typography.css";

// CODE SNIPPETS =======================================================================================================
import {
    sampleFontImport,
    sampleHeadings,
    sampleTextSizing,
    sampleTextTheme,
} from "./CodeSamples";

// DATA ================================================================================================================
import { listOfHeadingProps, listOfTextProps } from "./propsList";


const TypographyDocs = () => {
    const [fontSizes, setFontSizes] = useState({});
    const h1Ref = useRef(null);
    const h2Ref = useRef(null);
    const h3Ref = useRef(null);
    const h4Ref = useRef(null);
    const h5Ref = useRef(null);
    const h6Ref = useRef(null);
    const pRef = useRef(null);

    const updateSizes = () => {
        setFontSizes({
            size1 : h1Ref.current ? getComputedStyle(h1Ref.current).fontSize : "",
            size2 : h2Ref.current ? getComputedStyle(h2Ref.current).fontSize : "",
            size3 : h3Ref.current ? getComputedStyle(h3Ref.current).fontSize : "",
            size4 : h4Ref.current ? getComputedStyle(h4Ref.current).fontSize : "",
            size5 : h5Ref.current ? getComputedStyle(h5Ref.current).fontSize : "",
            size6 : h6Ref.current ? getComputedStyle(h6Ref.current).fontSize : "",
            size7 : pRef.current ? getComputedStyle(pRef.current).fontSize : "",
        });
    };

    useEffect(() => {
        updateSizes();
        window.addEventListener("resize", updateSizes);
        return () => window.removeEventListener("resize", updateSizes);
    }, []);

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

                <Row horizontalPadding="small">
                    <Portion>
                        <Heading1 ref={h1Ref} align="centre" marginBottom="nano">H1 — {fontSizes.size1}</Heading1>
                        <Heading2 ref={h2Ref} align="centre" marginBottom="nano">H2 — {fontSizes.size2}</Heading2>
                        <Heading3 ref={h3Ref} align="centre" marginBottom="nano">H3 — {fontSizes.size3}</Heading3>
                        <Heading4 ref={h4Ref} align="centre" marginBottom="nano">H4 — {fontSizes.size4}</Heading4>
                        <Heading5 ref={h5Ref} align="centre" marginBottom="nano">H5 — {fontSizes.size5}</Heading5>
                        <Heading6 ref={h6Ref} align="centre" marginBottom="nano">H6 — {fontSizes.size6}</Heading6>
                        <Text ref={pRef} align="centre" marginBottom="nano">Body text — {fontSizes.size7}</Text>

                        <Text align="centre">
                            <Hyperlink href="https://fictoan.io/">Link — {fontSizes.size7}</Hyperlink>
                        </Text>
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
    --scale-ratio-min: 1.08;  /* Scale for mobile */
    --scale-ratio-max: 1.16; /* Scale for desktop */
}`}
                        </CodeBlock>

                        <Text marginBottom="micro">
                            These ratios determine how much bigger each step in the scale gets. A larger ratio means
                            more dramatic size differences between levels.
                        </Text>

                        <Divider kind="secondary" verticalMargin="micro" />

                        {/* THE BUILDING BLOCKS ==================================================================== */}
                        <Heading6 marginBottom="nano">The building blocks</Heading6>
                        <Text marginBottom="micro">
                            Fictoan's fluid typography system is built on six key variables that you can customize:
                        </Text>

                        <CodeBlock
                            withSyntaxHighlighting
                            language="css"
                            showCopyButton
                        >
                            {`:root {
    --screen-width-min : 320;   /* Smallest screen width */
    --screen-width-max : 1600;  /* Largest screen width */
    --font-size-min    : 16;    /* Base size on mobile */
    --font-size-max    : 20;    /* Base size on desktop */
    --scale-ratio-min  : 1.08;  /* Mobile type scale */
    --scale-ratio-max  : 1.16;  /* Desktop type scale */
}`}
                        </CodeBlock>

                        <Text marginTop="micro" marginBottom="micro">
                            Think of it this way:
                        </Text>

                        <Text marginBottom="nano">1. First, you define your canvas: screens from 320px to 1600px wide</Text>
                        <Text marginBottom="nano">2. Then, your base font size: growing from 16px on mobile to 20px on desktop</Text>
                        <Text marginBottom="nano">3. Finally, your scale ratios: determining how dramatically sizes increase in your hierarchy</Text>

                        <Divider kind="secondary" verticalMargin="micro" />

                        {/* HOW THE MATH WORKS ===================================================================== */}
                        <Heading6 marginTop="micro" marginBottom="nano">How the Math Works</Heading6>
                        <Text marginBottom="micro">
                            When someone visits your site, Fictoan:
                        </Text>

                        <Text marginBottom="nano">1. Checks the current screen width</Text>
                        <Text marginBottom="nano">2. Calculates where it falls between min and max screen widths (as a percentage)</Text>
                        <Text marginBottom="nano">3. Uses that percentage to determine:</Text>
                        <Text marginLeft="micro" marginBottom="nano">• The current base font size (between 16px and 20px)</Text>
                        <Text marginLeft="micro" marginBottom="nano">• The current scale ratio (between 1.08 and 1.12)</Text>
                        <Text marginBottom="nano">4. Applies these values to calculate all other type sizes</Text>

                        <Text marginTop="micro">
                            For example, on a 768px tablet screen (roughly halfway between 320px and 1600px):
                            • Base font would be around 18px
                            • Scale ratio would be around 1.10
                        </Text>

                        <Divider kind="secondary" verticalMargin="micro" />

                        <Heading6 marginBottom="nano">Customising the system</Heading6>
                        <Text marginBottom="micro">
                            You can adjust these values in your theme file to match your design needs:
                        </Text>

                        <Text marginTop="micro" marginBottom="nano">Tips for customizing:</Text>
                        <Text marginBottom="nano">• Keep <code>font-size-min</code> at 16px for readability unless you have a specific reason to change it</Text>
                        <Text marginBottom="nano">• Larger scale ratios (like 1.2) create more dramatic size differences</Text>
                        <Text marginBottom="nano">• Smaller scale ratios (like 1.05) create more subtle hierarchies</Text>
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
