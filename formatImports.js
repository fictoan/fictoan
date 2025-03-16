const fs = require("fs");
const path = require("path");


/**
 * Group all import statements found in the file.
 *
 * @param {string} fileContent The full file text.
 * @returns {string} The file text with the import block replaced by grouped imports.
 */
const groupImports = (fileContent) => {
    const TO_COLUMN_WIDTH = 120;
    const HEADER_CHAR = "=";

    const lines = fileContent.split("\n");
    const importStart = lines.findIndex(line =>
        line.trim().startsWith("import ") ||
        line.trim().startsWith("// "),
    );
    if (importStart === -1) return fileContent;

    // Extract the import block.
    let importEnd = importStart;
    const imports = [];
    let currentImport = [];
    let braceDepth = 0;

    for (let i = importStart; i < lines.length; i++) {
        const line = lines[i].trim();

        // Count braces in the current line
        if (line.includes("{")) braceDepth += (
            line.match(/\{/g) || []
        ).length;
        if (line.includes("}")) braceDepth -= (
            line.match(/\}/g) || []
        ).length;

        if (line.startsWith("import ")) {
            if (currentImport.length && braceDepth === 0) {
                imports.push(currentImport.join("\n"));
                currentImport = [];
            }
            currentImport.push(lines[i]);
            // Only consider semicolon as end of import if we're not inside braces
            if (line.includes(";") && braceDepth === 0) {
                imports.push(currentImport.join("\n"));
                currentImport = [];
            }
        } else if (currentImport.length) {
            currentImport.push(lines[i]);
            // Only consider semicolon as end of import if we're not inside braces
            if (line.includes(";") && braceDepth === 0) {
                imports.push(currentImport.join("\n"));
                currentImport = [];
            }
        } else if (!line.startsWith("//") && line !== "") {
            importEnd = i;
            break;
        }
    }

    // Add any remaining import
    if (currentImport.length) {
        imports.push(currentImport.join("\n"));
    }

    // Helper to create header strings.
    const createHeader = (text) => {
        const padding = HEADER_CHAR.repeat(TO_COLUMN_WIDTH - text.length);
        return text + padding;
    };

    // Define the groups along with matchers for each.
    const groups = [
        [createHeader("// FRAMEWORK "), line => ["\"react", "next/", "dnd-kit/", "zustand"].some(pkg => line.includes(pkg))],
        [createHeader("// FICTOAN "), line => line.includes("fictoan-react")],
        [createHeader("// COMPONENTS "), line => line.includes("components/")],
        [createHeader("// TYPES "), line => line.includes("$types/")],
        [createHeader("// LIB "), line => line.includes("$lib/")],
        [createHeader("// LOGIC "), line => line.includes("$logic/")],
        [createHeader("// SERVICES "), line => line.includes("$services/")],
        [createHeader("// DATA "), line => line.includes("$mock-data/")],
        [createHeader("// HOOKS "), line => line.includes("$hooks/")],
        [createHeader("// ASSETS "), line => line.includes("$assets/")],
        [createHeader("// STORES "), line => line.includes("$stores/")],
        [createHeader("// STYLES "), line => line.includes("$styles/") || line.includes(".css")],
        [createHeader("// UTILS "), line => line.includes("$utils/")],
        [createHeader("// OTHER "), () => true],
    ];

    // Build the new import block.
    const result = [];
    const processed = new Set();
    for (const [header, matcher] of groups) {
        const matches = imports.filter(imp => {
            if (processed.has(imp)) return false;
            const fullImport = imp.replace(/\n\s*/g, " ");
            return matcher(fullImport);
        });
        if (matches.length) {
            result.push(header);
            result.push(...matches.sort());
            result.push("");
            matches.forEach(imp => processed.add(imp));
        }
    }

    const preImports = lines.slice(0, importStart);
    const postImports = lines.slice(importEnd);
    const newLines = [...preImports, ...result, ...postImports];
    return newLines.join("\n");
};

/**
 * Format interface and type blocks (as well as any nested property blocks) in the file.
 *
 * @param {string} fileContent The full file text.
 * @returns {string} The file text with formatted interfaces/types.
 */
const formatTypesAndInterfaces = (fileContent) => {
    const codeLines = fileContent.split("\n");
    const newCodeLines = [];
    let i = 0;
    let fileDepth = 0; // Track overall file brace depth

    while (i < codeLines.length) {
        const line = codeLines[i];
        // Update file-level brace depth
        fileDepth += (
            line.match(/\{/g) || []
        ).length;
        fileDepth -= (
            line.match(/\}/g) || []
        ).length;

        // Only match actual interface/type definitions at the root level
        const typeDefMatch = fileDepth === 0 && line.match(/^\s*(export\s+)?(interface|type)\s+[\w$]+/);

        if (typeDefMatch) {
            const baseIndent = (
                line.match(/^(\s*)/) || [""]
            )[0];
            const blockLines = [];
            let braceDepth = 0;

            blockLines.push(line);
            i++;

            // Collect all lines of the interface/type definition
            while (i < codeLines.length) {
                const currentLine = codeLines[i];
                blockLines.push(currentLine);

                braceDepth += (
                    currentLine.match(/\{/g) || []
                ).length;
                braceDepth -= (
                    currentLine.match(/\}/g) || []
                ).length;

                if (braceDepth === 0 && currentLine.trim() === "}") {
                    i++;
                    break;
                }
                i++;
            }

            // Only format the interface block
            if (blockLines[0].includes("interface") || blockLines[0].includes("type")) {
                const formattedBlock = formatInterfaceProperties(blockLines.slice(1, -1));
                newCodeLines.push(blockLines[0]); // Opening line
                newCodeLines.push(...formattedBlock); // Formatted properties
                newCodeLines.push(baseIndent + "}"); // Closing brace
            } else {
                // If not an interface/type, keep original lines
                newCodeLines.push(...blockLines);
            }
        } else {
            newCodeLines.push(line);
            i++;
        }
    }

    // Check if we have proper brace balance before returning
    // If not, we won't add or remove any braces to avoid corrupting the file
    const formattedContent = newCodeLines.join("\n");

    // Compare opening and closing brace counts to ensure we didn't add/remove any
    const originalOpenCount = (fileContent.match(/\{/g) || []).length;
    const originalCloseCount = (fileContent.match(/\}/g) || []).length;
    const formattedOpenCount = (formattedContent.match(/\{/g) || []).length;
    const formattedCloseCount = (formattedContent.match(/\}/g) || []).length;

    if (originalOpenCount !== formattedOpenCount || originalCloseCount !== formattedCloseCount) {
        console.warn("Warning: Brace count mismatch detected. Using original file structure to avoid corruption.");
        return fileContent;
    }

    return formattedContent;
};

// Separate function for formatting interface properties only
const formatInterfaceProperties = (lines) => {
    const properties = [];
    let currentProp = [];
    let braceDepth = 0;

    // Group property lines while respecting nested structures
    for (const line of lines) {
        const openBraces = (
            line.match(/\{/g) || []
        ).length;
        const closeBraces = (
            line.match(/\}/g) || []
        ).length;

        braceDepth += openBraces - closeBraces;

        if (braceDepth === 0 && line.trim().endsWith(",") && currentProp.length > 0) {
            currentProp.push(line);
            properties.push(currentProp);
            currentProp = [];
        } else {
            currentProp.push(line);
        }
    }

    if (currentProp.length > 0) {
        properties.push(currentProp);
    }

    // Format each property group
    return properties.flatMap(propLines => {
        const firstLine = propLines[0].trim();
        if (firstLine.includes(":")) {
            const [key, ...rest] = firstLine.split(":");
            const keyPart = key.trim();
            const valuePart = rest.join(":").trim();

            // If it's a simple property (no nested structure)
            if (propLines.length === 1) {
                const indent = (
                    propLines[0].match(/^\s*/) || [""]
                )[0];
                return [`${indent}${keyPart.padEnd(20)} : ${valuePart}`];
            }
        }
        // Return original lines for complex properties
        return propLines;
    });
};

/**
 * Read the file, apply the import grouping and type/interface formatting,
 * then write the formatted code back to the file.
 *
 * @param {string} filePath The path of the file to process.
 */
const processFile = (filePath) => {
    try {
        let code = fs.readFileSync(filePath, "utf8");

        // First, group the imports.
        code = groupImports(code);
        // Next, format all type and interface blocks.
        code = formatTypesAndInterfaces(code);

        fs.writeFileSync(filePath, code);
    } catch (error) {
        if (error.code === "EBUSY") {
            setTimeout(() => processFile(filePath), 100);
        } else {
            console.error(`Error processing ${filePath}:`, error);
        }
    }
};

// If run from the command line, process the file given as the first argument.
const filePath = process.argv[2];
if (!filePath) {
    console.error("Please provide a file path to format.");
    process.exit(1);
}

processFile(filePath);
