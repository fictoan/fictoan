import NotificationsDocs from "./page.client";

export const metadata = {
    title       : "Notifications component — Fictoan UI",
    description : "A small popup that shows up in one of the four corners of the screen for a set period",
    openGraph   : {
        title       : "Notifications component — Fictoan UI",
        description : "A small popup that shows up in one of the four corners of the screen for a set period",
        url         : "https://fictoan.io/components/notifications",
        siteName    : "Fictoan UI",
        images      : [
            {
                url    : "https://fictoan.io/components/option-card/opengraph-image",
                width  : 1200,
                height : 630,
                alt    : "Notifications component — Fictoan UI",
            },
        ],
        locale      : "en_US",
        type        : "website",
    },
    twitter     : {
        card        : "summary_large_image",
        title       : "Notifications component — Fictoan UI",
        description : "A small popup that shows up in one of the four corners of the screen for a set period",
        images      : ["https://fictoan.io/components/option-card/opengraph-image"],
    },
};

export default function Page() {
    return <NotificationsDocs />;
}
