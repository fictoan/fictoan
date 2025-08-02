// OTHER ===============================================================================================================
import { globby } from "globby";
import { join, dirname, basename } from "path";
import { mkdir } from "fs/promises";
import { readFile, writeFile } from "fs/promises";

interface PropDefinition {
    name           : string;
    type           : string;
    required       : boolean;
    defaultValue ? : string;
    description    : string;
}

interface ComponentDocumentation {
    name            : string;
    description     : string;
    category        : string;
    props           : PropDefinition[];
    supportedProps  : string[];
    characteristics : string[];
    cssVariables    : string[];
}

export async function generateDocsTool(args : {
    componentName? : string;
    generateAll? : boolean;
    includeConfig? : boolean;
    outputPath? : string;
}) : Promise<{
    content : [ {
        type : "text";
        text : string;
    } ];
}> {
    try {
        const {
                  componentName,
                  generateAll   = false,
                  includeConfig = true,
                  outputPath,
              } = args;

        let componentsToDocument : string[] = [];

        if (generateAll) {
            // Find all components
            const componentFiles = await globby([
                "../fictoan-react/src/components/**/*.tsx",
                "!../fictoan-react/src/components/**/index.tsx",
            ], {
                cwd      : process.cwd(),
                absolute : true,
            });
            componentsToDocument = componentFiles;
        } else if (componentName) {
            // Find specific component
            const componentPath = await findComponentPath(componentName);
            if (!componentPath) {
                return {
                    content : [ {
                        type : "text",
                        text : `❌ Component "${componentName}" not found`,
                    } ],
                };
            }
            componentsToDocument = [ componentPath ];
        } else {
            return {
                content : [ {
                    type : "text",
                    text : "❌ Please specify either componentName or set generateAll to true",
                } ],
            };
        }

        const documentations : ComponentDocumentation[] = [];

        for (const filePath of componentsToDocument) {
            const doc = await generateComponentDocumentation(filePath);
            if (doc) {
                documentations.push(doc);
            }
        }

        // Generate React documentation pages
        let result = "";
        const docsDir = outputPath || "../fictoan-docs/src/app/components";

        if (generateAll) {
            result = await generateAllComponentPages(documentations, docsDir, includeConfig);
        } else {
            result = await generateSingleComponentPage(documentations[0], docsDir, includeConfig);
        }

        return {
            content : [ {
                type : "text",
                text : result || generateDocumentationReport(documentations),
            } ],
        };

    } catch (error) {
        return {
            content : [ {
                type : "text",
                text : `❌ Error generating documentation: ${error instanceof Error ? error.message : String(error)}`,
            } ],
        };
    }
}

async function findComponentPath(componentName : string) : Promise<string | null> {
    const patterns = [
        `../fictoan-react/src/components/**/${componentName}.tsx`,
        `../fictoan-react/src/components/**/${componentName}/*.tsx`,
    ];

    const files = await globby(patterns, {
        cwd      : process.cwd(),
        absolute : true,
    });

    return files.find(file => !file.endsWith("index.tsx")) || null;
}

async function generateComponentDocumentation(filePath : string) : Promise<ComponentDocumentation | null> {
    try {
        const content = await readFile(filePath, "utf-8");
        const componentName = extractComponentName(filePath);

        if (!componentName) return null;

        const documentation : ComponentDocumentation = {
            name            : componentName,
            description     : extractDescription(content, componentName),
            category        : determineCategory(filePath, content),
            props           : extractProps(content, componentName),
            supportedProps  : extractSupportedPropsConfig(content, componentName),
            characteristics : extractCharacteristics(content, componentName),
            cssVariables    : await extractCSSVariables(filePath),
        };

        return documentation;

    } catch (error) {
        console.error(`Error documenting component at ${filePath}:`, error);
        return null;
    }
}

function extractComponentName(filePath : string) : string | null {
    const fileName = basename(filePath, ".tsx");
    return fileName !== "index" ? fileName : null;
}

function extractDescription(content : string, componentName : string) : string {
    // Look for JSDoc comments
    const jsDocMatch = content.match(/\/\*\*\s*\n\s*\* (.*?)\n\s*\*\//);
    if (jsDocMatch) {
        return jsDocMatch[1].trim();
    }

    // Look for component comment above the component
    const componentRegex = new RegExp(`\/\/ (.*?)\\n.*?${componentName}`, "s");
    const commentMatch = content.match(componentRegex);
    if (commentMatch) {
        return commentMatch[1].trim();
    }

    // Generate default description based on component type
    const descriptions : { [key : string] : string } = {
        "Badge"       : "A small inline element to highlight information",
        "Button"      : "An interactive element for triggering actions",
        "Card"        : "A container for grouping related content",
        "Modal"       : "An overlay component for focused content",
        "Toast"       : "A non-intrusive notification component",
        "Accordion"   : "A collapsible content container",
        "Tabs"        : "A component for organizing content into tabs",
        "Tooltip"     : "A small popup with additional information",
        "InputField"  : "A text input component with validation",
        "Checkbox"    : "A binary input component",
        "RadioButton" : "A single-choice input component",
        "Select"      : "A dropdown selection component",
        "Range"       : "A slider input component",
        "ProgressBar" : "A visual indicator of progress",
        "Table"       : "A component for displaying tabular data",
        "Divider"     : "A visual separator element",
        "Breadcrumbs" : "A navigation aid showing page hierarchy",
    };

    return descriptions[componentName] || `A ${componentName} component for the Fictoan design system.`;
}

function determineCategory(filePath : string, content : string) : string {
    const path = filePath.toLowerCase();

    if (path.includes("/layout/")) return "Layout";
    if (path.includes("/input/") || path.includes("/form/")) return "Input";
    if (path.includes("/feedback/")) return "Feedback";
    if (path.includes("/navigation/")) return "Navigation";
    if (path.includes("/display/")) return "Display";

    // Analyze content for hints
    if (content.includes("onClick") || content.includes("Button")) return "Display";
    if (content.includes("value") || content.includes("onChange")) return "Input";
    if (content.includes("Row") || content.includes("Portion")) return "Layout";
    if (content.includes("toast") || content.includes("modal")) return "Feedback";
    if (content.includes("link") || content.includes("nav")) return "Navigation";

    return "Display";
}

function extractProps(content : string, componentName : string) : PropDefinition[] {
    const props : PropDefinition[] = [];

    // Find the props interface
    const interfaceRegex = new RegExp(`interface\\s+${componentName}Props[^{]*{([^}]*)}`, "s");
    const interfaceMatch = content.match(interfaceRegex);

    if (!interfaceMatch) {
        return props;
    }

    const interfaceBody = interfaceMatch[1];
    const lines = interfaceBody.split("\n");

    for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed || trimmed.startsWith("//") || trimmed.startsWith("/*")) continue;

        // Parse prop definition
        const propMatch = trimmed.match(/^(\w+)(\?)?:\s*([^;]+);?/);
        if (propMatch) {
            const [ , name, optional, type ] = propMatch;

            // Extract description from comment
            let description = "";
            const commentMatch = trimmed.match(/\/\*\s*(.*?)\s*\*\//);
            if (commentMatch) {
                description = commentMatch[1];
            } else {
                description = generatePropDescription(name, type);
            }

            props.push({
                name,
                type         : type.trim(),
                required     : !optional,
                description,
                defaultValue : extractDefaultValue(content, name),
            });
        }
    }

    return props;
}

function generatePropDescription(name : string, type : string) : string {
    const descriptions : { [key : string] : string } = {
        "children"   : "The content to render inside the component",
        "className"  : "Additional CSS class names to apply",
        "onClick"    : "Callback function when the component is clicked",
        "onChange"   : "Callback function when the value changes",
        "onFocus"    : "Callback function when the component receives focus",
        "onBlur"     : "Callback function when the component loses focus",
        "disabled"   : "Whether the component is disabled",
        "isDisabled" : "Whether the component is disabled",
        "isLoading"  : "Whether the component is in a loading state",
        "hasError"   : "Whether the component has an error state",
        "size"       : "The size variant of the component",
        "variant"    : "The visual variant of the component",
        "shape"      : "The shape variant of the component",
    };

    if (descriptions[name]) {
        return descriptions[name];
    }

    // Generate based on type
    if (type.includes("boolean")) {
        return `Boolean flag to control ${name.replace(/^(is|has|show|hide)/, "").toLowerCase()} behavior`;
    }

    if (type.includes("string")) {
        return `String value for ${name}`;
    }

    if (type.includes("number")) {
        return `Numeric value for ${name}`;
    }

    if (type.includes("function") || type.includes("=>")) {
        return `Callback function for ${name}`;
    }

    return `Configuration for ${name}`;
}

function extractDefaultValue(content : string, propName : string) : string | undefined {
    // Look for default values in destructuring
    const destructureRegex = new RegExp(`${propName}\\s*=\\s*([^,}]+)`, "g");
    const match = destructureRegex.exec(content);

    if (match) {
        return match[1].trim().replace(/^['"]|['"]$/g, "");
    }

    return undefined;
}

function extractSupportedPropsConfig(content : string, componentName : string) : string[] {
    const supportedProps : string[] = [];

    // Common props based on content analysis
    if (content.includes("size")) supportedProps.push("size");
    if (content.includes("shape")) supportedProps.push("shape");
    if (content.includes("bgColour") || content.includes("backgroundColor")) supportedProps.push("bgColour");
    if (content.includes("textColour") || content.includes("color")) supportedProps.push("textColour");
    if (content.includes("borderColour") || content.includes("border")) supportedProps.push("borderColour");
    if (content.includes("marginTop") || content.includes("margin")) supportedProps.push("margin");
    if (content.includes("paddingAll") || content.includes("padding")) supportedProps.push("padding");
    if (content.includes("isLoading")) supportedProps.push("loading");
    if (content.includes("isDisabled")) supportedProps.push("disabled");
    if (content.includes("variant")) supportedProps.push("variant");
    if (content.includes("onClick")) supportedProps.push("onClick");
    if (content.includes("onChange")) supportedProps.push("onChange");

    // Add strings config for text-based components
    const textComponents = [ "Badge", "Button", "Text", "Heading1", "Heading2", "Heading3", "Heading4", "Heading5", "Heading6" ];
    if (textComponents.includes(componentName)) {
        supportedProps.push("strings");
    }

    return supportedProps;
}

function extractCharacteristics(content : string, componentName : string) : string[] {
    const characteristics : string[] = [];

    // Component-specific characteristics
    const componentCharacteristics : { [key : string] : string[] } = {
        "Badge"      : [
            "You have to manually align the Badge with its sibling",
            "Default size is medium",
            "Can be used inline with text elements",
        ],
        "Button"     : [
            "Default variant is primary",
            "Supports loading state with spinner",
            "Automatically handles focus and keyboard interaction",
        ],
        "Card"       : [
            "Creates a contained surface for content",
            "Supports elevation through shadows",
            "Can be interactive or static",
        ],
        "Modal"      : [
            "Renders in a portal above other content",
            "Includes backdrop click to close",
            "Traps focus within the modal content",
        ],
        "InputField" : [
            "Supports validation states",
            "Can display helper text and error messages",
            "Integrates with form libraries",
        ],
        "Select"     : [
            "Supports single and multiple selection",
            "Can be searchable",
            "Works with keyboard navigation",
        ],
    };

    if (componentCharacteristics[componentName]) {
        characteristics.push(...componentCharacteristics[componentName]);
    }

    // Generic characteristics based on content analysis
    if (content.includes("forwardRef")) {
        characteristics.push("Supports ref forwarding to underlying DOM element");
    }

    if (content.includes("extends CommonAndHTMLProps")) {
        characteristics.push("Inherits all common Fictoan props and HTML attributes");
    }

    if (content.includes("isLoading")) {
        characteristics.push("Supports loading state");
    }

    if (content.includes("isDisabled")) {
        characteristics.push("Supports disabled state with proper accessibility");
    }

    return characteristics;
}

async function extractCSSVariables(filePath : string) : Promise<string[]> {
    try {
        const cssPath = filePath.replace(".tsx", ".css");
        const cssContent = await readFile(cssPath, "utf-8");

        const variables : string[] = [];
        const variableRegex = /--[\w-]+/g;
        let match;

        while ((match = variableRegex.exec(cssContent)) !== null) {
            if (!variables.includes(match[0])) {
                variables.push(match[0]);
            }
        }

        return variables.sort();
    } catch (error) {
        return [];
    }
}

async function generateSingleComponentPage(
    doc : ComponentDocumentation, docsDir : string, includeConfig : boolean) : Promise<string> {
    const componentDir = join(docsDir, doc.name.toLowerCase());

    try {
        await mkdir(componentDir, {recursive : true});

        // Generate page.tsx (metadata)
        const pageContent = generatePageFile(doc);
        await writeFile(join(componentDir, "page.tsx"), pageContent);

        // Generate page.client.tsx (main component)
        const clientContent = generateClientPageFile(doc, includeConfig);
        await writeFile(join(componentDir, "page.client.tsx"), clientContent);

        // Generate CSS file
        const cssContent = generateCSSFile(doc);
        await writeFile(join(componentDir, `page-${doc.name.toLowerCase()}.css`), cssContent);

        // Generate config.js if needed
        if (includeConfig && doc.supportedProps.length > 0) {
            const configContent = generateConfigFile(doc);
            await writeFile(join(componentDir, "config.js"), configContent);
        }

        return `✅ Documentation page generated: ${componentDir}`;
    } catch (error) {
        return `❌ Failed to generate documentation page: ${error}`;
    }
}

async function generateAllComponentPages(
    docs : ComponentDocumentation[], docsDir : string, includeConfig : boolean) : Promise<string> {
    let successCount = 0;
    let failureCount = 0;

    for (const doc of docs) {
        try {
            await generateSingleComponentPage(doc, docsDir, includeConfig);
            successCount++;
        } catch (error) {
            failureCount++;
            console.error(`Failed to generate docs for ${doc.name}:`, error);
        }
    }

    return `✅ Generated ${successCount} documentation pages, ${failureCount} failures`;
}

function generatePageFile(doc : ComponentDocumentation) : string {
    const kebabName = doc.name.toLowerCase().replace(/([A-Z])/g, "-$1").replace(/^-/, "");

    return `import ${doc.name}Docs from "./page.client";

export const metadata = {
    title       : "${doc.name} component — Fictoan UI",
    description : "${doc.description}",
    openGraph   : {
        title       : "${doc.name} component — Fictoan UI",
        description : "${doc.description}",
        url         : "https://fictoan.io/components/${kebabName}",
        siteName    : "Fictoan UI",
        images      : [
            {
                url    : "https://fictoan.s3.ap-south-1.amazonaws.com/open-graph/${kebabName}-fictoan-og.png",
                width  : 1200,
                height : 630,
                alt    : "${doc.name} component — Fictoan UI",
            },
        ],
        locale      : "en_US",
        type        : "website",
    },
    twitter     : {
        card        : "summary_large_image",
        title       : "${doc.name} component — Fictoan UI",
        description : "${doc.description}",
        images      : ["https://fictoan.s3.ap-south-1.amazonaws.com/open-graph/${kebabName}-fictoan-og.png"],
    },
};

export default function Page() {
    return <${doc.name}Docs />;
}
`;
}

function generateClientPageFile(doc : ComponentDocumentation, includeConfig : boolean) : string {
    const kebabName = doc.name.toLowerCase().replace(/([A-Z])/g, "-$1").replace(/^-/, "");

    let imports = `"use client";

import React from "react";

import {
    Div,
    Heading1,
    Heading4,
    Divider,
    Portion,
    Row,
    Text,
    Article,
    ${doc.name},
    Section,
} from "fictoan-react";

import "./page-${kebabName}.css";
import "../../../styles/fictoan-theme.css";

import { createPropsConfigurator } from "$utils/propsConfigurator";
import { createThemeConfigurator } from "$utils/themeConfigurator";`;

    if (doc.supportedProps.includes("bgColour") || doc.supportedProps.includes("textColour") || doc.supportedProps.includes(
        "borderColour")) {
        imports += `

import { colourOptions } from "../../colour/colours";`;
    }

    let content = `${imports}

const ${doc.name}Docs = () => {
    const {
        propsConfigurator,
        componentProps: propsConfig,
    } = createPropsConfigurator(
        "${doc.name}", [
            ${doc.supportedProps.map(prop => `"${prop}"`).join(",\n            ")}
        ],`;

    if (doc.supportedProps.includes("bgColour") || doc.supportedProps.includes("textColour") || doc.supportedProps.includes(
        "borderColour")) {
        content += `
        colourOptions,`;
    } else {
        content += `
        [],`;
    }

    content += `
        {
            isSelfClosing : false,
            canHaveChildren : true,
        }
    );

    const ${doc.name}Component = (varName) => {
        return varName.startsWith("${kebabName}-");
    };

    const {
        interactiveElementRef,
        componentProps: themeConfig,
        themeConfigurator,
    } = createThemeConfigurator("${doc.name}", ${doc.name}Component);

    return (
        <Article id="page-${kebabName}">
            {/*  INTRO ///////////////////////////////////////////////////////////////////////////////////////////// */}
            <Section>
                <Row horizontalPadding="huge" marginTop="medium" marginBottom="small">
                    <Portion>
                        <Heading1>${doc.name}</Heading1>
                        <Text size="large" marginBottom="small">
                            ${doc.description}
                        </Text>
                    </Portion>

                    <Portion>
                        <ul>`;

    doc.characteristics.forEach(characteristic => {
        content += `
                            <li>${characteristic}</li>`;
    });

    content += `
                        </ul>
                    </Portion>
                </Row>
            </Section>

            <Divider kind="primary" horizontalMargin="huge" verticalMargin="small" />

            {/* INTERACTIVE COMPONENT ////////////////////////////////////////////////////////////////////////////// */}
            <Section>
                {/* DEMO COMPONENT ================================================================================= */}
                <Row id="component-wrapper" horizontalPadding="small" className="rendered-component">
                    <Portion>
                        <Div
                            padding="small"
                            shape="rounded"
                            bgColour="slate-light80"
                            data-centered-children
                        >
                            <${doc.name}
                                id="interactive-component"
                                ref={interactiveElementRef}
                                {...propsConfig}
                                {...themeConfig}
                            >
                                {propsConfig.content}
                            </${doc.name}>
                        </Div>
                    </Portion>
                </Row>

                <Row horizontalPadding="small">
                    {/* PROPS CONFIGURATOR ========================================================================= */}
                    <Portion desktopSpan="half">
                        {propsConfigurator()}
                    </Portion>

                    {/* THEME CONFIGURATOR ========================================================================= */}
                    <Portion desktopSpan="half">
                        {themeConfigurator()}
                    </Portion>
                </Row>
            </Section>
        </Article>
    );
};

export default ${doc.name}Docs;
`;

    return content;
}

function generateCSSFile(doc : ComponentDocumentation) : string {
    const kebabName = doc.name.toLowerCase().replace(/([A-Z])/g, "-$1").replace(/^-/, "");

    return `/* ${doc.name} Documentation Styles */

#page-${kebabName} {
    /* Component-specific documentation styles */
}

/* Interactive component wrapper */
#component-wrapper {
    min-height: 200px;
}

/* Demo component styling */
#interactive-component {
    /* Styles for the interactive demo */
}

/* Theme configurator specific styles */
.theme-configurator {
    /* Styling for theme controls */
}

/* Props configurator specific styles */
.props-configurator {
    /* Styling for props controls */
}
`;
}

function generateConfigFile(doc : ComponentDocumentation) : string {
    return `// ${doc.name} component configuration for documentation

export const ${doc.name.toLowerCase()}Config = {
    // Component-specific configuration
    defaultProps: {
        // Default props for the component demo
    },
    
    // Props that should be available in the configurator
    availableProps: [
        ${doc.supportedProps.map(prop => `"${prop}"`).join(",\n        ")}
    ],
    
    // Theme variables for the component
    themeVariables: [
        ${doc.cssVariables.map(variable => `"${variable}"`).join(",\n        ")}
    ],
    
    // Component characteristics
    characteristics: [
        ${doc.characteristics.map(char => `"${char}"`).join(",\n        ")}
    ]
};

export default ${doc.name.toLowerCase()}Config;
`;
}

function generateDocumentationReport(docs : ComponentDocumentation[]) : string {
    let report = `# React Documentation Generation Report\n\n`;

    report += `**Components Documented**: ${docs.length}\n\n`;

    // Statistics
    const totalProps = docs.reduce((sum, doc) => sum + doc.props.length, 0);
    const totalSupportedProps = docs.reduce((sum, doc) => sum + doc.supportedProps.length, 0);
    const totalCSSVars = docs.reduce((sum, doc) => sum + doc.cssVariables.length, 0);

    report += `## Statistics\n\n`;
    report += `- **Total Props Documented**: ${totalProps}\n`;
    report += `- **Total Supported Props**: ${totalSupportedProps}\n`;
    report += `- **Total CSS Variables Found**: ${totalCSSVars}\n\n`;

    // By category
    const categories = [ ...new Set(docs.map(doc => doc.category)) ];
    report += `## Components by Category\n\n`;
    categories.forEach(category => {
        const count = docs.filter(doc => doc.category === category).length;
        report += `- **${category}**: ${count} components\n`;
    });

    report += `\n## Generated Files\n\n`;
    docs.sort((a, b) => a.name.localeCompare(b.name)).forEach(doc => {
        const kebabName = doc.name.toLowerCase().replace(/([A-Z])/g, "-$1").replace(/^-/, "");
        report += `### ${doc.name}\n`;
        report += `- **Directory**: \`components/${kebabName}/\`\n`;
        report += `- **Files Generated**:\n`;
        report += `  - \`page.jsx\` - Next.js metadata and page setup\n`;
        report += `  - \`page.client.jsx\` - Interactive React component\n`;
        report += `  - \`page-${kebabName}.css\` - Component-specific styles\n`;
        if (doc.supportedProps.length > 0) {
            report += `  - \`config.js\` - Component configuration\n`;
        }
        report += `- **Props**: ${doc.props.length}\n`;
        report += `- **Supported Props**: ${doc.supportedProps.length}\n`;
        report += `- **CSS Variables**: ${doc.cssVariables.length}\n\n`;
    });

    report += `## Integration Notes\n\n`;
    report += `- All generated pages follow the existing Fictoan docs structure\n`;
    report += `- Interactive configurators are included for props and themes\n`;
    report += `- Components integrate with the existing color system\n`;
    report += `- CSS files follow the established naming conventions\n`;
    report += `- Metadata is properly configured for SEO and social sharing\n\n`;

    report += `✅ React documentation pages successfully generated!`;

    return report;
}