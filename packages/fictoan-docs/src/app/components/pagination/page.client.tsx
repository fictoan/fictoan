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
    RadioTabGroup,
    InputField,
    Pagination,
    Range,
}from "fictoan-react";

// UTILS ===============================================================================================================
import { createThemeConfigurator } from "$utils/themeConfigurator";

// STYLES ==============================================================================================================
import "../../../styles/fictoan-theme.css";
import "./page-pagination.css";

// OTHER ===============================================================================================================
import { ComponentDocsLayout } from "../ComponentDocsLayout";

const PaginationDocs = () => {
    // Props state
    const [totalItems, setTotalItems] = useState(100);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsToShowEachSide, setItemsToShowEachSide] = useState(1);
    const [kind, setKind] = useState("plain");
    const [showGoToFirstItemButton, setShowGoToFirstItemButton] = useState(true);
    const [showGoToLastItemButton, setShowGoToLastItemButton] = useState(true);
    const [showPreviousButton, setShowPreviousButton] = useState(true);
    const [showNextButton, setShowNextButton] = useState(true);
    const [showGoToInput, setShowGoToInput] = useState(false);
    const [disabled, setDisabled] = useState(false);
    const [hideDisabledButtons, setHideDisabledButtons] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    // Theme configurator
    const PaginationComponent = (varName: string) => {
        return varName.startsWith("pagination-");
    };

    const {
        interactiveElementRef,
        componentProps: themeProps,
        themeConfigurator,
    } = createThemeConfigurator("Pagination", PaginationComponent);

    // Handle page change
    const handlePageChange = (newPage: number) => {
        setCurrentPage(newPage);
        console.log("Page changed to:", newPage);
    };

    // Generate code
    const codeString = useMemo(() => {
        const props = [];
        props.push(`    totalItems={${totalItems}}`);
        props.push(`    currentPage={currentPage}`);
        props.push(`    onPageChange={(page) => setCurrentPage(page)}`);
        if (itemsToShowEachSide !== 1) props.push(`    itemsToShowEachSide={${itemsToShowEachSide}}`);
        if (kind !== "plain") props.push(`    kind="${kind}"`);
        if (!showGoToFirstItemButton) props.push(`    showGoToFirstItemButton={false}`);
        if (!showGoToLastItemButton) props.push(`    showGoToLastItemButton={false}`);
        if (!showPreviousButton) props.push(`    showPreviousButton={false}`);
        if (!showNextButton) props.push(`    showNextButton={false}`);
        if (showGoToInput) props.push(`    showGoToInput`);
        if (disabled) props.push(`    disabled`);
        if (hideDisabledButtons) props.push(`    hideDisabledButtons`);
        if (isLoading) props.push(`    isLoading`);

        return `<Pagination\n${props.join("\n")}\n/>`;
    }, [totalItems, itemsToShowEachSide, kind, showGoToFirstItemButton, showGoToLastItemButton, showPreviousButton, showNextButton, showGoToInput, disabled, hideDisabledButtons, isLoading]);

    return (
        <ComponentDocsLayout pageId="page-pagination">
            {/* INTRO HEADER /////////////////////////////////////////////////////////////////////////////////////// */}
            <Div id="intro-header">
                <Heading2 id="component-name">
                    Pagination
                </Heading2>

                <Text id="component-description" weight="400">
                    A component to help traverse a long list of pages
                </Text>
            </Div>

            {/* INTRO NOTES //////////////////////////////////////////////////////////////////////////////////////// */}
            <Div id="intro-notes">
                <Divider kind="tertiary" verticalMargin="micro" />

                <Text>
                    The <code>kind</code> prop accepts <code>plain</code>, <code>outlined</code>,
                    and <code>filled</code>. Supports customisable number of items shown on either side of the
                    current page, loading and empty states, and optional go-to-page input.
                </Text>
            </Div>

            {/* DEMO COMPONENT ///////////////////////////////////////////////////////////////////////////////////// */}
            <Div id="demo-component">
                <Pagination
                    ref={interactiveElementRef}
                    totalItems={totalItems}
                    currentPage={currentPage}
                    onPageChange={handlePageChange}
                    itemsToShowEachSide={itemsToShowEachSide}
                    kind={kind as "plain" | "outlined" | "filled"}
                    showGoToFirstItemButton={showGoToFirstItemButton}
                    showGoToLastItemButton={showGoToLastItemButton}
                    showPreviousButton={showPreviousButton}
                    showNextButton={showNextButton}
                    showGoToInput={showGoToInput}
                    disabled={disabled}
                    hideDisabledButtons={hideDisabledButtons}
                    isLoading={isLoading}
                    {...themeProps}
                />
            </Div>

            {/* PROPS CONFIG /////////////////////////////////////////////////////////////////////////////////////// */}
            <Div id="props-config">
                <CodeBlock language="tsx" withSyntaxHighlighting showCopyButton>
                    {codeString}
                </CodeBlock>

                <Div className="doc-controls">
                    <Range
                        label="totalItems"
                        value={totalItems}
                        onChange={(value: React.SetStateAction<number>) => setTotalItems(value)}
                        min={1}
                        max={500}
                        step={1}
                        suffix=" items"
                        marginBottom="micro" isFullWidth
                    />

                    <Range
                        label="itemsToShowEachSide"
                        value={itemsToShowEachSide}
                        onChange={(value: React.SetStateAction<number>) => setItemsToShowEachSide(value)}
                        min={0}
                        max={5}
                        step={1}
                        marginBottom="micro" isFullWidth
                    />

                    <RadioTabGroup
                        id="prop-kind"
                        label="kind"
                        options={[
                            { id: "kind-plain", value: "plain", label: "plain" },
                            { id: "kind-outlined", value: "outlined", label: "outlined" },
                            { id: "kind-filled", value: "filled", label: "filled" },
                        ]}
                        value={kind}
                        onChange={(value) => setKind(value)}
                        marginBottom="micro"
                    />

                    <Checkbox
                        id="prop-showGoToFirstItemButton"
                        label="showGoToFirstItemButton"
                        checked={showGoToFirstItemButton}
                        onChange={(checked) => setShowGoToFirstItemButton(checked)}
                        marginBottom="micro"
                    />

                    <Checkbox
                        id="prop-showGoToLastItemButton"
                        label="showGoToLastItemButton"
                        checked={showGoToLastItemButton}
                        onChange={(checked) => setShowGoToLastItemButton(checked)}
                        marginBottom="micro"
                    />

                    <Checkbox
                        id="prop-showPreviousButton"
                        label="showPreviousButton"
                        checked={showPreviousButton}
                        onChange={(checked) => setShowPreviousButton(checked)}
                        marginBottom="micro"
                    />

                    <Checkbox
                        id="prop-showNextButton"
                        label="showNextButton"
                        checked={showNextButton}
                        onChange={(checked) => setShowNextButton(checked)}
                        marginBottom="micro"
                    />

                    <Checkbox
                        id="prop-showGoToInput"
                        label="showGoToInput"
                        checked={showGoToInput}
                        onChange={(checked) => setShowGoToInput(checked)}
                        marginBottom="micro"
                    />

                    <Checkbox
                        id="prop-hideDisabledButtons"
                        label="hideDisabledButtons"
                        checked={hideDisabledButtons}
                        onChange={(checked) => setHideDisabledButtons(checked)}
                        marginBottom="micro"
                    />

                    <Checkbox
                        id="prop-disabled"
                        label="disabled"
                        checked={disabled}
                        onChange={(checked) => setDisabled(checked)}
                        marginBottom="micro"
                    />

                    <Checkbox
                        id="prop-isLoading"
                        label="isLoading"
                        checked={isLoading}
                        onChange={(checked) => setIsLoading(checked)}
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

export default PaginationDocs;
