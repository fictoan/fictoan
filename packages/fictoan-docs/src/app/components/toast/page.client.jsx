"use client";

// EXTERNAL DEPS =======================================================================================================
import React, { useState } from "react";

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
    Text,
    Article,
    Card,
    Form,
    Header,
    RadioTabGroup,
    Select,
    ToastItem,
    ToastsWrapper,
    Button,
    Range,
CodeBlock
} from "fictoan-react";

// COMPONENTS ==========================================================================================================

// STYLES ==============================================================================================================
import "./page-toast.css";

// HOOKS ===============================================================================================================
import { useThemeVariables } from "../../../utils/useThemeVariables";

// UTILS ===============================================================================================================
import { colourOptions } from "../../colour/colours";

// DATA ================================================================================================================
import { toastProps } from "./config";

const ToastDocs = () => {
    const { componentVariables, handleVariableChange, cssVariablesList } = useThemeVariables(toastProps.variables);

    // SAMPLE ==========================================================================================================
    const [showSampleToast, setShowSampleToast] = useState(false);

    // CUSTOMISE =======================================================================================================
    const [selectedPosition, setSelectedPosition] = useState("top");
    const [secondsToShowFor, setSecondsToShowFor] = useState(100);

    // THEME ===========================================================================================================


    return (
        <Article id="page-toast">
            <Row horizontalPadding="huge" marginTop="medium" marginBottom="small">
                <Portion>
                    <Heading1>Toast</Heading1>
                    <Text size="large" marginBottom="small">
                        A small static floating popup
                    </Text>
                </Portion>

                <Portion>
                    <Heading4 marginBottom="micro">Characteristics</Heading4>
                    <Text>&bull; </Text>
                </Portion>
            </Row>

            <Divider kind="primary" horizontalMargin="huge" verticalMargin="small" />

            {/* //////////////////////////////////////////////////////////////////////////////////////////////////// */}
            {/*  CONFIGURATOR */}
            {/* //////////////////////////////////////////////////////////////////////////////////////////////////// */}
            <Row horizontalPadding="small" className="rendered-component">
                {/* DEMO COMPONENT ///////////////////////////////////////////////////////////////////////////////// */}
                <Portion id="component-wrapper">
                    <Element
                        as="div" padding="small" shape="rounded" bgColour="slate-light80"
                        data-centered-children
                    >
                        <Button
                            onClick={() => setShowSampleToast(true)}
                            kind="primary"
                        >
                            Show a toast
                        </Button>
                    </Element>
                </Portion>

                {/* CONFIGURATOR /////////////////////////////////////////////////////////////////////////////////// */}
                <Portion desktopSpan="half">
                    <Form spacing="none">
                        <Card padding="micro" shape="rounded">
                            <Header verticallyCentreItems pushItemsToEnds marginBottom="micro">
                                <Text size="large" weight="700" textColour="white">
                                    Configure props
                                </Text>
                            </Header>

                            <Row marginBottom="none">
                                <Portion>
                                    <CodeBlock withSyntaxHighlighting language="jsx" showCopyButton marginBottom="micro">
                                        {[
                                            `// Paste this in your content file`,
                                            `const [showSampleToast, setShowSampleToast] = useState(false); \n`,
                                            `<ToastsWrapper`,
                                            selectedPosition ? `    position="${selectedPosition}"` : null,
                                            `>`,
                                            `    <ToastItem`,
                                            `        showWhen={showSampleToast}`,
                                            `        secondsToShowFor={${secondsToShowFor}}`,
                                            `        closeWhen={() => setShowSampleToast(false)}`,
                                            `    >`,
                                            `        <Text>Hello there, folks!</Text>`,
                                            `    </ToastItem>`,
                                            `</ToastsWrapper>`,
                                        ].filter(Boolean).join("\n")}
                                    </CodeBlock>
                                </Portion>

                                {/* POSITION ======================================================================= */}
                                <Portion>
                                    <RadioTabGroup
                                        id="position" label="Position" name="position"
                                        options={[
                                            { id : "position-opt-0", value : "top", label : "top" },
                                            { id : "position-opt-1", value : "bottom", label : "bottom" },
                                        ]}
                                        value={selectedPosition || "right"}
                                        onChange={(value) => setSelectedPosition(value)}
                                    />

                                    <Divider kind="secondary" horizontalMargin="none" marginTop="micro" />
                                </Portion>

                                {/* SHOW FOR ======================================================================= */}
                                <Portion desktopSpan="half">
                                    <Range
                                        label="Show toast for"
                                        value={secondsToShowFor}
                                        onChange={(value) => setSecondsToShowFor(value)}
                                        min={1} max={50} step={1}
                                        suffix={secondsToShowFor > 1 ? " seconds" : " second"}
                                    />
                                </Portion>
                            </Row>
                        </Card>
                    </Form>
                </Portion>

                {/* GLOBAL THEME /////////////////////////////////////////////////////////////////////////////////// */}
                <Portion desktopSpan="half">
                    <Card padding="micro" shape="rounded">
                        <Form>
                            <Header verticallyCentreItems pushItemsToEnds>
                                <Text size="large" weight="700" textColour="white" marginBottom="nano">
                                    Set global theme values
                                </Text>
                            </Header>

                            <Row marginBottom="none">
                                <Portion>
                                    <CodeBlock
                                        withSyntaxHighlighting
                                        source={cssVariablesList}
                                        language="css"
                                        showCopyButton
                                        marginBottom="micro"
                                    />
                                </Portion>

                                {/* BG COLOUR ====================================================================== */}
                                <Portion desktopSpan="half">
                                    <Select
                                        label="Background"
                                        options={[{
                                            label    : "Select a colour",
                                            value    : "select-a-colour",
                                            disabled : true,
                                            selected : true,
                                        }, ...colourOptions]}
                                        defaultValue={componentVariables["toast-bg"].defaultValue || "select-a-colour"}
                                        onChange={(value) => handleVariableChange("toast-bg", value)}
                                        isFullWidth
                                    />
                                </Portion>

                                {/* TEXT COLOUR ==================================================================== */}
                                <Portion desktopSpan="half">
                                    <Select
                                        label="Text colour"
                                        options={[{
                                            label    : "Select a colour",
                                            value    : "select-a-colour",
                                            disabled : true,
                                            selected : true,
                                        }, ...colourOptions]}
                                        defaultValue={componentVariables["toast-text"].defaultValue || "select-a-colour"}
                                        onChange={(value) => handleVariableChange("toast-text", value)}
                                        isFullWidth
                                    />
                                </Portion>

                                {/* BORDER RADIUS ================================================================== */}
                                <Portion desktopSpan="half">
                                    <Range
                                        label="Border radius"
                                        value={componentVariables["toast-border-radius"].value}
                                        onChange={(value) => handleVariableChange("toast-border-radius", value)}
                                        suffix={componentVariables["toast-border-radius"].unit}
                                        min={0} max={50} step={1}
                                    />
                                </Portion>
                            </Row>
                        </Form>
                    </Card>
                </Portion>
            </Row>

            <ToastsWrapper
                position={selectedPosition}
            >
                <ToastItem
                    showWhen={showSampleToast}
                    secondsToShowFor={secondsToShowFor}
                    closeWhen={() => setShowSampleToast(false)}
                >
                    <Text>Hello there, folks!</Text>
                </ToastItem>
            </ToastsWrapper>
        </Article>
    );
};

export default ToastDocs;
