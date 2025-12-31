// Configuration for Tooltip component documentation

// LIB =================================================================================================================
import { createPropsRegistry } from "$/lib/props-registry/createPropsRegistry";

export const tooltipRegistry = createPropsRegistry({
    component : "Tooltip",

    // Show the target element relationship in code
    codePrefix : `{/* Target element with an ID */}
<Button id="my-button">
    Hover me
</Button>`,

    // Always show isTooltipFor in generated code
    alwaysShowProps : ["isTooltipFor"],

    // Props in display order
    props : {
        children : {
            label        : "Content",
            control      : "InputField",
            defaultValue : "This is a tooltip",
            inputProps   : {
                helpText : "The tooltip content, also accepts React nodes",
            },
        },
        isTooltipFor : {
            label        : "Target ID",
            control      : "InputField",
            defaultValue : "my-button",
            hidden       : true,
        },
        position : {
            label        : "Position",
            control      : "RadioTabGroup",
            options      : ["top", "bottom", "left", "right"],
            defaultValue : "top",
        },
        showOn : {
            label        : "Show on",
            control      : "RadioTabGroup",
            options      : ["hover", "click"],
            defaultValue : "hover",
        },
    },
});
