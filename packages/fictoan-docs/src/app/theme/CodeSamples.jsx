// CSS THEMES SETUP ////////////////////////////////////////////////////////////////////////////////////////////////////
export const sampleThemeFile1 = `/* File 1 — styles/theme-light.css */
.theme-light {
    --body-bg : var(--white);
}`;

export const sampleThemeFile2 = `/* File 2 — styles/theme-dark.css */
.theme-dark {
    --body-bg : var(--black);
}`;

export const sampleThemeFile3 = `/* File 3 — styles/company-x-theme.css */
.company-x-theme {
    --body-bg : var(--brand-bg-colour);
}`;

// THEME PROVIDER SETUP ////////////////////////////////////////////////////////////////////////////////////////////////
export const sampleThemeProviderSetup = `import React from "react";
import { ThemeProvider } from "fictoan-react"; // 1. Import ThemeProvider

// 2. Import main Fictoan CSS
import "fictoan-react/dist/index.css";

// 3. Import theme files
import "../styles/theme-light.css";
import "../styles/theme-dark.css";
import "../styles/company-x-theme.css";

export const RootClientSideLayout = ({ children }) => {
    // 4. Create a themes array, based on the class names
    const listOfThemes = ["theme-light", "theme-dark, "company-x-theme"];
    
    return (
        <ThemeProvider
            themeList={listOfThemes} // 5. Pass the themes array
            currentTheme="theme-light" // 6. Pass a default theme
        >
            {children}
        </ThemeProvider>
    );
};`;

// COMPONENT WITH THEME TOGGLE /////////////////////////////////////////////////////////////////////////////////////////
export const sampleSwitcherSetup = `import React from "react";
// 7. Import useTheme
import { ThemeProvider, useTheme } from "fictoan-react";

import "fictoan-react/dist/index.css";

import "../styles/theme-light.css";
import "../styles/theme-dark.css";
import "../styles/company-x-theme.css";

export const RootClientSideLayout = ({ children }) => {
    // 8. Create an array of the themes, based on the class names
    const listOfThemes = ["theme-light", "theme-dark", "company-x-theme"];
    
    // 9. Create a component to toggle between themes
    const ThemeButtons = () => {
        const [ theme, setTheme ] = useTheme();
        return (
            <>
                {/* 9a. Direct usage ============================== */}
                <Button onClick={() => setTheme("theme-light")}>
                    Set light theme
                </Button>
                <Button onClick={() => setTheme("theme-dark")}>
                    Set dark theme
                </Button>
                <Button onClick={() => setTheme("theme-test")}>
                    Set test theme
                </Button>

                {/* #### OR #### */}

                {/* 9b. Toggle between two themes ================== */}
                <button onClick={() => setTheme(prevTheme => 
                    prevTheme === "theme-light" ? "theme-dark" : "theme-light"
                )}>
                    Toggle Theme
                </button>
            </>
        );
    };

    return (
        <ThemeProvider
            themeList={listOfThemes}
            currentTheme="theme-light"
        >
            // 10. Put it inside the ThemeProvider
            <ThemeButtons />

            {children}
        </ThemeProvider>
    );
};`;













// GLOBAL VARIABLES ////////////////////////////////////////////////////////////////////////////////////////////////////
export const sampleThemeGlobals = `--global-border-radius : 8px;
--global-border-width  : 1px;
--global-focus-colour  : var(--blue);

--nano   : 8px;
--micro  : 24px;
--tiny   : 2vmax;
--small  : 4vmax;
--medium : 8vmax;
--large  : 16vmax;
--huge   : 24vmax;`;


// FULL THEME //////////////////////////////////////////////////////////////////////////////////////////////////////////
export const sampleFictoanTheme = `/* ACCORDION //////////////////////////////////////////////////////////////// */
:root {
    --accordion-chevron : var(--slate);
}

/* BADGE //////////////////////////////////////////////////////////////////// */
:root {
    --badge-font          : var(--paragraph-font);
    --badge-bg            : var(--blue-light60);
    --badge-text          : var(--blue-dark20);

    --badge-border        : var(--blue);
    --badge-border-radius : var(--global-border-radius);
    --badge-border-width  : var(--global-border-width);
}

/* BODY ///////////////////////////////////////////////////////////////////// */
:root {
    --body-bg : var(--white);
}

/* BREADCRUMBS ////////////////////////////////////////////////////////////// */
:root {
    --breadcrumbs-wrapper-bg           : var(--transparent);

    --breadcrumb-item-text             : var(--link-text-default);
    --breadcrumb-item-text-active      : var(--paragraph-text-colour);

    --breadcrumb-item-separator-colour : var(--slate-light10);
}

/* BUTTON /////////////////////////////////////////////////////////////////// */
:root {
    --button-font                             : var(--font-sans-serif);

    /* PRIMARY BUTTON ======================================================= */
    --button-primary-font                     : var(--font-sans-serif);
    --button-primary-bg-default               : var(--blue);
    --button-primary-text-default             : var(--white);
    --button-primary-border-default           : var(--blue);
    --button-primary-border-width-default     : var(--global-border-width);
    --button-primary-border-radius-default    : var(--global-border-radius);

    --button-primary-bg-hover                 : var(--blue-light10);
    --button-primary-text-hover               : var(--white);
    --button-primary-border-hover             : var(--blue-dark30);
    --button-primary-border-width-hover       : var(--global-border-width);
    --button-primary-border-radius-hover      : var(--global-border-radius);

    --button-primary-bg-active                : var(--blue-light20);
    --button-primary-text-active              : var(--white);
    --button-primary-border-active            : var(--blue-dark40);
    --button-primary-border-width-active      : var(--global-border-width);
    --button-primary-border-radius-active     : var(--global-border-radius);

    --button-primary-spinner-loading          : var(--white);

    --button-primary-bg-disabled              : var(--blue-light10);
    --button-primary-text-disabled            : var(--white);
    --button-primary-border-disabled          : var(--blue-light10);
    --button-primary-border-width-disabled    : var(--global-border-width);
    --button-primary-border-radius-disabled   : var(--global-border-radius);


    /* SECONDARY BUTTON ===================================================== */
    --button-secondary-font                   : var(--font-sans-serif);
    --button-secondary-bg-default             : var(--blue-light50);
    --button-secondary-text-default           : var(--blue);
    --button-secondary-border-default         : var(--blue-light50);
    --button-secondary-border-width-default   : var(--global-border-width);
    --button-secondary-border-radius-default  : var(--global-border-radius);

    --button-secondary-bg-hover               : var(--blue-light40);
    --button-secondary-text-hover             : var(--blue);
    --button-secondary-border-hover           : var(--blue-light40);
    --button-secondary-border-width-hover     : var(--global-border-width);
    --button-secondary-border-radius-hover    : var(--global-border-radius);

    --button-secondary-bg-active              : var(--blue-light50);
    --button-secondary-text-active            : var(--blue);
    --button-secondary-border-active          : var(--blue-light50);
    --button-secondary-border-width-active    : var(--global-border-width);
    --button-secondary-border-radius-active   : var(--global-border-radius);

    --button-secondary-spinner-loading        : var(--blue);

    --button-secondary-bg-disabled            : var(--blue-light10);
    --button-secondary-text-disabled          : var(--white);
    --button-secondary-border-disabled        : var(--blue-light10);
    --button-secondary-border-width-disabled  : var(--global-border-width);
    --button-secondary-border-radius-disabled : var(--global-border-radius);


    /* TERTIARY BUTTON ====================================================== */
    --button-tertiary-font                    : var(--font-sans-serif);
    --button-tertiary-bg-default              : var(--transparent);
    --button-tertiary-text-default            : var(--blue);
    --button-tertiary-border-default          : var(--blue);
    --button-tertiary-border-width-default    : var(--global-border-width);
    --button-tertiary-border-radius-default   : var(--global-border-radius);

    --button-tertiary-bg-hover                : var(--blue-light80);
    --button-tertiary-text-hover              : var(--blue);
    --button-tertiary-border-hover            : var(--blue-light20);
    --button-tertiary-border-width-hover      : var(--global-border-width);
    --button-tertiary-border-radius-hover     : var(--global-border-radius);

    --button-tertiary-bg-active               : var(--blue-light70);
    --button-tertiary-text-active             : var(--blue);
    --button-tertiary-border-active           : var(--blue-light30);
    --button-tertiary-border-width-active     : var(--global-border-width);
    --button-tertiary-border-radius-active    : var(--global-border-radius);

    --button-tertiary-spinner-loading         : var(--blue);

    --button-tertiary-bg-disabled             : var(--blue-light10);
    --button-tertiary-text-disabled           : var(--white);
    --button-tertiary-border-disabled         : var(--blue-light10);
    --button-tertiary-border-width-disabled   : var(--global-border-width);
    --button-tertiary-border-radius-disabled  : var(--global-border-radius);


    /* ROUND BUTTON ========================================================= */
    --button-round-size-tiny                  : 24px;
    --button-round-size-small                 : 32px;
    --button-round-size-medium                : 64px;
    --button-round-size-large                 : 80px;
    --button-round-size-huge                  : 128px;
}

/* CALLOUT ////////////////////////////////////////////////////////////////// */
:root {
    --callout-border-radius  : var(--global-border-radius);
    --callout-border-width   : var(--nano);

    --callout-info-bg        : var(--blue-light60);
    --callout-info-border    : var(--blue-dark20);

    --callout-success-bg     : var(--green-light60);
    --callout-success-border : var(--green-dark20);

    --callout-warning-bg     : var(--amber-light60);
    --callout-warning-border : var(--amber-dark10);

    --callout-error-bg       : var(--red-light60);
    --callout-error-border   : var(--red-dark10);
}

/* CARD ///////////////////////////////////////////////////////////////////// */
:root {
    --card-bg            : var(--white);
    --card-border        : var(--slate);
    --card-border-radius : var(--global-border-radius);
    --card-border-width  : var(--global-border-width);
}

/* CHECKBOX //////////////////////////////////////////////////////////////// */
:root {
    --checkbox-square-border-radius : 4px;

    --checkbox-square-bg-default    : var(--slate-light60);
    --checkbox-square-bg-hover      : var(--slate-light40);
    --checkbox-square-bg-checked    : var(--hue);
    --checkbox-square-bg-disabled   : var(--slate-light90);

    --checkbox-tick                 : var(--white);
}

/* DRAWER /////////////////////////////////////////////////////////////////// */
:root {
    --drawer-bg              : var(--white);
    --drawer-border          : var(--slate-light20);
    --drawer-border-radius   : var(--global-border-radius);

    --drawer-overlay-bg      : var(--black);
    --drawer-overlay-opacity : 0.4;
    --drawer-overlay-blur    : 4px;

    --drawer-dismiss-button  : var(--slate-light40);
}

/* DIVIDER ////////////////////////////////////////////////////////////////// */
:root {
    --divider-height           : 1px;
    --divider-bg               : var(--slate);

    --divider-primary-height   : 4px;
    --divider-primary-bg       : var(--slate);

    --divider-secondary-height : 2px;
    --divider-secondary-bg     : var(--slate-light20);

    --divider-tertiary-height  : 1px;
    --divider-tertiary-bg      : var(--slate-light60);
}

/* FILE UPLOAD ////////////////////////////////////////////////////////////// */
:root {

    --file-upload-area-bg-default        : var(--input-bg-default);
    --file-upload-area-border-default    : var(--input-border-default);
    --file-upload-area-main-text-default : var(--input-label-default);

    --file-upload-area-bg-hover          : var(--button-secondary-bg-hover);
    --file-upload-area-border-hover      : var(--button-secondary-border-default);
    --file-upload-area-main-text-hover   : var(--button-secondary-text-default);
}

/* INPUT FIELD ////////////////////////////////////////////////////////////// */
:root {
    --input-padding                   : 12px;
    --input-icon-size                 : 24px;

    --input-bg-default                : var(--white);
    --input-border-default            : var(--slate-light40);
    --input-border-radius-default     : var(--global-border-radius);
    --input-border-width-default      : var(--global-border-width);

    --input-label-default             : var(--paragraph-text-colour);
    --input-placeholder-default       : var(--slate-light40);
    --input-text-default              : var(--paragraph-text-colour);

    --input-bg-focus                  : var(--white);
    --input-border-focus              : var(--slate-light40);
    --input-border-width-focus        : var(--global-border-width);
    --input-text-focus                : var(--shade);

    --input-bg-valid                  : var(--white);
    --input-border-valid              : var(--green-dark30);
    --input-label-valid               : var(--shade);

    --input-bg-invalid                : var(--red-light60);
    --input-border-invalid            : var(--red-dark30);
    --input-label-invalid             : var(--red);
    --input-text-invalid              : var(--red);
    --input-error-text-invalid        : var(--red);

    --input-bg-disabled               : var(--slate-light40);
    --input-border-disabled           : var(--slate-light40);
    --input-label-disabled            : var(--slate-dark40);
    --input-text-disabled             : var(--slate-dark60);

    --input-bg-read-only              : var(--slate-light40);
    --input-border-read-only          : var(--slate-light40);
    --input-label-read-only           : var(--slate-dark40);
    --input-text-read-only            : var(--slate-dark60);

    --input-required-indicator        : var(--red);

    --input-helptext                  : var(--slate-dark40);
    --input-helptext-scale            : 88%;

    --input-inner-text-left-default   : var(--slate);
    --input-inner-text-right-default  : var(--slate);
    --input-inner-icon-left-default   : var(--slate);
    --input-inner-icon-right-default  : var(--slate);

    --input-inner-text-left-focus     : var(--slate-light70);
    --input-inner-text-right-focus    : var(--slate-light70);
    --input-inner-icon-left-focus     : var(--slate-light70);
    --input-inner-icon-right-focus    : var(--slate-light70);

    --input-inner-text-left-disabled  : var(--slate-dark40);
    --input-inner-text-right-disabled : var(--slate-dark40);
    --input-inner-icon-left-disabled  : var(--slate-dark40);
    --input-inner-icon-right-disabled : var(--slate-dark40);
}

/* LIST BOX ///////////////////////////////////////////////////////////////// */
:root {
    --list-box-bg-default    : var(--input-bg-default);
    --list-box-bg-hover      : var(--input-bg-focus);
    --list-box-bg-disabled   : var(--input-bg-disabled);

    --list-box-text-disabled : var(--input-text-disabled);
    --list-box-focus-color   : var(--input-border-focus);

    --list-box-badge-bg      : var(--slate-light20);
    --list-box-badge-text    : var(--paragraph-text-colour);
}

/* METER //////////////////////////////////////////////////////////////////// */
:root {
    --meter-bg                   : var(--slate-light70);
    --meter-border               : var(--slate-light40);
    --meter-border-width         : var(--global-border-width);
    --meter-border-radius        : var(--global-border-radius);
    --meter-height               : 8px;

    --meter-label                : var(--paragraph-text-colour);
    --meter-value                : var(--paragraph-text-colour);

    --meter-danger               : var(--red-light10);
    --meter-low                  : var(--amber-light10);
    --meter-high                 : var(--green-dark10);

    --meter-optimum-marker-width : 3px;
    --meter-optimum-marker-bg    : var(--blue);
}

/* MODAL //////////////////////////////////////////////////////////////////// */
:root {
    --modal-backdrop-bg      : var(--black);
    --modal-backdrop-opacity : 0.4;
    --modal-backdrop-blur    : 4px;
}

/* NOTIFICATIONS //////////////////////////////////////////////////////////// */
:root {
    --notification-item-border-radius  : var(--global-border-radius);

    --notification-item-generic-bg     : var(--white);
    --notification-item-generic-border : var(--slate-light60);
    --notification-item-generic-text   : var(--shade);

    --notification-item-info-bg        : var(--blue-light60);
    --notification-item-info-border    : var(--blue);

    --notification-item-error-bg       : var(--red-light60);
    --notification-item-error-border   : var(--red);

    --notification-item-success-bg     : var(--green-light60);
    --notification-item-success-border : var(--green);

    --notification-item-warning-bg     : var(--amber-light60);
    --notification-item-warning-border : var(--amber);
}

/* OPTION CARDS ///////////////////////////////////////////////////////////// */
:root {
    --option-card-border-width       : var(--global-border-width);

    --option-card-focus              : var(--global-focus-colour);

    --option-card-bg-hover           : var(--green-light70-opacity40);
    --option-card-border-hover       : var(--green-light40);
    --option-card-tick-bg-hover      : var(--green-light60-opacity30);
    --option-card-tick-line-hover    : var(--green);

    --option-card-bg-selected        : var(--green-light60);
    --option-card-border-selected    : var(--green);
    --option-card-tick-bg-selected   : var(--green-dark10);
    --option-card-tick-line-selected : var(--white);

    --option-card-cross-bg           : var(--red-light40);
    --option-card-cross-line         : var(--white);
}

/* PAGINATION /////////////////////////////////////////////////////////////// */
:root {
    --pagination-info-text                     : var(--paragraph-text-colour);
    --pagination-info-font                     : var(--paragraph-font);

    --pagination-item-height                   : 32px;
    --pagination-item-min-width                : 32px;
    --pagination-item-border-width             : var(--global-border-width);
    --pagination-item-border-radius            : var(--global-border-radius);

    /* PLAIN ================================================================ */
    --pagination-item-bg-default               : var(--transparent);
    --pagination-item-border-default           : var(--transparent);
    --pagination-item-text-default             : var(--paragraph-text-colour);

    --pagination-item-bg-hover                 : var(--transparent);
    --pagination-item-border-hover             : var(--transparent);
    --pagination-item-text-hover               : var(--paragraph-text-colour);

    --pagination-item-bg-selected              : var(--transparent);
    --pagination-item-border-selected          : var(--transparent);
    --pagination-item-text-selected            : var(--blue);

    --pagination-arrows-stroke                 : var(--slate);

    /* OUTLINED ============================================================= */
    --pagination-item-outlined-bg-default      : var(--transparent);
    --pagination-item-outlined-border-default  : var(--blue);
    --pagination-item-outlined-text-default    : var(--blue);

    --pagination-item-outlined-bg-hover        : var(--transparent);
    --pagination-item-outlined-border-hover    : var(--blue-light60);
    --pagination-item-outlined-text-hover      : var(--blue-light60);

    --pagination-item-outlined-bg-selected     : var(--transparent);
    --pagination-item-outlined-border-selected : var(--blue);
    --pagination-item-outlined-text-selected   : var(--blue);

    --pagination-arrows-outlined-stroke        : var(--slate);

    /* FILLED =============================================================== */
    --pagination-item-filled-bg-default        : var(--blue-light80);
    --pagination-item-filled-border-default    : var(--blue-light80);
    --pagination-item-filled-text-default      : var(--blue);

    --pagination-item-filled-bg-hover          : var(--blue-light40);
    --pagination-item-filled-border-hover      : var(--blue-light40);
    --pagination-item-filled-text-hover        : var(--blue);

    --pagination-item-filled-bg-selected       : var(--blue);
    --pagination-item-filled-border-selected   : var(--blue);
    --pagination-item-filled-text-selected     : var(--white);

    --pagination-arrows-filled-stroke          : var(--slate);

    --pagination-item-bg-disabled              : var(--transparent);
    --pagination-item-text-disabled            : var(--transparent);
    --pagination-item-border-disabled          : var(--transparent);
    --pagination-arrows-stroke-disabled        : var(--slate-opacity40);

    --pagination-input-bg                      : var(--input-bg-default);
    --pagination-input-border                  : var(--input-border-default);
    --pagination-input-text                    : var(--input-text-default);
}

/* PROGRESS BAR ///////////////////////////////////////////////////////////// */
:root {
    --progress-bar-bg            : var(--slate-light70);
    --progress-bar-fill          : var(--hue);
    --progress-bar-label         : var(--paragraph-text-colour);
    --progress-bar-value         : var(--paragraph-text-colour);
    --progress-bar-border-radius : var(--global-border-radius);
    --progress-bar-height        : 8px;
}

/* RADIO BUTTON ///////////////////////////////////////////////////////////// */
:root {
    /* GENERIC RADIO BUTTON ================================================= */
    --radio-circle-bg-default          : var(--slate-light60);
    --radio-circle-bg-hover            : var(--slate-light40);
    --radio-circle-bg-checked          : var(--hue);
    --radio-circle-bg-disabled         : var(--slate-light90);

    --radio-button-dot                 : var(--white);

    /* RADIO GROUP TABS ===================================================== */
    --radio-tabs-height                : 48px;
    --radio-tabs-vertical-gap          : 4px;
    --radio-tabs-bg                    : var(--input-bg-default);
    --radio-tabs-border                : var(--input-bg-default);

    --radio-tabs-label-text-default    : var(--input-text-default);

    --radio-tabs-label-text-hover      : var(--slate-dark80);
    --radio-tabs-label-bg-hover        : var(--slate-light90-opacity40);

    --radio-tabs-label-bg-active       : var(--white);
    --radio-tabs-label-text-active     : var(--black);

    --radio-tabs-label-focus-border    : var(--blue);

    --radio-tabs-scroll-button-default : var(--slate-light10-opacity30);
    --radio-tabs-scroll-arrow-default  : var(--white);

    --radio-tabs-scroll-button-hover   : var(--white);
    --radio-tabs-scroll-arrow-hover    : var(--white);
}

/* RANGE //////////////////////////////////////////////////////////////////// */
:root {
    --range-label         : var(--input-label-default);
    --range-value         : var(--input-label-default);

    --range-track-bg      : var(--slate-light70);
    --range-thumb-bg      : var(--blue-light20);
    --range-thumb-border  : var(--blue-light20);

    --range-border-focus  : var(--blue);
    --range-outline-focus : var(--blue);
}

/* SELECT /////////////////////////////////////////////////////////////////// */
:root {
    --select-chevron : var(--slate-light40);
}

/* SIDEBAR + CONTENT WRAPPER //////////////////////////////////////////////// */
:root {
    --sidebar-bg                             : var(--white);
    --sidebar-width-default                  : 240px;
    --sidebar-width-collapsed                : 48px;

    --sidebar-border-width                   : var(--global-border-width);
    --sidebar-border-right                   : var(--slate-dark80);

    --sidebar-header-bg                      : var(--white);
    --sidebar-header-border-bottom           : var(--slate-dark80);
    --sidebar-header-asset-expanded-width    : 50%;
    --sidebar-header-asset-collapsed-width   : 40px;

    --sidebar-item-icon-width                : 24px;

    --sidebar-item-icon-stroke-default       : var(--slate-dark40);
    --sidebar-item-icon-stroke-width-default : 2px;
    --sidebar-item-icon-fill-default         : var(--slate-light40);
    --sidebar-item-text-colour-default       : var(--slate-light40);

    --sidebar-item-bg-hover                  : var(--grey-dark70);
    --sidebar-item-text-hover                : var(--hue);
    --sidebar-item-icon-stroke-hover         : var(--slate-dark30);
    --sidebar-item-icon-fill-hover           : var(--slate-dark30);

    --sidebar-item-bg-active                 : var(--grey-dark60);
    --sidebar-item-text-active               : var(--grey-light40);
    --sidebar-item-border-active             : var(--blue);
    --sidebar-item-icon-fill-active          : var(--slate);
    --sidebar-item-icon-stroke-active        : var(--slate);
    --sidebar-item-active-indicator-width    : 2px;

    --sidebar-item-default-link-bg           : var(--white);
    --sidebar-item-default-link-text         : var(--shade);
    --sidebar-item-text-scale                : 100%;
    --sidebar-item-text-weight               : 600;

    --sidebar-item-alert-bg                  : var(--red);

    --sidebar-footer-height                  : 40px;
    --sidebar-footer-bg                      : var(--white);
    --sidebar-footer-border-top              : var(--slate-light10);

    --sidebar-collapsed-item-link-text       : var(--white);
    --sidebar-collapsed-item-bg              : var(--hue);
    --sidebar-collapsed-item-border-radius   : var(--global-border-radius);
}

/* SKELETON ///////////////////////////////////////////////////////////////// */
:root {
    --skeleton-bg        : var(--slate-light40);
    --skeleton-highlight : var(--slate-light60);
}

/* SPINNER ////////////////////////////////////////////////////////////////// */
:root {
    --spinner-border : var(--hue);
}

/* SWITCH /////////////////////////////////////////////////////////////////// */
:root {
    --switch-bg-default         : var(--slate-light60);
    --switch-bg-hover           : var(--slate-light40);
    --switch-bg-checked         : var(--hue);
    --switch-bg-disabled        : var(--slate-light40);

    --switch-slider-bg-default  : var(--white);
    --switch-slider-bg-hover    : var(--white);
    --switch-slider-bg-checked  : var(--white);
    --switch-slider-bg-disabled : var(--slate-light40);
}

/* TABLE //////////////////////////////////////////////////////////////////// */
:root {
    --table-bg                           : var(--white);
    --table-border                       : var(--slate-light10);
    --table-font                         : var(--paragraph-font);
    --table-text                         : var(--paragraph-text-colour);

    --table-striped-header-bg            : var(--blue-light40);
    --table-striped-cell-bg              : var(--slate-light70);

    --table-highlight-bg                 : var(--amber-light20);
    --table-highlight-text               : var(--paragraph-text-colour);

    --table-pagination-bg                : var(--white);
    --table-pagination-border-radius     : var(--global-border-radius);
    --table-pagination-text              : var(--paragraph-text-colour);
    --table-pagination-nav-icon-bg-hover : var(--slate-dark60);
}

/* TABS ///////////////////////////////////////////////////////////////////// */
:root {
    --tabs-bg                : var(--transparent);

    --tab-label-default      : var(--paragraph-text-colour);
    --tab-label-hover        : var(--blue-light40);
    --tab-label-active       : var(--blue);
    --tab-label-disabled     : var(--slate-light40);

    --tab-border-active      : var(--blue);

    --tab-alert-badge-bg     : var(--red);
    --tab-alert-badge-border : var(--red);
}

/* TEXTAREA ///////////////////////////////////////////////////////////////// */
:root {
    --textarea-limit-warning : var(--amber);
    --textarea-limit-error   : var(--input-error-text-invalid);
}

/* TEXT ///////////////////////////////////////////////////////////////////// */
/* To compute fluid font sizes based on screen size */
:root {
    --screen-width-min : 320;
    --screen-width-max : 1600;
    --font-size-min    : 16;
    --font-size-max    : 20;
    --scale-ratio-min  : 1.08;
    --scale-ratio-max  : 1.12;
}

:root {
    /* GENERICS ============================================================= */
    --font-sans-serif                : sans-serif;
    --font-serif                     : serif;
    --font-mono                      : monospace;

    /* PARAGRAPHS =========================================================== */
    --paragraph-font                 : var(--font-sans-serif);
    --paragraph-font-size            : var(--text-medium);
    --paragraph-line-height          : 1.2;
    --paragraph-font-weight          : 400;
    --paragraph-text-colour          : var(--grey);

    --paragraph-subtext-colour       : var(--slate-dark30);
    --paragraph-subtext-size         : calc(var(--paragraph-font-size) * 0.8);

    /* HEADINGS ============================================================= */
    --heading-font                   : var(--font-sans-serif);
    --heading-text-colour            : var(--slate);
    --heading-font-weight            : 700;
    --heading-line-height            : 1;

    /* LINKS ================================================================ */
    --link-font                      : var(--paragraph-font);
    --link-text-default              : var(--blue);
    --link-text-hover                : var(--blue);

    /* SELECTION ============================================================ */
    --text-selected                  : var(--white);
    --text-bg-selected               : var(--hue);

    /* CODE ================================================================= */
    --code-font                      : var(--font-mono);
    --code-inline-font-size          : 0.8rem;
    --code-inline-bg                 : var(--blue-light80);
    --code-inline-text               : var(--blue-dark40);
    --code-inline-border-radius      : var(--global-border-radius);

    --code-block-font-size           : 0.92rem;
    --code-block-bg                  : var(--slate-dark80);
    --code-block-text                : var(--sky-light60);
    --code-block-line-height         : 1.8;
    --code-block-border-radius       : var(--global-border-radius);

    --code-block-line-numbers        : var(--slate-dark30);

    --code-block-copy-button-bg      : var(--transparent);
    --code-block-copy-button-text    : var(--blue);
    --code-block-copy-button-border  : var(--blue-light40);

    --code-block-copied-badge-bg     : var(--green-light80);
    --code-block-copied-badge-text   : var(--green-dark20);
    --code-block-copied-badge-border : var(--green-dark20);

    /* KBD ================================================================== */
    --kbd-font                       : var(--font-mono);
    --kbd-bg                         : var(--grey-light10);
    --kbd-text                       : var(--grey);
    --kbd-text-outline               : var(--transparent);
    --kbd-shadow                     : var(--slate);
    --kbd-border-radius              : var(--global-border-radius);

    /* TOKENS =============================================================== */
    --token-atrule                   : var(--teal);
    --token-attrName                 : var(--orange);
    --token-attrValue                : var(--green);
    --token-boolean                  : var(--green);
    --token-builtin                  : var(--violet-light20);
    --token-cdata                    : var(--grey);
    --token-className                : var(--red);
    --token-comment                  : var(--grey);
    --token-constant                 : var(--green);
    --token-deleted                  : var(--slate);
    --token-delimiter                : var(--grey);
    --token-doctype                  : var(--amber-light10);
    --token-entity                   : var(--green);
    --token-function                 : var(--orange);
    --token-hexcode                  : var(--white);
    --token-important                : var(--red);
    --token-imports                  : var(--sky-light60);
    --token-inserted                 : var(--green);
    --token-italic                   : var(--green);
    --token-keyword                  : var(--violet-light20);
    --token-name                     : var(--green);
    --token-namespace                : var(--green);
    --token-number                   : var(--crimson-dark10);
    --token-operator                 : var(--amber);
    --token-plain                    : var(--slate-light60);
    --token-plain-html               : var(--slate);
    --token-plain-css                : var(--salmon-light30);
    --token-function-css             : var(--pistachio);
    --token-pseudo-class             : var(--brick);
    --token-prolog                   : var(--grey);
    --token-property                 : var(--pistachio-dark20);
    --token-property-css             : var(--slate);
    --token-punctuation              : var(--grey);
    --token-regex                    : var(--green);
    --token-selector-generic         : var(--green-light20);
    --token-selector-class           : var(--violet-light20);
    --token-selector-id              : var(--violet-light40);
    --token-selector-attrName        : var(--blue-dark20);
    --token-selector-attrValue       : var(--blue-light20);
    --token-selector-operator        : var(--token-operator);
    --token-selector-punctuation     : var(--grey);
    --token-string                   : var(--grey-light50);
    --token-string-json              : var(--slate);
    --token-symbol                   : var(--green);
    --token-tag                      : var(--violet);
    --token-unit                     : var(--crimson-light20);
    --token-url                      : var(--green);
    --token-variable                 : var(--orange);
}

/* TOAST //////////////////////////////////////////////////////////////////// */
:root {
    --toast-bg            : var(--slate-light10);
    --toast-text          : var(--black);
    --toast-border-radius : var(--global-border-radius);
}

/* TOOLTIP ////////////////////////////////////////////////////////////////// */
:root {
    --tooltip-bg            : var(--slate-dark80);
    --tooltip-text          : var(--white);
    --tooltip-border-radius : var(--global-border-radius);
    --tooltip-max-width     : 200px;
}`;
