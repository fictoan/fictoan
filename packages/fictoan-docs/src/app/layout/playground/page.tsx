// OTHER ===============================================================================================================
import PlaygroundDocs from "./page.client";

export const metadata = {
    title       : "Layout playground — FictoanUI",
    description : "Simple props to align and lay elements out on a page",
    openGraph   : {
        title       : "Layout playground — FictoanUI",
        description : "Simple props to align and lay elements out on a page",
        url         : "https://fictoan.io/layout/playground",
        siteName    : "FictoanUI",
        images      : [
            {
                url    : "https://fictoan.io/opengraph-image",
                width  : 1200,
                height : 630,
                alt    : "Layout playground — FictoanUI",
            },
        ],
        locale      : "en_US",
        type        : "website",
    },
    twitter     : {
        card        : "summary_large_image",
        title       : "Layout playground — FictoanUI",
        description : "Simple props to align and lay elements out on a page",
        images      : ["https://fictoan.io/opengraph-image"],
    },
};

export default function Page() {
    return <PlaygroundDocs />;
}
