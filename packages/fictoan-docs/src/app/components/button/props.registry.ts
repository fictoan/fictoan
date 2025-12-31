// Configuration for Button component documentation

// LIB =================================================================================================================
import { createPropsRegistry } from "$/lib/props-registry/createPropsRegistry";

export const buttonRegistry = createPropsRegistry({
    component : "Button",

    // Props in display order
    props : {
        children : {
            label        : "Content",
            control      : "InputField",
            defaultValue : "Button",
            inputProps   : {
                helpText : "The text content of the button",
            },
        },
        kind : {
            label        : "kind",
            control      : "RadioTabGroup",
            options      : [
                { value : "primary", label : "primary" },
                { value : "secondary", label : "secondary" },
                { value : "tertiary", label : "tertiary" },
                { value : "custom", label : "custom" },
            ],
            defaultValue : "primary",
        },
        size : {
            label        : "size",
            control      : "RadioTabGroup",
            options      : ["none", "nano", "micro", "tiny", "small", "medium", "large", "huge"],
            defaultValue : "small",
        },
        shape : {
            label        : "Shape",
            control      : "RadioTabGroup",
            options      : [
                { value : "rounded", label : "rounded" },
                { value : "curved", label : "curved" },
            ],
        },
        isLoading : {
            label        : "isLoading",
            control      : "Checkbox",
            defaultValue : false,
            inputProps   : {
                helpText : "Shows a loading spinner",
            },
        },
        label : {
            label  : "Label",
            control : "InputField",
            inputProps : {
                helpText : "Accessible label for screen readers",
            },
        },
        onClick : {
            hidden : true,
        },
        onDelete : {
            hidden : true,
        },
    },
});
