export const tabsProps = {
    component  : "Table",
    properties : [
        "tabs",
    ],
    variables  : {
        "tabs-bg"                : {
            type         : "reference",
            defaultValue : "transparent",
        },
        "tab-label-default"      : {
            type         : "reference",
            defaultValue : "slate",
        },
        "tab-label-hover"        : {
            type         : "reference",
            defaultValue : "blue-light40",
        },
        "tab-label-active"       : {
            type         : "reference",
            defaultValue : "blue",
        },
        "tab-label-disabled"     : {
            type         : "reference",
            defaultValue : "slate-light40",
        },
        "tab-border-active"      : {
            type         : "reference",
            defaultValue : "blue",
        },
        "tab-alert-badge-bg"     : {
            type         : "reference",
            defaultValue : "red",
        },
        "tab-alert-badge-border" : {
            type         : "reference",
            defaultValue : "red",
        },
    },
};
