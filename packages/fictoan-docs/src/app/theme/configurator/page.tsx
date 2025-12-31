import ThemeConfigurator from "./page.client";

export const metadata = {
    title       : "Theme Configurator — Fictoan UI",
    description : "Build and customise your Fictoan theme with a visual configurator",
    openGraph   : {
        title       : "Theme Configurator — Fictoan UI",
        description : "Build and customise your Fictoan theme with a visual configurator",
        url         : "https://fictoan.io/theme/configurator",
        siteName    : "Fictoan UI",
        locale      : "en_US",
        type        : "website",
    },
    twitter     : {
        card        : "summary_large_image",
        title       : "Theme Configurator — Fictoan UI",
        description : "Build and customise your Fictoan theme with a visual configurator",
    },
};

export default function Page() {
    return <ThemeConfigurator />;
}
