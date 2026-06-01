import { describe, it, expect } from "vitest";
import "../../../vitest-matchers";
import { render, screen } from "@testing-library/react";
import { axe } from "vitest-axe";

import { Element } from "./Element";

// Element is the prop engine for the whole library: every recipe prop becomes a
// className or an inline style here. These tests pin that contract — they are
// the regression net for the beta-18/19 spacing / layout prop work, and the
// guard rail for the planned prop-engine refactor (they assert the public
// output, so they survive an internal rewrite).

describe("Element — rendering", () => {
    it("renders a <div> by default", () => {
        render(<Element data-testid="el">hi</Element>);
        expect(screen.getByTestId("el").tagName).toBe("DIV");
    });

    it("honours the `as` prop", () => {
        render(<Element as="section" data-testid="el">hi</Element>);
        expect(screen.getByTestId("el").tagName).toBe("SECTION");
    });

    it("merges the `classNames` array onto the element", () => {
        render(<Element data-testid="el" classNames={[ "one", "two" ]}>hi</Element>);
        const el = screen.getByTestId("el");
        expect(el).toHaveClass("one", "two");
    });
});

describe("Element — spacing props (token -> class, length -> inline style)", () => {
    it("emits a utility class for a scale token", () => {
        render(<Element data-testid="el" gap="medium" padding="small" margin="large">hi</Element>);
        const el = screen.getByTestId("el");
        expect(el).toHaveClass("gap-medium", "padding-all-small", "margin-all-large");
        // tokens must NOT leak into inline style
        expect(el.style.gap).toBe("");
        expect(el.style.padding).toBe("");
    });

    it("applies an arbitrary CSS length via inline style (no class)", () => {
        render(<Element data-testid="el" gap="20vw" padding="4px" margin="calc(100% - 8px)">hi</Element>);
        const el = screen.getByTestId("el");
        expect(el).toHaveStyle({ gap: "20vw", padding: "4px" });
        expect(el.style.margin).toBe("calc(100% - 8px)");
        expect(el.className).not.toMatch(/gap-|padding-all-|margin-all-/);
    });

    it("expands horizontalMargin / verticalMargin to both sides", () => {
        render(<Element data-testid="tok" horizontalMargin="tiny" verticalPadding="huge">hi</Element>);
        expect(screen.getByTestId("tok")).toHaveClass(
            "margin-right-tiny", "margin-left-tiny", "padding-top-huge", "padding-bottom-huge",
        );

        render(<Element data-testid="len" horizontalMargin="2rem">hi</Element>);
        const len = screen.getByTestId("len");
        expect(len.style.marginLeft).toBe("2rem");
        expect(len.style.marginRight).toBe("2rem");
    });
});

describe("Element — layout props", () => {
    it("listVertically / listHorizontally add the flex classes", () => {
        render(<Element data-testid="v" listVertically>hi</Element>);
        expect(screen.getByTestId("v")).toHaveClass("list-vertically");

        render(<Element data-testid="h" listHorizontally>hi</Element>);
        expect(screen.getByTestId("h")).toHaveClass("list-horizontally");
    });

    it("layoutAsGrid adds layout-grid", () => {
        render(<Element data-testid="el" layoutAsGrid>hi</Element>);
        expect(screen.getByTestId("el")).toHaveClass("layout-grid");
    });

    it("columns implies grid and sets grid-template-columns", () => {
        render(<Element data-testid="el" columns={3}>hi</Element>);
        const el = screen.getByTestId("el");
        expect(el).toHaveClass("layout-grid");
        expect(el).toHaveStyle({ gridTemplateColumns: "repeat(3, 1fr)" });
    });
});

describe("Element — colour & opacity", () => {
    it("maps colour props to utility classes (US + British spellings)", () => {
        render(<Element data-testid="el" bgColour="green" textColor="white">hi</Element>);
        expect(screen.getByTestId("el")).toHaveClass("bg-green", "text-white");
    });

    it("writes bgOpacity as the --bg-opacity custom property (value / 100)", () => {
        render(<Element data-testid="el" bgColour="green" bgOpacity="40">hi</Element>);
        expect(screen.getByTestId("el").style.getPropertyValue("--bg-opacity")).toBe("0.4");
    });
});

describe("Element — a11y", () => {
    it("has no axe violations for a basic render", async () => {
        const { container } = render(<Element as="p">Readable content</Element>);
        expect(await axe(container)).toHaveNoViolations();
    });
});
