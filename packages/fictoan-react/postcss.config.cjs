const postcssNesting = require("postcss-nesting");
const autoprefixer = require("autoprefixer");
const purgecss = require("@fullhuman/postcss-purgecss").default;
const colorMixFunction = require("@csstools/postcss-color-mix-function");

const isProduction = process.env.NODE_ENV === "production";

module.exports = {
    plugins: [
        postcssNesting,
        autoprefixer,
        // Polyfill color-mix() for older browsers (static values only)
        colorMixFunction,
        // PurgeCSS - only in production builds
        // Note: For component libraries, we safelist colour utilities
        // since consumers may use any combination
        isProduction && purgecss({
            content: [
                "./src/**/*.tsx",
                "./src/**/*.ts",
            ],
            // Safelist patterns for dynamic classes
            safelist: {
                // Keep all colour utility classes (consumers need full palette)
                standard: [
                    /^bg-/,
                    /^text-/,
                    /^border-/,
                    /^fill-/,
                    /^stroke-/,
                ],
                // Keep CSS variables
                deep: [
                    /^:root$/,
                ],
                // Keep data attributes used by components
                greedy: [
                    /^\[data-/,
                    /^data-/,
                ],
            },
            // Don't purge CSS variables
            variables: false,
            // Extract class names from these file types
            defaultExtractor: content => {
                // Match class names, including those with colons (for pseudo-classes)
                const matches = content.match(/[\w-/:]+(?<!:)/g) || [];
                return matches;
            },
        }),
    ].filter(Boolean),
};
