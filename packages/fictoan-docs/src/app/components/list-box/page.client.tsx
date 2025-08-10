"use client";

// REACT CORE ==========================================================================================================
import React, { useState } from "react";

// UI ==================================================================================================================
import { Element, Heading1, Heading4, Divider, Portion, Row, Text, Article, ListBox, Section, Div } from "fictoan-react";

// LOCAL COMPONENTS ====================================================================================================
import { PropsConfigurator } from "$components/PropsConfigurator/PropsConfigurator";

// UTILS ===============================================================================================================
import { createThemeConfigurator } from "$utils/themeConfigurator";

// STYLES ==============================================================================================================
import "./page-list-box.css";

const ListBoxDocs = () => {
    const [props, setProps] = useState({});
    const [selectedValues, setSelectedValues] = useState<string | string[]>("");

    const ListBoxComponent = (varName: string) => {
        // Remove debug log in production
        // console.log("Checking variable:", varName);
        return varName.startsWith("list-box-");
    };

    const {
        interactiveElementRef,
        componentProps: themeConfig,
        themeConfigurator,
    } = createThemeConfigurator("ListBox", ListBoxComponent);

    const handleSelectionChange = (value: string | string[]) => {
        setSelectedValues(value);
    };

    return (
        <Article id="page-list-box">
            {/* HEADER //////////////////////////////////////////////////////////////////////////////////////////////// */}
            <Row horizontalPadding="huge" marginTop="medium" marginBottom="small">
                <Portion>
                    <Heading1>List box</Heading1>
                    <Text size="large" marginBottom="small">
                        A customisable dropdown component that supports single and multi-select functionality
                    </Text>
                </Portion>

                <Portion>
                    
                    <ul>
                        <li>Supports both single and multi-select modes</li>
                        <li>Searchable options with fuzzy matching</li>
                    </ul>
                </Portion>
            </Row>

            <Divider kind="primary" horizontalMargin="huge" verticalMargin="small" />

            {/* INTERACTIVE COMPONENT ////////////////////////////////////////////////////////////////////////////////// */}
            <Section>
                {/* DEMO COMPONENT /////////////////////////////////////////////////////////////////////////////////// */}
                <Row id="component-wrapper" horizontalPadding="small" className="rendered-component">
                    <Portion>
                        <Element
                            as="div"
                            padding="small"
                            shape="rounded"
                            bgColour="slate-light80"
                            data-centered-children
                        >
                            <ListBox
                                ref={interactiveElementRef}
                                {...props}
                                {...themeConfig}
                                id="interactive-component"
                                onChange={handleSelectionChange}
                                value={selectedValues}
                            />

                        </Element>

                        <Div marginTop="nano">
                            {selectedValues && (Array.isArray(selectedValues) ? selectedValues.length > 0 : selectedValues !== "") ? (
                                <Text fontStyle="monospace" size="small">
                                    Selected values:&nbsp;
                                    {Array.isArray(selectedValues)
                                        ? `[${selectedValues.map(v => `"${v}"`).join(", ")}]`
                                        : `"${selectedValues}"`
                                    }
                                </Text>
                            ) : (
                                <Text textColour="slate" size="small" style={{fontStyle: "italic"}}>
                                    Make a selection from the list above.
                                </Text>
                            )}
                        </Div>
                    </Portion>
                </Row>

                <Row horizontalPadding="small">
                    {/* PROPS CONFIGURATOR =========================================================================== */}
                    <Portion desktopSpan="half">
                        <PropsConfigurator
                            componentName="ListBox"
                            onPropsChange={setProps}
                        />
                    </Portion>

                    {/* THEME CONFIGURATOR =========================================================================== */}
                    <Portion desktopSpan="half">
                        {themeConfigurator()}
                    </Portion>
                </Row>
            </Section>
        </Article>
    );
};

export default ListBoxDocs;
