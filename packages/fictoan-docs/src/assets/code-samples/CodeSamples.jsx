// INSTALLATION ================================================================
export const snippetInstallation = `import "fictoan-react/dist/index.css";`;

// FOLDER STRUCTURE ============================================================
export const snippetStructure = `fictoan-boilerplate
├── public
└── src
    ├── app
    │   ├── layout.tsx
    │   ├── page.tsx
    │   │
    │   └── about
    │       ├── page.tsx
    │       └── page-about.css
    │
    ├── components
    │   ├── RootClientSideLayout
    │   │   └── RootClientSideLayout.tsx
    │   │
    │   └── Header
    │       ├── Header.tsx
    │       └── component-header.css
    │
    ├── styles
    │   ├── fonts.css
    │   ├── globals.css
    │   └── theme.css
    │
    └── assets`;


// USAGE ======================================================================
export const snippetPageSetupJSX = `import "./about-page.css";

export const AboutPage = () => {
    return (
        <Article id="about-page">
            {/* Your page content here */>}
        </Element>
    );
}`;

export const snippetPageSetupCSS = `#about-page {
    /* Your page styles here */ 
}`;

// USAGE ======================================================================
export const snippetUsage = `import { Article, Text, Button } from "fictoan-react";
import "./home-page.css";

export const HomePage = () => {
    return (
        <Article id="home-page">
            <Text>Hello, world!</Text>
            
            <Button kind="primary">Click me!</Button>
        </Article>
    );
}`;


// CUSTOM THEME ================================================================
