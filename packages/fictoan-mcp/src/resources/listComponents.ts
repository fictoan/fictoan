// OTHER ===============================================================================================================
import { fileURLToPath } from "url";
import { globby } from "globby";
import { join, dirname, basename } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));

export async function listComponentsResource() {
    try {
        const componentsPath = join(__dirname, "../../../fictoan-react/src/components");

        // Find all component directories
        const componentDirs = await globby(`${componentsPath}/*/`, {
            onlyDirectories : true,
        });

        const components = componentDirs.map(dir => {
            const name = basename(dir);
            return {
                name,
                path     : dir,
                category : categorizeComponent(name),
            };
        }).sort((a, b) => a.name.localeCompare(b.name));

        const categorized = {
            layout     : components.filter(c => c.category === "layout"),
            input      : components.filter(c => c.category === "input"),
            display    : components.filter(c => c.category === "display"),
            feedback   : components.filter(c => c.category === "feedback"),
            navigation : components.filter(c => c.category === "navigation"),
            other      : components.filter(c => c.category === "other"),
        };

        return {
            contents : [ {
                uri      : "fictoan://components",
                mimeType : "application/json",
                text     : JSON.stringify({
                    totalComponents : components.length,
                    components      : categorized,
                    summary         : {
                        layout     : categorized.layout.length,
                        input      : categorized.input.length,
                        display    : categorized.display.length,
                        feedback   : categorized.feedback.length,
                        navigation : categorized.navigation.length,
                        other      : categorized.other.length,
                    },
                }, null, 2),
            } ],
        };
    } catch (error) {
        return {
            contents : [ {
                uri      : "fictoan://components",
                mimeType : "text/plain",
                text     : `Error listing components: ${error instanceof Error ? error.message : "Unknown error"}`,
            } ],
        };
    }
}

function categorizeComponent(name : string) : string {
    const categories = {
        layout     : [ "Row", "Portion", "Element", "Div", "Article", "Section", "Header", "Footer", "Main", "Aside" ],
        input      : [ "InputField", "TextArea", "Select", "Checkbox", "RadioButton", "Switch", "FileUpload", "PinInput", "FormWrapper", "FormItem" ],
        display    : [ "Card", "Badge", "Button", "Text", "Heading", "InfoPanel", "Divider", "Callout", "Accordion" ],
        feedback   : [ "Toast", "Notification", "ProgressBar", "Spinner", "ProgressiveDisclosure" ],
        navigation : [ "Breadcrumbs", "Sidebar", "Tabs", "Drawer", "Pagination" ],
    };

    for (const [ category, components ] of Object.entries(categories)) {
        if (components.includes(name)) {
            return category;
        }
    }

    return "other";
}