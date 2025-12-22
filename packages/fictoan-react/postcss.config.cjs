const postcssNesting = require("postcss-nesting");
const autoprefixer = require("autoprefixer");
const colorMixFunction = require("@csstools/postcss-color-mix-function");

module.exports = {
    plugins: [
        postcssNesting,
        autoprefixer,
        // Polyfill color-mix() for older browsers (static values only)
        colorMixFunction,
    ],
};
