import RadioTabGroupDocs from "./page.client";

export const metadata = {
    title       : "Radio tab group component — Fictoan UI",
    description : "A radio group but styled in a linear box",
    openGraph   : {
        title       : "Radio tab group component — Fictoan UI",
        description : "A radio group but styled in a linear box",
        url         : "https://fictoan.io/components/radio-tab-group",
        siteName    : "Fictoan UI",
        images      : [
            {
                url    : "https://fictoan.io/components/option-card/opengraph-image",
                width  : 1200,
                height : 630,
                alt    : "Radio tab group component — Fictoan UI",
            },
        ],
        locale      : "en_US",
        type        : "website",
    },
    twitter     : {
        card        : "summary_large_image",
        title       : "Radio tab group component — Fictoan UI",
        description : "A radio group but styled in a linear box",
        images      : ["https://fictoan.io/components/option-card/opengraph-image"],
    },
};

export default function Page() {
    return <RadioTabGroupDocs />;
}
