import ProgressBarDocs from "./page.client";

export const metadata = {
    title       : "Progress bar component — Fictoan UI",
    description : "A visual representation of the completion of a task.",
    openGraph   : {
        title       : "Progress bar component — Fictoan UI",
        description : "A visual representation of the completion of a task.",
        url         : "https://fictoan.io/components/progress-bar",
        siteName    : "Fictoan UI",
        images      : [
            {
                url    : "https://fictoan.io/components/option-card/opengraph-image",
                width  : 1200,
                height : 630,
                alt    : "Progress bar component — Fictoan UI",
            },
        ],
        locale      : "en_US",
        type        : "website",
    },
    twitter     : {
        card        : "summary_large_image",
        title       : "Progress bar component — Fictoan UI",
        description : "A visual representation of the completion of a task.",
        images      : ["https://fictoan.io/components/option-card/opengraph-image"],
    },
};

export default function Page() {
    return <ProgressBarDocs />;
}
