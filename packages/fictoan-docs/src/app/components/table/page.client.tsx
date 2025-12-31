"use client";

// REACT CORE ==========================================================================================================
import React from "react";

// UI ==================================================================================================================
import { Div, Heading4, Divider, Portion, Row, Article, Table, Section, Heading6 } from "fictoan-react";

// UTILS ===============================================================================================================
import { createThemeConfigurator } from "$utils/themeConfigurator";

// STYLES ==============================================================================================================
import "../../../styles/fictoan-theme.css";
import "./page-table.css";

// OTHER ===============================================================================================================
import { PropsConfigurator } from "$components/PropsConfigurator/PropsConfigurator";

const TableDocs = () => {
    const [ props, setProps ] = React.useState<{ [key: string]: any }>({});

    const TableComponent = (varName : string) => {
        return varName.startsWith("table-");
    };

    const {
        interactiveElementRef,
        componentProps : themeConfig,
        themeConfigurator,
    } = createThemeConfigurator("Table", TableComponent);

    return (
        <Article id="page-table">
            {/*  INTRO ///////////////////////////////////////////////////////////////////////////////////////////// */}
            <Section>
                <Row horizontalPadding="huge" marginTop="medium" marginBottom="small">
                    <Portion>
                        <Heading4 id="component-name">
                            Table
                        </Heading4>

                        <Heading6
                            id="component-description"
                            weight="400" marginBottom="small"
                        >
                            A way to display tabular information
                        </Heading6>
                    </Portion>

                    <Portion>
                        <ul>
                            <li>The table takes the width of the longest row</li>
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
                        >
                            <Table
                                ref={interactiveElementRef}
                                {...props}
                                {...themeConfig}
                            >
                                <thead>
                                    <tr>
                                        <td>Header 1</td>
                                        <td>Header 2</td>
                                        <td>Header 3</td>
                                    </tr>
                                </thead>

                                <tbody>
                                    <tr>
                                        <td>Cell 1</td>
                                        <td>Cell 2</td>
                                        <td>Cell 3</td>
                                    </tr>

                                    <tr>
                                        <td>Cell 4</td>
                                        <td>Cell 5</td>
                                        <td>Cell 6</td>
                                    </tr>

                                    <tr>
                                        <td>Cell 7</td>
                                        <td>Cell 8</td>
                                        <td>Cell 9</td>
                                    </tr>

                                    <tr>
                                        <td>Cell 10</td>
                                        <td>Cell 11</td>
                                        <td>Cell 12</td>
                                    </tr>
                                </tbody>
                            </Table>
                        </Div>
                    </Portion>
                </Row>

                <Row horizontalPadding="small">
                    {/* PROPS CONFIGURATOR ========================================================================= */}
                    <Portion desktopSpan="half">
                        <PropsConfigurator componentName="Table" onPropsChange={setProps} />
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

export default TableDocs;