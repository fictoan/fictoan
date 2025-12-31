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
        actionIcon : {
            label        : "Action icon",
            control      : "RadioTabGroup",
            options      : [
                { value : "", label : "none" },
                { value : "tick", label : "tick" },
                { value : "cross", label : "cross" },
                { value : "plus", label : "plus" },
                { value : "minus", label : "minus" },
            ],
            defaultValue : "",
            inputProps   : {
                helpText : "Shows an action button with the selected icon",
            },
        },
        actionAriaLabel : {
            label        : "Action aria-label",
            control      : "InputField",
            defaultValue : "Remove badge",
            inputProps   : {
                helpText : "Accessible label for the action button",
            },
        },
        onActionClick : {
            hidden : true,
        },
    },
});
