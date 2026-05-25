// REACT CORE ==========================================================================================================
import React, { useCallback, useEffect, useState } from "react";

// ELEMENT =============================================================================================================
import { CommonAndHTMLProps } from "../Element/constants";
import { Element } from "$element";

const getStorageKey = (): string => {
    if (typeof window !== 'undefined') {
        const hostname = window.location.hostname;
        const port = window.location.port;
        
        // Create identifier from hostname and port
        let identifier = hostname.replace(/\./g, '-');
        if (port) {
            identifier += `-${port}`;
        }
        
        return `${identifier}-theme`;
    }
    
    return "fictoan-theme";
};

// Create a tuple type for the theme context
type ThemeContextType = [string, React.Dispatch<React.SetStateAction<string>>];

const defaultContext: ThemeContextType = ["", (_) => {}];
const ThemeContext = React.createContext<ThemeContextType | undefined>(undefined);

export const useTheme = (): ThemeContextType => {
    const context = React.useContext(ThemeContext);
    if (context === undefined) {
        return defaultContext;
    }
    return context;
};

export type ThemeProviderElementType = HTMLDivElement;
export interface ThemeProviderProps extends CommonAndHTMLProps<ThemeProviderElementType> {
    themeList    : string[];
    currentTheme : string;
}

const getTheme = (key: string, fallback?: string) => {
    let theme;
    try {
        theme = localStorage.getItem(key) || undefined;
    } catch (e) {
        // Unsupported
    }
    return theme || fallback;
};

// COMPONENT ///////////////////////////////////////////////////////////////////////////////////////////////////////////
export const ThemeProvider = React.forwardRef(
    ({ currentTheme, themeList, children, ...props }: ThemeProviderProps, ref: React.Ref<ThemeProviderElementType>) => {
        const [shouldRender, setShouldRender] = useState<boolean>(false);
        const [themeState, setThemeState] = useState<string>(() =>
            getTheme(getStorageKey()) || currentTheme);

        const setTheme = useCallback(
            (value: React.SetStateAction<string>) => {
                // Handle both direct values and updater functions
                const newTheme = typeof value === "function"
                    ? value(themeState)
                    : value;

                const finalTheme = themeList.includes(newTheme)
                    ? newTheme
                    : themeList[0];

                // The visible theme switch is documentElement.className changing,
                // which all theme-* CSS rules cascade off. Wrap that mutation in
                // a view transition so consumers get a smooth crossfade between
                // themes without writing animation CSS. Falls back to instant
                // change on browsers that don't support the API.
                const applyClass = () => {
                    document.documentElement.className = "";
                    document.documentElement.classList.add(finalTheme);
                };

                const doc = typeof document !== "undefined"
                    ? document as Document & { startViewTransition?: (cb: () => void) => unknown }
                    : null;

                if (doc && typeof doc.startViewTransition === "function") {
                    doc.startViewTransition(applyClass);
                } else if (typeof document !== "undefined") {
                    applyClass();
                }

                setThemeState(finalTheme);
                if (!shouldRender) {
                    setShouldRender(true);
                }
                try {
                    localStorage.setItem(getStorageKey(), finalTheme);
                } catch (e) {
                    // Unsupported
                }
            },
            [themeState, themeList, shouldRender]
        );

        useEffect(() => {
            const theme = getTheme(getStorageKey());
            setTheme(theme || currentTheme);
        }, [currentTheme, setTheme]);

        return (
            <ThemeContext.Provider value={[themeState, setTheme]}>
                <Element<ThemeProviderElementType> as="div" data-theme-provider ref={ref} {...props}>
                    {shouldRender && children}
                </Element>
            </ThemeContext.Provider>
        );
    }
);
ThemeProvider.displayName = "ThemeProvider";
