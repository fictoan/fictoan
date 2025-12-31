// Configuration for Callout component documentation

// LIB =================================================================================================================
import { createPropsRegistry } from "$/lib/props-registry/createPropsRegistry";

export const calloutRegistry = createPropsRegistry({
    component : "Callout",

    // Props in display order
    props : {
        kind : {
            label        : "Kind",
            control      : "RadioTabGroup",
            options      : [
                { value : "info", label : "Info" },
                { value : "success", label : "Success" },
                { value : "warning", label : "Warning" },
                { value : "error", label : "Error" },
            ],
            defaultValue : "info",
        },
        title : {
            label        : "Title",
            control      : "InputField",
            inputProps   : {
                helpText : "Optional heading for the callout",
            },
        },
        children : {
            label        : "Content",
            control      : "TextArea",
            defaultValue : "Content goes here",
            inputProps   : {
                helpText : "The main content of the callout",
            },
        },
    },
});
