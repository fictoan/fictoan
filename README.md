<p align="center">
    <a href="https://fictoan.io">
        <picture>
            <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/fictoan/fictoan-react/main/fictoan-logo-dark.svg">
            <source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/fictoan/fictoan-react/main/fictoan-logo.svg">
            <img src="https://raw.githubusercontent.com/fictoan/fictoan-react/main/fictoan-logo.svg" alt="Fictoan" height="80">
        </picture>
    </a>
</p>

<p align="center">
    Make UI code readable again.<br/>
    Props that read like prose. Pure CSS, zero runtime.
</p>

<p align="center">
    <a href="https://www.npmjs.com/package/fictoan-react">
        <img src="https://img.shields.io/npm/v/fictoan-react"/>
    </a>
    <a href="https://www.npmjs.com/package/fictoan-react">
        <img src="https://img.shields.io/bundlephobia/minzip/fictoan-react"/>
    </a>
    <a href="LICENSE">
        <img src="https://img.shields.io/github/license/fictoan/fictoan-react"/>
    </a>
</p>

---

## What makes FictoanUI different

- **No cryptic class names** — Semantic props like `bgColour` and `marginBottom`, not abbreviated utility classes to memorise. And yes, both British and American spellings work.
- **No runtime CSS** — Pure CSS variables. No style injection, no hydration mismatch, no flash of unstyled content.
- **No assembly required** — Components are styled and ready to use. No building your own design system from primitives.
- **No copy-paste to maintain** — An actual library with updates. You don't own (and maintain) hundreds of component files.

**The bonus?** Code this obvious can be read by anyone—including designers. That margin that's 2px off? They can just fix it.

---

## See the difference

A simple card—same output, different syntax:

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

Install Fictoan:
```bash
npm install fictoan-react
# or
pnpm add fictoan-react
# or
yarn add fictoan-react
```

Import and use:
```jsx
import { Card, Text, Heading4 } from "fictoan-react";

export const MyComponent = () => (
    <Card shape="rounded" padding="medium" bgColour="white" shadow="soft">
        <Heading4 weight="600" marginBottom="nano">
            Simple, intuitive syntax
        </Heading4>
        <Text textColour="slate-light40">
            Props that make sense at first glance
        </Text>
    </Card>
);
```

---

## Ship faster

- **Props that make sense** — `bgColour`, `shadow`, `shape`, `marginBottom`, `weight`—no documentation diving required.
- **Rapid iteration** — Change properties as easily as you would in a design tool.
- **Accessible by default** — Components ship with proper ARIA attributes and keyboard navigation.

## Ship lighter

- **~14kb gzipped** — Zero runtime dependencies. [Check the bundle size](https://bundlephobia.com/package/fictoan-react).
- **Pure CSS** — No runtime overhead, no JS-based styling.
- **One theme file** — ~500 CSS variables to control every aspect of the UI.

---

## What's new in v2

- **OKLCH colour system** — 36 perceptually uniform colours with flexible opacity via `bgOpacity` and `borderOpacity` props
- **Simplified APIs** — Modal and Drawer now use declarative `isOpen`/`onClose` props
- **Provider pattern** — Notifications and Toast use context providers for cleaner usage
- **Consistent form handling** — All form components use value-based `onChange`
- **Better DX** — Display names for all 52 components, improved TypeScript support

Read the full [changelog](https://github.com/fictoan/fictoan-react/blob/main/CHANGELOG.md).

---

## Documentation

Explore the full [documentation](https://fictoan.io):
- Component library and props
- Theming and customisation
- [Manifesto](https://fictoan.io/manifesto) — why we built this

---

## Community and support

- [GitHub issues](https://github.com/fictoan/fictoan-react/issues) for bugs and feature requests
- [Discussions](https://github.com/fictoan/fictoan-react/discussions) for questions and community interaction

---

## Licence

[MIT Licence](LICENSE)

---

<h4 align="center">
Good tools don't gatekeep. They invite everyone in.
</h4>

---

# Development (monorepo)

This turborepo contains:
- `packages/fictoan-react` — The component library
- `packages/fictoan-docs` — The documentation site

### Commands

```bash
pnpm install        # Install dependencies
pnpm dev            # Run the docs site locally
pnpm rebuild        # Build the library and update docs
```

### Working on the library

1. Make changes in `packages/fictoan-react`
2. Run `pnpm rebuild` to build and copy files to docs
3. The docs site will reflect your changes
