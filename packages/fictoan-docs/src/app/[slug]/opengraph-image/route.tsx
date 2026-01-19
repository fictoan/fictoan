// UTILS ===============================================================================================================
import { createOGImageResponse, getPageMetadata, getPageSlugs } from "$utils/og-utils";

export const runtime = "nodejs";

export async function GET(
    _request: Request,
    { params }: { params: Promise<{ slug: string }> }
) {
    const { slug } = await params;
    const metadata = getPageMetadata(slug);

    if (!metadata) {
        // Fallback for unknown pages
        return createOGImageResponse({
            componentName : slug.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" "),
            description   : "Documentation for Fictoan UI",
            componentSlug : slug,
        });
    }

    return createOGImageResponse({
        componentName : metadata.title,
        description   : metadata.description,
        componentSlug : slug,
    });
}

export function generateStaticParams() {
    return getPageSlugs().map((slug) => ({ slug }));
}
