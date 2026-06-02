import { describe, it, expect } from "vitest";
import { fireEvent, render, waitFor } from "@testing-library/react";

import { Tooltip } from "$components/Tooltip";

// BROWSER TIER — Tooltip placement via CSS anchor positioning (`anchor-name` on
// the target, `position-anchor` + `position-area` on the popover). jsdom has no
// layout engine and no anchor positioning, so real placement is only verifiable
// in Chromium. The component shows the tooltip on mouseenter (showOn="hover")
// through the Popover API; we assert BOTH the directional relationship AND the
// cross-axis alignment, so a tooltip that failed to anchor (and sat at 0,0)
// can't pass trivially.

type Position = "top" | "bottom" | "left" | "right";

const showFor = async (position: Position) => {
    const { container } = render(
        <>
            <button
                id="tgt"
                // Dead-centre so every side has room — Vitest browser's default
                // viewport is narrow, and an off-centre target trips the
                // position-try-fallbacks (flipping the tooltip to the opposite side).
                style={{
                    position  : "fixed",
                    top       : "50%",
                    left      : "50%",
                    transform : "translate(-50%, -50%)",
                    width     : "80px",
                    height    : "32px",
                }}
            >
                Target
            </button>
            <Tooltip isTooltipFor="tgt" position={position}>Tip</Tooltip>
        </>,
    );
    const tooltip = container.querySelector("[data-tooltip]") as HTMLElement;
    fireEvent.mouseEnter(document.getElementById("tgt")!);
    await waitFor(() => expect(tooltip.matches(":popover-open")).toBe(true));
    const target = document.getElementById("tgt")!.getBoundingClientRect();
    return { tooltip, target };
};

const T = 1; // sub-pixel tolerance

describe("Tooltip placement (CSS anchor positioning)", () => {
    it("position=top sits above the target, horizontally aligned", async () => {
        const { tooltip, target } = await showFor("top");
        await waitFor(() => {
            const t = tooltip.getBoundingClientRect();
            expect(t.bottom).toBeLessThanOrEqual(target.top + T);          // above
            expect(t.left).toBeLessThan(target.right);                     // horizontally
            expect(t.right).toBeGreaterThan(target.left);                  // overlapping
        });
    });

    it("position=bottom sits below the target, horizontally aligned", async () => {
        const { tooltip, target } = await showFor("bottom");
        await waitFor(() => {
            const t = tooltip.getBoundingClientRect();
            expect(t.top).toBeGreaterThanOrEqual(target.bottom - T);       // below
            expect(t.left).toBeLessThan(target.right);
            expect(t.right).toBeGreaterThan(target.left);
        });
    });

    it("position=left sits to the left of the target, vertically aligned", async () => {
        const { tooltip, target } = await showFor("left");
        await waitFor(() => {
            const t = tooltip.getBoundingClientRect();
            expect(t.right).toBeLessThanOrEqual(target.left + T);          // left of
            expect(t.top).toBeLessThan(target.bottom);                     // vertically
            expect(t.bottom).toBeGreaterThan(target.top);                  // overlapping
        });
    });

    it("position=right sits to the right of the target, vertically aligned", async () => {
        const { tooltip, target } = await showFor("right");
        await waitFor(() => {
            const t = tooltip.getBoundingClientRect();
            expect(t.left).toBeGreaterThanOrEqual(target.right - T);       // right of
            expect(t.top).toBeLessThan(target.bottom);
            expect(t.bottom).toBeGreaterThan(target.top);
        });
    });
});
