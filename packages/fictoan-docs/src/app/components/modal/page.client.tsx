"use client";

// REACT CORE ==========================================================================================================
import React, { useState } from "react";

// UI ==================================================================================================================
import { Element, Heading1, Heading2, Heading3, Heading4, Heading5, Heading6, Divider, Portion, Row, Text, Article, Card, Form, Header, Button, Drawer, RadioTabGroup, Checkbox, Range, Select, CodeBlock, InputField, Modal, showModal, hideModal } from "fictoan-react";

// UTILS ===============================================================================================================
import { useThemeVariables } from "$utils/useThemeVariables";

// STYLES ==============================================================================================================
import "./page-modal.css";

// OTHER ===============================================================================================================
import { colourOptions } from "../../colour/colours";
import { modalProps } from "./config";

const ModalDocs = () => {
    const { componentVariables, handleVariableChange, cssVariablesList } = useThemeVariables(modalProps.variables);

    const [id, setId] = useState("sample-modal");
    const [isDismissible, setIsDismissible] = useState(false);
    const [addExplicitClose, setAddExplicitClose] = useState(false);
    const [showBackdrop, setShowBackdrop] = useState(false);
    const [blurBackdrop, setBlurBackdrop] = useState(false);

    return (
        <Article id="page-modal">
            <Row horizontalPadding="huge" marginTop="medium" marginBottom="small">
                <Portion>
                    <Heading1>Modal</Heading1>
                    <Text size="large" marginBottom="small">
                        A popover that appears at the centre of the screen when triggered
                    </Text>
                </Portion>

                <Portion>
                    
                    <ul>
                        <li>Uses the new Popover API, and browser support isn’t great yet, but it’s improving</li>
                        <li>
                            Accept any React node as children. By itself the modal has nothing inside, you’ll need to
                            add a Card or so inside.
                        </li>
                        <li>
                            There are three
                            methods—<code>showModal</code>, <code>hideModal</code>, and <code>toggleModal</code>. Their
                            values should be the same as the <code>id</code> of the modal you want to trigger.
                        </li>
                        <li>
                            The <code>isDismissible</code> prop displays a &times; at the top right corner, and can be
                            dismissed with the Esc key
                        </li>
                    </ul>
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
                            kind="primary"
                            onClick={() => showModal(`${id}`)}
                        >
                            Open modal
                        </Button>
                    </Element>
                </Portion>

                <Modal
                    id={id}
                    isDismissible={isDismissible}
                    showBackdrop={showBackdrop}
                    blurBackdrop={blurBackdrop}
                >
                    <Card padding="micro">
                        <Heading4 marginBottom="nano">This is a modal</Heading4>
                        <Text marginBottom="micro">You can add anything inside here, and it’s always centered on the
                            screen.</Text>

                        {addExplicitClose && (
                            <Button
                                kind="primary"
                                onClick={() => hideModal(`${id}`)}
                            >
                                Close modal
                            </Button>
                        )}
                    </Card>
                </Modal>

                {/* CONFIGURATOR /////////////////////////////////////////////////////////////////////////////////// */}
                <Portion desktopSpan="half">
                    <Form>
                        <Card padding="micro" shape="rounded">
                            <Header verticallyCentreItems pushItemsToEnds marginBottom="nano">
                                <Text size="large" weight="700" textColour="white">
                                    Configure props
                                </Text>
                            </Header>

                            <Row marginBottom="none">
                                <Portion>
                                    <CodeBlock withSyntaxHighlighting language="jsx" showCopyButton marginBottom="micro">
                                        {[
                                            `// Paste this in your content file`,
                                            `<Button onClick={() => showModal("${id}")}>Open the modal</Button>`,
                                            ` `,
                                            `<Modal`,
                                            id ? `    id="${id}"` : null,
                                            isDismissible ? `    isDismissible` : null,
                                            showBackdrop ? `    showBackdrop` : null,
                                            blurBackdrop ? `    blurBackdrop` : null,
                                            `>`,
                                            `    Add content `,
                                            addExplicitClose ? `    <Button onClick={() => hideModal("${id}")}>Close modal</Button>` : null,
                                            `</Modal>`,
                                        ].filter(Boolean).join("\n")}
                                    </CodeBlock>
                                </Portion>

                                {/* LABEL ========================================================================== */}
                                <Portion>
                                    <InputField
                                        type="text"
                                        label="Id"
                                        placeholder="Id"
                                        onChange={(value: string) => setId(value)}
                                        defaultValue={id}
                                    />

                                    <Divider kind="secondary" horizontalMargin="none" verticalMargin="nano" />
                                </Portion>

                                {/* DISMISSIBLE ==================================================================== */}
                                <Portion>
                                    <Checkbox
                                        id="checkbox-is-dismissible"
                                        value="checkbox-is-dismissible"
                                        name="checkbox-is-dismissible"
                                        label="Is dismissible"
                                        checked={isDismissible}
                                        onChange={(checked) => setIsDismissible(checked)}
                                    />

                                    <Divider kind="secondary" horizontalMargin="none" verticalMargin="nano" />
                                </Portion>

                                {/* DISMISSIBLE ==================================================================== */}
                                <Portion>
                                    <Checkbox
                                        id="checkbox-explicit-close"
                                        value="checkbox-explicit-close"
                                        name="checkbox-explicit-close"
                                        label="Add explicit close button"
                                        checked={addExplicitClose}
                                        onChange={(checked) => setAddExplicitClose(checked)}
                                    />

                                    <Divider kind="secondary" horizontalMargin="none" verticalMargin="nano" />
                                </Portion>

                                {/* SHOW BACKDROP ================================================================== */}
                                <Portion>
                                    <Checkbox
                                        id="checkbox-show-backdrop"
                                        value="checkbox-show-backdrop"
                                        name="checkbox-show-backdrop"
                                        label="Show backdrop"
                                        checked={showBackdrop}
                                        onChange={(checked) => setShowBackdrop(checked)}
                                    />

                                    <Divider kind="secondary" horizontalMargin="none" verticalMargin="nano" />
                                </Portion>

                                {/* BLUR BACKDROP ================================================================== */}
                                <Portion>
                                    <Checkbox
                                        id="checkbox-blur-backdrop"
                                        value="checkbox-blur-backdrop"
                                        name="checkbox-blur-backdrop"
                                        label="Blur backdrop"
                                        checked={blurBackdrop}
                                        onChange={(checked) => setBlurBackdrop(checked)}
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

                                {/* OVERLAY COLOUR ================================================================= */}
                                <Portion desktopSpan="half">
                                    <Range
                                        label="Backdrop blur"
                                        // @ts-ignore
                                        value={componentVariables["modal-backdrop-blur"].value}
                                        onChange={(value) => handleVariableChange("modal-backdrop-blur", value)}
                                        min={0} max={50} step={1}
                                        // @ts-ignore
                                        suffix={componentVariables["modal-backdrop-blur"].unit}
                                    />
                                </Portion>
                            </Row>
                        </Form>
                    </Card>
                </Portion>
            </Row>
        </Article>
    );
};

export default ModalDocs;
