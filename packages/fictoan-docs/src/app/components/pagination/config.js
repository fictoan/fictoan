// config.js
export const paginationProps = {
    component  : "Pagination",
    properties : [
        "totalItems",
        "currentPage",
        "itemsToShowEachSide",
        "kind",
        "isLoading",
        "disabled",
        "hideDisabledButtons",
        "showGoToFirstItemButton",
        "showGoToLastItemButton",
        "showPreviousButton",
        "showNextButton",
        "showGoToInput",
        "loadingText",
        "emptyText",
    ],
    variables  : {
        // DIMENSIONS =======================================================
        "pagination-item-height"        : {
            type         : "value-unit",
            value        : 32,
            unit         : "px",
        },
        "pagination-item-min-width"     : {
            type         : "value-unit",
            value        : 32,
            unit         : "px",
        },
        "pagination-item-border-width"  : {
            type         : "reference",
            defaultValue : "global-border-width",
        },
        "pagination-item-border-radius" : {
            type         : "reference",
            defaultValue : "global-border-radius",
        },

        // PLAIN STYLE =======================================================
        "pagination-item-bg-default"      : {
            type         : "reference",
            defaultValue : "transparent",
        },
        "pagination-item-text-default"    : {
            type         : "reference",
            defaultValue : "paragraph-text-colour",
        },
        "pagination-item-border-default"  : {
            type         : "reference",
            defaultValue : "transparent",
        },
        "pagination-item-bg-hover"        : {
            type         : "reference",
            defaultValue : "transparent",
        },
        "pagination-item-text-hover"      : {
            type         : "reference",
            defaultValue : "paragraph-text-colour",
        },
        "pagination-item-border-hover"    : {
            type         : "reference",
            defaultValue : "transparent",
        },
        "pagination-item-bg-selected"     : {
            type         : "reference",
            defaultValue : "transparent",
        },
        "pagination-item-text-selected"   : {
            type         : "reference",
            defaultValue : "blue",
        },
        "pagination-item-border-selected" : {
            type         : "reference",
            defaultValue : "transparent",
        },
        "pagination-arrows-stroke"        : {
            type         : "reference",
            defaultValue : "slate",
        },

        // OUTLINED STYLE ==================================================
        "pagination-item-outlined-bg-default"      : {
            type         : "reference",
            defaultValue : "transparent",
        },
        "pagination-item-outlined-text-default"    : {
            type         : "reference",
            defaultValue : "blue",
        },
        "pagination-item-outlined-border-default"  : {
            type         : "reference",
            defaultValue : "blue",
        },
        "pagination-item-outlined-bg-hover"        : {
            type         : "reference",
            defaultValue : "transparent",
        },
        "pagination-item-outlined-text-hover"      : {
            type         : "reference",
            defaultValue : "blue-light60",
        },
        "pagination-item-outlined-border-hover"    : {
            type         : "reference",
            defaultValue : "blue-light60",
        },
        "pagination-item-outlined-bg-selected"     : {
            type         : "reference",
            defaultValue : "transparent",
        },
        "pagination-item-outlined-text-selected"   : {
            type         : "reference",
            defaultValue : "blue",
        },
        "pagination-item-outlined-border-selected" : {
            type         : "reference",
            defaultValue : "blue",
        },
        "pagination-arrows-outlined-stroke"        : {
            type         : "reference",
            defaultValue : "slate",
        },

        // FILLED STYLE ===================================================
        "pagination-item-filled-bg-default"      : {
            type         : "reference",
            defaultValue : "blue-light80",
        },
        "pagination-item-filled-text-default"    : {
            type         : "reference",
            defaultValue : "blue",
        },
        "pagination-item-filled-border-default"  : {
            type         : "reference",
            defaultValue : "blue-light80",
        },
        "pagination-item-filled-bg-hover"        : {
            type         : "reference",
            defaultValue : "blue-light40",
        },
        "pagination-item-filled-text-hover"      : {
            type         : "reference",
            defaultValue : "blue",
        },
        "pagination-item-filled-border-hover"    : {
            type         : "reference",
            defaultValue : "blue-light40",
        },
        "pagination-item-filled-bg-selected"     : {
            type         : "reference",
            defaultValue : "blue",
        },
        "pagination-item-filled-text-selected"   : {
            type         : "reference",
            defaultValue : "white",
        },
        "pagination-item-filled-border-selected" : {
            type         : "reference",
            defaultValue : "blue",
        },
        "pagination-arrows-filled-stroke"        : {
            type         : "reference",
            defaultValue : "slate",
        },

        // DISABLED STATE ================================================
        "pagination-item-bg-disabled"       : {
            type         : "reference",
            defaultValue : "transparent",
        },
        "pagination-item-text-disabled"     : {
            type         : "reference",
            defaultValue : "transparent",
        },
        "pagination-item-border-disabled"   : {
            type         : "reference",
            defaultValue : "transparent",
        },
        "pagination-arrows-stroke-disabled" : {
            type         : "reference",
            defaultValue : "slate-opacity40",
        },

        // INPUT =======================================================
        "pagination-input-bg"     : {
            type         : "reference",
            defaultValue : "input-bg-default",
        },
        "pagination-input-border" : {
            type         : "reference",
            defaultValue : "input-border-default",
        },
        "pagination-input-text"   : {
            type         : "reference",
            defaultValue : "input-text-default",
        },

        // INFO TEXT ==================================================
        "pagination-info-text" : {
            type         : "reference",
            defaultValue : "paragraph-text-colour",
        },
        "pagination-info-font" : {
            type         : "reference",
            defaultValue : "paragraph-font",
        },
    },
};
