import TabsDocs from "./page.client";

export const metadata = {
    title       : "Tabs component — Fictoan UI",
    description : "A way to display multiple blocks of content, one at a time",
    openGraph   : {
        title       : "Tabs component — Fictoan UI",
        description : "A way to display multiple blocks of content, one at a time",
        url         : "https://fictoan.io/components/tabs",
        siteName    : "Fictoan UI",
        images      : [
            {
                url    : "https://fictoan.io/components/option-card/opengraph-image",
                width  : 1200,
                height : 630,
                alt    : "Tabs component — Fictoan UI",
            },
        ],
        locale      : "en_US",
        type        : "website",
    },
    twitter     : {
        card        : "summary_large_image",
        title       : "Tabs component — Fictoan UI",
        description : "A way to display multiple blocks of content, one at a time",
        images      : ["https://fictoan.io/components/option-card/opengraph-image"],
    },
};

export default function Page() {
    return <TabsDocs />;
}
