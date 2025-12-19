// OTHER ===============================================================================================================
import HomePage from "./page.client";

export const metadata = {
    title       : "Fictoan — A React UI framework",
    description : "A full-featured, designer-friendly, yet performant framework with plain-English props and focus" +
        " on rapid iteration",
    openGraph   : {
        title       : "Fictoan — A React UI framework",
        description : "A full-featured, designer-friendly, yet performant framework with plain-English props and" +
            " focus on rapid iteration",
        url         : "https://fictoan.io/components/badge",
        siteName    : "Fictoan UI",
        images      : [
            {
                url    : "https://fictoan.s3.ap-south-1.amazonaws.com/open-graph/badge-fictoan-og.png",
                width  : 1200,
                height : 630,
                alt    : "Fictoan — A React UI framework",
            },
        ],
        locale      : "en_US",
        type        : "website",
    },
    twitter     : {
        card        : "summary_large_image",
        title       : "Fictoan — A React UI framework",
        description : "A full-featured, designer-friendly, yet performant framework with plain-English props and" +
            " focus on rapid iteration",
        images      : ["https://fictoan.s3.ap-south-1.amazonaws.com/open-graph/badge-fictoan-og.png"],
    },
};

export default function Page() {
    return <HomePage />;
}
