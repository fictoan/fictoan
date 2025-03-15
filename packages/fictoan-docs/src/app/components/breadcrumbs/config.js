export const breadcrumbsProps = {
    component  : "Breadcrumbs",
    properties : [
        "spacing",
        "separator",
        "bgColour",
    ],
    variables  : {
        "breadcrumbs-wrapper-bg"            : {
            type         : "reference",
            defaultValue : "transparent",
        },
        "breadcrumb-item-separator-colour"  : {
            type         : "reference",
            defaultValue : "slate-light10",
        },
        "breadcrumb-item-text-colour"  : {
            type         : "reference",
            defaultValue : "paragraph-text-colour",
        },
        "breadcrumb-item-text-colour-active"  : {
            type         : "reference",
            defaultValue : "paragraph-text-colour",
        },
    }
};
