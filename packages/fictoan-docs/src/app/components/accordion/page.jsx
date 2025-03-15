import AccordionDocs from "./page.client";

export const metadata = {
    title       : "Accordion component — Fictoan UI",
    description : "A simple click-to-toggle component to expand and collapse content inside",
    openGraph   : {
        title       : "Accordion component — Fictoan UI",
        description : "A simple click-to-toggle component to expand and collapse content inside",
        url         : "https://fictoan.io/components/accordion",
        siteName    : "Fictoan UI",
        images      : [
            {
                url    : "https://fictoan.io/components/option-card/opengraph-image",
                width  : 1200,
                height : 630,
                alt    : "Accordion component — Fictoan UI",
            },
        ],
        locale      : "en_US",
        type        : "website",
    },
    twitter     : {
        card        : "summary_large_image",
        title       : "Accordion component — Fictoan UI",
        description : "A simple click-to-toggle component to expand and collapse content inside",
        images      : ["https://fictoan.io/components/option-card/opengraph-image"],
    },
};

export default function Page() {
    return <AccordionDocs />;
}
