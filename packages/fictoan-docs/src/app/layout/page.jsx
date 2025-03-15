import LayoutDocs from "./page.client";

export const metadata = {
    title       : "Layout — Fictoan UI",
    description : "How to setup the content scaffolding on a page",
    openGraph   : {
        title       : "Layout — Fictoan UI",
        description : "How to setup the content scaffolding on a page",
        url         : "https://fictoan.io/layout",
        siteName    : "Fictoan UI",
        images      : [
            {
                url    : "https://fictoan.io/components/option-card/opengraph-image",
                width  : 1200,
                height : 630,
                alt    : "Layout — Fictoan UI",
            },
        ],
        locale      : "en_US",
        type        : "website",
    },
    twitter     : {
        card        : "summary_large_image",
        title       : "Layout — Fictoan UI",
        description : "How to setup the content scaffolding on a page",
        images      : ["https://fictoan.io/components/option-card/opengraph-image"],
    },
};

export default function Page() {
    return <LayoutDocs />;
}
