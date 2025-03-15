import BreadcrumbsDocs from "./page.client";

export const metadata = {
    title       : "Breadcrumbs component — Fictoan UI",
    description : "A set of links to show the current page’s hierarchy",
    openGraph   : {
        title       : "Breadcrumbs component — Fictoan UI",
        description : "A set of links to show the current page’s hierarchy",
        url         : "https://fictoan.io/components/breadcrumbs",
        siteName    : "Fictoan UI",
        images      : [
            {
                url    : "https://fictoan.s3.ap-south-1.amazonaws.com/open-graph/breadcrumbs-fictoan-og.png",
                width  : 1200,
                height : 630,
                alt    : "Breadcrumbs component — Fictoan UI",
            },
        ],
        locale      : "en_US",
        type        : "website",
    },
    twitter     : {
        card        : "summary_large_image",
        title       : "Breadcrumbs component — Fictoan UI",
        description : "A set of links to show the current page’s hierarchy",
        images      : ["https://fictoan.s3.ap-south-1.amazonaws.com/open-graph/breadcrumbs-fictoan-og.png"],
    },
};

export default function Page() {
    return <BreadcrumbsDocs />;
}
