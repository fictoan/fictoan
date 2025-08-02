"use client";

// REACT CORE ==========================================================================================================
import React from "react";

// UI ==================================================================================================================
import { Element, Heading1, Heading4, Divider, Portion, Row, Text, Article, ListBox, Section } from "fictoan-react";

// UTILS ===============================================================================================================
import { createPropsConfigurator } from "$utils/propsConfigurator";
import { createThemeConfigurator } from "$utils/themeConfigurator";

// STYLES ==============================================================================================================
import "./page-list-box.css";

// OTHER ===============================================================================================================
import { colourOptions } from "../../colour/colours";

const ListBoxDocs = () => {
    const {
        propsConfigurator,
        componentProps: propsConfig,
    } = createPropsConfigurator(
        "ListBox",
        [
            "strings",
            "placeholder",
            "allowMultiSelect",
            "allowCustomEntries",
            "selectionLimit",
            "disabled",
        ],
        colourOptions,
        {
            isSelfClosing: false,
            canHaveChildren: false,
            defaultOptions: [
                { value: "option1", label: "Option 1" },
                { value: "option2", label: "Option 2" },
                { value: "option3", label: "Option 3" },
                { value: "option4", label: "Option 4", disabled: true },
            ]
        }
    );

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
                                id="interactive-component"
                                ref={interactiveElementRef}
                                {...propsConfig}
                                {...themeConfig}
                                options={[
                                    { value: "option1", label: "Option 1" },
                                    { value: "option2", label: "Option 2" },
                                    { value: "option3", label: "Option 3" },
                                    { value: "option4", label: "Option 4", disabled: true },
                                ]}
                            />
                        </Element>
                    </Portion>
                </Row>

                <Row horizontalPadding="small">
                    {/* PROPS CONFIGURATOR =========================================================================== */}
                    <Portion desktopSpan="half">
                        {propsConfigurator()}
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
