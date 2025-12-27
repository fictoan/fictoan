// Configuration for Card component documentation

// LIB =================================================================================================================
import { createPropsRegistry } from "$/lib/props-registry/createPropsRegistry";

export const cardRegistry = createPropsRegistry({
    component : "Card",

    // Props in display order
    props : {
        heading : {
            label        : "Heading",
            control      : "InputField",
            inputProps   : {
                helpText : "Optional heading displayed at the top of the card",
            },
        },
        children : {
            label        : "Content",
            control      : "TextArea",
            defaultValue : "Content shows up here",
            inputProps   : {
                helpText : "The main content of the card",
            },
        },
    },
});
