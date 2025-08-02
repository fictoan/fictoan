"use client";

// REACT CORE ==========================================================================================================
import React, { useState } from "react";

// UI ==================================================================================================================
import { Element, Heading1, Heading4, Divider, Portion, Row, Text, Article, Card, Form, Header, RadioTabGroup, Checkbox, CodeBlock, InputField, Pagination, Select, Range } from "fictoan-react";

// UTILS ===============================================================================================================
import { useThemeVariables } from "../../../utils/useThemeVariables";

// STYLES ==============================================================================================================
import "./page-pagination.css";

// OTHER ===============================================================================================================
import { colourOptions } from "../../colour/colours";
import { paginationProps } from "./config";

const PaginationDocs = () => {
    const { componentVariables, handleVariableChange, cssVariablesList } = useThemeVariables(paginationProps.variables);

    const [totalItems, setTotalItems] = useState(100);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsToShowEachSide, setItemsToShowEachSide] = useState(1);
    const [kind, setKind] = useState("plain");
    const [loadingText, setLoadingText] = useState("Loading...");
    const [emptyText, setEmptyText] = useState("No items to display");

    // Feature flags
    const [isLoading, setIsLoading] = useState(false);
    const [disabled, setDisabled] = useState(false);
    const [hideDisabledButtons, setHideDisabledButtons] = useState(false);
    const [showGoToFirstItemButton, setShowGoToFirstItemButton] = useState(true);
    const [showGoToLastItemButton, setShowGoToLastItemButton] = useState(true);
    const [showPreviousButton, setShowPreviousButton] = useState(true);
    const [showNextButton, setShowNextButton] = useState(true);
    const [showGoToInput, setShowGoToInput] = useState(false);

    return (
        <Article id="page-pagination">
            <Row horizontalPadding="huge" marginTop="medium">
                <Portion>
                    <Heading1>Pagination</Heading1>
                    <Text size="large" marginBottom="small">
                        A component to help traverse a long list of pages
                    </Text>
                </Portion>

                <Portion>
                    
                    <ul>
                        <li>
                            The <code>kind</code> prop accepts <code>plain</code>, <code>outlined</code>,
                            and <code>filled</code>
                        </li>
                        <li>Supports customisable number of items shown on either side of current page</li>
                        <li>Provides loading and empty states</li>
                        <li>Features optional go-to-page input and boundary navigation</li>
                    </ul>
                </Portion>
            </Row>

            <Divider kind="primary" horizontalMargin="huge" verticalMargin="small" />

            <Row horizontalPadding="small" className="rendered-component">
                {/* DEMO COMPONENT */}
                <Portion id="component-wrapper">
                    <Element
                        as="div"
                        padding="small"
                        shape="rounded"
                        bgColour="slate-light80"
                        data-centered-children
                    >
                        <Pagination
                            totalItems={totalItems}
                            currentPage={currentPage}
                            onPageChange={setCurrentPage}
                            itemsToShowEachSide={itemsToShowEachSide}
                            kind={kind}
                            isLoading={isLoading}
                            disabled={disabled}
                            hideDisabledButtons={hideDisabledButtons}
                            showGoToFirstItemButton={showGoToFirstItemButton}
                            showGoToLastItemButton={showGoToLastItemButton}
                            showPreviousButton={showPreviousButton}
                            showNextButton={showNextButton}
                            showGoToInput={showGoToInput}
                            loadingText={loadingText}
                            emptyText={emptyText}
                        />
                    </Element>
                </Portion>

                {/* CONFIGURATOR */}
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
                                            `<Pagination`,
                                            `    totalItems={${totalItems}}`,
                                            `    currentPage={${currentPage}}`,
                                            `    itemsToShowEachSide={${itemsToShowEachSide}}`,
                                            `    kind="${kind}"`,
                                            loadingText && `    loadingText="${loadingText}"`,
                                            emptyText && `    emptyText="${emptyText}"`,
                                            isLoading && "    isLoading",
                                            disabled && "    disabled",
                                            hideDisabledButtons && "    hideDisabledButtons",
                                            showGoToFirstItemButton && "    showGoToFirstItemButton",
                                            showGoToLastItemButton && "    showGoToLastItemButton",
                                            showPreviousButton && "    showPreviousButton",
                                            showNextButton && "    showNextButton",
                                            showGoToInput && "    showGoToInput",
                                            `    onPageChange={(page) => setCurrentPage(page)}`,
                                            `/>`,
                                        ].filter(Boolean).join("\n")}
                                    </CodeBlock>
                                </Portion>

                                {/* Numeric inputs */}
                                <Portion desktopSpan="half">
                                    <InputField
                                        type="number"
                                        label="Total items"
                                        value={totalItems}
                                        onChange={(value) => setTotalItems(parseInt(value))}
                                    />
                                </Portion>

                                <Portion desktopSpan="half">
                                    <InputField
                                        type="number"
                                        label="Items to show each side"
                                        value={itemsToShowEachSide}
                                        onChange={(value) => setItemsToShowEachSide(parseInt(value))}
                                    />
                                </Portion>

                                {/* Text inputs */}
                                <Portion desktopSpan="half">
                                    <InputField
                                        label="Loading text"
                                        value={loadingText}
                                        onChange={(value) => setLoadingText(value)}
                                    />
                                </Portion>

                                <Portion desktopSpan="half">
                                    <InputField
                                        label="Empty text"
                                        value={emptyText}
                                        onChange={(value) => setEmptyText(value)}
                                    />
                                </Portion>


                                {/* Radio options for kind */}
                                <Portion>
                                    <RadioTabGroup
                                        id="kind"
                                        label="Kind"
                                        name="kind"
                                        options={[
                                            { id : "kind-plain", value : "plain", label : "plain" },
                                            { id : "kind-outlined", value : "outlined", label : "outlined" },
                                            { id : "kind-filled", value : "filled", label : "filled" },
                                        ]}
                                        value={kind}
                                        onChange={(value) => setKind(value)}
                                    />
                                    <Divider kind="secondary" horizontalMargin="none" marginTop="micro" />
                                </Portion>


                                {/* Feature flags */}
                                <Portion>
                                    <Text weight="700" marginBottom="nano">Feature flags</Text>
                                </Portion>

                                {/* Show checkboxes based on properties from config */}
                                <Portion desktopSpan="half">
                                    <Checkbox
                                        id="disabled"
                                        value="disabled"
                                        name="disabled"
                                        label="Disabled"
                                        checked={disabled}
                                        onChange={(checked) => setDisabled(checked)}
                                    />
                                </Portion>


                                <Portion desktopSpan="half">
                                    <Checkbox
                                        id="hide-disabled-buttons"
                                        value="hide-disabled-buttons"
                                        name="hide-disabled-buttons"
                                        label="Hide disabled buttons"
                                        checked={hideDisabledButtons}
                                        onChange={(checked) => setHideDisabledButtons(checked)}
                                    />
                                </Portion>


                                <Portion desktopSpan="half">
                                    <Checkbox
                                        id="show-go-to-first-button"
                                        value="show-go-to-first-button"
                                        name="show-go-to-first-button"
                                        label="Show go to first button"
                                        checked={showGoToFirstItemButton}
                                        onChange={(checked) => setShowGoToFirstItemButton(checked)}
                                    />
                                </Portion>


                                <Portion desktopSpan="half">
                                    <Checkbox
                                        id="show-go-to-last-button"
                                        value="show-go-to-last-button"
                                        name="show-go-to-last-button"
                                        label="Show go to last button"
                                        checked={showGoToLastItemButton}
                                        onChange={(checked) => setShowGoToLastItemButton(checked)}
                                    />
                                </Portion>


                                <Portion desktopSpan="half">
                                    <Checkbox
                                        id="show-previous-button"
                                        value="show-previous-button"
                                        name="show-previous-button"
                                        label="Show previous button"
                                        checked={showPreviousButton}
                                        onChange={(checked) => setShowPreviousButton(checked)}
                                    />
                                </Portion>

                                <Portion desktopSpan="half">
                                    <Checkbox
                                        id="show-next-button"
                                        value="show-next-button"
                                        name="show-next-button"
                                        label="Show next button"
                                        checked={showNextButton}
                                        onChange={(checked) => setShowNextButton(checked)}
                                    />
                                </Portion>

                                <Portion desktopSpan="half">
                                    <Checkbox
                                        id="show-go-to-input"
                                        value="show-go-to-input"
                                        name="show-go-to-input"
                                        label="Show “Go to page” input"
                                        checked={showGoToInput}
                                        onChange={(checked) => setShowGoToInput(checked)}
                                    />
                                </Portion>

                                <Portion desktopSpan="half">
                                    <Checkbox
                                        id="is-loading"
                                        value="is-loading"
                                        name="is-loading"
                                        label="Is loading"
                                        checked={isLoading}
                                        onChange={(checked) => setIsLoading(checked)}
                                    />
                                </Portion>
                            </Row>
                        </Card>
                    </Form>
                </Portion>

                {/* GLOBAL THEME */}
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
                            </Row>

                            {/* DIMENSIONS */}
                            <Row marginBottom="none">
                                <Portion>
                                    <Text weight="700" marginBottom="nano">
                                        Dimensions
                                    </Text>
                                </Portion>

                                <Portion desktopSpan="half">
                                    <Range
                                        label="Item height"
                                        value={componentVariables["pagination-item-height"].value}
                                        onChange={(value) => handleVariableChange("pagination-item-height", value)}
                                        min={20} max={64} step={1}
                                        suffix={componentVariables["pagination-item-height"].unit}
                                    />
                                </Portion>

                                <Portion desktopSpan="half">
                                    <Range
                                        label="Min width"
                                        value={componentVariables["pagination-item-min-width"].value}
                                        onChange={(value) => handleVariableChange("pagination-item-min-width", value)}
                                        min={20} max={64} step={1}
                                        suffix={componentVariables["pagination-item-min-width"].unit}
                                    />
                                </Portion>

                                <Portion desktopSpan="half">
                                    <Range
                                        label="Border width"
                                        value={componentVariables["pagination-item-border-width"].value}
                                        onChange={(value) => handleVariableChange("pagination-item-border-width", value)}
                                        min={0} max={4} step={1}
                                        suffix="px"
                                    />
                                </Portion>

                                <Portion desktopSpan="half">
                                    <Range
                                        label="Border radius"
                                        value={componentVariables["pagination-item-border-radius"].value}
                                        onChange={(value) => handleVariableChange("pagination-item-border-radius", value)}
                                        min={0} max={24} step={1}
                                        suffix="px"
                                    />
                                </Portion>
                            </Row>

                            <Divider kind="secondary" verticalMargin="micro" />

                            {/* PLAIN STYLE */}
                            <Row marginBottom="none">
                                <Portion>
                                    <Text weight="700" marginBottom="nano">
                                        Plain style
                                    </Text>
                                </Portion>

                                {/* Default state */}
                                <Portion desktopSpan="half">
                                    <Select
                                        label="Default background"
                                        isFullWidth
                                        options={[{
                                            label    : "Select a colour",
                                            value    : "select-a-colour",
                                            disabled : true,
                                            selected : true,
                                        }, ...colourOptions]}
                                        defaultValue={paginationProps.variables["pagination-item-bg-default"].defaultValue || "select-a-colour"}
                                        onChange={(value) => handleVariableChange("pagination-item-bg-default", value)}
                                    />
                                </Portion>

                                <Portion desktopSpan="half">
                                    <Select
                                        label="Default text"
                                        isFullWidth
                                        options={[{
                                            label    : "Select a colour",
                                            value    : "select-a-colour",
                                            disabled : true,
                                            selected : true,
                                        }, ...colourOptions]}
                                        defaultValue={paginationProps.variables["pagination-item-text-default"].defaultValue || "select-a-colour"}
                                        onChange={(value) => handleVariableChange("pagination-item-text-default", value)}
                                    />
                                </Portion>

                                {/* Selected state */}
                                <Portion desktopSpan="half">
                                    <Select
                                        label="Selected background"
                                        isFullWidth
                                        options={[{
                                            label    : "Select a colour",
                                            value    : "select-a-colour",
                                            disabled : true,
                                            selected : true,
                                        }, ...colourOptions]}
                                        defaultValue={paginationProps.variables["pagination-item-bg-selected"].defaultValue || "select-a-colour"}
                                        onChange={(value) => handleVariableChange("pagination-item-bg-selected", value)}
                                    />
                                </Portion>

                                <Portion desktopSpan="half">
                                    <Select
                                        label="Selected text"
                                        isFullWidth
                                        options={[{
                                            label    : "Select a colour",
                                            value    : "select-a-colour",
                                            disabled : true,
                                            selected : true,
                                        }, ...colourOptions]}
                                        defaultValue={paginationProps.variables["pagination-item-text-selected"].defaultValue || "select-a-colour"}
                                        onChange={(value) => handleVariableChange("pagination-item-text-selected", value)}
                                    />
                                </Portion>

                                <Portion desktopSpan="half">
                                    <Select
                                        label="Arrow stroke"
                                        isFullWidth
                                        options={[{
                                            label    : "Select a colour",
                                            value    : "select-a-colour",
                                            disabled : true,
                                            selected : true,
                                        }, ...colourOptions]}
                                        defaultValue={paginationProps.variables["pagination-arrows-stroke"].defaultValue || "select-a-colour"}
                                        onChange={(value) => handleVariableChange("pagination-arrows-stroke", value)}
                                    />
                                </Portion>
                            </Row>

                            <Divider kind="secondary" verticalMargin="micro" />

                            {/* FILLED STYLE */}
                            <Row marginBottom="none">
                                <Portion>
                                    <Text weight="700" marginBottom="nano">
                                        Filled style
                                    </Text>
                                </Portion>

                                {/* Default state */}
                                <Portion desktopSpan="half">
                                    <Select
                                        label="Background"
                                        isFullWidth
                                        options={[{
                                            label    : "Select a colour",
                                            value    : "select-a-colour",
                                            disabled : true,
                                            selected : true,
                                        }, ...colourOptions]}
                                        defaultValue={paginationProps.variables["pagination-item-filled-bg-default"].defaultValue || "select-a-colour"}
                                        onChange={(value) => handleVariableChange("pagination-item-filled-bg-default", value)}
                                    />
                                </Portion>

                                <Portion desktopSpan="half">
                                    <Select
                                        label="Text"
                                        isFullWidth
                                        options={[{
                                            label    : "Select a colour",
                                            value    : "select-a-colour",
                                            disabled : true,
                                            selected : true,
                                        }, ...colourOptions]}
                                        defaultValue={paginationProps.variables["pagination-item-filled-text-default"].defaultValue || "select-a-colour"}
                                        onChange={(value) => handleVariableChange("pagination-item-filled-text-default", value)}
                                    />
                                </Portion>

                                {/* Selected state */}
                                <Portion desktopSpan="half">
                                    <Select
                                        label="Selected background"
                                        isFullWidth
                                        options={[{
                                            label    : "Select a colour",
                                            value    : "select-a-colour",
                                            disabled : true,
                                            selected : true,
                                        }, ...colourOptions]}
                                        defaultValue={paginationProps.variables["pagination-item-filled-bg-selected"].defaultValue || "select-a-colour"}
                                        onChange={(value) => handleVariableChange("pagination-item-filled-bg-selected", value)}
                                    />
                                </Portion>

                                <Portion desktopSpan="half">
                                    <Select
                                        label="Selected text"
                                        isFullWidth
                                        options={[{
                                            label    : "Select a colour",
                                            value    : "select-a-colour",
                                            disabled : true,
                                            selected : true,
                                        }, ...colourOptions]}
                                        defaultValue={paginationProps.variables["pagination-item-filled-text-selected"].defaultValue || "select-a-colour"}
                                        onChange={(value) => handleVariableChange("pagination-item-filled-text-selected", value)}
                                    />
                                </Portion>
                            </Row>

                            <Divider kind="secondary" verticalMargin="micro" />

                            {/* DISABLED STATE */}
                            <Row marginBottom="none">
                                <Portion>
                                    <Text weight="700" marginBottom="nano">
                                        Disabled state
                                    </Text>
                                </Portion>

                                <Portion desktopSpan="half">
                                    <Select
                                        label="Background"
                                        isFullWidth
                                        options={[{
                                            label    : "Select a colour",
                                            value    : "select-a-colour",
                                            disabled : true,
                                            selected : true,
                                        }, ...colourOptions]}
                                        defaultValue={paginationProps.variables["pagination-item-bg-disabled"].defaultValue || "select-a-colour"}
                                        onChange={(value) => handleVariableChange("pagination-item-bg-disabled", value)}
                                    />
                                </Portion>

                                <Portion desktopSpan="half">
                                    <Select
                                        label="Text"
                                        isFullWidth
                                        options={[{
                                            label    : "Select a colour",
                                            value    : "select-a-colour",
                                            disabled : true,
                                            selected : true,
                                        }, ...colourOptions]}
                                        defaultValue={paginationProps.variables["pagination-item-text-disabled"].defaultValue || "select-a-colour"}
                                        onChange={(value) => handleVariableChange("pagination-item-text-disabled", value)}
                                    />
                                </Portion>

                                <Portion desktopSpan="half">
                                    <Select
                                        label="Arrow stroke"
                                        isFullWidth
                                        options={[{
                                            label    : "Select a colour",
                                            value    : "select-a-colour",
                                            disabled : true,
                                            selected : true,
                                        }, ...colourOptions]}
                                        defaultValue={paginationProps.variables["pagination-arrows-stroke-disabled"].defaultValue || "select-a-colour"}
                                        onChange={(value) => handleVariableChange("pagination-arrows-stroke-disabled", value)}
                                    />
                                </Portion>
                            </Row>

                            <Divider kind="secondary" verticalMargin="micro" />

                            {/* INFO TEXT */}
                            <Row marginBottom="none">
                                <Portion>
                                    <Text weight="700" marginBottom="nano">
                                        Info text
                                    </Text>
                                </Portion>

                                <Portion desktopSpan="half">
                                    <Select
                                        label="Text colour"
                                        isFullWidth
                                        options={[{
                                            label    : "Select a colour",
                                            value    : "select-a-colour",
                                            disabled : true,
                                            selected : true,
                                        }, ...colourOptions]}
                                        defaultValue={paginationProps.variables["pagination-info-text"].defaultValue || "select-a-colour"}
                                        onChange={(value) => handleVariableChange("pagination-info-text", value)}
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

export default PaginationDocs;
