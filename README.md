<p align="center" style="color: #343a40">
    <a href="https://fictoan.io"><img src="https://raw.githubusercontent.com/fictoan/fictoan-react/main/fictoan-icon.svg" alt="Fictoan Framework" height="150" width="150"></a>
</p>

<h1 align="center">Fictoan</h1>
<p align="center" style="font-size: 1rem;">
    React version of the Fictoan framework<br>
    Fictoan is an intuitive React framework for designers looking to code and rapidly iterate on UI.
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

## Yet another component library? No, sir! 🎨
### What if a designer wrote static UI code, allowing the developer to focus more on integration, performance, deployments etc? Wouldn’t that be a massive time saver?

### We want to blur the lines between a designer and a developer. Read our [Manifesto](https://fictoan.io/manifesto) 🌞

---

## Key features ✨

### For designers
- **Familiar like Figma**: Props mirror properties in your favourite design tool—`bgColour`, `shadow`, `shape`, `marginBottom`, `weight` and so on.
- **Theme to your heart’s content**: Intricate control over every aspect of the UI
- **Iterate like crazy**: Change properties as easily as you would in a design tool
- **For one and all**: Accessible components and elements

### For developers
- **Just your type**: Fully typed, and a clean consistent component API
- **Light as a feather**: ~14kb [gzipped bundle size](https://bundlephobia.com/package/fictoan-react@1.10.4) with no dependencies
- **Bare metal**: Plain CSS styling, no JS bloat
- **Flexible**: Easily extend and customise components
- **Modern Stack**: Built with React 18+ and modern best practices

---

## Getting started 🚀

1. Add Fictoan to your project:
```bash
yarn add fictoan-react
# or
pnpm add fictoan-react
# or
npm install fictoan-react
```

2. Import and use components:
```jsx
import { Card, Badge, Text } from "fictoan-react";

export const MyComponent = () => {
    return (
        <Card
            shape="rounded" padding="medium"
            bgColour="white" borderColor="slate-20"
            shadow="soft"
        >
            <Text size="large" weight="600">
                Simple, intuitive and obvious
            </Text>
            
            <Badge bgColor="blue-light40" textColour="blue">
                A complete no-brainer
            </Badge>
        </Card>
    );
}
```

---

## Write UI code the way you’d speak 🧠
Doesn’t get simpler than this—
```jsx
// Responsive layout
<Row gutters="large" horizontalPadding="small">
    <Portion desktopSpan="one-third" mobileSpan="14">
        <MyComponent />
    </Portion>
</Row>

// A form input
<InputField
    label="Email"
    placeholder="Enter your work email"
    helpText="Must be your primary ID"
    errorText="No such employee"
/>

// A primary button
<Button kind="primary" isFullWidth>
    Click me
</Button>
```
...and so much more.

---

## Core principles 🎯
- **Intuitive props**: Properties that make sense at first glance
- **Consistent patterns**: Similar components share similar prop patterns
- **Design-Developer bridge**: Make hand-off painless as possible
- **Minimal friction**: Get from design to implementation faster

---

## Documentation 📚
Read our [documentation](https://fictoan.io) to:
- Explore the guides, boilerplate and component library
- Check out the extensive theming and customisation ability with ~500 theme variables
- See examples and use cases

---

## Theming 🎨
Fictoan uses CSS variables for theming, with nearly 500 different variables that you can customise. [Check it out](https://github.com/fictoan/fictoan-react/blob/main/src/styles/theme.css)!

---

## Community and support 💬
- [GitHub Issues](https://github.com/fictoan/fictoan-react/issues) for bugs and feature requests
- [Discussions](https://github.com/fictoan/fictoan-react/discussions) for questions and community interaction
- [Twitter](https://twitter.com/fictoan) (Coming soon!) for updates and news

---

## License
Uses a simple [MIT License](LICENSE). Have at it.

---

<h4 align="center">
Built with ♥️ for designers who code and developers who value design.
</h4>


---

# Fictoan Turborepo

A simple monorepo setup for Fictoan React component library and documentation site.

## What’s included

- `packages/fictoan-react`: The Fictoan React component library
- `packages/fictoan-docs`: The documentation site for Fictoan

## Development workflow

This monorepo is set up with a minimal, no-frills workflow for developing the Fictoan component library and documentation together.

### Commands

- `yarn dev` - Run the documentation site on localhost
- `yarn rebuild` - Build the component library and update it in the docs site automatically

### Getting started

1. Clone this repository
2. Run `yarn install` at the root
3. Run `yarn dev` to start developing

### Working on the component library

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
