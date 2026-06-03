// TESTS ===============================================================================================================
import "../../../vitest-matchers";
import { axe } from "vitest-axe";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";

// OTHER ===============================================================================================================
import { Tooltip } from "./Tooltip";

// Tooltip is browser-tier for everything visible: placement is CSS anchor
// positioning (anchor-name / position-anchor / position-area) and open/close is
// the native Popover API — both no-ops in jsdom. So these tests pin only the
// MARKUP contract: the popover element's attributes + the inline anchor custom
// property it emits, and the ARIA wiring the mount effect writes onto the target
// (aria-describedby -> tooltip id, anchor-name -> the matching --anchor-* var).

// A consumer always pairs a real, focusable target element with the tooltip.
const Fixture = (props: Partial<React.ComponentProps<typeof Tooltip>> = {}) => (
    <>
        <button id="save-btn" type="button">Save</button>
        <Tooltip isTooltipFor="save-btn" {...props}>
            Saves your work
        </Tooltip>
    </>
);

describe("Tooltip — popover element markup", () => {
    it("renders a div with the manual-popover / tooltip role contract", () => {
        const { container } = render(<Fixture />);
        const tip = container.querySelector("[data-tooltip]") as HTMLElement;

        expect(tip.tagName).toBe("DIV");
        expect(tip).toHaveAttribute("popover", "manual");
        expect(tip).toHaveAttribute("role", "tooltip");
        expect(tip).toHaveTextContent("Saves your work");
    });

    it("exposes the tooltip via the role and its accessible name", () => {
        render(<Fixture />);
        // role="tooltip" + text content gives it an accessible name.
        expect(screen.getByRole("tooltip", { hidden : true })).toHaveTextContent(
            "Saves your work",
        );
    });

    it("defaults data-position to top and data-show-on to hover", () => {
        const { container } = render(<Fixture />);
        const tip = container.querySelector("[data-tooltip]") as HTMLElement;

        expect(tip).toHaveAttribute("data-position", "top");
        expect(tip).toHaveAttribute("data-show-on", "hover");
    });

    it("reflects the position prop into data-position", () => {
        const { container } = render(<Fixture position="left" />);
        const tip = container.querySelector("[data-tooltip]") as HTMLElement;
        expect(tip).toHaveAttribute("data-position", "left");
    });

    it("reflects the showOn prop into data-show-on", () => {
        const { container } = render(<Fixture showOn="click" />);
        const tip = container.querySelector("[data-tooltip]") as HTMLElement;
        expect(tip).toHaveAttribute("data-show-on", "click");
    });
});

describe("Tooltip — id is colon-free (useId)", () => {
    it("renders a tooltip id with no colons in it", () => {
        const { container } = render(<Fixture />);
        const tip = container.querySelector("[data-tooltip]") as HTMLElement;

        expect(tip.id).toMatch(/^tooltip-/);
        expect(tip.id).not.toContain(":");
    });

    it("gives independent tooltips distinct, colon-free ids", () => {
        render(
            <>
                <button id="a-btn" type="button">A</button>
                <Tooltip isTooltipFor="a-btn">Tip A</Tooltip>
                <button id="b-btn" type="button">B</button>
                <Tooltip isTooltipFor="b-btn">Tip B</Tooltip>
            </>,
        );
        const tips = document.querySelectorAll("[data-tooltip]");
        const ids  = Array.from(tips).map((t) => t.id);

        expect(ids).toHaveLength(2);
        expect(ids[0]).not.toBe(ids[1]);
        ids.forEach((id) => expect(id).not.toContain(":"));
    });
});

describe("Tooltip — inline anchor-positioning custom property", () => {
    it("emits position-anchor pointing at a matching --anchor-* name", () => {
        const { container } = render(<Fixture />);
        const tip = container.querySelector("[data-tooltip]") as HTMLElement;

        const positionAnchor = tip.style.getPropertyValue("position-anchor");
        expect(positionAnchor).toMatch(/^--anchor-/);
        expect(positionAnchor).not.toContain(":");
    });

    it("does not set z-index when zIndex is omitted", () => {
        const { container } = render(<Fixture />);
        const tip = container.querySelector("[data-tooltip]") as HTMLElement;
        expect(tip.style.zIndex).toBe("");
    });

    it("sets inline z-index when zIndex is provided", () => {
        const { container } = render(<Fixture zIndex={42} />);
        const tip = container.querySelector("[data-tooltip]") as HTMLElement;
        expect(tip.style.zIndex).toBe("42");
    });
});

describe("Tooltip — ARIA + anchor wiring onto the target", () => {
    it("points the target's aria-describedby at the tooltip id", () => {
        const { container } = render(<Fixture />);
        const tip    = container.querySelector("[data-tooltip]") as HTMLElement;
        const target = container.querySelector("#save-btn") as HTMLElement;

        expect(target).toHaveAttribute("aria-describedby", tip.id);
    });

    it("brands the target with an anchor-name matching the tooltip's position-anchor", () => {
        const { container } = render(<Fixture />);
        const tip    = container.querySelector("[data-tooltip]") as HTMLElement;
        const target = container.querySelector("#save-btn") as HTMLElement;

        const anchorName     = target.style.getPropertyValue("anchor-name");
        const positionAnchor = tip.style.getPropertyValue("position-anchor");

        expect(anchorName).toMatch(/^--anchor-/);
        expect(anchorName).toBe(positionAnchor);
    });

    it("cleans up the target's anchor-name and aria-describedby on unmount", () => {
        const { container, unmount } = render(<Fixture />);
        const target = container.querySelector("#save-btn") as HTMLElement;

        // Wired up after mount...
        expect(target).toHaveAttribute("aria-describedby");
        expect(target.style.getPropertyValue("anchor-name")).not.toBe("");

        unmount();

        // ...and torn down by the effect cleanup.
        expect(target).not.toHaveAttribute("aria-describedby");
        expect(target.style.getPropertyValue("anchor-name")).toBe("");
    });

    it("leaves the target untouched when isTooltipFor matches no element", () => {
        // The effect bails early when document.getElementById finds nothing.
        const { container } = render(
            <Tooltip isTooltipFor="does-not-exist">Orphan tip</Tooltip>,
        );
        const tip = container.querySelector("[data-tooltip]") as HTMLElement;

        // The popover markup still renders fully...
        expect(tip).toHaveAttribute("role", "tooltip");
        expect(tip).toHaveAttribute("popover", "manual");
        // ...there is just no target to wire to.
        expect(document.getElementById("does-not-exist")).toBeNull();
    });
});

describe("Tooltip — a11y", () => {
    it("has no axe violations for a labelled target + tooltip pair", async () => {
        const { container } = render(<Fixture />);
        expect(await axe(container)).toHaveNoViolations();
    });
});
