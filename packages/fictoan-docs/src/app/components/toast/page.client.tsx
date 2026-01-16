"use client";

// REACT CORE ==========================================================================================================
import React, { useState, useMemo } from "react";

// UI ==================================================================================================================
import {
    Div,
    Heading6,
    Text,
    Divider,
    ToastsWrapper,
    ToastItem,
    Button,
    CodeBlock,
    RadioTabGroup,
    Range,
    InputField,
} from "fictoan-react";

// UTILS ===============================================================================================================
import { createThemeConfigurator } from "$utils/themeConfigurator";

// STYLES ==============================================================================================================
import "../../../styles/fictoan-theme.css";
import "./page-toast.css";

// OTHER ===============================================================================================================
import { ComponentDocsLayout } from "../ComponentDocsLayout";

const ToastDocs = () => {
    // Toast visibility state
    const [showToast, setShowToast] = useState(false);

    // Props state
    const [position, setPosition] = useState("top");
    const [secondsToShowFor, setSecondsToShowFor] = useState(3);
    const [toastMessage, setToastMessage] = useState("Hello there, folks!");

    // Theme configurator
    const ToastComponent = (varName: string) => {
        return varName.startsWith("toast-");
    };

    const {
        interactiveElementRef,
        componentProps: themeProps,
        themeConfigurator,
    } = createThemeConfigurator<HTMLDivElement>("Toast", ToastComponent);

    // Generate code
    const codeString = useMemo(() => {
        const wrapperProps = [];
        if (position !== "top") wrapperProps.push(`position="${position}"`);
        const wrapperPropsStr = wrapperProps.length > 0 ? `\n    ${wrapperProps.join("\n    ")}\n` : "";

        return `import { useState } from "react";
import { ToastsWrapper, ToastItem, Button, Text } from "fictoan-react";

const [showToast, setShowToast] = useState(false);

<Button onClick={() => setShowToast(true)}>
    Show Toast
</Button>

<ToastsWrapper${wrapperPropsStr}>
    <ToastItem
        showWhen={showToast}
        secondsToShowFor={${secondsToShowFor}}
        closeWhen={() => setShowToast(false)}
    >
        <Text>${toastMessage}</Text>
    </ToastItem>
</ToastsWrapper>`;
    }, [position, secondsToShowFor, toastMessage]);

    return (
        <>
            <ComponentDocsLayout>
                {/* INTRO HEADER /////////////////////////////////////////////////////////////////////////////////////// */}
                <Div id="intro-header">
                    <Heading6 id="component-name">
                        Toast
                    </Heading6>

                    <Text id="component-description" weight="400">
                        A small floating popup for notifications
                    </Text>
                </Div>

                {/* INTRO NOTES //////////////////////////////////////////////////////////////////////////////////////// */}
                <Div id="intro-notes">
                    <Divider kind="tertiary" verticalMargin="micro" />

                    <Text>
                        Use <code>ToastsWrapper</code> to define the position, and <code>ToastItem</code> for each toast.
                    </Text>

                    <Text>
                        Toasts auto-dismiss after <code>secondsToShowFor</code> or can be manually closed.
                    </Text>

                    <Text>
                        Multiple toasts stack automatically within the wrapper.
                    </Text>
                </Div>

                {/* DEMO COMPONENT ///////////////////////////////////////////////////////////////////////////////////// */}
                <Div id="demo-component">
                    <Button
                        kind="primary"
                        onClick={() => setShowToast(true)}
                    >
                        Show Toast
                    </Button>
                </Div>

                {/* PROPS CONFIG /////////////////////////////////////////////////////////////////////////////////////// */}
                <Div id="props-config">
                    <CodeBlock language="tsx" withSyntaxHighlighting showCopyButton>
                        {codeString}
                    </CodeBlock>

                    <Div className="doc-controls">
                        <RadioTabGroup
                            id="prop-position"
                            label="position"
                            options={[
                                { id: "position-top", value: "top", label: "top" },
                                { id: "position-bottom", value: "bottom", label: "bottom" },
                            ]}
                            value={position}
                            onChange={(val) => setPosition(val)}
                            helpText="Position of the toast wrapper."
                            marginBottom="micro"
                        />

                        <Range
                            id="prop-secondsToShowFor"
                            label="secondsToShowFor"
                            min={1}
                            max={10}
                            value={secondsToShowFor}
                            onChange={(val: number) => setSecondsToShowFor(val)}
                            suffix={secondsToShowFor === 1 ? " second" : " seconds"}
                            helpText="How long the toast stays visible."
                            marginBottom="micro" isFullWidth
                        />

                        <InputField
                            label="Toast message"
                            value={toastMessage}
                            onChange={(val) => setToastMessage(val)}
                            helpText="Content to display in the toast."
                            marginBottom="micro" isFullWidth
                        />
                    </Div>
                </Div>

                {/* THEME CONFIG /////////////////////////////////////////////////////////////////////////////////////// */}
                <Div id="theme-config">
                    {themeConfigurator()}
                </Div>
            </ComponentDocsLayout>

            {/* TOAST - rendered outside layout */}
            <ToastsWrapper
                ref={interactiveElementRef}
                position={position as any}
                {...themeProps}
            >
                <ToastItem
                    showWhen={showToast}
                    secondsToShowFor={secondsToShowFor}
                    closeWhen={() => setShowToast(false)}
                >
                    <Text>{toastMessage}</Text>
                </ToastItem>
            </ToastsWrapper>
        </>
    );
};

export default ToastDocs;
