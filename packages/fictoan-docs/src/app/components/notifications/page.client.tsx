"use client";

// REACT CORE ==========================================================================================================
import React, { useEffect, useState } from "react";

// UI ==================================================================================================================
import { Element, Heading1, Heading2, Heading3, Heading4, Heading5, Heading6, Divider, Portion, Row, Text, Article, Card, Form, Header, RadioTabGroup, Select, Button, Range, NotificationsWrapper, NotificationItem, CodeBlock } from "fictoan-react";

// UTILS ===============================================================================================================
import { useThemeVariables } from "../../../utils/useThemeVariables";

// STYLES ==============================================================================================================
import "./page-notifications.css";

// OTHER ===============================================================================================================
import { colourOptions } from "../../colour/colours";
import { toastProps } from "./config";

const NotificationsDocs = () => {
    const [notifications, setNotifications] = useState([]);

    const [selectedPosition, setSelectedPosition] = useState("right");
    const [selectedAnchor, setSelectedAnchor] = useState("top");
    const [selectedOrder, setSelectedOrder] = useState("new-on-top");

    const [secondsToShowFor, setSecondsToShowFor] = useState(1000);

    const { componentVariables, handleVariableChange, cssVariablesList } = useThemeVariables(toastProps.variables);

    const handleShowNotification = (type) => {
        const id = Date.now();
        const count = notifications.filter(notification => notification.type === type).length + 1;

        const newNotification = {
            id,
            type,
            count,
            message : `I’m ${type} notification #${count}`,
        };

        setNotifications(prevNotifications => [...prevNotifications, newNotification]);
    };

    return (
        <Article id="page-component">
            <Row horizontalPadding="huge" marginTop="medium" marginBottom="small">
                <Portion>
                    <Heading1>Notifications</Heading1>
                    <Text size="large" marginBottom="small">
                        A small popup that shows up in one of the four corners of the screen for a set period
                    </Text>
                </Portion>

                <Portion>
                    
                    <ul>
                        <li>
                            The <code>NotificationsWrapper</code> is a single parent, with any number
                            of <code>NotificationsItem</code> children inside it.
                        </li>

                        <li>
                            Some props such as <code>position</code> and <code>anchor</code> are
                            applied to the <code>NotificationsWrapper</code>, while others such as
                            <code>secondsToShowFor</code> can be applied to individual <code>NotificationsItem</code>
                            elements
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
                            kind="custom" bgColour="slate-light90" textColour="slate"
                            shape="rounded" shadow="mild"
                            marginBottom="nano" marginRight="nano"
                            onClick={() => handleShowNotification("generic")}
                        >
                            Show generic notification
                        </Button>

                        <Button
                            kind="custom" bgColour="blue-20" textColour="blue"
                            shape="rounded" shadow="mild"
                            marginBottom="nano" marginRight="nano"
                            onClick={() => handleShowNotification("info")}
                        >
                            Show info notification
                        </Button>

                        <Button
                            kind="custom" bgColour="amber-20" textColour="amber"
                            shape="rounded" shadow="mild"
                            marginBottom="nano" marginRight="nano"
                            onClick={() => handleShowNotification("warning")}
                        >
                            Show warning notification
                        </Button>

                        <Button
                            kind="custom" bgColour="red-20" textColour="red"
                            shape="rounded" shadow="mild"
                            marginBottom="nano" marginRight="nano"
                            onClick={() => handleShowNotification("error")}
                        >
                            Show error notification
                        </Button>

                        <Button
                            kind="custom" bgColour="green-20" textColour="green"
                            shape="rounded" shadow="mild"
                            marginBottom="nano" marginRight="nano"
                            onClick={() => handleShowNotification("success")}
                        >
                            Show success notification
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
                                            `const [showSampleNotification, setShowSampleNotification] = useState(false); \n`,
                                            `<NotificationsWrapper`,
                                            selectedPosition ? `    position="${selectedPosition}"` : null,
                                            selectedAnchor ? `    anchor="${selectedAnchor}"` : null,
                                            selectedOrder ? `    order="${selectedOrder}"` : null,
                                            `>`,
                                            `    <NotificationItem`,
                                            `        showWhen={showSampleNotification}`,
                                            `        secondsToShowFor={${secondsToShowFor}}`,
                                            `        closeWhen={() => setShowSampleNotification(false)}`,
                                            `    >`,
                                            `        <Text>Just a basic notification</Text>`,
                                            `    </NotificationItem>`,
                                            `</NotificationsWrapper>`,
                                        ].filter(Boolean).join("\n")}
                                    </CodeBlock>
                                </Portion>

                                <Portion>
                                    <Text size="large" weight="700">For NotificationWrapper</Text>
                                </Portion>

                                {/* POSITION ======================================================================= */}
                                <Portion>
                                    <RadioTabGroup
                                        id="position" label="Position" name="position"
                                        options={[
                                            { id : "position-opt-0", value : "left", label : "left" },
                                            { id : "position-opt-1", value : "right", label : "right" },
                                        ]}
                                        value={selectedPosition || "right"}
                                        onChange={(value) => setSelectedPosition(value)}
                                    />

                                    <Divider kind="secondary" horizontalMargin="none" marginTop="micro" />
                                </Portion>

                                {/* ANCHOR ========================================================================= */}
                                <Portion>
                                    <RadioTabGroup
                                        id="anchor" label="Anchor" name="anchor"
                                        options={[
                                            { id : "anchor-opt-0", value : "top", label : "top" },
                                            { id : "anchor-opt-1", value : "bottom", label : "bottom" },
                                        ]}
                                        value={selectedAnchor || "right"}
                                        onChange={(value) => setSelectedAnchor(value)}
                                    />

                                    <Divider kind="secondary" horizontalMargin="none" marginTop="micro" />
                                </Portion>

                                {/* ANCHOR ========================================================================= */}
                                <Portion>
                                    <RadioTabGroup
                                        id="order" label="Order" name="order"
                                        options={[
                                            { id : "order-opt-0", value : "new-on-top", label : "new-on-top" },
                                            { id : "order-opt-1", value : "new-on-bottom", label : "new-on-bottom" },
                                        ]}
                                        value={selectedOrder || "right"}
                                        onChange={(value) => setSelectedOrder(value)}
                                    />
                                </Portion>


                                <Portion>
                                    <Text size="large" weight="700" marginTop="tiny">For NotificationItem</Text>
                                </Portion>

                                {/* SHOW FOR ======================================================================= */}
                                <Portion>
                                    <Range
                                        label="Show toast for"
                                        value={secondsToShowFor}
                                        onChange={(value) => setSecondsToShowFor(value)}
                                        suffix={secondsToShowFor > 1 ? " seconds" : " second"}
                                        min={1} max={50} step={1}
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

                            <Row marginBottom="micro">
                                <Portion>
                                    <CodeBlock
                                        withSyntaxHighlighting
                                        source={cssVariablesList}
                                        language="css"
                                        showCopyButton
                                    />
                                </Portion>
                            </Row>

                            {/* GENERIC NOTIFICATION /////////////////////////////////////////////////////////////// */}
                            <Row marginBottom="none">
                                <Portion>
                                    <Text weight="700">Generic notification</Text>
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
                                        defaultValue={componentVariables["notification-item-generic-bg"].defaultValue || "select-a-colour"}
                                        onChange={(value) => handleVariableChange("notification-item-generic-bg", value)}
                                        isFullWidth
                                    />
                                </Portion>

                                {/* BG COLOUR ====================================================================== */}
                                <Portion desktopSpan="half">
                                    <Select
                                        label="Border"
                                        options={[{
                                            label    : "Select a colour",
                                            value    : "select-a-colour",
                                            disabled : true,
                                            selected : true,
                                        }, ...colourOptions]}
                                        defaultValue={componentVariables["notification-item-generic-border"].defaultValue || "select-a-colour"}
                                        onChange={(value) => handleVariableChange("notification-item-generic-border", value)}
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
                                        defaultValue={componentVariables["notification-item-generic-text"].defaultValue || "select-a-colour"}
                                        onChange={(value) => handleVariableChange("notification-item-generic-text", value)}
                                        isFullWidth
                                    />
                                </Portion>

                                {/* BORDER RADIUS ================================================================== */}
                                <Portion desktopSpan="half">
                                    <Range
                                        label="Border radius"
                                        value={componentVariables["notification-item-border-radius"].value}
                                        onChange={(value) => handleVariableChange("notification-item-border-radius", value)}
                                        suffix={componentVariables["notification-item-border-radius"].unit}
                                        min={0} max={50} step={1}
                                    />
                                </Portion>
                            </Row>

                            <Divider kind="secondary" verticalMargin="micro" />

                            {/* INFO NOTIFICATION ////////////////////////////////////////////////////////////////// */}
                            <Row marginBottom="none">
                                <Portion>
                                    <Text weight="700">Info notification</Text>
                                </Portion>

                                {/* BACKGROUND ===================================================================== */}
                                <Portion desktopSpan="half">
                                    <Select
                                        label="Background"
                                        options={[{
                                            label    : "Select a colour",
                                            value    : "select-a-colour",
                                            disabled : true,
                                            selected : true,
                                        }, ...colourOptions]}
                                        defaultValue={componentVariables["notification-item-info-bg"].defaultValue || "select-a-colour"}
                                        onChange={(value) => handleVariableChange("notification-item-info-bg", value)}
                                        isFullWidth
                                    />
                                </Portion>

                                {/* BORDER ====================================================================== */}
                                <Portion desktopSpan="half">
                                    <Select
                                        label="Border"
                                        options={[{
                                            label    : "Select a colour",
                                            value    : "select-a-colour",
                                            disabled : true,
                                            selected : true,
                                        }, ...colourOptions]}
                                        defaultValue={componentVariables["notification-item-info-border"].defaultValue || "select-a-colour"}
                                        onChange={(value) => handleVariableChange("notification-item-info-border", value)}
                                        isFullWidth
                                    />
                                </Portion>
                            </Row>

                            <Divider kind="secondary" verticalMargin="micro" />

                            {/* ERROR NOTIFICATION ///////////////////////////////////////////////////////////////// */}
                            <Row marginBottom="none">
                                <Portion>
                                    <Text weight="700">Error notification</Text>
                                </Portion>

                                {/* BACKGROUND ===================================================================== */}
                                <Portion desktopSpan="half">
                                    <Select
                                        label="Background"
                                        options={[{
                                            label    : "Select a colour",
                                            value    : "select-a-colour",
                                            disabled : true,
                                            selected : true,
                                        }, ...colourOptions]}
                                        defaultValue={componentVariables["notification-item-error-bg"].defaultValue || "select-a-colour"}
                                        onChange={(value) => handleVariableChange("notification-item-error-bg", value)}
                                        isFullWidth
                                    />
                                </Portion>

                                {/* BORDER ====================================================================== */}
                                <Portion desktopSpan="half">
                                    <Select
                                        label="Border"
                                        options={[{
                                            label    : "Select a colour",
                                            value    : "select-a-colour",
                                            disabled : true,
                                            selected : true,
                                        }, ...colourOptions]}
                                        defaultValue={componentVariables["notification-item-error-border"].defaultValue || "select-a-colour"}
                                        onChange={(value) => handleVariableChange("notification-item-error-border", value)}
                                        isFullWidth
                                    />
                                </Portion>
                            </Row>

                            <Divider kind="secondary" verticalMargin="micro" />

                            {/* SUCCESS NOTIFICATION /////////////////////////////////////////////////////////////// */}
                            <Row marginBottom="none">
                                <Portion>
                                    <Text weight="700">Success notification</Text>
                                </Portion>

                                {/* BACKGROUND ===================================================================== */}
                                <Portion desktopSpan="half">
                                    <Select
                                        label="Background"
                                        options={[{
                                            label    : "Select a colour",
                                            value    : "select-a-colour",
                                            disabled : true,
                                            selected : true,
                                        }, ...colourOptions]}
                                        defaultValue={componentVariables["notification-item-success-bg"].defaultValue || "select-a-colour"}
                                        onChange={(value) => handleVariableChange("notification-item-success-bg", value)}
                                        isFullWidth
                                    />
                                </Portion>

                                {/* BORDER ====================================================================== */}
                                <Portion desktopSpan="half">
                                    <Select
                                        label="Border"
                                        options={[{
                                            label    : "Select a colour",
                                            value    : "select-a-colour",
                                            disabled : true,
                                            selected : true,
                                        }, ...colourOptions]}
                                        defaultValue={componentVariables["notification-item-success-border"].defaultValue || "select-a-colour"}
                                        onChange={(value) => handleVariableChange("notification-item-success-border", value)}
                                        isFullWidth
                                    />
                                </Portion>
                            </Row>
                        </Form>
                    </Card>
                </Portion>
            </Row>

            {/* //////////////////////////////////////////////////////////////////////////////////////////////////// */}
            {/* ACTUAL COMPONENT INSTANCE */}
            {/* //////////////////////////////////////////////////////////////////////////////////////////////////// */}
            <NotificationsWrapper
                position={selectedPosition}
                anchor={selectedAnchor}
                order={selectedOrder}
            >
                {notifications.map(({ id, type, message }) => (
                    <NotificationItem
                        key={id}
                        kind={type}
                        showWhen={true}
                        closeWhen={() => setNotifications(prevNotifications => prevNotifications.filter(notification => notification.id !== id))}
                        secondsToShowFor={secondsToShowFor}
                        isDismissible
                    >
                        <Text>{message}</Text>
                    </NotificationItem>
                ))}
            </NotificationsWrapper>
        </Article>
    );
};

export default NotificationsDocs;
