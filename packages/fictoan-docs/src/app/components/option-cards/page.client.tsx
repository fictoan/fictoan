"use client";

// EXTERNAL DEPS =======================================================================================================
import React, { useState } from "react";

// INTERNAL DEPS =======================================================================================================
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
    Checkbox,
    Select,
    Range,
    CodeBlock,
    OptionCard,
    OptionCardsGroup,
    RadioTabGroup
} from "fictoan-react";

// STYLES ==============================================================================================================
import "./page-option-cards.css";

// HOOKS ===============================================================================================================
import { useThemeVariables } from "../../../utils/useThemeVariables";

// UTILS ===============================================================================================================
import { colourOptions } from "../../colour/colours";

// DATA ================================================================================================================
import { optionCardProps } from "./config";

const OptionCardsDocs = () => {
    const { componentVariables, handleVariableChange, cssVariablesList } = useThemeVariables(optionCardProps.variables);

    // CUSTOMISE =======================================================================================================
    const [allowMultipleSelections, setAllowMultipleSelections] = useState(false);
    const [showTickIcon, setShowTickIcon] = useState(false);
    const [isDisabled, setIsDisabled] = useState(false);
    const [selectedIds, setSelectedIds] = useState(new Set());
    const [selectedTickPosition, setSelectedTickPosition] = useState("top-right");

    // Sample cards for demonstration
    const sampleCards = [
        { id : "card-1", content : "Option 1" },
        { id : "card-2", content : "Option 2" },
        { id : "card-3", content : "Option 3" },
    ];
    
    // Handle selection change
    const handleSelectionChange = (newSelectedIds) => {
        setSelectedIds(newSelectedIds);
        console.log("Selected IDs:", Array.from(newSelectedIds));
    };

    return (
        <Article id="page-component">
            <Row horizontalPadding="huge" marginTop="medium" marginBottom="small">
                <Portion>
                    <Heading1>Option cards</Heading1>
                    <Text size="large" marginBottom="small">
                        A selectable card component that can be used individually or in groups with single or multiple
                        selection modes.
                    </Text>
                </Portion>

                <Portion>
                    <Heading4 marginBottom="micro">Characteristics</Heading4>
                    <ul>
                        <li>Supports single and multiple selections</li>
                        <li>Optional tick icon indicator</li>
                        <li>Cards accept any React node as children</li>
                    </ul>
                </Portion>
            </Row>

            <Divider kind="primary" horizontalMargin="huge" verticalMargin="small" />

            {/* CONFIGURATOR /////////////////////////////////////////////////////////////////////////////////////// */}
            <Row horizontalPadding="small" className="rendered-component">
                {/* DEMO COMPONENT ///////////////////////////////////////////////////////////////////////////////// */}
                <Portion id="component-wrapper">
                    <Element
                        as="div" padding="small" shape="rounded" bgColour="slate-light80"
                        data-centered-children
                    >
                        <OptionCardsGroup
                            allowMultipleSelections={allowMultipleSelections}
                            showTickIcon={showTickIcon}
                            tickPosition={selectedTickPosition}
                            onSelectionChange={handleSelectionChange}
                        >
                            <Row marginBottom="none">
                                {sampleCards.map((card) => (
                                    <Portion desktopSpan="one-third" key={card.id}>
                                        <OptionCard
                                            id={card.id}
                                            disabled={isDisabled}
                                            padding="small"
                                        >
                                            <Text align="centre">{card.content}</Text>
                                        </OptionCard>
                                    </Portion>
                                ))}
                            </Row>
                        </OptionCardsGroup>
                    </Element>
                </Portion>

                {/* CONFIGURATOR */}
                <Portion desktopSpan="half">
                    <Form>
                        <Card padding="micro" shape="rounded">
                            <Header verticallyCentreItems pushItemsToEnds>
                                <Text size="large" weight="700" textColour="white" marginBottom="nano">
                                    Configure props
                                </Text>
                            </Header>

                            <Row marginBottom="none">
                                <Portion>
                                    <CodeBlock withSyntaxHighlighting language="jsx" showCopyButton marginBottom="micro">
                                        {[
                                            `// Paste this in your content file`,
                                            `const [selectedIds, setSelectedIds] = useState(new Set());`,
                                            ``,
                                            `const handleSelectionChange = (newSelectedIds) => {`,
                                            `    setSelectedIds(newSelectedIds);`,
                                            `    // Do something with selected IDs`,
                                            `};`,
                                            ` `,
                                            `<OptionCardsGroup`,
                                            allowMultipleSelections ? `    allowMultipleSelections` : null,
                                            showTickIcon ? `    showTickIcon` : null,
                                            selectedTickPosition !== "top-right" ? `    tickPosition="${selectedTickPosition}"` : null,
                                            `    onSelectionChange={handleSelectionChange}`,
                                            `>`,
                                            `    <OptionCard`,
                                            `        id="card1"`,
                                            isDisabled ? `        disabled` : null,
                                            `    >`,
                                            `        Option 1`,
                                            `    </OptionCard>`,
                                            ` `,
                                            `    <OptionCard`,
                                            `        id="card2"`,
                                            isDisabled ? `        disabled` : null,
                                            `    >`,
                                            `        Option 2`,
                                            `    </OptionCard>`,
                                            ` `,
                                            `    <OptionCard`,
                                            `        id="card3"`,
                                            isDisabled ? `        disabled` : null,
                                            `    >`,
                                            `        Option 3`,
                                            `    </OptionCard>`,
                                            `</OptionCardsGroup>`,
                                        ].filter(Boolean).join("\n")}
                                    </CodeBlock>
                                </Portion>

                                {/* MULTIPLE SELECTIONS */}
                                <Portion>
                                    <Checkbox
                                        id="checkbox-multiple"
                                        value="checkbox-multiple"
                                        name="checkbox-multiple"
                                        label="Allow multiple selections"
                                        checked={allowMultipleSelections}
                                        onChange={(checked) => setAllowMultipleSelections(checked)}
                                    />

                                    <Divider kind="secondary" horizontalMargin="none" verticalMargin="nano" />
                                </Portion>

                                {/* SHOW TICK ICON */}
                                <Portion>
                                    <Checkbox
                                        id="checkbox-tick"
                                        value="checkbox-tick"
                                        name="checkbox-tick"
                                        label="Show tick icon"
                                        checked={showTickIcon}
                                        onChange={(checked) => setShowTickIcon(checked)}
                                    />

                                    <Divider kind="secondary" horizontalMargin="none" verticalMargin="nano" />
                                </Portion>

                                {/* DISABLED STATE */}
                                <Portion>
                                    <Checkbox
                                        id="checkbox-disabled"
                                        value="checkbox-disabled"
                                        name="checkbox-disabled"
                                        label="Disabled"
                                        checked={isDisabled}
                                        onChange={(checked) => setIsDisabled(checked)}
                                    />
                                    
                                    <Divider kind="secondary" horizontalMargin="none" verticalMargin="nano" />
                                </Portion>

                                {/* TICK POSITION */}
                                <Portion>
                                    <RadioTabGroup
                                        id="tick-position"
                                        label="Tick position"
                                        name="tick-position"
                                        options={[
                                            { id: "tick-pos-1", value: "top-left", label: "top-left" },
                                            { id: "tick-pos-2", value: "top-right", label: "top-right" },
                                            { id: "tick-pos-3", value: "bottom-left", label: "bottom-left" },
                                            { id: "tick-pos-4", value: "bottom-right", label: "bottom-right" },
                                            { id: "tick-pos-5", value: "center", label: "center" },
                                        ]}
                                        value={selectedTickPosition}
                                        onChange={(value) => setSelectedTickPosition(value)}
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

                                {/* HOVER STATES */}
                                <Portion desktopSpan="half">
                                    <Select
                                        label="Hover background"
                                        options={[{
                                            label    : "Select a colour",
                                            value    : "select-a-colour",
                                            disabled : true,
                                            selected : true,
                                        },
                                            ...colourOptions]}
                                        defaultValue={componentVariables["option-card-bg-hover"].defaultValue || "select-a-colour"}
                                        onChange={(value) => handleVariableChange("option-card-bg-hover", value)}
                                        isFullWidth
                                    />
                                </Portion>

                                <Portion desktopSpan="half">
                                    <Select
                                        label="Hover border"
                                        options={[{
                                            label    : "Select a colour",
                                            value    : "select-a-colour",
                                            disabled : true,
                                            selected : true,
                                        },
                                            ...colourOptions]}
                                        defaultValue={componentVariables["option-card-border-hover"].defaultValue || "select-a-colour"}
                                        onChange={(value) => handleVariableChange("option-card-border-hover", value)}
                                        isFullWidth
                                    />
                                </Portion>

                                {/* SELECTED STATES */}
                                <Portion desktopSpan="half">
                                    <Select
                                        label="Selected background"
                                        options={[{
                                            label    : "Select a colour",
                                            value    : "select-a-colour",
                                            disabled : true,
                                            selected : true,
                                        },
                                            ...colourOptions]}
                                        defaultValue={componentVariables["option-card-bg-selected"].defaultValue || "select-a-colour"}
                                        onChange={(value) => handleVariableChange("option-card-bg-selected", value)}
                                        isFullWidth
                                    />
                                </Portion>

                                <Portion desktopSpan="half">
                                    <Select
                                        label="Selected border"
                                        options={[{
                                            label    : "Select a colour",
                                            value    : "select-a-colour",
                                            disabled : true,
                                            selected : true,
                                        },
                                            ...colourOptions]}
                                        defaultValue={componentVariables["option-card-border-selected"].defaultValue || "select-a-colour"}
                                        onChange={(value) => handleVariableChange("option-card-border-selected", value)}
                                        isFullWidth
                                    />
                                </Portion>

                                {/* TICK ICON STATES */}
                                <Portion desktopSpan="half">
                                    <Select
                                        label="Tick background (hover)"
                                        options={[{
                                            label    : "Select a colour",
                                            value    : "select-a-colour",
                                            disabled : true,
                                            selected : true,
                                        },
                                            ...colourOptions]}
                                        defaultValue={componentVariables["option-card-tick-bg-hover"].defaultValue || "select-a-colour"}
                                        onChange={(value) => handleVariableChange("option-card-tick-bg-hover", value)}
                                        isFullWidth
                                    />
                                </Portion>

                                <Portion desktopSpan="half">
                                    <Select
                                        label="Tick color (hover)"
                                        options={[{
                                            label    : "Select a colour",
                                            value    : "select-a-colour",
                                            disabled : true,
                                            selected : true,
                                        },
                                            ...colourOptions]}
                                        defaultValue={componentVariables["option-card-tick-line-hover"].defaultValue || "select-a-colour"}
                                        onChange={(value) => handleVariableChange("option-card-tick-line-hover", value)}
                                        isFullWidth
                                    />
                                </Portion>

                                <Portion desktopSpan="half">
                                    <Select
                                        label="Tick background (selected)"
                                        options={[{
                                            label    : "Select a colour",
                                            value    : "select-a-colour",
                                            disabled : true,
                                            selected : true,
                                        },
                                            ...colourOptions]}
                                        defaultValue={componentVariables["option-card-tick-bg-selected"].defaultValue || "select-a-colour"}
                                        onChange={(value) => handleVariableChange("option-card-tick-bg-selected", value)}
                                        isFullWidth
                                    />
                                </Portion>

                                <Portion desktopSpan="half">
                                    <Select
                                        label="Tick color (selected)"
                                        options={[{
                                            label    : "Select a colour",
                                            value    : "select-a-colour",
                                            disabled : true,
                                            selected : true,
                                        },
                                            ...colourOptions]}
                                        defaultValue={componentVariables["option-card-tick-line-selected"].defaultValue || "select-a-colour"}
                                        onChange={(value) => handleVariableChange("option-card-tick-line-selected", value)}
                                        isFullWidth
                                    />
                                </Portion>

                                {/* BORDER WIDTH */}
                                <Portion desktopSpan="half">
                                    <Select
                                        label="Border width"
                                        options={[{
                                            label    : "Global border width",
                                            value    : "global-border-width",
                                            selected : true,
                                        }]}
                                        defaultValue={componentVariables["option-card-border-width"].defaultValue}
                                        onChange={(value) => handleVariableChange("option-card-border-width", value)}
                                        isFullWidth
                                    />
                                </Portion>

                                {/* FOCUS COLOR */}
                                <Portion desktopSpan="half">
                                    <Select
                                        label="Focus outline"
                                        options={[{
                                            label    : "Global focus colour",
                                            value    : "global-focus-colour",
                                            selected : true,
                                        }]}
                                        defaultValue={componentVariables["option-card-focus"].defaultValue}
                                        onChange={(value) => handleVariableChange("option-card-focus", value)}
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

export default OptionCardsDocs;
