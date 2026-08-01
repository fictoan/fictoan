// REACT CORE ==========================================================================================================
import React, { useCallback, useEffect, useState } from "react";

// ELEMENT =============================================================================================================
import { CommonAndHTMLProps } from "../Element/constants";
import { Element } from "$element";

const DEFAULT_STORAGE_KEY = "fictoan-theme";
let hasWarnedDefaultKey = false;

/** Options for the theme setter. */
export interface SetThemeOptions {
    /** Crossfade between themes via the View Transitions API. Defaults to `true`;
     *  pass `false` for an instant switch (used internally on mount, where the
     *  no-flash script has already painted the theme so there's nothing to
     *  crossfade). */
    animate ? : boolean;
}

/** The theme setter: the same call shape as a React state dispatcher, plus an
 *  optional `options` arg to control the crossfade. */
type SetThemeFunction = (value: React.SetStateAction<string>, options?: SetThemeOptions) => void;

// Create a tuple type for the theme context
type ThemeContextType = [string, SetThemeFunction];

const defaultContext: ThemeContextType = ["", () => {}];
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
    /** localStorage key the theme is persisted under. Defaults to "fictoan-theme"; pass a unique
     *  value (your package.json name works well) when multiple Fictoan apps can share an origin
     *  (e.g. localhost during dev, GitHub Pages) so their themes don't collide. */
    storageKey ? : string;
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
    ({ currentTheme, themeList, children, nonce, storageKey, ...props }: ThemeProviderProps, ref: React.Ref<ThemeProviderElementType>) => {
        const resolvedKey = storageKey ?? DEFAULT_STORAGE_KEY;
        const [themeState, setThemeState] = useState<string>(() =>
            getTheme(resolvedKey) || currentTheme);

        const setTheme = useCallback(
            (value: React.SetStateAction<string>, options?: SetThemeOptions) => {
                const animate = options?.animate ?? true;

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
                // themes without writing animation CSS. Falls back to an instant
                // change when the API is unavailable or animation is opted out.
                const applyClass = () => {
                    document.documentElement.className = "";
                    document.documentElement.classList.add(finalTheme);
                };

                const doc = typeof document !== "undefined"
                    ? document as Document & {
                        startViewTransition ? : (cb: () => void) => { ready ? : Promise<unknown> };
                    }
                    : null;

                if (animate && doc && typeof doc.startViewTransition === "function") {
                    // A skipped transition (overlapping toggles, a hidden tab)
                    // rejects the ViewTransition's `ready` promise; left unhandled
                    // it logs "Transition was aborted because of invalid state".
                    // Swallow that expected rejection so it doesn't reach the console.
                    const transition = doc.startViewTransition(applyClass);
                    transition?.ready?.catch(() => {});
                } else if (typeof document !== "undefined") {
                    applyClass();
                }

                setThemeState(finalTheme);
                try {
                    localStorage.setItem(resolvedKey, finalTheme);
                } catch (e) {
                    // Unsupported
                }
            },
            [themeState, themeList, resolvedKey]
        );

        useEffect(() => {
            const theme = getTheme(resolvedKey);
            // Apply instantly on mount: the no-flash <script> has already painted
            // this theme before hydration, so a crossfade here has identical
            // before/after snapshots and only fires a spurious aborted transition
            // (noisy on every dev Fast Refresh). setTheme still runs so an invalid
            // persisted theme is sanitised against themeList.
            setTheme(theme || currentTheme, { animate: false });

            if (
                storageKey === undefined && !hasWarnedDefaultKey &&
                typeof process !== "undefined" && process.env?.NODE_ENV !== "production"
            ) {
                hasWarnedDefaultKey = true;
                console.warn(
                    `[fictoan-react] ThemeProvider is persisting the theme to the default localStorage ` +
                    `key "${DEFAULT_STORAGE_KEY}". If more than one Fictoan app can share an origin (e.g. ` +
                    `localhost during dev, GitHub Pages), pass a unique \`storageKey\` (your package.json ` +
                    `name works well) so their themes don't collide.`,
                );
            }
        }, [currentTheme, setTheme, resolvedKey, storageKey]);

        // No-flash pre-hydration script: set the persisted theme class on <html>
        // before first paint, so the (un-gated, SSR-rendered) children don't flash
        // the default theme. Reads the same storageKey as the component; falls back
        // to currentTheme. Inline → strict-CSP consumers should pass a `nonce`.
        // SSR/SSG: runs during initial HTML parse; pure CSR: a no-op (the mount
        // effect applies the theme).
        const noFlashScript =
            `(function(){try{var t=localStorage.getItem(${JSON.stringify(resolvedKey)})` +
            `||${JSON.stringify(currentTheme)};` +
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
