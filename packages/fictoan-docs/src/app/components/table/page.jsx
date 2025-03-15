import TableDocs from "./page.client";

export const metadata = {
    title       : "Table component — Fictoan UI",
    description : "A way to display tabular information",
    openGraph   : {
        title       : "Table component — Fictoan UI",
        description : "A way to display tabular information",
        url         : "https://fictoan.io/components/table",
        siteName    : "Fictoan UI",
        images      : [
            {
                url    : "https://fictoan.io/components/option-card/opengraph-image",
                width  : 1200,
                height : 630,
                alt    : "Table component — Fictoan UI",
            },
        ],
        locale      : "en_US",
        type        : "website",
    },
    twitter     : {
        card        : "summary_large_image",
        title       : "Table component — Fictoan UI",
        description : "A way to display tabular information",
        images      : ["https://fictoan.io/components/option-card/opengraph-image"],
    },
};

export default function Page() {
    return <TableDocs />;
}
