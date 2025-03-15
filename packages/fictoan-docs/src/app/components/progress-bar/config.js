export const progressProps = {
    component  : "ProgressBar",
    properties : [
        "barBg",
        "barFill",
        "suffix",
        "height",
    ],
    variables  : {
        "progress-bar-bg"            : {
            type         : "reference",
            defaultValue : "slate-light60",
        },
        "progress-bar-fill"          : {
            type         : "reference",
            defaultValue : "blue",
        },
        "progress-bar-label"         : {
            type         : "reference",
            defaultValue : "slate",
        },
        "progress-bar-value"         : {
            type         : "reference",
            defaultValue : "slate",
        },
        "progress-bar-border-radius" : {
            type         : "reference",
            defaultValue : "global-border-radius",
        },
        "progress-bar-height"        : {
            type         : "value-unit",
            defaultValue : 8,
            unit         : "px",
        },
    },
};
