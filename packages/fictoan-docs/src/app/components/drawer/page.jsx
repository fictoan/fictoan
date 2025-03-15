import DrawerDocs from "./page.client";

export const metadata = {
    title       : "Drawer component — Fictoan UI",
    description : "A panel that opens from any designated side of the screen.",
    openGraph   : {
        title       : "Drawer component — Fictoan UI",
        description : "A panel that opens from any designated side of the screen.",
        url         : "https://fictoan.io/components/drawer",
        siteName    : "Fictoan UI",
        images      : [
            {
                url    : "https://fictoan.io/components/option-card/opengraph-image",
                width  : 1200,
                height : 630,
                alt    : "Drawer component — Fictoan UI",
            },
        ],
        locale      : "en_US",
        type        : "website",
    },
    twitter     : {
        card        : "summary_large_image",
        title       : "Drawer component — Fictoan UI",
        description : "A panel that opens from any designated side of the screen.",
        images      : ["https://fictoan.io/components/option-card/opengraph-image"],
    },
};

export default function Page() {
    return <DrawerDocs />;
}
