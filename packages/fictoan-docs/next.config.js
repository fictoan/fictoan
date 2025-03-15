/** @type {import("next").NextConfig} */

module.exports = {
    images : { unoptimized : true },
    output : "export",
    webpack(config, options) {
        config.module.rules.push({
            test : /\.svg$/,
            use  : ["@svgr/webpack"],
        });

        return config;
    },
};
