"use client";

// REACT CORE ==========================================================================================================
import React, { useState, useMemo } from "react";

// UI ==================================================================================================================
import {
    Div,
    Heading6,
    Text,
    Button,
    Divider,
    CodeBlock,
    RadioTabGroup,
    Range,
    NotificationsProvider,
    useNotifications,
} from "fictoan-react";

// STYLES ==============================================================================================================
import "../../../styles/fictoan-theme.css";
import "./page-notifications.css";

// OTHER ===============================================================================================================
import { ComponentDocsLayout } from "../ComponentDocsLayout";

// DEMO COMPONENT WITH ITS OWN PROVIDER ================================================================================
const NotificationsDemo = ({
    position,
    anchor,
    order,
    kind,
    duration,
    usageStyle,
    notificationKind,
}: {
    position: string;
    anchor: string;
    order: string;
    kind: string;
    duration: number;
    usageStyle: string;
    notificationKind: string;
}) => {
    const notify = useNotifications();

    const handleNotify = () => {
        switch (usageStyle) {
            case "simple":
                notify("Hello there!");
                break;
            case "shorthand":
                if (notificationKind === "success") notify.success("Saved successfully!");
                else if (notificationKind === "error") notify.error("Something went wrong");
                else if (notificationKind === "warning") notify.warning("Please check your input");
                else notify.info("Here's some information");
                break;
            case "options":
                notify({
                    content: "Notification with options",
                    kind: notificationKind as any,
                    duration,
                    isDismissible: true,
                });
                break;
            case "react-node":
                notify({
                    content: (
                        <Div>
                            <Text weight="600" marginBottom="nano">Custom content</Text>
                            <Text>With React nodes inside!</Text>
                        </Div>
                    ),
                    kind: notificationKind as any,
                    duration,
                });
                break;
            case "close-handler":
                notify({
                    content: ({ close }) => (
                        <Div>
                            <Text marginBottom="nano">Click the button to dismiss</Text>
                            <Button size="small" kind="primary" onClick={close}>
                                Got it!
                            </Button>
                        </Div>
                    ),
                    kind: notificationKind as any,
                    duration: 0,
                });
                break;
        }
    };

    return (
        <Button kind="primary" onClick={handleNotify}>
            Show notification
        </Button>
    );
};

// MAIN DOCS COMPONENT =================================================================================================
const NotificationsDocs = () => {
    // Props state
    const [position, setPosition] = useState("right");
    const [anchor, setAnchor] = useState("top");
    const [order, setOrder] = useState("new-on-top");
    const [kind, setKind] = useState("list");
    const [duration, setDuration] = useState(4);
    const [usageStyle, setUsageStyle] = useState("simple");
    const [notificationKind, setNotificationKind] = useState("info");

    // Generate code based on selections
    const codeString = useMemo(() => {
        const providerProps = [];
        if (position !== "right") providerProps.push(`    position="${position}"`);
        if (anchor !== "top") providerProps.push(`    anchor="${anchor}"`);
        if (order !== "new-on-top") providerProps.push(`    order="${order}"`);
        if (kind !== "list") providerProps.push(`    kind="${kind}"`);
        const providerPropsStr = providerProps.length > 0 ? `\n${providerProps.join("\n")}\n` : "";

        let usageCode = "";
        switch (usageStyle) {
            case "simple":
                usageCode = `notify("Hello there!");`;
                break;
            case "shorthand":
                usageCode = `notify.${notificationKind}("Your message here");`;
                break;
            case "options":
                usageCode = `notify({
        content: "Your message here",
        kind: "${notificationKind}",
        duration: ${duration},
        isDismissible: true,
    });`;
                break;
            case "react-node":
                usageCode = `notify({
        content: (
            <Div>
                <Text weight="600">Title</Text>
                <Text>Description text</Text>
            </Div>
        ),
        kind: "${notificationKind}",
        duration: ${duration},
    });`;
                break;
            case "close-handler":
                usageCode = `notify({
        content: ({ close }) => (
            <Div>
                <Text>Your message</Text>
                <Button onClick={close}>Dismiss</Button>
            </Div>
        ),
        kind: "${notificationKind}",
        duration: 0, // Won't auto-dismiss
    });`;
                break;
        }

        return `// In your app's root layout (e.g., layout.tsx or App.tsx)
import { NotificationsProvider } from "fictoan-react";

export default function RootLayout({ children }) {
    return (
        <NotificationsProvider${providerPropsStr}>
            {children}
        </NotificationsProvider>
    );
}

-------

// In any component
import { useNotifications } from "fictoan-react";

const MyComponent = () => {
    const notify = useNotifications();

    ${usageCode}
};`;
    }, [position, anchor, order, kind, duration, usageStyle, notificationKind]);

    return (
        <NotificationsProvider
            position={position as any}
            anchor={anchor as any}
            order={order as any}
            kind={kind as any}
        >
            <ComponentDocsLayout>
                {/* INTRO HEADER /////////////////////////////////////////////////////////////////////////////////////// */}
                <Div id="intro-header">
                    <Heading6 id="component-name">
                        Notifications
                    </Heading6>

                    <Text id="component-description" weight="400">
                        Imperative notifications that can be triggered from anywhere
                    </Text>
                </Div>

                {/* INTRO NOTES //////////////////////////////////////////////////////////////////////////////////////// */}
                <Div id="intro-notes">
                    <Divider kind="tertiary" verticalMargin="micro" />

                    <Text>
                        Wrap your app with <code>NotificationsProvider</code> once, then
                        use <code>useNotifications()</code> anywhere.
                    </Text>

                    <Text>
                        Shorthand methods: <code>notify.success()</code>, <code>notify.error()</code>, <code>notify.warning()</code>, <code>notify.info()</code>.
                    </Text>

                    <Text>
                        Pass a render function to access the <code>close</code> handler for custom dismiss buttons.
                    </Text>
                </Div>

                {/* DEMO COMPONENT ///////////////////////////////////////////////////////////////////////////////////// */}
                <Div id="demo-component">
                    <NotificationsDemo
                        position={position}
                        anchor={anchor}
                        order={order}
                        kind={kind}
                        duration={duration}
                        usageStyle={usageStyle}
                        notificationKind={notificationKind}
                    />
                </Div>

                {/* PROPS CONFIG /////////////////////////////////////////////////////////////////////////////////////// */}
                <Div id="props-config">
                    <CodeBlock language="tsx" withSyntaxHighlighting showCopyButton>
                        {codeString}
                    </CodeBlock>

                    <Div className="doc-controls">
                        <Text weight="700" marginBottom="nano">NotificationsProvider</Text>

                        <RadioTabGroup
                            id="prop-usage-style"
                            label="notify()"
                            options={[
                                { id: "usage-simple", value: "simple", label: "string" },
                                { id: "usage-shorthand", value: "shorthand", label: "shorthand" },
                                { id: "usage-options", value: "options", label: "options" },
                                { id: "usage-react-node", value: "react-node", label: "React node" },
                                { id: "usage-close-handler", value: "close-handler", label: "close handler" },
                            ]}
                            value={usageStyle}
                            onChange={(val) => setUsageStyle(val)}
                            helpText="Different ways to call notify()."
                            marginBottom="micro"
                        />

                        <RadioTabGroup
                            id="prop-position"
                            label="position"
                            options={[
                                { id: "position-left", value: "left", label: "left" },
                                { id: "position-right", value: "right", label: "right" },
                            ]}
                            value={position}
                            onChange={(val) => setPosition(val)}
                            helpText="Horizontal position of the stack."
                            marginBottom="micro"
                        />

                        <RadioTabGroup
                            id="prop-anchor"
                            label="anchor"
                            options={[
                                { id: "anchor-top", value: "top", label: "top" },
                                { id: "anchor-bottom", value: "bottom", label: "bottom" },
                            ]}
                            value={anchor}
                            onChange={(val) => setAnchor(val)}
                            helpText="Vertical anchor point."
                            marginBottom="micro"
                        />

                        <RadioTabGroup
                            id="prop-order"
                            label="order"
                            options={[
                                { id: "order-new-on-top", value: "new-on-top", label: "new-on-top" },
                                { id: "order-new-on-bottom", value: "new-on-bottom", label: "new-on-bottom" },
                            ]}
                            value={order}
                            onChange={(val) => setOrder(val)}
                            helpText="Where new notifications appear."
                            marginBottom="micro"
                        />

                        <RadioTabGroup
                            id="prop-kind-display"
                            label="kind"
                            options={[
                                { id: "kind-list", value: "list", label: "list" },
                                { id: "kind-stack", value: "stack", label: "stack" },
                            ]}
                            value={kind}
                            onChange={(val) => setKind(val)}
                            helpText="List shows all, stack shows top with others behind."
                            marginBottom="micro"
                        />

                        <Divider kind="tertiary" verticalMargin="micro" />

                        <Text weight="700" marginBottom="nano">Notification options</Text>

                        {usageStyle !== "simple" && (
                            <RadioTabGroup
                                id="prop-kind"
                                label="kind (notification)"
                                options={[
                                    { id: "kind-info", value: "info", label: "info" },
                                    { id: "kind-success", value: "success", label: "success" },
                                    { id: "kind-warning", value: "warning", label: "warning" },
                                    { id: "kind-error", value: "error", label: "error" },
                                ]}
                                value={notificationKind}
                                onChange={(val) => setNotificationKind(val)}
                                helpText="Visual style of the notification."
                                marginBottom="micro"
                            />
                        )}

                        {usageStyle !== "close-handler" && (
                            <Range
                                id="prop-duration"
                                label="duration"
                                min={1}
                                max={10}
                                value={duration}
                                onChange={(val: number) => setDuration(val)}
                                suffix={duration === 1 ? " second" : " seconds"}
                                helpText="Auto-dismiss delay."
                                marginBottom="micro" isFullWidth
                            />
                        )}
                    </Div>
                </Div>

                {/* THEME CONFIG /////////////////////////////////////////////////////////////////////////////////////// */}
                <Div id="theme-config" />
            </ComponentDocsLayout>
        </NotificationsProvider>
    );
};

export default NotificationsDocs;
