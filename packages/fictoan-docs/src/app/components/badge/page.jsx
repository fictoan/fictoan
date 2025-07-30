import BadgeDocs from "./page.client";

export const metadata = {
    title       : "Badge component — Fictoan UI",
    description : "An inline-element to highlight information",
    openGraph   : {
        title       : "Badge component — Fictoan UI",
        description : "An inline-element to highlight information",
        url         : "https://fictoan.io/components/badge",
        siteName    : "Fictoan UI",
        images      : [
            {
                url    : "https://fictoan.io/components/badge/opengraph-image",
                width  : 1200,
                height : 630,
                alt    : "Badge component — Fictoan UI",
            },
        ],
        locale      : "en_US",
        type        : "website",
    },
    twitter     : {
        card        : "summary_large_image",
        title       : "Badge component — Fictoan UI",
        description : "An inline-element to highlight information",
        images      : ["https://fictoan.io/components/badge/opengraph-image"],
    },
};

export default function Page() {
    return <BadgeDocs />;
}
