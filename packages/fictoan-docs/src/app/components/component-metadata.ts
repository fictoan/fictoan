// TYPES ===============================================================================================================
import type { Metadata } from "next";

// UTILS ===============================================================================================================
import { extractComponentMetadataFromClient } from "$utils/og-utils";

// METADATA GENERATOR ==================================================================================================
export async function generateComponentMetadata(componentSlug: string): Promise<Metadata> {
    const { componentName, description } = await extractComponentMetadataFromClient(componentSlug);

    return {
        title       : `${componentName} — Fictoan`,
        description : description,
        openGraph   : {
            title       : `${componentName} — Fictoan`,
            description : description,
            url         : `https://fictoan.io/components/${componentSlug}`,
            siteName    : "Fictoan",
            images      : [
                {
                    url    : `https://fictoan.io/components/${componentSlug}/opengraph-image`,
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
            images      : [`https://fictoan.io/components/${componentSlug}/opengraph-image`],
        },
    };
}
