// UTILS ===============================================================================================================
import { createOGImageResponse } from "$utils/og-utils";

export const runtime = "nodejs";

export async function GET() {
    return createOGImageResponse({
        componentName: "FictoanUI",
        description: "Make UI code readable again. Components so obvious, and props that read like prose.",
        type: "root"
    });
}

export function generateStaticParams() {
    return [];
}