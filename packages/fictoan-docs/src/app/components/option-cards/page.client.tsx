"use client";

// REACT CORE ==========================================================================================================
import React, { useState, useMemo } from "react";

// UI ==================================================================================================================
import {
    Div,
    Heading2,
    Text,
    Divider,
    CodeBlock,
    Checkbox,
    ListBox,
    OptionCard,
    OptionCardsGroup,
    TickPosition,
}from "fictoan-react";

// UTILS ===============================================================================================================
import { createThemeConfigurator } from "$utils/themeConfigurator";

// STYLES ==============================================================================================================
import "../../../styles/fictoan-theme.css";
import "./page-option-cards.css";

// OTHER ===============================================================================================================
import { ComponentDocsLayout } from "../ComponentDocsLayout";

const OptionCardsDocs = () => {
    // Props state
    const [allowMultipleSelections, setAllowMultipleSelections] = useState(false);
    const [showTickIcon, setShowTickIcon] = useState(true);
    const [tickPosition, setTickPosition] = useState<TickPosition>("top-right");
    const [selectedIds, setSelectedIds] = useState(new Set<string>());

    // Theme configurator
    const OptionCardComponent = (varName: string) => {
        return varName.startsWith("option-card-");
    };

    const {
        interactiveElementRef,
        componentProps: themeProps,
        themeConfigurator,
    } = createThemeConfigurator("OptionCard", OptionCardComponent);

    // Handle selection change
    const handleSelectionChange = (newSelectedIds: Set<string>) => {
        setSelectedIds(newSelectedIds);
        console.log("Selected IDs:", Array.from(newSelectedIds));
    };

    // Generate code
    const codeString = useMemo(() => {
        const groupProps = [];
        if (allowMultipleSelections) groupProps.push(`    allowMultipleSelections`);
        if (!showTickIcon) groupProps.push(`    showTickIcon={false}`);
        if (tickPosition !== "top-right") groupProps.push(`    tickPosition="${tickPosition}"`);
        groupProps.push(`    onSelectionChange={(ids) => console.log(ids)}`);

        const groupPropsString = groupProps.length > 0 ? `\n${groupProps.join("\n")}\n` : "";

        return `<OptionCardsGroup${groupPropsString}>
    <OptionCard id="card-1" padding="small">
        Option 1
    </OptionCard>
    <OptionCard id="card-2" padding="small">
        Option 2
    </OptionCard>
    <OptionCard id="card-3" padding="small">
        Option 3
    </OptionCard>
</OptionCardsGroup>`;
    }, [allowMultipleSelections, showTickIcon, tickPosition]);

    return (
        <ComponentDocsLayout>
            {/* INTRO HEADER /////////////////////////////////////////////////////////////////////////////////////// */}
            <Div id="intro-header">
                <Heading2 id="component-name">
                    Option Cards
                </Heading2>

                <Text id="component-description" weight="400">
                    A selectable card component that can be used individually or in groups with single or multiple selection modes
                </Text>
            </Div>

            {/* INTRO NOTES //////////////////////////////////////////////////////////////////////////////////////// */}
            <Div id="intro-notes">
                <Divider kind="tertiary" verticalMargin="micro" />

                <Text>
                    Supports single and multiple selections, with an optional tick icon indicator. Cards accept any
                    React node as children.
                </Text>
            </Div>

            {/* DEMO COMPONENT ///////////////////////////////////////////////////////////////////////////////////// */}
            <Div id="demo-component">
                <OptionCardsGroup
                    allowMultipleSelections={allowMultipleSelections}
                    showTickIcon={showTickIcon}
                    tickPosition={tickPosition}
                    onSelectionChange={handleSelectionChange}
                >
                    <OptionCard
                        // @ts-ignore
                        ref={interactiveElementRef}
                        {...themeProps}
                        id="card-1"
                        padding="small"
                    >
                        Option 1
                    </OptionCard>

                    <OptionCard id="card-2" padding="small">
                        Option 2
                    </OptionCard>

                    <OptionCard id="card-3" padding="small">
                        Option 3
                    </OptionCard>
                </OptionCardsGroup>
            </Div>

            {/* PROPS CONFIG /////////////////////////////////////////////////////////////////////////////////////// */}
            <Div id="props-config">
                <CodeBlock language="tsx" withSyntaxHighlighting showCopyButton>
                    {codeString}
                </CodeBlock>

                <Div className="doc-controls">
                    <Checkbox
                        id="prop-allowMultipleSelections"
                        label="allowMultipleSelections"
                        checked={allowMultipleSelections}
                        onChange={(checked) => setAllowMultipleSelections(checked)}
                        helpText="Allows selecting multiple cards."
                        marginBottom="micro"
                    />

                    <Checkbox
                        id="prop-showTickIcon"
                        label="showTickIcon"
                        checked={showTickIcon}
                        onChange={(checked) => setShowTickIcon(checked)}
                        helpText="Shows a tick icon on selected cards."
                        marginBottom="micro"
                    />

                    <ListBox
                        label="tickPosition"
                        options={[
                            { label: "top-left", value: "top-left" },
                            { label: "top-right", value: "top-right" },
                            { label: "bottom-left", value: "bottom-left" },
                            { label: "bottom-right", value: "bottom-right" },
                            { label: "centre-left", value: "centre-left" },
                            { label: "centre-right", value: "centre-right" },
                            { label: "centre-top", value: "centre-top" },
                            { label: "centre-bottom", value: "centre-bottom" },
                            { label: "centre", value: "centre" },
                        ]}
                        value={tickPosition}
                        onChange={(value) => setTickPosition(value as TickPosition)}
                        marginBottom="micro"
                        isFullWidth
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

export default OptionCardsDocs;
