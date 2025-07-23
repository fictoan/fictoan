#!/usr/bin/env node

// // TYPES ============================================================================================================
import {
    CallToolRequestSchema,
    ListToolsRequestSchema,
    ListResourcesRequestSchema,
    ReadResourceRequestSchema,
    ErrorCode,
    McpError,
} from "@modelcontextprotocol/sdk/types.js";

// // OTHER ============================================================================================================
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { analyzeComponentTool } from "./tools/analyzeComponent.js";
import { createComponentTool } from "./tools/createComponent.js";
import { enhanceComponentTool } from "./tools/enhanceComponent.js";
import { generateDocsTool } from "./tools/generateDocs.js";
import { generateThemeVarsTool } from "./tools/generateThemeVars.js";
import { listComponentsResource } from "./resources/listComponents.js";
import { validatePatternsTool } from "./tools/validatePatterns.js";
const server = new Server(
    {
        name    : "fictoan-mcp",
        version : "0.1.0",
    },
    {
        capabilities : {
            tools     : {},
            resources : {},
        },
    },
);

// List available tools
server.setRequestHandler(ListToolsRequestSchema, async () => ({
    tools : [
        {
            name        : "analyze_component",
            description : "Analyze a Fictoan component to understand its props, patterns, and usage",
            inputSchema : {
                type       : "object",
                properties : {
                    componentName : {
                        type        : "string",
                        description : "Name of the component to analyze (e.g., Button, Card, Row)",
                    },
                },
                required   : [ "componentName" ],
            },
        },
        {
            name        : "create_component",
            description : "Create a new Fictoan component with proper structure, TypeScript types, and CSS",
            inputSchema : {
                type       : "object",
                properties : {
                    name : {
                        type        : "string",
                        description : "Component name in PascalCase (e.g., MyNewComponent)",
                    },
                    type : {
                        type        : "string",
                        enum        : [ "display", "input", "layout", "feedback", "navigation" ],
                        description : "Type of component to create",
                    },
                    customProps : {
                        type        : "array",
                        items       : { type : "string" },
                        description : "Optional array of custom prop names to add to the component",
                    },
                    description : {
                        type        : "string",
                        description : "Optional description of what the component does",
                    },
                },
                required   : [ "name", "type" ],
            },
        },
        {
            name        : "enhance_component",
            description : "Add features to an existing Fictoan component (loading states, sizes, variants, etc.)",
            inputSchema : {
                type       : "object",
                properties : {
                    componentName : {
                        type        : "string",
                        description : "Name of the existing component to enhance (e.g., Button, Card)",
                    },
                    enhancements : {
                        type       : "object",
                        properties : {
                            addLoadingState : {
                                type        : "boolean",
                                description : "Add isLoading prop and loading styles",
                            },
                            addDisabledState : {
                                type        : "boolean",
                                description : "Add isDisabled prop and disabled styles",
                            },
                            addSizeVariants : {
                                type        : "boolean",
                                description : "Add size prop with nano, micro, tiny, small, medium, large, huge options",
                            },
                            addShapeVariants : {
                                type        : "boolean",
                                description : "Add shape prop with rounded, curved options",
                            },
                            addResponsiveProps : {
                                type        : "boolean",
                                description : "Add responsive visibility props (already available via CommonAndHTMLProps)",
                            },
                            addCustomProps : {
                                type        : "array",
                                items       : { type : "string" },
                                description : "Array of custom prop names to add",
                            },
                            addVariants : {
                                type        : "array",
                                items       : { type : "string" },
                                description : "Array of variant names to add (e.g., ['success', 'warning', 'error'])",
                            },
                        },
                        description : "Object specifying which enhancements to apply",
                    },
                    description : {
                        type        : "string",
                        description : "Optional description of the enhancements being made",
                    },
                },
                required   : [ "componentName", "enhancements" ],
            },
        },
        {
            name        : "validate_patterns",
            description : "Validate Fictoan component patterns for consistency and best practices",
            inputSchema : {
                type       : "object",
                properties : {
                    componentName : {
                        type        : "string",
                        description : "Name of the component to validate (e.g., Button, Card)",
                    },
                    validateAll : {
                        type        : "boolean",
                        description : "Validate all components in the codebase",
                    },
                    strict : {
                        type        : "boolean",
                        description : "Enable strict validation mode with additional checks",
                    },
                },
                required   : [],
            },
        },
        {
            name        : "generate_theme_vars",
            description : "Generate CSS theme variables for a Fictoan component",
            inputSchema : {
                type       : "object",
                properties : {
                    componentName : {
                        type        : "string",
                        description : "Name of the component to generate theme variables for",
                    },
                    baseVariables : {
                        type        : "array",
                        items       : { type : "string" },
                        description : "Array of base variable names (e.g., ['bg', 'color', 'border'])",
                    },
                    includeStates : {
                        type        : "boolean",
                        description : "Include state variations (hover, active, focus, disabled)",
                    },
                    includeColorModifiers : {
                        type        : "boolean",
                        description : "Include color modifier variations (light, dark, transparent)",
                    },
                    customVariables : {
                        type        : "object",
                        description : "Custom variables as key-value pairs",
                    },
                    outputToGlobalTheme : {
                        type        : "boolean",
                        description : "Add variables to global theme file instead of component CSS",
                    },
                },
                required   : [ "componentName" ],
            },
        },
        {
            name        : "generate_docs",
            description : "Generate React-based documentation pages for Fictoan components",
            inputSchema : {
                type       : "object",
                properties : {
                    componentName : {
                        type        : "string",
                        description : "Name of the component to generate docs for (e.g., Button, Card)",
                    },
                    generateAll : {
                        type        : "boolean",
                        description : "Generate documentation for all components",
                    },
                    includeConfig : {
                        type        : "boolean",
                        description : "Include configuration files for props and themes",
                    },
                    outputPath : {
                        type        : "string",
                        description : "Custom output path for documentation files",
                    },
                },
                required   : [],
            },
        },
    ],
}));

// Handle tool calls
server.setRequestHandler(CallToolRequestSchema, async (request) => {
    const {name, arguments : args} = request.params;

    switch (name) {
        case "analyze_component":
            return await analyzeComponentTool(args as { componentName : string });
        
        case "create_component":
            return await createComponentTool(args as any);
        
        case "enhance_component":
            return await enhanceComponentTool(args as any);
        
        case "validate_patterns":
            return await validatePatternsTool(args as any);
        
        case "generate_theme_vars":
            return await generateThemeVarsTool(args as any);
        
        case "generate_docs":
            return await generateDocsTool(args as any);

        default:
            throw new McpError(
                ErrorCode.MethodNotFound,
                `Tool ${name} not found`,
            );
    }
});

// List available resources
server.setRequestHandler(ListResourcesRequestSchema, async () => ({
    resources : [
        {
            uri         : "fictoan://components",
            name        : "Fictoan Components",
            description : "List of all available Fictoan components with metadata",
            mimeType    : "application/json",
        },
    ],
}));

// Handle resource reads
server.setRequestHandler(ReadResourceRequestSchema, async (request) => {
    const {uri} = request.params;

    switch (uri) {
        case "fictoan://components":
            return await listComponentsResource();

        default:
            throw new McpError(
                ErrorCode.InvalidRequest,
                `Resource ${uri} not found`,
            );
    }
});

// Start the server
async function main() {
    const transport = new StdioServerTransport();
    await server.connect(transport);
    console.error("Fictoan MCP server started");
}

main().catch((error) => {
    console.error("Fatal error:", error);
    process.exit(1);
});