// FRAMEWORK ===========================================================================================================
import React, { useEffect, useCallback } from "react";

// STYLES ==============================================================================================================
import "./tabs.css";

// OTHER ===============================================================================================================
import { CommonAndHTMLProps } from "../Element/constants";
import { Div } from "../Element/Tags";
import { Divider } from "../Divider/Divider";
import { Element } from "../Element/Element";
import { Text } from "../Typography/Text";

interface TabType {
    key        : string;
    label      : React.ReactNode;
    content    : React.ReactNode;
    hasAlert ? : boolean;
}

// prettier-ignore
export interface TabsCustomProps {
    tabs                          : TabType[];
    /** wrapper to render additional content inside the nav along with tab labels */
    additionalNavContentWrapper ? : React.ReactNode;
    defaultActiveTab            ? : React.ReactNode;
    align                       ? : "left" | "centre" | "center" | "right";
}

export type TabsElementType = HTMLDivElement;
export type TabsProps = Omit<CommonAndHTMLProps<TabsElementType>, keyof TabsCustomProps> & TabsCustomProps;

export const Tabs = React.forwardRef(
    ({ tabs, additionalNavContentWrapper, defaultActiveTab, align = "left", ...props }: TabsProps, ref: React.Ref<TabsElementType>) => {
        const index = tabs.findIndex((tab) => tab.key === defaultActiveTab);
        const defaultTabIndex = index > -1 ? index : 0;
        const [activeTab, setActiveTab] = React.useState<TabType | undefined>(
            tabs.length > 0 ? tabs[defaultTabIndex] : undefined
        );
        const [isExiting, setIsExiting] = React.useState<boolean>(false);

        const handleTabChange = useCallback((tab: TabType, animate: boolean = true) => {
            if (animate && activeTab?.key !== tab.key) {
                // Only animate when actually switching to a different tab
                setIsExiting(true);
                setTimeout(() => {
                    setIsExiting(false);
                    setActiveTab(tab);
                }, 120);
            } else {
                // No animation for content updates or initial load
                setActiveTab(tab);
            }
        }, [activeTab?.key]);

        useEffect(() => {
            if (tabs.length > 0) {
                const matchingTab = tabs.find((tab) => tab.key === activeTab?.key);
                if (matchingTab) {
                    // Update content without animation if it's the same tab
                    setActiveTab(matchingTab);
                } else {
                    // Only animate if we're switching to a different tab
                    handleTabChange(tabs[0], false);
                }
            } else {
                setActiveTab(undefined);
            }
        }, [tabs, activeTab?.key]); // Only depend on activeTab.key, not the whole object

        return (
            <Element<TabsElementType> as="div" data-tabs ref={ref} {...props}>
                {tabs.length > 0 && activeTab ? (
                    <>
                        <nav className={`align-${align}`}>
                            <ul className="tab-labels-list">
                                {tabs.map((tab) => (
                                    <li key={tab.key}>
                                        <Text
                                            className={`tab-label is-clickable ${tab.key === activeTab.key ? "is-active" : ""} ${tab.hasAlert ? "has-alert" : ""}`}
                                            onClick={() => handleTabChange(tab, true)}
                                            marginBottom="none"
                                        >
                                            {tab.label}
                                        </Text>
                                    </li>
                                ))}
                            </ul>
                            {additionalNavContentWrapper && <>{additionalNavContentWrapper}</>}
                        </nav>

                        <Divider kind="secondary" marginTop="none" marginBottom="micro" />

                        <Div className={`tabs-content ${isExiting ? "exiting" : ""}`}>
                            {activeTab.content}
                        </Div>
                    </>
                ) : (
                    <></>
                )}
            </Element>
        );
}
);
