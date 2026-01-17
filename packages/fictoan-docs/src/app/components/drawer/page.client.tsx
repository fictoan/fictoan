"use client";

// REACT CORE ==========================================================================================================
import React, { useState, useMemo } from "react";

// UI ==================================================================================================================
import {
    Div,
    Heading2,
    Text,
    Divider,
    Drawer,
    Button,
    CodeBlock,
    RadioTabGroup,
    Checkbox,
}from "fictoan-react";

// UTILS ===============================================================================================================
import { createThemeConfigurator } from "$utils/themeConfigurator";

// STYLES ==============================================================================================================
import "../../../styles/fictoan-theme.css";
import "./page-drawer.css";

// OTHER ===============================================================================================================
import { ComponentDocsLayout } from "../ComponentDocsLayout";

const DrawerDocs = () => {
    // Drawer open state
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    // Props state
    const [position, setPosition] = useState("right");
    const [size, setSize] = useState("medium");
    const [isDismissible, setIsDismissible] = useState(true);
    const [showOverlay, setShowOverlay] = useState(true);
    const [blurOverlay, setBlurOverlay] = useState(false);
    const [closeOnClickOutside, setCloseOnClickOutside] = useState(true);

    // Theme configurator
    const DrawerComponent = (varName: string) => {
        return varName.startsWith("drawer-");
    };

    const {
        interactiveElementRef,
        componentProps: themeProps,
        themeConfigurator,
    } = createThemeConfigurator<HTMLDivElement>("Drawer", DrawerComponent);

    // Generate code
    const codeString = useMemo(() => {
        const props = [];
        props.push(`id="my-drawer"`);
        props.push(`isOpen={isOpen}`);
        props.push(`onClose={() => setIsOpen(false)}`);
        if (position !== "right") props.push(`position="${position}"`);
        if (size !== "medium") props.push(`size="${size}"`);
        if (!isDismissible) props.push(`isDismissible={false}`);
        if (!showOverlay) props.push(`showOverlay={false}`);
        if (blurOverlay) props.push(`blurOverlay`);
        if (!closeOnClickOutside) props.push(`closeOnClickOutside={false}`);

        return `import { useState } from "react";
import { Drawer, Button } from "fictoan-react";

const [isOpen, setIsOpen] = useState(false);

<Button onClick={() => setIsOpen(true)}>
    Open Drawer
</Button>

<Drawer
    ${props.join("\n    ")}
>
    {/* Your content here */}
</Drawer>`;
    }, [position, size, isDismissible, showOverlay, blurOverlay, closeOnClickOutside]);

    return (
        <>
            <ComponentDocsLayout>
                {/* INTRO HEADER /////////////////////////////////////////////////////////////////////////////////////// */}
                <Div id="intro-header">
                    <Heading2 id="component-name">
                        Drawer
                    </Heading2>

                    <Text id="component-description" weight="400">
                        A panel that slides in from any side of the screen
                    </Text>
                </Div>

                {/* INTRO NOTES //////////////////////////////////////////////////////////////////////////////////////// */}
                <Div id="intro-notes">
                    <Divider kind="tertiary" verticalMargin="micro" />

                    <Text>
                        Accepts any React node as children.
                    </Text>

                    <Text>
                        Use the <code>isOpen</code> and <code>onClose</code> props to control the drawer state.
                    </Text>

                    <Text>
                        You can add multiple Drawers on a page with unique IDs.
                    </Text>
                </Div>

                {/* DEMO COMPONENT ///////////////////////////////////////////////////////////////////////////////////// */}
                <Div id="demo-component">
                    <Button
                        kind="primary"
                        onClick={() => setIsDrawerOpen(true)}
                    >
                        Open the drawer
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
                                { id: "position-right", value: "right", label: "right" },
                                { id: "position-bottom", value: "bottom", label: "bottom" },
                                { id: "position-left", value: "left", label: "left" },
                            ]}
                            value={position}
                            onChange={(value) => setPosition(value)}
                            helpText="Side from which the drawer slides in."
                            marginBottom="micro"
                        />

                        <RadioTabGroup
                            id="prop-size"
                            label="size"
                            options={[
                                { id: "size-nano", value: "nano", label: "nano" },
                                { id: "size-micro", value: "micro", label: "micro" },
                                { id: "size-tiny", value: "tiny", label: "tiny" },
                                { id: "size-small", value: "small", label: "small" },
                                { id: "size-medium", value: "medium", label: "medium" },
                                { id: "size-large", value: "large", label: "large" },
                                { id: "size-huge", value: "huge", label: "huge" },
                            ]}
                            value={size}
                            onChange={(value) => setSize(value)}
                            helpText="Width (for left/right) or height (for top/bottom) of the drawer."
                            marginBottom="micro"
                        />

                        <Checkbox
                            id="prop-isDismissible"
                            label="isDismissible"
                            checked={isDismissible}
                            onChange={() => setIsDismissible(!isDismissible)}
                            helpText="Shows a close button and allows dismissal."
                            marginBottom="micro"
                        />

                        <Checkbox
                            id="prop-showOverlay"
                            label="showOverlay"
                            checked={showOverlay}
                            onChange={() => setShowOverlay(!showOverlay)}
                            helpText="Shows a backdrop overlay behind the drawer."
                            marginBottom="micro"
                        />

                        <Checkbox
                            id="prop-blurOverlay"
                            label="blurOverlay"
                            checked={blurOverlay}
                            onChange={() => setBlurOverlay(!blurOverlay)}
                            helpText="Adds a blur effect to the overlay."
                            marginBottom="micro"
                        />

                        <Checkbox
                            id="prop-closeOnClickOutside"
                            label="closeOnClickOutside"
                            checked={closeOnClickOutside}
                            onChange={() => setCloseOnClickOutside(!closeOnClickOutside)}
                            helpText="Closes the drawer when clicking outside."
                            marginBottom="micro"
                        />
                    </Div>
                </Div>

                {/* THEME CONFIG /////////////////////////////////////////////////////////////////////////////////////// */}
                <Div id="theme-config">
                    {themeConfigurator()}
                </Div>
            </ComponentDocsLayout>

            {/* TODO: Fix overlay not displaying */}
            <Drawer
                ref={interactiveElementRef}
                isOpen={isDrawerOpen}
                onClose={() => setIsDrawerOpen(false)}
                position={position as any}
                size={size as any}
                isDismissible={isDismissible}
                showOverlay={showOverlay}
                blurOverlay={blurOverlay}
                closeOnClickOutside={closeOnClickOutside}
                zIndex={60000}
                {...themeProps}
            >
                <Heading2 marginBottom="nano">Hello</Heading2>

                <Text marginBottom="micro">
                    You can add all sorts of content here inside the drawer.
                </Text>

                <Button
                    kind="secondary"
                    onClick={() => setIsDrawerOpen(false)}
                >
                    Close
                </Button>

                <Div marginTop="large">
                    <Text weight="700" marginBottom="small">
                        Some extra content to demonstrate scrolling
                    </Text>

                    <Text marginBottom="small">First line of content.</Text>
                    <Text marginBottom="small">Second line of content.</Text>
                    <Text marginBottom="small">Third line of content.</Text>
                    <Text marginBottom="small">Fourth line of content.</Text>
                    <Text marginBottom="small">Fifth line of content.</Text>
                </Div>
            </Drawer>
        </>
    );
};

export default DrawerDocs;
