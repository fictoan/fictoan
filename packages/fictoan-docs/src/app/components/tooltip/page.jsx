import TooltipDocs from "./page.client";

export const metadata = {
    title       : "Tooltip component — Fictoan UI",
    description : "A small helper popup to display extra information",
    openGraph   : {
        title       : "Tooltip component — Fictoan UI",
        description : "A small helper popup to display extra information",
        url         : "https://fictoan.io/components/badge",
        siteName    : "Fictoan UI",
        images      : [
            {
                url    : "https://fictoan.s3.ap-south-1.amazonaws.com/open-graph/badge-fictoan-og.png",
                width  : 1200,
                height : 630,
                alt    : "Tooltip component — Fictoan UI",
            },
        ],
        locale      : "en_US",
        type        : "website",
    },
    twitter     : {
        card        : "summary_large_image",
        title       : "Tooltip component — Fictoan UI",
        description : "A small helper popup to display extra information",
        images      : ["https://fictoan.s3.ap-south-1.amazonaws.com/open-graph/badge-fictoan-og.png"],
    },
};

export default function Page() {
    return <TooltipDocs />;
}
