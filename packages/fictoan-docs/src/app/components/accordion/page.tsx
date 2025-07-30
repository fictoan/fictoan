// OTHER ===============================================================================================================
import AccordionDocs from "./page.client";

// Use the actual content from the client component as the source of truth
const componentName = "Accordion";
const description = "A simple click to expand/collapse block element.";

export const metadata = {
    title       : `${componentName} — Fictoan`,
    description : description,
    openGraph   : {
        title       : `${componentName} — Fictoan`,
        description : description,
        url         : "https://fictoan.io/components/accordion",
        siteName    : "Fictoan",
        images      : [
            {
                url    : "https://fictoan.io/components/accordion/opengraph-image",
                width  : 1200,
                height : 630,
                alt    : `${componentName} — Fictoan`,
            },
        ],
        locale      : "en_US",
        type        : "website",
    },
    twitter     : {
        card        : "summary_large_image",
        title       : `${componentName} — Fictoan`,
        description : description,
        images      : [ "https://fictoan.io/components/accordion/opengraph-image" ],
    },
};

export default function Page() {
    return <AccordionDocs />;
}
