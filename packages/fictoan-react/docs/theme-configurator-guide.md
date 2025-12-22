# Theme configurator guide

The Theme Configurator extracts CSS variables from theme files or component styles, builds an interactive UI for customising those variables, previews changes in real-time, and generates CSS code that can be copied into your theme files.

## How It Works

The theme configurator works by:

1. Scanning CSS files to identify variables matching a specific component prefix
2. Building interactive controls for each variable type (colours, numerical values)
3. Applying changes to a live preview element in real-time
4. Generating formatted CSS that can be copied to your theme files

## Implementation

### 1. Import the Theme Configurator

```jsx
import { createThemeConfigurator } from "$utils/themeConfigurator";
```

### 2. Add a filter function

This identifies which CSS variables belong to your component:

```jsx
// Filter function that matches variables starting with "badge-"
const BadgeComponent = (varName) => {
    return varName.startsWith("badge-");
};
```

### 3. Initialise the theme configurator

```jsx
const {
    interactiveElementRef,
    componentProps: themeConfig,
    themeConfigurator,
} = createThemeConfigurator("Badge", BadgeComponent);
```

The function returns:
- `interactiveElementRef`: A ref to attach to your demo component
- `componentProps`: Props to apply to your demo component
- `themeConfigurator`: A function that renders the theme configuration UI
- `componentVariables`: An object containing the extracted CSS variables
- `handleVariableChange`: A function to handle variable changes

### 4. Attach to your demo component

```jsx
<Badge
    id="interactive-component"
    ref={interactiveElementRef}
    {...themeConfig}
>
    Badge content
</Badge>
```

Notes:
- The `id="interactive-component"` is required for the theme configurator to work
- The `ref={interactiveElementRef}` connects the demo element to the configurator

### 5. Render the theme configurator UI

```jsx
<Div>
    {themeConfigurator()}
</Div>
```

## CSS Variable Types

The Theme Configurator detects and creates appropriate controls for:

1. **Colour variables** - Creates colour pickers for CSS variables referencing colours
   - Example: `--button-bg: var(--blue-60);`

2. **Numerical variables** - Creates sliders for variables with numeric values
   - Example: `--button-padding: 8px;`

## Best practices

1. **Consistent naming**: Use consistent prefixes like `component-property`
   - Example: `badge-bg`, `badge-text`, `badge-border`

2. **Live preview**: Always include an interactive element with the correct ID and ref

3. **Clear labels**: When customizing the UI, use clear labels for controls

4. **Organised layout**: Group related controls together for better usability

## Complete example

Here's a full implementation example from the Badge component:

```jsx
import React from "react";
import { Badge, Portion, Row } from "fictoan-react";
import { createPropsConfigurator } from "$utils/propsConfigurator";
import { createThemeConfigurator } from "$utils/themeConfigurator";
import { colourOptions } from "../../colour/colours";

const BadgeDocs = () => {
    // Props configuration
    const {
        propsConfigurator,
        componentProps: propsConfig,
    } = createPropsConfigurator(
        "Badge", 
        ["strings", "size", "shape", "bgColour", "textColour"]
    );

    // Theme configuration
    const BadgeComponent = (varName) => {
        return varName.startsWith("badge-");
    };

    const {
        interactiveElementRef,
        componentProps: themeConfig,
        themeConfigurator,
    } = createThemeConfigurator("Badge", BadgeComponent);

    return (
        <Article>
            {/* Demo component */}
            <Portion>
                <Badge
                    id="interactive-component"
                    ref={interactiveElementRef}
                    {...propsConfig}
                    {...themeConfig}
                >
                    {propsConfig.content}
                </Badge>
            </Portion>

            {/* Configurators */}
            <Row>
                <Portion desktopSpan="half">
                    {propsConfigurator()}
                </Portion>
                <Portion desktopSpan="half">
                    {themeConfigurator()}
                </Portion>
            </Row>
        </Article>
    );
};

export default BadgeDocs;
```

This guide should help you implement the Theme Configurator in your Fictoan components to create dynamic, customizable UI elements with real-time preview.
