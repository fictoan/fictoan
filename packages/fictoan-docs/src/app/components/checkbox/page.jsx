import CheckboxDocs from "./page.client";

export const metadata = {
    title       : "Checkbox component — Fictoan UI",
    description : "A click-to-toggle component to make a choice",
    openGraph   : {
        title       : "Checkbox component — Fictoan UI",
        description : "A click-to-toggle component to make a choice",
        url         : "https://fictoan.io/components/checkbox",
        siteName    : "Fictoan UI",
        images      : [
            {
                url    : "https://fictoan.io/components/option-card/opengraph-image",
                width  : 1200,
                height : 630,
                alt    : "Checkbox component — Fictoan UI",
            },
        ],
        locale      : "en_US",
        type        : "website",
    },
    twitter     : {
        card        : "summary_large_image",
        title       : "Checkbox component — Fictoan UI",
        description : "A click-to-toggle component to make a choice",
        images      : ["https://fictoan.io/components/option-card/opengraph-image"],
    },
};

export default function Page() {
    return <CheckboxDocs />;
}
