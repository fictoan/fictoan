# Fictoan 2.0 roadmap

A working list of what's shipping in 2.0 and beyond. Living document — edit freely as decisions change. Treat it as the to-do list for the framework.

The thesis: **lean into plain-English props as the AI-friendly UI framework**, while modernising the underlying CSS to depend more on native browser primitives and less on JavaScript. Don't chase Tailwind or Radix; build the lane Fictoan already half-owns.

---

## Recently shipped (on `beta-18`)

- [x] **Package exports** — removed broken `./components/*` subpath that pointed at JS files Vite never emitted.
- [x] **Amplify deploy path** — switched `baseDirectory` from `.next` to `out` to match Next's `output: "export"`.
- [x] **`pnpm exec tsx`** — replaced `npx tsx` in the colour-generation Vite plugin so cold builds don't need network.
- [x] **Element dead code** — removed unused `sanitizedProps` destructure.
- [x] **Row centring** — `margin-inline: auto` always applies; `max-width: 2400px` is the only thing the `:not(.allow-ultra-wide)` block governs. Row now centres in every parent.
- [x] **Viz-row overlay alignment** — `inset-inline: 0` so the IntroCode overlay centres with the main Row instead of pinning to the wrapper's left edge.
- [x] **Divider alignment with Row** — fixed broken `[class*="side-margin-"]` mobile selector; switched the `>2400px` rules to `width:auto + max-width + margin: 0 auto` so the divider lives in Row's content frame on ultrawides.
- [x] **Spacing token clamps** — wrapped `--tiny` through `--huge` in `clamp(min, vmax, max)`. Below ~1000 px viewport the tokens still scale fluidly; above that they cap, preventing the runaway-padding pathology on wide screens.
- [x] **Machine-readable schema** (`dist/fictoan-schema.json`) — auto-generated on every build, served at `https://fictoan.io/fictoan-schema.json`. Includes the universal Element props (previously filtered out by the metadata script), type-union enums, the OKLCH palette, per-component props, and a curated meta layer for 17 high-leverage components.
- [x] **`llms.txt`** — at `https://fictoan.io/llms.txt`, with the non-obvious conventions an LLM needs (British spelling, named spacing, Row/Portion grid, colour-suffix patterns) and a pointer to the JSON schema.

---

## Near-term — must land before 2.0 GA

These are the gating items. 2.0 shouldn't go stable until these are sorted.

### Quality gates

- [ ] **PR CI workflow** — separate from publish. Runs `tsc --noEmit`, `pnpm build`, and (when they exist) tests. Required check on PRs into `main`.
- [ ] **Gate publish on CI** — make the npm-publish workflow `needs:` the PR CI job. Today it builds and publishes blind.
- [ ] **Tests for high-traffic components** — Vitest + React Testing Library. Start with Button, InputField, Select, ListBox, Modal, Drawer, Tabs, Toast, Pagination, ThemeProvider. Add Playwright + axe for a11y and visual regressions once the unit set is in place.

### Correctness bugs to clear

- [ ] **ListBox controlled/uncontrolled** — `value` is accepted but internal selection state doesn't sync from it; `defaultValue` calls `onChange` but doesn't initialise the displayed selection. Surprise consumers in real forms. Fix before more people adopt v2.
- [ ] **Form component a11y audit** — pass through all form inputs to confirm `aria-describedby`, `aria-invalid`, error/helper text wiring, and label association are correct.

### Accessibility hardening

- [ ] **Modal focus management** — manual focus selection + `@ts-ignore` block at `Modal.tsx:104` should be replaced with the native `inert` attribute + `<dialog>` semantics where possible. Also: focus-trap + initial focus + restore on close.
- [ ] **Drawer scroll lock** — currently doesn't account for multiple stacked overlays. Adopt a shared lock counter or use the popover API.
- [ ] **ListBox combobox pattern** — needs `aria-activedescendant`, complete keyboard coverage, and proper `role`/`aria-controls` wiring. Scoped as a separate project from Modal/Drawer; bigger than it looks.

### TypeScript hygiene

- [ ] **ESLint flat config** — adopt the v9-style flat config.
- [ ] **`no-explicit-any`** with targeted exceptions — replace `any` escape hatches in `Element/constants.ts:105` and `utils/classNames.ts:1`.
- [ ] **Remove `@ts-ignore`** comments where the underlying type issue can be fixed (e.g. `Modal.tsx:104`).

---

## Mid-term — second half of 2.0

Once the gating items are in, these unlock real improvements.

### Element prop engine refactor

- [ ] Move utility prop mapping out of `Element.tsx`'s destructure-and-conditional pile into a typed table/helper. Each render currently destructures ~50+ props; this can be cleaner and more performant.
- [ ] Add dev-only warnings for conflicting props (e.g. `padding="medium"` + `paddingLeft="huge"` — should warn that left override wins).
- [ ] Document the universal prop set as part of the public API surface, not buried in `CommonProps`.

### CSS delivery and theming

- [ ] **Wrap library styles in `@layer fictoan`** — makes the cascade predictable when consumers add their own CSS.
- [ ] **Document import modes** — full framework CSS vs component CSS vs theme-only CSS. Today everything comes through `index.tsx:7` whether the consumer wants it or not.
- [ ] **PurgeCSS / unused-style guide** — official guidance for trimming the 584 KB raw bundle in production. Document `sideEffects` interaction.
- [ ] **Schema-driven theme tokens** — define all tokens in one TOML or JSON file. Generate the CSS variables, TS types, docs page, AND the theme configurator from the same source. Kills the heuristic variable detection in `themeConfigurator.tsx`.

### Docs site

- [ ] **Component metadata registry** — pages currently hand-roll state, code generation, and controls (e.g. `button/page.client.tsx:33`). Move toward a typed metadata registry generated from source + small curated examples.
- [ ] **Consolidate search index** — `searchIndex.js` is a large manual file at risk of drift. Generate from the same registry.
- [ ] **Bare Divider cap** — optional follow-up: if a `<Divider />` without horizontal-margin is placed at the page root, should it also cap at 2400 px? Currently spans 100% of parent. Decide and document.

---

## Strategic bets — 2.0 and beyond

The three big plays. Each requires real engineering investment, but each is a category-positioning move that's hard for competitors to copy.

### Bet 1: AI-first React UI framework

The plain-English prop model is the differentiator. Make it official.

- [x] Machine-readable component schema (shipped on `beta-18`).
- [x] `llms.txt` (shipped on `beta-18`).
- [ ] **`@fictoan/mcp` server** — an MCP server exposing tools like `list_components`, `get_prop_signature`, `find_component_by_intent`. AI assistants using Cursor / Claude / Copilot can ground completions in real schema instead of training-data approximations.
- [ ] **Tuned system-prompt snippet** — publish a paste-ready snippet for ChatGPT / Cursor / Claude Code that primes the model with Fictoan's conventions. Link from docs and `llms.txt`.
- [ ] **`llms-full.txt`** — full concatenated docs in markdown form. Requires converting some of the `page.client.tsx` docs to MDX or extracting copy programmatically.
- [ ] **Marketing positioning** — the README, homepage, and Twitter bio should lead with "the AI-friendly React UI framework." Today it's "designer-friendly", which is also true but less distinct.

### Bet 2: Decouple from React

The real Fictoan is the CSS layer + the prop-to-class engine. React is a binding.

- [ ] **Extract `@fictoan/css`** — stylesheets and class system, framework-agnostic. Make `fictoan-react` a thin wrapper that re-exports `@fictoan/css` + components.
- [ ] **Standalone prop engine** — port the Element destructure-and-classnames logic into a framework-agnostic util in `@fictoan/css`. React wrapper just calls into it.
- [ ] **Reference: `@fictoan/web-components`** — community-feasible after the split; proves the bindings work.
- [ ] **Reference: `@fictoan/preact`** or similar — same goal.

### Bet 3: Native browser primitives over JavaScript

Stop reinventing what the browser now does natively. Each item below shrinks the bundle, fixes a11y bugs by default, and ages better.

- [ ] **Modal** → native `<dialog>` + popover API + invokers. Focus management and ESC handling come for free.
- [ ] **Drawer** → same backbone as Modal; scroll lock via popover API.
- [ ] **Accordion** → `<details>` and `<details name="...">` for exclusive accordions.
- [ ] **Tooltip + popover-style menus** → CSS anchor positioning, no Floating UI / Popper.
- [ ] **Wrap library styles in `@layer fictoan`** (also listed under CSS delivery — same change).
- [ ] **Container queries** → replace `desktopSpan` / `tabletSpan` / `mobileSpan` with container-relative span variants. A Portion in a sidebar shouldn't behave like a Portion in a full-width row. Biggest *correctness* improvement to the grid system.
- [ ] **`color-mix()` for shade/opacity** → kill any JS-side colour math; everything in OKLCH via `color-mix(in oklch, ...)`.
- [ ] **View Transitions** for Drawer/Modal open-close, route changes, theme switches. ~50 lines of CSS; looks like premium product.

---

## Smaller follow-ups worth doing eventually

- [ ] **`<Slot>` primitive** — Radix-style render-as-child so `<Button as={Link} href="…">` works without prop drilling. Composability is currently a weak spot.
- [ ] **Shadcn-style CLI** — `npx fictoan add Button` as an alternative distribution mode. The plain-English prop model fits this very well because each component is small and readable.
- [ ] **Agent-UI component pack** — streaming text container, "thinking" indicator, tool-call card, citation chip, retry button. A real and growing UI category that didn't exist in 2020.
- [ ] **`stats.html` gitignore** — currently regenerated on every build and shows up as a dirty file. Add to `.gitignore`.

---

## Explicit non-goals

- **Don't add a Tailwind / utility-class mode.** Dilutes the plain-English prop philosophy, which is the AI-friendly differentiator.
- **Don't chase Radix on every primitive.** Build a dozen high-leverage ones really well rather than 60 mediocre ones.
- **Don't go fully headless.** The design opinion *is* the value. Headless logic is well-served by React Aria / Ark.
- **Don't bet the framework on any one frontend stack winning.** Hence Bet 2 above.
