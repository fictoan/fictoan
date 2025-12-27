// Configuration for Accordion component documentation

// LIB =================================================================================================================
import { createPropsRegistry } from "$/lib/props-registry/createPropsRegistry";

export const accordionRegistry = createPropsRegistry({
    component : "Accordion",

    // Props appear in this order
    propOrder : [
        "summary",
        "isOpen",
    ],

    // Per-prop configuration
    props : {
        summary  : {
            label        : "Summary",
            description  : "The clickable header text or element",
            control      : "InputField",
            defaultValue : "Click to expand",
        },
        isOpen   : {
            label        : "Open by default",
            description  : "Whether the accordion starts expanded",
            control      : "Checkbox",
            defaultValue : false,
        },
        children : {
            hidden : true,  // Handled separately as content editor
        },
    },

    // Demo configuration
    demo : {
        hasChildren     : true,
        childrenContent : "Accordion content goes here. You can put any content inside.",
        defaultProps    : {
            summary : "Click to expand",
        },
    },

    // Hide inherited Element props
    hideInheritedProps : true,
});
