// Here is a list of common prop types, and their values. How to use it:
// 1. Create an object with the props you want to configure
// 2. Decide what input type you want for each prop.
//    For eg, list of colours obviously needs a ListBox, and boolean values obviously a Checkbox and so on.

export const MASTER_PROPS_CONFIG = {
    // TEXT PROPS ======================================================================================================
    strings : {
        type    : "text",
        default : {
            label : "Text",
            value : "Placeholder",
        },
        // Component-specific input field configs ----------------------------------------------------------------------
        Badge   : {
            label : "Content",
            value : "Badge",
        },
        Button  : {
            label : "Label",
            value : "Button",
        },
        Tooltip : {
            label : "Target ID + isTooltipFor",
            value : "tooltip-target",
        },
    },

    // SIZE PROPS ======================================================================================================
    size : {
        type    : "size",
        label   : "Size",
        options : [
            { id : "size-opt-0", value : "none", label : "none" },
            { id : "size-opt-1", value : "nano", label : "nano" },
            { id : "size-opt-2", value : "micro", label : "micro" },
            { id : "size-opt-3", value : "tiny", label : "tiny" },
            { id : "size-opt-4", value : "small", label : "small" },
            { id : "size-opt-5", value : "medium", label : "medium" },
            { id : "size-opt-6", value : "large", label : "large" },
            { id : "size-opt-7", value : "huge", label : "huge" },
        ],
    },

    // SPACING PROPS ===================================================================================================
    padding : {
        type    : "spacing",
        label   : "Padding",
        options : [
            { id : "spacing-opt-0", value : "none", label : "none" },
            { id : "spacing-opt-1", value : "nano", label : "nano" },
            { id : "spacing-opt-2", value : "micro", label : "micro" },
            { id : "spacing-opt-3", value : "tiny", label : "tiny" },
            { id : "spacing-opt-4", value : "small", label : "small" },
            { id : "spacing-opt-5", value : "medium", label : "medium" },
            { id : "spacing-opt-6", value : "large", label : "large" },
            { id : "spacing-opt-7", value : "huge", label : "huge" },
        ],
    },

    // SHAPE-RELATED PROPS =============================================================================================
    shape : {
        type    : "shape",
        label   : "Shape",
        options : [
            { id : "shape-opt-0", value : "none", label : "none" },
            { id : "shape-opt-1", value : "rounded", label : "rounded" },
            { id : "shape-opt-2", value : "curved", label : "curved" },
        ],
    },
    
    shadow : {
        type    : "shape",
        label   : "Shadow",
        options : [
            { id : "shadow-opt-0", value : "none", label : "none" },
            { id : "shadow-opt-1", value : "mild", label : "mild" },
            { id : "shadow-opt-2", value : "hard", label : "hard" },
            { id : "shadow-opt-3", value : "soft", label : "soft" },
        ],
    },

    // SHAPE-RELATED PROPS =============================================================================================
    position : {
        type    : "position",
        label   : "Position",
        options : [
            { id : "position-opt-0", value : "top", label : "top" },
            { id : "position-opt-1", value : "right", label : "right" },
            { id : "position-opt-2", value : "bottom", label : "bottom" },
            { id : "position-opt-3", value : "left", label : "left" },
        ],
    },

    // COLOR-RELATED PROPS =============================================================================================
    bgColour     : {
        type               : "select",
        label              : "Background colour",
        defaultOption      : "Select colour",
        customOptionPrefix : "bg",
    },
    textColour   : {
        type               : "select",
        label              : "Text colour",
        defaultOption      : "Select colour",
        customOptionPrefix : "text",
    },
    borderColour : {
        type               : "select",
        label              : "Border colour",
        defaultOption      : "Select colour",
        customOptionPrefix : "border",
    },

    // BOOLEAN PROPS ===================================================================================================
    canHaveChildren : {
        type : "boolean",
    },
    isFullWidth     : {
        type  : "boolean",
        label : "Full width",
    },
    disabled        : {
        type  : "boolean",
        label : "Disabled",
    },
    withDelete      : {
        type  : "boolean",
        label : "Show a delete icon",
    },
    isLoading       : {
        type  : "boolean",
        label : "Is loading",
    },

    // KIND/EMPHASIS PROPS =============================================================================================
    kind : {
        type          : "emphasis",
        label         : "Kind",
        variants      : {
            // DEFAULT OPTIONS FOR MOST COMPONENTS ---------------------------------------------------------------------
            default : [
                { id : "kind-opt-0", value : "none", label : "none" },
                { id : "kind-opt-1", value : "primary", label : "primary" },
                { id : "kind-opt-2", value : "secondary", label : "secondary" },
                { id : "kind-opt-3", value : "tertiary", label : "tertiary" },
            ],
            // BUTTON --------------------------------------------------------------------------------------------------
            button : [
                { id : "kind-opt-0", value : "custom", label : "custom" },
                { id : "kind-opt-1", value : "primary", label : "primary" },
                { id : "kind-opt-2", value : "secondary", label : "secondary" },
                { id : "kind-opt-3", value : "tertiary", label : "tertiary" },
            ],
            // CALLOUT -------------------------------------------------------------------------------------------------
            callout : [
                { id : "kind-opt-0", value : "info", label : "info", defaultChecked : true },
                { id : "kind-opt-1", value : "success", label : "success" },
                { id : "kind-opt-2", value : "warning", label : "warning" },
                { id : "kind-opt-3", value : "error", label : "error" },
            ],
        },
        defaultValues : {
            callout : "info",
            button  : "custom",
        },
    },

    // OTHER PROPS =====================================================================================================
    summary : {
        type         : "reactNode",
        label        : "Summary content",
        defaultValue : "<Text>Click me</Text>",
        isRequired   : true,
    },

    // BREADCRUMBS ====================================================================================================
    separator : {
        type : "text",
        default : {
            label : "Separator",
            value : "/",
        },
    },
    
    spacing : {
        type    : "spacing",
        label   : "Spacing",
        options : [
            { id : "spacing-opt-0", value : "none", label : "none" },
            { id : "spacing-opt-1", value : "nano", label : "nano" },
            { id : "spacing-opt-2", value : "micro", label : "micro" },
            { id : "spacing-opt-3", value : "tiny", label : "tiny" },
            { id : "spacing-opt-4", value : "small", label : "small" },
            { id : "spacing-opt-5", value : "medium", label : "medium" },
            { id : "spacing-opt-6", value : "large", label : "large" },
            { id : "spacing-opt-7", value : "huge", label : "huge" },
        ],
    },

    // TOOLTIP =========================================================================================================
    showOn : {
        type    : "showOn",
        label   : "Show on",
        options : [
            { id : "show-opt-0", value : "hover", label : "hover" },
            { id : "show-opt-1", value : "click", label : "click" },
        ],
    },
};
