import "@testing-library/jest-dom/vitest";
import { afterEach, expect } from "vitest";
import { cleanup } from "@testing-library/react";
import * as axeMatchers from "vitest-axe/matchers";

// a11y assertions: `await expect(container).toHaveNoViolations()`
expect.extend(axeMatchers);

// Unmount everything between tests so the jsdom document stays clean.
afterEach(() => {
    cleanup();
});

// --- jsdom shims -----------------------------------------------------------
// jsdom implements none of the following, and several Fictoan components call
// them inside effects: Modal / Drawer / Tooltip via the Popover API, ListBox
// via scrollIntoView, RadioTabGroup via ResizeObserver. Stub them so components
// can mount without throwing. These are stubs, NOT behaviour — anything whose
// correctness depends on them (popover open/close, slider geometry, scroll
// position) is out of scope for the jsdom tier and belongs to a browser suite.
if (!("ResizeObserver" in globalThis)) {
    globalThis.ResizeObserver = class {
        observe() {}
        unobserve() {}
        disconnect() {}
    } as unknown as typeof ResizeObserver;
}

if (!HTMLElement.prototype.showPopover) {
    HTMLElement.prototype.showPopover = function () {};
    HTMLElement.prototype.hidePopover = function () {};
    HTMLElement.prototype.togglePopover = function () {
        return false;
    };
}

if (!Element.prototype.scrollIntoView) {
    Element.prototype.scrollIntoView = function () {};
}

// jsdom's selector engine (nwsapi) throws on the `:popover-open` pseudo-class,
// and Modal / Drawer call element.matches(":popover-open") inside their open/
// close effects on every mount. Make matches() return false for any popover
// pseudo-class instead of throwing, so popover components mount cleanly. (Actual
// popover visibility is browser-tier — see the notes in vitest.config.ts.)
const realMatches = Element.prototype.matches;
Element.prototype.matches = function (selector: string) {
    if (typeof selector === "string" && selector.includes(":popover-open")) {
        return false;
    }
    return realMatches.call(this, selector);
};

// axe's colour-contrast rule probes a <canvas> 2d context, which jsdom does not
// implement (it logs a noisy "Not implemented" error). We disable colour-contrast
// in the shared `axe` helper anyway — it needs real painting — but stub the
// context so nothing throws if some other path reaches for it.
HTMLCanvasElement.prototype.getContext = (() => null) as never;
