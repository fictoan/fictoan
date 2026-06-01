import { describe, it, expect } from "vitest";
import "../../../vitest-matchers";
import { render, screen } from "@testing-library/react";
import { axe } from "vitest-axe";

import { Portion } from "./Portion";

// Portion is the column primitive inside a Row. Its only real logic is turning
// the span props (desktop / tablet-landscape / tablet-portrait / mobile),
// `fillLeftoverWidth` and `isHorizontal` into the className strings that the
// grid/flex CSS keys off. These tests pin that span/class contract — the recent
// beta-19 work — so the markup stays stable while the grid maths itself is left
// to the browser tier. Geometry, @container breakpoints and flex/grid layout
// are intentionally NOT asserted here (jsdom returns all-zero geometry and does
// not evaluate @container).

describe("Portion — rendering", () => {
    it("renders a <div> carrying the data-portion marker", () => {
        render(<Portion data-testid="p">content</Portion>);
        const el = screen.getByTestId("p");
        expect(el.tagName).toBe("DIV");
        expect(el).toHaveAttribute("data-portion");
    });

    it("renders its children", () => {
        render(<Portion data-testid="p">hello world</Portion>);
        expect(screen.getByTestId("p")).toHaveTextContent("hello world");
    });
});

describe("Portion — default span (no span prop, no fillLeftoverWidth)", () => {
    it("falls back to the `whole` class", () => {
        render(<Portion data-testid="p">content</Portion>);
        expect(screen.getByTestId("p")).toHaveClass("whole");
    });

    it("does not emit `fill-leftover-width` or `horizontal`", () => {
        render(<Portion data-testid="p">content</Portion>);
        const el = screen.getByTestId("p");
        expect(el).not.toHaveClass("fill-leftover-width");
        expect(el).not.toHaveClass("horizontal");
    });
});

describe("Portion — fillLeftoverWidth", () => {
    it("emits `fill-leftover-width` and NOT `whole`", () => {
        render(<Portion data-testid="p" fillLeftoverWidth>content</Portion>);
        const el = screen.getByTestId("p");
        expect(el).toHaveClass("fill-leftover-width");
        expect(el).not.toHaveClass("whole");
    });
});

describe("Portion — explicit desktop span", () => {
    it("applies a named fractional span class verbatim", () => {
        render(<Portion data-testid="p" desktopSpan="half">content</Portion>);
        const el = screen.getByTestId("p");
        expect(el).toHaveClass("half");
        // an explicit span suppresses the `whole` fallback
        expect(el).not.toHaveClass("whole");
    });

    it("applies a numeric span class verbatim", () => {
        render(<Portion data-testid="p" desktopSpan="6">content</Portion>);
        const el = screen.getByTestId("p");
        expect(el).toHaveClass("6");
        expect(el).not.toHaveClass("whole");
    });
});

describe("Portion — responsive span props", () => {
    it("suffixes the tablet-landscape span with -on-tablet-landscape", () => {
        render(<Portion data-testid="p" tabletLandscapeSpan="half">content</Portion>);
        const el = screen.getByTestId("p");
        expect(el).toHaveClass("half-on-tablet-landscape");
        // a responsive-only span still suppresses `whole`
        expect(el).not.toHaveClass("whole");
    });

    it("suffixes the tablet-portrait span with -on-tablet-portrait", () => {
        render(<Portion data-testid="p" tabletPortraitSpan="one-third">content</Portion>);
        expect(screen.getByTestId("p")).toHaveClass("one-third-on-tablet-portrait");
    });

    it("suffixes the mobile span with -on-mobile", () => {
        render(<Portion data-testid="p" mobileSpan="whole">content</Portion>);
        expect(screen.getByTestId("p")).toHaveClass("whole-on-mobile");
    });

    it("combines every breakpoint span into one class list", () => {
        render(
            <Portion
                data-testid="p"
                desktopSpan="half"
                tabletLandscapeSpan="two-third"
                tabletPortraitSpan="three-fourth"
                mobileSpan="whole"
            >
                content
            </Portion>,
        );
        const el = screen.getByTestId("p");
        expect(el).toHaveClass(
            "half",
            "two-third-on-tablet-landscape",
            "three-fourth-on-tablet-portrait",
            "whole-on-mobile",
        );
        expect(el).not.toHaveClass("whole");
    });
});

describe("Portion — isHorizontal", () => {
    it("adds the `horizontal` class alongside the span class", () => {
        render(<Portion data-testid="p" isHorizontal>content</Portion>);
        const el = screen.getByTestId("p");
        expect(el).toHaveClass("horizontal");
        // isHorizontal alone does not change the span, so `whole` still applies
        expect(el).toHaveClass("whole");
    });
});

describe("Portion — span + fillLeftoverWidth together (characterisation)", () => {
    // CURRENT behaviour: a span prop suppresses `whole`, but `fill-leftover-width`
    // lives in its own independent `if`, so BOTH the span class and
    // `fill-leftover-width` are emitted. See findings — this is likely a bug
    // (two competing sizing classes on one element), pinned here as a baseline.
    it("emits both the span class and fill-leftover-width", () => {
        render(
            <Portion data-testid="p" desktopSpan="half" fillLeftoverWidth>
                content
            </Portion>,
        );
        const el = screen.getByTestId("p");
        expect(el).toHaveClass("half");
        expect(el).toHaveClass("fill-leftover-width");
        expect(el).not.toHaveClass("whole");
    });
});

describe("Portion — passthrough props", () => {
    it("forwards arbitrary recipe props down to the underlying Element", () => {
        render(<Portion data-testid="p" bgColour="green" id="sidebar">content</Portion>);
        const el = screen.getByTestId("p");
        expect(el).toHaveClass("bg-green");
        expect(el).toHaveAttribute("id", "sidebar");
    });

    it("honours an explicit role", () => {
        render(<Portion data-testid="p" role="complementary">content</Portion>);
        expect(screen.getByTestId("p")).toHaveAttribute("role", "complementary");
    });
});

describe("Portion — a11y", () => {
    it("has no axe violations for a labelled landmark portion", async () => {
        const { container } = render(
            <Portion {...({ as: "section" } as object)} aria-label="Sidebar" desktopSpan="one-third">
                Readable sidebar content
            </Portion>,
        );
        expect(await axe(container)).toHaveNoViolations();
    });
});
