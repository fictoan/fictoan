import SkeletonDocs from "./page.client";

export const metadata = {
    title       : "Skeleton component — Fictoan UI",
    description : "An animated placeholder component for loading states",
    openGraph   : {
        title       : "Skeleton component — Fictoan UI",
        description : "An animated placeholder component for loading states",
        url         : "https://fictoan.io/components/badge",
        siteName    : "Fictoan UI",
        images      : [
            {
                url    : "https://fictoan.s3.ap-south-1.amazonaws.com/open-graph/badge-fictoan-og.png",
                width  : 1200,
                height : 630,
                alt    : "Skeleton component — Fictoan UI",
            },
        ],
        locale      : "en_US",
        type        : "website",
    },
    twitter     : {
        card        : "summary_large_image",
        title       : "Skeleton component — Fictoan UI",
        description : "An animated placeholder component for loading states",
        images      : ["https://fictoan.s3.ap-south-1.amazonaws.com/open-graph/badge-fictoan-og.png"],
    },
};

export default function Page() {
    return <SkeletonDocs />;
}
