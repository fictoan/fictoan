"use client";

// REACT CORE ==========================================================================================================
import React, { useState } from "react";

// UI ==================================================================================================================
import { Element, Heading1, Heading4, Divider, Portion, Row, Text, Article, Card, Button, Modal, Section } from "fictoan-react";

// COMPONENTS ==========================================================================================================
import { PropsConfigurator } from "../../../components/PropsConfigurator/PropsConfigurator";

// UTILS ===============================================================================================================
import { createThemeConfigurator } from "$utils/themeConfigurator";

// STYLES ==============================================================================================================
import "./page-modal.css";

const ModalDocs = () => {
    const [componentProps, setComponentProps] = useState({});
    const [isModalOpen, setIsModalOpen] = useState(false);

    const ModalComponent = (varName: string) => {
        return varName.startsWith("modal-");
    };

    const {
        interactiveElementRef,
        componentProps: themeConfig,
        themeConfigurator,
    } = createThemeConfigurator("Modal", ModalComponent);

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
                        <li>Uses the new Popover API, and browser support isn't great yet, but it's improving</li>
                        <li>
                            Accept any React node as children. By itself the modal has nothing inside, you'll need to
                            add a Card or so inside.
                        </li>
                        <li>
                            Use the <code>isOpen</code> and <code>onClose</code> props to control the modal state.
                        </li>
                        <li>
                            The <code>isDismissible</code> prop displays a &times; at the top right corner, and can be
                            dismissed with the Esc key
                        </li>
                    </ul>
                </Portion>
            </Row>

            <Divider kind="primary" horizontalMargin="huge" verticalMargin="small" />

            {/* INTERACTIVE COMPONENT ////////////////////////////////////////////////////////////////////////////////// */}
            <Section>
                {/* DEMO COMPONENT /////////////////////////////////////////////////////////////////////////////////// */}
                <Row id="component-wrapper" horizontalPadding="small" className="rendered-component">
                    <Portion>
                        <Element
                            as="div"
                            padding="small"
                            shape="rounded"
                            bgColour="slate-light80"
                            data-centered-children
                        >
                            <Button
                                onClick={() => setIsModalOpen(true)}
                            >
                                Open Modal
                            </Button>
                        </Element>
                    </Portion>
                </Row>

                <Modal
                    id="interactive-component"
                    ref={interactiveElementRef}
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    {...componentProps}
                    {...themeConfig}
                >
                    <Card padding="micro">
                        <Heading4 marginBottom="nano">This is a modal</Heading4>
                        <Text marginBottom="micro">
                            You can add anything inside here, and it's always centered on the screen.
                        </Text>
                        <Button
                            onClick={() => setIsModalOpen(false)}
                            kind="secondary"
                        >
                            Close Modal
                        </Button>
                    </Card>
                </Modal>

                <Row horizontalPadding="small">
                    {/* PROPS CONFIGURATOR =========================================================================== */}
                    <Portion desktopSpan="half">
                        <PropsConfigurator
                            componentName="Modal"
                            onPropsChange={setComponentProps}
                        />
                    </Portion>

                    {/* THEME CONFIGURATOR =========================================================================== */}
                    <Portion desktopSpan="half">
                        {themeConfigurator()}
                    </Portion>
                </Row>
            </Section>
        </Article>
    );
};

export default ModalDocs;
