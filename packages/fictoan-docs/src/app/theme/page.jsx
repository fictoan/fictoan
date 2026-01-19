import ThemeDocs from "./page.client";

export const metadata = {
    title       : "Theme-ing — Fictoan UI",
    description : "How to setup the colour theme for your project",
    openGraph   : {
        title       : "Theme-ing — Fictoan UI",
        description : "How to setup the colour theme for your project",
        url         : "https://fictoan.io/theme",
        siteName    : "Fictoan UI",
        images      : [
            {
                url    : "https://fictoan.io/theme/opengraph-image",
                width  : 1200,
                height : 630,
                alt    : "Theme-ing — Fictoan UI",
            },
        ],
        locale      : "en_US",
        type        : "website",
    },
    twitter     : {
        card        : "summary_large_image",
        title       : "Theme-ing — Fictoan UI",
        description : "How to setup the colour theme for your project",
        images      : ["https://fictoan.io/theme/opengraph-image"],
    },
};

export default function Page() {
    return <ThemeDocs />;
}
