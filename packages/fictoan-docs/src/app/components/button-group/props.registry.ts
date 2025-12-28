// Configuration for ButtonGroup component documentation

// LIB =================================================================================================================
import { createPropsRegistry } from "$/lib/props-registry/createPropsRegistry";

export const buttonGroupRegistry = createPropsRegistry({
    component : "ButtonGroup",

    // Props in display order
    props : {
        isJoint : {
            label        : "isJoint",
            control      : "Checkbox",
            defaultValue : true,
            inputProps   : {
                helpText : "Joins buttons seamlessly with collapsed borders",
            },
        },
        spacing : {
            label        : "spacing",
            control      : "RadioTabGroup",
            options      : ["none", "nano", "micro", "tiny", "small", "medium", "large", "huge"],
            inputProps   : {
                helpText : "Gap between buttons (only applies when isJoint is false)",
            },
        },
        equaliseWidth : {
            label        : "equaliseWidth",
            control      : "Checkbox",
            defaultValue : false,
            inputProps   : {
                helpText : "Makes all buttons take equal width",
            },
        },
        stackVertically : {
            label        : "stackVertically",
            control      : "Checkbox",
            defaultValue : false,
            inputProps   : {
                helpText : "Stack buttons vertically instead of horizontally",
            },
        },
    },
});
