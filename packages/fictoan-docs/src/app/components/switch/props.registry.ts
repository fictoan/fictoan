// Configuration for Switch component documentation

// LIB =================================================================================================================
import { createPropsRegistry } from "$/lib/props-registry/createPropsRegistry";

export const switchRegistry = createPropsRegistry({
    component : "Switch",

    // Props in display order
    props : {
        id : {
            label        : "ID",
            control      : "InputField",
            defaultValue : "switch-1",
            inputProps   : {
                helpText : "Unique identifier for the switch",
            },
        },
        label : {
            label        : "Label",
            control      : "InputField",
            defaultValue : "Check me",
            inputProps   : {
                helpText : "Text label displayed next to the switch",
            },
        },
        defaultChecked : {
            label        : "Checked by default",
            control      : "Checkbox",
            defaultValue : false,
        },
        disabled : {
            label        : "Disabled",
            control      : "Checkbox",
            defaultValue : false,
        },
        hideLabel : {
            label        : "Hide label",
            control      : "Checkbox",
            defaultValue : false,
            inputProps   : {
                helpText : "Visually hide the label (still accessible to screen readers)",
            },
        },
        helpText : {
            label   : "Help text",
            control : "InputField",
            inputProps : {
                helpText : "Additional helper text displayed below the switch",
            },
        },
        errorText : {
            label   : "Error text",
            control : "InputField",
            inputProps : {
                helpText : "Error message to display",
            },
        },
        checked : {
            hidden : true, // Controlled prop, not suitable for demo
        },
        onChange : {
            hidden : true,
        },
    },
});
