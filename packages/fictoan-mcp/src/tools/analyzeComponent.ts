// OTHER ===============================================================================================================
import { fileURLToPath } from "url";
import { globby } from "globby";
import { join, dirname } from "path";
import { readFile } from "fs/promises";

const __dirname = dirname(fileURLToPath(import.meta.url));

export async function analyzeComponentTool({componentName} : { componentName : string }) {
    try {
        // Find the component file
        const componentsPath = join(__dirname, "../../../fictoan-react/src/components");
        const componentFiles = await globby([
            `${componentsPath}/${componentName}/${componentName}.tsx`,
            `${componentsPath}/${componentName}/index.tsx`,
        ]);

        if (componentFiles.length === 0) {
            return {
                content : [ {
                    type : "text",
                    text : `Component '${componentName}' not found in the Fictoan library.`,
                } ],
            };
        }

        // Read the component file
        const componentContent = await readFile(componentFiles[0], "utf-8");

        // Basic analysis
        const analysis = {
            name               : componentName,
            filePath           : componentFiles[0],
            hasTypeScript      : componentContent.includes("interface") || componentContent.includes("type"),
            extendsElement     : componentContent.includes("extends CommonAndHTMLProps"),
            hasResponsiveProps : componentContent.includes("desktopSpan") || componentContent.includes("tabletSpan"),
            usesForwardRef     : componentContent.includes("forwardRef"),
            hasThemeVariables  : false,
            estimatedProps     : [],
        };

        // Extract props (basic regex approach)
        const propsMatch = componentContent.match(/interface\s+\w+Props\s*{([^}]+)}/s);
        if (propsMatch) {
            const propsContent = propsMatch[1];
            const propLines = propsContent.split("\n").filter(line => line.includes(":"));
            // @ts-ignore
            analysis.estimatedProps = propLines.map(line => {
                const match = line.match(/^\s*(\w+)\s*\??\s*:/);
                return match ? match[1] : null;
            }).filter(Boolean);
        }

        // Check for CSS file
        try {
            const cssPath = componentFiles[0].replace(".tsx", ".css");
            const cssContent = await readFile(cssPath, "utf-8");
            analysis.hasThemeVariables = cssContent.includes("--");
        } catch {
            // No CSS file
        }

        return {
            content : [ {
                type : "text",
                text : `## Analysis of ${componentName} Component

**File Path:** ${analysis.filePath}
**TypeScript:** ${analysis.hasTypeScript ? "✓" : "✗"}
**Extends Element:** ${analysis.extendsElement ? "✓" : "✗"}
**Uses ForwardRef:** ${analysis.usesForwardRef ? "✓" : "✗"}
**Has Theme Variables:** ${analysis.hasThemeVariables ? "✓" : "✗"}
**Responsive Props:** ${analysis.hasResponsiveProps ? "✓" : "✗"}

**Detected Props (${analysis.estimatedProps.length}):**
${analysis.estimatedProps.map(prop => `- ${prop}`).join("\n")}

This is a basic analysis. For a full implementation, we would:
- Parse TypeScript AST for accurate prop extraction
- Analyze prop patterns and naming conventions
- Check for accessibility attributes
- Validate against Fictoan conventions
- Suggest improvements or missing features`,
            } ],
        };
    } catch (error) {
        return {
            content : [ {
                type : "text",
                text : `Error analyzing component: ${error instanceof Error ? error.message : "Unknown error"}`,
            } ],
        };
    }
}