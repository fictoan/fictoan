// Configuration for Badge component documentation

// LIB =================================================================================================================
import { createPropsRegistry } from "$/lib/props-registry/createPropsRegistry";

export const badgeRegistry = createPropsRegistry({
    component : "Badge",

    // Props in display order
    props : {
        children : {
            label        : "Content",
            control      : "InputField",
            defaultValue : "Badge",
            inputProps   : {
                helpText : "The text content of the badge, also accepts React nodes as well",
            },
        },
        size : {
            label        : "Size",
            control      : "RadioTabGroup",
            options      : ["none", "nano", "micro", "tiny", "small", "medium", "large", "huge"],
            defaultValue : "medium",
        },
        shape : {
            label        : "Shape",
            control      : "RadioTabGroup",
            options      : [
                { value : "rounded", label : "rounded" },
                { value : "curved", label : "curved" },
            ],
            defaultValue : "rounded",
        },
        hasDelete : {
            label        : "hasDelete",
            control      : "Checkbox",
            defaultValue : false,
            inputProps   : {
                helpText : "Shows a delete button on the badge",
            },
        },
        onDelete : {
            hidden : true,
        },
    },
});
