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
        Drawer : {
            label : "Label",
            value : "Sample drawer",
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
    language : {
        type               : "language",
        label              : "Language",
        defaultOption      : "Select a language",
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

    // BADGE PROPS -----------------------------------------------------------------------------------------------------
    withDelete      : {
        type  : "boolean",
        label : "Show a delete icon",
    },

    // BUTTON PROPS ----------------------------------------------------------------------------------------------------
    isLoading       : {
        type  : "boolean",
        label : "Is loading",
    },

    // CODE BLOCK PROPS ------------------------------------------------------------------------------------------------
    showCopyButton  : {
        type  : "boolean",
        label : "Show copy button",
    },
    showLineNumbers  : {
        type  : "boolean",
        label : "Show line numbers",
    },
    withSyntaxHighlighting : {
        type  : "boolean",
        label : "Add syntax highlighting",
    },
    makeEditable    : {
        type  : "boolean",
        label : "Make content editable",
    },

    // DRAWER PROPS ----------------------------------------------------------------------------------------------------
    closeOnClickOutside : {
        type  : "boolean",
        label : "Close on clicking outside",
    },
    showOverlay        : {
        type  : "boolean",
        label : "Show overlay",
    },
    blurOverlay        : {
        type  : "boolean",
        label : "Blur overlay",
    },
    isDismissible      : {
        type  : "boolean",
        label : "Is dismissible",
    },

    // LISTBOX PROPS ---------------------------------------------------------------------------------------------------
    allowMultiSelect : {
        type  : "boolean",
        label : "Allow selecting multiple options",
    },
    allowCustomEntries : {
        type  : "boolean",
        label : "Allow adding custom entries",
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
        type    : "text",
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

    // CODE BLOCK ======================================================================================================
    source : {
        type    : "source",
        label   : "Usage",
        options : [
            { id : "usage-opt-0", value : "import", label : "Import" },
            { id : "usage-opt-1", value : "inline", label : "Inline" },
        ],
    },

    // INPUT FIELD PROPS ===============================================================================================
    label : {
        type    : "text",
        default : {
            label : "Label",
            value : "",
        },
    },
    placeholder : {
        type    : "text",
        default : {
            label : "Placeholder",
            value : "",
        },
    },
    helpText : {
        type    : "text",
        default : {
            label : "Help text",
            value : "",
        },
    },
    required : {
        type  : "boolean",
        label : "Make it a required field",
    },
    readOnly : {
        type  : "boolean",
        label : "Read only",
    },
    validateThis : {
        type  : "boolean",
        label : "I want to validate this input",
    },
    pattern : {
        type    : "text",
        default : {
            label : "Validation regex pattern",
            value : "",
        },
    },
    errorText : {
        type    : "text",
        default : {
            label : "Error text",
            value : "",
        },
    },
    innerTextLeft : {
        type    : "text",
        default : {
            label : "Left side text",
            value : "",
        },
    },
    innerTextRight : {
        type    : "text",
        default : {
            label : "Right side text",
            value : "",
        },
    },
};
