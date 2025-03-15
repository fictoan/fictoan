import ModalDocs from "./page.client";

export const metadata = {
    title       : "Modal component — Fictoan UI",
    description : "A popover that appears at the centre of the screen when triggered",
    openGraph   : {
        title       : "Modal component — Fictoan UI",
        description : "A popover that appears at the centre of the screen when triggered",
        url         : "https://fictoan.io/components/modal",
        siteName    : "Fictoan UI",
        images      : [
            {
                url    : "https://fictoan.io/components/option-card/opengraph-image",
                width  : 1200,
                height : 630,
                alt    : "Modal component — Fictoan UI",
            },
        ],
        locale      : "en_US",
        type        : "website",
    },
    twitter     : {
        card        : "summary_large_image",
        title       : "Modal component — Fictoan UI",
        description : "A popover that appears at the centre of the screen when triggered",
        images      : ["https://fictoan.io/components/option-card/opengraph-image"],
    },
};

export default function Page() {
    return <ModalDocs />;
}
