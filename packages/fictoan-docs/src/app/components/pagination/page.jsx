import PaginationDocs from "./page.client";

export const metadata = {
    title       : "Pagination component — Fictoan UI",
    description : "A component to help you traverse a list of pages",
    openGraph   : {
        title       : "Pagination component — Fictoan UI",
        description : "A component to help you traverse a list of pages",
        url         : "https://fictoan.io/components/notifications",
        siteName    : "Fictoan UI",
        images      : [
            {
                url    : "https://fictoan.io/components/option-card/opengraph-image",
                width  : 1200,
                height : 630,
                alt    : "Pagination component — Fictoan UI",
            },
        ],
        locale      : "en_US",
        type        : "website",
    },
    twitter     : {
        card        : "summary_large_image",
        title       : "Pagination component — Fictoan UI",
        description : "A component to help you traverse a list of pages",
        images      : ["https://fictoan.io/components/option-card/opengraph-image"],
    },
};

export default function Page() {
    return <PaginationDocs />;
}
