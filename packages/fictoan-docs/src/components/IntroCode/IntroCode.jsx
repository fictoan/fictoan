"use client";

// EXTERNAL DEPS =======================================================================================================
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";

// INTERNAL DEPS =======================================================================================================
import {
    Button,
    Div,
    Heading1,
    Heading4,
    Heading5,
    Portion,
    Row,
    Section,
    Switch,
    Text,
    CodeBlock
} from "fictoan-react";

// STYLES ==============================================================================================================
import "./intro-code.css";

export const IntroCode = () => {
    const flipACoin = () => Math.random() >= 0.5;

    const [rowProps, setRowProps] = useState({
        horizontalPadding : "medium",
        marginTop         : "tiny",
        marginBottom      : "tiny",
    });

    const [portion1Props, setPortion1Props] = useState({
        desktopSpan : "half",
    });

    const [portion2Props, setPortion2Props] = useState({
        desktopSpan : "half",
    });

    const [mainHeadingProps, setMainHeadingProps] = useState({
        textColour   : "blue",
        marginBottom : "nano",
        weight       : "700",
    });

    const [taglineProps, setTaglineProps] = useState({
        textColour   : "blue-light30",
        marginBottom : "micro",
        weight       : "400",
    });

    const [subHeading1Props, setSubHeading1Props] = useState({
        weight       : "400",
        marginBottom : "micro",
    });

    const [subHeading2Props, setSubHeading2Props] = useState({
        weight       : "400",
        marginBottom : "micro",
    });

    const [buttonProps, setButtonProps] = useState({
        kind : "primary",
    });

    const handleCodeChange = (newContent) => {
        const newProps = parseCodeToProperties(newContent);

        // Update all component props based on parsed content
        setRowProps(prev => ({ ...prev, ...newProps.Row }));

        // Update portions
        if (newProps.Portion[0]) setPortion1Props(newProps.Portion[0]);
        if (newProps.Portion[1]) setPortion2Props(newProps.Portion[1]);

        // Update headings
        setMainHeadingProps(prev => ({ ...prev, ...newProps.Heading1 }));
        if (newProps.Heading5[0]) setSubHeading1Props(prev => ({ ...prev, ...newProps.Heading5[0] }));
        if (newProps.Heading5[1]) setSubHeading2Props(prev => ({ ...prev, ...newProps.Heading5[1] }));

        // Update button
        setButtonProps(prev => ({ ...prev, ...newProps.Button }));
    };

    const codeBlockRef = useRef(null);

    const parseCodeToProperties = (codeContent) => {
        const propRegex = /<(Heading1|Heading5|Row|Portion|Button)\s+(.*?)>/gs;
        const propertiesRegex = /(\w+)="([^"]+)"/g;
        const newProps = {
            Row      : {},
            Portion  : [],
            Heading1 : {},
            Heading5 : [],
            Button   : {},
        };

        let tagMatch;
        while ((
            tagMatch = propRegex.exec(codeContent)
        ) !== null) {
            const tagName = tagMatch[1];
            const tagProperties = tagMatch[2];
            let tagProps = {};

            let propsMatch;
            while ((
                propsMatch = propertiesRegex.exec(tagProperties)
            ) !== null) {
                const propName = propsMatch[1];
                const propValue = propsMatch[2];
                tagProps[propName] = propValue;
            }

            if (tagName === "Portion" || tagName === "Heading5") {
                newProps[tagName].push(tagProps);
            } else {
                newProps[tagName] = tagProps;
            }
        }

        return newProps;
    };

    const [mountKey, setMountKey] = useState(0);

    // Use this effect to trigger a remount after the initial load
    useEffect(() => {
        // We'll wait for everything to settle
        const remountTimer = setTimeout(() => {
            setMountKey(prev => prev + 1);
        }, 100);

        return () => clearTimeout(remountTimer);
    }, []); // Only run once on initial mount

    useEffect(() => {
        const checkPrism = () => {
            if (window.Prism) {
                console.log('Prism is loaded');
                setMountKey(prev => prev + 1);
            } else {
                console.log('Prism not loaded yet, retrying...');
                setTimeout(checkPrism, 100);
            }
        };

        checkPrism();
    }, []);


    // FOR VIZ ROW =====================================================================================================
    const [vizMode, setVizMode] = useState(true);
    const numberOfPortions = 24;

    return (
        <Section id="intro-code" verticalPadding="small">
            <Div id="intro-section">
                {/* ROW VISUALISATION ////////////////////////////////////////////////////////////////////////////// */}
                {vizMode && (
                    <Row id="viz-row" horizontalPadding={rowProps.horizontalPadding} retainLayoutAlways>
                        {Array.from({ length : numberOfPortions }, (_, index) => (
                            <Portion key={index} desktopSpan="1">
                                <Text align="centre">{index + 1}</Text>
                            </Portion>
                        ))}
                    </Row>
                )}

                {/* MAIN ROW /////////////////////////////////////////////////////////////////////////////////////// */}
                <Row {...rowProps}>
                    <Portion {...portion1Props} className={`demo-portion ${vizMode ? "border-red" : ""}`}>
                        <Heading1 {...mainHeadingProps}>
                            Ship UI {flipACoin() ? "in half the time" : "twice as fast"}
                        </Heading1>

                        <Heading4 {...taglineProps}>
                            Empower designers to contribute in code
                        </Heading4>

                        <Link href="/getting-started">
                            <Button {...buttonProps}>
                                Get started &rarr;
                            </Button>
                        </Link>

                        {vizMode && (
                            <Text className="portion-width-indicator">
                                {portion1Props.desktopSpan}
                            </Text>
                        )}
                    </Portion>

                    <Portion {...portion2Props} className={`demo-portion ${vizMode ? "border-red" : ""}`}>
                        <Heading5 {...subHeading1Props}>
                            Create ready-to-integrate UI in minutes with designer-friendly, plain-English syntax.
                        </Heading5>

                        <Heading5 {...subHeading2Props}>
                            Why not hand-off responsive, performant React code, rather than just static artboards?
                        </Heading5>

                        {vizMode && (
                            <Text className="portion-width-indicator">
                                {portion2Props.desktopSpan}
                            </Text>
                        )}
                    </Portion>
                </Row>
            </Div>

            {/* EDITABLE CODE BLOCK //////////////////////////////////////////////////////////////////////////////// */}
            <Row horizontalPadding="medium" gutters="large" verticalMargin="small">
                <Portion>
                    <Div verticallyCentreItems pushItemsToEnds marginBottom="nano">
                        <Text textColour="blue" weight="700">
                            GO AHEAD, EDIT THESE  PROPS AND VALUES HERE—
                        </Text>

                        <Switch
                            id="viz-switch"
                            name="viz-switch"
                            label="Visualise the Row"
                            checked={vizMode}
                            onChange={() => setVizMode(!vizMode)}
                        />
                    </Div>

                    <Div id="intro-code-block">
                        <CodeBlock
                            key={mountKey}
                            withSyntaxHighlighting
                            language="jsx"
                            showCopyButton
                            contentEditable
                            suppressContentEditableWarning={true}
                            onChange={handleCodeChange}
                            marginBottom="micro"
                            theme="custom"
                        >
                            {[
                                `<Row horizontalPadding="medium" marginTop="tiny" marginBottom="small"> {/* Try "none", "small", "medium", "large" or "huge" */}`,
                                `    <Portion desktopSpan="half"> {/* Try "one-third", or whole numbers between 1–24 */}`,
                                `        <Heading1 textColour="blue-light20" marginBottom="nano" weight="700">`,
                                `            Ship UI in half the time.`,
                                `        </Heading1> \n`,
                                `        <Heading4 marginBottom="micro">`,
                                `            Empower designers to edit code`,
                                `        </Heading4> \n`,
                                `        <Button kind="primary"> {/* "secondary", or kind="custom" with bgColour="amber" textColour="black" */}`,
                                `            Get started &rarr;`,
                                `        </Button>`,
                                `    </Portion> \n`,
                                `    <Portion desktopSpan="half"> {/* Try adding mobileSpan="half" */}`,
                                `        <Heading5 weight="400" marginBottom="micro">`,
                                `            Create ready-to-integrate UI in minutes with designer-friendly, plain-English syntax.`,
                                `        </Heading5>\n`,
                                `        <Heading5 weight="400" marginBottom="micro">`,
                                `            Hand-off responsive, performant React code to your dev team.`,
                                `        </Heading5>`,
                                `    </Portion>`,
                                `</Row>`,
                            ].filter(Boolean).join("\n")}
                        </CodeBlock>

                        <Heading5>
                            Wasn&rsquo;t that some simple, elegant syntax?
                        </Heading5>
                    </Div>
                </Portion>
            </Row>
        </Section>
    );
};
