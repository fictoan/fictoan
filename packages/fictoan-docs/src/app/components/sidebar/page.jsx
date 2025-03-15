import SidebarDocs from "./page.client";

export const metadata = {
    title       : "Sidebar component — Fictoan UI",
    description : "A list of links inside a vertical container",
    openGraph   : {
        title       : "Sidebar component — Fictoan UI",
        description : "A list of links inside a vertical container",
        url         : "https://fictoan.io/components/sidebar",
        siteName    : "Fictoan UI",
        images      : [
            {
                url    : "https://fictoan.io/components/option-card/opengraph-image",
                width  : 1200,
                height : 630,
                alt    : "Sidebar component — Fictoan UI",
            },
        ],
        locale      : "en_US",
        type        : "website",
    },
    twitter     : {
        card        : "summary_large_image",
        title       : "Sidebar component — Fictoan UI",
        description : "A list of links inside a vertical container",
        images      : ["https://fictoan.io/components/option-card/opengraph-image"],
    },
};

export default function Page() {
    return <SidebarDocs />;
}
