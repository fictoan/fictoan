"use client";

// REACT CORE ==========================================================================================================
import Link from "next/link";
import React, { useState } from "react";

// UI ==================================================================================================================
import {
    Element,
    Badge,
    Breadcrumbs,
    Button,
    Callout,
    Card,
    Checkbox,
    Div,
    InputField,
    NotificationItem,
    Portion,
    ProgressBar,
    RadioButton,
    Row,
    Select,
    Switch,
    Table,
    Text,
    Heading1,
    Heading4,
    NotificationsWrapper,
    CodeBlock,
    OptionCard,
    OptionCardsGroup,
    Modal,
    PinInputField,
} from "fictoan-react";

// STYLES ==============================================================================================================
import "./component-grid.css";

export const ComponentGrid = () => {
    const [ showNotification1, setShowNotification1 ] = useState(false);
    const [ isModalOpen, setIsModalOpen ] = useState(false);

    const cardComponentSample = `const clickHere = () => {
    window.load("/components/card");
}`;

    const sampleOptionCards = [
        {id : "card-1", content : "Option 1"},
        {id : "card-2", content : "Option 2"},
        {id : "card-3", content : "Option 3"},
    ];

    return (
        <Div id="grid-wrapper">
            {/* BUTTON ============================================================================================= */}
            <Div id="button-card" className="grid-item">
                <Card shape="rounded" className="component-wrapper" isFullHeight>
                    <Div className="component-card">
                        <Button
                            shape="rounded"
                            bgColour="violet-dark20" textColour="white"
                            marginBottom="nano"
                            isFullWidth
                        >
                            Click me
                        </Button>

                        <Button
                            kind="custom" shape="rounded"
                            bgColour="amber" textColour="amber"
                            isLoading isFullWidth
                        >
                            Load
                        </Button>

                        <Element as="footer" className="footer-bottom">
                            <Link href="/components/button">
                                Button &rarr;
                            </Link>
                        </Element>
                    </Div>
                </Card>
            </Div>

            {/* TYPOGRAPHY ========================================================================================= */}
            <Div id="type-card" className="grid-item">
                <Card shape="rounded" className="component-wrapper" isFullHeight>
                    <Div className="component-card">
                        <Heading1 textColour="pistachio">Hi.</Heading1>
                        <Text weight="600">I’m just your type.</Text>

                        <Element as="footer" className="footer-bottom">
                            <Link href="/typography">
                                Typography &rarr;
                            </Link>
                        </Element>
                    </Div>
                </Card>
            </Div>

            {/* NOTIFICATION ======================================================================================= */}
            <Div id="notification-card" className="grid-item">
                <Card shape="rounded" className="component-wrapper" isFullHeight>
                    <Div className="component-card">
                        <Button
                            kind="custom" bgColour="blue-light70" textColour="blue"
                            shape="rounded" shadow="mild"
                            marginBottom="nano" marginRight="nano"
                            onClick={() => setShowNotification1(true)}
                        >
                            Wanna know something?
                        </Button>

                        <Element as="footer" className="footer-bottom">
                            <Link href="/components/notifications">
                                Notifications &rarr;
                            </Link>
                        </Element>
                    </Div>
                </Card>
            </Div>

            <NotificationsWrapper position="right" anchor="top">
                <NotificationItem
                    kind="info"
                    showWhen={showNotification1}
                    closeWhen={() => setShowNotification1(false)}
                    secondsToShowFor={5}
                    isDismissible
                >
                    <Text textColour="blue">
                        I am here to notify you that...um, wait, I forgot.
                    </Text>
                </NotificationItem>
            </NotificationsWrapper>

            {/* PROGRESS =========================================================================================== */}
            <Div id="progress-card" className="grid-item">
                <Card shape="rounded" className="component-wrapper" isFullHeight>
                    <Div className="component-card">
                        <ProgressBar
                            value={60} max={100} suffix="%"
                            label="Loading..."
                            bgColour="green-light80" fillColour="green"
                            height="8px" shape="rounded"
                        />

                        <Element as="footer" className="footer-bottom">
                            <Link href="/components/button">
                                Progress bar &rarr;
                            </Link>
                        </Element>
                    </Div>
                </Card>
            </Div>

            {/* INPUT ============================================================================================== */}
            <Div id="input-card" className="grid-item">
                <Card shape="rounded" className="component-wrapper" isFullHeight>
                    <Div className="component-card">
                        <InputField
                            label="Enter"
                            placeholder="here"
                        />

                        <Element as="footer" className="footer-bottom">
                            <Link href="/components/button">
                                Input field &rarr;
                            </Link>
                        </Element>
                    </Div>
                </Card>
            </Div>

            {/* SELECT ============================================================================================= */}
            <Div id="select-card" className="grid-item">
                <Card shape="rounded" className="component-wrapper" isFullHeight>
                    <Div className="component-card">
                        <Select
                            options={[
                                {
                                    label : "What’s your pick?",
                                    value : "select-an-option",
                                    disabled : true,
                                    selected : true,
                                },
                                {
                                    label : "Pick me!",
                                    value : "option-1",
                                },
                                {
                                    label : "No, me!",
                                    value : "option-2",
                                },
                            ]}
                        />

                        <Element as="footer" className="footer-bottom">
                            <Link href="/components/button">
                                Select &rarr;
                            </Link>
                        </Element>
                    </Div>
                </Card>
            </Div>

            {/* TABLE ============================================================================================== */}
            <Div id="table-card" className="grid-item">
                <Card shape="rounded" className="component-wrapper" isFullHeight>
                    <Div className="component-card">
                        <Table padding="small" isStriped bordersFor="both" isFullWidth>
                            <thead>
                                <tr>
                                    <th>Yes,</th>
                                    <th>I</th>
                                    <th>would</th>
                                </tr>
                            </thead>

                            <tbody>
                                <tr>
                                    <td>very</td>
                                    <td>much</td>
                                    <td>like</td>
                                </tr>

                                <tr>
                                    <td>a</td>
                                    <td>table</td>
                                    <td>with</td>
                                </tr>

                                <tr>
                                    <td>the</td>
                                    <td>ocean</td>
                                    <td>view</td>
                                </tr>

                                <tr>
                                    <td>please.</td>
                                    <td>Thank</td>
                                    <td>you.</td>
                                </tr>
                            </tbody>
                        </Table>

                        <Element as="footer" className="footer-bottom">
                            <Link href="/components/button">
                                Table &rarr;
                            </Link>
                        </Element>
                    </Div>
                </Card>
            </Div>

            {/* BREADCRUMBS ======================================================================================== */}
            <Div id="breadcrumbs-card" className="grid-item">
                <Card shape="rounded" className="component-wrapper" isFullHeight>
                    <Div className="component-card">
                        <Breadcrumbs spacing="small">
                            <Link href="/components/breadcrumbs">A</Link>
                            <Link href="/components/breadcrumbs">long</Link>
                            <Link href="/components/breadcrumbs">trail</Link>
                            <Link href="/components/breadcrumbs">of</Link>
                            <Link href="/components/breadcrumbs">crumbs</Link>
                        </Breadcrumbs>

                        <Element as="footer" className="footer-bottom">
                            <Link href="/components/button">
                                Breadcrumbs &rarr;
                            </Link>
                        </Element>
                    </Div>
                </Card>
            </Div>

            {/* RADIO ============================================================================================== */}
            <Div id="radio-card" className="grid-item">
                <Card shape="rounded" className="component-wrapper" isFullHeight>
                    <Div className="component-card">
                        <Div marginBottom="micro">
                            <RadioButton
                                id="radio-1"
                                name="choices-1"
                                value="yes"
                                label="This"
                            />
                        </Div>

                        <RadioButton
                            id="radio-2"
                            name="choices-1"
                            value="no"
                            label="That"
                        />

                        <Element as="footer" className="footer-bottom">
                            <Link href="/components/button">
                                Radio buttons &rarr;
                            </Link>
                        </Element>
                    </Div>
                </Card>
            </Div>

            {/* CHECKBOX =========================================================================================== */}
            <Div id="checkbox-card" className="grid-item">
                <Card shape="rounded" className="component-wrapper" isFullHeight>
                    <Div className="component-card">
                        <Div marginBottom="micro">
                            <Checkbox
                                id="checkbox-1"
                                name="checkbox-1"
                                label="Check me"
                            />
                        </Div>

                        <Switch
                            id="switch-1"
                            name="switch-1"
                            label="Toggle me"
                        />

                        <Element as="footer" className="footer-bottom">
                            <Link href="/components/button">
                                Switch &rarr;
                            </Link>
                        </Element>
                    </Div>
                </Card>
            </Div>

            {/* CODE BLOCK ========================================================================================= */}
            <Div id="code-card" className="grid-item">
                <Card shape="rounded" className="component-wrapper" isFullHeight>
                    <Div className="component-card">
                        <CodeBlock
                            withSyntaxHighlighting
                            source={cardComponentSample}
                            language="javascript"
                            marginTop="micro" marginBottom="micro"
                            showCopyButton
                            showLineNumbers
                        />

                        <Element as="footer" className="footer-bottom">
                            <Link href="/components/code-block">
                                CodeBlock &rarr;
                            </Link>
                        </Element>
                    </Div>
                </Card>
            </Div>

            {/* COLOURS ============================================================================================ */}
            <Div id="colour-card" className="grid-item">
                <Card shape="rounded" className="component-wrapper" isFullHeight>
                    <Div className="component-card">
                        <Element as="div"
                                 id="gradient-card"
                                 shape="rounded" borderColour="transparent"
                        />

                        <Element as="footer" className="footer-bottom">
                            <Link href="/colour/">
                                Colour &rarr;
                            </Link>
                        </Element>
                    </Div>
                </Card>
            </Div>

            {/* BADGE ============================================================================================== */}
            <Div id="badge-card" className="grid-item">
                <Card shape="rounded" className="component-wrapper" isFullHeight>
                    <Div className="component-card">
                        <Div id="badge-wrapper">
                            <Badge
                                bgColour="red-light70" textColour="red-dark10"
                                shape="curved"
                                margin="nano"
                            >
                                A
                            </Badge>

                            <Badge
                                bgColour="green-light60" textColour="green-dark40"
                                shape="curved" size="large"
                                margin="nano"
                            >
                                BADGE
                            </Badge>

                            <Badge
                                bgColour="amber-light40" textColour="orange-dark30"
                                shape="rounded"
                                margin="nano"
                            >
                                of
                            </Badge>

                            <Badge
                                bgColour="violet" textColour="white"
                                shape="rounded" size="medium"
                                margin="nano"
                            >
                                HONOUR
                            </Badge>
                        </Div>

                        <Element as="footer" className="footer-bottom">
                            <Link href="/components/button">
                                Badge &rarr;
                            </Link>
                        </Element>
                    </Div>
                </Card>
            </Div>

            {/* CALLOUT ============================================================================================ */}
            <Div id="callout-card" className="grid-item">
                <Card shape="rounded" className="component-wrapper" isFullHeight>
                    <Div className="component-card">
                        <Callout kind="success">
                            <Text textColour="green-dark60">
                                I’d also just like to call out that FICTOAN is awesome.
                            </Text>
                        </Callout>

                        <Element as="footer" className="footer-bottom">
                            <Link href="/components/button">
                                Callout &rarr;
                            </Link>
                        </Element>
                    </Div>
                </Card>
            </Div>

            {/* OPTION CARD ======================================================================================== */}
            <Div id="option-card" className="grid-item">
                <Card shape="rounded" className="component-wrapper" isFullHeight>
                    <Div className="component-card">
                        <OptionCardsGroup
                            allowMultipleSelections
                            showTickIcon
                        >
                            <Row marginBottom="none">
                                {sampleOptionCards.map((card) => (
                                    <Portion desktopSpan="one-third" mobileSpan="half" key={card.id}>
                                        <OptionCard
                                            id={card.id}
                                            padding="small" shape="rounded"
                                        >
                                            <Text align="centre">{card.content}</Text>
                                        </OptionCard>
                                    </Portion>
                                ))}
                            </Row>
                        </OptionCardsGroup>

                        <Element as="footer" className="footer-bottom">
                            <Link href="/components/option-cards">
                                Option cards &rarr;
                            </Link>
                        </Element>
                    </Div>
                </Card>
            </Div>

            {/* MODAL ============================================================================================== */}
            <Div id="modal-card" className="grid-item">
                <Card shape="rounded" className="component-wrapper" isFullHeight>
                    <Div className="component-card">
                        <Button
                            kind="primary"
                            onClick={() => setIsModalOpen(true)}
                        >
                            A wild modal appears!
                        </Button>

                        <Element as="footer" className="footer-bottom">
                            <Link href="/components/modal">
                                Modal &rarr;
                            </Link>
                        </Element>
                    </Div>
                </Card>
            </Div>

            <Modal
                id="sample-modal"
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                isDismissible
                showBackdrop
                blurBackdrop
            >
                <Card padding="micro">
                    <Heading4 marginBottom="nano">I am a modal</Heading4>
                    <Text marginBottom="micro">
                        Quick, please close me, I have stage fright!
                    </Text>

                    <Button
                        kind="primary" size="small"
                        onClick={() => setIsModalOpen(false)}
                    >
                        Close modal
                    </Button>
                </Card>
            </Modal>

            {/* PIN INPUT ========================================================================================== */}
            <Div id="pin-input-card" className="grid-item">
                <Card shape="rounded" className="component-wrapper" isFullHeight>
                    <Div className="component-card">
                        <PinInputField numberOfFields={4} />

                        <Element as="footer" className="footer-bottom">
                            <Link href="/components/pin-input-field">
                                PIN input &rarr;
                            </Link>
                        </Element>
                    </Div>
                </Card>
            </Div>
        </Div>
    );
};
