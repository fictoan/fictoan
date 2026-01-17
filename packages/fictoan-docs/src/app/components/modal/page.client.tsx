"use client";

// REACT CORE ==========================================================================================================
import React, { useState, useMemo } from "react";

// UI ==================================================================================================================
import { Div, Heading2, Heading4, Text, Divider, Modal, Card, Button, CodeBlock, Checkbox, } from "fictoan-react";

// UTILS ===============================================================================================================
import { createThemeConfigurator } from "$utils/themeConfigurator";

// STYLES ==============================================================================================================
import "../../../styles/fictoan-theme.css";
import "./page-modal.css";

// OTHER ===============================================================================================================
import { ComponentDocsLayout } from "../ComponentDocsLayout";

const ModalDocs = () => {
    // Modal open state
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Props state
    const [isDismissible, setIsDismissible] = useState(true);
    const [showBackdrop, setShowBackdrop] = useState(true);
    const [blurBackdrop, setBlurBackdrop] = useState(false);

    // Theme configurator
    const ModalComponent = (varName: string) => {
        return varName.startsWith("modal-");
    };

    const {
        interactiveElementRef,
        componentProps: themeProps,
        themeConfigurator,
    } = createThemeConfigurator<HTMLDivElement>("Modal", ModalComponent);

    // Generate code
    const codeString = useMemo(() => {
        const props = [];
        props.push(`id="my-modal"`);
        props.push(`isOpen={isOpen}`);
        props.push(`onClose={() => setIsOpen(false)}`);
        if (!isDismissible) props.push(`isDismissible={false}`);
        if (showBackdrop) props.push(`showBackdrop`);
        if (blurBackdrop) props.push(`blurBackdrop`);

        return `import { useState } from "react";
import { Modal, Card, Button } from "fictoan-react";

const [isOpen, setIsOpen] = useState(false);

<Button onClick={() => setIsOpen(true)}>
    Open Modal
</Button>

<Modal
    ${props.join("\n    ")}
>
    <Card padding="micro">
        {/* Your content here */}
    </Card>
</Modal>`;
    }, [isDismissible, showBackdrop, blurBackdrop]);

    return (
        <>
            <ComponentDocsLayout>
                {/* INTRO HEADER /////////////////////////////////////////////////////////////////////////////////////// */}
                <Div id="intro-header">
                    <Heading2 id="component-name">
                        Modal
                    </Heading2>

                    <Text id="component-description" weight="400">
                        A popover that appears at the centre of the screen
                    </Text>
                </Div>

                {/* INTRO NOTES //////////////////////////////////////////////////////////////////////////////////////// */}
                <Div id="intro-notes">
                    <Divider kind="tertiary" verticalMargin="micro" />

                    <Text>
                        Uses the Popover API for native browser support.
                    </Text>

                    <Text>
                        Accepts any React node as children. Add a Card or similar inside for styling.
                    </Text>

                    <Text>
                        Use <code>isOpen</code> and <code>onClose</code> to control the modal state.
                    </Text>

                    <Text>
                        The <code>isDismissible</code> prop shows a close button and allows Escape key dismissal.
                    </Text>
                </Div>

                {/* DEMO COMPONENT ///////////////////////////////////////////////////////////////////////////////////// */}
                <Div id="demo-component">
                    <Button
                        kind="primary"
                        onClick={() => setIsModalOpen(true)}
                    >
                        Open Modal
                    </Button>
                </Div>

                {/* PROPS CONFIG /////////////////////////////////////////////////////////////////////////////////////// */}
                <Div id="props-config">
                    <CodeBlock language="tsx" withSyntaxHighlighting showCopyButton>
                        {codeString}
                    </CodeBlock>

                    <Div className="doc-controls">
                        <Checkbox
                            id="prop-isDismissible"
                            label="isDismissible"
                            checked={isDismissible}
                            onChange={() => setIsDismissible(!isDismissible)}
                            helpText="Shows a close button and allows Escape key dismissal."
                            marginBottom="micro"
                        />

                        <Checkbox
                            id="prop-showBackdrop"
                            label="showBackdrop"
                            checked={showBackdrop}
                            onChange={() => setShowBackdrop(!showBackdrop)}
                            helpText="Shows a backdrop behind the modal."
                            marginBottom="micro"
                        />

                        <Checkbox
                            id="prop-blurBackdrop"
                            label="blurBackdrop"
                            checked={blurBackdrop}
                            onChange={() => setBlurBackdrop(!blurBackdrop)}
                            helpText="Adds a blur effect to the backdrop."
                            marginBottom="micro"
                        />
                    </Div>
                </Div>

                {/* THEME CONFIG /////////////////////////////////////////////////////////////////////////////////////// */}
                <Div id="theme-config">
                    {themeConfigurator()}
                </Div>
            </ComponentDocsLayout>

            {/* MODAL - rendered outside layout since it uses popover */}
            <Modal
                ref={interactiveElementRef}
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                isDismissible={isDismissible}
                showBackdrop={showBackdrop}
                blurBackdrop={blurBackdrop}
                {...themeProps}
            >
                <Card padding="micro">
                    <Heading4 marginBottom="nano">This is a modal</Heading4>
                    <Text marginBottom="micro">
                        You can add anything inside here, and it's always centered on the screen.
                    </Text>
                    <Button
                        kind="secondary"
                        onClick={() => setIsModalOpen(false)}
                    >
                        Close Modal
                    </Button>
                </Card>
            </Modal>
        </>
    );
};

export default ModalDocs;
