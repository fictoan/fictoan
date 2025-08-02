Product Requirements Document: Props Configurator Refactoring

Overview

Refactor the existing props configurator system in the Fictoan documentation to create a more maintainable, type-safe, and extensible solution for interactive component documentation.

Current Problems

1. Hardcoded edge cases - Component-specific logic scattered throughout the generic configurator
2. Poor maintainability - 560+ lines of complex, nested conditionals
3. Confusing abstractions - Generic "strings" prop that maps to different actual props
4. Limited extensibility - Adding new components requires modifying core logic
5. No type safety - JavaScript implementation with no TypeScript support

Goals

- Create a plugin-based architecture for component configurations
- Eliminate hardcoded component-specific logic from core
- Provide full TypeScript support
- Maintain backward compatibility
- Improve developer experience

Implementation Phases

Phase 1: Core Architecture (Week 1)

Goal: Build the foundation for the new system

1. Create TypeScript interfaces
   // packages/fictoan-docs/src/utils/propsConfigurator/types.ts
   interface ComponentRegistry
   interface PropDefinition
   interface CodeGeneratorPlugin
   interface ControlRenderer
2. Build core configurator engine
   // packages/fictoan-docs/src/utils/propsConfigurator/core.tsx
- Generic state management
- Control rendering delegation
- Plugin system integration
3. Create control components library
   // packages/fictoan-docs/src/utils/propsConfigurator/controls/
- TextControl.tsx
- SelectControl.tsx
- RadioTabControl.tsx
- CheckboxControl.tsx
- ColorPickerControl.tsx
4. Implement code generator system
   // packages/fictoan-docs/src/utils/propsConfigurator/codeGenerator.ts
- Base code generator
- Import management
- JSX formatting utilities

Phase 2: Component Migration (Week 2)

Goal: Migrate existing components to new system

1. Create component configurations
   // packages/fictoan-docs/src/utils/propsConfigurator/components/
- Button.config.ts
- Card.config.ts
- Badge.config.ts
- Tooltip.config.ts (complex example)
- Drawer.config.ts (complex example)
2. Build migration adapter
   // packages/fictoan-docs/src/utils/propsConfigurator/migrate.ts
- Backward compatibility layer
- Gradual migration support
3. Update component pages
   - Start with simple components (Button, Card)
   - Move to complex ones (Tooltip, Drawer)
   - Ensure feature parity

Phase 3: Enhanced Features (Week 3)

Goal: Add new capabilities

1. Advanced prop types
   - Array props with add/remove UI
   - Object props with nested controls
   - Custom validation rules
   - Conditional prop visibility
2. Live code preview
   - Real-time code updates
   - Syntax highlighting improvements
   - Copy button enhancements
3. Preset system
   - Save/load prop combinations
   - Share configurations via URL
   - Common presets library
4. Developer tools
   - Props documentation generator
   - TypeScript prop types extraction
   - Validation helpers

Phase 4: Documentation & Polish (Week 4)

Goal: Complete the migration

1. Documentation
   - Migration guide for remaining components
   - Component configuration best practices
   - Plugin development guide
2. Testing
   - Unit tests for core functionality
   - Integration tests for each component
   - Visual regression tests
3. Performance optimization
   - Code splitting for component configs
   - Lazy loading of controls
   - Memoization improvements
4. Cleanup
   - Remove old propsConfigurator.js
   - Update all component pages
   - Archive legacy code

Success Metrics

- 50% reduction in configurator code size
- Zero hardcoded component logic in core
- 100% TypeScript coverage
- All existing components migrated
- No breaking changes for users

Technical Requirements

- TypeScript 5.x
- React 18+
- Maintain existing UI/UX
- Browser compatibility (last 2 versions)

Risks & Mitigation

- Risk: Breaking existing functionality
    - Mitigation: Comprehensive testing, gradual rollout
- Risk: Performance regression
    - Mitigation: Performance benchmarks, optimization phase
- Risk: Developer adoption
    - Mitigation: Clear documentation, migration tools