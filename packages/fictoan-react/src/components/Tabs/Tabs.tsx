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

export interface TabType {
        key        : string;
        label      : React.ReactNode;
        content    : React.ReactNode;
        hasAlert ? : boolean;
}

// Uncontrolled by default (defaultActiveTab). Passing activeTab makes the
// component controlled: clicks and keyboard nav only notify via onTabChange,
// and the host's prop drives which tab shows — both modes run the same exit
// animation. onTabChange also fires in uncontrolled mode, as a notification.
// lazyMount renders only the active tab's panel instead of mounting every
// panel behind `hidden` — content that measures its container at mount time
// (charts, maps) reads a display:none panel as zero-size and paints at the
// wrong dimensions when the tab is revealed.
// prettier-ignore
export interface TabsCustomProps {
        tabs                          : TabType[];
        additionalNavContentWrapper ? : React.ReactNode;
        defaultActiveTab            ? : string;
        activeTab                   ? : string;
        onTabChange                 ? : (key : string) => void;
        lazyMount                   ? : boolean;
        align                       ? : "left" | "centre" | "center" | "right";
        isFullWidth                 ? : boolean;
}

export type TabsElementType = HTMLDivElement;
export type TabsProps = Omit<CommonAndHTMLProps<TabsElementType>, keyof TabsCustomProps> & TabsCustomProps;

export const Tabs = React.forwardRef(
    (
        {
            tabs, additionalNavContentWrapper, defaultActiveTab, activeTab,
            onTabChange, lazyMount, align = "left", isFullWidth, ...props
        } : TabsProps,
        ref : React.Ref<TabsElementType>) => {
        // Controlled when the host passes activeTab — selection then only
        // notifies via onTabChange, and the prop drives the transition.
        const isControlled = activeTab !== undefined;

        const index = tabs.findIndex((tab) => tab.key === (activeTab ?? defaultActiveTab));
        const defaultTabIndex = index > -1 ? index : 0;

        // The tab whose panel is on screen. Lags the selected tab by the
        // exit-animation duration in both modes — labels highlight off this
        // too, so highlight and panel always move together.
        const [ displayedTab, setDisplayedTab ] = React.useState<TabType | undefined>(
            tabs.length > 0 ? tabs[defaultTabIndex] : undefined,
        );
        const [ isExiting, setIsExiting ] = React.useState<boolean>(false);

        // Refs for keyboard navigation to focus the tab buttons
        const tabButtonRefs = useRef<(HTMLButtonElement | null)[]>([]);

        // Holds the pending exit-animation timer so rapid switching / unmount
        // mid-transition can clear it instead of committing a stale tab.
        const exitTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

        // V2's performant animation logic
        const transitionToTab = useCallback((tab : TabType) => {
            if (displayedTab?.key !== tab.key) {
                setIsExiting(true);
                // Cancel any in-flight transition before queuing a new one.
                if (exitTimerRef.current !== null) {
                    clearTimeout(exitTimerRef.current);
                }
                exitTimerRef.current = setTimeout(() => {
                    setDisplayedTab(tab);
                    setIsExiting(false);
                    exitTimerRef.current = null;
                }, 150); // Animation duration
            }
        }, [ displayedTab?.key ]);

        // Clicks and keyboard nav land here: always notify the host; only
        // self-transition when uncontrolled.
        const handleTabSelect = useCallback((tab : TabType) => {
            onTabChange?.(tab.key);
            if (!isControlled) {
                transitionToTab(tab);
            }
        }, [ onTabChange, isControlled, transitionToTab ]);

        // Controlled mode: follow the activeTab prop through the same exit
        // animation a click would run. An unknown key transitions nowhere —
        // the displayed tab stays put until the host passes a real one.
        useEffect(() => {
            if (!isControlled) return;
            const target = tabs.find((tab) => tab.key === activeTab);
            if (target) {
                transitionToTab(target);
            }
        }, [ isControlled, activeTab, tabs, transitionToTab ]);

        // Clear any pending exit-animation timer on unmount.
        useEffect(() => {
            return () => {
                if (exitTimerRef.current !== null) {
                    clearTimeout(exitTimerRef.current);
                }
            };
        }, []);

        useEffect(() => {
            if (tabs.length > 0) {
                // If the displayed tab still exists in the new tabs array, keep it.
                // This preserves the active state if the content of a tab changes.
                const currentTabStillExists = tabs.find(tab => tab.key === displayedTab?.key);
                if (!currentTabStillExists) {
                    // Otherwise, default to the designated default tab or the first one.
                    setDisplayedTab(tabs[defaultTabIndex]);
                }
            } else {
                setDisplayedTab(undefined);
            }
        }, [ tabs, defaultTabIndex, displayedTab?.key ]);


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
                handleTabSelect(nextTab);
                tabButtonRefs.current[nextIndex]?.focus();
            }

        }, [ tabs, handleTabSelect ]);

        if (!displayedTab) {
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
                    {/* role="none" on the list + items removes their list semantics from the
                        a11y tree so the role="tab" buttons become the tablist's owned children
                        (otherwise axe flags aria-required-children / aria-required-parent). */}
                    <ul className="tab-labels-list" role="none">
                        {tabs.map((tab, i) => (
                            <li key={tab.key} role="none">
                                <Element<HTMLButtonElement>
                                    as="button"
                                    ref={(el) => { tabButtonRefs.current[i] = el; }}
                                    id={`tab-${tab.key}`}
                                    role="tab"
                                    aria-selected={displayedTab.key === tab.key}
                                    aria-controls={`tab-panel-${tab.key}`}
                                    tabIndex={displayedTab.key === tab.key ? 0 : -1} // Roaming tabindex
                                    data-tab-label
                                    data-active={displayedTab.key === tab.key}
                                    data-alert={tab.hasAlert}
                                    onClick={() => handleTabSelect(tab)}
                                    onKeyDown={(e) => handleKeyDown(e, i)}
                                    className={`tab-button ${displayedTab.key === tab.key ? "is-active" : ""}`}
                                    marginBottom="nano"
                                >
                                    <Text
                                        className={`tab-label ${displayedTab.key === tab.key ? "is-active" : ""} ${tab.hasAlert ? "has-alert" : ""}`}
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

                {tabs.map((tab) => {
                    // Lazy mounting: only the on-screen panel exists in the
                    // DOM, so mount-time measuring content always sees a
                    // visible box. Panels unmount on switch — hosts that need
                    // preserved state should lift it out of the panel.
                    if (lazyMount && displayedTab.key !== tab.key) {
                        return null;
                    }
                    return (
                        <Div
                            key={tab.key}
                            id={`tab-panel-${tab.key}`}
                            role="tabpanel"
                            aria-labelledby={`tab-${tab.key}`}
                            tabIndex={displayedTab.key === tab.key ? 0 : -1}
                            data-tab-content
                            data-active={displayedTab.key === tab.key}
                            data-exiting={displayedTab.key === tab.key && isExiting}
                            hidden={displayedTab.key !== tab.key}
                        >
                            {tab.content}
                        </Div>
                    );
                })}
            </Element>
        );
    },
);
Tabs.displayName = "Tabs";