import ButtonDocs from "./page.client";

export const metadata = {
    title       : "Button component — Fictoan UI",
    description : "A clickable component to trigger an action or an event",
    openGraph   : {
        title       : "Button component — Fictoan UI",
        description : "A clickable component to trigger an action or an event",
        url         : "https://fictoan.io/components/button",
        siteName    : "Fictoan UI",
        images      : [
            {
                url    : "https://fictoan.io/components/option-card/opengraph-image",
                width  : 1200,
                height : 630,
                alt    : "Button component — Fictoan UI",
            },
        ],
        locale      : "en_US",
        type        : "website",
    },
    twitter     : {
        card        : "summary_large_image",
        title       : "Button component — Fictoan UI",
        description : "A clickable component to trigger an action or an event",
        images      : ["https://fictoan.io/components/option-card/opengraph-image"],
    },
};

export default function Page() {
    return <ButtonDocs />;
}
