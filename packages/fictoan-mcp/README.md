# Fictoan MCP server

Model Context Protocol server for the Fictoan React framework.

## Overview

This MCP server provides tools for AI assistants to understand and work with the Fictoan component library more
effectively.

## Available tools

### `Analyze component`

Analyzes a Fictoan component to understand its props, patterns, and usage.

**Parameters:**

- `componentName` (string): Name of the component to analyze (e.g., "Button", "Card", "Row")

## Available resources

### `fictoan://components`

Lists all available Fictoan components organized by category (layout, input, display, feedback, navigation).

## Installation

```bash
cd packages/fictoan-mcp
yarn install
yarn build
```

## Development

```bash
yarn mcp:dev  # run in development mode with hot reload
```

## Usage with claude desktop

Add to your Claude Desktop configuration:

```json
{
    "mcpServers" : {
        "fictoan" : {
            "command" : "node",
            "args"    : [
                "/path/to/fictoan-turborepo/packages/fictoan-mcp/dist/index.js"
            ],
            "env"     : {
                "FICTOAN_ROOT" : "/path/to/fictoan-turborepo"
            }
        }
    }
}
```

## Planned features

- `create_component`: Generate new Fictoan components with proper structure
- `enhance_component`: Add features to existing components
- `validate_patterns`: Check components against Fictoan conventions
- `generate_theme_vars`: Create CSS variables for components
- `generate_docs`: Auto-generate component documentation

## Architecture

The MCP server is designed to:

1. Understand Fictoan’s "plain English" prop conventions
2. Enforce consistent patterns across components
3. Accelerate component development
4. Maintain the framework's design philosophy