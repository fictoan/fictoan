export const sidebarProps = {
    component  : "Sidebar",
    properties : [
        "",
    ],
    variables  : {
        "sidebar-bg"                             : {
            type         : "reference",
            defaultValue : "black",
        },
        "sidebar-width-default"                  : {
            type         : "value-unit",
            defaultValue : 240,
            unit         : "px",
        },
        "sidebar-width-collapsed"                : {
            type         : "value-unit",
            defaultValue : 48,
            unit         : "px",
        },
        "sidebar-border-width"                   : {
            type         : "reference",
            defaultValue : "global-border-width",
        },
        "sidebar-border-right"                   : {
            type         : "reference",
            defaultValue : "slate-dark80",
        },
        "sidebar-header-bg"                      : {
            type         : "reference",
            defaultValue : "white",
        },
        "sidebar-header-border-bottom"           : {
            type         : "reference",
            defaultValue : "slate-dark80",
        },
        "sidebar-header-asset-expanded-width"    : {
            type         : "value-unit",
            defaultValue : 50,
            unit         : "%",
        },
        "sidebar-header-asset-collapsed-width"   : {
            type         : "value-unit",
            defaultValue : 40,
            unit         : "px",
        },
    },
};
