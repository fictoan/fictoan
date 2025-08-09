# Props configuration migration guide

## Quick summary for developers

### What's working now
✅ **TypeScript source analysis** - Components are analyzed directly from their .tsx files
✅ **Automatic prop extraction** - No manual configuration needed for basic components  
✅ **Smart code generation** - Produces complete, copy-pasteable component examples
✅ **Zero-config for 4 components** - Accordion, Badge, Button, Breadcrumbs work automatically

### How to add a new component
1. Add component name to `supportedComponents` array in `/api/analyze-component/route.ts`
2. Test at `http://localhost:3000/components/[component-name]`
3. Add special handling in `CodeGenerator.ts` if needed (like Accordion's summary prop)

### Key files to know
- **API Route**: `src/app/api/analyze-component/route.ts` - Server-side TypeScript analysis
- **Code Generator**: `src/lib/code-generator/CodeGenerator.ts` - Creates example code
- **PropsConfigurator**: `src/components/PropsConfigurator/PropsConfigurator.tsx` - UI component

### What's next
- Add more components (just add to supportedComponents array!)
- Dynamic type resolution (stop hardcoding SpacingTypes, etc.)
- Complete examples with imports and state management
- Phase out enhancement files completely

---

## Current implementation status

### Completed components (Phase 1)

We have successfully implemented the foundation of the automated props configuration system. The following has been completed:

#### 1. TypeScript analyzer (✅ Complete)
- **Location**: `packages/fictoan-docs/src/lib/type-analyzer/TypeAnalyzer.ts`
- **API Route**: `packages/fictoan-docs/src/app/api/analyze-component/route.ts`
- **Functionality**:
  - Reads TypeScript source files directly from `packages/fictoan-react/src/components/`
  - Extracts prop interfaces automatically using TypeScript compiler API
  - Resolves type aliases (SpacingTypes, ShapeTypes) to their actual union values
  - Extracts default values from component implementations
  - Works via API route to handle server-side file system access

#### 2. Intelligent code generator (✅ Complete)
- **Location**: `packages/fictoan-docs/src/lib/code-generator/CodeGenerator.ts`
- **Functionality**:
  - Generates complete, working component examples
  - Handles special props like `summary` for Accordion
  - Properly formats children content
  - Creates copy-pasteable code with proper formatting
  - Handles ReactNode props intelligently

#### 3. PropsConfigurator integration (✅ Complete)
- **Updated**: `packages/fictoan-docs/src/components/PropsConfigurator/PropsConfigurator.tsx`
- **Changes**:
  - Integrated with TypeAnalyzer for automatic prop discovery
  - Falls back to legacy metadata when analyzer not available
  - Handles ReactNode props as text inputs
  - Uses CodeGenerator for better code output

#### 4. Working components
Currently analyzing and generating documentation for:
- **Accordion** - Full support including summary (ReactNode) and children
- **Badge** - Full support with size, shape, withDelete, onDelete
- **Button** - Basic support
- **Breadcrumbs** - Basic support with Link generation

### What works now

1. **Zero manual configuration** for supported components:
   ```typescript
   // No more manual enhancement files needed!
   // TypeAnalyzer automatically extracts from Badge.tsx:
   // - size?: SpacingTypes → dropdown with all spacing options
   // - withDelete?: boolean → toggle switch
   // - shape?: ShapeTypes → dropdown with shape options
   ```

2. **Complete code generation**:
   ```jsx
   // Accordion generates complete, working code:
   <Accordion
       summary="Click to expand"
       open
   >
       Accordion content goes here
   </Accordion>
   ```

3. **Automatic type resolution**:
   - Union types are expanded to their actual values
   - Boolean props become toggles
   - String unions become dropdowns
   - ReactNode props become text inputs

## Updated problem statement

The current documentation system for Fictoan React components requires excessive manual configuration despite having
rich TypeScript definitions that contain all necessary information. This results in:

### Current pain points

1. **Redundant manual work**: Creating enhancement files for each component that duplicate information already in
   TypeScript
2. **Maintenance burden**: Keeping enhancement files synchronized with component changes
3. **Inconsistent documentation**: Different approaches for different components based on when they were documented
4. **Complex setup requirements**: Components with state management or imperative APIs need extensive boilerplate

### Existing architecture issues

#### Manual enhancement files

Every component requires a `props.enhancements.ts` file that manually specifies:

- UI control types (despite these being inferrable from TypeScript types)
- Option values for dropdowns (despite these existing in union type definitions)
- Labels and descriptions (despite these being derivable from prop names and JSDoc)
- Component templates and children content

#### Incomplete code generation

Current system generates only the component JSX, missing:

- Required state management (useState for controlled components)
- Helper functions (showDrawer, hideDrawer for imperative APIs)
- Event handlers and callbacks
- Parent wrapper requirements
- Import statements for complete working examples

#### Type information underutilization

TypeScript definitions contain:

- Complete prop interfaces with types
- Default values in component implementations
- Union types with all possible values
- Optional vs required props
- JSDoc comments with descriptions

Yet this information is not fully leveraged for documentation generation.

## Solution architecture

### Goal

Create a zero-configuration documentation generator that automatically creates interactive component playgrounds by
analyzing TypeScript definitions and component implementations, requiring manual configuration only for exceptional
cases.

### Core principles

1. **Convention over configuration**: Use consistent patterns in prop naming and types to infer documentation behavior
2. **Progressive enhancement**: Start with fully automated baseline, allow targeted overrides only when needed
3. **Complete examples**: Generate fully functional code including all necessary imports, state, and helper functions
4. **Type-driven UI**: Derive appropriate UI controls directly from TypeScript type definitions

## Next steps for implementation

### Immediate priorities

1. **Expand component support**:
   - Add more components to `supportedComponents` array in TypeAnalyzer
   - Test with complex components (Modal, Drawer, Table)
   - Handle components with different prop patterns

2. **Enhance type resolution**:
   - Currently hardcoded type aliases (SpacingTypes, ShapeTypes)
   - Need to dynamically resolve type imports from source files
   - Handle more complex types (arrays, objects, generics)

3. **Improve code generation**:
   - Add state management for components that need it (Modal, Drawer)
   - Generate import statements
   - Handle event handlers with proper examples
   - Support multiple example variations

4. **Remove enhancement file dependency**:
   - Currently still checking for enhancement files
   - Gradually phase out as TypeAnalyzer becomes more capable
   - Create migration tool to convert existing enhancements

### Technical improvements needed

#### 1. Dynamic type resolution
Currently we hardcode type resolutions:
```typescript
if (typeName === "SpacingTypes") {
    return "'none' | 'nano' | 'micro' | 'tiny' | 'small' | 'medium' | 'large' | 'huge'";
}
```

Should become:
```typescript
// Dynamically resolve by following imports and reading type definitions
const resolvedType = await resolveTypeAlias(typeName, sourceFile);
```

#### 2. Better prop control inference
Need to implement `PropTypeInferrer.ts` to automatically determine:
- Color props → color picker
- Icon props → icon selector
- Date props → date picker
- Array props → list editor

#### 3. Complete example generation
Current CodeGenerator creates JSX only. Should create:
```typescript
import React, { useState } from 'react';
import { Modal, Button } from '@fictoan/fictoan-react';

export function ModalExample() {
    const [isOpen, setIsOpen] = useState(false);
    
    return (
        <>
            <Button onClick={() => setIsOpen(true)}>
                Open Modal
            </Button>
            <Modal
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
            >
                Modal content
            </Modal>
        </>
    );
}
```

## Implementation instructions for Sonnet (Updated)

### Phase 1: Enhanced type extraction system (✅ Partially Complete)

#### Task 1.1: Create advanced TypeScript analyzer (✅ COMPLETE)

**Status**: Implemented and working

**Files created**:
- ✅ `packages/fictoan-docs/src/lib/type-analyzer/TypeAnalyzer.ts` - Client-side API caller
- ✅ `packages/fictoan-docs/src/app/api/analyze-component/route.ts` - Server-side analyzer with TypeScript Compiler API

**What works**:
- ✅ Parses component files using TypeScript Compiler API
- ✅ Extracts CustomProps interfaces
- ✅ Identifies prop types and default values from destructuring
- ✅ Expands union types (hardcoded for SpacingTypes, ShapeTypes)
- ✅ Handles function signatures properly
- ✅ Detects children prop

**Still needed**:
- ⚠️ Dynamic type alias resolution (currently hardcoded)
- ⚠️ JSDoc extraction (implemented but unused)
- ⚠️ Inherited props from extended interfaces

2. **`PropTypeInferrer.ts`**: Infer UI controls from types (⚠️ TODO)

```typescript
// Implement logic to map TypeScript types to UI controls:
// - boolean → toggle switch
// - string literal union → dropdown (extract options from union)
// - number → number input (with min/max from type constraints if available)
// - string → text input
// - function → code editor or predefined handler dropdown
// - ReactNode → rich text editor or component picker
// - enum → radio group or dropdown based on count
```

3. **`DefaultValueExtractor.ts`**: Extract defaults from implementation

```typescript
// Parse component implementation to find:
// - Default parameter values in function signature
// - defaultProps static property
// - Default values in destructuring patterns
// Example: ({ size = "medium", isDisabled = false }) => ...
```

4. **`ComponentAnalyzer.ts`**: Analyze component patterns

```typescript
// Detect special component patterns:
// - Components requiring state (controlled inputs, toggles)
// - Components with imperative APIs (ref-based methods)
// - Components requiring specific parents or context
// - Components that render children vs specific content
```

**Implementation details**:

- Use `typescript` package to create a Program and TypeChecker
- Parse both `.tsx` component files and `.ts` type definition files
- Build a complete picture of each component including inherited props
- Cache analysis results for performance

#### Task 1.2: Create smart control generator

**Location**: `packages/fictoan-docs/src/lib/control-generator/`

**Create the following files**:

1. **`ControlGenerator.ts`**: Generate UI controls from analyzed types

```typescript
// For each prop, generate appropriate control configuration:
// - Determine control type based on TypeScript type
// - Extract options for enums/unions
// - Set reasonable defaults based on prop name patterns
// - Group related props automatically
```

2. **`PatternMatcher.ts`**: Recognize common prop patterns

```typescript
// Implement pattern recognition for common props:
// - Props starting with "is", "has", "with" → boolean toggles
// - Props ending with "Color" → color picker with theme colors
// - Props like "size", "variant", "kind" → predefined option sets
// - Props ending with "Icon" → icon picker
// - Props matching /on[A-Z].*/ → event handlers
```

3. **`GroupingStrategy.ts`**: Auto-group related props

```typescript
// Automatically organize props into logical groups:
// - Appearance: size, color, variant, theme
// - Layout: margin, padding, width, height, position
// - State: isDisabled, isLoading, isActive
// - Behavior: onClick, onChange, onSubmit
// - Content: label, text, children, placeholder
```

### Phase 2: Intelligent code generator (✅ Partially Complete)

#### Task 2.1: Create template generation system (✅ COMPLETE)

**Status**: Implemented and working

**Files created**:
- ✅ `packages/fictoan-docs/src/lib/code-generator/CodeGenerator.ts` - Smart code generation

**What works**:
- ✅ Generates complete JSX with proper formatting
- ✅ Handles special components (Accordion with summary, Badge with delete, Breadcrumbs with Links)
- ✅ Properly formats props based on type
- ✅ Handles children content
- ✅ Skips default values to keep code clean

**Still needed**:
- ⚠️ Full example generation with imports and function wrapper
- ⚠️ State management for Modal/Drawer components
- ⚠️ Event handler generation

2. **`StateAnalyzer.ts`**: Detect state requirements

```typescript
// Analyze component to determine state needs:
// - Controlled form inputs need value + onChange
// - Modals/Drawers need isOpen state
// - Toggleable components need boolean state
// - List components might need selection state
```

3. **`ImportResolver.ts`**: Generate correct imports

```typescript
// Automatically determine and generate imports:
// - Component import from fictoan-react
// - React hooks (useState, useEffect, etc.)
// - Type imports for TypeScript
// - Helper utilities if needed
// - Icon imports if icon props are used
```

4. **`HelperGenerator.ts`**: Generate helper functions

```typescript
// Create helper functions for common patterns:
// - Modal/Drawer: generateShowHideHelpers()
// - Form: generateSubmitHandler()
// - List: generateSelectionHandlers()
// - Include meaningful console.log or comments
```

5. **`WrapperDetector.ts`**: Detect wrapper requirements

```typescript
// Identify when components need wrappers:
// - Tooltip needs a target element
// - Form fields might need Form wrapper
// - Certain layouts need specific containers
// Generate wrapper code when needed
```

#### Task 2.2: Create special case handlers

**Location**: `packages/fictoan-docs/src/lib/special-cases/`

**Create handler classes for complex components**:

1. **`DrawerHandler.ts`**

```typescript
// Special handling for Drawer component:
// - Generate useState for isOpen
// - Create showDrawer and hideDrawer functions
// - Add trigger button in example
// - Include proper accessibility attributes
```

2. **`ModalHandler.ts`**

```typescript
// Similar to Drawer but for Modal component
// - Handle backdrop click
// - Escape key handling
// - Focus management setup
```

3. **`TooltipHandler.ts`**

```typescript
// Special handling for Tooltip:
// - Generate target element with ID
// - Create tooltip with matching target ID
// - Show hover/click trigger examples
```

4. **`FormHandler.ts`**

```typescript
// Handle form components:
// - Generate form wrapper if needed
// - Create validation examples
// - Show controlled vs uncontrolled examples
// - Add submit handler
```

5. **`TableHandler.ts`**

```typescript
// Handle data table components:
// - Generate sample data
// - Add sorting/pagination if supported
// - Create column definitions
```

### Phase 3: New PropsConfigurator component

#### Task 3.1: Create enhanced PropsConfigurator

**Location**: `packages/fictoan-docs/src/components/PropsConfigurator/`

**Enhance or replace existing PropsConfigurator**:

1. **`PropsConfigurator.tsx`**: Main component

```typescript
// Enhance to:
// - Use new TypeAnalyzer for automatic prop discovery
// - Generate controls without enhancement files
// - Support override system for edge cases
// - Render complete working examples
// - Show multiple example variations
```

2. **`ConfigurationPanel.tsx`**: Props control panel

```typescript
// Create dynamic control panel that:
// - Groups props intelligently
// - Shows/hides advanced options
// - Indicates required vs optional props
// - Shows prop descriptions from JSDoc
// - Validates prop combinations
```

3. **`LivePreview.tsx`**: Component preview

```typescript
// Enhanced preview that:
// - Renders component with current props
// - Shows loading/error states
// - Handles async components
// - Provides responsive preview sizes
// - Includes wrapper elements when needed
```

4. **`CodeDisplay.tsx`**: Generated code display

```typescript
// Enhanced code display showing:
// - Complete working example
// - Syntax highlighting
// - Copy button with success feedback
// - Toggle between JS and TS
// - Show/hide imports and boilerplate
// - Multiple framework outputs (React, Vue, etc.)
```

5. **`ExampleTemplates.tsx`**: Pre-built examples

```typescript
// Provide common usage templates:
// - Basic usage
// - With all features
// - Common patterns
// - Accessibility-focused
// - Responsive variations
```

#### Task 3.2: Create override system

**Location**: `packages/fictoan-docs/src/lib/overrides/`

1. **`OverrideLoader.ts`**: Load override configurations

```typescript
// Check for override files and merge with auto-generated config:
// - Look for component.overrides.ts files
// - Merge manual overrides with automatic configuration
// - Validate override structure
// - Warn about unnecessary overrides
```

2. **`OverrideTypes.ts`**: TypeScript interfaces

```typescript
// Define minimal override interface:
// - Only override what's absolutely necessary
// - Support partial overrides
// - Type-safe override definitions
```

### Phase 4: Migration utilities

#### Task 4.1: Create migration tools

**Location**: `packages/fictoan-docs/src/lib/migration/`

1. **`EnhancementMigrator.ts`**: Migrate existing enhancement files

```typescript
// Analyze existing enhancement files and:
// - Identify which parts can be automated
// - Generate override files for truly custom behavior
// - Report on migration success/issues
// - Create backup of old files
```

2. **`ComponentAuditor.ts`**: Audit components for documentation

```typescript
// Scan all components and report:
// - Which components lack documentation
// - Which use old documentation system
// - Which could benefit from special handlers
// - Complexity scoring for prioritization
```

### Phase 5: Implementation strategy

#### Step-by-step implementation order

1. **Start with TypeAnalyzer**: Build robust type extraction first
2. **Test with simple components**: Badge, Button, Text
3. **Add control generation**: Map types to UI controls
4. **Implement code generation**: Start with basic examples
5. **Add special handlers**: One at a time, starting with Drawer
6. **Enhance PropsConfigurator**: Integrate all new systems
7. **Create migration tools**: Help transition existing docs
8. **Document the system**: Create developer guide

#### Testing approach

For each component type, test:

1. **Simple components** (Badge, Avatar): Basic prop mapping
2. **Form components** (Input, Select): Controlled state handling
3. **Modal components** (Drawer, Modal): Imperative API handling
4. **Layout components** (Grid, Stack): Children and composition
5. **Data components** (Table, List): Complex state and data

#### Success metrics

- **Zero-config coverage**: Percentage of components needing no manual configuration
- **Code completeness**: Generated examples run without modification
- **Migration effort**: Time to migrate existing documentation
- **Developer experience**: Time to document new component

### Phase 6: Advanced features (future)

#### Potential enhancements

1. **AI-powered descriptions**: Use component code to generate helpful descriptions
2. **Usage analytics**: Track which props are most commonly used
3. **Visual regression testing**: Automatically test all prop combinations
4. **Cross-framework generation**: Generate Vue, Angular examples from React
5. **Design token integration**: Show which design tokens affect component
6. **Accessibility validation**: Ensure examples follow best practices
7. **Performance profiling**: Show render impact of different props

## File structure after implementation

```
packages/fictoan-docs/src/
├── lib/
│   ├── type-analyzer/
│   │   ├── TypeAnalyzer.ts
│   │   ├── PropTypeInferrer.ts
│   │   ├── DefaultValueExtractor.ts
│   │   └── ComponentAnalyzer.ts
│   ├── control-generator/
│   │   ├── ControlGenerator.ts
│   │   ├── PatternMatcher.ts
│   │   └── GroupingStrategy.ts
│   ├── code-generator/
│   │   ├── CodeGenerator.ts
│   │   ├── StateAnalyzer.ts
│   │   ├── ImportResolver.ts
│   │   ├── HelperGenerator.ts
│   │   └── WrapperDetector.ts
│   ├── special-cases/
│   │   ├── DrawerHandler.ts
│   │   ├── ModalHandler.ts
│   │   ├── TooltipHandler.ts
│   │   ├── FormHandler.ts
│   │   └── TableHandler.ts
│   ├── overrides/
│   │   ├── OverrideLoader.ts
│   │   └── OverrideTypes.ts
│   └── migration/
│       ├── EnhancementMigrator.ts
│       └── ComponentAuditor.ts
├── components/
│   └── PropsConfigurator/
│       ├── PropsConfigurator.tsx
│       ├── ConfigurationPanel.tsx
│       ├── LivePreview.tsx
│       ├── CodeDisplay.tsx
│       └── ExampleTemplates.tsx
└── app/
    └── components/
        └── [component]/
            ├── page.client.tsx (auto-generated)
            └── component.overrides.ts (only if needed)
```

## Critical implementation notes

### Must-have features

1. **Complete code generation**: Every generated example must be copy-paste ready and fully functional
2. **Smart defaults**: Choose sensible defaults that showcase component features
3. **Type safety**: All generated code must be TypeScript-compliant
4. **Performance**: Cache analysis results, lazy load components
5. **Error handling**: Gracefully handle edge cases and malformed components

### Common pitfalls to avoid

1. **Don't over-engineer**: Start simple, enhance iteratively
2. **Don't break existing docs**: Support gradual migration
3. **Don't ignore edge cases**: Some components will always need special handling
4. **Don't sacrifice runtime for build time**: Balance analysis performance
5. **Don't assume patterns**: Validate assumptions with actual component analysis

### Testing checklist

Before considering implementation complete, ensure:

- [ ] All existing components can be documented
- [ ] Generated code runs without modification
- [ ] Special cases (Drawer, Modal, Tooltip) work correctly
- [ ] Override system allows customization when needed
- [ ] Performance is acceptable (< 100ms per component)
- [ ] Migration path from old system is clear
- [ ] Developer documentation is complete

## Example: Badge component automation

### Current manual configuration

```typescript
// props.enhancements.ts (SHOULD BE ELIMINATED)
export const enhancements = {
    size       : {
        group   : "Appearance",
        options : [
            {id : "size-small", value : "small", label : "small"},
            {id : "size-medium", value : "medium", label : "medium"},
            {id : "size-large", value : "large", label : "large"}
        ]
    },
    withDelete : {
        label : "Show delete button"
    }
};
```

### After automation

```typescript
// Automatically derived from Badge.tsx TypeScript definitions:
// - size: "small" | "medium" | "large" → dropdown with three options
// - withDelete: boolean → toggle switch labeled "With Delete"
// - bgColor: string → color picker with theme colors
// - children: ReactNode → text input with "Badge Text" default

// Generated complete example:
import React, { useState } from 'react';
import { Badge } from '@fictoan/fictoan-react';

export function BadgeExample() {
    const [ showDelete, setShowDelete ] = useState(false);

    const handleDelete = () => {
        console.log('Badge deleted');
        setShowDelete(false);
    };

    return (
        <Badge
            size = "medium"
    withDelete = {showDelete}
    onDelete = {handleDelete}
    bgColor = "primary"
        >
        Badge
    Text
    < /Badge>
)
    ;
}
```

## Success criteria

The implementation is successful when:

1. **90% of components** need zero manual configuration
2. **100% of generated examples** run without modification
3. **Documentation time** reduced by 80%
4. **New components** automatically get documentation
5. **Developers** prefer this over manual documentation

## Next steps

1. **Review and approve** this migration plan
2. **Prioritize phases** based on immediate needs
3. **Start with Phase 1** type extraction system
4. **Build prototype** with 3-5 representative components
5. **Iterate based on feedback** before full implementation