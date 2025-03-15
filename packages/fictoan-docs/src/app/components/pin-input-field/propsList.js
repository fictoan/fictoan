export const listOfPinInputFieldProps = {
    elementName : "",
    props       : [
        {
            name          : "<code>numberOfFields</code>",
            description   : "The number of input fields to be rendered",
            values        : ["number"],
            defaultValues : "text",
        },

        {
            name          : "<code>type</code>",
            description   : "Determines if any character or just digits can be entered",
            values        : ["numeric", "alphaNumeric"],
            defaultValues : "&mdash;",
        },

        {
            name          : "<code>mask</code>",
            description   : "Hide input characters",
            values        : ["boolean"],
            defaultValues : "&mdash;",
        },

        {
            name          : "<code>isOTP</code>",
            description   : "Allows auto-suggestion of OTP from SMS",
            values        : ["boolean"],
            defaultValues : "&mdash;",
        },

        {
            name          : "<code>autoFocus</code>",
            description   : "Focuses the first input field on page load",
            values        : ["boolean"],
            defaultValues : "&mdash;",
        },

        {
            name          : "<code>pasteFromClipboard</code>",
            description   : "Flag for turning on basic input validation",
            values        : ["boolean"],
            defaultValues : "&mdash;",
        },

        {
            name          : "<code>spacing</code>",
            description   : "Temporary text displayed inside the input field when value is empty",
            values        : ["string"],
            defaultValues : "&mdash;",
        },

        {
            name          : "<code>focusFirstInputOnReset</code>",
            description   : "Temporary text displayed inside the input field when value is empty",
            values        : ["string"],
            defaultValues : "&mdash;",
        },
    ],
};





