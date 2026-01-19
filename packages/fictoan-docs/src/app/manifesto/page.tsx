// OTHER ===============================================================================================================
import ManifestoPage from "./page.client";

export const metadata = {
    title       : "Manifesto — FictoanUI",
    description : "UI code has become needlessly complex. It doesn't have to be.",
    openGraph   : {
        title       : "Manifesto — FictoanUI",
        description : "UI code has become needlessly complex. It doesn't have to be.",
        url         : "https://fictoan.io/manifesto",
        siteName    : "FictoanUI",
        images      : [
            {
                url    : "https://fictoan.io/manifesto/opengraph-image",
                width  : 1200,
                height : 630,
                alt    : "Manifesto — FictoanUI",
            },
        ],
        locale      : "en_US",
        type        : "website",
    },
    twitter     : {
        card        : "summary_large_image",
        title       : "Manifesto — FictoanUI",
        description : "UI code has become needlessly complex. It doesn't have to be.",
        images      : ["https://fictoan.io/manifesto/opengraph-image"],
    },
};

export default function Page() {
    return <ManifestoPage />;
}
