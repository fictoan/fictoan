// REACT CORE ==========================================================================================================
import { NextRequest } from "next/server";

// UTILS ===============================================================================================================
import { createOGImageResponse } from "$utils/og-utils";

export const runtime = "nodejs";

export async function GET(request: NextRequest) {
    return createOGImageResponse({
        componentName: "FICTOAN",
        description: "React UI library for rapid prototyping",
        type: "root"
    });
}

export function generateStaticParams() {
    return [];
}