#!/bin/bash

# Convert breadcrumbs component from JSX to TSX and update metadata structure

COMPONENT_DIR="packages/fictoan-docs/src/app/components/breadcrumbs"
COMPONENT_NAME="breadcrumbs"

echo "Converting $COMPONENT_NAME..."

# Rename page.jsx to page.tsx
mv "$COMPONENT_DIR/page.jsx" "$COMPONENT_DIR/page.tsx"

# Rename page.client.jsx to page.client.tsx
mv "$COMPONENT_DIR/page.client.jsx" "$COMPONENT_DIR/page.client.tsx"

# Update the page.tsx content with new metadata structure
cat > "$COMPONENT_DIR/page.tsx" << 'EOF'
// UTILS ===============================================================================================================
import { extractComponentMetadataFromClient } from "$utils/og-utils";

// OTHER ===============================================================================================================
import BreadcrumbsDocs from "./page.client";

export async function generateMetadata() {
    const {componentName, description} = await extractComponentMetadataFromClient("breadcrumbs");

    return {
        title       : `${componentName} — Fictoan`,
        description : description,
        openGraph   : {
            title       : `${componentName} — Fictoan`,
            description : description,
            url         : "https://fictoan.io/components/breadcrumbs",
            siteName    : "Fictoan",
            images      : [
                {
                    url    : "https://fictoan.io/components/breadcrumbs/opengraph-image",
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
            images      : [ "https://fictoan.io/components/breadcrumbs/opengraph-image" ],
        },
    };
}

export default function Page() {
    return <BreadcrumbsDocs />;
}
EOF

echo "✓ Converted breadcrumbs component successfully!"
echo "Files renamed: page.jsx → page.tsx, page.client.jsx → page.client.tsx"
echo "Metadata updated to use generateMetadata() function"