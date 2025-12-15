// OTHER ===============================================================================================================
import PlaygroundDocs from "./page.client";

export const metadata = {
    title       : "Layout playground — Fictoan UI",
    description : "Simple props to align and lay elements out on a page",
    openGraph   : {
        title       : "Layout playground — Fictoan UI",
        description : "Simple props to align and lay elements out on a page",
        url         : "https://fictoan.io/layout",
        siteName    : "Fictoan UI",
        images      : [
            {
                url    : "https://fictoan.io/components/option-card/opengraph-image",
                width  : 1200,
                height : 630,
                alt    : "Layout playground — Fictoan UI",
            },
        ],
        locale      : "en_US",
        type        : "website",
    },
    twitter     : {
        card        : "summary_large_image",
        title       : "Layout playground — Fictoan UI",
        description : "Simple props to align and lay elements out on a page",
        images      : ["https://fictoan.io/components/option-card/opengraph-image"],
    },
};

export default function Page() {
    return <PlaygroundDocs />;
}
