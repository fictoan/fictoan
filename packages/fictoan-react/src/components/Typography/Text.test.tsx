// TESTS ===============================================================================================================
import "../../../vitest-matchers";
import { axe } from "vitest-axe";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";

// OTHER ===============================================================================================================
import { Text } from "./Text";

// Text is the paragraph primitive: it always renders a <p> and turns its
// typography recipe props (weight / size / fontStyle / align / isSubtext) into
// the classNames Element renders. These tests pin that mapping.
//
// REGRESSION (beta-19): the default fontStyle was removed — Text must NOT emit
// `font-sans-serif` (or any font-* class) unless fontStyle is passed; the font
// is inherited from the cascade.

describe("Text — rendering", () => {
    it("always renders a <p>", () => {
        render(<Text data-testid="t">paragraph</Text>);
        expect(screen.getByTestId("t").tagName).toBe("P");
    });
});

describe("Text — default fontStyle removed (beta-19 regression)", () => {
    it("emits NO font-* class by default", () => {
        render(<Text data-testid="t">Inherits the font</Text>);
        const el = screen.getByTestId("t");
        expect(el.className).not.toMatch(/\bfont-/);
        expect(el).not.toHaveClass("font-sans-serif");
    });

    it("applies an explicit fontStyle when passed", () => {
        render(<Text data-testid="serif" fontStyle="serif">A</Text>);
        render(<Text data-testid="mono" fontStyle="monospace">B</Text>);
        render(<Text data-testid="sans" fontStyle="sans-serif">C</Text>);

        expect(screen.getByTestId("serif")).toHaveClass("font-serif");
        expect(screen.getByTestId("mono")).toHaveClass("font-monospace");
        expect(screen.getByTestId("sans")).toHaveClass("font-sans-serif");
    });
});

describe("Text — recipe prop -> class mapping", () => {
    it("maps weight to a weight-* class", () => {
        render(<Text data-testid="t" weight="300">Light</Text>);
        expect(screen.getByTestId("t")).toHaveClass("weight-300");
    });

    it("maps size to a text-* size class", () => {
        render(<Text data-testid="large" size="large">A</Text>);
        render(<Text data-testid="tiny" size="tiny">B</Text>);

        expect(screen.getByTestId("large")).toHaveClass("text-large");
        expect(screen.getByTestId("tiny")).toHaveClass("text-tiny");
    });

    it("adds sub-text when isSubtext is set", () => {
        render(<Text data-testid="t" isSubtext>Fine print</Text>);
        expect(screen.getByTestId("t")).toHaveClass("sub-text");
    });

    it("does not add sub-text by default", () => {
        render(<Text data-testid="t">Normal</Text>);
        expect(screen.getByTestId("t")).not.toHaveClass("sub-text");
    });

    it("maps align to a text-* class (British and US spellings)", () => {
        render(<Text data-testid="centre" align="centre">A</Text>);
        render(<Text data-testid="center" align="center">B</Text>);
        render(<Text data-testid="left" align="left">C</Text>);

        expect(screen.getByTestId("centre")).toHaveClass("text-centre");
        expect(screen.getByTestId("center")).toHaveClass("text-center");
        expect(screen.getByTestId("left")).toHaveClass("text-left");
    });

    it("maps colour props through Element to utility classes", () => {
        render(<Text data-testid="t" textColour="red" bgColour="blue">Coloured</Text>);
        expect(screen.getByTestId("t")).toHaveClass("text-red", "bg-blue");
    });

    it("combines multiple recipe props onto one element", () => {
        render(
            <Text data-testid="t" weight="500" size="small" fontStyle="monospace" isSubtext align="right">
                Combined
            </Text>,
        );
        const el = screen.getByTestId("t");
        expect(el).toHaveClass("weight-500", "text-small", "font-monospace", "sub-text", "text-right");
    });

    it("emits no recipe classes at all when no recipe props are passed", () => {
        render(<Text data-testid="t">Plain</Text>);
        const el = screen.getByTestId("t");
        expect(el.className).not.toMatch(/\bweight-/);
        expect(el.className).not.toMatch(/\bfont-/);
        expect(el.className).not.toMatch(/\bsub-text\b/);
    });
});

describe("Text — a11y", () => {
    it("has no axe violations for a paragraph with text content", async () => {
        const { container } = render(<Text>A readable paragraph of body copy.</Text>);
        expect(await axe(container)).toHaveNoViolations();
    });
});
