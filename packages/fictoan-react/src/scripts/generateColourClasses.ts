// OTHER ===============================================================================================================
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// COLOUR DEFINITIONS ==================================================================================================
import { oklchColourDefinitions, type ColourDefinition } from "../styles/colours";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// TYPES
type UtilityPrefix = "bg" | "text" | "border";

// Use the single source of truth for color definitions
const colors : Record<string, ColourDefinition> = oklchColourDefinitions;

/** Number of lightness levels on each side (dark/light) */
const levels = 10;

/** Opacity levels to generate (0-90 in increments) */
const alphaLevels = [ 0, 5, 10, 20, 30, 40, 50, 60, 70, 80, 90 ] as const;

/** CSS utility prefixes */
const prefixes : UtilityPrefix[] = [ "bg", "text", "border" ];

// CSS GENERATORS
/**
 * Generates OKLCH color string
 * @param lightness - 0 to 100 (percentage)
 * @param chroma - 0 to ~0.4 (can be higher for P3 gamut)
 * @param hue - 0 to 360 degrees
 */
function oklch(lightness : number, chroma : number, hue : number) : string {
    // Round to reasonable precision
    const l = lightness.toFixed(1);
    const c = chroma.toFixed(3);
    const h = hue.toFixed(1);
    return `oklch(${l}% ${c} ${h})`;
}

/**
 * Generates OKLCH color string with alpha
 */
function oklchAlpha(lightness : number, chroma : number, hue : number, alpha : number) : string {
    const l = lightness.toFixed(1);
    const c = chroma.toFixed(3);
    const h = hue.toFixed(1);
    return `oklch(${l}% ${c} ${h} / ${alpha})`;
}

/**
 * Generates a CSS variable definition
 */
function cssVar(name : string, value : string) : string {
    return `    --${name}: ${value};`;
}

/**
 * Generates a utility class for background or text color
 */
function colorUtilityClass(prefix : UtilityPrefix, className : string) : string {
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
    colorName : string,
    hue : number,
    chroma : number,
    lightness : number,
    shadeName : string,
) : string {
    const lines : string[] = [];

    // Base color variable
    lines.push(cssVar(shadeName, oklch(lightness, chroma, hue)));

    // Opacity variants
    for (const alpha of alphaLevels) {
        const alphaValue = alpha / 100;
        lines.push(cssVar(`${shadeName}-opacity${alpha}`, oklchAlpha(lightness, chroma, hue, alphaValue)));
    }

    return lines.join("\n");
}

/**
 * Generates utility classes for a single color shade
 */
function generateShadeUtilities(shadeName : string) : string {
    const lines : string[] = [];

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
 * Calculate lightness for OKLCH scale
 * OKLCH lightness is perceptually uniform, so we use a linear scale
 * Range: 15% (darkest) to 97% (lightest) with base at ~60%
 */
function calculateLightness(step : number, totalSteps : number) : number {
    // step 1 = darkest (15%), step 10 = base (60%), step 19 = lightest (97%)
    const minLightness = 15;
    const maxLightness = 97;
    const baseLightness = 60;

    if (step < totalSteps) {
        // Dark shades: 15% to 55%
        const darkRange = baseLightness - 5 - minLightness; // 40%
        const darkStep = step - 1; // 0 to 8
        const darkSteps = totalSteps - 1; // 9
        return minLightness + (darkRange * darkStep / darkSteps);
    } else if (step > totalSteps) {
        // Light shades: 65% to 97%
        const lightRange = maxLightness - (baseLightness + 5); // 32%
        const lightStep = step - totalSteps - 1; // 0 to 8
        const lightSteps = totalSteps - 1; // 9
        return (baseLightness + 5) + (lightRange * lightStep / lightSteps);
    } else {
        // Base color
        return baseLightness;
    }
}

/**
 * Adjust chroma based on lightness
 * Colors appear less chromatic at extreme lightness values
 */
function adjustChroma(baseChroma : number, lightness : number) : number {
    // Reduce chroma at very light or very dark values
    if (lightness < 25) {
        return baseChroma * (0.4 + (lightness / 25) * 0.6);
    } else if (lightness > 85) {
        return baseChroma * (0.4 + ((100 - lightness) / 15) * 0.6);
    }
    return baseChroma;
}

/**
 * Generates all CSS variables and utility classes
 */
function generateCSS() : string {
    const variableLines : string[] = [];
    const utilityLines : string[] = [];

    // CSS VARIABLES
    variableLines.push(":root {");

    // White, black, transparent
    variableLines.push("    --white: oklch(100% 0 0);");
    variableLines.push("    --black: oklch(0% 0 0);");
    variableLines.push("    --transparent: transparent;");

    // White/black opacity variants
    for (const alpha of alphaLevels) {
        const alphaValue = alpha / 100;
        variableLines.push(`    --white-opacity${alpha}: oklch(100% 0 0 / ${alphaValue});`);
        variableLines.push(`    --black-opacity${alpha}: oklch(0% 0 0 / ${alphaValue});`);
    }

    variableLines.push("");

    // Generate variables for each color
    for (const [ colorName, {hue, chroma} ] of Object.entries(colors)) {
        variableLines.push(`    /* ${colorName.toUpperCase()} */`);

        for (let i = 1; i <= (2 * levels - 1); i++) {
            const lightness = calculateLightness(i, levels);
            const adjustedChroma = adjustChroma(chroma, lightness);

            if (i < levels) {
                // Dark shades (dark90 to dark10)
                const level = (levels - i) * 10;
                const shadeName = `${colorName}-dark${level}`;
                variableLines.push(generateShadeVariables(colorName, hue, adjustedChroma, lightness, shadeName));
            } else if (i > levels) {
                // Light shades (light10 to light90)
                const level = (i - levels) * 10;
                const shadeName = `${colorName}-light${level}`;
                variableLines.push(generateShadeVariables(colorName, hue, adjustedChroma, lightness, shadeName));
            } else {
                variableLines.push(generateShadeVariables(colorName, hue, adjustedChroma, lightness, colorName));
            }
        }
        variableLines.push("");
    }

    variableLines.push("}");
    variableLines.push("");

    // UTILITY CLASSES
    // Generate utilities for each color
    for (const colorName of Object.keys(colors)) {
        for (let i = 1; i <= (2 * levels - 1); i++) {
            let shadeName : string;

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

// MAIN
function main() : void {
    console.log("Generating OKLCH colour classes...");

    const css = generateCSS();
    const outputPath = path.resolve(__dirname, "../styles/colours.css");
    const dir = path.dirname(outputPath);

    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, {recursive : true});
    }

    fs.writeFileSync(outputPath, css);

    // Calculate and display stats
    const lines = css.split("\n").length;
    const sizeKB = (Buffer.byteLength(css, "utf8") / 1024).toFixed(1);
    const colorCount = Object.keys(colors).length;
    const shadeCount = colorCount * (2 * levels - 1);
    const variantCount = shadeCount * (alphaLevels.length + 1);

    console.log(`Generated colours.css with OKLCH successfully!`);
    console.log(`  - ${colorCount} base colours`);
    console.log(`  - ${shadeCount} shades (dark90→light90)`);
    console.log(`  - ${variantCount} total variants (with opacity)`);
    console.log(`  - ${lines} lines, ${sizeKB} KB`);
}

main();
