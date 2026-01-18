import ThemeConfigurator from "./page.client";

export const metadata = {
    title       : "Theme Configurator — FictoanUI",
    description : "Build and customise your Fictoan theme with a visual configurator",
    openGraph   : {
        title       : "Theme Configurator — FictoanUI",
        description : "Build and customise your Fictoan theme with a visual configurator",
        url         : "https://fictoan.io/theme/configurator",
        siteName    : "FictoanUI",
        images      : [
            {
                url    : "https://fictoan.io/opengraph-image",
                width  : 1200,
                height : 630,
                alt    : "Theme Configurator — FictoanUI",
            },
        ],
        locale      : "en_US",
        type        : "website",
    },
    twitter     : {
        card        : "summary_large_image",
        title       : "Theme Configurator — FictoanUI",
        description : "Build and customise your Fictoan theme with a visual configurator",
        images      : ["https://fictoan.io/opengraph-image"],
    },
};

export default function Page() {
    return <ThemeConfigurator />;
}
