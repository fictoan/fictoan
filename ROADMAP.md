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

- [x] **PR CI workflow** — `.github/workflows/ci.yml` now runs on every PR into `main` (and on direct pushes to `main` as a tripwire). Builds fictoan-react (which runs tsc + vite + schema gen) and fictoan-docs (full Next.js type-check). Doesn't touch npm. Configure as a required check via branch protection in the GitHub UI to block bad merges.
- [~] **Gate publish on CI** — `publish.yml` already runs `pnpm --filter fictoan-react build` before `npm publish`, so a broken build can't publish. What's left is making the *PR* show red before merge — handled by enabling branch protection with the new CI job as a required check (configuration step, not code).
- [ ] **Tests for high-traffic components** — Vitest + React Testing Library. Start with Button, InputField, Select, ListBox, Modal, Drawer, Tabs, Toast, Pagination, ThemeProvider. Add Playwright + axe for a11y and visual regressions once the unit set is in place. Once a `test` script exists, add a `pnpm test` step to ci.yml.

### Correctness bugs to clear

- [x] **ListBox controlled/uncontrolled** — `value` was accepted but ignored; `defaultValue` fired a spurious onChange on mount without actually initialising the displayed selection. Replaced with a proper controlled/uncontrolled split using `resolveSelectedOptions` + lazy-init internal state. Dropped redundant `selectedOption` state. `defaultValue` now typed `string | string[]`.
- [x] **Form a11y — `aria-describedby` plumbing**. FormItem now gives help/error text deterministic ids (`${baseId}-help`, `${baseId}-error`) and exposes them via `FormItemContext` plus `deriveAriaIds` helper. Every form input (InputField, TextArea, Select, Checkbox, Switch, RadioButton, RadioGroup, RadioTabGroup, CheckboxGroup, SwitchGroup, Range single + dual, FileUpload, ListBox) now generates a stable id via `useId`, passes it to FormItem as `htmlFor`, and wires `aria-describedby` on its focusable element.
- [x] **Form a11y — fill in `aria-invalid` and `aria-required`** on TextArea, Select, Checkbox, Switch, RadioButton, RadioGroup, RadioTabGroup, CheckboxGroup, SwitchGroup, Range, ListBox. All wired off `errorText`/`required`.
- [x] **ListBox `aria-activedescendant`** — combobox div now sets `aria-activedescendant` to the active option's id while open.
- [x] **RadioButton role hygiene** — dropped the duplicate `role="radio"` on the wrapper div. The native `<input type="radio">` inside provides the role; the wrapper was making AT announce two radios per RadioButton.
- [x] **PinInputField FormItem integration** — added `label`, `helpText`, `errorText`, `required`, `size` props. Wraps its custom layout in FormItem and applies `aria-describedby` / `aria-invalid` / `aria-required` on its `role="group"` div via `deriveAriaIds`. Replaced the `Math.random()` id with a stable `React.useId` fallback.
- [x] **FormItem `required` plumbing** — *the audit was wrong about this one*. `required` IS forwarded to the `<div>` and the existing CSS rule `[data-form-item][required] label::after { content: "*"; ... }` (in `form-item.css:99-113`, using `var(--input-required-indicator)` for colour) already renders the visible asterisk marker. Combined with the per-input `aria-required` wired in the previous batch, both sighted users and AT users now get the cue.

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

- [x] **Wrap library styles in `@layer fictoan`** — done; see the Bet 3 entry below for details.
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

- [x] **Modal** — already on the popover API (`Modal.tsx` uses `showPopover`/`hidePopover`/`popover="auto"|"manual"`, `::backdrop` for the dimming layer). Remaining cleanup: replace manual first-focusable focus with native focus delegation, drop the lone `@ts-ignore`, consider pairing with the new `command`/`commandfor` invokers so non-React callers don't need JS to trigger.
- [x] **Drawer** — migrated to popover API with `:popover-open` + `@starting-style` + `transition-behavior: allow-discrete` for slide animations. Native ESC and backdrop-click dismissal via `popover="auto"`. Top-layer rendering removes the z-index war. Net ~80 lines deleted from the component. (`closeOnClickOutside` deprecated; ESC and outside-click are now coupled via `isDismissible`.)
- [x] **Accordion** — already uses native `<details>` and `<summary>`. Follow-up: add support for `<details name="...">` to get exclusive-accordion behaviour with zero JS.
- [x] **Tooltip** — migrated to popover API + CSS anchor positioning (`anchor-name` / `position-anchor` / `position-area` / `position-try-fallbacks`). Drops the module-level singleton, the `react-dom/client` `createRoot` portal, the ~60-line `getBoundingClientRect` position math, and the document-level scroll/resize listeners. Each Tooltip is now an independent popover that positions itself relative to its target via CSS.
- [x] **`color-mix()` for shade/opacity** — already pervasive. Used in `theme.css` for hover/translucent variants and in `colours.css` for every opacity utility (e.g. `.bg-pink-dark80 { background-color: color-mix(in oklch, var(--pink-dark80) calc(var(--bg-opacity, 1) * 100%), transparent); }`). No JS-side colour math to remove.
- [x] **Wrap library styles in `@layer fictoan`** — the entire bundled `dist/index.css` is now wrapped in `@layer fictoan { ... }` via a new `wrapInFictoanLayer` Vite plugin. Consumer styles defined outside any layer now win cascade conflicts regardless of specificity, so overrides no longer need `!important` or higher-specificity selectors.
- [x] **Container queries** — Row is now a CSS container (`container-type: inline-size; container-name: fictoan-row`). All Portion responsive variants and the Row's portion-collapse rules switched from viewport `@media` to `@container fictoan-row` queries. A Portion in a 400px sidebar now stacks like a phone regardless of viewport size. Prop names (`mobileSpan`, `tabletPortraitSpan`, `tabletLandscapeSpan`, `desktopSpan`) keep their natural meaning but now refer to *container* size bands rather than viewport.
- [x] **View Transitions** — ThemeProvider now wraps its `documentElement.className` mutation in `document.startViewTransition()`, so consumers get a crossfade between themes for free. New `useViewTransition()` hook exported from `fictoan-react` (`flushSync` + `startViewTransition` wrapper) so consumers can animate any state change without re-doing the feature detection. Default `prefers-reduced-motion: reduce` handling added in globals.css. Drawer/Modal open-close are still done via `:popover-open` + `@starting-style` + `transition-behavior: allow-discrete` — moving them to view transitions would be a sideways step, not an improvement.
- [ ] **Accordion `name="..."` for exclusive accordions** — small follow-up from above.
- [ ] **Modal small cleanup** — see Modal note above (focus delegation, drop `@ts-ignore`, optional `command`/`commandfor` invoker support).

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
