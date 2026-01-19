import TypographyDocs from "./page.client";

export const metadata = {
    title       : "Typography — Fictoan UI",
    description : "How to setup the a type system for your project",
    openGraph   : {
        title       : "Typography — Fictoan UI",
        description : "How to setup the a type system for your project",
        url         : "https://fictoan.io/typography",
        siteName    : "Fictoan UI",
        images      : [
            {
                url    : "https://fictoan.io/typography/opengraph-image",
                width  : 1200,
                height : 630,
                alt    : "Typography — Fictoan UI",
            },
        ],
        locale      : "en_US",
        type        : "website",
    },
    twitter     : {
        card        : "summary_large_image",
        title       : "Typography — Fictoan UI",
        description : "How to setup the a type system for your project",
        images      : ["https://fictoan.io/typography/opengraph-image"],
    },
};

export default function Page() {
    return <TypographyDocs />;
}
