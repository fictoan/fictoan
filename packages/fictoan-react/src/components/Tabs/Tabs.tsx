// REACT CORE ==========================================================================================================
import React, { useEffect, useCallback } from "react";

// ELEMENT =============================================================================================================
import { CommonAndHTMLProps } from "../Element/constants";
import { Div } from "../Element/Tags";
import { Element } from "$element";

// STYLES ==============================================================================================================
import "./tabs.css";

// OTHER ===============================================================================================================
import { Divider } from "../Divider/Divider";
import { Text } from "../Typography/Text";

interface TabType {
        key        : string;
        label      : React.ReactNode;
        content    : React.ReactNode;
        hasAlert ? : boolean;
}

// prettier-ignore
export interface TabsCustomProps {
        tabs               : TabType[];
        /** wrapper to render additional content inside the nav along with tab labels */
        additionalNavContentWrapper ? : React.ReactNode;
        defaultActiveTab ? : React.ReactNode;
        align            ? : "left" | "centre" | "center" | "right";
        isFullWidth      ? : boolean;
}

export type TabsElementType = HTMLDivElement;
export type TabsProps = Omit<CommonAndHTMLProps<TabsElementType>, keyof TabsCustomProps> & TabsCustomProps;

export const Tabs = React.forwardRef(
    ({ tabs, additionalNavContentWrapper, defaultActiveTab, align = "left", isFullWidth, ...props }: TabsProps, ref: React.Ref<TabsElementType>) => {
        const index = tabs.findIndex((tab) => tab.key === defaultActiveTab);
        const defaultTabIndex = index > -1 ? index : 0;
        const [activeTab, setActiveTab] = React.useState<TabType | undefined>(
            tabs.length > 0 ? tabs[defaultTabIndex] : undefined
        );

        useEffect(() => {
            if (tabs.length > 0) {
                setActiveTab(tabs[defaultTabIndex]);
            }
        }, [defaultTabIndex, tabs]);

        const handleTabClick = (tab: TabType) => {
            setActiveTab(tab);
        };

        const handleKeyDown = useCallback((event: React.KeyboardEvent) => {
            if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
            }
        }, []);

        return (
            <>
                <Element<TabsElementType>
                    as="section"
                    data-tabs
                    ref={ref}
                    data-align={align}
                    data-full-width={isFullWidth}
                    {...props}
                >
                    <Div data-tabs-nav>
                        {tabs.map((tab) => (
                            <Element<HTMLButtonElement>
                                as="button"
                                key={tab.key}
                                role="tab"
                                tabIndex={0}
                                aria-selected={activeTab?.key === tab.key}
                                aria-controls={`tab-panel-${tab.key}`}
                                id={`tab-${tab.key}`}
                                data-tab-label
                                data-active={activeTab?.key === tab.key}
                                data-alert={tab.hasAlert}
                                onClick={() => handleTabClick(tab)}
                                onKeyDown={handleKeyDown}
                            >
                                <Text>{tab.label}</Text>

                                {tab.hasAlert && <Div data-alert-badge />}
                            </Element>
                        ))}

                        {additionalNavContentWrapper}
                    </Div>

                    <Divider marginY="none" />

                    {tabs.map((tab) => (
                        <Div
                            key={tab.key}
                            role="tabpanel"
                            id={`tab-panel-${tab.key}`}
                            aria-labelledby={`tab-${tab.key}`}
                            data-tab-content
                            data-active={activeTab?.key === tab.key}
                        >
                            {tab.content}
                        </Div>
                    ))}
                </Element>
            </>
        );
    }
);