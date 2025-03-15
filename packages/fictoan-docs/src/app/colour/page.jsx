import AccordionDocs from "./page.client";

export const metadata = {
    title       : "Colour — Fictoan UI",
    description : "A comprehensive set of named colours in Fictoan",
    openGraph   : {
        title       : "Colour — Fictoan UI",
        description : "A comprehensive set of named colours in Fictoan",
        url         : "https://fictoan.io/components/accordion",
        siteName    : "Fictoan UI",
        images      : [
            {
                url    : "https://fictoan.io/components/option-card/opengraph-image",
                width  : 1200,
                height : 630,
                alt    : "Colour — Fictoan UI",
            },
        ],
        locale      : "en_US",
        type        : "website",
    },
    twitter     : {
        card        : "summary_large_image",
        title       : "Colour — Fictoan UI",
        description : "A comprehensive set of named colours in Fictoan",
        images      : ["https://fictoan.io/components/option-card/opengraph-image"],
    },
};

export default function Page() {
    return <AccordionDocs />;
}
