// UTILS ===============================================================================================================
import { extractComponentMetadataFromClient } from "$utils/og-utils";

// OTHER ===============================================================================================================
import UpinUinputUfieldDocs from "./page.client";

export async function generateMetadata() {
    const {componentName, description} = await extractComponentMetadataFromClient("pin-input-field");

    return {
        title       : `${componentName} — Fictoan`,
        description : description,
        openGraph   : {
            title       : `${componentName} — Fictoan`,
            description : description,
            url         : "https://fictoan.io/components/pin-input-field",
            siteName    : "Fictoan",
            images      : [
                {
                    url    : "https://fictoan.io/components/pin-input-field/opengraph-image",
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
            images      : [ "https://fictoan.io/components/pin-input-field/opengraph-image" ],
        },
    };
}

export default function Page() {
    return <UpinUinputUfieldDocs />;
}
