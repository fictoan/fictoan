# Props Registry

A configuration system for component documentation that provides a Storybook-like experience with full control over prop display and input types.

## Quick Start

```typescript
// accordion/props.registry.ts
import { createPropsRegistry } from "$/lib/props-registry/createPropsRegistry";

export const accordionRegistry = createPropsRegistry({
    component: "Accordion",

    // Props in display order (order of keys = display order)
    props: {
        summary: {
            label        : "Summary",
            control      : "InputField",
            defaultValue : "Click to expand",
            inputProps   : { helpText: "The clickable header text" },
        },
        children: {
            label        : "Content",
            control      : "TextArea",
            defaultValue : "Accordion content goes here.",
        },
        isOpen: {
            label        : "Open by default",
            control      : "Checkbox",
            defaultValue : false,
        },
    },
});
```

```tsx
// accordion/page.client.tsx
import { PropsConfiguratorNew } from "$components/PropsConfigurator/PropsConfiguratorNew";
import { accordionRegistry } from "./props.registry";

const AccordionDocs = () => {
    const [props, setProps] = useState({});

    return (
        <PropsConfiguratorNew
            registry={accordionRegistry}
            onPropsChange={setProps}
        />
    );
};
```

## Registry Structure

```typescript
interface PropsRegistryConfig {
    component: string;                    // Component name
    props: Record<string, PropConfig>;    // Props configuration
    hideInheritedProps?: boolean;         // Hide Element props
}

interface PropConfig {
    label?        : string;               // Display label
    control?      : ControlType;          // Input component to use
    options?      : string[] | PropOption[];  // For ListBox/RadioTabGroup
    defaultValue? : any;                  // Initial value
    hidden?       : boolean;              // Hide from configurator
    inputProps?   : Record<string, any>;  // Pass-through props to input
}
```

## Available Controls

| Control | Use Case | inputProps |
|---------|----------|------------|
| `InputField` | Single-line text | `helpText`, `placeholder`, `disabled`, `required` |
| `TextArea` | Multi-line text | `helpText`, `placeholder`, `rows`, `disabled` |
| `NumberInput` | Numeric values | `helpText`, `min`, `max`, `step` |
| `Checkbox` | Boolean toggle | `helpText`, `disabled` |
| `RadioTabGroup` | Few options (≤5) | `disabled` |
| `ListBox` | Many options (dropdown) | `helpText`, `placeholder`, `disabled` |
| `Range` | Slider | `min`, `max`, `step`, `suffix`, `disabled` |
| `SpacingPicker` | Spacing values | - |
| `ColourPicker` | Colour selection | `placeholder` |
| `CodeBlock` | JSON/complex values | `helpText` |

## Examples

### Text Input with Help Text
```typescript
summary: {
    label        : "Summary",
    control      : "InputField",
    defaultValue : "Click to expand",
    inputProps   : {
        helpText    : "This appears as the clickable header",
        placeholder : "Enter summary text...",
    },
},
```

### Radio Options
```typescript
size: {
    label   : "Size",
    control : "RadioTabGroup",
    options : ["small", "medium", "large"],
    defaultValue: "medium",
},
```

### Options with Custom Labels
```typescript
kind: {
    label   : "Kind",
    control : "RadioTabGroup",
    options : [
        { value: "info", label: "Information" },
        { value: "warning", label: "Warning" },
        { value: "error", label: "Error" },
    ],
    defaultValue: "info",
},
```

### Range Slider
```typescript
opacity: {
    label        : "Opacity",
    control      : "Range",
    defaultValue : 100,
    inputProps   : {
        min    : 0,
        max    : 100,
        step   : 5,
        suffix : "%",
    },
},
```

### Hidden Props
```typescript
onChange: {
    hidden: true,  // Don't show in configurator
},
```

## File Structure

```
src/lib/props-registry/
├── types.ts              # Type definitions
├── createPropsRegistry.ts # Factory function
├── controls/
│   └── index.tsx         # Control components
└── README.md             # This file

src/app/components/
└── accordion/
    ├── page.client.tsx   # Uses PropsConfiguratorNew
    └── props.registry.ts # Registry configuration
```

## Migration from Old System

The old `PropsConfigurator` is still available for components not yet migrated. To migrate:

1. Create `props.registry.ts` alongside the docs page
2. Define all props with their control types and defaults
3. Import `PropsConfiguratorNew` instead of `PropsConfigurator`
4. Pass the registry instead of `componentName`

```diff
- import { PropsConfigurator } from "$components/PropsConfigurator/PropsConfigurator";
+ import { PropsConfiguratorNew } from "$components/PropsConfigurator/PropsConfiguratorNew";
+ import { accordionRegistry } from "./props.registry";

- <PropsConfigurator componentName="Accordion" onPropsChange={setProps} />
+ <PropsConfiguratorNew registry={accordionRegistry} onPropsChange={setProps} />
```
