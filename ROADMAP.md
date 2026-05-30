# Fictoan 2.0 roadmap

A working list of what's shipping in 2.0 and beyond. Living document — edit freely as decisions change. Treat it as the
to-do list for the framework.

The thesis: **lean into plain-English props as the AI-friendly UI framework**, while modernising the underlying CSS to
depend more on native browser primitives and less on JavaScript. Don't chase Tailwind or Radix; build the lane Fictoan
already half-owns.

---

## Recently shipped (on `beta-18`)

- [x] **Package exports** — removed broken `./components/*` subpath that pointed at JS files Vite never emitted.
- [x] **Amplify deploy path** — switched `baseDirectory` from `.next` to `out` to match Next's `output: "export"`.
- [x] **`pnpm exec tsx`** — replaced `npx tsx` in the colour-generation Vite plugin so cold builds don't need network.
- [x] **Element dead code** — removed unused `sanitizedProps` destructure.
- [x] **Row centring** — `margin-inline: auto` always applies; `max-width: 2400px` is the only thing the
  `:not(.allow-ultra-wide)` block governs. Row now centres in every parent.
- [x] **Viz-row overlay alignment** — `inset-inline: 0` so the IntroCode overlay centres with the main Row instead of
  pinning to the wrapper's left edge.
- [x] **Divider alignment with Row** — fixed broken `[class*="side-margin-"]` mobile selector; switched the `>2400px`
  rules to `width:auto + max-width + margin: 0 auto` so the divider lives in Row's content frame on ultrawides.
- [x] **Spacing token clamps** — wrapped `--tiny` through `--huge` in `clamp(min, vmax, max)`. Below ~1000 px viewport
  the tokens still scale fluidly; above that they cap, preventing the runaway-padding pathology on wide screens.
- [x] **Machine-readable schema** (`dist/fictoan-schema.json`) — auto-generated on every build, served at
  `https://fictoan.io/fictoan-schema.json`. Includes the universal Element props (previously filtered out by the
  metadata script), type-union enums, the OKLCH palette, per-component props, and a curated meta layer for 17
  high-leverage components.
- [x] **`llms.txt`** — at `https://fictoan.io/llms.txt`, with the non-obvious conventions an LLM needs (British
  spelling, named spacing, Row/Portion grid, colour-suffix patterns) and a pointer to the JSON schema.

---

## Near-term — must land before 2.0 GA

These are the gating items. 2.0 shouldn't go stable until these are sorted.

### Quality gates

- [x] **PR CI workflow** — `.github/workflows/ci.yml` now runs on every PR into `main` (and on direct pushes to `main`
  as a tripwire). Builds fictoan-react (which runs tsc + vite + schema gen) and fictoan-docs (full Next.js type-check).
  Doesn't touch npm. Configure as a required check via branch protection in the GitHub UI to block bad merges.
- [~] **Gate publish on CI** — `publish.yml` already runs `pnpm --filter fictoan-react build` before `npm publish`, so a
  broken build can't publish. What's left is making the *PR* show red before merge — handled by enabling branch
  protection with the new CI job as a required check (configuration step, not code).
- [ ] **Tests for high-traffic components** — Vitest + React Testing Library. Start with Button, InputField, Select,
  ListBox, Modal, Drawer, Tabs, Toast, Pagination, ThemeProvider. Add Playwright + axe for a11y and visual regressions
  once the unit set is in place. Once a `test` script exists, add a `pnpm test` step to ci.yml. Starting state: the
  `test` script is still the `exit 1` stub (`package.json`), there are zero specs, and CI runs no tests. Make a
  per-component `axe()` smoke test an explicit *early* deliverable — most of the a11y bugs found in the audit below
  (duplicate ids, unlabelled buttons, redundant `aria-value*`, nested live regions, dangling IDREFs) are exactly what
  axe catches automatically.
- [x] **Broken published types entry** — `package.json` pointed `types`/`exports.types` at `./dist/types/index.d.ts`,
  which the build never produced (the real declarations land at `./dist/index.d.ts`), so every TS consumer of the beta
  got *no* types — gutting the IDE/AI-friendly thesis. Two compounding causes: `vite.config.js` used the misspelled
  `outputDir` instead of `outDir`, and `tsconfig.json`'s `declarationDir` never fired because `composite: true` makes
  plain `tsc` a no-op. Fixed by re-pointing both fields at `./dist/index.d.ts` and dropping the dead `dist/types` from
  `files`. Follow-up: add a postbuild assertion that the declared types file exists so this can't silently regress.
- [~] **Build/release hygiene** — npm-path cleanups. *Done:* removed the malformed `"use client;"` rollup banner
  (`vite.config.js`; the real directive comes from `preserveUseClient`), the dead `build:umd` script + the
  `build:props-metadata` call in `scripts/rebuild.sh`, and the stale `$colour` alias. *Still open:* `sourcemap: true`
  (`vite.config.js`) + tsconfig `sourceMap`/`declarationMap` ship ~110 `.map` files in `npm pack` — prune via
  `.npmignore` (keeps local debug maps) rather than killing emission; and drop the unused devDeps
  `vite-plugin-lib-inject-css` + `@fullhuman/postcss-purgecss` (needs a lockfile update).

### Correctness bugs to clear

- [x] **ListBox controlled/uncontrolled** — `value` was accepted but ignored; `defaultValue` fired a spurious onChange
  on mount without actually initialising the displayed selection. Replaced with a proper controlled/uncontrolled split
  using `resolveSelectedOptions` + lazy-init internal state. Dropped redundant `selectedOption` state. `defaultValue`
  now typed `string | string[]`.
- [x] **Form a11y — `aria-describedby` plumbing**. FormItem now gives help/error text deterministic ids (
  `${baseId}-help`, `${baseId}-error`) and exposes them via `FormItemContext` plus `deriveAriaIds` helper. Every form
  input (InputField, TextArea, Select, Checkbox, Switch, RadioButton, RadioGroup, RadioTabGroup, CheckboxGroup,
  SwitchGroup, Range single + dual, FileUpload, ListBox) now generates a stable id via `useId`, passes it to FormItem as
  `htmlFor`, and wires `aria-describedby` on its focusable element.
- [x] **Form a11y — fill in `aria-invalid` and `aria-required`** on TextArea, Select, Checkbox, Switch, RadioButton,
  RadioGroup, RadioTabGroup, CheckboxGroup, SwitchGroup, Range, ListBox. All wired off `errorText`/`required`.
- [x] **ListBox `aria-activedescendant`** — combobox div now sets `aria-activedescendant` to the active option's id
  while open.
- [x] **RadioButton role hygiene** — dropped the duplicate `role="radio"` on the wrapper div. The native
  `<input type="radio">` inside provides the role; the wrapper was making AT announce two radios per RadioButton.
- [x] **PinInputField FormItem integration** — added `label`, `helpText`, `errorText`, `required`, `size` props. Wraps
  its custom layout in FormItem and applies `aria-describedby` / `aria-invalid` / `aria-required` on its `role="group"`
  div via `deriveAriaIds`. Replaced the `Math.random()` id with a stable `React.useId` fallback.
- [x] **FormItem `required` plumbing** — *the audit was wrong about this one*. `required` IS forwarded to the `<div>`
  and the existing CSS rule `[data-form-item][required] label::after { content: "*"; ... }` (in `form-item.css:99-113`,
  using `var(--input-required-indicator)` for colour) already renders the visible asterisk marker. Combined with the
  per-input `aria-required` wired in the previous batch, both sighted users and AT users now get the cue.
- [x] **Portion `span=7` responsive variants were dead** — in `portion.css` the responsive twins for span-7 carried a
  stray space after the hex escape (`&.\000037 -on-mobile`, plus the tablet-portrait/landscape twins). Because
  postcss-nesting substitutes `&` → `[data-portion]`, that space survived in the built `dist/index.css` as a *descendant
  combinator* (`.\000037[data-portion] -on-mobile`), so `mobileSpan="7"` / `tabletPortraitSpan="7"` /
  `tabletLandscapeSpan="7"` silently got no `grid-column: span 7` in 3 of 4 breakpoint bands. Fixed by deleting the
  single space in those three rules (verified against the span-6 twins, which build correctly). The base digit
  selectors' trailing spaces (before the block brace) are harmless and were left alone.
- [ ] **ThemeProvider SSR un-gate + docs prerender-safety** *(paired effort — attempted, reverted)* —
  `ThemeProvider.tsx:114` renders `{shouldRender && children}` where `shouldRender` starts `false` and only flips in a
  post-mount effect, so server/SSG render emits an empty `data-theme-provider` div, blanking the *entire* wrapped app
  (incl. the docs) — a full SSR/SEO outage. The library fix is small (render children unconditionally + a pre-hydration
  no-flash inline script replicating `getStorageKey()`; optional `nonce` for strict CSP). **But it can't land alone:**
  the gate had made the docs effectively client-only, so un-gating surfaces a *cascade* of pre-existing prerender bugs
  in the docs — render-time `getComputedStyle` in `useThemeVariables` (28 pages), `cssVariablesList is not defined` on
  `/template`, etc. Land as one effort: the ~10-line library un-gate **plus** a docs prerender-safety pass (guard the
  theme-config utils + audit every prerendered page). Reverted for now to keep the docs build/CI green.
- [x] **`fontStyle="sans-serif"` is dead** — Text/Heading emit the class `font-sans-serif` by default, but
  `typography.css` only defined `.font-sans`, so the default font class was a no-op (it only worked via the inherited
  body font). Renamed the rule to `.font-sans-serif` (it was otherwise unused — verified).
- [ ] **FormItemGroup `Math.random()` id** — `FormItemGroup.tsx:40` derives its fallback id from `Math.random()`, which
  is non-deterministic across server/client and causes hydration mismatches (the docs are Next). Every other form
  component uses `React.useId` for exactly this reason — including PinInputField (the fix above). Replace with `useId`
  (called unconditionally, colons stripped) to match `FormItem`/`InputField`.
- [ ] **Breadcrumbs leaks props onto a raw `<nav>`** — `Breadcrumbs.tsx:106` renders `<nav ... {...props}>` where
  `props` is `CommonAndHTMLProps`, so Fictoan universal props (`bgColour`, `classNames`, `margin`, `padding`, `shadow`,
  responsive flags) become invalid DOM attributes (React warns) or silently no-op. Route the outer nav through Element
  (`<Element as="nav" ...>`) like Card/Accordion/Tabs/Pagination, honouring the universal-prop guarantee.
- [ ] **Callout `title` is invisible** — `Callout.tsx:39` exposes `title` only as an `aria-label` and never renders it,
  so sighted users never see the callout title the API implies. Render `title` as a visible heading (conditionally),
  switch to `aria-labelledby` pointing at it (precedent: `Tabs.tsx:152`), add title styling to `callout.css` (none
  exists), and document the prop on the docs page (its absence there is why this went unnoticed).
- [ ] **Modal mutates the caller's `classNames`** — `Modal.tsx:35,50` destructures `classNames` from props then calls
  `classNames.push("show-backdrop")`, mutating the consumer's array in place (classes accumulate if the reference is
  reused across renders). Build a fresh array (`[...classNames]`) before pushing, matching the safe idiom Drawer and
  SkeletonGroup already use. Audited — Modal is the only offender.
- [ ] **Notification exit always slides right** — `notification-item.css` hardcodes the dismiss transform to
  `translateX(100%)`, but `NotificationsWrapper` supports `position="left"` with no left override, so a left-anchored
  notification slides the wrong way on dismiss. Add a `position="left"` override mirroring how Toast already varies by
  anchor (`toast-item.css`). Optionally tie the 500 ms fallback timer (`NotificationItem.tsx`) to the `0.4s` CSS
  duration to kill the duplicated magic number.

### Accessibility hardening

- [ ] **Modal/Drawer `aria-modal="true"` is a false promise** *(merges the old "Modal focus management" + "Drawer
  scroll lock" items)* — both render a popover with `aria-modal="true"` (`Modal.tsx:108`, `Drawer.tsx:113`), but a
  popover provides no focus-trap, no sibling `inert`, and no scroll-lock, so Tab escapes behind the overlay, the
  background scrolls, and AT is told it's modal when it isn't. Modal also calls `showPopover()` not `showModal()` and
  uses a brittle first-focus querySelector (`Modal.tsx:67-72`) that ignores disabled controls and `autofocus`. Treat as
  one decision spanning both: either `dialog.showModal()` (native focus-trap + inert + `::backdrop`, but loses native
  backdrop-click dismissal — re-add outside-click JS) or keep popover + add `inert` on siblings + scroll-lock. Preserve
  the `@starting-style` animations and `prefers-reduced-motion`. (The `@ts-ignore` part of the old item is already done —
  commit `a913305` removed all `@ts-ignore`; only the focus-delegation work remains.)
- [x] **Focus ring failed non-text contrast** — `globals.css` set `--global-focus-colour` to `--blue` at 60% opacity
  (`color-mix(..., transparent 40%)`), which measured ~2.2:1 over white and ~2.4:1 over black — both below the WCAG 2.2
  SC 1.4.11 floor of 3:1, on *every* focusable element in the framework. Fixed by dropping the `color-mix` and using
  opaque `var(--blue)` (what the prior build shipped; passes at ~4:1 / ~5:1).
- [ ] **ListBox keyboard-open + `aria-activedescendant` defects** — the combobox div (`ListBox.tsx:298-313`,
  `role="combobox"` `tabIndex=0`) has only `onClick` and no `onKeyDown`, so a keyboard-only user who focuses the *closed*
  ListBox can't open it; `handleKeyDown` is attached solely to the inner search input that mounts only when open. Add
  open-key handling (ArrowDown/Enter/Space) to the combobox div, guarded with `!isOpen` to avoid double-handling the
  bubbling search-input keydown. Separately, `aria-activedescendant` is set on the combobox div (`:307`) but focus moves
  to the search input when open, so it sits on a non-focused element — move it onto the search input. **This reopens the
  shipped `aria-activedescendant` item** (above) whose placement is wrong. (This is the concrete content of the old
  "ListBox combobox pattern" item — it remains a separate project from Modal/Drawer.)
- [~] **RadioGroup duplicate radio role** — *done:* removed the wrapper `<Div role="radio" aria-checked>` around each
  native radio (`RadioGroup.tsx`), so AT no longer announces two radios per option; the native input carries the role +
  checked state and the CSS styles off `input:checked`. *Still open:* the option-id fallback uses the raw `id` prop
  instead of the stable group id at `RadioGroup.tsx:93`, `CheckboxAndSwitchGroup.tsx:149,274`, and
  `RadioTabGroup.tsx:217` — switch all four to `finalGroupId`.
- [x] **`hideLabel` is a no-op** — fixed end-to-end: added `hideLabel` to `FormItemProps`, forwarded it through FormItem
  to InputLabel, passed it from InputField/TextArea/Checkbox/Switch, and changed InputLabel to push `.sr-only` (it
  previously pushed the non-existent `visually-hidden`). A visually-hidden but screen-reader-announced label now works.
- [ ] **Range group label IDREF dangles** — both SingleThumbRange and DualThumbRange set
  `aria-labelledby` to a `{finalId}-label` id on the `role="group"` wrapper (`Range.tsx:265,516`) but nothing renders an
  element with that id (the InputLabel has `htmlFor` but no `id`), so the accessible name resolves to nothing and axe
  flags the dangling reference. Add the matching `id` to those InputLabels (InputLabel already forwards `id`).
- [ ] **FileUpload has no visible focus ring** — the file input is `opacity:0` over the drop area (`file-upload.css`),
  which defeats the global `*:focus-visible` outline (`reset.css`), so keyboard focus is invisible (WCAG 2.4.7). Add a
  `[data-file-upload-area]:has(.file-input:focus-visible)` outline rule reusing the focus token — exactly as
  RadioButton/Checkbox/RadioTabs already do.
- [~] **Modal close button keyboard-dead; Notification dismiss lacks button semantics** — *done:* Modal's × is now a
  native `<button type="button">` (was a `<Text>`→`<p>` with `tabIndex` + `onClick` but no key handler, WCAG 2.1.1),
  with an `appearance`/`background`/`border` reset on `.dismiss-button`. *Still open:* Notification's dismiss is a
  `<div>` with a manual key handler but no `role="button"` — give it native button semantics too.
- [x] **Accordion ARIA is broken** — dropped the hardcoded `aria-labelledby="accordion-summary"` /
  `aria-controls="accordion-content"` (dangling ids), the redundant `role`s + `tabIndex`, and the stale `aria-expanded`;
  native `<details>`/`<summary>` provide disclosure semantics (CSS only keys off `[open]`, so no visual change). The
  `<details name="...">` exclusive-accordion follow-up (Bet 3) is separate and still open.
- [~] **Tooltip has no accessible link + click-mode bug** — *done:* `aria-describedby` is now set on the target in the
  existing effect (cleaned up on unmount), so SR users who focus the anchor get the tooltip announced (WCAG 4.1.2).
  *Still open:* `tooltip.css` sets `pointer-events:none` on every `[data-tooltip]` — right for hover but makes
  `showOn="click"` tooltips with interactive content unclickable; scope it to hover mode via a data attribute.
- [x] **Pagination arrows are unlabelled** — the first/previous/next/last icon buttons now get a per-type `aria-label`
  ("Go to first page", …) and the decorative SVGs are `aria-hidden="true"` (WCAG 4.1.2). Labels are hardcoded English
  for now; exposing them via `constants.ts` (mirroring `itemDisplayText`) for localisation is a future nicety.
- [ ] **Over-applied live-region roles** — `Badge.tsx` always sets `role="status"`, so a static "New"/count badge
  announces as a polite live region (and a changing count spams AT). `SkeletonGroup` uses `role="alert"` (assertive) for
  loading scaffolding — should be `role="status"` + `aria-busy`, matching the existing Spinner idiom; and each Skeleton
  item is an indeterminate `role="progressbar"` with no `aria-valuenow` — mark items `aria-hidden` and let the group own
  one polite status. Make the live role opt-in (a `live` prop) for static-by-default cases. (Callout's kind-driven role
  is largely defensible; the only follow-on is a `live=false` opt-out for persistent content.)
- [ ] **Double-announced toasts/notifications** — `ToastsWrapper` and `NotificationsWrapper` are `role="log"` live
  regions, and each child item is *also* a live region (`ToastItem`, `NotificationItem`), so AT announces each item
  twice. Keep the live region in one place — conventionally the wrapper owns it and items are plain children. Preserve
  the assertive escalation NotificationItem uses for error/warning (e.g. via a separate assertive region), and
  reconsider `aria-relevant="removals"` on a `role="log"`.
- [ ] **OptionCard selection state invisible to AT** — `OptionCard.tsx:291-294` renders `role="button"` with
  `aria-selected`, but `aria-selected` is ignored on `role="button"`, so the selection state (the component's whole
  point) never reaches screen readers. Minimal fix: convey state via `aria-pressed`. Spec-correct fix: `role="option"`
  inside a `role="listbox"` container (with `aria-multiselectable` when `allowMultipleSelections`), which needs roving
  tabindex + arrow-key nav (mirror ListBox) since each card currently has `tabIndex=0`.

### TypeScript hygiene

- [ ] **ESLint flat config** — adopt the v9-style flat config.
- [ ] **`no-explicit-any`** with targeted exceptions — replace `any` escape hatches in `Element/constants.ts:105` and
  `utils/classNames.ts:1`. Add a third: `ElementProps.onChange` is `FlexibleEventHandler<FormEvent<T>, any>`
  (`constants.ts:113`) and `FlexibleEventHandler` ends in `(value: any) => void` (`constants.ts:105-107`), eroding
  change-handler typing on the base Element type — parameterise the value type, or drop `onChange` from `ElementProps`
  since concrete components declare precise handlers.
- [x] **Remove `@ts-ignore`** comments — done in commit `a913305` ("Remove all @ts-ignore comments"). The remaining
  Modal cleanup is native focus delegation (see the Accessibility hardening section), not dropping `@ts-ignore`.

---

## Mid-term — second half of 2.0

Once the gating items are in, these unlock real improvements.

### Element prop engine refactor

- [ ] **Reframe the refactor around drift, not perf.** Move utility prop mapping out of `Element.tsx`'s
  destructure-and-conditional pile into a typed table/helper. The real driver isn't speed ("more performant" oversells
  it — Element is light): the universal prop set is hand-maintained in *five* places with no compile-time check they
  agree — `CommonProps` (`constants.ts:38-98`), the Element destructure (`Element.tsx:32-91`), the className ternary
  array, `WRAPPER_PROP_KEYS` (`propSeparation.ts:43-106`), and the regex `CommonProps` scrape in
  `generateSchema.ts:85-91`. This has already shipped a dead `columns` prop — typed and routed (`constants.ts:60`,
  `Element.tsx:41`, `propSeparation.ts:66`) but emitting no class or style (`layout.css` only does `display:grid`). As a
  cheap immediate win, delete `columns` from all three Element-side sites; the structural fix derives the destructure,
  className output, wrapper-routing set, and schema extraction from one typed mapping table.
- [ ] Add dev-only warnings for conflicting props — concrete cases: shorthand + per-side overlap (`padding="medium"` +
  `paddingLeft="huge"` — warn that the left override wins), opacity set without a matching colour, and unknown colour
  values.
- [ ] Document the universal prop set as part of the public API surface, not buried in `CommonProps`.
- [ ] **Honour or remove dead validation props; consolidate `InputCommonProps`** — several inputs advertise props that
  do nothing: `Select.selected` is declared in `OptionProps` but `renderOption` never applies it;
  `TextArea.validateThis`/`valid` and `InputField.valid` are destructured and dropped while InputField implements a full
  validity flow — so the same-named props mean different things across inputs (the worst outcome for a plain-English,
  AI-targeted API). Honour or remove the dead props (leave `TextArea.invalid`, which is live), and consolidate the three
  drifting `InputCommonProps` definitions (`InputField.tsx`, `TextArea.tsx`, `FormGenerator.tsx`) into one shared
  interface.
- [ ] **Tabs controlled mode + OptionCard API naming** — Tabs is uncontrolled-only (`defaultActiveTab` + internal
  state, no `activeTab`/`onTabChange`), so consumers can't drive it from URL/router state, unlike
  ListBox/Checkbox/Switch/Range. Add an optional controlled `activeTab` + `onTabChange` using ListBox's `isControlled`
  split, preserving the panel animation. Separately, OptionCard already supports controlled mode but names it
  `selectedIds`/`onSelectionChange` with `Set<string>` instead of the library-wide `value`/`defaultValue`/`onChange` +
  `string[]` — add aliases and deprecate the old names so the convention is uniform.
- [ ] **Export foundation types + `useClickOutside`; remove dead FormItem context** — `CommonProps`,
  `CommonAndHTMLProps<T>`, and `FlexibleEventHandler` are defined in `Element/constants.ts` but not re-exported from the
  barrel, so consumers can't type a wrapper that forwards Fictoan props; `useClickOutside` is battle-tested internally
  (Sidebar, ListBox) but not exported. Add both (`ElementProps` is already exported). Separately,
  `FormItemContext`/`useFormItemContext` have zero consumers — inputs derive aria ids via `deriveAriaIds` directly — so
  remove the dead context. *(Corrects the content-gap note below that assumed `deriveAriaIds`/`mergeDescribedBy` were
  unused — they're used by 13 components; only the Context/hook are dead.)*
- [ ] **Memoise provider context values** — `ToastsProvider` (`value={{toast}}`) and `NotificationsProvider`
  (`value={{notify}}`) build a new context value every render, so every consumer re-renders. Wrap each in `useMemo`
  keyed on the stable function. (Skip FormItem — `useFormItemContext` has zero consumers — and ThemeProvider, which has
  no spurious renders. `OptionCard` has the same pattern with real consumers if worth expanding.)
- [ ] **Name the size vocabularies** — the `size` prop spans three source vocabularies: full `SpacingTypes` (Badge,
  Button), an identical `Exclude<SpacingTypes, "nano" | "huge">` duplicated across ~14 form items (`propSeparation.ts`),
  and Spinner's own outlier set that adds `huge` and drops the small end. Add a `FormItemSizeTypes` alias and apply it to
  the form items (kills the duplication *and* the 15× inline size union in the schema), decide whether Spinner should use
  `SpacingTypes` or a named alias, and optionally extend `generateSchema`'s union extractor to resolve `Exclude<>`.

### CSS delivery and theming

- [x] **Wrap library styles in `@layer fictoan`** — done; see the Bet 3 entry below for details.
- [ ] **Document import modes** — full framework CSS vs component CSS vs theme-only CSS. Today everything comes through
  `index.tsx:7` whether the consumer wants it or not. Note this needs real *exports plumbing* (granular subpath exports +
  Rollup CSS chunks), not just docs — `package.json` `exports` only exposes `.` + a `./dist/` glob today.
- [ ] **PurgeCSS / unused-style guide** — official guidance for trimming the raw bundle in production. Document
  `sideEffects` interaction. Note `@fullhuman/postcss-purgecss` is currently an *orphaned* devDependency wired into no
  config (`postcss.config.cjs` runs only nesting/autoprefixer/color-mix) — decide remove-it vs wire-it-in with a
  safelist for the generated colour classes.
- [ ] **Schema-driven theme tokens** — define all tokens in one TOML or JSON file. Generate the CSS variables, TS types,
  docs page, AND the theme configurator from the same source. Kills the heuristic variable detection in
  `themeConfigurator.tsx`. The schema generator is the natural home: extend `generateSchema.ts` to parse
  `theme.css`/`globals.css`/`typography.css` into the schema (name, default, category, references) so the configurator,
  TS types, docs, AND an MCP/AI consumer all derive from one source — replacing the runtime `document.styleSheets`
  scraping with name-substring category guessing in `themeConfigurator.tsx`.
- [x] **Per-component code-splitting** *(dead-**component** elimination — NOT prop/value stripping. Every component,
  prop, value, and the whole schema always ship in full; this only changes what a CONSUMER's bundle ends up including
  when they import a subset.)* — the build used to collapse all ~30 components into one ~120 KB chunk, so
  `import { Button } from "fictoan-react"` dragged in the entire graph. Fixed: switched the lib build to Rollup
  `preserveModules` (+ `cssCodeSplit:false` so the `@layer`/Turbopack post-build plugins still get one `dist/index.css`),
  so dist is now one JS file per source module and the barrel re-exports from those files; rewrote the four components
  that deep-imported the whole barrel `$/components` (Form, CodeBlock, Accordion, Breadcrumbs) to direct paths; and set
  `sideEffects` to `["**/*.css"]` so the JS is shakeable while CSS is preserved. Verified:
  `dist/components/Button/Button.js` imports only Element + react (no other components), and lib + docs (a real
  consumer) build clean. Optional follow-up: a typed `./components/*` subpath export for explicit deep imports.
  *(Aside: `agadoo` still reports "failed" — its test is "does importing the entry reduce to nothing", which a
  CSS-bearing entry can never satisfy, so it's the wrong gate here; left as a manual check, not wired into CI.)*
- [x] **Enable CSS minification** — flipped `cssMinify` on; `dist/index.css` dropped from ~589 KB to ~464 KB raw
  (61.7 → 44 KB gzipped, ~28%). The post-build `fixCssForTurbopack`/`wrapInFictoanLayer` plugins run in `closeBundle` on
  the minified bytes, so the `@layer` wrap and `}*` fix still apply — verified, lib + docs build clean. (The separate
  `generateColourClasses.ts` boilerplate-collapse — ~2.7 KB gzipped, changes the cascade via a `:where()` rule — is
  still a distinct, riskier item.)
- [ ] **Card padding diverges from the global scale** — `card.css` hardcodes per-size px padding, overriding the global
  token-driven `.padding-all-*` utilities that the `padding` prop resolves to on every other Element. So `padding`
  behaves differently on Card than anywhere else. Delete the Card overrides (and the `600px` media override if
  redundant) so the prop resolves to the same token-based utilities. If Card genuinely needs distinct padding, make it a
  deliberate `--card-padding-*` token, not a silent px override.
- [ ] **No first-party dark theme** — ThemeProvider toggles a class on `documentElement` and all tokens are layered
  (component → semantic `--hue`/`--shade` → OKLCH), so a dark theme is just an override block — but the library ships
  none, forcing every consumer to hand-author dark mode (as the docs do, ~227 lines). Ship a `.theme-dark` token
  override sheet as an opt-in import (composes with the existing class toggle) and/or a `prefers-color-scheme` default.
  The cost is the maintenance contract: every new component token in `theme.css`/`custom-colours.css` must gain a dark
  mapping.

### Docs site — infrastructure

- [ ] **Component metadata registry** — pages currently hand-roll state, code generation, and controls (e.g.
  `button/page.client.tsx:33`). Move toward a typed metadata registry generated from source + small curated examples.
- [ ] **Consolidate search index** — `searchIndex.js` is a large manual file at risk of drift. Generate from the same
  registry.
- [ ] **Bare Divider cap** — optional follow-up: if a `<Divider />` without horizontal-margin is placed at the page
  root, should it also cap at 2400 px? Currently spans 100% of parent. Decide and document.
- [ ] **Docs lists have drifted** *(sharpens the registry + search-index items above with the concrete user-facing
  bugs)* — three+ independent hardcoded component lists have diverged: the search index (`searchIndex.js`) is missing
  `button-group` and `tooltip` (both have live pages + sidebar links + OG entries) so searching them returns nothing,
  plus `form-builder`; the Sidebar links a dead `/components/sidebar-item` (404 in primary nav); and OG/page metadata is
  regex-scraped from each `page.client.tsx` as a string (`og-utils.tsx`, fragile — would break on nested `<code>`) with
  a dead duplicate extractor. Build the typed component registry and derive sidebar, search, and OG static params from
  it. Could also feed `llms-full.txt` without a full MDX migration.
- [ ] **Docs site a11y/SEO basics** — the framework's own showcase fails basics: no skip-to-content link
  (`layout.client.tsx`), forcing keyboard users through the full sidebar every page; the Header mobile menu toggle is an
  `onClick` `<Div>` of dash glyphs with no role/aria-label/key handler; the SearchBar mobile icon is a
  `<Div role="button">` with no label or keyboard activation; and `RootLayoutClient` (a `"use client"` component)
  hardcodes `<head><title>` competing with per-page `generateMetadata` (a Next App Router anti-pattern). Add a skip
  link, convert the controls to `<button>`, and move the default title into the server `layout.tsx` metadata.

### Docs site — content gaps

Things that landed in beta-18 but the docs either don't mention or under-sell. None of these actively mislead a reader (
so they didn't make the Option B sweep), but each represents a feature consumers may not discover.

- [x] **Drawer viewport gutter** — Drawer floats 8 px (`var(--nano)`) off the viewport edges. Documented with a note
  on the Drawer docs page (intro + the `size` helpText, which now spells out the nano→huge scale).
- [x] **Spacing-token clamps** — `--tiny` through `--huge` are now `clamp(min, vmax, max)`. The docs showed the *old*
  bare-`vmax` values in three places — `theme/CodeSamples.jsx`, the getting-started spacing table, and the docs' own
  `fictoan-theme.css` override (which, post-`@layer`, actually won — so the live docs rendered with the old runaway
  spacing). All three updated to the real clamp values.
- [x] **`@layer fictoan`** — documented as an "Overriding styles" section in getting-started: consumers can override
  component CSS without `!important`, with the utility-class `!important` exception called out (those keep it on
  purpose, so the override-without-`!important` contract is about non-utility *component* styles).
- [x] **`useViewTransition` hook** — documented inline on the Theme page (API signature, example, and
  `prefers-reduced-motion` fallback), next to the crossfade note, rather than a standalone Hooks page — more
  discoverable where View Transitions are already explained.
- [x] **PinInputField FormItem integration** — the docs page now demos `label`, `helpText`, `errorText`, `required`
  and `size` (state, code-gen, live props, and controls).
- [x] **Theme switching crossfade** — documented on the Theme page: the automatic `document.startViewTransition()`
  crossfade and its `prefers-reduced-motion` handling.
- [ ] **Form a11y context helpers** — `FormItemContext`, `useFormItemContext`, `deriveAriaIds`, `mergeDescribedBy` are
  exported from `FormItem.tsx` internally but not re-exported from `fictoan-react`'s public surface. Decide: keep
  internal (no docs needed), or expose for advanced consumers building custom form components (then docs needed).

---

## Strategic bets — 2.0 and beyond

The three big plays. Each requires real engineering investment, but each is a category-positioning move that's hard for
competitors to copy.

### Bet 1: AI-first React UI framework

The plain-English prop model is the differentiator. Make it official.

- [x] Machine-readable component schema (shipped on `beta-18`).
- [x] **Schema-meta taught non-existent props** — the curated examples/tips in `schema-meta.ts` cited an API that
  doesn't exist (Modal/Drawer `openWhen`/`onCloseCallback`; InputField `iconLeft`/`helperText`/`successText`). The
  strings are fixed, AND `generateSchema.ts` now has a build-time drift guard: it validates each example's root-tag
  attributes against that component's real props ∪ universal props ∪ known HTML attributes and **fails the build** on
  any unknown (tips are warn-only). Proven by reintroducing `openWhen` and watching the build fail — so the AI grounding
  asset can't silently drift to non-existent props again.
- [ ] **Schema completeness gaps** — the shipped `fictoan-schema.json` has holes that undercut it as a grounding asset:
  `generateSchema.ts` parses each `index.tsx`, so Toast/Notification (which re-export only their `*Provider`) get no
  entry despite an orphaned `schema-meta` Notification block; 42/58 components have an empty `description` and no
  example; the universal-prop type `ColourPropTypes` is a dangling reference with no machine link to the existing
  `Colours` + `colourModifiers` enums; ~15 referenced named types (`TabType`, `OptionForListBoxProps`, `Position`) are
  never defined; and the size union is inlined 15×. Fix in `generateSchema.ts`: follow index re-exports, resolve
  referenced interfaces into a top-level types map, map `ColourPropTypes` → `Colours` + `colourModifiers`, extract a
  named size enum, and backfill descriptions/examples. Split the generator fixes from the description backfill.
- [x] `llms.txt` (shipped on `beta-18`).
- [~] **`llms.txt` upkeep + discoverability** — *discoverability done:* footer links + `<head>` `rel=alternate` links
  to `/llms.txt` and `/fictoan-schema.json`, a new `public/robots.txt`, and the Portion entry reworded to
  `@container`-based. *Still open:* `public/llms.txt` has dead links (`/components/row` & `/components/portion` 404 —
  they live at `/layout`; `/components/spinner` has no page) and documents `FormBuilder`, which the library and schema
  don't expose; the schema's `$schema` points at `https://fictoan.io/schema/v1.json`, which is never built or served.
  Generating the component index from the schema removes the whole drift class but needs a slug-resolution layer.
- [ ] **`@fictoan/mcp` server** — an MCP server exposing tools like `list_components`, `get_prop_signature`,
  `find_component_by_intent`. AI assistants using Cursor / Claude / Copilot can ground completions in real schema
  instead of training-data approximations.
- [ ] **Tuned system-prompt snippet** — publish a paste-ready snippet for ChatGPT / Cursor / Claude Code that primes the
  model with Fictoan's conventions. Link from docs and `llms.txt`. Near-zero effort: assemble it from the schema
  philosophy string + the existing "Key points" in `llms.txt`, and ship as a docs page + downloadable file.
- [ ] **`llms-full.txt`** — full concatenated docs in markdown form. Requires converting some of the `page.client.tsx`
  docs to MDX or extracting copy programmatically. Cheaper path: extract page copy via the proposed docs component
  registry (see Docs site — infrastructure) rather than a full MDX rewrite.
- [ ] **Marketing positioning** — the README, homepage, and Twitter bio should lead with "the AI-friendly React UI
  framework." Today it's "designer-friendly", which is also true but less distinct.

### Bet 2: Decouple from React

The real Fictoan is the CSS layer + the prop-to-class engine. React is a binding.

- [ ] **Extract `@fictoan/css`** — stylesheets and class system, framework-agnostic. Make `fictoan-react` a thin wrapper
  that re-exports `@fictoan/css` + components.
- [ ] **Standalone prop engine** — port the Element destructure-and-classnames logic into a framework-agnostic util in
  `@fictoan/css`. React wrapper just calls into it.
- [ ] **Reference: `@fictoan/web-components`** — community-feasible after the split; proves the bindings work.
- [ ] **Reference: `@fictoan/preact`** or similar — same goal.

### Bet 3: Native browser primitives over JavaScript

Stop reinventing what the browser now does natively. Each item below shrinks the bundle, fixes a11y bugs by default, and
ages better.

- [x] **Modal** — already on the popover API (`Modal.tsx` uses `showPopover`/`hidePopover`/`popover="auto"|"manual"`,
  `::backdrop` for the dimming layer). Remaining cleanup: replace manual first-focusable focus with native focus
  delegation, drop the lone `@ts-ignore`, consider pairing with the new `command`/`commandfor` invokers so non-React
  callers don't need JS to trigger.
- [x] **Drawer** — migrated to popover API with `:popover-open` + `@starting-style` +
  `transition-behavior: allow-discrete` for slide animations. Native ESC and backdrop-click dismissal via
  `popover="auto"`. Top-layer rendering removes the z-index war. Net ~80 lines deleted from the component. (
  `closeOnClickOutside` deprecated; ESC and outside-click are now coupled via `isDismissible`.)
- [x] **Accordion** — already uses native `<details>` and `<summary>`. Follow-up: add support for `<details name="...">`
  to get exclusive-accordion behaviour with zero JS.
- [x] **Tooltip** — migrated to popover API + CSS anchor positioning (`anchor-name` / `position-anchor` /
  `position-area` / `position-try-fallbacks`). Drops the module-level singleton, the `react-dom/client` `createRoot`
  portal, the ~60-line `getBoundingClientRect` position math, and the document-level scroll/resize listeners. Each
  Tooltip is now an independent popover that positions itself relative to its target via CSS.
- [x] **`color-mix()` for shade/opacity** — already pervasive. Used in `theme.css` for hover/translucent variants and in
  `colours.css` for every opacity utility (e.g.
  `.bg-pink-dark80 { background-color: color-mix(in oklch, var(--pink-dark80) calc(var(--bg-opacity, 1) * 100%), transparent); }`).
  No JS-side colour math to remove.
- [x] **Wrap library styles in `@layer fictoan`** — the entire bundled `dist/index.css` is now wrapped in
  `@layer fictoan { ... }` via a new `wrapInFictoanLayer` Vite plugin. Consumer styles defined outside any layer now win
  cascade conflicts regardless of specificity, so overrides no longer need `!important` or higher-specificity selectors.
- [x] **Container queries** — Row is now a CSS container (`container-type: inline-size; container-name: fictoan-row`).
  All Portion responsive variants and the Row's portion-collapse rules switched from viewport `@media` to
  `@container fictoan-row` queries. A Portion in a 400px sidebar now stacks like a phone regardless of viewport size.
  Prop names (`mobileSpan`, `tabletPortraitSpan`, `tabletLandscapeSpan`, `desktopSpan`) keep their natural meaning but
  now refer to *container* size bands rather than viewport.
- [x] **View Transitions** — ThemeProvider now wraps its `documentElement.className` mutation in
  `document.startViewTransition()`, so consumers get a crossfade between themes for free. New `useViewTransition()` hook
  exported from `fictoan-react` (`flushSync` + `startViewTransition` wrapper) so consumers can animate any state change
  without re-doing the feature detection. Default `prefers-reduced-motion: reduce` handling added in globals.css.
  Drawer/Modal open-close are still done via `:popover-open` + `@starting-style` +
  `transition-behavior: allow-discrete` — moving them to view transitions would be a sideways step, not an improvement.
- [ ] **Accordion `name="..."` for exclusive accordions** — small follow-up from above.
- [ ] **Modal small cleanup** — see the Modal/Drawer `aria-modal` item in Accessibility hardening (focus delegation,
  optional `command`/`commandfor` invoker support). The `@ts-ignore` part is already done (commit `a913305`).
- [ ] **Tabs animation is dead code** — Tabs keeps `isExiting` state + a 150 ms `setTimeout` and renders panels with
  `data-tab-content`/`data-exiting`, but `tabs.css` styles `.tabs-content`/`.exiting` — class selectors no element has —
  so neither enter nor exit animation fires and the timer just makes switching feel laggy. Fix properly: delete
  `isExiting` + the timer and drive enter/exit from CSS on the native `[hidden]`/`[data-active]` states using
  `transition-behavior: allow-discrete` + `@starting-style` (the pattern already proven in `drawer.css`). (Aligning the
  CSS to the data-attributes is only a stopgap — it leaves the laggy timer.)
- [ ] **Sidebar still uses JS click-outside** — `SidebarWrapper.tsx` attaches a `useClickOutside` document listener for
  mobile dismissal while Modal/Drawer/Tooltip have all moved to the popover API. Make the *mobile* sidebar a popover
  (gated by viewport) so ESC + backdrop dismissal come from the platform. Caveat: the Sidebar is persistent on desktop
  (`content-wrapper.css` reserves layout space; off-screen treatment is `@media max-width:900px` only), and toggling the
  `popover` attribute by viewport needs a `matchMedia` listener — so this trades a continuous mousedown/touchstart
  listener for a one-shot media-query listener plus native dismissal: a net win, not zero-JS.
- [ ] **Redundant ARIA on native progress/meter** — `ProgressBar` and `Meter` add `aria-valuemin`/`max`/`now` to native
  `<progress>`/`<meter>`, duplicating the value/min/max the elements already expose through their roles (linters/axe
  flag this). Drop the redundant `aria-value{min,max,now}` (keep `aria-valuetext` — spec-supported and carries the
  suffix text native can't), keep native `value`/`max`/`min`/`low`/`high` plus a single accessible name, and reconsider
  the `role="region"` landmark wrapping the tiny Meter.
- [ ] **Adopt `field-sizing` / `interpolate-size` / invokers** — three opt-in progressive enhancements: (1)
  `field-sizing: content` behind an `autoGrow` prop for TextArea (`textarea.css` only sets `resize:vertical` — this is a
  net-new feature, there's no JS hack to replace); (2) `interpolate-size: allow-keywords` + a `::details-content`
  transition to animate Accordion open/close to intrinsic height with no JS; (3) extend the tracked Modal
  `command`/`commandfor` invoker idea to Drawer + an uncontrolled-open mode, so non-React callers can open/close with
  zero JS. All Chromium-only today — ship behind plain-English opt-ins with graceful fallback, never as defaults.

---

## Smaller follow-ups worth doing eventually

- [ ] **`<Slot>` primitive** — Radix-style render-as-child so `<Button as={Link} href="…">` works without prop drilling.
  Composability is currently a weak spot. Verified blocker: `CommonAndHTMLProps` explicitly `Omit<…, "as">`
  (`constants.ts:101`) and wrapper components (Button, Card) never re-add `as`, so `<Button as={Link}>` doesn't
  type-check today. Scope as either a `Slot` primitive OR threading a typed polymorphic `as` through wrappers (start with
  Button/Card). Note the polymorphic-ref typing is heavy on tsserver, so the pragmatic cast may be the right trade — flag
  as a considered decision.
- [ ] **Shadcn-style CLI** — `npx fictoan add Button` as an alternative distribution mode. The plain-English prop model
  fits this very well because each component is small and readable.
- [ ] **Agent-UI component pack** — streaming text container, "thinking" indicator, tool-call card, citation chip, retry
  button. A real and growing UI category that didn't exist in 2020.
- [x] **`stats.html` gitignore** — was regenerated on every build and showed up as a dirty file. Added `stats.html` to
  `.gitignore` and untracked the existing copy (`git rm --cached`).

---

## Explicit non-goals

- **Don't add a Tailwind / utility-class mode.** Dilutes the plain-English prop philosophy, which is the AI-friendly
  differentiator.
- **Don't chase Radix on every primitive.** Build a dozen high-leverage ones really well rather than 60 mediocre ones.
- **Don't go fully headless.** The design opinion *is* the value. Headless logic is well-served by React Aria / Ark.
- **Don't bet the framework on any one frontend stack winning.** Hence Bet 2 above.


[//]: # (TODO: Tertiary button colour over-rides)
