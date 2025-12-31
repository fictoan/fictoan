# Configurator System Analysis

**Date**: 2025-12-22
**Status**: Analysis & Recommendations

## Overview

This document analyzes the Props Configurator and Theme Configurator systems that power Fictoan's interactive component
documentation. The goal is to evaluate whether these are the best versions of themselves for creating a "Storybook-like
setup, but with a richer, controlled UX."

## Current Architecture

### Props Configurator

- **Location**: `packages/fictoan-docs/src/components/PropsConfigurator/PropsConfigurator.tsx`
- **Purpose**: Generates interactive controls for component props with live code generation
- **Metadata Source**: Transitioning from `props-metadata.json` (build artifact) to analyzer-first (source analysis)
- **Enhancement System**: Component-specific customization via `props.enhancements.ts` files

### Theme Configurator

- **Location**: `packages/fictoan-docs/src/utils/themeConfigurator.js`
- **Purpose**: Extracts and manipulates CSS variables for real-time theme customization
- **Detection**: Automatic introspection of CSS files for component-specific variables
- **Output**: Copy-paste ready CSS variable declarations

---

## Props Configurator Assessment

### Strengths ✓

1. **Type-Safe Metadata**
    - Uses TypeScript analysis to generate controls from actual component types
    - Self-documenting and stays in sync with component changes
    - Moving toward analyzer-first approach (eliminating build artifacts)

2. **Enhancement System**
    - Clean separation via `props.enhancements.ts` files
    - Allows per-component customization without touching core configurator
    - Staleness detection warns about outdated enhancements

3. **Superior Code Generation**
    - Produces complete, importable code with imports
    - Shows actual usage patterns, not synthetic wrappers
    - Better than Storybook's "Show code" feature

4. **Real-Time Synchronization**
    - Props flow immediately to live component
    - No disconnect between controls and preview
    - Children content editing for applicable components

5. **Intelligent Defaults**
    - Sensible initial values for complex props (ListBox options, Tabs configuration)
    - Component-specific content suggestions

### Critical Gaps ✗

#### 1. **Discoverability Crisis**

**Location**: Lines 305-360 in PropsConfigurator.tsx

Massive hardcoded filtering scattered throughout:

```typescript
// Hidden everywhere in imperative conditions
if (componentName === "Button" && (propName === "label" || propName === "onChange")) {
    return null;
}
if (componentName === "Card" && propName === "heading") {
    return null;
}
// ...and 15+ more cases
```

**Problems**:

- Non-discoverable: Users can't see what props exist but are hidden
- Brittle: Every new component needs manual filtering logic
- Scattered: Logic distributed across multiple conditional blocks
- Maintenance nightmare: Adding a component means modifying core configurator

**Impact**: Makes the system feel arbitrary and hard to reason about.

#### 2. **Limited Control Type Inference**

**Location**: Lines 368-494

Current logic:

- Boolean → Checkbox
- String with `|` → RadioTabGroup
- String with "color"/"colour" → ListBox
- ReactNode → InputField

**Missing**:

- Complex union types (e.g., `string | number | CustomType`)
- Array types with specific shapes (e.g., `Option[]`)
- Object types with nested properties
- Conditional/dependent props (e.g., if variant="multi" show maxSelections)
- Callback functions (should show action logger or hide entirely)

#### 3. **No Organizational Structure**

Props render as flat list regardless of component complexity. For components with 15+ props:

- No grouping (Layout, Appearance, Behavior, etc.)
- No hierarchy or visual separation
- No collapsible sections
- No search/filter capability

**Example**: Modal has id, isDismissible, showBackdrop, blurBackdrop, label, description all at same level with no
context.

#### 4. **Enhancement Staleness**

**Location**: Lines 120-226, 555-562

System detects stale enhancements but only warns:

```typescript
const stale = enhancementProps.filter(prop => !metadataProps.includes(prop));
setStaleEnhancements(stale);
```

**Missing**:

- Auto-removal of stale enhancements
- Suggestions for new props that could benefit from enhancements
- Migration tools when prop names change

#### 5. **Children Handling is Ad-Hoc**

**Location**: Lines 238-240, 574-589

Special-cases Button, Card, Drawer for children:

```typescript
const isSpecialChildrenComponent = componentName === "Button" || componentName === "Card" || componentName === "Drawer";
```

**Problems**:

- Hard to extend to new components
- Doesn't distinguish between simple text children vs complex ReactNode children
- No rich text editing for formatted content

---

## Theme Configurator Assessment

### Strengths ✓

1. **Zero-Config Introspection**
    - Automatically extracts `--component-*` variables from CSS
    - Filter function pattern is flexible (`varName.startsWith("accordion-")`)
    - Works with existing CSS files, no preprocessing needed

2. **Type Detection Intelligence**
    - Attempts to distinguish colors from numbers from other values
    - Handles var() references and resolves them recursively
    - Extracts units (px, rem, em) correctly

3. **Live Preview Architecture**
    - `interactiveElementRef` directly styles the demo component
    - Changes apply instantly via `element.style.setProperty()`
    - Class-based color system integration

4. **Production-Ready Output**
    - Formatted CSS with consistent spacing
    - Preserves var() syntax for colors
    - Copy-paste ready for theme files

5. **Sophisticated Value Handling**
    - Distinguishes between color references (keep as var()) and numeric values (direct values)
    - Fixes incorrectly formatted values automatically
    - Preserves unit suffixes across changes

### Critical Gaps ✗

#### 1. **Fragile Heuristic Detection**

**Location**: Lines 27-144 (isColorVariable, isNumericalVariable)

Extensive heuristics to guess variable types:

```javascript
const knownColorVars = ["transparent", "link-text-default", "paragraph-text-colour", ...];
```

**Breaks on**:

- `transition-duration: 200ms` - Not detected as numerical
- `z-index: 10` - Might be confused with colors
- `transform: scale(1.2)` - No handler for this
- `opacity: 0.5` - Decimal handling unclear
- `box-shadow: 0 2px 4px rgba(0,0,0,0.1)` - Complex values unsupported
- `calc(100% - 20px)` - CSS functions ignored

#### 2. **No Semantic Understanding**

Variables treated as independent entities:

```css
--accordion-border-color
--accordion-bg-color
--accordion-text-color
--accordion-summary-bg-color
--accordion-summary-text-color
```

**Missing**:

- Grouping related variables (all summary-related together)
- Showing dependency chains (what inherits from what)
- Suggesting complementary values (if bg is dark, suggest light text)
- Color harmony tools (show palette relationships)

#### 3. **Limited Control Types**

Only supports:

- Color picker (ListBox with color options)
- Range slider (0-32 hardcoded)

**Missing**:

- Shadow builder for `box-shadow` values
- Gradient picker for `background` with gradients
- Easing function selector for transitions
- Border style selector (solid/dashed/dotted/none)
- Font stack builder
- Spacing scale selector (4/8/12/16/... with visual preview)

#### 4. **Hardcoded Constraints**

**Location**: Lines 256-258

```javascript
min = { 0 }
max = { 32 }
step = { 1 }
```

Applied to ALL numerical variables regardless of:

- `z-index` should be 0-999+
- `opacity` should be 0-1 with 0.1 step
- `font-weight` should be 100-900 with 100 step
- `line-height` should be 1-3 with 0.1 step
- Percentages should be 0-100 or 0-200 depending on context

#### 5. **No Variable Relationships**

If I change `--accordion-padding: 16px`, system doesn't:

- Suggest also adjusting `--accordion-summary-padding`
- Show which other variables might be affected
- Maintain proportional relationships (e.g., padding always 2x margin)
- Offer bulk updates for consistency

#### 6. **Single Context Only**

No support for:

- Responsive values (different at breakpoints)
- Dark mode alternatives
- Theme variants (compact/comfortable/spacious)
- State-based variations (hover/focus/disabled values)

---

## Comparison with Storybook

### Where Fictoan is **Superior** ⭐

| Feature                   | Fictoan                               | Storybook                            |
|---------------------------|---------------------------------------|--------------------------------------|
| **Unified Props + Theme** | Both configurators in one view        | Props only, theming separate/absent  |
| **Real Code Generation**  | Actual importable source with imports | Often synthetic wrapper code         |
| **CSS Variable Output**   | Copy-paste theme CSS directly         | No equivalent feature                |
| **Analyzer-First**        | Moving to source analysis             | Relies heavily on build artifacts    |
| **Type Safety**           | Direct from TypeScript types          | Requires manual arg type definitions |

### Where Storybook is **Superior** 📘

#### 1. **Control Maturity**

Storybook has rich, battle-tested controls:

```typescript
// Storybook ArgTypes
argTypes: {
    size: {
        control: 'select',
            options
    :
        [ 'small', 'medium', 'large' ]
    }
,
    colors: {
        control: 'check', // multi-select
            options
    :
        [ 'red', 'green', 'blue' ]
    }
,
    config: {
        control: 'object' // JSON editor with validation
    }
,
    date: {
        control: 'date'
    }
,
    avatar: {
        control: 'file',
            accept
    :
        '.jpg,.png'
    }
}
```

#### 2. **Organization & UX**

- **Categories**: Props grouped logically
  ```
  Layout: padding, margin, width
  Appearance: color, shape, shadow
  Behavior: onClick, disabled, loading
  ```
- **Collapsible sections**: Hide complex/advanced props
- **Visual hierarchy**: Clear separation between prop groups
- **Search/filter**: Find props quickly in large components

#### 3. **Addon Ecosystem**

Storybook has mature addons:

- **Actions**: Log event handler calls
- **Interactions**: Record and replay user interactions
- **Accessibility**: Automated a11y testing (WCAG violations, color contrast)
- **Viewport**: Test responsive behavior
- **Backgrounds**: Preview on different background colors
- **Measure**: Show spacing and dimensions
- **Outline**: Visualize layout boxes

#### 4. **State Management**

- **URL state**: Share specific configurations via link
- **Saved presets**: Store and switch between common configurations
- **Snapshots**: Visual regression testing
- **Docs mode**: Automatic MDX documentation generation

#### 5. **Developer Experience**

- **TypeScript inference**: Automatically generates controls from prop types
- **Default values**: Reads from component defaults
- **Validation**: Shows errors for invalid prop combinations
- **Autocomplete**: Suggests valid values for props

---

## Recommendations for Excellence

### Phase 1: Metadata Enrichment (Foundation)

#### Props Configurator

**Replace hardcoded filtering with declarative metadata:**

```typescript
// In component files or adjacent .meta.ts
interface AccordionProps {
    /**
     * Content shown in the collapsed summary
     * @configurator
     *   control: "richtext"
     *   group: "Content"
     *   order: 1
     */
    summary : ReactNode;

    /**
     * Controls whether accordion is expanded
     * @configurator
     *   control: "boolean"
     *   group: "Behavior"
     *   order: 2
     */
    isOpen? : boolean;

    /**
     * @internal
     * @configurator hidden
     */
    onTransitionEnd? : () => void;
}
```

**Benefits**:

- All prop configuration co-located with component
- No more scattered filtering logic
- Discoverable via IDE tooltips
- Version controlled with component

**Alternative: Sidecar Enhancement Files**

```typescript
// accordion/props.enhancements.ts
export const enhancements = {
    summary         : {
        control     : "richtext",
        group       : "Content",
        order       : 1,
        description : "Content shown in the collapsed summary"
    },
    isOpen          : {
        control : "boolean",
        group   : "Behavior",
        order   : 2
    },
    onTransitionEnd : {
        hidden : true
    }
}
```

#### Theme Configurator

**Replace heuristics with explicit metadata:**

```css
/* accordion-theme.css */

/**
 * @configurator-meta
 *   type: color
 *   group: Appearance
 *   label: Background Color
 *   description: Main background color for accordion
 */
--accordion-bg-color:

var
(
--white

)
;

/**
 * @configurator-meta
 *   type: spacing
 *   group: Layout
 *   min: 0
 *   max: 64
 *   step: 4
 *   unit: px
 *   label: Padding
 */
--accordion-padding:

16
px

;

/**
 * @configurator-meta
 *   type: shadow
 *   group: Effects
 *   label: Elevation Shadow
 */
--accordion-shadow:

0
2
px

4
px

rgba
(
0
,
0
,
0
,
0.1
)
;
```

**Alternative: JSON Schema**

```json
// accordion/theme.schema.json
{
    "variables" : {
        "accordion-bg-color" : {
            "type"    : "color",
            "group"   : "Appearance",
            "default" : "var(--white)",
            "related" : [
                "accordion-text-color",
                "accordion-border-color"
            ]
        },
        "accordion-padding"  : {
            "type"       : "spacing",
            "group"      : "Layout",
            "min"        : 0,
            "max"        : 64,
            "step"       : 4,
            "unit"       : "px",
            "responsive" : true
        }
    }
}
```

### Phase 2: Control Library (Extensibility)

**Build abstracted control system:**

```typescript
// Control type registry
const CONTROL_TYPES = {
    boolean     : BooleanControl,
    text        : TextControl,
    richtext    : RichTextControl,
    select      : SelectControl,
    multiselect : MultiSelectControl,
    color       : ColorControl,
    spacing     : SpacingControl,
    shadow      : ShadowControl,
    gradient    : GradientControl,
    easing      : EasingControl,
    number      : NumberControl,
    date        : DateControl,
    file        : FileControl,
    object      : ObjectControl,  // JSON editor
    array       : ArrayControl,     // Add/remove items
}

// Universal control renderer
const Control = ({type, value, onChange, config}) => {
    const ControlComponent = CONTROL_TYPES[type];
    return <ControlComponent value = {value}
    onChange = {onChange}
    {...
        config
    }
    />;
}
```

**Specialized controls:**

```typescript
// ShadowControl: Visual shadow builder
<ShadowControl
    value = "0 2px 4px rgba(0,0,0,0.1)"
onChange = {setShadow}
presets = {["none", "sm", "md", "lg", "xl"
]
}
/>

// SpacingControl: Scale-based selector
< SpacingControl
value = "16px"
onChange = {setSpacing}
scale = {[0, 4, 8, 12, 16, 24, 32, 48, 64
]
}
visualPreview
/ >

// GradientControl: Visual gradient builder
<GradientControl
    value = "linear-gradient(90deg, red, blue)"
onChange = {setGradient}
types = {["linear", "radial", "conic"
]
}
/>
```

### Phase 3: Organization & Discovery (UX)

**Prop grouping with collapsible sections:**

```tsx
<PropConfiguratorUI>
    <PropGroup title="Content" defaultOpen>
        <Control prop="summary" />
        <Control prop="children" />
    </PropGroup>

    <PropGroup title="Behavior">
        <Control prop="isOpen" />
        <Control prop="isDismissible" />
        <Control prop="closeOnClickOutside" />
    </PropGroup>

    <PropGroup title="Appearance">
        <Control prop="bgColour" />
        <Control prop="borderColour" />
        <Control prop="shape" />
    </PropGroup>

    <PropGroup title="Spacing">
        <Control prop="padding" />
        <Control prop="margin" />
    </PropGroup>

    <PropGroup title="Advanced" defaultClosed>
        <Control prop="customClassNames" />
        <Control prop="dataAttributes" />
    </PropGroup>
</PropConfiguratorUI>
```

**Theme variable grouping:**

```tsx
<ThemeConfiguratorUI>
    <VariableGroup title="Colors" icon={<PaletteIcon />}>
        <Control var="accordion-bg-color" />
        <Control var="accordion-text-color" />
        <Control var="accordion-border-color" />
        <RelationshipIndicator>
            These colors should maintain sufficient contrast
        </RelationshipIndicator>
    </VariableGroup>

    <VariableGroup title="Layout">
        <Control var="accordion-padding" />
        <Control var="accordion-margin" />
        <Control var="accordion-border-radius" />
    </VariableGroup>

    <VariableGroup title="Effects">
        <Control var="accordion-shadow" />
        <Control var="accordion-transition-duration" />
    </VariableGroup>
</ThemeConfiguratorUI>
```

**Search and filter:**

```tsx
<ConfiguratorHeader>
    <SearchBox
        placeholder="Search props..."
        onChange={filterProps}
    />
    <FilterToggle>
        <Toggle label="Show internal props" />
        <Toggle label="Show deprecated props" />
    </FilterToggle>
</ConfiguratorHeader>
```

### Phase 4: Presets & Scenarios (Power Features)

**Prop presets:**

```tsx
<PresetSelector>
    <Preset
        name="Simple"
        icon={<MinimalIcon />}
        props={{
            summary : "Click to expand",
            isOpen  : false
        }}
    />
    <Preset
        name="Open by Default"
        icon={<ExpandedIcon />}
        props={{
            summary : "Already expanded",
            isOpen  : true
        }}
    />
    <Preset
        name="Rich Content"
        icon={<RichIcon />}
        props={{
            summary  : <CustomSummaryComponent />,
            children : <ComplexContent />
        }}
    />
</PresetSelector>
```

**Component states:**

```tsx
<StateSelector>
    <State name="Default" props={defaultProps} />
    <State name="Loading" props={{...defaultProps, isLoading : true}} />
    <State name="Error" props={{...defaultProps, error : "Failed to load"}} />
    <State name="Empty" props={{...defaultProps, items : []}} />
    <State name="Disabled" props={{...defaultProps, disabled : true}} />
</StateSelector>
```

**Theme presets:**

```tsx
<ThemePresetSelector>
    <ThemePreset name="Default" variables={defaultTheme} />
    <ThemePreset name="Compact" variables={compactTheme} />
    <ThemePreset name="Spacious" variables={spaciousTheme} />
    <ThemePreset name="Dark" variables={darkTheme} />
    <ThemePreset name="High Contrast" variables={highContrastTheme} />
</ThemePresetSelector>
```

### Phase 5: Smart Features (Intelligence)

**Conditional props:**

```typescript
// If variant="multi", show maxSelections
const dependencies = {
    maxSelections   : {
        visibleWhen : (props) => props.variant === "multi"
    },
    customValidator : {
        visibleWhen : (props) => props.enableValidation === true
    }
}
```

**Relationship awareness:**

```typescript
// Theme variable relationships
const relationships = {
    "accordion-bg-color" : {
        affects    : [ "accordion-text-color" ],
        suggestion : "Use contrasting text color for accessibility",
        validator  : (bg, text) => checkContrast(bg, text) >= 4.5
    },
    "accordion-padding"  : {
        proportionalTo : [ "accordion-margin" ],
        ratio          : 2, // padding should be 2x margin
        suggestion     : "Consider adjusting margin proportionally"
    }
}
```

**Validation and feedback:**

```tsx
<Control prop="email">
    <Validator
        pattern={EMAIL_REGEX}
        message="Must be valid email format"
    />
</Control>

<Control var="accordion-text-color">
    <ContrastChecker
        background="accordion-bg-color"
        minRatio={4.5}
        warning="Color contrast below WCAG AA standard"
    />
</Control>
```

**Smart defaults:**

```typescript
// When user changes background to dark color,
// suggest light text color automatically
const onBackgroundChange = (newBg) => {
    const isDark = getBrightness(newBg) < 128;
    if (isDark && !user.hasModifiedText) {
        suggestChange("accordion-text-color", "white");
    }
}
```

### Phase 6: Advanced Features (Professional)

**URL state management:**

```typescript
// Share configurations via URL
const shareableUrl = generateConfigUrl({
    props : currentProps,
    theme : currentTheme
});
// https://docs.fictoan.io/accordion?props=eyJzdW1tYXJ5...
```

**Responsive preview:**

```tsx
<ViewportSelector>
    <Viewport size="mobile" width={375} />
    <Viewport size="tablet" width={768} />
    <Viewport size="desktop" width={1440} />
    <Viewport size="wide" width={1920} />
    <CustomViewport />
</ViewportSelector>
```

**Accessibility testing:**

```tsx
<A11yPanel>
    <ContrastChecker results={contrastResults} />
    <KeyboardTester
        tests={[
            "Tab navigation",
            "Enter to toggle",
            "Escape to close"
        ]}
    />
    <ScreenReaderPreview />
    <AriaValidator />
</A11yPanel>
```

**Interaction recording:**

```tsx
<InteractionRecorder>
    <RecordButton />
    <InteractionSteps>
        1. Click summary
        2. Verify accordion opens
        3. Click summary again
        4. Verify accordion closes
    </InteractionSteps>
    <PlaybackButton />
</InteractionRecorder>
```

**Multi-instance comparison:**

```tsx
<ComparisonMode>
    <Instance
        label="Variant A"
        props={variantAProps}
        theme={themeA}
    />
    <Instance
        label="Variant B"
        props={variantBProps}
        theme={themeB}
    />
    <DiffView showChanges />
</ComparisonMode>
```

---

## Implementation Priority

### Critical (Do First) 🔴

These directly solve current pain points:

1. **Metadata system for prop filtering** - Eliminates hardcoded conditionals
2. **Prop grouping** - Makes complex components manageable
3. **Theme variable metadata** - Replaces fragile heuristics
4. **Enhanced control types** - Shadow, gradient, spacing builders

### High Value (Do Soon) 🟡

These significantly improve UX:

5. **Search and filter** - Essential for component discovery
6. **Presets and variants** - Speeds up common configurations
7. **Relationship awareness** - Helps maintain consistency
8. **Better range constraints** - Per-variable min/max/step

### Future Enhancements (Nice to Have) 🟢

These are competitive differentiators:

9. **URL state sharing** - Collaboration feature
10. **A11y testing integration** - Professional quality
11. **Responsive previews** - Essential for modern components
12. **Interaction recording** - Advanced testing capability

---

## Technical Debt to Address

### Props Configurator

1. **Lines 305-360**: Extract filtering to metadata system
2. **Lines 74-90**: Move `getInitialProps` logic to analyzer
3. **Lines 152-181**: Consolidate special-case handling
4. **Lines 361**: Fix hardcoded enhancement check - use metadata
5. **Lines 498-526**: Extract `getPropOrder` to component metadata

### Theme Configurator

1. **Lines 27-89**: Replace `isColorVariable` heuristics with metadata lookup
2. **Lines 122-144**: Replace `isNumericalVariable` heuristics with metadata
3. **Lines 256-258**: Make range constraints configurable per variable
4. **Lines 443-556**: Simplify `handleVariableChange` with type strategy pattern
5. **Lines 604-612**: Variable deduplication shouldn't be necessary with proper metadata

---

## Success Metrics

How we'll know the configurators are "best versions":

### Developer Experience

- [ ] Zero hardcoded component-specific logic in configurator core
- [ ] New components work without modifying configurator
- [ ] Prop metadata co-located with component definition
- [ ] Theme metadata co-located with CSS
- [ ] No manual maintenance of enhancement files

### User Experience

- [ ] Can find any prop in < 5 seconds (via search)
- [ ] Props organized logically, not alphabetically
- [ ] All variable types have appropriate controls
- [ ] Can compare multiple configurations side-by-side
- [ ] Can share exact configuration via URL

### Quality

- [ ] Accessibility scores > 90 on all controls
- [ ] No type detection errors in theme configurator
- [ ] Generated code passes lint and type check
- [ ] Contrast checking prevents WCAG violations
- [ ] All controls keyboard navigable

### Completeness

- [ ] Supports all Fictoan component prop types
- [ ] Handles all CSS variable value types
- [ ] Provides rich editors for complex types (shadow, gradient, etc.)
- [ ] Shows variable relationships and dependencies
- [ ] Validates configurations before allowing copy

---

## Conclusion

The current configurators are a **solid v1 with clear v2 vision needed**.

**Strengths**: Type-safe metadata, live code generation, CSS variable extraction, clean separation of concerns.

**Critical gaps**: Hardcoded filtering logic, limited control types, no organizational structure, fragile type
detection, missing relationship awareness.

**Path forward**: Metadata enrichment → Control library → Organization → Smart features → Advanced capabilities.

The foundation is good. With systematic improvements focusing on **metadata-driven configuration** and **semantic
understanding**, Fictoan's configurators can genuinely surpass Storybook for design system documentation.

---

## Next Steps

1. **Prototype metadata system**: Start with Accordion as reference implementation
2. **Build 3-5 new control types**: Shadow, gradient, spacing, easing, object
3. **Implement prop grouping**: Test with complex component (Modal, Drawer)
4. **Create theme variable schema**: Define standard for CSS metadata
5. **Measure and iterate**: Track success metrics, gather user feedback

**Target**: Q1 2025 for metadata system, Q2 2025 for enhanced controls and organization.
