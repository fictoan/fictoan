# Fictoan React 2.0 - Upgrade Todo List

> **Comprehensive modernisation roadmap for version 2.0**
>
> **Status:** In Progress
> **Last Updated:** 15 December 2025

---

## Progress Overview

**Completed:** 10/40 items (25%)
**In Progress:** 0
**Remaining:** 30

---

## ✅ Completed Items

### Build and Performance
- [x] Remove Babel transform, use native Vite/esbuild (75-80% faster builds)
- [x] Switch from terser to esbuild minifier
- [x] Enable production sourcemaps
- [x] Update TypeScript config (ES2022 + automatic JSX)
- [x] Update core dependencies (React 18.3, Vite 6, TypeScript 5.9)
- [x] Add `displayName` to all 52 components

### Accessibility
- [x] Add `prefers-reduced-motion` media query support

### Component API Modernisation
- [x] Replace imperative Modal/Drawer APIs with declarative (`isOpen` + `onClose`)
- [x] Remove `showModal()`, `hideModal()`, `toggleModal()` functions
- [x] Remove `showDrawer()`, `hideDrawer()`, `toggleDrawer()` functions

### Type Safety
- [x] Standardise event handler types (InputEventHandler, ValueChangeHandler)

**Build Time:** 8-10s → 2s (80% improvement) ✅

---

## 🔴 Critical Priority (Must Do for 2.0)

### Testing Infrastructure (32h)
**Status:** Not started
**Blocker:** Without tests, other refactoring is risky

- [ ] **Set up Vitest + React Testing Library** (8h)
  - Install dependencies
  - Create `vitest.config.ts`
  - Create `src/test/setup.ts`
  - Add test scripts to package.json

- [ ] **Write tests for 10 core components** (24h)
  - Button (3h)
  - InputField (4h)
  - Modal (3h)
  - Drawer (3h)
  - Card (2h)
  - Select (3h)
  - Checkbox/Switch (3h)
  - Table (3h)

**Why Critical:**
- Enables confident refactoring
- Documents expected behaviour
- Catches regressions
- Required for CI/CD

---

### Component API Modernisation (12h)
**Status:** ✅ COMPLETED (Partially - Modal/Drawer done, @ts-ignore remains)

- [x] **Replace imperative Modal/Drawer APIs with declarative** (8h)
  - ✅ Changed `showModal(id)` to `isOpen` prop
  - ✅ Changed `hideModal(id)` to `onClose` callback
  - ✅ Updated Modal and Drawer components
  - ✅ Removed all imperative functions from exports
  - ✅ Migration guide added to CHANGELOG

- [ ] **Remove all `@ts-ignore` comments** (4h)
  - Fix Modal popover types (`src/components/Modal/Modal.tsx:71`)
  - Add proper type definitions
  - Find and fix any other instances

---

### CSS Bundle Optimisation (12h)
**Status:** Not started
**Impact:** 90% smaller CSS bundle

- [ ] **Implement CSS tree-shaking for colours.css** (8h)
  - Add PurgeCSS or similar
  - Configure to analyse component usage
  - Test with production builds
  - Verify no colours are lost

- [ ] **Add CSS @layer for cascade control** (4h)
  - Define layers: reset, base, components, utilities
  - Wrap existing CSS in appropriate layers
  - Remove unnecessary `!important` usage

**Why Critical:**
- 1.8MB → ~200KB CSS (90% reduction)
- Faster page loads
- Better developer experience
- Industry standard for 2025

---

## 🟡 High Priority (Should Do for 2.0)

### Developer Experience (12h)

- [ ] **Add ESLint + Prettier** (4h)
  - Install dependencies
  - Create `eslint.config.js` (flat config)
  - Create `.prettierrc`
  - Add lint scripts
  - Configure rules (no `any`, react-hooks, etc.)

- [ ] **Set up pre-commit hooks** (2h)
  - Install husky + lint-staged
  - Configure to run lint + format + tests
  - Test hook workflow

- [ ] **Add Changesets for version management** (2h)
  - Install `@changesets/cli`
  - Run `pnpm changeset init`
  - Document changeset workflow
  - Integrate with release process

- [ ] **Add bundle size monitoring** (2h)
  - Install `@size-limit/preset-small-lib`
  - Configure size limits in package.json
  - Add size check to CI

- [ ] **Fix loose `any` types** (2h)
  - Fix `src/utils/classNames.ts`
  - Find and fix other `any` usage
  - Enable `@typescript-eslint/no-explicit-any` rule

### Type Safety
- [x] **Standardise event handler types** (6h) ✅
  - ✅ Created explicit `InputEventHandler` type (event-based)
  - ✅ Created explicit `ValueChangeHandler` type (value-based)
  - ✅ Created explicit `InputFocusHandler` type
  - ✅ Removed ambiguous `FlexibleEventHandler` from ElementProps
  - ✅ Updated BaseInputComponent to use explicit types
  - ✅ Removed runtime type checking from form components
  - ✅ Updated all form components to use correct handler types

---

### Documentation (18h)

- [ ] **Add JSDoc to all public components** (16h)
  - Document all props with descriptions
  - Add usage examples
  - Document return types
  - ~52 components × 20 min each

- [ ] **Create MIGRATION-v2.md guide** (2h)
  - Document breaking changes
  - Provide migration examples
  - Add before/after comparisons

---

## 🟢 Medium Priority (Nice to Have for 2.0)

### Component Architecture (12h)

- [ ] **Add compound component patterns** (12h)
  - Card (Header, Body, Footer)
  - Form (Field, Label, Error, Help)
  - Table (Header, Body, Footer, Row, Cell)
  - Sidebar (Header, Body, Footer, Item)
  - Maintain backward compatibility where possible

---

### CSS Architecture (12h)

- [ ] **Add CSS Modules for component scoping** (8h)
  - Convert component CSS to `.module.css`
  - Update imports in components
  - Test scoping works
  - Maintain data attribute pattern

- [ ] **Namespace data attributes** (4h)
  - Change `[data-button]` to `[data-fictoan-button]`
  - Prevents conflicts with other libraries
  - Update all components and CSS
  - **Breaking change:** CSS selectors change

---

### Performance Optimisation (10h)

- [ ] **Optimise Element prop extraction** (6h)
  - Create `extractUtilityProps()` utility
  - Add memoisation
  - Update Element component
  - Measure performance improvement

- [ ] **Add React.memo to heavy components** (4h)
  - Table
  - CodeBlock
  - Skeleton
  - Add custom comparison functions

---

### Build Configuration (12h)

- [ ] **Add code splitting** (4h)
  - Configure manual chunks (forms, layout, ui)
  - Test tree-shaking works
  - Measure bundle size impact

- [ ] **Migrate to Lightning CSS** (8h)
  - Install lightningcss
  - Configure Vite to use it
  - Test build output
  - Verify CSS compatibility

---

## 🔵 Low Priority (Post-2.0)

### Advanced Features (40h+)

- [ ] **Set up Storybook** (16h)
  - Install and configure
  - Create stories for all components
  - Add interactive controls
  - Deploy to static site

- [ ] **Add Playwright for visual tests** (6h)
  - Install @playwright/test
  - Create visual regression tests
  - Set up screenshot comparison
  - Integrate with CI

- [ ] **Add accessibility tests** (8h)
  - Install @axe-core/playwright
  - Test all components for WCAG 2.1
  - Fix found issues
  - Add to CI pipeline

- [ ] **Set up GitHub Actions CI/CD** (8h)
  - Create workflow files
  - Run tests on PR
  - Run bundle size checks
  - Automated npm publishing

- [ ] **Achieve 80% test coverage** (40h)
  - Test all remaining components
  - Test edge cases
  - Test accessibility
  - Test responsive behaviour

---

### Documentation (16h)

- [ ] **Create CONTRIBUTING.md** (2h)
  - Code style guide
  - PR process
  - Development setup
  - Testing requirements

- [ ] **Add Architecture Decision Records** (4h)
  - ADR 001: Why plain CSS over CSS-in-JS
  - ADR 002: Why data attributes
  - ADR 003: Why designer-friendly props
  - ADR 004: Why 24-column grid

- [ ] **Add component API improvement guide** (10h)
  - Document ideal patterns
  - Show migration paths
  - Provide examples

---

### Advanced CSS (14h)

- [ ] **Add container queries** (6h)
  - Replace media queries where appropriate
  - Add responsive typography
  - Test browser support

- [ ] **Implement CSS Houdini features** (8h)
  - Custom properties API
  - Paint API for effects
  - Animation worklets

---

## Breakdown by Category

### By Effort
- **Quick (≤4h):** 15 items
- **Medium (5-8h):** 12 items
- **Large (≥12h):** 7 items

### By Impact
- **High Impact:** 18 items
- **Medium Impact:** 12 items
- **Low Impact:** 4 items

### By Type
- **Breaking Changes:** 3 items (Modal/Drawer API, CSS namespacing, event handlers)
- **Non-Breaking:** 31 items
- **Documentation:** 6 items

---

## Recommended Implementation Order

### Week 1-2: Foundation (Critical)
1. Set up Vitest + RTL (8h)
2. Write tests for 10 core components (24h)
3. ESLint + Prettier (4h)
4. Pre-commit hooks (2h)

**Total:** 38h

---

### Week 3-4: Core Improvements (High)
5. ✅ Replace imperative APIs (8h) ⚠️ Breaking - DONE
6. Remove `@ts-ignore` (4h)
7. Optimise colours.css (8h)
8. Add CSS @layer (4h)
9. Changesets setup (2h)
10. Bundle size monitoring (2h)

**Total:** 28h (8h completed, 20h remaining)

---

### Week 5-6: Enhancement (Medium)
11. Add JSDoc to components (16h)
12. Add compound components (12h)
13. ✅ Standardise event handlers (6h) ⚠️ Breaking - DONE
14. Migration guide (2h)
15. Fix loose `any` types (2h)

**Total:** 38h (6h completed, 32h remaining)

---

### Week 7-8: Polish (Medium-Low)
16. CSS Modules (8h)
17. Optimise Element performance (6h)
18. Add React.memo (4h)
19. Code splitting (4h)
20. Contributing guide (2h)

**Total:** 24h

---

### Post-2.0 Release
21. Storybook (16h)
22. CI/CD pipeline (8h)
23. Playwright tests (6h)
24. Accessibility tests (8h)
25. Lightning CSS migration (8h)
26. 80% test coverage (40h)

**Total:** 86h

---

## Total Effort Estimate

**Completed So Far:** 28h (Build: 6h, API: 8h, Types: 6h, Docs: 8h)

**For 2.0 Release (Remaining):**
- Critical: 48h (56h - 8h completed)
- High: 22h (28h - 6h completed)
- Medium: 56h (62h - 6h completed)
- **Total: 126 hours remaining** (~3-4 weeks for 1 developer)

**Post-2.0:**
- Low priority: 86h (~2-3 weeks)

**Grand Total: 232 hours** (28h completed, 204h remaining)

---

## Breaking Changes Summary

### API Changes (Major)
1. **Modal/Drawer:** Imperative → Declarative
   ```typescript
   // Old (1.x)
   showModal("myModal");

   // New (2.0)
   const [isOpen, setIsOpen] = useState(false);
   <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} />
   ```

2. **Event Handlers:** Flexible → Explicit ✅ DONE
   ```typescript
   // Old (1.x) - Ambiguous union types
   onChange: FlexibleEventHandler  // Could be event OR value

   // New (2.0) - Explicit types
   onChange: InputEventHandler      // ALWAYS event
   onValueChange: ValueChangeHandler // ALWAYS value
   ```

   **Note:** User-facing API already uses value-based onChange (since v1.11.0).
   This change clarifies internal types and removes runtime type checking.

### CSS Changes (Minor)
3. **Data Attributes:** Optional namespacing
   ```css
   /* Old (1.x) */
   [data-button] { }

   /* New (2.0) - Optional */
   [data-fictoan-button] { }
   ```

---

## Dependencies for 2.0

### Testing
```bash
pnpm add -D vitest @vitest/ui \
  @testing-library/react \
  @testing-library/jest-dom \
  @testing-library/user-event \
  jsdom
```

### Linting
```bash
pnpm add -D eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin \
  eslint-plugin-react eslint-plugin-react-hooks \
  prettier eslint-config-prettier
```

### Tooling
```bash
pnpm add -D @changesets/cli \
  @size-limit/preset-small-lib \
  husky lint-staged
```

### CSS Optimisation
```bash
pnpm add -D @fullhuman/postcss-purgecss
# Or
pnpm add -D lightningcss
```

---

## Success Metrics

### Before 2.0 (Current)
- Build Time: 8-10s
- Bundle Size (CSS): 1.8MB
- Test Coverage: 0%
- Type Safety: B
- Documentation: Minimal

### After 2.0 (Target)
- Build Time: ~2s (✅ Achieved!)
- Bundle Size (CSS): ~200KB (90% reduction)
- Test Coverage: 80%+
- Type Safety: A
- Documentation: Comprehensive

### DX Improvements
- React DevTools: Proper component names (✅ Achieved!)
- Build Speed: 80% faster (✅ Achieved!)
- Debugging: Sourcemaps available (✅ Achieved!)
- Accessibility: prefers-reduced-motion support (✅ Achieved!)
- Type Safety: Explicit event handler types (✅ Achieved!)
- Declarative component APIs (✅ Achieved!)
- Code Quality: ESLint + Prettier enforced (pending)
- Type Safety: No loose `any` types (pending)

---

## Risk Assessment

### Low Risk (Can do anytime)
- ESLint/Prettier setup
- JSDoc documentation
- Bundle size monitoring
- Changesets setup
- CSS @layer
- React.memo additions

### Medium Risk (Need tests first)
- Compound components
- Event handler changes
- Element performance optimisation
- CSS Modules migration

### High Risk (Breaking changes)
- Modal/Drawer API changes
- Event handler standardisation
- Data attribute namespacing

**Recommendation:** Complete testing infrastructure before any high-risk changes.

---

## Notes

### What We Learned
- `React.LegacyRef` is **correct** for polymorphic components (Element, BaseInputComponent)
- Don't change it to `ForwardedRef` - it will break type compatibility
- Build-time CSS approach is a key strength, not a weakness
- Designer-friendly API is unique value proposition - preserve it

### Philosophy to Maintain
- ✅ Designer-friendly plain-English props
- ✅ Zero runtime overhead (no CSS-in-JS)
- ✅ Comprehensive theming via CSS variables
- ✅ Data attribute component identity
- ✅ Dual US/UK spelling support

### What Can Change
- ✅ Imperative APIs → Declarative (DONE - breaking)
- ⚠️ Massive colours.css → Tree-shaken (pending - non-breaking)
- ⚠️ Limited composition → Compound components (pending - additive)
- ✅ Ambiguous event handlers → Explicit types (DONE - non-breaking improvement)

---

## Quick Reference

### Already Completed ✅
- Babel removal
- TypeScript modernisation (ES2022 + automatic JSX)
- Dependency updates (React 18.3, Vite 6, TypeScript 5.9)
- displayName addition (all 52 components)
- Minifier switch (terser → esbuild)
- Production sourcemaps
- prefers-reduced-motion support
- **Declarative Modal/Drawer APIs** ⚠️ Breaking
- **Explicit event handler types** (InputEventHandler, ValueChangeHandler)

### Do Next (Ordered)
1. **Vitest setup** (8h) - Foundation for everything else
2. **ESLint + Prettier** (4h) - Code quality
3. **Write 10 component tests** (24h) - Safety net
4. **Optimise colours.css** (8h) - Bundle size (1.8MB → 200KB)
5. **Remove `@ts-ignore`** (4h) - Type safety

### Can Skip for 2.0 (Post-release)
- Storybook
- CI/CD (can be manual for now)
- 80% coverage (start with critical paths)
- Lightning CSS migration
- Container queries
- CSS Modules (optional)

---

**Next Action:** Set up Vitest + React Testing Library to enable safe refactoring of remaining items.
