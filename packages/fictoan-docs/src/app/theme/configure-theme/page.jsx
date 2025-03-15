import GettingStarted from "./page.client";

export const metadata = {
    title       : "Configure theme — Fictoan UI",
    description : "Customise the theme for your project",
    openGraph   : {
        title       : "Configure theme — Fictoan UI",
        description : "Customise the theme for your project",
        url         : "https://fictoan.io/theme/configure-theme",
        siteName    : "Fictoan UI",
        images      : [
            {
                url    : "https://fictoan.io/components/option-card/opengraph-image",
                width  : 1200,
                height : 630,
                alt    : "Configure theme — Fictoan UI",
            },
        ],
        locale      : "en_US",
        type        : "website",
    },
    twitter     : {
        card        : "summary_large_image",
        title       : "Configure theme — Fictoan UI",
        description : "Customise the theme for your project",
        images      : ["https://fictoan.io/components/option-card/opengraph-image"],
    },
};

export default function Page() {
    return <GettingStarted />;
}
