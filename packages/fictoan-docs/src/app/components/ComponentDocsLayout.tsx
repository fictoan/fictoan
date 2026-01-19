"use client";

// REACT CORE ==========================================================================================================
import { ReactNode, Children, isValidElement } from "react";

// UI ==================================================================================================================
import { Article, Divider, Portion, Row, Section, Div, Tabs } from "fictoan-react";

interface ComponentDocsLayoutProps {
    children         : ReactNode;
    pageId           : string;
    secondTabLabel ? : string;
}

export const ComponentDocsLayout = ({ children, pageId, secondTabLabel = "Theme config" }: ComponentDocsLayoutProps) => {
    // Extract content by ID
    const getContentById = (targetId: string) => {
        let content = null;
        Children.forEach(children, (child) => {
            if (isValidElement(child)) {
                const props = child.props as { id?: string; children?: ReactNode };
                if (props.id === targetId) {
                    content = props.children;
                }
            }
        });
        return content;
    };

    return (
        <Article id={pageId}>
            {/* INTRO SECTION ////////////////////////////////////////////////////////////////////////////////////// */}
            <Section>
                <Row horizontalPadding="huge" marginTop="medium" marginBottom="small">
                    {/* HEADER ===================================================================================== */}
                    <Portion>
                        {getContentById("intro-header")}
                    </Portion>

                    {/* NOTES ====================================================================================== */}
                    {getContentById("intro-notes") && (
                        <Portion>
                            {getContentById("intro-notes")}
                        </Portion>
                    )}
                </Row>
            </Section>

            <Divider kind="primary" horizontalMargin="huge" verticalMargin="small" />

            {/* INTERACTIVE COMPONENT SECTION ////////////////////////////////////////////////////////////////////// */}
            <Section>
                <Row id="component-wrapper" horizontalPadding="small" className="rendered-component">
                    <Portion>
                        <Div
                            id="interactive-component"
                            padding="small"
                            shape="rounded"
                            bgColour="grey-light90"
                            data-centered-children
                        >
                            {getContentById("demo-component")}
                        </Div>
                    </Portion>
                </Row>

                <Row horizontalPadding="huge">
                    <Portion>
                        <Tabs
                            tabs={[
                                {
                                    key: "props-tab",
                                    label: "Props config",
                                    content: (getContentById("props-config"))
                                },
                                {
                                    key: "theme-tab",
                                    label: secondTabLabel,
                                    content: (getContentById("theme-config"))
                                }
                            ]}
                        />
                    </Portion>
                </Row>
            </Section>
        </Article>
    );
};
