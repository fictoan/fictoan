// EXTERNAL DEPS ===============================================================
import React, { useEffect, useState } from "react";

// INTERNAL DEPS ===============================================================
import {
    Element,
    Row,
    Portion,
    Heading1,
    Heading2,
    Heading3,
    Heading4,
    Heading5,
    Heading6,
    Text,
    Divider, Card, RadioGroup, Select,
    CodeBlock, RadioTabGroup, ListBox,
} from "fictoan-react";

import { listOfColours, generateShades, colourOptions } from "../colour/colours";

// COMPONENTS ==================================================================


export const InteractiveCardExample = () => {
    const [selectedPadding, setSelectedPadding] = useState("none");
    const [selectedShape, setSelectedShape] = useState("none");
    const [selectedShadow, setSelectedShadow] = useState("none");
    const [selectedBgColour, setSelectedBgColour] = useState(null);
    const [selectedBorderColour, setSelectedBorderColour] = useState(null);

    return (
        <Row horizontalPadding="large">
            <Portion>
                <Card padding="micro" shape="rounded">
                    <Row marginBottom="none">
                        <Portion desktopSpan="one-fourth">
                            <Text marginBottom="none">Padding</Text>
                        </Portion>

                        <Portion desktopSpan="three-fourth">
                            <RadioGroup
                                name="padding-group"
                                options={[
                                    { id : "padding-opt-0", value : "none", label : "none" },
                                    { id : "padding-opt-1", value : "nano", label : "nano" },
                                    { id : "padding-opt-2", value : "micro", label : "micro" },
                                    { id : "padding-opt-3", value : "tiny", label : "tiny" },
                                    { id : "padding-opt-4", value : "small", label : "small" },
                                    { id : "padding-opt-5", value : "medium", label : "medium" },
                                    { id : "padding-opt-6", value : "large", label : "large" },
                                    { id : "padding-opt-7", value : "huge", label : "huge" },
                                ]}
                                value={selectedPadding}
                                onChange={(value) => setSelectedPadding(value)}
                            />
                        </Portion>
                    </Row>

                    <Divider kind="tertiary" horizontalMargin="none" verticalMargin="micro" />

                    <Row marginBottom="none">
                        <Portion desktopSpan="one-fourth">
                            <Text marginBottom="none">Shape</Text>
                        </Portion>

                        <Portion desktopSpan="three-fourth">
                            <RadioGroup
                                name="shape-group"
                                options={[
                                    { id : "shape-opt-0", value : "none", label : "none" },
                                    { id : "shape-opt-1", value : "rounded", label : "rounded" },
                                    { id : "shape-opt-2", value : "curved", label : "curved" },
                                ]}
                                value={selectedShape}
                                onChange={(value) => setSelectedShape(value)}
                            />
                        </Portion>
                    </Row>

                    <Divider kind="tertiary" horizontalMargin="none" verticalMargin="micro" />

                    <Row marginBottom="none">
                        <Portion desktopSpan="one-fourth">
                            <Text marginBottom="none">Shadow</Text>
                        </Portion>

                        <Portion desktopSpan="three-fourth">
                            <RadioGroup
                                id="shadow"
                                name="shadow"
                                options={[
                                    { id : "shadow-opt-0", value : "none", label : "none" },
                                    { id : "shadow-opt-1", value : "mild", label : "mild" },
                                    { id : "shadow-opt-3", value : "hard", label : "hard" },
                                    { id : "shadow-opt-2", value : "soft", label : "soft" },
                                ]}
                                value={selectedShadow}
                                onChange={(value) => setSelectedShadow(value)}
                            />
                        </Portion>
                    </Row>

                    <Divider kind="tertiary" horizontalMargin="none" verticalMargin="micro" />

                    <Row marginBottom="none">
                        <Portion desktopSpan="one-fourth">
                            <Text marginBottom="none">Colours</Text>
                        </Portion>

                        <Portion desktopSpan="one-fourth">
                            <ListBox
                                label="Background colour"
                                options={[{
                                    label: "Select a colour",
                                    value: "select-a-colour",
                                    disabled: true,
                                }, ...colourOptions]}
                                defaultValue="select-a-colour"
                                onChange={(value) => setSelectedBgColour(value)}
                                isFullWidth
                            />
                        </Portion>

                        <Portion desktopSpan="one-fourth">
                            <ListBox
                                label="Border colour"
                                options={[{
                                    label    : "Select a colour",
                                    value    : "select-a-colour",
                                    disabled : true,
                                    selected : true,
                                },
                                    ...colourOptions,
                                ]}
                                defaultValue="select-a-colour"
                                onChange={(value) => setSelectedBorderColour(value)}
                                isFullWidth
                            />
                        </Portion>
                    </Row>
                </Card>
            </Portion>

            <Portion desktopSpan="half">
                <CodeBlock withSyntaxHighlighting language="jsx" marginBottom="micro">{[
                    // Lol, hacky max pro
                    `<Card`,
                    selectedPadding && `    padding="${selectedPadding}"`,
                    selectedShape && `    shape="${selectedShape}"`,
                    selectedShadow && `    shadow="${selectedShadow}"`,
                    selectedBgColour && `    bgColour="${selectedBgColour}"`,
                    selectedBorderColour && `    borderColor="${selectedBorderColour}"`,
                    `>`,
                    `    {/* Add any content here */}`,
                    `</Card>`,
                ].filter(Boolean).join("\n")}
                </CodeBlock>
            </Portion>

            <Portion desktopSpan="half">
                <Element as="div" padding="tiny" shape="rounded" bgColour="slate-light80">
                    <Card
                        id="interactive-card"
                        {...(
                            selectedPadding !== undefined ? { padding : selectedPadding } : {}
                        )}
                        {...(
                            selectedShape !== undefined ? { shape : selectedShape } : {}
                        )}
                        {...(
                            selectedShadow !== undefined ? { shadow : selectedShadow } : {}
                        )}
                        {...(
                            selectedBgColour !== undefined ? { bgColour : selectedBgColour } : {}
                        )}
                        {...(
                            selectedBorderColour !== undefined ? { borderColor : selectedBorderColour } : {}
                        )}
                    >
                        <Text>Example card</Text>
                    </Card>
                </Element>
            </Portion>
        </Row>
    );
};
