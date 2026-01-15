// REACT CORE ==========================================================================================================
import React, { useEffect, useCallback, useRef } from "react";

// LOCAL COMPONENTS ====================================================================================================
import { CommonAndHTMLProps } from "../Element/constants";
import { Div, Nav } from "../Element/Tags";
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
        tabs                          : TabType[];
        additionalNavContentWrapper ? : React.ReactNode;
        defaultActiveTab            ? : React.ReactNode;
        align                       ? : "left" | "centre" | "center" | "right";
        isFullWidth                 ? : boolean;
}

export type TabsElementType = HTMLDivElement;
export type TabsProps = Omit<CommonAndHTMLProps<TabsElementType>, keyof TabsCustomProps> & TabsCustomProps;

export const Tabs = React.forwardRef(
    (
        {tabs, additionalNavContentWrapper, defaultActiveTab, align = "left", isFullWidth, ...props} : TabsProps,
        ref : React.Ref<TabsElementType>) => {
        const index = tabs.findIndex((tab) => tab.key === defaultActiveTab);
        const defaultTabIndex = index > -1 ? index : 0;
        const [ activeTab, setActiveTab ] = React.useState<TabType | undefined>(
            tabs.length > 0 ? tabs[defaultTabIndex] : undefined,
        );
        const [ isExiting, setIsExiting ] = React.useState<boolean>(false);

        // Refs for keyboard navigation to focus the tab buttons
        const tabButtonRefs = useRef<(HTMLButtonElement | null)[]>([]);

        // V2's performant animation logic
        const handleTabChange = useCallback((tab : TabType) => {
            if (activeTab?.key !== tab.key) {
                setIsExiting(true);
                setTimeout(() => {
                    setActiveTab(tab);
                    setIsExiting(false);
                }, 150); // Animation duration
            }
        }, [ activeTab?.key ]);

        useEffect(() => {
            if (tabs.length > 0) {
                // If the current active tab still exists in the new tabs array, keep it.
                // This preserves the active state if the content of a tab changes.
                const currentTabStillExists = tabs.find(tab => tab.key === activeTab?.key);
                if (!currentTabStillExists) {
                    // Otherwise, default to the designated default tab or the first one.
                    setActiveTab(tabs[defaultTabIndex]);
                }
            } else {
                setActiveTab(undefined);
            }
        }, [ tabs, defaultTabIndex, activeTab?.key ]);


        const handleKeyDown = useCallback((event : React.KeyboardEvent, currentIndex : number) => {
            let nextIndex = currentIndex;

            if (event.key === "ArrowRight") {
                nextIndex = (currentIndex + 1) % tabs.length;
            } else if (event.key === "ArrowLeft") {
                nextIndex = (currentIndex - 1 + tabs.length) % tabs.length;
            } else if (event.key === "Home") {
                nextIndex = 0;
            } else if (event.key === "End") {
                nextIndex = tabs.length - 1;
            } else {
                // Exit if it's not a navigation key
                return;
            }

            event.preventDefault();
            const nextTab = tabs[nextIndex];
            if (nextTab) {
                handleTabChange(nextTab);
                tabButtonRefs.current[nextIndex]?.focus();
            }

        }, [ tabs, handleTabChange ]);

        if (!activeTab) {
            return null; // Render nothing if there are no tabs or no active tab
        }

        return (
            <Element<TabsElementType>
                as="div"
                data-tabs
                ref={ref}
                data-align={align}
                data-full-width={isFullWidth}
                {...props}
            >
                <Nav data-tabs-nav role="tablist" aria-label="Tab Navigation">
                    <ul className="tab-labels-list">
                        {tabs.map((tab, i) => (
                            <li key={tab.key}>
                                <Element<HTMLButtonElement>
                                    as="button"
                                    // @ts-ignore
                                    ref={(el) => (tabButtonRefs.current[i] = el)}
                                    id={`tab-${tab.key}`}
                                    role="tab"
                                    aria-selected={activeTab.key === tab.key}
                                    aria-controls={`tab-panel-${tab.key}`}
                                    tabIndex={activeTab.key === tab.key ? 0 : -1} // Roaming tabindex
                                    data-tab-label
                                    data-active={activeTab.key === tab.key}
                                    data-alert={tab.hasAlert}
                                    onClick={() => handleTabChange(tab)}
                                    onKeyDown={(e) => handleKeyDown(e, i)}
                                    className={`tab-button ${activeTab.key === tab.key ? "is-active" : ""}`}
                                    marginBottom="nano"
                                >
                                    <Text
                                        className={`tab-label ${activeTab.key === tab.key ? "is-active" : ""} ${tab.hasAlert ? "has-alert" : ""}`}
                                    >
                                        {tab.label}
                                    </Text>
                                </Element>
                            </li>
                        ))}
                        {additionalNavContentWrapper}
                    </ul>
                </Nav>

                <Divider kind="tertiary" marginTop="none" marginBottom="micro" />

                {tabs.map((tab) => (
                    <Div
                        key={tab.key}
                        id={`tab-panel-${tab.key}`}
                        role="tabpanel"
                        aria-labelledby={`tab-${tab.key}`}
                        tabIndex={activeTab.key === tab.key ? 0 : -1}
                        data-tab-content
                        data-active={activeTab.key === tab.key}
                        data-exiting={activeTab.key === tab.key && isExiting}
                        hidden={activeTab.key !== tab.key}
                    >
                        {tab.content}
                    </Div>
                ))}
            </Element>
        );
    },
);
Tabs.displayName = "Tabs";