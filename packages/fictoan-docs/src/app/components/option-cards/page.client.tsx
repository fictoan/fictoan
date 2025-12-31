"use client";

// REACT CORE ==========================================================================================================
import React from "react";

// UI ==================================================================================================================
import { Div, Heading4, Divider, Portion, Row, Article, OptionCard, OptionCardsGroup, Section, Heading6 } from "fictoan-react";

// LOCAL COMPONENTS ====================================================================================================
import { PropsConfigurator } from "$components/PropsConfigurator/PropsConfigurator";

// UTILS ===============================================================================================================
import { createThemeConfigurator } from "$utils/themeConfigurator";

// STYLES ==============================================================================================================
import "../../../styles/fictoan-theme.css";
import "./page-option-cards.css";

const OptionCardsDocs = () => {
    const [ props, setProps ] = React.useState<{ [key: string]: any }>({});
    const [ selectedIds, setSelectedIds ] = React.useState(new Set());

    const OptionCardComponent = (varName : string) => {
        return varName.startsWith("option-card-");
    };

    const {
        interactiveElementRef,
        componentProps : themeConfig,
        themeConfigurator,
    } = createThemeConfigurator("OptionCard", OptionCardComponent);

    // Handle selection change
    const handleSelectionChange = (newSelectedIds: Set<string>) => {
        setSelectedIds(newSelectedIds);
        console.log("Selected IDs:", Array.from(newSelectedIds));
    };

    return (
        <Article id="page-option-cards">
            {/*  INTRO ///////////////////////////////////////////////////////////////////////////////////////////// */}
            <Section>
                <Row horizontalPadding="huge" marginTop="medium" marginBottom="small">
                    <Portion>
                        <Heading4 id="component-name">
                            Option Cards
                        </Heading4>

                        <Heading6
                            id="component-description"
                            weight="400" marginBottom="small"
                        >
                            A selectable card component that can be used individually or in groups with single or multiple selection modes
                        </Heading6>
                    </Portion>

                    <Portion>
                        <ul>
                            <li>Supports single and multiple selections</li>
                            <li>Optional tick icon indicator</li>
                            <li>Cards accept any React node as children</li>
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
                            <OptionCardsGroup
                                {...props}
                                onSelectionChange={handleSelectionChange}
                            >
                                <OptionCard
                                    // @ts-ignore
                                    ref={interactiveElementRef}
                                    {...themeConfig}
                                    id="card-1" 
                                    padding="small"
                                >
                                    Option 1
                                </OptionCard>

                                <OptionCard id="card-2" padding="small">
                                    Option 2
                                </OptionCard>

                                <OptionCard id="card-3" padding="small">
                                    Option 3
                                </OptionCard>
                            </OptionCardsGroup>
                        </Div>
                    </Portion>
                </Row>

                <Row horizontalPadding="small">
                    {/* PROPS CONFIGURATOR ========================================================================= */}
                    <Portion desktopSpan="half">
                        <PropsConfigurator componentName="OptionCardsGroup" onPropsChange={setProps} />
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

export default OptionCardsDocs;
