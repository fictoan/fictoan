export const enhancements = {
    separator: {
        label: "Separator character"
    },
    spacing: {
        label: "Spacing between items",
        options: [
            { id: "spacing-none", value: "none", label: "none" },
            { id: "spacing-nano", value: "nano", label: "nano" },
            { id: "spacing-micro", value: "micro", label: "micro" },
            { id: "spacing-tiny", value: "tiny", label: "tiny" },
            { id: "spacing-small", value: "small", label: "small" },
            { id: "spacing-medium", value: "medium", label: "medium" },
            { id: "spacing-large", value: "large", label: "large" },
            { id: "spacing-huge", value: "huge", label: "huge" },
        ]
    }
};

export const componentTemplate = {
    hasChildren: true,
    childrenContent: `<Link href="/">Home</Link>
    <Link href="/components">Components</Link>
    <Link href="/components/breadcrumbs">Breadcrumbs</Link>`
};