// OTHER ===============================================================================================================
import ManifestoPage from "./page.client";

export const metadata = {
    title       : "Manifesto — Fictoan UI",
    description : "UI code has become needlessly complex. It doesn't have to be.",
    openGraph   : {
        title       : "Manifesto — Fictoan UI",
        description : "UI code has become needlessly complex. It doesn't have to be.",
        url         : "https://fictoan.io/manifesto",
        siteName    : "Fictoan UI",
        images      : [
            {
                url    : "https://fictoan.io/components/option-card/opengraph-image",
                width  : 1200,
                height : 630,
                alt    : "Manifesto — Fictoan UI",
            },
        ],
        locale      : "en_US",
        type        : "website",
    },
    twitter     : {
        card        : "summary_large_image",
        title       : "Manifesto — Fictoan UI",
        description : "UI code has become needlessly complex. It doesn't have to be.",
        images      : ["https://fictoan.io/components/option-card/opengraph-image"],
    },
};

export default function Page() {
    return <ManifestoPage />;
}
