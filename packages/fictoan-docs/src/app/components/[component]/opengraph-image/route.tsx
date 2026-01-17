// UTILS ===============================================================================================================
import { createOGImageResponse, extractComponentMetadataFromClient } from "$utils/og-utils";

export const runtime = "nodejs";

export async function GET(
    _request: Request,
    { params }: { params: Promise<{ component: string }> }
) {
    const { component } = await params;
    const { componentName, description } = await extractComponentMetadataFromClient(component);

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