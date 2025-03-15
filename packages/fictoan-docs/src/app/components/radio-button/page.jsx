import RadioButtonDocs from "./page.client";

export const metadata = {
    title       : "Radio button component — Fictoan UI",
    description : "An input to select one of many options",
    openGraph   : {
        title       : "Radio button component — Fictoan UI",
        description : "An input to select one of many options",
        url         : "https://fictoan.io/components/radio-button",
        siteName    : "Fictoan UI",
        images      : [
            {
                url    : "https://fictoan.io/components/option-card/opengraph-image",
                width  : 1200,
                height : 630,
                alt    : "Radio button component — Fictoan UI",
            },
        ],
        locale      : "en_US",
        type        : "website",
    },
    twitter     : {
        card        : "summary_large_image",
        title       : "Radio button component — Fictoan UI",
        description : "An input to select one of many options",
        images      : ["https://fictoan.io/components/option-card/opengraph-image"],
    },
};

export default function Page() {
    return <RadioButtonDocs />;
}
