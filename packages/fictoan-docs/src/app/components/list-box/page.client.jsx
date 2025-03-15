"use client";

// EXTERNAL DEPS =======================================================================================================
import React, { useState } from "react";
import {
    Element,
    Heading1,
    Heading4,
    Divider,
    Portion,
    Row,
    Text,
    Article,
    Card,
    Form,
    Header,
    Select,
    InputField,
    Checkbox,
    CodeBlock,
    ListBox,
} from "fictoan-react";
// INTERNAL DEPS =======================================================================================================

// COMPONENTS ==========================================================================================================

// STYLES ==============================================================================================================
import "./page-list-box.css";

// HOOKS ===============================================================================================================
import { useThemeVariables } from "../../../utils/useThemeVariables";

// UTILS ===============================================================================================================

// DATA ================================================================================================================
import { listBoxProps } from "./config";
import { colourOptions } from "../../colour/colours";


const ListBoxDocs = () => {
    const [label, setLabel] = useState("Select an option");
    const [placeholder, setPlaceholder] = useState("Choose...");
    const [allowMultiSelect, setAllowMultiSelect] = useState(false);
    const [allowCustomEntries, setAllowCustomEntries] = useState(false);
    const [disabled, setDisabled] = useState(false);
    const [selectionLimit, setSelectionLimit] = useState(null);
    // const [selectedBadgeBgColour, setSelectedBadgeBgColour] = useState("");
    // const [selectedBadgeTextColour, setSelectedBadgeTextColour] = useState("");

    const { componentVariables, handleVariableChange, cssVariablesList } = useThemeVariables(listBoxProps.variables);

    return (
        <Article id="page-list-box">
            {/* //////////////////////////////////////////////////////////////////////////////////////////////////// */}
            {/* HEADER */}
            {/* //////////////////////////////////////////////////////////////////////////////////////////////////// */}
            <Row horizontalPadding="huge" marginTop="medium">
                <Portion>
                    <Heading1>List box</Heading1>
                    <Text size="large" marginBottom="small">
                        A customisable dropdown component that supports single and multi-select functionality
                    </Text>
                </Portion>

                <Portion>
                    <Heading4 marginBottom="micro">Characteristics</Heading4>
                    <ul>
                        <li>Supports both single and multi-select modes</li>
                        <li>Searchable options with fuzzy matching</li>
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
                        as="div"
                        padding="small"
                        shape="rounded"
                        bgColor="slate-light80"
                        data-centered-children
                    >
                        <ListBox
                            id="interactive-component"
                            label={label}
                            placeholder={placeholder}
                            allowMultiSelect={allowMultiSelect}
                            allowCustomEntries={allowCustomEntries}
                            selectionLimit={selectionLimit}
                            disabled={disabled}
                            options={[
                                { value : "option1", label : "Option 1" },
                                { value : "option2", label : "Option 2" },
                                { value : "option3", label : "Option 3" },
                                { value : "option4", label : "Option 4", disabled : true },
                            ]}
                        />
                    </Element>
                </Portion>

                {/* CONFIGURATOR /////////////////////////////////////////////////////////////////////////////////// */}
                <Portion desktopSpan="half">
                    <Form spacing="none">
                        <Card padding="micro" shape="rounded">
                            <Header verticallyCentreItems pushItemsToEnds marginBottom="nano">
                                <Text size="large" weight="700" textColor="white">
                                    Configure props
                                </Text>
                            </Header>

                            <Row marginBottom="none">
                                <Portion>
                                    <CodeBlock withSyntaxHighlighting language="jsx" showCopyButton marginBottom="micro">
                                        {[
                                            `// Paste this in your content file`,
                                            `<ListBox`,
                                            `    options={[`,
                                            `       { value: "option-1", label: "Option 1" }`,
                                            `       { value: "option-2", label: "Option 2" }`,
                                            `       { value: "option-3", label: "Option 3" }`,
                                            `       { value: "option-4", label: "Option 4", disabled: true },`,
                                            `    ]}`,
                                            label ? `    label="${label}"` : null,
                                            placeholder ? `    placeholder="${placeholder}"` : null,
                                            allowMultiSelect && `    allowMultiSelect`,
                                            allowCustomEntries && `    allowCustomEntries`,
                                            allowMultiSelect && selectionLimit ? `    selectionLimit="${selectionLimit}"` : null,
                                            // allowMultiSelect && selectedBadgeBgColour ? `    badgeBgColour=${selectedBadgeBgColour}` : null,
                                            // allowMultiSelect && selectedBadgeTextColour ? `    badgeTextColour=${selectedBadgeTextColour}` : null,
                                            disabled && `    disabled`,
                                            `/>`,
                                        ].filter(Boolean).join("\n")}
                                    </CodeBlock>
                                </Portion>

                                {/* LABEL ========================================================================== */}
                                <Portion desktopSpan="half">
                                    <InputField
                                        type="text"
                                        label="Label"
                                        value={label}
                                        onChange={(value) => setLabel(value)}
                                    />
                                </Portion>

                                {/* PLACEHOLDER ==================================================================== */}
                                <Portion desktopSpan="half">
                                    <InputField
                                        type="text"
                                        label="Placeholder"
                                        value={placeholder}
                                        onChange={(value) => setPlaceholder(value)}
                                    />
                                </Portion>

                                {/* MULTI-SELECT =================================================================== */}
                                <Portion desktopSpan="half">
                                    <Checkbox
                                        id="multi-select"
                                        label="Allow multi-select"
                                        checked={allowMultiSelect}
                                        onChange={(checked) => setAllowMultiSelect(checked)}
                                    />
                                </Portion>

                                {allowMultiSelect && (
                                    <Portion desktopSpan="half">
                                        {/* SELECTION LIMIT -------------------------------------------------------- */}
                                        <InputField
                                            type="number"
                                            label="Selection limit"
                                            placeholder="Enter a number"
                                            value={selectionLimit || ""}
                                            onChange={(value) => setSelectionLimit(parseInt(value) || null)}
                                            min="1"  // Prevent negative numbers
                                            step="1" // Only allow whole numbers
                                            marginBottom="micro"
                                        />

                                        {/* CUSTOM ENTRIES --------------------------------------------------------- */}
                                        <Checkbox
                                            id="custom-entries"
                                            label="Allow custom entries"
                                            checked={allowCustomEntries}
                                            onChange={(checked) => setAllowCustomEntries(checked)}
                                        />

                                        {/* BADGE BG COLOUR -------------------------------------------------------- */}
                                        {/* <ListBox */}
                                        {/*     label="Badge BG colour" */}
                                        {/*     options={[{ */}
                                        {/*         label    : "Select a colour", */}
                                        {/*         value    : "select-a-colour", */}
                                        {/*         disabled : true, */}
                                        {/*         selected : true, */}
                                        {/*     }, */}
                                        {/*         ...colourOptions, */}
                                        {/*     ]} */}
                                        {/*     defaultValue={selectedBadgeBgColour || "select-a-colour"} */}
                                        {/*     onChange={(value) => setSelectedBadgeBgColour(value)} */}
                                        {/*     isFullWidth */}
                                        {/*     marginTop="micro" marginBottom="micro" */}
                                        {/* /> */}

                                        {/* BADGE TEXT COLOUR ------------------------------------------------------ */}
                                        {/* <ListBox */}
                                        {/*     label="Badge text colour" */}
                                        {/*     options={[{ */}
                                        {/*         label    : "Select a colour", */}
                                        {/*         value    : "select-a-colour", */}
                                        {/*         disabled : true, */}
                                        {/*         selected : true, */}
                                        {/*     }, */}
                                        {/*         ...colourOptions, */}
                                        {/*     ]} */}
                                        {/*     defaultValue={selectedBadgeTextColour || "select-a-colour"} */}
                                        {/*     onChange={(value) => setSelectedBadgeTextColour(value)} */}
                                        {/*     isFullWidth */}
                                        {/* /> */}
                                    </Portion>
                                )}

                                {/* DISABLED ======================================================================= */}
                                <Portion>
                                    <Divider kind="secondary" horizontalMargin="none" verticalMargin="nano" />

                                    <Checkbox
                                        id="disabled"
                                        label="Disabled"
                                        checked={disabled}
                                        onChange={(checked) => setDisabled(checked)}
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
                            </Row>

                            <Row marginBottom="none">
                                {/* BG COLOUR ====================================================================== */}
                                <Portion desktopSpan="half">
                                    <Select
                                        label="Background colour"
                                        options={[{
                                            label    : "Select a colour",
                                            value    : "select-a-colour",
                                            disabled : true,
                                            selected : true,
                                        }, ...colourOptions]}
                                        defaultValue={listBoxProps.variables["list-box-badge-bg"].defaultValue || "select-a-colour"}
                                        onChange={(value) => handleVariableChange("list-box-badge-bg", value)}
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
                                        defaultValue={listBoxProps.variables["list-box-badge-text"].defaultValue || "select-a-colour"}
                                        onChange={(value) => handleVariableChange("list-box-badge-text", value)}
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

export default ListBoxDocs;
