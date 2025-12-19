import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ============================================================================
// TYPES
// ============================================================================

interface ColorDefinition {
    hue: number;
    saturation: number;
}

type ColorName =
    | "red" | "salmon" | "orange" | "amber" | "yellow" | "spring"
    | "pistachio" | "green" | "teal" | "cyan" | "sky" | "blue"
    | "indigo" | "violet" | "purple" | "pink" | "crimson"
    | "brick" | "sienna" | "brown" | "slate" | "grey";

type UtilityPrefix = "bg" | "text" | "border";

// ============================================================================
// CONFIGURATION
// ============================================================================

const colors: Record<ColorName, ColorDefinition> = {
    red       : { hue: 0, saturation: 84 },
    salmon    : { hue: 16, saturation: 100 },
    orange    : { hue: 30, saturation: 92 },
    amber     : { hue: 40, saturation: 97 },
    yellow    : { hue: 50, saturation: 100 },
    spring    : { hue: 65, saturation: 80 },
    pistachio : { hue: 78, saturation: 54 },
    green     : { hue: 148, saturation: 50 },
    teal      : { hue: 174, saturation: 62 },
    cyan      : { hue: 176, saturation: 78 },
    sky       : { hue: 194, saturation: 97 },
    blue      : { hue: 212, saturation: 100 },
    indigo    : { hue: 237, saturation: 66 },
    violet    : { hue: 258, saturation: 55 },
    purple    : { hue: 311, saturation: 47 },
    pink      : { hue: 336, saturation: 96 },
    crimson   : { hue: 340, saturation: 64 },
    brick     : { hue: 0, saturation: 68 },
    sienna    : { hue: 15, saturation: 56 },
    brown     : { hue: 24, saturation: 34 },
    slate     : { hue: 209, saturation: 12 },
    grey      : { hue: 0, saturation: 0 },
};

/** Number of lightness levels on each side (dark/light) */
const levels = 10;

/** Opacity levels to generate (0-90 in increments) */
const alphaLevels = [0, 5, 10, 20, 30, 40, 50, 60, 70, 80, 90] as const;

/** CSS utility prefixes */
const prefixes: UtilityPrefix[] = ["bg", "text", "border"];

// ============================================================================
// CSS GENERATORS
// ============================================================================

/**
 * Generates HSL color string
 */
function hsl(hue: number, saturation: number, lightness: number): string {
    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
}

/**
 * Generates HSLA color string with alpha
 */
function hsla(hue: number, saturation: number, lightness: number, alpha: number): string {
    return `hsla(${hue}, ${saturation}%, ${lightness}%, ${alpha})`;
}

/**
 * Generates a CSS variable definition
 */
function cssVar(name: string, value: string): string {
    return `  --${name}: ${value};`;
}

/**
 * Generates a utility class for background or text color
 */
function colorUtilityClass(prefix: UtilityPrefix, className: string): string {
    if (prefix === "border") {
        return `.${prefix}-${className} { border-color: var(--${className}); border-width: var(--global-border-width); border-style: var(--global-border-style); }`;
    }
    const property = prefix === "bg" ? "background-color" : "color";
    return `.${prefix}-${className} { ${property}: var(--${className}); }`;
}

/**
 * Generates CSS variables for a single color shade
 */
function generateShadeVariables(
    colorName: string,
    hue: number,
    saturation: number,
    lightness: number,
    shadeName: string
): string {
    const lines: string[] = [];

    // Base color variable
    lines.push(cssVar(shadeName, hsl(hue, saturation, lightness)));

    // Opacity variants
    for (const alpha of alphaLevels) {
        const alphaValue = alpha / 100;
        lines.push(cssVar(`${shadeName}-opacity${alpha}`, hsla(hue, saturation, lightness, alphaValue)));
    }

    return lines.join("\n");
}

/**
 * Generates utility classes for a single color shade
 */
function generateShadeUtilities(shadeName: string): string {
    const lines: string[] = [];

    for (const prefix of prefixes) {
        // Base utility
        lines.push(colorUtilityClass(prefix, shadeName));

        // Opacity variants
        for (const alpha of alphaLevels) {
            lines.push(colorUtilityClass(prefix, `${shadeName}-opacity${alpha}`));
        }
    }

    return lines.join("\n");
}

/**
 * Generates all CSS variables and utility classes
 */
function generateCSS(): string {
    const variableLines: string[] = [];
    const utilityLines: string[] = [];

    // ========================================================================
    // CSS VARIABLES
    // ========================================================================
    variableLines.push(":root {");

    // White, black, transparent
    variableLines.push("  --white: hsl(0, 0%, 100%); --black: hsl(0, 0%, 0%); --transparent: transparent;");

    // White/black opacity variants
    for (const alpha of alphaLevels) {
        const alphaValue = alpha / 100;
        variableLines.push(
            `  --white-opacity${alpha}: hsla(0, 0%, 100%, ${alphaValue}); ` +
            `--black-opacity${alpha}: hsla(0, 0%, 0%, ${alphaValue});`
        );
    }

    // Generate variables for each color
    for (const [colorName, { hue, saturation }] of Object.entries(colors)) {
        for (let i = 1; i <= (2 * levels - 1); i++) {
            const lightness = Math.round((i * 100) / (2 * levels));

            if (i < levels) {
                // Dark shades (dark90 to dark10)
                const level = (levels - i) * 10;
                const shadeName = `${colorName}-dark${level}`;
                variableLines.push(generateShadeVariables(colorName, hue, saturation, lightness, shadeName));
            } else if (i > levels) {
                // Light shades (light10 to light90)
                const level = (i - levels) * 10;
                const shadeName = `${colorName}-light${level}`;
                variableLines.push(generateShadeVariables(colorName, hue, saturation, lightness, shadeName));
            } else {
                // Base color (i === levels)
                variableLines.push(generateShadeVariables(colorName, hue, saturation, lightness, colorName));
            }
        }
    }

    variableLines.push("}");
    variableLines.push("");

    // ========================================================================
    // UTILITY CLASSES
    // ========================================================================

    // Generate utilities for each color
    for (const colorName of Object.keys(colors)) {
        for (let i = 1; i <= (2 * levels - 1); i++) {
            let shadeName: string;

            if (i < levels) {
                shadeName = `${colorName}-dark${(levels - i) * 10}`;
            } else if (i > levels) {
                shadeName = `${colorName}-light${(i - levels) * 10}`;
            } else {
                shadeName = colorName;
            }

            utilityLines.push(generateShadeUtilities(shadeName));
        }
    }

    // White, black, transparent utilities
    for (const prefix of prefixes) {
        utilityLines.push(colorUtilityClass(prefix, "white"));
        utilityLines.push(colorUtilityClass(prefix, "black"));
        utilityLines.push(colorUtilityClass(prefix, "transparent"));

        for (const alpha of alphaLevels) {
            utilityLines.push(colorUtilityClass(prefix, `white-opacity${alpha}`));
            utilityLines.push(colorUtilityClass(prefix, `black-opacity${alpha}`));
        }
    }

    return variableLines.join("\n") + "\n" + utilityLines.join("\n");
}

// ============================================================================
// MAIN
// ============================================================================

function main(): void {
    console.log("Generating colour classes...");

    const css = generateCSS();
    const outputPath = path.resolve(__dirname, "../styles/colours.css");
    const dir = path.dirname(outputPath);

    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }

    fs.writeFileSync(outputPath, css);

    // Calculate and display stats
    const lines = css.split("\n").length;
    const sizeKB = (Buffer.byteLength(css, "utf8") / 1024).toFixed(1);
    const colorCount = Object.keys(colors).length;
    const shadeCount = colorCount * (2 * levels - 1);
    const variantCount = shadeCount * (alphaLevels.length + 1);

    console.log(`Generated colours.css successfully!`);
    console.log(`  - ${colorCount} base colours`);
    console.log(`  - ${shadeCount} shades (dark90→light90)`);
    console.log(`  - ${variantCount} total variants (with opacity)`);
    console.log(`  - ${lines} lines, ${sizeKB} KB`);
}

main();
