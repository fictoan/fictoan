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
    /** Pass your CSP nonce so the no-flash inline script is allowed under a strict `script-src`. */
    nonce      ? : string;
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
    ({ currentTheme, themeList, children, nonce, ...props }: ThemeProviderProps, ref: React.Ref<ThemeProviderElementType>) => {
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
                try {
                    localStorage.setItem(getStorageKey(), finalTheme);
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

        // No-flash pre-hydration script: set the persisted theme class on <html>
        // before first paint, so the (un-gated, SSR-rendered) children don't flash
        // the default theme. Mirrors getStorageKey(); falls back to currentTheme.
        // Inline → strict-CSP consumers should pass a `nonce`. SSR/SSG: runs during
        // initial HTML parse; pure CSR: a no-op (the mount effect applies the theme).
        const noFlashScript =
            `(function(){try{var p=window.location.port,` +
            `k=window.location.hostname.replace(/\\./g,"-")+(p?"-"+p:"")+"-theme",` +
            `t=localStorage.getItem(k)||${JSON.stringify(currentTheme)};` +
            `if(t){document.documentElement.className=t;}}catch(e){}})();`;

        return (
            <ThemeContext.Provider value={[themeState, setTheme]}>
                <script nonce={nonce} dangerouslySetInnerHTML={{ __html: noFlashScript }} />
                <Element<ThemeProviderElementType> as="div" data-theme-provider ref={ref} {...props}>
                    {children}
                </Element>
            </ThemeContext.Provider>
        );
    }
);
ThemeProvider.displayName = "ThemeProvider";
