// Configuration for Accordion component documentation

// LIB =================================================================================================================
import { createPropsRegistry } from "$/lib/props-registry/createPropsRegistry";

export const accordionRegistry = createPropsRegistry({
    component : "Accordion",

    // Props in display order
    props : {
        summary : {
            label        : "Summary",
            control      : "TextArea",
            defaultValue : "Click to expand",
            inputProps   : {
                helpText : "Accepts React nodes as well for more complex content",
            },
        },
        children : {
            label        : "Inner content",
            control      : "TextArea",
            defaultValue : "Accordion content goes here.",
            inputProps   : {
                helpText : "Accepts React nodes as well for more complex content",
            },
        },
        isOpen : {
            label        : "isOpen",
            control      : "Checkbox",
            defaultValue : false,
        },
    },
});
