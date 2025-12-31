<p align="center" style="color: #343a40">
    <a href="https://fictoan.io"><img src="https://raw.githubusercontent.com/fictoan/fictoan-react/main/fictoan-icon.svg" alt="Fictoan Framework" height="150" width="150"></a>
</p>

<h1 align="center">Fictoan</h1>
<p align="center" style="font-size: 1rem;">
    React UI in plain English<br>
    Components so obvious, anyone can ship them.
</p>

<p align="center">
    <a href="https://www.npmjs.com/package/fictoan-react">
        <img src="https://img.shields.io/npm/v/fictoan-react"/>
    </a>
    <a href="https://www.npmjs.com/package/fictoan-react">
        <img src="https://img.shields.io/bundlephobia/min/fictoan-react"/>
    </a>
    <a href="LICENSE">
        <img src="https://img.shields.io/github/license/fictoan/fictoan-react"/>
    </a>
</p>

---

## What makes Fictoan different

- **No cryptic class names** — Semantic props like `bgColour` and `marginBottom`, not abbreviated utility classes to memorise.
- **No runtime CSS** — Pure CSS variables. No style injection, no hydration mismatch, no flash of unstyled content.
- **No assembly required** — Components are styled and ready to use. No building your own design system from primitives.
- **No copy-paste to maintain** — An actual library with updates. You don't own (and maintain) hundreds of component files.

---

## See the difference

A simple card — same output, different syntax:

```jsx
// Utility classes
<div className="bg-white rounded-lg shadow-md p-4 mb-4 border border-slate-200">
    <h4 className="text-xl font-semibold text-slate-800 mb-2">
        Card title
    </h4>
    <p className="text-slate-600">
        Card content goes here
    </p>
</div>

// Fictoan
<Card
    shape="rounded" shadow="soft" padding="small"
    bgColour="white" borderColour="slate-light20"
    marginBottom="small"
>
    <Heading4 textColour="slate" weight="600" marginBottom="nano">
        Card title
    </Heading4>
    <Text textColour="slate-light40">
        Card content goes here
    </Text>
</Card>
```

---

## Getting started

1. Add Fictoan to your project:
```bash
pnpm add fictoan-react
# or
npm install fictoan-react
```

2. Import and use components:
```jsx
import { Card, Text, Heading4 } from "fictoan-react";

export const MyComponent = () => {
    return (
        <Card shape="rounded" padding="medium" bgColour="white" shadow="soft">
            <Heading4 weight="600" marginBottom="nano">
                Simple, intuitive syntax
            </Heading4>
            <Text textColour="slate-light40">
                Props that make sense at first glance
            </Text>
        </Card>
    );
}
```

---

## Ship faster

- **Props that make sense** — `bgColour`, `shadow`, `shape`, `marginBottom`, `weight` — no documentation diving required.
- **Rapid iteration** — Change properties as easily as you would in a design tool.
- **Accessible by default** — Components ship with proper ARIA attributes and keyboard navigation.

## Ship lighter

- **~14kb gzipped** — [Check the bundle size](https://bundlephobia.com/package/fictoan-react) with zero dependencies.
- **Pure CSS** — No runtime overhead, no JS-based styling.
- **One theme file** — ~500 CSS variables to control every aspect of the UI.

---

## Documentation

Read our [documentation](https://fictoan.io) to explore:
- Component library and props
- Theming and customisation with ~500 CSS variables
- Guides and examples

---

## Community and support

- [GitHub Issues](https://github.com/fictoan/fictoan-react/issues) for bugs and feature requests
- [Discussions](https://github.com/fictoan/fictoan-react/discussions) for questions and community interaction

---

## License

[MIT License](LICENSE)

---

<h4 align="center">
Good tools don't gatekeep. They invite everyone in.
</h4>


---

# Fictoan Turborepo

A simple monorepo setup for Fictoan React component library and documentation site.

## What's included

- `packages/fictoan-react`: The Fictoan React component library
- `packages/fictoan-docs`: The documentation site for Fictoan

## Development workflow

This monorepo is set up with a minimal, no-frills workflow for developing the Fictoan component library and documentation together.

### Commands

- `pnpm dev` - Run the documentation site on localhost
- `pnpm rebuild` - Build the component library and update it in the docs site automatically

### Getting started

1. Clone this repository
2. Run `pnpm install` at the root
3. Run `pnpm dev` to start developing

### Working on the component library

When making changes to the component library:

1. Make your changes in `packages/fictoan-react`
2. Run `pnpm rebuild` to build the library and copy the files to the docs site
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
