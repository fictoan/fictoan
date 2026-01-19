// REACT CORE ==========================================================================================================
import { ImageResponse } from "next/og";
import { readFile } from "fs/promises";
import { join } from "path";

interface OGImageOptions {
        componentName   : string;
        description     : string;
        type          ? : "root" | "component";
        componentSlug ? : string;
}

// Icon mapping: page/component slug -> icon file path (relative to src/assets/icons/)
const ICON_MAP: Record<string, string> = {
    // Non-component pages
    "home"            : "new-icons/home.svg",
    "manifesto"       : "new-icons/fist.svg",
    "getting-started" : "new-icons/home.svg",
    "theme"           : "new-icons/paint-roller.svg",
    "base-element"    : "new-icons/lego-brick.svg",
    "layout"          : "new-icons/window.svg",
    "typography"      : "new-icons/caret.svg",
    "colour"          : "new-icons/drop.svg",

    // Components
    "accordion"       : "new-icons/accordion.svg",
    "badge"           : "new-icons/badge.svg",
    "breadcrumbs"     : "new-icons/breadcrumbs.svg",
    "button"          : "new-icons/button.svg",
    "button-group"    : "new-icons/button-group.svg",
    "callout"         : "new-icons/callout.svg",
    "card"            : "new-icons/card.svg",
    "checkbox"        : "new-icons/checkbox.svg",
    "code-block"      : "new-icons/braces.svg",
    "divider"         : "new-icons/line.svg",
    "drawer"          : "new-icons/drawer.svg",
    "form"            : "new-icons/form.svg",
    "form-builder"    : "new-icons/form.svg",
    "input-field"     : "new-icons/input.svg",
    "list-box"        : "new-icons/listbox.svg",
    "meter"           : "new-icons/meter.svg",
    "modal"           : "new-icons/window.svg",
    "notifications"   : "new-icons/notification.svg",
    "option-cards"    : "new-icons/option-card.svg",
    "pagination"      : "new-icons/pagination.svg",
    "pin-input-field" : "pin-input.svg",
    "progress-bar"    : "new-icons/meter.svg",
    "radio-button"    : "new-icons/radio.svg",
    "radio-tab-group" : "new-icons/radio-tab-group.svg",
    "range"           : "new-icons/range.svg",
    "select"          : "new-icons/select.svg",
    "sidebar"         : "new-icons/sidebar.svg",
    "sidebar-item"    : "new-icons/sidebar.svg",
    "skeleton"        : "new-icons/skeleton.svg",
    "table"           : "new-icons/table.svg",
    "tabs"            : "new-icons/tabs.svg",
    "toast"           : "new-icons/toast.svg",
    "tooltip"         : "new-icons/tooltip.svg",
};

// Page metadata for non-component pages (title and description for OG images)
const PAGE_METADATA: Record<string, { title: string; description: string }> = {
    "manifesto"       : { title: "Manifesto", description: "UI code has become needlessly complex. It doesn't have to be." },
    "getting-started" : { title: "Getting started", description: "Start using Fictoan to build modern interfaces for the web." },
    "theme"           : { title: "Theme", description: "How to setup the colour theme for your project." },
    "base-element"    : { title: "Base element", description: "A common wrapper tag so you can add Fictoan props to any element." },
    "layout"          : { title: "Layout", description: "How to setup the content scaffolding on a page." },
    "typography"      : { title: "Typography", description: "How to setup a type system for your project." },
    "colour"          : { title: "Colour", description: "A comprehensive set of named colours in Fictoan." },
};

// Get metadata for a non-component page
export function getPageMetadata(slug: string): { title: string; description: string } | null {
    return PAGE_METADATA[slug] || null;
}

// Get list of all non-component page slugs (for generateStaticParams)
export function getPageSlugs(): string[] {
    return Object.keys(PAGE_METADATA);
}

// Load SVG and return as base64 data URL for use in img tag
async function loadIconDataUrl(componentSlug: string): Promise<string | null> {
    const iconPath = ICON_MAP[componentSlug];
    if (!iconPath) return null;

    try {
        const fullPath = join(process.cwd(), "src/assets/icons", iconPath);
        let svgContent = await readFile(fullPath, "utf-8");

        // Remove XML declaration and metadata
        svgContent = svgContent
            .replace(/<\?xml[^>]*\?>/g, "")
            .replace(/<metadata>[\s\S]*?<\/metadata>/g, "");

        // Add fill="white" to the svg tag if not present, for visibility on dark backgrounds
        if (!svgContent.includes('fill=')) {
            svgContent = svgContent.replace(/<svg/, '<svg fill="white"');
        } else {
            // Replace any existing fill with white
            svgContent = svgContent.replace(/fill="[^"]*"/, 'fill="white"');
        }

        // Convert to base64 data URL
        const base64 = Buffer.from(svgContent).toString("base64");
        return `data:image/svg+xml;base64,${base64}`;
    } catch (error) {
        console.error(`Failed to load icon for ${componentSlug}:`, error);
        return null;
    }
}

// Export icon map for external use (e.g., checking which components have icons)
export function getIconMap(): Record<string, string> {
    return ICON_MAP;
}

// Load Mondwest font for OG images
async function loadMondwestFont() {
    const fontPath = join(process.cwd(), "src/assets/fonts/mondwest/PPMondwest-Bold.woff");
    const fontData = await readFile(fontPath);
    return fontData;
}

export async function extractComponentMetadataFromClient(componentPath : string) : Promise<{
    componentName : string; description : string
}> {
    try {
        // Read the component source file directly and extract text content
        const fs = await import("fs");
        const path = await import("path");

        let filePath;
        let fileContent;

        try {
            filePath = path.resolve(`src/app/components/${componentPath}/page.client.tsx`);
            fileContent = await fs.promises.readFile(filePath, "utf-8");
        } catch {
            try {
                filePath = path.resolve(`src/app/components/${componentPath}/page.client.jsx`);
                fileContent = await fs.promises.readFile(filePath, "utf-8");
            } catch {
                throw new Error(`Could not find client component file for ${componentPath}`);
            }
        }

        // Extract component name from id="component-name" element in source
        const componentNameMatch = fileContent.match(/id="component-name"[^>]*>\s*([^<]+?)\s*</);
        // Extract description from id="component-description" element in source (handle multiline)
        const componentDescriptionMatch = fileContent.match(/id="component-description"[^>]*>([\s\S]*?)<\//);

        const componentName = componentNameMatch ?
            componentNameMatch[1].trim() :
            componentPath.split("-").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
        const description = componentDescriptionMatch ?
            componentDescriptionMatch[1].replace(/\s+/g, " ").trim() :
            "A UI component for modern web applications";

        return {componentName, description};
    } catch (error) {
        // Fallback to path-based naming
        const fallbackName = componentPath
        .split("-")
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");

        return {
            componentName : fallbackName,
            description   : "A UI component for modern web applications",
        };
    }
}

export async function extractComponentMetadata(request : Request) : Promise<{
    componentName : string; description : string
}> {
    const url = new URL(request.url);
    const segments = url.pathname.split("/");
    const componentPath = segments[segments.indexOf("components") + 1];

    if (!componentPath) {
        throw new Error("Invalid component path");
    }

    try {
        // Read the component source file directly and extract text content
        const fs = await import("fs");
        const path = await import("path");

        let filePath;
        let fileContent;

        try {
            filePath = path.resolve(`src/app/components/${componentPath}/page.client.tsx`);
            fileContent = await fs.promises.readFile(filePath, "utf-8");
        } catch {
            try {
                filePath = path.resolve(`src/app/components/${componentPath}/page.client.jsx`);
                fileContent = await fs.promises.readFile(filePath, "utf-8");
            } catch {
                throw new Error(`Could not find client component file for ${componentPath}`);
            }
        }

        // Extract component name from id="component-name" element in source
        const componentNameMatch = fileContent.match(/id="component-name"[^>]*>\s*([^<]+?)\s*</);
        // Extract description from id="component-description" element in source (handle multiline)
        const componentDescriptionMatch = fileContent.match(/id="component-description"[^>]*>([\s\S]*?)<\//);

        const componentName = componentNameMatch ?
            componentNameMatch[1].trim() :
            componentPath.split("-").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
        const description = componentDescriptionMatch ?
            componentDescriptionMatch[1].replace(/\s+/g, " ").trim() :
            "A UI component for modern web applications";

        return {componentName, description};
    } catch (error) {
        // Fallback to path-based naming
        const fallbackName = componentPath
        .split("-")
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");

        return {
            componentName : fallbackName,
            description   : "A UI component for modern web applications",
        };
    }
}

export async function createOGImageResponse({componentName, description, type = "component", componentSlug} : OGImageOptions) {
    // Load custom font
    const mondwestFont = await loadMondwestFont();

    // Load component icon if available
    const iconDataUrl = componentSlug ? await loadIconDataUrl(componentSlug) : null;

    // Fictoan logo (pixelated FF)
    const logo = (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 16" width="60" height="32" fill="#fff">
            <polygon points="6 8 4 8 4 4 12 4 12 6 6 6 6 8"/>
            <rect x="6" y="8" width="6" height="2"/>
            <rect x="24" y="4" width="2" height="2"/>
            <rect x="0" y="2" width="2" height="12"/>
            <rect x="28" y="2" width="2" height="12"/>
            <rect x="2" y="0" width="26" height="2"/>
            <rect x="2" y="14" width="26" height="2"/>
            <rect x="4" y="10" width="2" height="2"/>
            <polygon points="16 10 16 12 22 12 22 4 20 4 20 10 16 10"/>
            <rect x="14" y="4" width="2" height="6"/>
            <rect x="24" y="8" width="2" height="4"/>
        </svg>
    );

    // Root layout - centered
    if (type === "root") {
        return new ImageResponse(
            (
                <div
                    style={{
                        height         : "100%",
                        width          : "100%",
                        display        : "flex",
                        flexDirection  : "column",
                        alignItems     : "center",
                        justifyContent : "center",
                        background     : "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                        fontFamily     : "Mondwest",
                    }}
                >
                    <div
                        style={{
                            fontSize     : 64,
                            fontWeight   : "bold",
                            color        : "#ffffff",
                            marginBottom : 20,
                        }}
                    >
                        {componentName}
                    </div>
                    <div
                        style={{
                            fontSize   : 32,
                            color      : "rgba(255,255,255,0.85)",
                            textAlign  : "center",
                            maxWidth   : "900px",
                            lineHeight : 1.4,
                        }}
                    >
                        {description}
                    </div>
                </div>
            ),
            {
                width  : 1200,
                height : 630,
                fonts  : [
                    {
                        name : "Mondwest",
                        data : mondwestFont,
                        style: "normal",
                        weight: 600,
                    },
                ],
            },
        );
    }

    // Component layout - left-aligned with component info
    return new ImageResponse(
        (
            <div
                style={{
                    height         : "100%",
                    width          : "100%",
                    display        : "flex",
                    flexDirection  : "column",
                    alignItems     : "flex-start",
                    justifyContent : "space-between",
                    background     : "linear-gradient(135deg, #667eea 0%, #1a1a1a 100%)",
                    fontFamily     : "Mondwest",
                    padding        : "64px 80px 48px 80px",
                }}
            >
                <div
                    style={{
                        display       : "flex",
                        flexDirection : "column",
                    }}
                >
                    <div
                        style={{
                            display    : "flex",
                            alignItems : "center",
                            gap        : 24,
                        }}
                    >
                        {iconDataUrl && (
                            <img
                                src={iconDataUrl}
                                width={72}
                                height={72}
                                style={{
                                    opacity : 0.95,
                                }}
                            />
                        )}
                        <p
                            style={{
                                fontSize     : 72,
                                fontWeight   : 600,
                                color        : "#ffffff",
                                marginBottom : 8,
                                lineHeight   : 1,
                            }}
                        >
                            {componentName}
                        </p>
                    </div>

                    <div
                        style={{
                            fontSize   : 32,
                            color      : "#ffffff",
                            lineHeight : 1.4,
                            maxWidth   : "900px",
                            opacity    : 0.9,
                            marginTop  : iconDataUrl ? 16 : 0,
                        }}
                    >
                        {description}
                    </div>
                </div>

                <div
                    style={{
                        display       : "flex",
                        flexDirection : "row",
                        alignItems    : "center",
                        gap           : 16,
                    }}
                >
                    {logo}
                    <div style={{ display: "flex", flexDirection: "column" }}>
                        <p style={{ fontSize: 24, color: "#fff", fontWeight: 600, margin: 0 }}>FictoanUI</p>
                        <p style={{ fontSize: 16, color: "rgba(255,255,255,0.7)", margin: 0 }}>fictoan.io</p>
                    </div>
                </div>
            </div>
        ),
        {
            width  : 1200,
            height : 630,
            fonts  : [
                {
                    name : "Mondwest",
                    data : mondwestFont,
                    style: "normal",
                    weight: 600,
                },
            ],
        },
    );
}