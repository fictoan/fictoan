import MeterDocs from "./page.client";

export const metadata = {
    title       : "Meter component — Fictoan UI",
    description : "A bar to measure a scalar value within a known range",
    openGraph   : {
        title       : "Meter component — Fictoan UI",
        description : "A bar to measure a scalar value within a known range",
        url         : "https://fictoan.io/components/meter",
        siteName    : "Fictoan UI",
        images      : [
            {
                url    : "https://fictoan.io/components/option-card/opengraph-image",
                width  : 1200,
                height : 630,
                alt    : "Meter component — Fictoan UI",
            },
        ],
        locale      : "en_US",
        type        : "website",
    },
    twitter     : {
        card        : "summary_large_image",
        title       : "Meter component — Fictoan UI",
        description : "A bar to measure a scalar value within a known range",
        images      : ["https://fictoan.io/components/option-card/opengraph-image"],
    },
};

export default function Page() {
    return <MeterDocs />;
}
