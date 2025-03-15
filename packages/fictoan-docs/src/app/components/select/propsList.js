export const listOfSelectProps = {
    elementName : "Select",
    props       : [
        {
            name         : "label",
            description  : "A label for the select",
            values       : [""],
            defaultValue : "",
        },
        {
            name         : "options",
            description  : "An array of options that appear in the dropdown",
            values       : ["Scalar integer"],
            defaultValue : "",
        },
    ],
    variables   : {
        "dropdown-chevron" : {
            type         : "reference",
            defaultValue : "slate-light40",
        },
    },
};

export const listOfOptionsProps = {
    elementName : "Select",
    props       : [
        {
            name         : "name",
            description  : "The visible string displayed in the dropdown",
            values       : [""],
            defaultValue : "",
        },
        {
            name         : "value",
            description  : "An array of options that appear in the dropdown",
            values       : ["Scalar integer"],
            defaultValue : "&mdash;",
        },
    ],
};
