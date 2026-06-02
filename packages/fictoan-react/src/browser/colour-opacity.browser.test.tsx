// TESTS ===============================================================================================================
import { describe, it, expect } from "vitest";

// BROWSER TIER — the bgOpacity mechanism: a `.bg-*` utility resolves its colour
// through `color-mix(in oklch, var(--colour) calc(var(--bg-opacity, 1) * 100%),
// transparent)`. jsdom evaluates neither color-mix nor var()/calc() in computed
// styles, so this is browser-only. Raw markup mirrors what `<X bgColour="red"
// bgOpacity="..">` emits (class `bg-red` + inline `--bg-opacity`).

const bgOf = (opacity: string): string => {
    const el = document.createElement("div");
    el.className = "bg-red";
    el.style.setProperty("--bg-opacity", opacity);
    document.body.appendChild(el);
    const bg = getComputedStyle(el).backgroundColor;
    el.remove();
    return bg;
};

describe("color-mix — bgOpacity modulates the background via --bg-opacity", () => {
    it("a fully-opaque background differs from a half-opacity one", () => {
        const opaque = bgOf("1");
        const half   = bgOf("0.5");
        expect(half).not.toBe(opaque);
    });

    it("zero opacity resolves to a fully transparent background", () => {
        // color-mix(in oklch, red 0%, transparent) -> alpha 0
        const transparent = bgOf("0");
        const opaque      = bgOf("1");
        expect(transparent).not.toBe(opaque);
        // an alpha-0 colour reports as either rgba(.., 0) or <space>/ 0
        expect(transparent).toMatch(/(,\s*0\s*\)|\/\s*0\s*\))/);
    });
});
