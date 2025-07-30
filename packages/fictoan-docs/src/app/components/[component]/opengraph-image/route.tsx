// REACT CORE ==========================================================================================================
import { NextRequest } from "next/server";

// UTILS ===============================================================================================================
import { createOGImageResponse, extractComponentMetadata } from "$utils/og-utils";

export const runtime = "nodejs";

export async function GET(request : NextRequest) {
    const {componentName, description} = await extractComponentMetadata(request);

    return createOGImageResponse({
        componentName,
        description,
    });
}

export function generateStaticParams() {
    const components = [
        "accordion",
        "badge",
        "breadcrumbs",
        "button",
        "callout",
        "card",
        "checkbox",
        "code-block",
        "divider",
        "drawer",
        "form-builder",
        "form",
        "input-field",
        "list-box",
        "meter",
        "modal",
        "notifications",
        "option-cards",
        "pagination",
        "pin-input-field",
        "progress-bar",
        "radio-button",
        "radio-tab-group",
        "range",
        "select",
        "sidebar",
        "skeleton",
        "table",
        "tabs",
        "toast",
        "tooltip",
    ];

    return components.map((component) => ({
        component,
    }));
}