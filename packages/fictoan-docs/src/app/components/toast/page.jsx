import ToastDocs from "./page.client";

export const metadata = {
    title       : "Toast component — Fictoan UI",
    description : "A small static floating popup",
    openGraph   : {
        title       : "Toast component — Fictoan UI",
        description : "A small static floating popup",
        url         : "https://fictoan.io/components/toast",
        siteName    : "Fictoan UI",
        images      : [
            {
                url    : "https://fictoan.io/components/option-card/opengraph-image",
                width  : 1200,
                height : 630,
                alt    : "Toast component — Fictoan UI",
            },
        ],
        locale      : "en_US",
        type        : "website",
    },
    twitter     : {
        card        : "summary_large_image",
        title       : "Toast component — Fictoan UI",
        description : "A small static floating popup",
        images      : ["https://fictoan.io/components/option-card/opengraph-image"],
    },
};

export default function Page() {
    return <ToastDocs />;
}
