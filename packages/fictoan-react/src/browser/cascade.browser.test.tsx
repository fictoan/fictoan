// TESTS ===============================================================================================================
import { describe, it, expect } from "vitest";

// BROWSER TIER — real cascade engine + the built, @layer-wrapped dist CSS
// (injected in vitest.browser.setup.ts). This is the regression test for the bug
// the whole sub-layer system exists to fix: a universal colour prop (`.bg-green`,
// in `fictoan.utilities`) must beat a component's own base rule (`[data-badge]`,
// in `fictoan.base`). jsdom can't resolve cross-layer precedence at all.
//
// We use RAW markup mirroring what `<Badge bgColour="green">` emits (the jsdom
// tier verifies the component actually emits `data-badge` + `bg-green`). Importing
// the component would inject its source `badge.css` UNLAYERED, which beats the
// layered dist rules and invalidates the test.

const bgOf = (apply: (el: HTMLElement) => void): string => {
    const el = document.createElement("div");
    apply(el);
    document.body.appendChild(el);
    const bg = getComputedStyle(el).backgroundColor;
    el.remove();
    return bg;
};

describe("@layer cascade — colour utilities beat component base rules", () => {
    it("a .bg-* utility wins over the [data-badge] base background", () => {
        const base    = bgOf((el) => { el.setAttribute("data-badge", ""); });
        const utility = bgOf((el) => { el.className = "bg-green"; });
        const both    = bgOf((el) => { el.setAttribute("data-badge", ""); el.className = "bg-green"; });

        // the utility applied to the badge (matches a bare .bg-green node)...
        expect(both).toBe(utility);
        // ...and beat the component's own base background rule
        expect(both).not.toBe(base);
    });
});
