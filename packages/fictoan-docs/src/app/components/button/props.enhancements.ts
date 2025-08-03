export const enhancements = {
    kind: {
        group: "Appearance",
        options: [
            { id: "kind-custom", value: "custom", label: "custom" },
            { id: "kind-primary", value: "primary", label: "primary" },
            { id: "kind-secondary", value: "secondary", label: "secondary" },
            { id: "kind-tertiary", value: "tertiary", label: "tertiary" },
        ]
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
            { id: "shape-none", value: "none", label: "none" },
            { id: "shape-rounded", value: "rounded", label: "rounded" },
            { id: "shape-curved", value: "curved", label: "curved" },
        ]
    },
    isLoading: {
        label: "Show loading state",
        group: "Behavior"
    },
    hasDelete: {
        label: "Show delete icon",
        group: "Behavior"
    },
    label: {
        hidden: true
    }
};

export const componentTemplate = {
    hasChildren: true,
    childrenContent: "Button"
};