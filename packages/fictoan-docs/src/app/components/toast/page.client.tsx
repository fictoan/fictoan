"use client";

// REACT CORE ==========================================================================================================
import React, { useState, useMemo } from "react";

// UI ==================================================================================================================
import {
    Div,
    Heading2,
    Text,
    Divider,
    ToastsProvider,
    useToasts,
    Button,
    CodeBlock,
    RadioTabGroup,
    Range,
    InputField,
} from "fictoan-react";

// STYLES ==============================================================================================================
import "../../../styles/fictoan-theme.css";
import "./page-toast.css";

// OTHER ===============================================================================================================
import { ComponentDocsLayout } from "../ComponentDocsLayout";

// DEMO COMPONENT WITH ITS OWN PROVIDER ================================================================================
const ToastDemo = ({
    duration,
    toastMessage,
}: {
    duration: number;
    toastMessage: string;
}) => {
    const toast = useToasts();

    return (
        <Button kind="primary" onClick={() => toast(toastMessage, duration)}>
            Show Toast
        </Button>
    );
};

// MAIN DOCS COMPONENT =================================================================================================
const ToastDocs = () => {
    // Props state
    const [anchor, setAnchor] = useState("top");
    const [duration, setDuration] = useState(4);
    const [toastMessage, setToastMessage] = useState("Hello there, folks!");

    // Generate code
    const codeString = useMemo(() => {
        const providerProps = [];
        if (anchor !== "top") providerProps.push(`    anchor="${anchor}"`);
        const providerPropsStr = providerProps.length > 0 ? `\n${providerProps.join("\n")}\n` : "";

        const durationArg = duration !== 4 ? `, ${duration}` : "";

        return `// In your app's root layout
import { ToastsProvider } from "fictoan-react";

export default function RootLayout({ children }) {
    return (
        <ToastsProvider${providerPropsStr}>
            {children}
        </ToastsProvider>
    );
}

-------

// In any component
import { useToasts } from "fictoan-react";

const MyComponent = () => {
    const toast = useToasts();

    toast("${toastMessage}"${durationArg});
};`;
    }, [anchor, duration, toastMessage]);

    return (
        <ToastsProvider anchor={anchor as any}>
            <ComponentDocsLayout pageId="page-toast">
                {/* INTRO HEADER /////////////////////////////////////////////////////////////////////////////////////// */}
                <Div id="intro-header">
                    <Heading2 id="component-name">
                        Toast
                    </Heading2>

                    <Text id="component-description" weight="400">
                        A small floating popup for brief messages
                    </Text>
                </Div>

                {/* INTRO NOTES //////////////////////////////////////////////////////////////////////////////////////// */}
                <Div id="intro-notes">
                    <Divider kind="tertiary" verticalMargin="micro" />

                    <Text>
                        Wrap your app with <code>ToastsProvider</code> once, then
                        use <code>useToasts()</code> anywhere.
                    </Text>

                    <Text>
                        Call <code>toast("message")</code> or <code>toast("message", duration)</code> to show a toast.
                    </Text>

                    <Text>
                        Toasts auto-dismiss after the specified duration (default 4 seconds).
                    </Text>
                </Div>

                {/* DEMO COMPONENT ///////////////////////////////////////////////////////////////////////////////////// */}
                <Div id="demo-component">
                    <ToastDemo
                        duration={duration}
                        toastMessage={toastMessage}
                    />
                </Div>

                {/* PROPS CONFIG /////////////////////////////////////////////////////////////////////////////////////// */}
                <Div id="props-config">
                    <CodeBlock language="tsx" withSyntaxHighlighting showCopyButton>
                        {codeString}
                    </CodeBlock>

                    <Div className="doc-controls">
                        <RadioTabGroup
                            id="prop-anchor"
                            label="anchor"
                            options={[
                                { id: "anchor-top", value: "top", label: "top" },
                                { id: "anchor-bottom", value: "bottom", label: "bottom" },
                            ]}
                            value={anchor}
                            onChange={(val) => setAnchor(val)}
                            helpText="Vertical position of the toast."
                            marginBottom="micro"
                        />

                        <Range
                            id="prop-duration"
                            label="duration"
                            min={1}
                            max={10}
                            value={duration}
                            onChange={(val: number) => setDuration(val)}
                            suffix={duration === 1 ? " second" : " seconds"}
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
                <Div id="theme-config" />
            </ComponentDocsLayout>
        </ToastsProvider>
    );
};

export default ToastDocs;
