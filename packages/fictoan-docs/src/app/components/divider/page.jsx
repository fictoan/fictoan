import DividerDocs from "./page.client";

export const metadata = {
    title       : "Divider component — Fictoan UI",
    description : "A horizontal line to separate content",
    openGraph   : {
        title       : "Divider component — Fictoan UI",
        description : "A horizontal line to separate content",
        url         : "https://fictoan.io/components/divider",
        siteName    : "Fictoan UI",
        images      : [
            {
                url    : "https://fictoan.io/components/option-card/opengraph-image",
                width  : 1200,
                height : 630,
                alt    : "Divider component — Fictoan UI",
            },
        ],
        locale      : "en_US",
        type        : "website",
    },
    twitter     : {
        card        : "summary_large_image",
        title       : "Divider component — Fictoan UI",
        description : "A horizontal line to separate content",
        images      : ["https://fictoan.io/components/option-card/opengraph-image"],
    },
};

export default function Page() {
    return <DividerDocs />;
}
