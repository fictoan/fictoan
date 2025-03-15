export const rangeProps = {
    component: "Range",
    properties: [
        "label",
        "value",
        "min",
        "max",
        "step",
        "suffix"
    ],
    variables: {
        "range-track-bg": {
            type: "reference",
            defaultValue: "slate-light-70"
        },
        "range-thumb-bg": {
            type: "reference",
            defaultValue: "blue-light-20"
        },
        "range-thumb-border": {
            type: "reference",
            defaultValue: "blue-light-20"
        },
        "range-border-focus": {
            type: "reference",
            defaultValue: "blue"
        },
        "range-outline-focus": {
            type: "reference",
            defaultValue: "blue"
        }
    }
};
