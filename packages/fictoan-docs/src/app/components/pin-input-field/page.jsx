import PINInputFieldDocs from "./page.client";

export const metadata = {
    title       : "Pin input field component — Fictoan UI",
    description : "A set of single-character input fields that obscures data entry",
    openGraph   : {
        title       : "Pin input field component — Fictoan UI",
        description : "A set of single-character input fields that obscures data entry",
        url         : "https://fictoan.io/components/pin-input-field",
        siteName    : "Fictoan UI",
        images      : [
            {
                url    : "https://fictoan.io/components/option-card/opengraph-image",
                width  : 1200,
                height : 630,
                alt    : "Pin input field component — Fictoan UI",
            },
        ],
        locale      : "en_US",
        type        : "website",
    },
    twitter     : {
        card        : "summary_large_image",
        title       : "Pin input field component — Fictoan UI",
        description : "A set of single-character input fields that obscures data entry",
        images      : ["https://fictoan.io/components/option-card/opengraph-image"],
    },
};

export default function Page() {
    return <PINInputFieldDocs />;
}
