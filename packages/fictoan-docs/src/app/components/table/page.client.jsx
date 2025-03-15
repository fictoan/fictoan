"use client";

// EXTERNAL DEPS =======================================================================================================
import React, { useState } from "react";

// INTERNAL DEPS =======================================================================================================
import {
    Element,
    Heading1,
    Heading2,
    Heading3,
    Heading4,
    Heading5,
    Heading6,
    Divider,
    Portion,
    Row,
    Text,
    Article,
    Card,
    Form,
    Header,
    RadioTabGroup,
    Checkbox,
    Select,
    Table,
CodeBlock
} from "fictoan-react";

// COMPONENTS ==========================================================================================================

// STYLES ==============================================================================================================
import "./page-table.css";

// HOOKS ===============================================================================================================
import { useThemeVariables } from "../../../utils/useThemeVariables";

// UTILS ===============================================================================================================
import { colourOptions } from "../../colour/colours";

// DATA ================================================================================================================
import { tableProps } from "./config";

const TableDocs = () => {
    const { componentVariables, handleVariableChange, cssVariablesList } = useThemeVariables(tableProps.variables);

    // CUSTOMISE =======================================================================================================
    const [bordersFor, setBordersFor] = useState("none");
    const [isStriped, setIsStriped] = useState(false);
    const [highlightRowOnHover, setHighlightRowOnHover] = useState(false);
    const [selectedPadding, setSelectedPadding] = useState("");
    const [isFullWidth, setIsFullWidth] = useState(false);

    // THEME ===========================================================================================================

    return (
        <Article id="page-component">
            <Row horizontalPadding="huge" marginTop="medium" marginBottom="small">
                <Portion>
                    <Heading1>Table</Heading1>
                    <Text size="large" marginBottom="small">
                        A way to display tabular information
                    </Text>
                </Portion>

                <Portion>
                    <Heading4 marginBottom="micro">Characteristics</Heading4>
                    <ul>
                        <li>The table takes the width of the longest row</li>
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
                        <Table
                            {...(
                                bordersFor !== undefined ? { bordersFor : bordersFor } : {}
                            )}
                            isStriped={isStriped}
                            padding={selectedPadding}
                            highlightRowOnHover={highlightRowOnHover}
                            isFullWidth={isFullWidth}
                        >
                            <thead>
                                <tr>
                                    <td>Header 1</td>
                                    <td>Header 2</td>
                                    <td>Header 3</td>
                                </tr>
                            </thead>

                            <tbody>
                                <tr>
                                    <td>Cell 1</td>
                                    <td>Cell 2</td>
                                    <td>Cell 3</td>
                                </tr>

                                <tr>
                                    <td>Cell 4</td>
                                    <td>Cell 5</td>
                                    <td>Cell 6</td>
                                </tr>

                                <tr>
                                    <td>Cell 7</td>
                                    <td>Cell 8</td>
                                    <td>Cell 9</td>
                                </tr>

                                <tr>
                                    <td>Cell 10</td>
                                    <td>Cell 11</td>
                                    <td>Cell 12</td>
                                </tr>
                            </tbody>
                        </Table>
                    </Element>
                </Portion>

                {/* CONFIGURATOR /////////////////////////////////////////////////////////////////////////////////// */}
                <Portion desktopSpan="half">
                    <Form>
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
                                            `<Table`,
                                            bordersFor ? `    bordersFor="${bordersFor}"` : null,
                                            selectedPadding ? `    padding="${selectedPadding}"` : null,
                                            isStriped ? `    isStriped` : null,
                                            highlightRowOnHover ? `    highlightRowOnHover` : null,
                                            isFullWidth ? `    isFullWidth` : null,
                                            `>`,
                                            `    <thead>`,
                                            `        <tr>`,
                                            `            <td>Header 1</td>`,
                                            `            <td>Header 2</td>`,
                                            `            <td>Header 3</td>`,
                                            `        </tr>`,
                                            `    </thead>`,

                                            `    <tbody>`,
                                            `        <tr>`,
                                            `            <td>Cell 1</td>`,
                                            `            <td>Cell 2</td>`,
                                            `            <td>Cell 3</td>`,
                                            `        </tr>`,
                                            `        ...add similar rows here`,
                                            `    <tbody>`,
                                            `</Table>`,
                                        ].filter(Boolean).join("\n")}
                                    </CodeBlock>
                                </Portion>

                                {/* POSITION ======================================================================= */}
                                <Portion>
                                    <RadioTabGroup
                                        id="borders-for" label="Borders for" name="borders-for"
                                        options={[
                                            { id : "borders-for-opt-0", value : "none", label : "none" },
                                            { id : "borders-for-opt-1", value : "rows", label : "rows" },
                                            { id : "borders-for-opt-2", value : "columns", label : "columns" },
                                            { id : "borders-for-opt-3", value : "both", label : "both" },
                                        ]}
                                        value={bordersFor}
                                        onChange={(value) => setBordersFor(value !== "none" ? value : undefined)}
                                    />

                                    <Divider kind="secondary" horizontalMargin="none" verticalMargin="nano" />
                                </Portion>

                                {/* PADDING ======================================================================== */}
                                <Portion>
                                    <RadioTabGroup
                                        id="padding" name="padding" label="Padding"
                                        options={[
                                            { id : "padding-opt-0", value : "none", label : "none" },
                                            { id : "padding-opt-3", value : "tiny", label : "tiny" },
                                            { id : "padding-opt-4", value : "small", label : "small" },
                                            { id : "padding-opt-5", value : "medium", label : "medium" },
                                            { id : "padding-opt-6", value : "large", label : "large" },
                                            { id : "padding-opt-7", value : "huge", label : "huge" },
                                        ]}
                                        value={selectedPadding}
                                        onChange={(value) => setSelectedPadding(value !== "none" ? value : undefined)}
                                    />

                                    <Divider kind="secondary" horizontalMargin="none" verticalMargin="nano" />
                                </Portion>

                                {/* OVERLAY ======================================================================== */}
                                <Portion>
                                    <Checkbox
                                        id="checkbox-overlay"
                                        value="checkbox-overlay"
                                        name="checkbox-overlay"
                                        label="Striped rows"
                                        checked={isStriped}
                                        onChange={(checked) => setIsStriped(checked)}
                                    />

                                    <Divider kind="secondary" horizontalMargin="none" verticalMargin="nano" />
                                </Portion>

                                {/* DISMISSIBLE ==================================================================== */}
                                <Portion>
                                    <Checkbox
                                        id="checkbox-dismissible"
                                        value="checkbox-dismissible"
                                        name="checkbox-dismissible"
                                        label="Highlight row on hover"
                                        checked={highlightRowOnHover}
                                        onChange={(checked) => setHighlightRowOnHover(checked)}
                                    />

                                    <Divider kind="secondary" horizontalMargin="none" verticalMargin="nano" />
                                </Portion>

                                {/* OVERLAY ======================================================================== */}
                                <Portion>
                                    <Checkbox
                                        id="checkbox-full-width"
                                        value="checkbox-full-width"
                                        name="checkbox-full-width"
                                        label="Make table full width"
                                        checked={isFullWidth}
                                        onChange={(checked) => setIsFullWidth(checked)}
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

                                {/* BG ============================================================================= */}
                                <Portion desktopSpan="half">
                                    <Select
                                        label="Background"
                                        options={[{
                                            label    : "Select a colour",
                                            value    : "select-a-colour",
                                            disabled : true,
                                            selected : true,
                                        }, ...colourOptions]}
                                        defaultValue={componentVariables["table-bg"].defaultValue || "select-a-colour"}
                                        onChange={(value) => handleVariableChange("table-bg", value)}
                                        isFullWidth
                                    />
                                </Portion>

                                {/* BORDER ========================================================================= */}
                                <Portion desktopSpan="half">
                                    <Select
                                        label="Border"
                                        options={[{
                                            label    : "Select a colour",
                                            value    : "select-a-colour",
                                            disabled : true,
                                            selected : true,
                                        }, ...colourOptions]}
                                        defaultValue={componentVariables["table-border"].defaultValue || "select-a-colour"}
                                        onChange={(value) => handleVariableChange("table-border", value)}
                                        isFullWidth
                                    />
                                </Portion>

                                {/* TEXT =========================================================================== */}
                                <Portion desktopSpan="half">
                                    <Select
                                        label="Text"
                                        options={[{
                                            label    : "Select a colour",
                                            value    : "select-a-colour",
                                            disabled : true,
                                            selected : true,
                                        }, ...colourOptions]}
                                        defaultValue={componentVariables["table-text"].defaultValue || "select-a-colour"}
                                        onChange={(value) => handleVariableChange("table-text", value)}
                                        isFullWidth
                                    />
                                </Portion>

                                <Portion desktopSpan="half" />

                                {/* HEADER BG ===================================================================== */}
                                <Portion desktopSpan="half">
                                    <Select
                                        label="Header BG when striped"
                                        options={[{
                                            label    : "Select a colour",
                                            value    : "select-a-colour",
                                            disabled : true,
                                            selected : true,
                                        }, ...colourOptions]}
                                        defaultValue={componentVariables["table-striped-header-bg"].defaultValue || "select-a-colour"}
                                        onChange={(value) => handleVariableChange("table-striped-header-bg", value)}
                                        isFullWidth
                                    />
                                </Portion>

                                {/* CELL BG ======================================================================== */}
                                <Portion desktopSpan="half">
                                    <Select
                                        label="Striped cell BG"
                                        options={[{
                                            label    : "Select a colour",
                                            value    : "select-a-colour",
                                            disabled : true,
                                            selected : true,
                                        }, ...colourOptions]}
                                        defaultValue={componentVariables["table-striped-cell-bg"].defaultValue || "select-a-colour"}
                                        onChange={(value) => handleVariableChange("table-striped-cell-bg", value)}
                                        isFullWidth
                                    />
                                </Portion>

                                {/* HIGHLIGHT BG =================================================================== */}
                                <Portion desktopSpan="half">
                                    <Select
                                        label="Row BG on hover"
                                        options={[{
                                            label    : "Select a colour",
                                            value    : "select-a-colour",
                                            disabled : true,
                                            selected : true,
                                        }, ...colourOptions]}
                                        defaultValue={componentVariables["table-highlight-bg"].defaultValue || "select-a-colour"}
                                        onChange={(value) => handleVariableChange("table-highlight-bg", value)}
                                        isFullWidth
                                    />
                                </Portion>

                                {/* HIGHLIGHT TEXT ================================================================= */}
                                <Portion desktopSpan="half">
                                    <Select
                                        label="Text hover colour"
                                        options={[{
                                            label    : "Select a colour",
                                            value    : "select-a-colour",
                                            disabled : true,
                                            selected : true,
                                        }, ...colourOptions]}
                                        defaultValue={componentVariables["table-highlight-text"].defaultValue || "select-a-colour"}
                                        onChange={(value) => handleVariableChange("table-highlight-text", value)}
                                        isFullWidth
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

export default TableDocs;
