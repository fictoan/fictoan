// Per-file matcher types for the test suite.
//
// Test files live in the editor's "inferred" TS project (they are excluded from
// tsconfig.json so the library build never compiles them), which does NOT load
// vitest.setup.ts. So the custom-matcher TYPES have to be pulled into each test
// file's own program. Importing this module once per test file does that:
//   - "@testing-library/jest-dom/vitest" augments vitest's Assertion with the
//     jest-dom matchers (toHaveClass, toHaveAttribute, toHaveStyle, …);
//   - the declare-module below adds vitest-axe's toHaveNoViolations (vitest-axe
//     0.1.0 only augments the legacy `Vi` global namespace, which vitest 3's
//     module-based Assertion does not pick up).
// The runtime extension itself happens in vitest.setup.ts; this file is only
// about types (its imports are side-effect-free at runtime beyond what setup
// already does).
import "@testing-library/jest-dom/vitest";
import type { AxeMatchers } from "vitest-axe/matchers";

declare module "vitest" {
    interface Assertion extends AxeMatchers {}
    interface AsymmetricMatchersContaining extends AxeMatchers {}
}
