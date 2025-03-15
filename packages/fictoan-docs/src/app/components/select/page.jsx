import SelectDocs from "./page.client";

export const metadata = {
    title       : "Select component — Fictoan UI",
    description : "A native dropdown for picking a choice from a long list",
    openGraph   : {
        title       : "Select component — Fictoan UI",
        description : "A native dropdown for picking a choice from a long list",
        url         : "https://fictoan.io/components/select",
        siteName    : "Fictoan UI",
        images      : [
            {
                url    : "https://fictoan.io/components/option-card/opengraph-image",
                width  : 1200,
                height : 630,
                alt    : "Select component — Fictoan UI",
            },
        ],
        locale      : "en_US",
        type        : "website",
    },
    twitter     : {
        card        : "summary_large_image",
        title       : "Select component — Fictoan UI",
        description : "A native dropdown for picking a choice from a long list",
        images      : ["https://fictoan.io/components/option-card/opengraph-image"],
    },
};

export default function Page() {
    return <SelectDocs />;
}
