import CalloutDocs from "./page.client";

export const metadata = {
    title       : "Callout component — Fictoan UI",
    description : "A coloured card to draw attention",
    openGraph   : {
        title       : "Callout component — Fictoan UI",
        description : "A coloured card to draw attention",
        url         : "https://fictoan.io/components/callout",
        siteName    : "Fictoan UI",
        images      : [
            {
                url    : "https://fictoan.io/components/option-card/opengraph-image",
                width  : 1200,
                height : 630,
                alt    : "Callout component — Fictoan UI",
            },
        ],
        locale      : "en_US",
        type        : "website",
    },
    twitter     : {
        card        : "summary_large_image",
        title       : "Callout component — Fictoan UI",
        description : "A coloured card to draw attention",
        images      : ["https://fictoan.io/components/option-card/opengraph-image"],
    },
};

export default function Page() {
    return <CalloutDocs />;
}
