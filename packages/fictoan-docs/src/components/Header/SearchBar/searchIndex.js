// Import icons
import AccordionIcon from "../../../assets/icons/accordion.svg";
import BadgeIcon from "../../../assets/icons/badge.svg";
import BreadcrumbsIcon from "../../../assets/icons/breadcrumbs.svg";
import ButtonIcon from "../../../assets/icons/button.svg";
import CalloutIcon from "../../../assets/icons/callout.svg";
import CardIcon from "../../../assets/icons/card.svg";
import CheckboxIcon from "../../../assets/icons/checkbox.svg";
import CodeIcon from "../../../assets/icons/braces.svg";
import DrawerIcon from "../../../assets/icons/drawer.svg";
import DividerIcon from "../../../assets/icons/hrule.svg";
import FormWrapperIcon from "../../../assets/icons/form-wrapper.svg";
import InputFieldIcon from "../../../assets/icons/input.svg";
import ListBoxIcon from "../../../assets/icons/list-box.svg";
import ModalIcon from "../../../assets/icons/modal.svg";
import NotificationIcon from "../../../assets/icons/notification.svg";
import PaginationIcon from "../../../assets/icons/pagination.svg";
import PinInputIcon from "../../../assets/icons/pin-input.svg";
import OptionCardsIcon from "../../../assets/icons/option-cards.svg";
import ProgressBarIcon from "../../../assets/icons/progress-bar.svg";
import RadioButtonIcon from "../../../assets/icons/radio-button.svg";
import RangeIcon from "../../../assets/icons/range.svg";
import SelectIcon from "../../../assets/icons/select.svg";
import SidebarIcon from "../../../assets/icons/sidebar.svg";
import SkeletonIcon from "../../../assets/icons/skeleton.svg";
import TableIcon from "../../../assets/icons/table.svg";
import TabsIcon from "../../../assets/icons/tabs.svg";
import ToastIcon from "../../../assets/icons/toast.svg";

// THEME VARIABLES =====================================================================================================
const themeCategories = {
    accordion    : {
        title     : "Accordion",
        variables : [
            {
                name  : "--accordion-chevron",
                value : "var(--slate)",
            },
        ],
    },
    badge        : {
        title     : "Badge",
        variables : [
            {
                name  : "--badge-font",
                value : "var(--paragraph-font)",
            },
            {
                name  : "--badge-border-radius",
                value : "var(--global-border-radius)",
            },
            {
                name  : "--badge-border-width",
                value : "var(--global-border-width)",
            },
            {
                name  : "--badge-bg-default",
                value : "var(--blue-light60)",
            },
            {
                name  : "--badge-text-default",
                value : "var(--blue-dark20)",
            },
        ],
    },
    button       : {
        title     : "Button",
        variables : [
            {
                name  : "--button-font",
                value : "var(--font-sans-serif)",
            },

            // Primary Button - Default state
            {
                name  : "--button-primary-font",
                value : "var(--font-sans-serif)",
            },
            {
                name  : "--button-primary-bg-default",
                value : "var(--blue)",
            },
            {
                name  : "--button-primary-text-default",
                value : "var(--white)",
            },
            {
                name  : "--button-primary-border-default",
                value : "var(--blue)",
            },
            {
                name  : "--button-primary-border-width-default",
                value : "var(--global-border-width)",
            },
            {
                name  : "--button-primary-border-radius-default",
                value : "var(--global-border-radius)",
            },

            // Primary Button - Hover state
            {
                name  : "--button-primary-bg-hover",
                value : "var(--blue-light-10)",
            },
            {
                name  : "--button-primary-text-hover",
                value : "var(--white)",
            },
            {
                name  : "--button-primary-border-hover",
                value : "var(--blue-dark30)",
            },
            {
                name  : "--button-primary-border-width-hover",
                value : "var(--global-border-width)",
            },
            {
                name  : "--button-primary-border-radius-hover",
                value : "var(--global-border-radius)",
            },

            // Primary Button - Active state
            {
                name  : "--button-primary-bg-active",
                value : "var(--blue-light-20)",
            },
            {
                name  : "--button-primary-text-active",
                value : "var(--white)",
            },
            {
                name  : "--button-primary-border-active",
                value : "var(--blue-dark40)",
            },
            {
                name  : "--button-primary-border-width-active",
                value : "var(--global-border-width)",
            },
            {
                name  : "--button-primary-border-radius-active",
                value : "var(--global-border-radius)",
            },

            // Primary Button - Loading state
            {
                name  : "--button-primary-spinner-loading",
                value : "var(--white)",
            },

            // Primary Button - Disabled state
            {
                name  : "--button-primary-bg-disabled",
                value : "var(--blue-light-10)",
            },
            {
                name  : "--button-primary-text-disabled",
                value : "var(--white)",
            },
            {
                name  : "--button-primary-border-disabled",
                value : "var(--blue-light-10)",
            },
            {
                name  : "--button-primary-border-width-disabled",
                value : "var(--global-border-width)",
            },
            {
                name  : "--button-primary-border-radius-disabled",
                value : "var(--global-border-radius)",
            },

            // Secondary Button - Default state
            {
                name  : "--button-secondary-font",
                value : "var(--font-sans-serif)",
            },
            {
                name  : "--button-secondary-bg-default",
                value : "var(--blue-light-50)",
            },
            {
                name  : "--button-secondary-text-default",
                value : "var(--blue)",
            },
            {
                name  : "--button-secondary-border-default",
                value : "var(--blue-light-50)",
            },
            {
                name  : "--button-secondary-border-width-default",
                value : "var(--global-border-width)",
            },
            {
                name  : "--button-secondary-border-radius-default",
                value : "var(--global-border-radius)",
            },

            // Secondary Button - Hover state
            {
                name  : "--button-secondary-bg-hover",
                value : "var(--blue-light-40)",
            },
            {
                name  : "--button-secondary-text-hover",
                value : "var(--blue)",
            },
            {
                name  : "--button-secondary-border-hover",
                value : "var(--blue-light-40)",
            },
            {
                name  : "--button-secondary-border-width-hover",
                value : "var(--global-border-width)",
            },
            {
                name  : "--button-secondary-border-radius-hover",
                value : "var(--global-border-radius)",
            },

            // Secondary Button - Active state
            {
                name  : "--button-secondary-bg-active",
                value : "var(--blue-light-50)",
            },
            {
                name  : "--button-secondary-text-active",
                value : "var(--blue)",
            },
            {
                name  : "--button-secondary-border-active",
                value : "var(--blue-light-50)",
            },
            {
                name  : "--button-secondary-border-width-active",
                value : "var(--global-border-width)",
            },
            {
                name  : "--button-secondary-border-radius-active",
                value : "var(--global-border-radius)",
            },

            // Secondary Button - Loading state
            {
                name  : "--button-secondary-spinner-loading",
                value : "var(--blue)",
            },

            // Secondary Button - Disabled state
            {
                name  : "--button-secondary-bg-disabled",
                value : "var(--blue-light-10)",
            },
            {
                name  : "--button-secondary-text-disabled",
                value : "var(--white)",
            },
            {
                name  : "--button-secondary-border-disabled",
                value : "var(--blue-light-10)",
            },
            {
                name  : "--button-secondary-border-width-disabled",
                value : "var(--global-border-width)",
            },
            {
                name  : "--button-secondary-border-radius-disabled",
                value : "var(--global-border-radius)",
            },

            // Tertiary Button - Default state
            {
                name  : "--button-tertiary-font",
                value : "var(--font-sans-serif)",
            },
            {
                name  : "--button-tertiary-bg-default",
                value : "var(--transparent)",
            },
            {
                name  : "--button-tertiary-text-default",
                value : "var(--blue)",
            },
            {
                name  : "--button-tertiary-border-default",
                value : "var(--blue)",
            },
            {
                name  : "--button-tertiary-border-width-default",
                value : "var(--global-border-width)",
            },
            {
                name  : "--button-tertiary-border-radius-default",
                value : "var(--global-border-radius)",
            },

            // Tertiary Button - Hover state
            {
                name  : "--button-tertiary-bg-hover",
                value : "var(--blue-light-80)",
            },
            {
                name  : "--button-tertiary-text-hover",
                value : "var(--blue)",
            },
            {
                name  : "--button-tertiary-border-hover",
                value : "var(--blue-light-20)",
            },
            {
                name  : "--button-tertiary-border-width-hover",
                value : "var(--global-border-width)",
            },
            {
                name  : "--button-tertiary-border-radius-hover",
                value : "var(--global-border-radius)",
            },

            // Tertiary Button - Active state
            {
                name  : "--button-tertiary-bg-active",
                value : "var(--blue-light-70)",
            },
            {
                name  : "--button-tertiary-text-active",
                value : "var(--blue)",
            },
            {
                name  : "--button-tertiary-border-active",
                value : "var(--blue-light-30)",
            },
            {
                name  : "--button-tertiary-border-width-active",
                value : "var(--global-border-width)",
            },
            {
                name  : "--button-tertiary-border-radius-active",
                value : "var(--global-border-radius)",
            },

            // Tertiary Button - Loading state
            {
                name  : "--button-tertiary-spinner-loading",
                value : "var(--blue)",
            },

            // Tertiary Button - Disabled state
            {
                name  : "--button-tertiary-bg-disabled",
                value : "var(--blue-light-10)",
            },
            {
                name  : "--button-tertiary-text-disabled",
                value : "var(--white)",
            },
            {
                name  : "--button-tertiary-border-disabled",
                value : "var(--blue-light-10)",
            },
            {
                name  : "--button-tertiary-border-width-disabled",
                value : "var(--global-border-width)",
            },
            {
                name  : "--button-tertiary-border-radius-disabled",
                value : "var(--global-border-radius)",
            },

            // Round Button
            { name : "--button-round-size-tiny", value : "24px" },
            { name : "--button-round-size-small", value : "32px" },
            { name : "--button-round-size-medium", value : "64px" },
            { name : "--button-round-size-large", value : "80px" },
            { name : "--button-round-size-huge", value : "128px" },
        ],
    },
    global       : {
        title     : "Global",
        variables : [
            {
                name        : "--body-bg",
                description : "Default background color for the body element",
                value       : "var(--white)",
            },
        ],
    },
    callout      : {
        title     : "Callout",
        variables : [
            // Base styles
            {
                name  : "--callout-border-radius",
                value : "var(--global-border-radius)",
            },
            { name : "--callout-border-width", value : "var(--nano)" },

            // Info variant
            {
                name  : "--callout-info-bg",
                value : "var(--blue-light60)",
            },
            {
                name  : "--callout-info-border",
                value : "var(--blue-dark20)",
            },

            // Success variant
            {
                name  : "--callout-success-bg",
                value : "var(--green-light60)",
            },
            {
                name  : "--callout-success-border",
                value : "var(--green-dark20)",
            },

            // Warning variant
            {
                name  : "--callout-warning-bg",
                value : "var(--amber-light60)",
            },
            {
                name  : "--callout-warning-border",
                value : "var(--amber-dark10)",
            },

            // Error variant
            {
                name  : "--callout-error-bg",
                value : "var(--red-light60)",
            },
            {
                name  : "--callout-error-border",
                value : "var(--red-dark10)",
            },
        ],
    },
    card         : {
        title     : "Card",
        variables : [
            { name : "--card-bg", value : "var(--white)" },
            { name : "--card-border", value : "var(--slate)" },
            {
                name  : "--card-border-radius",
                value : "var(--global-border-radius)",
            },
            {
                name  : "--card-border-width",
                value : "var(--global-border-width)",
            },
        ],
    },
    checkbox     : {
        title     : "Checkbox",
        variables : [
            // Square checkbox styles
            {
                name  : "--checkbox-square-border-radius",
                value : "4px",
            },
            {
                name  : "--checkbox-square-bg-default",
                value : "var(--slate-light60)",
            },
            {
                name  : "--checkbox-square-bg-hover",
                value : "var(--slate-light40)",
            },
            {
                name  : "--checkbox-square-bg-checked",
                value : "var(--hue)",
            },
            {
                name  : "--checkbox-square-bg-disabled",
                value : "var(--slate-light90)",
            },
            {
                name  : "--checkbox-tick",
                value : "var(--white)",
            },
        ],
    },
    divider      : {
        title     : "Divider",
        variables : [
            // Default divider
            { name : "--divider-height", value : "1px" },
            { name : "--divider-bg", value : "var(--slate)" },

            // Primary divider
            { name : "--divider-primary-height", value : "4px" },
            {
                name  : "--divider-primary-bg",
                value : "var(--slate)",
            },

            // Secondary divider
            { name : "--divider-secondary-height", value : "2px" },
            {
                name  : "--divider-secondary-bg",
                value : "var(--slate-light60)",
            },

            // Tertiary divider
            { name : "--divider-tertiary-height", value : "1px" },
            {
                name  : "--divider-tertiary-bg",
                value : "var(--slate-light20)",
            },
        ],
    },
    drawer       : {
        title     : "Drawer",
        variables : [
            // Drawer panel
            {
                name  : "--drawer-bg",
                value : "var(--white)",
            },
            {
                name  : "--drawer-border",
                value : "var(--slate-light20)",
            },
            {
                name  : "--drawer-border-radius",
                value : "var(--global-border-radius)",
            },

            // Overlay
            {
                name  : "--drawer-overlay-bg",
                value : "var(--black)",
            },
            { name : "--drawer-overlay-opacity", value : "0.4" },
            { name : "--drawer-overlay-blur", value : "4px" },

            // Dismiss button
            {
                name  : "--drawer-dismiss-button",
                value : "var(--slate-light40)",
            },
        ],
    },
    input        : {
        title     : "Input Field",
        variables : [
            // Default state
            {
                name  : "--input-bg-default",
                value : "var(--white)",
            },
            {
                name  : "--input-border-default",
                value : "var(--slate-light40)",
            },
            {
                name  : "--input-border-radius-default",
                value : "var(--global-border-radius)",
            },
            {
                name  : "--input-border-width-default",
                value : "var(--global-border-width)",
            },
            {
                name  : "--input-label-default",
                value : "var(--paragraph-text-colour)",
            },
            {
                name  : "--input-placeholder-default",
                value : "var(--slate-light40)",
            },
            {
                name  : "--input-text-default",
                value : "var(--paragraph-text-colour)",
            },

            // Focus state
            {
                name  : "--input-bg-focus",
                value : "var(--white)",
            },
            {
                name  : "--input-border-focus",
                value : "var(--slate-light40)",
            },
            {
                name  : "--input-border-width-focus",
                value : "var(--global-border-width)",
            },
            {
                name  : "--input-text-focus",
                value : "var(--shade)",
            },

            // Valid state
            {
                name  : "--input-bg-valid",
                value : "var(--white)",
            },
            {
                name  : "--input-border-valid",
                value : "var(--green-dark30)",
            },
            {
                name  : "--input-label-valid",
                value : "var(--shade)",
            },

            // Invalid state
            {
                name  : "--input-bg-invalid",
                value : "var(--red-light60)",
            },
            {
                name  : "--input-border-invalid",
                value : "var(--red-dark30)",
            },
            {
                name  : "--input-label-invalid",
                value : "var(--red)",
            },
            {
                name  : "--input-text-invalid",
                value : "var(--red)",
            },
            {
                name  : "--input-error-text-invalid",
                value : "var(--red)",
            },

            // Disabled state
            {
                name  : "--input-bg-disabled",
                value : "var(--slate-light40)",
            },
            {
                name  : "--input-border-disabled",
                value : "var(--slate-light40)",
            },
            {
                name  : "--input-label-disabled",
                value : "var(--slate-dark40)",
            },
            {
                name  : "--input-text-disabled",
                value : "var(--slate-dark60)",
            },

            // Read-only state
            {
                name  : "--input-bg-read-only",
                value : "var(--slate-light40)",
            },
            {
                name  : "--input-border-read-only",
                value : "var(--slate-light40)",
            },
            {
                name  : "--input-label-read-only",
                value : "var(--slate-dark40)",
            },
            {
                name  : "--input-text-read-only",
                value : "var(--slate-dark60)",
            },

            // Required indicator
            {
                name  : "--input-required-indicator",
                value : "var(--red)",
            },

            // Help text
            {
                name  : "--input-helptext",
                value : "var(--slate-dark40)",
            },
            {
                name  : "--input-helptext-scale",
                value : "92%",
            },

            // Icon states
            {
                name  : "--input-icon-default",
                value : "var(--slate-light40)",
            },
            {
                name  : "--input-icon-focus",
                value : "var(--hue)",
            },
            {
                name  : "--input-icon-valid",
                value : "var(--green-dark30)",
            },
        ],
    },
    listbox      : {
        title     : "List Box",
        variables : [
            // States
            {
                name  : "--list-box-bg-default",
                value : "var(--input-bg-default)",
            },
            {
                name  : "--list-box-bg-hover",
                value : "var(--input-bg-focus)",
            },
            {
                name  : "--list-box-bg-disabled",
                value : "var(--input-bg-disabled)",
            },
            {
                name  : "--list-box-text-disabled",
                value : "var(--input-text-disabled)",
            },
            {
                name  : "--list-box-focus-color",
                value : "var(--input-border-focus)",
            },

            // Badge
            {
                name  : "--list-box-badge-bg",
                value : "var(--slate-light20)",
            },
            {
                name  : "--list-box-badge-text",
                value : "var(--paragraph-text-colour)",
            },
        ],
    },
    meter        : {
        title     : "Meter",
        variables : [
            // Base styles
            {
                name  : "--meter-bg",
                value : "var(--slate-light70)",
            },
            {
                name  : "--meter-border",
                value : "var(--slate-light40)",
            },
            {
                name  : "--meter-border-width",
                value : "var(--global-border-width)",
            },
            {
                name  : "--meter-border-radius",
                value : "var(--global-border-radius)",
            },
            {
                name  : "--meter-height",
                value : "8px",
            },

            // Text colors
            {
                name  : "--meter-label",
                value : "var(--paragraph-text-colour)",
            },
            {
                name  : "--meter-value",
                value : "var(--paragraph-text-colour)",
            },

            // State colors
            {
                name  : "--meter-danger",
                value : "var(--red-light10)",
            },
            {
                name  : "--meter-low",
                value : "var(--amber-light10)",
            },
            {
                name  : "--meter-high",
                value : "var(--green-dark10)",
            },

            // Optimum marker
            {
                name  : "--meter-optimum-marker-width",
                value : "3px",
            },
            {
                name  : "--meter-optimum-marker-bg",
                value : "var(--blue)",
            },
        ],
    },
    modal        : {
        title     : "Modal",
        variables : [
            // Backdrop
            {
                name  : "--modal-backdrop-bg",
                value : "var(--black)",
            },
            {
                name  : "--modal-backdrop-opacity",
                value : "0.4",
            },
            {
                name  : "--modal-backdrop-blur",
                value : "4px",
            },
        ],
    },
    notification : {
        title     : "Notification",
        variables : [
            // Border radius
            {
                name  : "--notification-item-border-radius",
                value : "var(--global-border-radius)",
            },

            // Generic notification
            {
                name  : "--notification-item-generic-bg",
                value : "var(--white)",
            },
            {
                name  : "--notification-item-generic-border",
                value : "var(--slate-light60)",
            },
            {
                name  : "--notification-item-generic-text",
                value : "var(--shade)",
            },

            // Info notification
            {
                name  : "--notification-item-info-bg",
                value : "var(--blue-light60)",
            },
            {
                name  : "--notification-item-info-border",
                value : "var(--blue)",
            },

            // Error notification
            {
                name  : "--notification-item-error-bg",
                value : "var(--red-light60)",
            },
            {
                name  : "--notification-item-error-border",
                value : "var(--red)",
            },

            // Success notification
            {
                name  : "--notification-item-success-bg",
                value : "var(--green-light60)",
            },
            {
                name  : "--notification-item-success-border",
                value : "var(--green)",
            },

            // Warning notification
            {
                name  : "--notification-item-warning-bg",
                value : "var(--amber-light60)",
            },
            {
                name  : "--notification-item-warning-border",
                value : "var(--amber)",
            },
        ],
    },
    optionCard   : {
        title     : "Option Card",
        variables : [
            // Base styles
            {
                name  : "--option-card-border-width",
                value : "var(--global-border-width)",
            },
            {
                name  : "--option-card-focus",
                value : "var(--global-focus-colour)",
            },

            // Hover state
            {
                name  : "--option-card-bg-hover",
                value : "var(--green-light70-opacity40)",
            },
            {
                name  : "--option-card-border-hover",
                value : "var(--green-light40)",
            },
            {
                name  : "--option-card-tick-bg-hover",
                value : "var(--green-light60-opacity30)",
            },
            {
                name  : "--option-card-tick-line-hover",
                value : "var(--green)",
            },

            // Selected state
            {
                name  : "--option-card-bg-selected",
                value : "var(--green-light60)",
            },
            {
                name  : "--option-card-border-selected",
                value : "var(--green)",
            },
            {
                name  : "--option-card-tick-bg-selected",
                value : "var(--green-dark10)",
            },
            {
                name  : "--option-card-tick-line-selected",
                value : "var(--white)",
            },

            // Cross mark
            {
                name  : "--option-card-cross-bg",
                value : "var(--red-light40)",
            },
            { name : "--option-card-cross-line", value : "var(--white)" },
        ],
    },
    pagination   : {
        title     : "Pagination",
        variables : [
            // Info text
            {
                name  : "--pagination-info-text",
                value : "var(--paragraph-text-colour)",
            },
            {
                name  : "--pagination-info-font",
                value : "var(--paragraph-font)",
            },

            // Item dimensions
            {
                name  : "--pagination-item-height",
                value : "32px",
            },
            {
                name  : "--pagination-item-min-width",
                value : "32px",
            },
            {
                name  : "--pagination-item-border-width",
                value : "var(--global-border-width)",
            },
            {
                name  : "--pagination-item-border-radius",
                value : "var(--global-border-radius)",
            },

            // Default state (Plain)
            {
                name  : "--pagination-item-bg-default",
                value : "var(--transparent)",
            },
            {
                name  : "--pagination-item-border-default",
                value : "var(--transparent)",
            },
            {
                name  : "--pagination-item-text-default",
                value : "var(--paragraph-text-colour)",
            },

            // Hover state (Plain)
            {
                name  : "--pagination-item-bg-hover",
                value : "var(--transparent)",
            },
            {
                name  : "--pagination-item-border-hover",
                value : "var(--transparent)",
            },
            {
                name  : "--pagination-item-text-hover",
                value : "var(--paragraph-text-colour)",
            },

            // Selected state (Plain)
            {
                name  : "--pagination-item-bg-selected",
                value : "var(--transparent)",
            },
            {
                name  : "--pagination-item-border-selected",
                value : "var(--transparent)",
            },
            {
                name  : "--pagination-item-text-selected",
                value : "var(--blue)",
            },

            // Arrows
            {
                name  : "--pagination-arrows-stroke",
                value : "var(--slate)",
            },

            // Outlined style - Default state
            {
                name  : "--pagination-item-outlined-bg-default",
                value : "var(--transparent)",
            },
            {
                name  : "--pagination-item-outlined-border-default",
                value : "var(--blue)",
            },
            {
                name  : "--pagination-item-outlined-text-default",
                value : "var(--blue)",
            },

            // Outlined style - Hover state
            {
                name  : "--pagination-item-outlined-bg-hover",
                value : "var(--transparent)",
            },
            {
                name  : "--pagination-item-outlined-border-hover",
                value : "var(--blue-light60)",
            },
            {
                name  : "--pagination-item-outlined-text-hover",
                value : "var(--blue-light60)",
            },

            // Outlined style - Selected state
            {
                name  : "--pagination-item-outlined-bg-selected",
                value : "var(--transparent)",
            },
            {
                name  : "--pagination-item-outlined-border-selected",
                value : "var(--blue)",
            },
            {
                name  : "--pagination-item-outlined-text-selected",
                value : "var(--blue)",
            },

            // Outlined arrows
            {
                name  : "--pagination-arrows-outlined-stroke",
                value : "var(--slate)",
            },

            // Filled style - Default state
            {
                name  : "--pagination-item-filled-bg-default",
                value : "var(--blue-light80)",
            },
            {
                name  : "--pagination-item-filled-border-default",
                value : "var(--blue-light80)",
            },
            {
                name  : "--pagination-item-filled-text-default",
                value : "var(--blue)",
            },

            // Filled style - Hover state
            {
                name  : "--pagination-item-filled-bg-hover",
                value : "var(--blue-light40)",
            },
            {
                name  : "--pagination-item-filled-border-hover",
                value : "var(--blue-light40)",
            },
            {
                name  : "--pagination-item-filled-text-hover",
                value : "var(--blue)",
            },

            // Filled style - Selected state
            {
                name  : "--pagination-item-filled-bg-selected",
                value : "var(--blue)",
            },
            {
                name  : "--pagination-item-filled-border-selected",
                value : "var(--blue)",
            },
            {
                name  : "--pagination-item-filled-text-selected",
                value : "var(--white)",
            },

            // Filled arrows
            {
                name  : "--pagination-arrows-filled-stroke",
                value : "var(--slate)",
            },

            // Disabled state
            {
                name  : "--pagination-item-bg-disabled",
                value : "var(--transparent)",
            },
            {
                name  : "--pagination-item-text-disabled",
                value : "var(--transparent)",
            },
            {
                name  : "--pagination-item-border-disabled",
                value : "var(--transparent)",
            },
            {
                name  : "--pagination-arrows-stroke-disabled",
                value : "var(--slate-opacity40)",
            },

            // Input styles
            {
                name  : "--pagination-input-bg",
                value : "var(--input-bg-default)",
            },
            {
                name  : "--pagination-input-border",
                value : "var(--input-border-default)",
            },
            {
                name  : "--pagination-input-text",
                value : "var(--input-text-default)",
            },
        ],
    },
    progressBar  : {
        title     : "Progress Bar",
        variables : [
            // Base styles
            {
                name  : "--progress-bar-bg",
                value : "var(--slate-light70)",
            },
            {
                name  : "--progress-bar-fill",
                value : "var(--hue)",
            },
            {
                name  : "--progress-bar-label",
                value : "var(--paragraph-text-colour)",
            },
            {
                name  : "--progress-bar-value",
                value : "var(--paragraph-text-colour)",
            },
            {
                name  : "--progress-bar-border-radius",
                value : "var(--global-border-radius)",
            },
            {
                name  : "--progress-bar-height",
                value : "8px",
            },
        ],
    },
    radioButton  : {
        title     : "Radio Button",
        variables : [
            // Generic radio button
            {
                name  : "--radio-circle-bg-default",
                value : "var(--slate-light60)",
            },
            {
                name  : "--radio-circle-bg-hover",
                value : "var(--slate-light40)",
            },
            {
                name  : "--radio-circle-bg-checked",
                value : "var(--hue)",
            },
            {
                name  : "--radio-circle-bg-disabled",
                value : "var(--slate-light90)",
            },
            {
                name  : "--radio-button-dot",
                value : "var(--white)",
            },

            // Radio group tabs
            {
                name  : "--radio-tabs-height",
                value : "48px",
            },
            {
                name  : "--radio-tabs-vertical-gap",
                value : "4px",
            },
            {
                name  : "--radio-tabs-bg",
                value : "var(--slate-light70)",
            },
            {
                name  : "--radio-tabs-border",
                value : "var(--slate-light70)",
            },
            {
                name  : "--radio-tabs-label-text-default",
                value : "var(--slate-dark60)",
            },
            {
                name  : "--radio-tabs-label-text-hover",
                value : "var(--slate-dark80)",
            },
            {
                name  : "--radio-tabs-label-bg-hover",
                value : "var(--slate-light90)",
            },
            {
                name  : "--radio-tabs-label-bg-active",
                value : "var(--white)",
            },
            {
                name  : "--radio-tabs-label-text-active",
                value : "var(--black)",
            },
            {
                name  : "--radio-tabs-label-focus-border",
                value : "var(--blue)",
            },
        ],
    },
    range        : {
        title     : "Range Slider",
        variables : [
            // Text elements
            {
                name  : "--range-label",
                value : "var(--input-label-default)",
            },
            {
                name  : "--range-value",
                value : "var(--input-label-default)",
            },

            // Track and thumb
            {
                name  : "--range-track-bg",
                value : "var(--slate-light70)",
            },
            {
                name  : "--range-thumb-bg",
                value : "var(--blue-light20)",
            },
            {
                name  : "--range-thumb-border",
                value : "var(--blue-light20)",
            },

            // Focus states
            {
                name  : "--range-border-focus",
                value : "var(--blue)",
            },
            {
                name  : "--range-outline-focus",
                value : "var(--blue)",
            },
        ],
    },
    select       : {
        title     : "Select",
        variables : [
            // States and styling
            {
                name  : "--select-chevron",
                value : "var(--slate-light40)",
            },
        ],
    },
    sidebar      : {
        title     : "Sidebar",
        variables : [
            { name : "--sidebar-bg", value : "var(--white)" },
            { name : "--sidebar-border", value : "var(--slate-dark80)" },
            { name : "--sidebar-width-default", value : "240px" },
            { name : "--sidebar-width-collapsed", value : "48px" },

            { name : "--sidebar-header-bg", value : "var(--white)" },
            { name : "--sidebar-header-border-bottom", value : "var(--slate-dark80)" },
            { name : "--sidebar-header-logo-width", value : "50%" },
            { name : "--sidebar-header-icon-width", value : "40px" },

            { name : "--sidebar-item-icon-width", value : "24px" },

            { name : "--sidebar-item-icon-stroke-default", value : "var(--slate-dark40)" },
            { name : "--sidebar-item-icon-stroke-width-default", value : "2px" },
            { name : "--sidebar-item-icon-fill-default", value : "var(--slate-light40)" },
            { name : "--sidebar-item-text-colour-default", value : "var(--slate-light40)" },

            { name : "--sidebar-item-bg-hover", value : "var(--grey-dark70)" },
            { name : "--sidebar-item-text-hover", value : "var(--hue)" },
            { name : "--sidebar-item-icon-stroke-hover", value : "var(--slate-dark30)" },
            { name : "--sidebar-item-icon-fill-hover", value : "var(--slate-dark30)" },

            { name : "--sidebar-item-bg-active", value : "var(--grey-dark60)" },
            { name : "--sidebar-item-text-active", value : "var(--grey-light40)" },
            { name : "--sidebar-item-border-active", value : "var(--blue)" },
            { name : "--sidebar-item-icon-fill-active", value : "var(--slate)" },
            { name : "--sidebar-item-icon-stroke-active", value : "var(--slate)" },
            { name : "--sidebar-item-active-indicator-width", value : "2px" },

            { name : "--sidebar-item-default-link-bg", value : "var(--white)" },
            { name : "--sidebar-item-default-link-text", value : "var(--shade)" },
            { name : "--sidebar-item-text-scale", value : "100%" },
            { name : "--sidebar-item-text-weight", value : "600" },

            { name : "--sidebar-item-has-alert-bg", value : "var(--red-dark70)" },

            { name : "--sidebar-footer-height", value : "32px" },
            { name : "--sidebar-footer-bg", value : "var(--white)" },
            { name : "--sidebar-footer-border-top", value : "var(--slate-light10)" },

            { name : "--sidebar-collapsed-item-link-text", value : "var(--white)" },
            { name : "--sidebar-collapsed-item-bg", value : "var(--hue)" },
            { name : "--sidebar-collapsed-item-border-radius", value : "var(--global-border-radius)" },
        ],
    },
    skeleton     : {
        title     : "Skeleton",
        variables : [
            {
                name  : "--skeleton-bg",
                value : "var(--slate-light40)",
            },
            {
                name  : "--skeleton-highlight",
                value : "var(--slate-light40-opacity40)",
            },
        ],
    },
    spinner      : {
        title     : "Spinner",
        variables : [
            { name : "--spinner-border", value : "var(--hue)" },
        ],
    },
    switch       : {
        title     : "Switch",
        variables : [
            // Default state
            {
                name  : "--switch-bg-default",
                value : "var(--slate-light60)",
            },
            {
                name  : "--switch-bg-hover",
                value : "var(--slate-light40)",
            },
            {
                name  : "--switch-bg-checked",
                value : "var(--hue)",
            },
            {
                name  : "--switch-bg-disabled",
                value : "var(--slate-light40)",
            },

            // Slider states
            {
                name  : "--switch-slider-bg-default",
                value : "var(--white)",
            },
            {
                name  : "--switch-slider-bg-hover",
                value : "var(--white)",
            },
            {
                name  : "--switch-slider-bg-checked",
                value : "var(--white)",
            },
            {
                name  : "--switch-slider-bg-disabled",
                value : "var(--slate-light40)",
            },
        ],
    },
    table        : {
        title     : "Table",
        variables : [
            // Base styling
            {
                name  : "--table-bg",
                value : "var(--white)",
            },
            {
                name  : "--table-border",
                value : "var(--slate-light10)",
            },
            {
                name  : "--table-font",
                value : "var(--paragraph-font)",
            },
            {
                name  : "--table-text",
                value : "var(--paragraph-text-colour)",
            },

            // Striped styling
            {
                name  : "--table-striped-header-bg",
                value : "var(--blue-light40)",
            },
            {
                name  : "--table-striped-cell-bg",
                value : "var(--slate-light70)",
            },

            // Highlight styling
            {
                name  : "--table-highlight-bg",
                value : "var(--amber-light20)",
            },
            {
                name  : "--table-highlight-text",
                value : "var(--paragraph-text-colour)",
            },

            // Pagination styling
            {
                name  : "--table-pagination-bg",
                value : "var(--white)",
            },
            {
                name  : "--table-pagination-border-radius",
                value : "var(--global-border-radius)",
            },
            {
                name  : "--table-pagination-text",
                value : "var(--paragraph-text-colour)",
            },
            {
                name  : "--table-pagination-nav-icon-bg-hover",
                value : "var(--slate-dark60)",
            },
        ],
    },
    tabs         : {
        title     : "Tabs",
        variables : [
            // Base styling
            {
                name  : "--tabs-bg",
                value : "var(--transparent)",
            },

            // Tab label states
            {
                name  : "--tab-label-default",
                value : "var(--paragraph-text-colour)",
            },
            {
                name  : "--tab-label-hover",
                value : "var(--blue-light40)",
            },
            {
                name  : "--tab-label-active",
                value : "var(--blue)",
            },
            {
                name  : "--tab-label-disabled",
                value : "var(--slate-light40)",
            },

            // Active indicator
            {
                name  : "--tab-border-active",
                value : "var(--blue)",
            },

            // Alert badge
            {
                name  : "--tab-alert-badge-bg",
                value : "var(--red)",
            },
            {
                name  : "--tab-alert-badge-border",
                value : "var(--red)",
            },
        ],
    },
    text         : {
        title     : "Text",
        variables : [
            // Generic fonts
            { name : "--font-sans-serif", value : "sans-serif" },
            { name : "--font-serif", value : "serif" },
            { name : "--font-mono", value : "monospace" },

            // Paragraph styling
            { name : "--paragraph-font", value : "var(--font-sans-serif)" },
            { name : "--paragraph-font-size", value : "1rem" },
            { name : "--paragraph-line-height", value : "1.2" },
            { name : "--paragraph-font-weight", value : "400" },
            { name : "--paragraph-text-colour", value : "var(--grey)" },

            // Subtext
            { name : "--paragraph-subtext-colour", value : "var(--slate-dark30)" },
            { name : "--paragraph-subtext-size", value : "0.8rem" },

            // Headings
            { name : "--heading-font", value : "var(--font-sans-serif)" },
            { name : "--heading-font-size", value : "1.5rem" },
            { name : "--heading-size-multiplier", value : "1.2" },
            { name : "--heading-line-height", value : "1" },
            { name : "--heading-font-weight", value : "700" },
            { name : "--heading-text-colour", value : "var(--slate)" },

            // Links
            { name : "--link-font", value : "var(--paragraph-font)" },
            { name : "--link-text-default", value : "var(--blue)" },
            { name : "--link-text-hover", value : "var(--blue)" },

            // Selection
            { name : "--text-selected", value : "var(--white)" },
            { name : "--text-bg-selected", value : "var(--hue)" },

            // Code
            { name : "--code-font", value : "var(--font-mono)" },
            { name : "--code-inline-font-size", value : "0.8rem" },
            { name : "--code-inline-bg", value : "var(--blue-light80)" },
            { name : "--code-inline-text", value : "var(--blue-dark40)" },
            { name : "--code-inline-border-radius", value : "var(--global-border-radius)" },

            { name : "--code-block-font-size", value : "0.92rem" },
            { name : "--code-block-bg", value : "var(--slate-dark80)" },
            { name : "--code-block-text", value : "var(--sky-light60)" },
            { name : "--code-block-line-height", value : "1.8" },
            { name : "--code-block-border-radius", value : "var(--global-border-radius)" },

            { name : "--code-block-line-numbers", value : "var(--slate-dark30)" },

            { name : "--code-block-copy-button-bg", value : "var(--transparent)" },
            { name : "--code-block-copy-button-text", value : "var(--blue)" },
            { name : "--code-block-copy-button-border", value : "var(--blue-light40)" },

            { name : "--code-block-copied-badge-bg", value : "var(--green-light80)" },
            { name : "--code-block-copied-badge-text", value : "var(--green-dark20)" },
            { name : "--code-block-copied-badge-border", value : "var(--green-dark20)" },

            // KBD
            { name : "--kbd-font", value : "var(--font-mono)" },
            { name : "--kbd-bg", value : "var(--grey-light10)" },
            { name : "--kbd-text", value : "var(--grey)" },
            { name : "--kbd-text-outline", value : "var(--transparent)" },
            { name : "--kbd-shadow", value : "var(--slate)" },
            { name : "--kbd-border-radius", value : "var(--global-border-radius)" },

            // Tokens
            { name : "--token-atrule", value : "var(--teal)" },
            { name : "--token-attrName", value : "var(--orange)" },
            { name : "--token-attrValue", value : "var(--green)" },
            { name : "--token-boolean", value : "var(--green)" },
            { name : "--token-builtin", value : "var(--violet-light20)" },
            { name : "--token-cdata", value : "var(--grey)" },
            { name : "--token-className", value : "var(--red)" },
            { name : "--token-comment", value : "var(--grey)" },
            { name : "--token-constant", value : "var(--green)" },
            { name : "--token-deleted", value : "var(--slate)" },
            { name : "--token-delimiter", value : "var(--grey)" },
            { name : "--token-doctype", value : "var(--amber-light10)" },
            { name : "--token-entity", value : "var(--green)" },
            { name : "--token-function", value : "var(--orange)" },
            { name : "--token-hexcode", value : "var(--white)" },
            { name : "--token-important", value : "var(--red)" },
            { name : "--token-imports", value : "var(--sky-light60)" },
            { name : "--token-inserted", value : "var(--green)" },
            { name : "--token-italic", value : "var(--green)" },
            { name : "--token-keyword", value : "var(--violet-light20)" },
            { name : "--token-name", value : "var(--green)" },
            { name : "--token-namespace", value : "var(--green)" },
            { name : "--token-number", value : "var(--crimson-dark10)" },
            { name : "--token-operator", value : "var(--amber)" },
            { name : "--token-plain", value : "var(--slate-light60)" },
            { name : "--token-plain-html", value : "var(--slate)" },
            { name : "--token-plain-css", value : "var(--salmon-light30)" },
            { name : "--token-function-css", value : "var(--pistachio)" },
            { name : "--token-pseudo-class", value : "var(--brick)" },
            { name : "--token-prolog", value : "var(--grey)" },
            { name : "--token-property", value : "var(--pistachio-dark20)" },
            { name : "--token-property-css", value : "var(--slate)" },
            { name : "--token-punctuation", value : "var(--grey)" },
            { name : "--token-regex", value : "var(--green)" },
            { name : "--token-selector-generic", value : "var(--green-light20)" },
            { name : "--token-selector-class", value : "var(--violet-light20)" },
            { name : "--token-selector-id", value : "var(--violet-light40)" },
            { name : "--token-selector-attrName", value : "var(--blue-dark20)" },
            { name : "--token-selector-attrValue", value : "var(--blue-light20)" },
            { name : "--token-selector-operator", value : "var(--token-operator)" },
            { name : "--token-selector-punctuation", value : "var(--grey)" },
            { name : "--token-string", value : "var(--grey-light50)" },
            { name : "--token-string-json", value : "var(--slate)" },
            { name : "--token-symbol", value : "var(--green)" },
            { name : "--token-tag", value : "var(--violet)" },
            { name : "--token-unit", value : "var(--crimson-light20)" },
            { name : "--token-url", value : "var(--green)" },
            { name : "--token-variable", value : "var(--orange)" },
        ],
    },
    toast        : {
        title     : "Toast",
        variables : [
            { name : "--toast-bg", value : "var(--slate-light10)" },
            { name : "--toast-text", value : "var(--black)" },
            { name : "--toast-border-radius", value : "var(--global-border-radius)" },
        ],
    },
};

// Centralised metadata for all searchable content
const docsMetadata = {
    components : {
        accordion         : {
            title       : "Accordion",
            description : "A simple click-to-toggle component to expand and collapse content inside",
            path        : "/components/accordion",
            icon        : AccordionIcon,
        },
        badge             : {
            title       : "Badge",
            description : "Small status indicators and labels",
            path        : "/components/badge",
            icon        : BadgeIcon,
        },
        breadcrumbs       : {
            title       : "Breadcrumbs",
            description : "A set of links to show the current page's hierarchy",
            path        : "/components/breadcrumbs",
            icon        : BreadcrumbsIcon,
        },
        button            : {
            title       : "Button",
            description : "A clickable component to trigger an action or an event",
            path        : "/components/button",
            icon        : ButtonIcon,
        },
        callout           : {
            title       : "Callout",
            description : "A component to highlight important information",
            path        : "/components/callout",
            icon        : CalloutIcon,
        },
        card              : {
            title       : "Card",
            description : "A container for related content and actions",
            path        : "/components/card",
            icon        : CardIcon,
        },
        checkbox          : {
            title       : "Checkbox",
            description : "Input control for multiple selections",
            path        : "/components/checkbox",
            icon        : CheckboxIcon,
        },
        "code-block"      : {
            title       : "Code Block",
            description : "Display code snippets with syntax highlighting",
            path        : "/components/code-block",
            icon        : CodeIcon,
        },
        divider           : {
            title       : "Divider",
            description : "A line to separate content sections",
            path        : "/components/divider",
            icon        : DividerIcon,
        },
        drawer            : {
            title       : "Drawer",
            description : "A panel that slides in from the edge of the screen",
            path        : "/components/drawer",
            icon        : DrawerIcon,
        },
        "form-wrapper"    : {
            title       : "Form Wrapper",
            description : "A container for form elements",
            path        : "/components/form",
            icon        : FormWrapperIcon,
        },
        "input-field"     : {
            title       : "Input Field",
            description : "Text input control for forms",
            path        : "/components/input-field",
            icon        : InputFieldIcon,
        },
        "list-box"        : {
            title       : "List Box",
            description : "A list of selectable options",
            path        : "/components/list-box",
            icon        : ListBoxIcon,
        },
        meter             : {
            title       : "Meter",
            description : "Visual indicator of a value in a known range",
            path        : "/components/meter",
            icon        : ProgressBarIcon, // Using ProgressBarIcon as a close match
        },
        modal             : {
            title       : "Modal",
            description : "An overlay dialog for important content",
            path        : "/components/modal",
            icon        : ModalIcon,
        },
        notifications     : {
            title       : "Notifications",
            description : "Display system messages and alerts",
            path        : "/components/notifications",
            icon        : NotificationIcon,
        },
        "option-cards"    : {
            title       : "Option Cards",
            description : "Card-based selection options",
            path        : "/components/option-cards",
            icon        : OptionCardsIcon,
        },
        pagination        : {
            title       : "Pagination",
            description : "Navigate through pages of content",
            path        : "/components/pagination",
            icon        : PaginationIcon,
        },
        "pin-input-field" : {
            title       : "PIN Input Field",
            description : "Input field for PIN or verification codes",
            path        : "/components/pin-input-field",
            icon        : PinInputIcon,
        },
        "progress-bar"    : {
            title       : "Progress Bar",
            description : "Visual indicator of progress",
            path        : "/components/progress-bar",
            icon        : ProgressBarIcon,
        },
        "radio-button"    : {
            title       : "Radio Button",
            description : "Input control for single selection",
            path        : "/components/radio-button",
            icon        : RadioButtonIcon,
        },
        "radio-tab-group" : {
            title       : "Radio Tab Group",
            description : "Grouped radio buttons in a tab layout",
            path        : "/components/radio-tab-group",
            icon        : TabsIcon, // Using TabsIcon as it's related
        },
        range             : {
            title       : "Range",
            description : "Slider control for selecting values",
            path        : "/components/range",
            icon        : RangeIcon,
        },
        select            : {
            title       : "Select",
            description : "Dropdown menu for selecting options",
            path        : "/components/select",
            icon        : SelectIcon,
        },
        sidebar           : {
            title       : "Sidebar",
            description : "Side navigation panel",
            path        : "/components/sidebar",
            icon        : SidebarIcon,
        },
        skeleton          : {
            title       : "Skeleton",
            description : "Loading placeholder animation",
            path        : "/components/skeleton",
            icon        : SkeletonIcon,
        },
        table             : {
            title       : "Table",
            description : "Display tabular data",
            path        : "/components/table",
            icon        : TableIcon,
        },
        tabs              : {
            title       : "Tabs",
            description : "Switch between different views",
            path        : "/components/tabs",
            icon        : TabsIcon,
        },
        toast             : {
            title       : "Toast",
            description : "Show temporary notification messages",
            path        : "/components/toast",
            icon        : ToastIcon,
        },
    },
    theme      : Object.entries(themeCategories).flatMap(([category, data]) =>
        data.variables.map(variable => (
            {
                title       : variable.name,
                description : variable.description,
                value       : variable.value,
                path        : `/theme#${category}`,
                category    : data.title,
                icon        : BadgeIcon, // Using BadgeIcon as a placeholder
            }
        )),
    ),
};

export const generateSearchIndex = async () => {
    const searchableContent = [];

    // Add components to searchable content
    Object.entries(docsMetadata.components).forEach(([key, data]) => {
        searchableContent.push({
            type : "component",
            ...data,
        });
    });

    // Add theme variables to searchable content
    docsMetadata.theme.forEach(themeVariable => {
        searchableContent.push({
            type : "theme",
            ...themeVariable,
        });
    });

    return searchableContent;
};

// Fuse.js configuration for optimal search results
export const searchConfig = {
    keys         : [
        {
            name   : "title",
            weight : 0.4,
        },
        {
            name   : "description",
            weight : 0.3,
        },
        {
            name   : "category",
            weight : 0.2,
        },
    ],
    threshold    : 0.3,
    distance     : 100,
    includeScore : true,
};
