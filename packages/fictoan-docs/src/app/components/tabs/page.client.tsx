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
    Tabs,
CodeBlock
} from "fictoan-react";

// COMPONENTS ==========================================================================================================

// STYLES ==============================================================================================================
import "./page-tabs.css";

// HOOKS ===============================================================================================================
import { useThemeVariables } from "../../../utils/useThemeVariables";

// UTILS ===============================================================================================================
import { colourOptions } from "../../colour/colours";

// DATA ================================================================================================================
import { tabsProps } from "./config";

const TabsDocs = () => {
    const { componentVariables, handleVariableChange, cssVariablesList } = useThemeVariables(tabsProps.variables);


    // CUSTOMISE =======================================================================================================
    const [selectedAlign, setSelectedAlign] = useState("left");
    const [isFullWidth, setIsFullWidth] = useState(false);
    const [hasAlert, setHasAlert] = useState(false);
    const [alertTabKey, setAlertTabKey] = useState(null);

    const toggleRandomTabAlert = () => {
        setHasAlert(prev => {
            if (!prev) {
                // Hard coded for 3 tabs
                const randomTabKey = `tab${Math.floor(Math.random() * 3) + 1}`;
                setAlertTabKey(randomTabKey);
            } else {
                setAlertTabKey(null);
            }
            return !prev;
        });
    };

    // THEME ===========================================================================================================

    return (
        <Article id="page-component">
            <Row horizontalPadding="huge" marginTop="medium" marginBottom="small">
                <Portion>
                    <Heading1>Tabs</Heading1>
                    <Text size="large" marginBottom="small">
                        A way to display multiple blocks of content, one at a time
                    </Text>
                </Portion>

                <Portion>
                    <Heading4 marginBottom="micro">Characteristics</Heading4>
                    <Text>&bull; </Text>
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
                        <Tabs
                            isFullWidth={isFullWidth}
                            {...(
                                selectedAlign !== undefined ? { align : selectedAlign } : {}
                            )}
                            tabs={[
                                {
                                    key      : "tab1",
                                    label    : "Tab 1",
                                    hasAlert : alertTabKey === "tab1",
                                    content  : <Text>Content for tab 1</Text>
                                    ,
                                },
                                {
                                    key      : "tab2",
                                    label    : "Tab 2",
                                    hasAlert : alertTabKey === "tab2",
                                    content  : <Text>Content for tab 2</Text>,
                                },
                                {
                                    key      : "tab3",
                                    label    : "Tab 3",
                                    hasAlert : alertTabKey === "tab3",
                                    content  : <Text>Content for tab 3</Text>,
                                },
                            ]}
                        />
                    </Element>
                </Portion>

                {/* CONFIGURATOR /////////////////////////////////////////////////////////////////////////////////// */}
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
                                            `<Tabs`,
                                            isFullWidth ? `    isFullWidth` : null,
                                            `    align="${selectedAlign}"`,
                                            `    tabs={[`,
                                            `        {`,
                                            `            key     : "tab1",`,
                                            `            label   : "Tab 1",`,
                                            `            content : <Text>Content for tab 1</Text>`,
                                            `        },`,
                                            `        {`,
                                            `            key     : "tab2",`,
                                            `            label   : "Tab 2",`,
                                            `            content : <Text>Content for tab 2</Text>`,
                                            `        },`,
                                            `        {`,
                                            `            key     : "tab3",`,
                                            `            label   : "Tab 3",`,
                                            `            content : <Text>Content for tab 3</Text>`,
                                            `        }`,
                                            `    ]}`,
                                            `/>`,
                                        ].filter(Boolean).join("\n")}
                                    </CodeBlock>
                                </Portion>

                                {/* ALIGN ========================================================================== */}
                                <Portion>
                                    <RadioTabGroup
                                        id="align" label="Kind" name="align"
                                        options={[
                                            { id : "align-opt-0", value : "left", label : "left" },
                                            { id : "align-opt-1", value : "right", label : "right" },
                                            { id : "align-opt-2", value : "centre", label : "centre" },
                                            { id : "align-opt-3", value : "center", label : "center" },
                                        ]}
                                        value={selectedAlign}
                                        onChange={(value) => setSelectedAlign(value)}
                                    />

                                    <Divider kind="secondary" horizontalMargin="none" marginTop="micro" />
                                </Portion>

                                {/* DISMISSIBLE ==================================================================== */}
                                <Portion>
                                    <Checkbox
                                        id="checkbox-full-width"
                                        value="checkbox-full-width"
                                        name="checkbox-full-width"
                                        label="Make full width"
                                        checked={isFullWidth}
                                        onChange={(checked) => setIsFullWidth(checked)}
                                    />

                                    <Divider kind="secondary" horizontalMargin="none" marginTop="micro" />
                                </Portion>

                                {/* DISMISSIBLE ==================================================================== */}
                                <Portion>
                                    <Checkbox
                                        id="checkbox-has-alert"
                                        value="checkbox-has-alert"
                                        name="checkbox-has-alert"
                                        label="Show alert badge on random tab"
                                        checked={hasAlert}
                                        onChange={toggleRandomTabAlert}
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

                                {/* BG COLOUR ====================================================================== */}
                                <Portion desktopSpan="half">
                                    <Select
                                        label="Background"
                                        options={[{
                                            label    : "Select a colour",
                                            value    : "select-a-colour",
                                            disabled : true,
                                            selected : true,
                                        }, ...colourOptions]}
                                        defaultValue={componentVariables["tabs-bg"].defaultValue || "select-a-colour"}
                                        onChange={(value) => handleVariableChange("tabs-bg", value)}
                                        isFullWidth
                                    />
                                </Portion>

                                <Portion desktopSpan="half" />

                                {/* LABEL - DEFAULT ================================================================ */}
                                <Portion desktopSpan="half">
                                    <Select
                                        label="Label - default"
                                        options={[{
                                            label    : "Select a colour",
                                            value    : "select-a-colour",
                                            disabled : true,
                                            selected : true,
                                        }, ...colourOptions]}
                                        defaultValue={componentVariables["tab-label-default"].defaultValue || "select-a-colour"}
                                        onChange={(value) => handleVariableChange("tab-label-default", value)}
                                        isFullWidth
                                    />
                                </Portion>

                                {/* LABEL - HOVER ================================================================== */}
                                <Portion desktopSpan="half">
                                    <Select
                                        label="Label - hover"
                                        options={[{
                                            label    : "Select a colour",
                                            value    : "select-a-colour",
                                            disabled : true,
                                            selected : true,
                                        }, ...colourOptions]}
                                        defaultValue={componentVariables["tab-label-hover"].defaultValue || "select-a-colour"}
                                        onChange={(value) => handleVariableChange("tab-label-hover", value)}
                                        isFullWidth
                                    />
                                </Portion>

                                {/* LABEL - ACTIVE ================================================================= */}
                                <Portion desktopSpan="half">
                                    <Select
                                        label="Label - active"
                                        options={[{
                                            label    : "Select a colour",
                                            value    : "select-a-colour",
                                            disabled : true,
                                            selected : true,
                                        }, ...colourOptions]}
                                        defaultValue={componentVariables["tab-label-active"].defaultValue || "select-a-colour"}
                                        onChange={(value) => handleVariableChange("tab-label-active", value)}
                                        isFullWidth
                                    />
                                </Portion>

                                {/* LABEL - DISABLED =============================================================== */}
                                <Portion desktopSpan="half">
                                    <Select
                                        label="Label - disabled"
                                        options={[{
                                            label    : "Select a colour",
                                            value    : "select-a-colour",
                                            disabled : true,
                                            selected : true,
                                        }, ...colourOptions]}
                                        defaultValue={componentVariables["tab-label-disabled"].defaultValue || "select-a-colour"}
                                        onChange={(value) => handleVariableChange("tab-label-disabled", value)}
                                        isFullWidth
                                    />
                                </Portion>

                                {/* ALERT - BG ===================================================================== */}
                                <Portion desktopSpan="half">
                                    <Select
                                        label="Alert background"
                                        options={[{
                                            label    : "Select a colour",
                                            value    : "select-a-colour",
                                            disabled : true,
                                            selected : true,
                                        }, ...colourOptions]}
                                        defaultValue={componentVariables["tab-alert-badge-bg"].defaultValue || "select-a-colour"}
                                        onChange={(value) => handleVariableChange("tab-alert-badge-bg", value)}
                                        isFullWidth
                                    />
                                </Portion>

                                {/* ALERT - BORDER ================================================================= */}
                                <Portion desktopSpan="half">
                                    <Select
                                        label="Alert border"
                                        options={[{
                                            label    : "Select a colour",
                                            value    : "select-a-colour",
                                            disabled : true,
                                            selected : true,
                                        }, ...colourOptions]}
                                        defaultValue={componentVariables["tab-alert-badge-border"].defaultValue || "select-a-colour"}
                                        onChange={(value) => handleVariableChange("tab-alert-badge-border", value)}
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

export default TabsDocs;
