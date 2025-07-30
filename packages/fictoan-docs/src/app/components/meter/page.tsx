// UTILS ===============================================================================================================
import { extractComponentMetadataFromClient } from "$utils/og-utils";

// OTHER ===============================================================================================================
import UmeterDocs from "./page.client";

export async function generateMetadata() {
    const {componentName, description} = await extractComponentMetadataFromClient("meter");

    return {
        title       : `${componentName} — Fictoan`,
        description : description,
        openGraph   : {
            title       : `${componentName} — Fictoan`,
            description : description,
            url         : "https://fictoan.io/components/meter",
            siteName    : "Fictoan",
            images      : [
                {
                    url    : "https://fictoan.io/components/meter/opengraph-image",
                    width  : 1200,
                    height : 630,
                    alt    : `${componentName} — Fictoan`,
                },
            ],
            locale      : "en_US",
            type        : "website",
        },
        twitter     : {
            card        : "summary_large_image",
            title       : `${componentName} — Fictoan`,
            description : description,
            images      : [ "https://fictoan.io/components/meter/opengraph-image" ],
        },
    };
}

export default function Page() {
    return <UmeterDocs />;
}
