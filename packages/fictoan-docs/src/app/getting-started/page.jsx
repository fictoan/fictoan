import GettingStarted from "./page.client";

export const metadata = {
    title       : "Getting started — Fictoan UI",
    description : "Start using Fictoan to build modern interfaces for the web",
    openGraph   : {
        title       : "Getting started — Fictoan UI",
        description : "Start using Fictoan to build modern interfaces for the web",
        url         : "https://fictoan.io/getting-started",
        siteName    : "Fictoan UI",
        images      : [
            {
                url    : "https://fictoan.io/components/option-card/opengraph-image",
                width  : 1200,
                height : 630,
                alt    : "Getting started — Fictoan UI",
            },
        ],
        locale      : "en_US",
        type        : "website",
    },
    twitter     : {
        card        : "summary_large_image",
        title       : "Getting started — Fictoan UI",
        description : "Start using Fictoan to build modern interfaces for the web",
        images      : ["https://fictoan.io/components/option-card/opengraph-image"],
    },
};

export default function Page() {
    return <GettingStarted />;
}
