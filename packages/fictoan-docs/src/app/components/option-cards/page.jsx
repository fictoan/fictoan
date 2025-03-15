import OptionCardsDocs from "./page.client";

export const metadata = {
    title       : "Option cards component — Fictoan UI",
    description : "Cards that behave like a set of checkboxes",
    openGraph   : {
        title       : "Option cards component — Fictoan UI",
        description : "Cards that behave like a set of checkboxes",
        url         : "https://fictoan.io/components/option-cards",
        siteName    : "Fictoan UI",
        images      : [
            {
                url    : "https://fictoan.io/components/option-card/opengraph-image",
                width  : 1200,
                height : 630,
                alt    : "Option cards component — Fictoan UI",
            },
        ],
        locale      : "en_US",
        type        : "website",
    },
    twitter     : {
        card        : "summary_large_image",
        title       : "Option cards component — Fictoan UI",
        description : "Cards that behave like a set of checkboxes",
        images      : ["https://fictoan.io/components/option-card/opengraph-image"],
    },
};

export default function Page() {
    return <OptionCardsDocs />;
}
