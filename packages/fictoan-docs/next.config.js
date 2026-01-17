/** @type {import("next").NextConfig} */

module.exports = {
    images : { unoptimized : true },
    output : "export",
    turbopack : {
        rules : {
            "*.svg" : {
                loaders : ["@svgr/webpack"],
                as      : "*.js",
            },
        },
    },
    webpack(config, options) {
        config.module.rules.push({
            test : /\.svg$/,
            use  : ["@svgr/webpack"],
        });

        return config;
    },
};
