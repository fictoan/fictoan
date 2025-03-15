import ListBoxDocs from "./page.client";

export const metadata = {
    title       : "List box component — Fictoan UI",
    description : "A dropdown component with multi-select, custom entries and more",
    openGraph   : {
        title       : "List box — Fictoan UI",
        description : "A dropdown component with multi-select, custom entries and more",
        url         : "https://fictoan.io/components/badge",
        siteName    : "Fictoan UI",
        images      : [
            {
                url    : "https://fictoan.s3.ap-south-1.amazonaws.com/open-graph/badge-fictoan-og.png",
                width  : 1200,
                height : 630,
                alt    : "List box — Fictoan UI",
            },
        ],
        locale      : "en_US",
        type        : "website",
    },
    twitter     : {
        card        : "summary_large_image",
        title       : "List box — Fictoan UI",
        description : "A dropdown component with multi-select, custom entries and more",
        images      : ["https://fictoan.s3.ap-south-1.amazonaws.com/open-graph/badge-fictoan-og.png"],
    },
};

export default function Page() {
    return <ListBoxDocs />;
}
