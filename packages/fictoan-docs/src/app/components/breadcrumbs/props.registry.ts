// Configuration for Breadcrumbs component documentation

// LIB =================================================================================================================
import { createPropsRegistry } from "$/lib/props-registry/createPropsRegistry";

export const breadcrumbsRegistry = createPropsRegistry({
    component : "Breadcrumbs",

    // Props in display order
    props : {
        separator : {
            label        : "Separator",
            control      : "InputField",
            defaultValue : "/",
            inputProps   : {
                helpText : "Character(s) to separate breadcrumb items",
            },
        },
        spacing : {
            label        : "Spacing",
            control      : "RadioTabGroup",
            options      : ["none", "nano", "micro", "tiny", "small", "medium", "large", "huge"],
            defaultValue : "small",
            inputProps   : {
                helpText : "Space between breadcrumb items",
            },
        },
    },
});
