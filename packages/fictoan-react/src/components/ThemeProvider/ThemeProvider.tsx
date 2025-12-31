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

                if (!themeList.includes(newTheme)) {
                    // Fall back to first available theme
                    const fallbackTheme = themeList[0];
                    setThemeState(fallbackTheme);
                    document.documentElement.className = "";
                    document.documentElement.classList.add(fallbackTheme);
                    try {
                        localStorage.setItem(getStorageKey(), fallbackTheme);
                    } catch (e) {
                        // Unsupported
                    }
                    return;
                }

                setThemeState(newTheme);
                document.documentElement.className = "";
                document.documentElement.classList.add(newTheme);
                if (!shouldRender) {
                    setShouldRender(true);
                }
                try {
                    localStorage.setItem(getStorageKey(), newTheme);
                } catch (e) {
                    // Unsupported
                }
            },
            [themeState, themeList]
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
