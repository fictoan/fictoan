"use client";

// REACT CORE ==========================================================================================================
import React, { useState } from "react";

// UI ==================================================================================================================
import { Div, Heading1, Divider, Portion, Row, Text, Article, Card, Form, Header, RadioTabGroup, Checkbox, CodeBlock } from "fictoan-react";

// STYLES ==============================================================================================================
import "./page-form.css";

// OTHER ===============================================================================================================
import { SampleForm } from "./SampleForm";

const FormDocs = () => {
    const [ selectedSpacing, setSelectedSpacing ] = useState("small");
    const [ isJoint, setIsJoint ] = useState(false);
    const [ isButtonFullWidth, setIsButtonFullWidth ] = useState(false);

    return (
        <Article id="page-form">
            <Row horizontalPadding="huge" marginTop="medium" marginBottom="small">
                <Portion>
                    <Heading1>Form</Heading1>
                    <Text size="large" marginBottom="small">
                        A parent wrapper for all form elements, used to space them evenly
                    </Text>
                </Portion>
            </Row>

            <Divider kind="primary" horizontalMargin="huge" verticalMargin="small" />

            <Row horizontalPadding="small" className="rendered-component">
                <Portion id="component-wrapper">
                    <Div
                        padding="small" shape="rounded" bgColour="slate-light80"
                        data-centered-children
                    >
                        <SampleForm
                            spacing={selectedSpacing}
                            isJoint={isJoint}
                            isButtonFullWidth={isButtonFullWidth}
                        />
                    </Div>
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
                                    <CodeBlock
                                        withSyntaxHighlighting language="jsx" showCopyButton
                                        marginBottom="micro"
                                    >
                                        {[
                                            `// Paste this in your content file`,
                                            `<Form${selectedSpacing && ` spacing="${selectedSpacing}"`}>`,
                                            `    <FormItemGroup${isJoint ? " isJoint" : ""}>`,
                                            `        <InputField label="First name" />`,
                                            `        <InputField label="Last name" />`,
                                            `    </FormItemGroup>\n`,
                                            `    <InputField label="Email" />\n`,
                                            `    <InputField label="Address" />\n`,
                                            `    <Button kind="primary"${isButtonFullWidth ? ` isFullWidth` : ""}>Submit</Button>`,
                                            `</Form>`,
                                        ].filter(Boolean).join("\n")}
                                    </CodeBlock>
                                </Portion>

                                <Portion>
                                    <RadioTabGroup
                                        id="spacing"
                                        label="Spacing"
                                        name="spacing"
                                        options={[
                                            {id : "spacing-opt-0", value : "none", label : "none"},
                                            {id : "spacing-opt-1", value : "nano", label : "nano"},
                                            {id : "spacing-opt-2", value : "micro", label : "micro"},
                                            {id : "spacing-opt-3", value : "tiny", label : "tiny"},
                                            {id : "spacing-opt-4", value : "small", label : "small"},
                                            {id : "spacing-opt-5", value : "medium", label : "medium"},
                                            {id : "spacing-opt-6", value : "large", label : "large"},
                                            {id : "spacing-opt-7", value : "huge", label : "huge"},
                                        ]}
                                        value={selectedSpacing}
                                        onChange={(value) => setSelectedSpacing(value)}
                                    />

                                    <Divider kind="secondary" horizontalMargin="none" marginTop="micro" />
                                </Portion>

                                <Portion>
                                    <Checkbox
                                        id="checkbox-is-joint"
                                        label="Join inputs inside the FormItemGroup"
                                        checked={isJoint}
                                        onChange={(checked) => setIsJoint(checked)}
                                    />

                                    <Divider kind="secondary" horizontalMargin="none" marginTop="micro" />
                                </Portion>

                                <Portion>
                                    <Checkbox
                                        id="checkbox-button-full-width"
                                        value="checkbox-button-full-width"
                                        name="checkbox-button-full-width"
                                        label="Make button full width"
                                        checked={isButtonFullWidth}
                                        onChange={(checked) => setIsButtonFullWidth(checked)}
                                    />
                                </Portion>
                            </Row>
                        </Card>
                    </Form>
                </Portion>
            </Row>
        </Article>
    );
};

export default FormDocs;
