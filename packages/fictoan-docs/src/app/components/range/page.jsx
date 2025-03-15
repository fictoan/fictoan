import RangeDocs from "./page.client";

export const metadata = {
    title       : "Range component — Fictoan UI",
    description : "A small static floating popup",
    openGraph   : {
        title       : "Range component — Fictoan UI",
        description : "A small static floating popup",
        url         : "https://fictoan.io/components/toast",
        siteName    : "Fictoan UI",
        images      : [
            {
                url    : "https://fictoan.io/components/option-card/opengraph-image",
                width  : 1200,
                height : 630,
                alt    : "Range component — Fictoan UI",
            },
        ],
        locale      : "en_US",
        type        : "website",
    },
    twitter     : {
        card        : "summary_large_image",
        title       : "Range component — Fictoan UI",
        description : "A small static floating popup",
        images      : ["https://fictoan.io/components/option-card/opengraph-image"],
    },
};

export default function Page() {
    return <RangeDocs />;
}
