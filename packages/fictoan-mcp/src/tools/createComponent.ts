// TEMPLATES ===========================================================================================================
import { displayComponentTemplate } from "../templates/displayComponent.js";
import { inputComponentTemplate } from "../templates/inputComponent.js";
import { layoutComponentTemplate } from "../templates/layoutComponent.js";

// OTHER ===============================================================================================================
import { fileURLToPath } from "url";
import { join, dirname } from "path";
import { readFile } from "fs/promises";
import { writeFile, mkdir } from "fs/promises";

const __dirname = dirname(fileURLToPath(import.meta.url));

export interface CreateComponentParams {
    name          : string;
    type          : "display" | "input" | "layout" | "feedback" | "navigation";
    customProps ? : string[];
    description ? : string;
}

export async function createComponentTool(params : CreateComponentParams) {
    try {
        const {name, type, customProps = [], description = ""} = params;

        // Validate component name
        if (!name || !name.match(/^[A-Z][a-zA-Z0-9]*$/)) {
            return {
                content : [ {
                    type : "text",
                    text : "❌ Invalid component name. Component names must start with a capital letter and contain only letters and numbers.",
                } ],
            };
        }

        // Check if component already exists
        const componentsPath = join(__dirname, "../../../fictoan-react/src/components");
        const componentDir = join(componentsPath, name);

        try {
            await readFile(join(componentDir, `${name}.tsx`));
            return {
                content : [ {
                    type : "text",
                    text : `❌ Component '${name}' already exists. Use the enhance_component tool to modify existing components.`,
                } ],
            };
        } catch {
            // Component doesn't exist, we can proceed
        }

        // Get appropriate template
        let template;
        switch (type) {
            case "display":
                template = displayComponentTemplate(name, customProps);
                break;
            case "input":
                template = inputComponentTemplate(name, customProps);
                break;
            case "layout":
                template = layoutComponentTemplate(name, customProps);
                break;
            case "feedback":
                template = displayComponentTemplate(name, customProps); // Similar to display
                break;
            case "navigation":
                template = displayComponentTemplate(name, customProps); // Similar to display
                break;
            default:
                template = displayComponentTemplate(name, customProps);
        }

        // Create component directory
        await mkdir(componentDir, {recursive : true});

        // Write component files
        const files = [
            {path : join(componentDir, `${name}.tsx`), content : template.typescript},
            {path : join(componentDir, `${name.toLowerCase()}.css`), content : template.css},
            {path : join(componentDir, "index.ts"), content : template.index},
        ];

        await Promise.all(files.map(file => writeFile(file.path, file.content)));

        // Update main components index
        await updateComponentsIndex(name);

        // Add theme variables to main theme file if they exist
        if (template.themeVariables && template.themeVariables.trim().length > 0) {
            await updateThemeFile(name, template.themeVariables);
        }

        const createdFiles = files.map(f => f.path.split("/").pop()).join(", ");

        return {
            content : [ {
                type : "text",
                text : `✅ **${name} component created successfully!**

**Type:** ${type}
**Files created:** ${createdFiles}
**Location:** packages/fictoan-react/src/components/${name}/

**Next steps:**
1. Run \`yarn rebuild\` to build the component
2. Add component to documentation if needed
3. Test the component in your application

**Component usage example:**
\`\`\`jsx
import { ${name} } from "fictoan-react";

<${name} ${type === "display" ? "kind=\"primary\" size=\"medium\"" : type === "input" ? "label=\"Label\" placeholder=\"Enter text\"" : ""}>
  ${type === "layout" ? "Content here" : type === "input" ? "" : "Content"}
</${name}>
\`\`\`

${description ? `\n**Description:** ${description}` : ""}`,
            } ],
        };

    } catch (error) {
        return {
            content : [ {
                type : "text",
                text : `❌ Error creating component: ${error instanceof Error ? error.message : "Unknown error"}`,
            } ],
        };
    }
}

async function updateComponentsIndex(componentName : string) {
    const indexPath = join(__dirname, "../../../fictoan-react/src/components/index.tsx");

    try {
        const currentContent = await readFile(indexPath, "utf-8");

        // Add export line for new component
        const exportLine = `\n// ${componentName.toUpperCase()} ===========================================================================================\nexport { ${componentName}, type ${componentName}Props } from "./${componentName}";`;

        // Append to the end of the file
        const updatedContent = currentContent + exportLine;

        await writeFile(indexPath, updatedContent);
    } catch (error) {
        console.error("Failed to update components index:", error);
        // Don't fail the entire operation if this fails
    }
}

async function updateThemeFile(componentName : string, themeVariables : string) {
    const themePath = join(__dirname, "../../../fictoan-react/src/styles/theme.css");

    try {
        const currentContent = await readFile(themePath, "utf-8");

        // Add theme variables to the end of the file
        const updatedContent = currentContent + "\n\n" + themeVariables;

        await writeFile(themePath, updatedContent);
    } catch (error) {
        console.error("Failed to update theme file:", error);
        // Don't fail the entire operation if this fails
    }
}