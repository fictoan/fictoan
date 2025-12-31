"use client";

// REACT CORE ==========================================================================================================
import React from "react";

// UI ==================================================================================================================
import { Div, Heading4, Divider, Portion, Row, Article, Pagination, Section, Heading6 } from "fictoan-react";

// LOCAL COMPONENTS ====================================================================================================
import { PropsConfigurator } from "$components/PropsConfigurator/PropsConfigurator";

// UTILS ===============================================================================================================
import { createThemeConfigurator } from "$utils/themeConfigurator";

// STYLES ==============================================================================================================
import "../../../styles/fictoan-theme.css";
import "./page-pagination.css";

const PaginationDocs = () => {
    const [ props, setProps ] = React.useState<{ [key: string]: any }>({});
    const [ currentPage, setCurrentPage ] = React.useState(1);

    const PaginationComponent = (varName : string) => {
        return varName.startsWith("pagination-");
    };

    const {
        interactiveElementRef,
        componentProps : themeConfig,
        themeConfigurator,
    } = createThemeConfigurator("Pagination", PaginationComponent);

    // Handle page changes
    const handlePageChange = (newPage: number) => {
        setCurrentPage(newPage);
        console.log('Page changed to:', newPage);
    };

    return (
        <Article id="page-pagination">
            {/*  INTRO ///////////////////////////////////////////////////////////////////////////////////////////// */}
            <Section>
                <Row horizontalPadding="huge" marginTop="medium" marginBottom="small">
                    <Portion>
                        <Heading4 id="component-name">
                            Pagination
                        </Heading4>

                        <Heading6
                            id="component-description"
                            weight="400" marginBottom="small"
                        >
                            A component to help traverse a long list of pages
                        </Heading6>
                    </Portion>

                    <Portion>
                        <ul>
                            <li>
                                The <code>kind</code> prop accepts <code>plain</code>, <code>outlined</code>,
                                and <code>filled</code>
                            </li>
                            <li>Supports customisable number of items shown on either side of current page</li>
                            <li>Provides loading and empty states</li>
                            <li>Features optional go-to-page input and boundary navigation</li>
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
                            <Pagination
                                ref={interactiveElementRef}
                                totalItems={props.totalItems || 100}
                                currentPage={currentPage}
                                onPageChange={handlePageChange}
                                itemsToShowEachSide={props.itemsToShowEachSide || 1}
                                {...props}
                                {...themeConfig}
                            />
                        </Div>
                    </Portion>
                </Row>

                <Row horizontalPadding="small">
                    {/* PROPS CONFIGURATOR ========================================================================= */}
                    <Portion desktopSpan="half">
                        <PropsConfigurator componentName="Pagination" onPropsChange={setProps} />
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

export default PaginationDocs;
