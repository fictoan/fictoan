import InputFieldDocs from "./page.client";

export const metadata = {
    title       : "Input field component — Fictoan UI",
    description : "A text box to enter information",
    openGraph   : {
        title       : "Input field component — Fictoan UI",
        description : "A text box to enter information",
        url         : "https://fictoan.io/components/input-field",
        siteName    : "Fictoan UI",
        images      : [
            {
                url    : "https://fictoan.io/components/option-card/opengraph-image",
                width  : 1200,
                height : 630,
                alt    : "Input field component — Fictoan UI",
            },
        ],
        locale      : "en_US",
        type        : "website",
    },
    twitter     : {
        card        : "summary_large_image",
        title       : "Input field component — Fictoan UI",
        description : "A text box to enter information",
        images      : ["https://fictoan.io/components/option-card/opengraph-image"],
    },
};

export default function Page() {
    return <InputFieldDocs />;
}
