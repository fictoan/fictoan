export const toastProps = {
    component : "CodeBlock",
    variables : {
        "code-font"                      : {
            type         : "reference",
            defaultValue : "font-mono",
        },
        "code-inline-font-size"          : {
            type         : "value-unit",
            defaultValue : 0.8,
            "unit"       : "rem",
        },
        "code-inline-bg"                 : {
            type         : "reference",
            defaultValue : "blue-light80",
        },
        "code-inline-text"               : {
            type         : "reference",
            defaultValue : "blue-dark40",
        },
        "code-inline-border-radius"      : {
            type         : "reference",
            defaultValue : "global-border-radius",
        },
        "code-block-font-size"           : {
            type         : "value-unit",
            defaultValue : 0.92,
            "unit"       : "rem",
        },
        "code-block-bg"                  : {
            type         : "reference",
            defaultValue : "slate-dark80",
        },
        "code-block-text"                : {
            type         : "reference",
            defaultValue : "blue-dark40",
        },
        "code-block-line-height"         : {
            type         : "value-unit",
            defaultValue : 1.8,
            "unit"       : "",
        },
        "code-block-border-radius"       : {
            type         : "reference",
            defaultValue : "global-border-radius",
        },
        "code-block-line-numbers"        : {
            type         : "reference",
            defaultValue : "slate-dark30",
        },
        "code-block-copy-button-bg"      : {
            type         : "reference",
            defaultValue : "transparent",
        },
        "code-block-copy-button-text"    : {
            type         : "reference",
            defaultValue : "blue",
        },
        "code-block-copy-button-border"  : {
            type         : "reference",
            defaultValue : "blue-light40",
        },
        "code-block-copied-badge-bg"     : {
            type         : "reference",
            defaultValue : "green-light80",
        },
        "code-block-copied-badge-text"   : {
            type         : "reference",
            defaultValue : "green-dark20",
        },
        "code-block-copied-badge-border" : {
            type         : "reference",
            defaultValue : "green-dark20",
        },


        "token-atrule"               : {
            type         : "reference",
            defaultValue : "teal",
        },
        "token-attrName"             : {
            type         : "reference",
            defaultValue : "orange",
        },
        "token-attrValue"            : {
            type         : "reference",
            defaultValue : "green",
        },
        "token-boolean"              : {
            type         : "reference",
            defaultValue : "green",
        },
        "token-builtin"              : {
            type         : "reference",
            defaultValue : "violet-light20",
        },
        "token-cdata"                : {
            type         : "reference",
            defaultValue : "grey",
        },
        "token-className"            : {
            type         : "reference",
            defaultValue : "red",
        },
        "token-comment"              : {
            type         : "reference",
            defaultValue : "grey",
        },
        "token-constant"             : {
            type         : "reference",
            defaultValue : "green",
        },
        "token-deleted"              : {
            type         : "reference",
            defaultValue : "slate",
        },
        "token-delimiter"            : {
            type         : "reference",
            defaultValue : "grey",
        },
        "token-doctype"              : {
            type         : "reference",
            defaultValue : "amber-light10",
        },
        "token-entity"               : {
            type         : "reference",
            defaultValue : "green",
        },
        "token-function"             : {
            type         : "reference",
            defaultValue : "orange",
        },
        "token-hexcode"              : {
            type         : "reference",
            defaultValue : "white",
        },
        "token-important"            : {
            type         : "reference",
            defaultValue : "red",
        },
        "token-inserted"             : {
            type         : "reference",
            defaultValue : "green",
        },
        "token-italic"               : {
            type         : "reference",
            defaultValue : "green",
        },
        "token-keyword"              : {
            type         : "reference",
            defaultValue : "violet-light20",
        },
        "token-name"                 : {
            type         : "reference",
            defaultValue : "green",
        },
        "token-namespace"            : {
            type         : "reference",
            defaultValue : "green",
        },
        "token-number"               : {
            type         : "reference",
            defaultValue : "crimson-dark10",
        },
        "token-operator"             : {
            type         : "reference",
            defaultValue : "amber",
        },
        "token-plain"                : {
            type         : "reference",
            defaultValue : "grey",
        },
        "token-plain-html"           : {
            type         : "reference",
            defaultValue : "slate",
        },
        "token-plain-css"            : {
            type         : "reference",
            defaultValue : "salmon-light30",
        },
        "token-prolog"               : {
            type         : "reference",
            defaultValue : "grey",
        },
        "token-property"             : {
            type         : "reference",
            defaultValue : "pistachio-dark20",
        },
        "token-property-css"         : {
            type         : "reference",
            defaultValue : "slate",
        },
        "token-punctuation"          : {
            type         : "reference",
            defaultValue : "grey",
        },
        "token-regex"                : {
            type         : "reference",
            defaultValue : "green",
        },
        "token-selector-generic"     : {
            type         : "reference",
            defaultValue : "green-light20",
        },
        "token-selector-class"       : {
            type         : "reference",
            defaultValue : "violet-light20",
        },
        "token-selector-id"          : {
            type         : "reference",
            defaultValue : "violet-light40",
        },
        "token-selector-attrName"    : {
            type         : "reference",
            defaultValue : "blue-dark20",
        },
        "token-selector-attrValue"   : {
            type         : "reference",
            defaultValue : "blue-light20",
        },
        "token-selector-operator"    : {
            type         : "reference",
            defaultValue : "amber",
        },
        "token-selector-punctuation" : {
            type         : "reference",
            defaultValue : "grey",
        },
        "token-string"               : {
            type         : "reference",
            defaultValue : "grey-light50",
        },
        "token-string-json"          : {
            type         : "reference",
            defaultValue : "slate",
        },
        "token-symbol"               : {
            type         : "reference",
            defaultValue : "green",
        },
        "token-tag"                  : {
            type         : "reference",
            defaultValue : "violet",
        },
        "token-unit"                 : {
            type         : "reference",
            defaultValue : "crimson-light20",
        },
        "token-url"                  : {
            type         : "reference",
            defaultValue : "green",
        },
        "token-variable"             : {
            type         : "reference",
            defaultValue : "orange",
        },
    },
};
