"use client";

// REACT CORE ==========================================================================================================
import React from "react";

// UI ==================================================================================================================
import { Div, Heading4, Divider, Portion, Row, Article, InputField, Section, Heading6 } from "fictoan-react";

// UTILS ===============================================================================================================
import { createPropsConfigurator } from "$utils/propsConfigurator";
import { createThemeConfigurator } from "$utils/themeConfigurator";

// STYLES ==============================================================================================================
import "./input-field.css";

// OTHER ===============================================================================================================
import { colourOptions } from "../../colour/colours";

const InputFieldDocs = () => {
    const {
        propsConfigurator,
        componentProps : propsConfig,
    } = createPropsConfigurator(
        "InputField", [
            "label",
            "size",
            "placeholder",
            "helpText",
            "required",
            "disabled",
            "readOnly",
            "validateThis",
            "pattern",
            "errorText",
            "innerTextLeft",
            "innerTextRight",
        ],
        colourOptions,
        {
            isSelfClosing   : true,
            canHaveChildren : false,
            defaultChildren : null,
        },
    );

    const InputFieldComponent = (varName : string) => {
        return varName.startsWith("input-");
    };

    const {
        interactiveElementRef,
        componentProps : themeConfig,
        themeConfigurator,
    } = createThemeConfigurator("InputField", InputFieldComponent);

    return (
        <Article id="page-input-field">
            {/*  INTRO ///////////////////////////////////////////////////////////////////////////////////////////// */}
            <Section>
                <Row horizontalPadding="huge" marginTop="medium" marginBottom="small">
                    <Portion>
                        <Heading4 id="component-name">
                            Input field
                        </Heading4>

                        <Heading6
                            id="component-description"
                            weight="400" marginBottom="small"
                        >
                            A text box to enter information
                        </Heading6>
                    </Portion>

                    <Portion>
                        <ul>
                            <li>The input field also forms the styling base for Select, Textarea etc.</li>
                        </ul>
                    </Portion>
                </Row>
            </Section>

            <Divider kind="primary" horizontalMargin="huge" verticalMargin="small" />

            {/* INTERACTIVE COMPONENT ////////////////////////////////////////////////////////////////////////////// */}
            <Section>
                {/* DEMO COMPONENT ================================================================================= */}
                <Row id="component-wrapper" horizontalPadding="small" className="rendered-component">
                    <Portion>
                        <Div
                            padding="small"
                            shape="rounded"
                            bgColour="slate-light80"
                            data-centered-children
                        >
                            <InputField
                                ref={interactiveElementRef}
                                {...propsConfig}
                                {...themeConfig}
                            />
                        </Div>
                    </Portion>
                </Row>

                <Row horizontalPadding="small">
                    {/* PROPS CONFIGURATOR ========================================================================= */}
                    <Portion desktopSpan="half">
                        {propsConfigurator()}
                    </Portion>

                    {/* THEME CONFIGURATOR ========================================================================= */}
                    <Portion desktopSpan="half">
                        {themeConfigurator()}
                    </Portion>
                </Row>
            </Section>
        </Article>
    );
};

export default InputFieldDocs;
