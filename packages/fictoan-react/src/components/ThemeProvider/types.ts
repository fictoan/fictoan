import * as React from "react";
import type { SetThemeOptions } from "./ThemeProvider";

export interface UseThemeProps {
    /** Update the theme. Accepts a value or updater function (like a React state
     *  setter), plus optional `{ animate }` to control the View Transitions crossfade. */
    setTheme: (value: React.SetStateAction<string>, options?: SetThemeOptions) => void;
    /** Active theme name */
    theme?: string | undefined;
}
