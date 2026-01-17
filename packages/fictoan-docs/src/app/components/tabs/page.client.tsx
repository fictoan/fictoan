"use client";

// REACT CORE ==========================================================================================================
import React, { useState, useMemo } from "react";

// UI ==================================================================================================================
import { Div, Heading6, Text, Divider, Tabs, CodeBlock, RadioTabGroup, Checkbox, } from "fictoan-react";

// UTILS ===============================================================================================================
import { createThemeConfigurator } from "$utils/themeConfigurator";

// STYLES ==============================================================================================================
import "../../../styles/fictoan-theme.css";
import "./page-tabs.css";

// OTHER ===============================================================================================================
import { ComponentDocsLayout } from "../ComponentDocsLayout";

const TabsDocs = () => {
    // Props state
    const [align, setAlign] = useState("left");
    const [isFullWidth, setIsFullWidth] = useState(false);
    const [alertTabIndex, setAlertTabIndex] = useState<number | null>(null);

    // Theme configurator
    const TabsComponent = (varName: string) => {
        return varName.startsWith("tabs-") || varName.startsWith("tab-");
    };

    const {
        interactiveElementRef,
        componentProps: themeProps,
        themeConfigurator,
    } = createThemeConfigurator<HTMLDivElement>("Tabs", TabsComponent);

    // Sample tabs data
    const baseTabs = [
        { key: "overview", label: "Overview", content: <Text>This is the overview content. Add any React nodes here.</Text> },
        { key: "features", label: "Features", content: <Text>Features content goes here. Each tab can have different content.</Text> },
        { key: "settings", label: "Settings", content: <Text>Settings and configuration options would appear in this tab.</Text> },
    ];

    const tabs = useMemo(() => baseTabs.map((tab, index) => ({
        ...tab,
        hasAlert: alertTabIndex === index,
    })), [alertTabIndex]);

    // Generate code
    const codeString = useMemo(() => {
        const tabsCode = baseTabs.map((tab, index) => {
            const hasAlertStr = alertTabIndex === index ? ", hasAlert: true" : "";
            return `        { key: "${tab.key}", label: "${tab.label}", content: <Text>...</Text>${hasAlertStr} }`;
        }).join(",\n");

        const props = [];
        props.push(`tabs={[\n${tabsCode},\n    ]}`);
        if (align !== "left") props.push(`align="${align}"`);
        if (isFullWidth) props.push(`isFullWidth`);

        return `import { Tabs, Text } from "fictoan-react";

<Tabs
    ${props.join("\n    ")}
/>`;
    }, [align, isFullWidth, alertTabIndex]);

    return (
        <ComponentDocsLayout>
            {/* INTRO HEADER /////////////////////////////////////////////////////////////////////////////////////// */}
            <Div id="intro-header">
                <Heading6 id="component-name">
                    Tabs
                </Heading6>

                <Text id="component-description" weight="400">
                    A way to display multiple blocks of content, one at a time
                </Text>
            </Div>

            {/* INTRO NOTES //////////////////////////////////////////////////////////////////////////////////////// */}
            <Div id="intro-notes">
                <Divider kind="tertiary" verticalMargin="micro" />

                <Text>
                    Pass an array of <code>{`{ key, label, content }`}</code> objects to the <code>tabs</code> prop.
                </Text>

                <Text>
                    Use <code>hasAlert</code> on individual tabs to show a notification indicator.
                </Text>

                <Text>
                    Fully accessible with keyboard navigation (Arrow keys, Home/End).
                </Text>
            </Div>

            {/* DEMO COMPONENT ///////////////////////////////////////////////////////////////////////////////////// */}
            <Div id="demo-component">
                <Tabs
                    ref={interactiveElementRef}
                    tabs={tabs}
                    align={align as any}
                    isFullWidth={isFullWidth}
                    {...themeProps}
                />
            </Div>

            {/* PROPS CONFIG /////////////////////////////////////////////////////////////////////////////////////// */}
            <Div id="props-config">
                <CodeBlock language="tsx" withSyntaxHighlighting showCopyButton>
                    {codeString}
                </CodeBlock>

                <Div className="doc-controls">
                    <RadioTabGroup
                        id="prop-align"
                        label="align"
                        options={[
                            { id: "align-left", value: "left", label: "left" },
                            { id: "align-centre", value: "centre", label: "centre" },
                            { id: "align-right", value: "right", label: "right" },
                        ]}
                        value={align}
                        onChange={(val) => setAlign(val)}
                        helpText="Alignment of the tab labels."
                        marginBottom="micro"
                    />

                    <Checkbox
                        id="prop-isFullWidth"
                        label="isFullWidth"
                        checked={isFullWidth}
                        onChange={() => setIsFullWidth(!isFullWidth)}
                        helpText="Makes tabs stretch to fill the container width."
                        marginBottom="micro"
                    />

                    <Checkbox
                        id="prop-hasAlert"
                        label={alertTabIndex !== null
                            ? `hasAlert (${baseTabs[alertTabIndex].label})`
                            : "hasAlert"}
                        checked={alertTabIndex !== null}
                        onChange={() => {
                            if (alertTabIndex !== null) {
                                setAlertTabIndex(null);
                            } else {
                                const randomIndex = Math.floor(Math.random() * baseTabs.length);
                                setAlertTabIndex(randomIndex);
                            }
                        }}
                        helpText="Shows a notification indicator on a tab."
                        marginBottom="micro"
                    />
                </Div>
            </Div>

            {/* THEME CONFIG /////////////////////////////////////////////////////////////////////////////////////// */}
            <Div id="theme-config">
                {themeConfigurator()}
            </Div>
        </ComponentDocsLayout>
    );
};

export default TabsDocs;
