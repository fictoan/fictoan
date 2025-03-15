export const meterProps = {
    variables  : {
        "meter-bg"            : {
            type         : "reference",
            defaultValue : "slate-light70",
        },
        "meter-border"        : {
            type         : "reference",
            defaultValue : "slate-light40",
        },
        "meter-border-width"  : {
            type         : "reference",
            defaultValue : "global-border-width",
        },
        "meter-label"         : {
            type         : "reference",
            defaultValue : "slate",
        },
        "meter-value"         : {
            type         : "reference",
            defaultValue : "slate",
        },
        "meter-border-radius" : {
            type         : "reference",
            defaultValue : "global-border-radius",
        },
        "meter-height"        : {
            type         : "value-unit",
            defaultValue : 24,
            unit         : "px",
        },
        "meter-danger"        : {
            type         : "reference",
            defaultValue : "red-light10",
        },
        "meter-low"           : {
            type         : "reference",
            defaultValue : "amber-light10",
        },
        "meter-optimum"       : {
            type         : "reference",
            defaultValue : "green-dark10",
        },
    },
};
