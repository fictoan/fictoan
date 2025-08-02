export const enhancements = {
    withDelete: {
        label: "Show delete button"
    },
    size: {
        group: "Appearance",
        options: [
            { id: "size-none", value: "none", label: "none" },
            { id: "size-nano", value: "nano", label: "nano" },
            { id: "size-micro", value: "micro", label: "micro" },
            { id: "size-tiny", value: "tiny", label: "tiny" },
            { id: "size-small", value: "small", label: "small" },
            { id: "size-medium", value: "medium", label: "medium" },
            { id: "size-large", value: "large", label: "large" },
            { id: "size-huge", value: "huge", label: "huge" },
        ]
    },
    shape: {
        group: "Appearance",
        options: [
            { id: "shape-rounded", value: "rounded", label: "rounded" },
            { id: "shape-curved", value: "curved", label: "curved" },
        ]
    },
    onDelete: {
        hidden: true
    }
};