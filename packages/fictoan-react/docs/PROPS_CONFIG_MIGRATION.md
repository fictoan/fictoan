# Props configuration for component documentation

This guide describes the manual approach for creating interactive component documentation pages.

## Overview

Each component docs page uses direct state management with Fictoan components. This approach prioritises flexibility over abstraction, allowing custom interactions where needed.

## Structure

```tsx
"use client";

import React, { useState, useMemo } from "react";
import { Div, Heading6, Text, Divider, CodeBlock, TextArea, Checkbox } from "fictoan-react";
import { ComponentDocsLayout } from "../ComponentDocsLayout";

const ComponentDocs = () => {
    // 1. State for each configurable prop
    const [propA, setPropA] = useState("default value");
    const [propB, setPropB] = useState(false);

    // 2. Code generation
    const codeString = useMemo(() => {
        const props = [];
        if (propA) props.push(`    propA="${propA}"`);
        if (propB) props.push(`    propB`);

        return `<Component\n${props.join("\n")}\n/>`;
    }, [propA, propB]);

    return (
        <ComponentDocsLayout>
            {/* Intro header */}
            <Div id="intro-header">
                <Heading6 id="component-name">Component</Heading6>
                <Text id="component-description" weight="400">
                    A brief description of the component.
                </Text>
            </Div>

            {/* Intro notes (optional) */}
            <Div id="intro-notes">
                <Divider kind="tertiary" verticalMargin="micro" />
                <Text>Usage notes and guidelines.</Text>
            </Div>

            {/* Demo component */}
            <Div id="demo-component">
                <Component propA={propA} propB={propB} />
            </Div>

            {/* Props configuration */}
            <Div id="props-config">
                <CodeBlock language="tsx" withSyntaxHighlighting showCopyButton>
                    {codeString}
                </CodeBlock>

                <TextArea
                    label="propA"
                    value={propA}
                    onChange={(value) => setPropA(value)}
                    helpText="Description of propA."
                />

                <Checkbox
                    id="prop-propB"
                    label="propB"
                    checked={propB}
                    onChange={(checked) => setPropB(checked)}
                    helpText="Description of propB."
                />
            </Div>

            {/* Theme configuration */}
            <Div id="theme-config">
                <Text>Theme configuration content.</Text>
            </Div>
        </ComponentDocsLayout>
    );
};

export default ComponentDocs;
```

## Key points

1. **Use `useState` for each prop** — gives full control over state management
2. **Use `useMemo` for code generation** — recalculates only when props change
3. **Use Fictoan components directly** — no wrapper components needed
4. **Use `ComponentDocsLayout`** — provides consistent page structure with tabs

## Control mapping

| Prop type | Fictoan component |
|-----------|-------------------|
| String | `InputField` or `TextArea` |
| Boolean | `Checkbox` |
| Enum (few options) | `RadioTabGroup` |
| Enum (many options) | `Select` or `ListBox` |
| Number | `InputField` with `type="number"` or `Range` |

## Custom interactions

For components needing special behaviour (e.g., mode switching, grouped demos), add custom state and controls:

```tsx
const [mode, setMode] = useState<"single" | "group">("single");
const [variant, setVariant] = useState<"checkbox" | "switch">("checkbox");

// Custom code generation based on mode
const codeString = useMemo(() => {
    if (mode === "group") {
        return generateGroupCode(variant, props);
    }
    return generateSingleCode(variant, props);
}, [mode, variant, props]);
```

## Notes

- The `ComponentDocsLayout` extracts content by `id` attribute and renders it in the appropriate sections
- All tab contents are rendered but inactive tabs are hidden (preserves component state)
- For props that accept `ReactNode`, use `TextArea` with a note that it accepts React nodes
