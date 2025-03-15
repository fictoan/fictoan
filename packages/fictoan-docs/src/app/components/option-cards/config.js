export const optionCardProps = {
    component: "OptionCard",
    properties: [
        "allowMultipleSelections",
        "showTickIcon",
        "tickPosition",
        "disabled",
        "defaultSelectedIds",
        "onSelectionChange",
        "selectionLimit",
    ],
    variables: {
        "option-card-border-width": {
            type: "reference",
            defaultValue: "global-border-width",
        },
        "option-card-focus": {
            type: "reference",
            defaultValue: "global-focus-colour",
        },
        "option-card-bg-hover": {
            type: "reference",
            defaultValue: "green-light-70",
        },
        "option-card-border-hover": {
            type: "reference",
            defaultValue: "green-light-40",
        },
        "option-card-tick-bg-hover": {
            type: "reference",
            defaultValue: "green-light-60",
        },
        "option-card-tick-line-hover": {
            type: "reference",
            defaultValue: "green",
        },
        "option-card-bg-selected": {
            type: "reference",
            defaultValue: "green-light-60",
        },
        "option-card-border-selected": {
            type: "reference",
            defaultValue: "green",
        },
        "option-card-tick-bg-selected": {
            type: "reference",
            defaultValue: "green-dark10",
        },
        "option-card-tick-line-selected": {
            type: "reference",
            defaultValue: "white",
        },
    },
};
