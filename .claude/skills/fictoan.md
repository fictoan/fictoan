# Fictoan Component Library Skill

## Description
Help create UIs using Fictoan, and contribute to the Fictoan component library itself.

---

# PART 1: USING FICTOAN (Consumer Guide)

This section covers how to use Fictoan in your projects.

---

## Installation & Setup

### 1. Install the package
```bash
pnpm add fictoan-react
# or
yarn add fictoan-react
# or
npm install fictoan-react
```

### 2. Import CSS (required, do this once in your app entry)
```css
/* globals.css or your main CSS file */
@import "fictoan-react/dist/index.css";

/* Then import your theme files */
@import "./theme-light.css";
@import "./theme-dark.css";
```

### 3. Setup ThemeProvider (root layout)
```tsx
"use client";

import { ThemeProvider } from "fictoan-react";
import "@styles/globals.css";

export const RootLayoutClient = ({ children }: { children: ReactNode }) => {
    const listOfThemes = ["theme-light", "theme-dark"];

    return (
        <html lang="en">
        <body>
            <ThemeProvider
                themeList={listOfThemes}
                currentTheme="theme-light"
            >
                {children}
            </ThemeProvider>
        </body>
        </html>
    );
};
```

---

## Layout System (Row & Portion)

Fictoan uses a **24-column grid system** with `Row` and `Portion` components.

### Basic Layout
```tsx
import { Row, Portion, Article, Section } from "fictoan-react";

<Article id="my-page" verticalPadding="tiny">
    <Section>
        <Row horizontalPadding="large" marginBottom="small">
            <Portion desktopSpan="two-third">
                <Heading4>Main Content</Heading4>
            </Portion>
            <Portion desktopSpan="one-third">
                <Card>Sidebar</Card>
            </Portion>
        </Row>
    </Section>
</Article>
```

### Portion Span Values
| Value | Columns | Percentage |
|-------|---------|------------|
| `"one-fourth"` | 6 | 25% |
| `"one-third"` | 8 | 33.3% |
| `"half"` | 12 | 50% |
| `"two-third"` | 16 | 66.6% |
| `"three-fourth"` | 18 | 75% |
| `"1"` to `"24"` | 1-24 | 4.16%-100% |

### Responsive Breakpoints
```tsx
<Portion
    desktopSpan="one-fourth"        // > 1200px
    tabletLandscapeSpan="one-third" // 901-1200px
    tabletPortraitSpan="half"       // 601-900px
    mobileSpan="24"                 // < 600px (full width)
>
    Content
</Portion>
```

### Row Props
```tsx
<Row
    layout="grid"                    // "grid" (default) or "flexbox"
    horizontalPadding="large"        // Padding on sides
    gutters="small"                  // Gap between Portions
    marginBottom="small"             // Bottom margin
    retainLayoutAlways               // Don't collapse on mobile
    retainLayoutOnMobile             // Keep layout on mobile only
/>
```

---

## Page Structure Pattern

Standard page structure used in production apps:

```tsx
"use client";

import {
    Article, Section, Row, Portion,
    Heading4, Heading6, Text, Card, Divider
} from "fictoan-react";
import "./page.css";

const MyPage = () => {
    return (
        <Article id="my-page" verticalPadding="tiny">
            {/* HEADER SECTION */}
            <Section>
                <Row horizontalPadding="large" marginBottom="small">
                    <Portion desktopSpan="two-third">
                        <Heading4 weight="900" marginBottom="nano">Page Title</Heading4>
                        <Heading6 weight="400" opacity="60">
                            Page description or subtitle
                        </Heading6>
                    </Portion>
                </Row>
            </Section>

            {/* STATS/CARDS SECTION */}
            <Section>
                <Row horizontalPadding="large" marginBottom="none">
                    <Portion desktopSpan="one-fourth">
                        <Card padding="micro" shape="rounded">
                            <Text>Stat 1</Text>
                        </Card>
                    </Portion>
                    <Portion desktopSpan="one-fourth">
                        <Card padding="micro" shape="rounded">
                            <Text>Stat 2</Text>
                        </Card>
                    </Portion>
                </Row>
            </Section>

            <Divider kind="tertiary" horizontalMargin="large" verticalMargin="micro" />

            {/* MAIN CONTENT SECTION */}
            <Section>
                <Row horizontalPadding="large">
                    <Portion>
                        {/* Full-width content */}
                    </Portion>
                </Row>
            </Section>
        </Article>
    );
};

export default MyPage;
```

### Page-Scoped CSS
```css
/* page.css - Scoped to this page only */
#my-page {
    .custom-element {
        /* styles */
    }

    [data-card] {
        /* override card styles for this page */
    }
}
```

---

## Spacing Values

Consistent across all components:

| Value | Size |
|-------|------|
| `"none"` | 0 |
| `"nano"` | 8px |
| `"micro"` | 16px |
| `"tiny"` | 24px |
| `"small"` | 32px |
| `"medium"` | 48px |
| `"large"` | 64px |
| `"huge"` | 96px |

**Usage:**
```tsx
<Card padding="micro" marginBottom="small" />
<Row horizontalPadding="large" gutters="small" />
<InputField marginBottom="nano" />
```

---

## Form Components

### Complete Form Example
```tsx
import {
    Form, InputField, Select, ListBox,
    Button, Card, Text
} from "fictoan-react";

const MyForm = () => {
    const [formData, setFormData] = useState({
        email: "",
        name: "",
        role: "user",
        org_id: "",
    });
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // Submit logic
    };

    return (
        <Form onSubmit={handleSubmit} isFullWidth>
            <InputField
                label="Email"
                type="email"
                placeholder="user@example.com"
                value={formData.email}
                onChange={(value: string) =>
                    setFormData(prev => ({ ...prev, email: value }))
                }
                required
                marginBottom="nano"
            />

            <InputField
                label="Name"
                type="text"
                placeholder="Full name"
                value={formData.name}
                onChange={(value: string) =>
                    setFormData(prev => ({ ...prev, name: value }))
                }
                required
                marginBottom="nano"
            />

            <ListBox
                label="Organisation"
                value={formData.org_id}
                onChange={(value: string | string[]) => {
                    const selectedValue = Array.isArray(value) ? value[0] : value;
                    setFormData(prev => ({ ...prev, org_id: selectedValue || "" }));
                }}
                options={organisations.map(org => ({
                    label: org.name,
                    value: org.id,
                }))}
                placeholder="Search organisations..."
                isFullWidth
                marginBottom="nano"
            />

            <Select
                label="Role"
                value={formData.role}
                onChange={(value: string) =>
                    setFormData(prev => ({ ...prev, role: value }))
                }
                options={[
                    { label: "User", value: "user" },
                    { label: "Admin", value: "admin" },
                ]}
                isFullWidth
                marginBottom="micro"
            />

            <Button
                type="submit"
                kind="primary"
                isFullWidth
                disabled={isLoading || !formData.email}
            >
                {isLoading ? "Submitting..." : "Submit"}
            </Button>

            {/* SUCCESS FEEDBACK */}
            {success && (
                <Card
                    bgColour="green-light60"
                    borderColour="green"
                    padding="nano"
                    marginTop="micro"
                    shape="rounded"
                >
                    <Text size="small" textColour="green">
                        Success! Form submitted.
                    </Text>
                </Card>
            )}

            {/* ERROR FEEDBACK */}
            {error && (
                <Card
                    bgColour="red-light60"
                    borderColour="red"
                    padding="nano"
                    marginTop="nano"
                    shape="rounded"
                >
                    <Text size="small" textColour="red">
                        {error}
                    </Text>
                </Card>
            )}
        </Form>
    );
};
```

### Form Event Handlers
```tsx
// InputField, TextArea - receives value directly
<InputField
    onChange={(value: string) => setFormData(prev => ({ ...prev, field: value }))}
/>

// Select - receives value directly
<Select
    onChange={(value: string) => setFormData(prev => ({ ...prev, field: value }))}
/>

// ListBox - can receive string or string[] (for multi-select)
<ListBox
    onChange={(value: string | string[]) => {
        const selectedValue = Array.isArray(value) ? value[0] : value;
        setFormData(prev => ({ ...prev, field: selectedValue }));
    }}
/>

// CheckboxGroup - receives array of values
<CheckboxGroup
    onChange={(values: string[]) => setFormData(prev => ({ ...prev, field: values }))}
/>

// Range - receives number
<Range
    onChange={(value: number) => setFormData(prev => ({ ...prev, field: value }))}
/>
```

---

## Drawer Component

### Setup and Usage
```tsx
import { Drawer, showDrawer, Button } from "fictoan-react";

const MyComponent = () => {
    return (
        <>
            {/* Trigger button */}
            <Button onClick={() => showDrawer("my-drawer")}>
                Open Drawer
            </Button>

            {/* Drawer component */}
            <Drawer
                id="my-drawer"
                size="medium"           // "small" | "medium" | "large"
                padding="micro"
                isDismissible           // Can be closed by clicking outside
                showOverlay             // Shows dark overlay behind
            >
                <Heading6 marginBottom="micro">Drawer Title</Heading6>

                <Form onSubmit={handleSubmit}>
                    {/* Form content */}
                </Form>
            </Drawer>
        </>
    );
};
```

---

## Theming

### Theme File Structure
```css
/* theme-light.css */
.theme-light {
    /* Body */
    --body-bg: var(--white);

    /* Buttons */
    --button-primary-bg-default: var(--blue);
    --button-primary-bg-hover: var(--blue-dark10);
    --button-primary-text-default: var(--white);

    --button-secondary-bg-default: var(--blue-light70);
    --button-secondary-text-default: var(--blue);
    --button-secondary-border-default: var(--blue);

    /* Card */
    --card-bg: var(--white);
    --card-border: var(--grey-light60);
    --card-border-radius: 12px;

    /* Input */
    --input-bg-default: var(--grey-light90);
    --input-border-default: var(--grey-light90);
    --input-bg-focus: var(--white);

    /* Table */
    --table-striped-header-bg: var(--grey-light80);
    --table-border: var(--grey-light60);
}
```

### Custom Brand Colors
```css
/* brand-colours.css */
:root {
    --brand-primary: 262, 82%, 52%;     /* HSL values */
    --brand-secondary: 38, 81%, 57%;
}

.theme-light {
    --button-primary-bg-default: hsl(var(--brand-primary));
}
```

### Theme Switching
```tsx
import { useTheme } from "fictoan-react";

const ThemeSwitcher = () => {
    const [theme, setTheme] = useTheme();

    return (
        <Button onClick={() => setTheme(theme === "theme-light" ? "theme-dark" : "theme-light")}>
            Toggle Theme
        </Button>
    );
};
```

---

## Common Component Props

All Fictoan components accept these common props:

```tsx
<Card
    // Colors
    bgColour="slate-light90"
    textColour="slate"
    borderColour="slate-light60"

    // Spacing
    padding="micro"
    margin="small"
    marginTop="nano"
    marginBottom="small"
    horizontalPadding="large"
    verticalPadding="small"

    // Layout
    isFullWidth
    isFullHeight
    layoutAsFlexbox
    stackVertically
    gap="small"

    // Alignment
    horizontallyCentreThis
    verticallyCentreItems
    pushItemsToEnds

    // Visual
    shape="rounded"         // "rounded" | "curved"
    shadow="soft"           // "none" | "mild" | "soft" | "hard"
    opacity="80"

    // Responsive
    hideOnMobile
    showOnlyOnDesktop

    // Typography
    weight="600"
/>
```

---

## Color Props

### Format
```tsx
// Base color
bgColour="red"

// With shade (dark/light + 10-90)
bgColour="red-light40"
bgColour="red-dark20"

// With opacity (0-90)
bgColour="red-opacity50"

// Combined
bgColour="red-light40-opacity50"

// Basic colors
bgColour="white"
bgColour="black"
bgColour="transparent"
```

### Available Colors
`pink`, `rose`, `crimson`, `red`, `salmon`, `sienna`, `orange`, `amber`, `gold`, `yellow`, `lime`, `chartreuse`, `spring`, `pistachio`, `sage`, `green`, `emerald`, `jade`, `teal`, `cyan`, `aqua`, `azure`, `sky`, `cerulean`, `cobalt`, `navy`, `blue`, `royal`, `indigo`, `iris`, `violet`, `plum`, `purple`, `magenta`, `fuchsia`, `cerise`, `slate`, `grey`, `brown`

---

## Typography

```tsx
import { Heading1, Heading2, Heading3, Heading4, Heading5, Heading6, Text } from "fictoan-react";

<Heading4 weight="900" marginBottom="nano">Title</Heading4>
<Heading6 weight="400" opacity="60">Subtitle</Heading6>
<Text size="small" textColour="slate">Body text</Text>
```

---

## Semantic Elements

Use semantic HTML elements with Fictoan props:

```tsx
import { Article, Section, Header, Footer, Main, Nav, Aside, Div, Span } from "fictoan-react";

<Article id="page-name" verticalPadding="tiny">
    <Header marginBottom="small">
        <Heading4>Title</Heading4>
    </Header>

    <Section marginBottom="medium">
        <Row>...</Row>
    </Section>

    <Footer pushItemsToEnds>
        <Button>Cancel</Button>
        <Button kind="primary">Save</Button>
    </Footer>
</Article>
```

---

## Project File Structure (Recommended)

```
src/
├── app/
│   ├── layout.tsx              # Server component (metadata)
│   ├── layout.client.tsx       # Client component (ThemeProvider)
│   ├── page.tsx                # Server component
│   ├── (auth)/                 # Route group
│   │   ├── layout.tsx          # Nested layout
│   │   ├── dashboard/
│   │   │   ├── page.tsx
│   │   │   ├── page.client.tsx
│   │   │   └── dashboard.css
│   │   └── settings/
│   │       └── ...
├── components/
│   ├── Navigation/
│   ├── Forms/
│   └── shared/
├── styles/
│   ├── globals.css             # Import Fictoan + themes
│   ├── theme-light.css
│   ├── theme-dark.css
│   └── brand-colours.css       # Custom brand colors
└── ...
```

---

## Common Patterns

### Loading State
```tsx
import { Spinner, Div, Article } from "fictoan-react";

if (isLoading) {
    return (
        <Article>
            <Div verticallyCentreItems horizontallyCentreThis isFullHeight>
                <Spinner />
            </Div>
        </Article>
    );
}
```

### Error/Success Cards
```tsx
// Error
<Card bgColour="red-light60" borderColour="red" padding="nano" shape="rounded">
    <Text size="small" textColour="red">{errorMessage}</Text>
</Card>

// Success
<Card bgColour="green-light60" borderColour="green" padding="nano" shape="rounded">
    <Text size="small" textColour="green">{successMessage}</Text>
</Card>

// Warning
<Card bgColour="amber-light60" borderColour="amber" padding="nano" shape="rounded">
    <Text size="small" textColour="amber">{warningMessage}</Text>
</Card>
```

### Stats Grid
```tsx
<Row horizontalPadding="micro">
    {stats.map((stat, i) => (
        <Portion desktopSpan="one-fourth" key={i}>
            <Card padding="micro" shape="rounded">
                <Text size="small" opacity="60">{stat.label}</Text>
                <Heading4>{stat.value}</Heading4>
            </Card>
        </Portion>
    ))}
</Row>
```

### Footer with Actions
```tsx
<Footer verticallyCentreItems pushItemsToEnds marginTop="micro">
    <Text size="small" opacity="60">Last updated: {date}</Text>
    <Div layoutAsFlexbox gap="nano">
        <Button kind="tertiary">Cancel</Button>
        <Button kind="primary">Save</Button>
    </Div>
</Footer>
```

---

---

# PART 2: CONTRIBUTING TO FICTOAN (Library Development)

This section covers how Fictoan components are built internally.

---

## Fictoan Source Structure

```
fictoan-turborepo/
├── packages/
│   ├── fictoan-react/           # Core component library
│   │   ├── src/
│   │   │   ├── components/      # 50+ components (each in own folder)
│   │   │   ├── hooks/           # Custom hooks
│   │   │   ├── styles/          # Global CSS & theme variables
│   │   │   ├── utils/           # Utility functions
│   │   │   └── index.tsx        # Main exports
│   │   ├── tsconfig.json
│   │   └── vite.config.ts
│   └── fictoan-docs/            # Documentation site
└── package.json
```

---

## Component File Structure

Every component MUST follow this structure:

```
ComponentName/
├── ComponentName.tsx    # Main component implementation
├── componentname.css    # Scoped CSS (lowercase filename)
└── index.tsx            # Export barrel file
```

---

## TypeScript Path Aliases

```typescript
import { Element } from "$element";
import { Div, Span } from "$tags";
import { CommonAndHTMLProps } from "$components/Element/constants";
import { useClickOutside } from "$hooks/UseClickOutside";
import { separateWrapperProps } from "$utils/propSeparation";
```

---

## Component Implementation Pattern

```tsx
// REACT CORE ==========================================================================================================
import React from "react";

// LOCAL COMPONENTS ====================================================================================================
import { CommonAndHTMLProps, EmphasisTypes, ShapeTypes, SpacingTypes } from "../Element/constants";
import { Element } from "$element";

// STYLES ==============================================================================================================
import "./button.css";

// TYPE DEFINITIONS ////////////////////////////////////////////////////////////////////////////////////////////////////
export interface ButtonCustomProps {
    kind      ? : EmphasisTypes;
    size      ? : SpacingTypes;
    shape     ? : ShapeTypes;
    isLoading ? : boolean;
    label     ? : string;
}

export type ButtonElementType = HTMLButtonElement;
export type ButtonProps = Omit<CommonAndHTMLProps<ButtonElementType>, keyof ButtonCustomProps> & ButtonCustomProps;

// COMPONENT ///////////////////////////////////////////////////////////////////////////////////////////////////////////
export const Button = React.forwardRef(
    ({ size = "medium", shape, kind, isLoading, label, ...props }: ButtonProps, ref: React.Ref<ButtonElementType>) => {
        let classNames = [];

        if (kind) classNames.push(kind);
        if (size) classNames.push(`size-${size}`);
        if (shape) classNames.push(`shape-${shape}`);
        if (isLoading) classNames.push("is-loading");

        return (
            <Element<ButtonElementType>
                as="button"
                data-button
                ref={ref}
                classNames={classNames}
                aria-label={label}
                aria-disabled={props.disabled || isLoading}
                aria-busy={isLoading}
                {...props}
            />
        );
    }
);
Button.displayName = "Button";
```

### Key Patterns:

1. **The Omit Pattern** - Prevents prop conflicts:
   ```typescript
   type Props = Omit<CommonAndHTMLProps<ElementType>, keyof CustomProps> & CustomProps;
   ```

2. **Always use `React.forwardRef`**

3. **Generic type on Element**: `<Element<ButtonElementType> />`

4. **Data attribute for CSS scoping**: `data-button`, `data-card`

5. **Set `displayName`** after component definition

---

## CSS Styling Pattern

**Pure CSS with data attribute scoping:**

```css
[data-button] {
    position: relative;
    cursor: pointer;
    font-family: var(--button-font), sans-serif;
    transition: all 0.2s ease-in-out;
}

[data-button].primary {
    background-color: var(--button-primary-bg-default);
    color: var(--button-primary-text-default);

    &:hover {
        background-color: var(--button-primary-bg-hover);
    }
}

[data-button].size-small { padding: 8px 16px; }
[data-button].size-medium { padding: 12px 24px; }

[data-button].shape-rounded { border-radius: var(--global-border-radius); }
```

---

## Form Components Pattern

Form components use `separateWrapperProps` to split layout props:

```tsx
import { separateWrapperProps } from "$utils/propSeparation";
import { FormItem } from "../FormItem/FormItem";

export const InputField = React.forwardRef((props, ref) => {
    const { label, helpText, errorText, required, size, ...rest } = props;
    const { wrapperProps, inputProps } = separateWrapperProps(rest);

    return (
        <FormItem
            label={label}
            helpText={helpText}
            errorText={errorText}
            required={required}
            size={size}
            {...wrapperProps}
        >
            <Element<HTMLInputElement>
                as="input"
                ref={ref}
                data-input-field
                {...inputProps}
            />
        </FormItem>
    );
});
```

---

## Context Provider Pattern

```tsx
const NotificationsContext = createContext<ContextValue | null>(null);

export const NotificationsProvider = ({ children, ...config }) => {
    const [notifications, setNotifications] = useState([]);

    const notify = useCallback((message) => {
        const id = `notification-${Date.now()}`;
        setNotifications(prev => [...prev, { id, message }]);
    }, []);

    return (
        <NotificationsContext.Provider value={{ notify }}>
            {children}
            <NotificationsWrapper>
                {notifications.map(n => <NotificationItem key={n.id} {...n} />)}
            </NotificationsWrapper>
        </NotificationsContext.Provider>
    );
};

export const useNotifications = () => {
    const context = useContext(NotificationsContext);
    if (!context) {
        throw new Error("useNotifications must be used within NotificationsProvider");
    }
    return context.notify;
};
```

---

## Export Pattern

**Barrel file (index.tsx):**
```tsx
export { Button, type ButtonProps } from "./Button";
```

**Main exports (src/index.tsx):**
```tsx
// CSS imports first
import "./styles/Normalize.css";
import "./styles/theme.css";

// Named exports with types
export { Button, type ButtonProps } from "./components/Button";
```

---

## Checklist for New Components

- [ ] Create folder: `src/components/ComponentName/`
- [ ] Create `ComponentName.tsx`:
  - [ ] `ComponentNameCustomProps` interface
  - [ ] `ComponentNameElementType` type alias
  - [ ] `ComponentNameProps` with Omit pattern
  - [ ] `React.forwardRef` wrapper
  - [ ] `data-component-name` attribute
  - [ ] ARIA attributes for accessibility
  - [ ] `displayName` set
- [ ] Create `componentname.css` (lowercase):
  - [ ] `[data-component-name]` base styles
  - [ ] CSS variables for theming
  - [ ] Variant/size/state classes
- [ ] Create `index.tsx` barrel export
- [ ] Add to `src/index.tsx` exports

---

## Key Files Reference

| File | Purpose |
|------|---------|
| `src/components/Element/Element.tsx` | Base Element wrapper |
| `src/components/Element/constants.ts` | CommonProps, types |
| `src/components/Element/Tags.tsx` | Semantic element factories |
| `src/utils/propSeparation.ts` | Form prop separation |
| `src/styles/theme.css` | CSS variable definitions |
| `src/styles/colours.ts` | OKLCH color definitions |
| `src/index.tsx` | Main exports |

---

## Example Components to Reference

| Component | Pattern | File |
|-----------|---------|------|
| Button | Simple component | `src/components/Button/Button.tsx` |
| Card | With children | `src/components/Card/Card.tsx` |
| Modal | Dialog + popover | `src/components/Modal/Modal.tsx` |
| InputField | Form with prop separation | `src/components/Form/InputField/InputField.tsx` |
| NotificationsProvider | Context provider | `src/components/Notification/NotificationsProvider/` |
