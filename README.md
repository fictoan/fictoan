# Fictoan Turborepo

A simple monorepo setup for Fictoan React component library and documentation site.

## What's included

- `packages/fictoan-react`: The Fictoan React component library
- `packages/fictoan-docs`: The documentation site for Fictoan

## Development Workflow

This monorepo is set up with a minimal, no-frills workflow for developing the Fictoan component library and documentation together.

### Commands

- `yarn dev` - Run the documentation site on localhost
- `yarn updateLib` - Build the component library and update it in the docs site

### Getting Started

1. Clone this repository
2. Run `yarn install` at the root
3. Run `yarn dev` to start developing

### Working on the Component Library

When making changes to the component library:

1. Make your changes in `packages/fictoan-react`
2. Run `yarn updateLib` to build the library and copy the files to the docs site
3. The docs site will now use your latest changes

## Repository Structure

```
fictoan-turborepo/
├── packages/
│   ├── fictoan-react/     # Component library
│   └── fictoan-docs/      # Documentation site
├── scripts/
│   └── copy-lib.js        # Script to copy built files to docs
├── turbo.json             # Turborepo configuration
└── package.json           # Root package.json with workspace config
```