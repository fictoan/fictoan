export const enhancements = {
    summary: {
        label: "Summary content",
        hidden: true, // Hide from controls since it's always required
        alwaysIncludeInCode: true,
        codeValue: "{<Text>Click me</Text>}" // The exact code to include
    },
    open: {
        label: "Initially open"
    }
};

export const componentTemplate = {
    hasChildren: true,
    childrenContent: "Accordion content goes here"
};