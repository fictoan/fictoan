// TESTS ===============================================================================================================
import "../../../vitest-matchers";
import { axe } from "vitest-axe";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";

// OTHER ===============================================================================================================
import { Heading1, Heading2, Heading3, Heading4, Heading5, Heading6 } from "./Heading";

// Heading1..6 are thin wrappers over Element: each fixes the tag (h1..h6) and
// turns the typography recipe props (weight / fontStyle / align) into the
// classNames Element renders. These tests pin that mapping.
//
// REGRESSION (beta-19): the default fontStyle was removed — a Heading must NOT
// emit `font-sans-serif` (or any font-* class) unless fontStyle is passed
// explicitly. The font is meant to be inherited from the cascade now.

describe("Heading — tag mapping", () => {
    it("renders the correct heading tag for each level", () => {
        render(<Heading1 data-testid="h1">one</Heading1>);
        render(<Heading2 data-testid="h2">two</Heading2>);
        render(<Heading3 data-testid="h3">three</Heading3>);
        render(<Heading4 data-testid="h4">four</Heading4>);
        render(<Heading5 data-testid="h5">five</Heading5>);
        render(<Heading6 data-testid="h6">six</Heading6>);

        expect(screen.getByTestId("h1").tagName).toBe("H1");
        expect(screen.getByTestId("h2").tagName).toBe("H2");
        expect(screen.getByTestId("h3").tagName).toBe("H3");
        expect(screen.getByTestId("h4").tagName).toBe("H4");
        expect(screen.getByTestId("h5").tagName).toBe("H5");
        expect(screen.getByTestId("h6").tagName).toBe("H6");
    });
});

describe("Heading — default fontStyle removed (beta-19 regression)", () => {
    it("emits NO font-* class by default", () => {
        render(<Heading1 data-testid="h">Inherits the font</Heading1>);
        const el = screen.getByTestId("h");
        expect(el.className).not.toMatch(/\bfont-/);
        // explicit guard against the removed default
        expect(el).not.toHaveClass("font-sans-serif");
    });

    it("applies an explicit fontStyle when passed", () => {
        render(<Heading1 data-testid="serif" fontStyle="serif">A</Heading1>);
        render(<Heading2 data-testid="mono" fontStyle="monospace">B</Heading2>);
        render(<Heading3 data-testid="sans" fontStyle="sans-serif">C</Heading3>);

        expect(screen.getByTestId("serif")).toHaveClass("font-serif");
        expect(screen.getByTestId("mono")).toHaveClass("font-monospace");
        expect(screen.getByTestId("sans")).toHaveClass("font-sans-serif");
    });
});

describe("Heading — recipe prop -> class mapping", () => {
    it("maps weight to a weight-* class", () => {
        render(<Heading1 data-testid="h" weight="700">Bold</Heading1>);
        expect(screen.getByTestId("h")).toHaveClass("weight-700");
    });

    it("maps align to a text-* class (British and US spellings)", () => {
        render(<Heading1 data-testid="centre" align="centre">A</Heading1>);
        render(<Heading2 data-testid="center" align="center">B</Heading2>);
        render(<Heading3 data-testid="right" align="right">C</Heading3>);

        expect(screen.getByTestId("centre")).toHaveClass("text-centre");
        expect(screen.getByTestId("center")).toHaveClass("text-center");
        expect(screen.getByTestId("right")).toHaveClass("text-right");
    });

    it("maps colour props through Element to utility classes", () => {
        render(<Heading1 data-testid="h" textColour="white" bgColour="green">Coloured</Heading1>);
        expect(screen.getByTestId("h")).toHaveClass("text-white", "bg-green");
    });

    it("combines multiple recipe props onto one element", () => {
        render(
            <Heading2 data-testid="h" weight="600" fontStyle="serif" align="right">
                Combined
            </Heading2>,
        );
        const el = screen.getByTestId("h");
        expect(el).toHaveClass("weight-600", "font-serif", "text-right");
    });

    it("emits no recipe classes at all when no recipe props are passed", () => {
        render(<Heading1 data-testid="h">Plain</Heading1>);
        const el = screen.getByTestId("h");
        expect(el.className).not.toMatch(/\bweight-/);
        expect(el.className).not.toMatch(/\bfont-/);
        expect(el.className).not.toMatch(/\btext-(left|right|centre|center)\b/);
    });
});

describe("Heading — a11y", () => {
    it("has no axe violations for a heading with text content", async () => {
        const { container } = render(<Heading1>Page title</Heading1>);
        expect(await axe(container)).toHaveNoViolations();
    });
});
