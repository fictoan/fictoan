export const tableProps = {
    component  : "Table",
    properties : [
        "position",
        "width",
        "openWhen",
        "closeWhen",
        "showOverlay",
        "isDismissible",
        "closeOnClickOutside",
    ],
    variables  : {
        "table-bg"                           : {
            type         : "reference",
            defaultValue : "white",
        },
        "table-border"                       : {
            type         : "reference",
            defaultValue : "slate-light10",
        },
        "table-font"                         : {
            type         : "reference",
            defaultValue : "paragraph-font",
        },
        "table-text"                         : {
            type         : "reference",
            defaultValue : "paragraph-text-colour",
        },
        "table-striped-header-bg"            : {
            type         : "reference",
            defaultValue : "blue-light40",
        },
        "table-striped-cell-bg"              : {
            type         : "reference",
            defaultValue : "slate-light20",
        },
        "table-highlight-bg"                     : {
            type         : "reference",
            defaultValue : "amber-light20",
        },
        "table-highlight-text"                   : {
            type         : "reference",
            defaultValue : "paragraph-text-colour",
        },
    },
};
