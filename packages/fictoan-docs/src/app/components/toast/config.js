export const toastProps = {
    component  : "Toast",
    properties : [
        "tabs",
    ],
    variables  : {
        "toast-bg"            : {
            type         : "reference",
            defaultValue : "slate-light10",
        },
        "toast-text"          : {
            type         : "reference",
            defaultValue : "black",
        },
        "toast-border-radius" : {
            type         : "reference",
            defaultValue : "global-border-radius",
        },
    },
};