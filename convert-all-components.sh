#!/bin/bash

# Convert remaining component pages from JSX to TSX and update metadata structure
# Usage: ./convert-all-components.sh

DOCS_DIR="packages/fictoan-docs/src/app/components"

# Find all component directories with page.jsx files (excluding breadcrumbs which is already done)
find "$DOCS_DIR" -name "page.jsx" -type f | while read -r jsx_file; do
    component_dir=$(dirname "$jsx_file")
    component_name=$(basename "$component_dir")
    tsx_file="${jsx_file%.jsx}.tsx"
    client_jsx="${component_dir}/page.client.jsx"
    client_tsx="${component_dir}/page.client.tsx"
    
    echo "Converting $component_name..."
    
    # Rename page.jsx to page.tsx
    mv "$jsx_file" "$tsx_file"
    
    # Rename page.client.jsx to page.client.tsx if it exists
    if [ -f "$client_jsx" ]; then
        mv "$client_jsx" "$client_tsx"
    fi
    
    # Capitalize first letter for component import name
    component_import=$(echo "$component_name" | sed 's/^./\U&/' | sed 's/-\([a-z]\)/\U\1/g')
    
    # Update the page.tsx content
    cat > "$tsx_file" << EOF
// UTILS ===============================================================================================================
import { extractComponentMetadataFromClient } from "\$utils/og-utils";

// OTHER ===============================================================================================================
import ${component_import}Docs from "./page.client";

export async function generateMetadata() {
    const {componentName, description} = await extractComponentMetadataFromClient("$component_name");

    return {
        title       : \`\${componentName} — Fictoan\`,
        description : description,
        openGraph   : {
            title       : \`\${componentName} — Fictoan\`,
            description : description,
            url         : "https://fictoan.io/components/$component_name",
            siteName    : "Fictoan",
            images      : [
                {
                    url    : "https://fictoan.io/components/$component_name/opengraph-image",
                    width  : 1200,
                    height : 630,
                    alt    : \`\${componentName} — Fictoan\`,
                },
            ],
            locale      : "en_US",
            type        : "website",
        },
        twitter     : {
            card        : "summary_large_image",
            title       : \`\${componentName} — Fictoan\`,
            description : description,
            images      : [ "https://fictoan.io/components/$component_name/opengraph-image" ],
        },
    };
}

export default function Page() {
    return <${component_import}Docs />;
}
EOF
    
    echo "✓ Converted $component_name"
done

echo "All remaining components converted successfully!"