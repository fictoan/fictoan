"use client";

// REACT CORE ==========================================================================================================
import React, { useState, useMemo } from "react";

// UI ==================================================================================================================
import {
    Div,
    Heading2,
    Text,
    Divider,
    Table,
    CodeBlock,
    InputField,
    RadioTabGroup,
    Checkbox,
} from "fictoan-react";

// UTILS ===============================================================================================================
import { createThemeConfigurator } from "$utils/themeConfigurator";

// STYLES ==============================================================================================================
import "../../../styles/fictoan-theme.css";
import "./page-table.css";

// OTHER ===============================================================================================================
import { ComponentDocsLayout } from "../ComponentDocsLayout";

const TableDocs = () => {
    // Props state
    const [bordersFor, setBordersFor] = useState("");
    const [alignText, setAlignText] = useState("");
    const [padding, setPadding] = useState("small");
    const [isStriped, setIsStriped] = useState(false);
    const [highlightRowOnHover, setHighlightRowOnHover] = useState(false);
    const [isFullWidth, setIsFullWidth] = useState(false);
    const [caption, setCaption] = useState("");

    // Theme configurator
    const TableComponent = (varName: string) => {
        return varName.startsWith("table-");
    };

    const {
        interactiveElementRef,
        componentProps: themeProps,
        themeConfigurator,
    } = createThemeConfigurator<HTMLTableElement>("Table", TableComponent);

    // Generate code
    const codeString = useMemo(() => {
        const props = [];
        if (bordersFor) props.push(`bordersFor="${bordersFor}"`);
        if (alignText) props.push(`alignText="${alignText}"`);
        if (padding) props.push(`padding="${padding}"`);
        if (isStriped) props.push(`isStriped`);
        if (highlightRowOnHover) props.push(`highlightRowOnHover`);
        if (isFullWidth) props.push(`isFullWidth`);
        if (caption) props.push(`caption="${caption}"`);

        const propsString = props.length > 0 ? `\n    ${props.join("\n    ")}\n` : "";

        return `import { Table } from "fictoan-react";

<Table${propsString}>
    <thead>
        <tr>
            <th>Header 1</th>
            <th>Header 2</th>
            <th>Header 3</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Cell 1</td>
            <td>Cell 2</td>
            <td>Cell 3</td>
        </tr>
        {/* More rows... */}
    </tbody>
</Table>`;
    }, [bordersFor, alignText, padding, isStriped, highlightRowOnHover, isFullWidth, caption]);

    return (
        <ComponentDocsLayout pageId="page-table">
            {/* INTRO HEADER /////////////////////////////////////////////////////////////////////////////////////// */}
            <Div id="intro-header">
                <Heading2 id="component-name">
                    Table
                </Heading2>

                <Text id="component-description" weight="400">
                    A way to display tabular information
                </Text>
            </Div>

            {/* INTRO NOTES //////////////////////////////////////////////////////////////////////////////////////// */}
            <Div id="intro-notes">
                <Divider kind="tertiary" verticalMargin="micro" />

                <Text>
                    Uses standard <code>&lt;thead&gt;</code>, <code>&lt;tbody&gt;</code>, <code>&lt;tr&gt;</code>, <code>&lt;th&gt;</code>, and <code>&lt;td&gt;</code> elements.
                </Text>

                <Text>
                    Width adapts to content. Use <code>isFullWidth</code> to fill the container.
                </Text>

                <Text>
                    Add <code>caption</code> for accessibility.
                </Text>
            </Div>

            {/* DEMO COMPONENT ///////////////////////////////////////////////////////////////////////////////////// */}
            <Div id="demo-component">
                <Table
                    ref={interactiveElementRef}
                    bordersFor={bordersFor as any || undefined}
                    alignText={alignText as any || undefined}
                    padding={padding as any || undefined}
                    isStriped={isStriped}
                    highlightRowOnHover={highlightRowOnHover}
                    isFullWidth={isFullWidth}
                    caption={caption || undefined}
                    {...themeProps}
                >
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Role</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Alice</td>
                            <td>Developer</td>
                            <td>Active</td>
                        </tr>
                        <tr>
                            <td>Bob</td>
                            <td>Designer</td>
                            <td>Away</td>
                        </tr>
                        <tr>
                            <td>Charlie</td>
                            <td>Manager</td>
                            <td>Active</td>
                        </tr>
                        <tr>
                            <td>Diana</td>
                            <td>Developer</td>
                            <td>Busy</td>
                        </tr>
                    </tbody>
                </Table>
            </Div>

            {/* PROPS CONFIG /////////////////////////////////////////////////////////////////////////////////////// */}
            <Div id="props-config">
                <CodeBlock language="tsx" withSyntaxHighlighting showCopyButton>
                    {codeString}
                </CodeBlock>

                <Div className="doc-controls">
                    <RadioTabGroup
                        id="prop-bordersFor"
                        label="bordersFor"
                        options={[
                            { id: "borders-none", value: "", label: "None" },
                            { id: "borders-rows", value: "rows", label: "rows" },
                            { id: "borders-columns", value: "columns", label: "columns" },
                            { id: "borders-both", value: "both", label: "both" },
                        ]}
                        value={bordersFor}
                        onChange={(val) => setBordersFor(val)}
                        helpText="Where to show borders."
                        marginBottom="micro"
                    />

                    <RadioTabGroup
                        id="prop-alignText"
                        label="alignText"
                        options={[
                            { id: "align-default", value: "", label: "Default" },
                            { id: "align-left", value: "left", label: "left" },
                            { id: "align-centre", value: "centre", label: "centre" },
                            { id: "align-right", value: "right", label: "right" },
                        ]}
                        value={alignText}
                        onChange={(val) => setAlignText(val)}
                        helpText="Text alignment in cells."
                        marginBottom="micro"
                    />

                    <RadioTabGroup
                        id="prop-padding"
                        label="padding"
                        options={[
                            { id: "padding-none", value: "", label: "None" },
                            { id: "padding-tiny", value: "tiny", label: "tiny" },
                            { id: "padding-small", value: "small", label: "small" },
                            { id: "padding-medium", value: "medium", label: "medium" },
                            { id: "padding-large", value: "large", label: "large" },
                            { id: "padding-huge", value: "huge", label: "huge" },
                        ]}
                        value={padding}
                        onChange={(val) => setPadding(val)}
                        helpText="Cell padding."
                        marginBottom="micro"
                    />

                    <Checkbox
                        id="prop-isStriped"
                        label="isStriped"
                        checked={isStriped}
                        onChange={() => setIsStriped(!isStriped)}
                        helpText="Alternating row background colors."
                        marginBottom="micro"
                    />

                    <Checkbox
                        id="prop-highlightRowOnHover"
                        label="highlightRowOnHover"
                        checked={highlightRowOnHover}
                        onChange={() => setHighlightRowOnHover(!highlightRowOnHover)}
                        helpText="Highlight rows on mouse hover."
                        marginBottom="micro"
                    />

                    <Checkbox
                        id="prop-isFullWidth"
                        label="isFullWidth"
                        checked={isFullWidth}
                        onChange={() => setIsFullWidth(!isFullWidth)}
                        helpText="Makes the table fill its container width."
                        marginBottom="micro"
                    />

                    <InputField
                        label="caption"
                        value={caption}
                        onChange={(val) => setCaption(val)}
                        helpText="Accessible caption for the table."
                        marginBottom="micro" isFullWidth
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

export default TableDocs;
