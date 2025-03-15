import CodeBlockDocs from "./page.client";

export const metadata = {
    title       : "Code block component — Fictoan UI",
    description : "A box to display multiple lines of code, with syntax highlighting",
    openGraph   : {
        title       : "Code block component — Fictoan UI",
        description : "A box to display multiple lines of code, with syntax highlighting",
        url         : "https://fictoan.io/components/code-block",
        siteName    : "Fictoan UI",
        images      : [
            {
                url    : "https://fictoan.io/components/option-card/opengraph-image",
                width  : 1200,
                height : 630,
                alt    : "Code block component — Fictoan UI",
            },
        ],
        locale      : "en_US",
        type        : "website",
    },
    twitter     : {
        card        : "summary_large_image",
        title       : "Code block component — Fictoan UI",
        description : "A box to display multiple lines of code, with syntax highlighting",
        images      : ["https://fictoan.io/components/option-card/opengraph-image"],
    },
};

export default function Page() {
    return <CodeBlockDocs />;
}
