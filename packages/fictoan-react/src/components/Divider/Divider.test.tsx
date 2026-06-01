import { describe, it, expect } from "vitest";
import "../../../vitest-matchers";
import { render, screen } from "@testing-library/react";
import { axe } from "vitest-axe";

import { Divider } from "./Divider";

// Divider is a thin presentational wrapper over Element: it renders an <hr>,
// pins the separator ARIA contract, pushes its `kind` straight through as a
// raw className, and forwards `height` as an inline style. These tests pin
// that emitted markup contract.

describe("Divider — rendering", () => {
    it("renders an <hr> with the data-hrule marker", () => {
        render(<Divider data-testid="div" />);
        const el = screen.getByTestId("div");
        expect(el.tagName).toBe("HR");
        expect(el).toHaveAttribute("data-hrule");
    });

    it("pushes `kind` through verbatim as a className", () => {
        render(<Divider data-testid="div" kind="primary" />);
        expect(screen.getByTestId("div")).toHaveClass("primary");

        render(<Divider data-testid="sec" kind="secondary" />);
        expect(screen.getByTestId("sec")).toHaveClass("secondary");

        render(<Divider data-testid="ter" kind="tertiary" />);
        expect(screen.getByTestId("ter")).toHaveClass("tertiary");
    });

    it("omits any kind class when `kind` is not given", () => {
        render(<Divider data-testid="div" />);
        const el = screen.getByTestId("div");
        expect(el).not.toHaveClass("primary", "secondary", "tertiary");
    });

    it("applies `height` as an inline style", () => {
        render(<Divider data-testid="div" height="4px" />);
        expect(screen.getByTestId("div").style.height).toBe("4px");
    });
});

describe("Divider — ARIA contract", () => {
    it("sets the separator role and horizontal orientation", () => {
        render(<Divider data-testid="div" />);
        const el = screen.getByTestId("div");
        expect(el).toHaveAttribute("role", "separator");
        expect(el).toHaveAttribute("aria-orientation", "horizontal");
    });

    it("wires `label` to aria-label", () => {
        render(<Divider data-testid="div" label="Section break" />);
        expect(screen.getByTestId("div")).toHaveAttribute("aria-label", "Section break");
    });
});

describe("Divider — a11y", () => {
    it("has no axe violations", async () => {
        const { container } = render(
            <div>
                <p>Above the divider</p>
                <Divider kind="primary" label="Section break" />
                <p>Below the divider</p>
            </div>,
        );
        expect(await axe(container)).toHaveNoViolations();
    });
});
