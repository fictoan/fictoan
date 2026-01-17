# Fictoan Component Library Skill

## Description
Help create, modify, and maintain Fictoan UI components following the library's established patterns and conventions.

---

## Project Structure

```
fictoan-turborepo/
├── packages/
│   ├── fictoan-react/        # Core component library
│   │   ├── src/
│   │   │   ├── components/   # 50+ components (each in own folder)
│   │   │   ├── hooks/        # Custom hooks (useClickOutside, etc.)
│   │   │   ├── styles/       # Global CSS & theme variables
│   │   │   ├── utils/        # Utility functions
│   │   │   ├── types/        # Shared TypeScript types
│   │   │   └── index.tsx     # Main export file
│   │   └── package.json
│   └── fictoan-docs/         # Next.js documentation site
└── package.json              # Root workspace config
```

---

## Component File Structure

Every component MUST follow this exact structure:

```
ComponentName/
├── ComponentName.tsx    # Main component implementation
├── componentname.css    # Scoped CSS (lowercase, using data attributes)
└── index.tsx            # Export barrel file
```

---

## Component Implementation Pattern

Follow this exact pattern when creating components:

```tsx
// 1. IMPORTS - Organized by category
import React from "react";

// Core imports
import { Element } from "$element";

// Local imports (types, constants)
import { CommonAndHTMLProps, SpacingTypes, ShapeTypes } from "../Element/constants";

// Styles
import "./componentname.css";

// 2. TYPE DEFINITIONS
export interface ComponentNameCustomProps {
    // Component-specific props only
    variant?: "primary" | "secondary";
    size?: SpacingTypes;
    isLoading?: boolean;
}

export type ComponentNameElementType = HTMLDivElement; // or appropriate HTML element

export type ComponentNameProps =
    Omit<CommonAndHTMLProps<ComponentNameElementType>, keyof ComponentNameCustomProps>
    & ComponentNameCustomProps;

// 3. COMPONENT with forwardRef
export const ComponentName = React.forwardRef(
    (
        {
            variant = "primary",
            size = "medium",
            isLoading,
            ...props
        }: ComponentNameProps,
        ref: React.Ref<ComponentNameElementType>
    ) => {
        // Build classNames array
        let classNames: string[] = [];

        if (variant) classNames.push(variant);
        if (size) classNames.push(`size-${size}`);
        if (isLoading) classNames.push("is-loading");

        return (
            <Element<ComponentNameElementType>
                as="div"
                data-component-name
                ref={ref}
                classNames={classNames}
                aria-busy={isLoading}
                {...props}
            />
        );
    }
);

// 4. DISPLAY NAME - Required for debugging
ComponentName.displayName = "ComponentName";
```

---

## Export Pattern

**index.tsx (barrel file):**
```tsx
export { ComponentName, type ComponentNameProps } from "./ComponentName";
```

**Main index.tsx (add to src/index.tsx):**
```tsx
export { ComponentName, type ComponentNameProps } from "./components/ComponentName";
```

---

## CSS Styling Pattern

**Technology:** Pure CSS with PostCSS (NO styled-components, NO CSS-in-JS)

**Scoping:** Use data attributes for component scoping:

```css
/* componentname.css */
[data-component-name] {
    /* Base styles */
    position: relative;
    font-family: var(--component-font, sans-serif);
    transition: all 0.2s ease-in-out;
}

/* Variants */
[data-component-name].primary {
    background-color: var(--component-primary-bg);
    color: var(--component-primary-text);
}

[data-component-name].secondary {
    background-color: var(--component-secondary-bg);
    color: var(--component-secondary-text);
}

/* Sizes */
[data-component-name].size-small {
    padding: var(--spacing-small);
}

[data-component-name].size-medium {
    padding: var(--spacing-medium);
}

[data-component-name].size-large {
    padding: var(--spacing-large);
}

/* States */
[data-component-name].is-loading {
    opacity: 0.7;
    pointer-events: none;
}

/* Nested elements */
[data-component-name] .inner-element {
    /* Nested styles */
}
```

---

## Props Naming Conventions

**CRITICAL: Use plain English, semantic names - NO abbreviations**

| Correct | Incorrect |
|---------|-----------|
| `marginBottom` | `mb` |
| `paddingLeft` | `pl` |
| `bgColour` / `bgColor` | `bg` |
| `horizontallyCentre` | `hCenter` |
| `isLoading` | `loading` |
| `isDisabled` | `disabled` (unless HTML native) |

**Supported Spellings:** Both US and UK spellings are supported:
- `bgColour` / `bgColor`
- `textColour` / `textColor`
- `horizontallyCentre` / `horizontallyCenter`

---

## Common Props Types

Use these established types from `Element/constants`:

```typescript
// Spacing
type SpacingTypes = "none" | "nano" | "micro" | "tiny" | "small" | "medium" | "large" | "huge";

// Shapes
type ShapeTypes = "rounded" | "curved" | "circular";

// Emphasis/Kind
type EmphasisTypes = "primary" | "secondary" | "tertiary" | "custom";

// Layout
type LayoutAsFlexbox = boolean;
type StackVertically = boolean;
type Gap = SpacingTypes;
```

---

## Accessibility Requirements

**MANDATORY for all components:**

```tsx
// Required ARIA attributes based on component type
<Element
    as="button"
    aria-label={label}
    aria-disabled={disabled || isLoading}
    aria-busy={isLoading}
    role="button"  // if not implicit
    tabIndex={0}   // if interactive
    {...props}
/>

// For dialogs/modals
<Element
    as="dialog"
    role="dialog"
    aria-modal="true"
    aria-label={label || "Modal dialog"}
    aria-describedby={descriptionId}
/>

// For expandable content
<Element
    as="details"
    role="region"
    aria-labelledby="summary-id"
>
    <summary aria-expanded={isOpen} aria-controls="content-id">
        {summary}
    </summary>
</Element>

// Screen reader only text
<span className="sr-only">{screenReaderText}</span>
```

---

## Form Components Pattern

Form components require special prop separation:

```tsx
import { separateWrapperProps } from "$utils/propSeparation";

export const FormComponent = React.forwardRef((props, ref) => {
    // Separate layout props (for wrapper) from input props
    const { wrapperProps, inputProps } = separateWrapperProps(props);

    return (
        <FormItem {...wrapperProps}>
            <Element
                as="input"
                ref={ref}
                {...inputProps}
            />
        </FormItem>
    );
});
```

---

## Context Provider Pattern

For components with global state:

```tsx
// 1. Create context
const ComponentContext = createContext<ComponentContextType | undefined>(undefined);

// 2. Create provider
export const ComponentProvider = ({ children, ...config }: ProviderProps) => {
    const [state, setState] = useState(initialState);

    const actions = useMemo(() => ({
        doSomething: (value) => setState(prev => [...prev, value]),
    }), []);

    return (
        <ComponentContext.Provider value={{ state, ...actions }}>
            {children}
            <ComponentContainer>
                {/* Render managed items */}
            </ComponentContainer>
        </ComponentContext.Provider>
    );
};

// 3. Create hook with error boundary
export const useComponent = () => {
    const context = useContext(ComponentContext);
    if (!context) {
        throw new Error("useComponent must be used within a ComponentProvider");
    }
    return context;
};
```

---

## TypeScript Path Aliases

Use these aliases in imports:

```typescript
import { Element } from "$element";
import { CommonProps } from "$components/Element/constants";
import { useClickOutside } from "$hooks/useClickOutside";
import { separateWrapperProps } from "$utils/propSeparation";
```

---

## Import Order Convention

Organize imports in this order:

```typescript
// 1. React
import React, { useState, useEffect } from "react";

// 2. External libraries (if any)

// 3. Core Fictoan imports
import { Element } from "$element";

// 4. Local component imports
import { CommonAndHTMLProps } from "../Element/constants";

// 5. Utilities and hooks
import { separateWrapperProps } from "$utils/propSeparation";

// 6. Styles (LAST)
import "./componentname.css";
```

---

## Design Token System

**Colors:** OKLCH-based with 36 colors, each with 10 shades + opacity variants

**Spacing Scale:**
- `none`: 0
- `nano`: 4px
- `micro`: 8px
- `tiny`: 12px
- `small`: 16px
- `medium`: 24px
- `large`: 32px
- `huge`: 48px

**Use CSS variables:**
```css
var(--spacing-small)
var(--button-primary-bg-default)
var(--global-border-radius)
```

---

## Checklist for New Components

- [ ] Component file: `ComponentName.tsx`
- [ ] CSS file: `componentname.css` (lowercase)
- [ ] Barrel export: `index.tsx`
- [ ] Uses `React.forwardRef`
- [ ] Has `displayName` set
- [ ] Uses `Element` wrapper with `data-*` attribute
- [ ] Props extend `CommonAndHTMLProps<ElementType>`
- [ ] Custom props defined with `ComponentNameCustomProps` interface
- [ ] Uses `Omit` pattern for type composition
- [ ] Includes appropriate ARIA attributes
- [ ] Styles use CSS variables for theming
- [ ] Added to main `src/index.tsx` exports
- [ ] Plain English prop names (no abbreviations)

---

## Key Files Reference

- **Base Element:** `src/components/Element/Element.tsx`
- **Common Props:** `src/components/Element/constants.ts`
- **Prop Separation:** `src/utils/propSeparation.ts`
- **Theme Variables:** `src/styles/theme.css`
- **Color Definitions:** `src/styles/colours.ts`
- **Main Exports:** `src/index.tsx`

---

## Examples to Reference

- **Simple Component:** `src/components/Button/Button.tsx`
- **Form Component:** `src/components/Form/InputField/InputField.tsx`
- **Context Provider:** `src/components/Notification/NotificationsProvider/`
- **Composite Component:** `src/components/Sidebar/`
- **Modal/Dialog:** `src/components/Modal/Modal.tsx`
