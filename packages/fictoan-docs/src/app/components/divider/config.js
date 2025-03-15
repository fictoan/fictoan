export const hRuleProps = {
    component  : "Divider",
    properties : [
        "kind",
    ],
    variables  : {
        "hr-height"   : {
            type         : "value-unit",
            defaultValue : 1,
            unit         : "px",
        },
        "hr-bg"       : {
            type         : "reference",
            defaultValue : "slate",
        },
        "hr-primary-height"   : {
            type         : "value-unit",
            defaultValue : 4,
            unit         : "px",
        },
        "hr-primary-bg"       : {
            type         : "reference",
            defaultValue : "slate",
        },
        "hr-secondary-height" : {
            type         : "value-unit",
            defaultValue : 2,
            unit         : "px",
        },
        "hr-secondary-bg"     : {
            type         : "reference",
            defaultValue : "slate-light60",
        },
        "hr-tertiary-height"  : {
            type         : "value-unit",
            defaultValue : 1,
            unit         : "px",
        },
        "hr-tertiary-bg"      : {
            type         : "reference",
            defaultValue : "slate-light20",
        },
    },
};
