export const toKebabCase = (str) =>
    str
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, ""); // Remove leading/trailing hyphens
