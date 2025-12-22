# Fictoan props configurator system

Fictoan documentation uses a props configuration system to create consistent and interactive component examples with minimal code duplication.

## Overview

The props configurator system consists of two main parts:

1. **MasterPropsConfig** - A centralised configuration that defines all available props for components, their types, 
   and default values
2. **PropsConfigurator** - A utility function that generates UI controls and code samples for component props

This system allows for:
- Consistent props definition across components
- Interactive component examples with live code generation
- Reduced code duplication
- Centralized management of component prop options

## How it works

### 1. Master props configuration

The `masterPropsConfig.js`[packages/fictoan-docs/src/utils/masterPropsConfig.js] file defines all available props for Fictoan components:

- Each prop has a defined type (boolean, text, select, size, spacing, etc.)
- Predefined options for props like size, spacing, and emphasis
- Component-specific defaults and variations
- Organized by prop categories (spacing, shape, color, etc.)

Example prop definition:
```jsonc
{
    // TEXT PROPS
    strings: {
        type: "text",
        default: {
            label : "Text",
            value : "Placeholder",
        },
        // Component-specific customizations
        Badge: {
            label : "Content",
            value : "Badge",
        },
        Button: {
            label : "Label",
            value : "Button",
        },
    },
    
    // BOOLEAN PROPS
    isFullWidth: {
        type  : "boolean",
        label : "Full width",
    },
    
    // SELECT PROPS
    bgColour: {
        type          : "select",
        label         : "Background colour",
        defaultOption : "Select colour"
    }
}
```

### 2. Props configurator

The `propsConfigurator.js`[packages/fictoan-docs/src/utils/propsConfigurator.js] file creates a function called `createPropsConfigurator` that:

1. Initialises state for the selected props
2. Generates UI controls for each prop type
3. Creates a live JSX code sample based on the selected props
4. Returns the configurator UI component and the current prop values

## Usage

To implement this for a component page:

```jsx
// Import the configurator creator
import { createPropsConfigurator } from "$utils/propsConfigurator";
import { colourOptions } from "../../colour/colours";

// Inside your component
const {
    propsConfigurator,
    componentProps: propsConfig,
} = createPropsConfigurator(
    "Drawer",                           // Component name
    [                                   // List of props to configure
        "strings", 
        "position", 
        "size", 
        "padding",
        "bgColour",
        "borderColour",
        "showOverlay",
        "isDismissible",
        "closeOnClickOutside"
    ],
    colourOptions,                      // Color options for select inputs
    {                                   // Component configuration
        isSelfClosing: false,
        canHaveChildren: true,
        defaultChildren: "Content goes here"
    }
);

// Use in your JSX
<Drawer
    id="interactive-component"
    ref={interactiveElementRef}
    {...propsConfig}                  // Apply all configured props
>
    {propsConfig.content}             // Access content from props
</Drawer>

// Display the configurator UI
{propsConfigurator()}
```

## Benefits

1. **Consistency**: All components use the same prop configuration system
2. **Reduced duplication**: Common props are defined once, reused everywhere
3. **Maintainability**: Changing a prop's options or behavior requires updates in one place
4. **Interactive documentation**: Users can experiment with component props and see live code samples

## Implementation notes

- The system automatically handles different prop types with appropriate UI controls
- Boolean props are rendered as checkboxes
- Select props (like colors) use dropdown selects
- Size, spacing, etc. use radio tab groups
- Text props use input fields
- The system automatically generates the appropriate JSX code based on selected props
