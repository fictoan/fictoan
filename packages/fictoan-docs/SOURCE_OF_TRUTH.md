# Source of Truth Policy — Props, Docs, and Code Generation

This document answers a common question: Why do we need a type analyzer to extract props and store them separately? Can’t the component source be the single source of truth? We also want to avoid creating duplicate data.

## Decision
- The component TypeScript source is the single source of truth for props, defaults, and behavior hints.
- We will use a TypeScript-powered analyzer to read that source on demand.
- We will not persist analyzer results as a long‑lived artifact. Any metadata produced is ephemeral (in‑memory or dev‑only cache) and should be invalidated on file changes.
- Manual per-component enhancement files (props.enhancements.ts) are considered duplication and will be phased out. Minimal override files may exist for truly exceptional cases, not as a general rule.

## Rationale
- Avoid duplication: Keeping props in code + separate metadata + enhancement files leads to drift. Using the code as the single source prevents inconsistencies.
- Trust the types: The TS compiler API exposes exactly what we need—prop names, types, unions, requiredness, JSDoc, and often defaults.
- Complete examples: Analyzer output feeds a generator that produces copy‑paste‑ready examples (imports, state, helpers) without hand-written per‑component configs.
- Performance: An ephemeral cache keyed by file hash keeps re-analysis fast (< 100ms warm). No need to commit/store props data.

## What about the existing props-metadata.json?
- Today, the docs UI consumes `fictoan-react/dist/props-metadata.json` as a stopgap. Treat it as a temporary build artifact derived from source, not a separate source of truth.
- Migration will flip the flow to analyzer-first (read directly from TS) with a short-lived cache, and remove reliance on a persisted JSON file.

## Practical guidelines
- Do not check in generated props metadata meant for runtime; if a JSON snapshot is useful during development, keep it behind a dev-only flag and invalidate it when component files change.
- Prefer zero-config. Only add overrides for:
  - Non-inferrable UX (e.g., special demo scaffolding)
  - Imperative APIs where analyzer cannot safely infer interactions
  - Temporary workarounds while improving inference
- Document any override with a clear "why" and aim to delete it.

## Migration stance
- Short term: Continue using the current metadata to avoid blocking docs, but label it as transitional.
- Medium term: Introduce on-demand analysis in docs (no persisted store), with in-memory caching.
- Long term: Remove any persisted props metadata and eliminate manual enhancements where possible.

## Success criteria
- 0 long-lived, committed props metadata artifacts in the repo
- 90%+ of components documented without manual overrides
- Analyzer re-run under warm cache < 100ms per component

See also: MIGRATION_ROADMAP.md and PROPS_CONFIG_MIGRATION.md for the step-by-step plan.
