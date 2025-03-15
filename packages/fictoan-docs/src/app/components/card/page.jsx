import CardDocs from "./page.client";

export const metadata = {
    title       : "Card component — Fictoan UI",
    description : "A box to put all sorts of content inside",
    openGraph   : {
        title       : "Card component — Fictoan UI",
        description : "A box to put all sorts of content inside",
        url         : "https://fictoan.io/components/card",
        siteName    : "Fictoan UI",
        images      : [
            {
                url    : "https://fictoan.io/components/option-card/opengraph-image",
                width  : 1200,
                height : 630,
                alt    : "Card component — Fictoan UI",
            },
        ],
        locale      : "en_US",
        type        : "website",
    },
    twitter     : {
        card        : "summary_large_image",
        title       : "Card component — Fictoan UI",
        description : "A box to put all sorts of content inside",
        images      : ["https://fictoan.io/components/option-card/opengraph-image"],
    },
};

export default function Page() {
    return <CardDocs />;
}
