import { describe, it, expect } from "vitest";
import "../../../vitest-matchers";
import { render, screen } from "@testing-library/react";
import { axe } from "vitest-axe";

import { ButtonGroup } from "./ButtonGroup";

// ButtonGroup wraps Element with role="group" + data-button-group, and pushes a
// few of its own recipe props (isJoint / spacing / equaliseWidth) onto the class
// list. Vertical stacking is NOT a ButtonGroup prop — it rides through on
// Element's `listVertically`, whose class the button-group.css keys off.
//
// Regression focus: the beta-18 rename means vertical stacking now emits
// "list-vertically" (was "stack-vertically"). These tests pin that the class
// the CSS depends on is the one that actually reaches the DOM.

describe("ButtonGroup — rendering", () => {
    it("renders a <div> with role=group and data-button-group", () => {
        render(
            <ButtonGroup data-testid="bg">
                <button>One</button>
            </ButtonGroup>,
        );
        const bg = screen.getByTestId("bg");
        expect(bg.tagName).toBe("DIV");
        expect(bg).toHaveAttribute("role", "group");
        expect(bg).toHaveAttribute("data-button-group");
    });

    it("is joint by default (is-joint class, no spacing class)", () => {
        render(
            <ButtonGroup data-testid="bg">
                <button>One</button>
                <button>Two</button>
            </ButtonGroup>,
        );
        const bg = screen.getByTestId("bg");
        expect(bg).toHaveClass("is-joint");
        expect(bg.className).not.toMatch(/spacing-/);
    });

    it("renders its children", () => {
        render(
            <ButtonGroup>
                <button>One</button>
                <button>Two</button>
            </ButtonGroup>,
        );
        expect(screen.getByRole("button", { name: "One" })).toBeInTheDocument();
        expect(screen.getByRole("button", { name: "Two" })).toBeInTheDocument();
    });
});

describe("ButtonGroup — recipe props", () => {
    it("adds equal-width when equaliseWidth is set", () => {
        render(
            <ButtonGroup data-testid="bg" equaliseWidth>
                <button>One</button>
                <button>Two</button>
            </ButtonGroup>,
        );
        expect(screen.getByTestId("bg")).toHaveClass("equal-width");
    });

    it("applies spacing-<token> only when NOT joint", () => {
        render(
            <ButtonGroup data-testid="bg" isJoint={false} spacing="medium">
                <button>One</button>
                <button>Two</button>
            </ButtonGroup>,
        );
        const bg = screen.getByTestId("bg");
        expect(bg).toHaveClass("spacing-medium");
        expect(bg).not.toHaveClass("is-joint");
    });

    it("ignores spacing while joint (the default), emitting is-joint and no spacing class", () => {
        render(
            <ButtonGroup data-testid="bg" spacing="large">
                <button>One</button>
                <button>Two</button>
            </ButtonGroup>,
        );
        const bg = screen.getByTestId("bg");
        expect(bg).toHaveClass("is-joint");
        expect(bg.className).not.toMatch(/spacing-/);
    });
});

describe("ButtonGroup — vertical stacking (regression: list-vertically rename)", () => {
    it("emits `list-vertically` (NOT `stack-vertically`) for the vertical layout prop", () => {
        render(
            <ButtonGroup data-testid="bg" listVertically>
                <button>One</button>
                <button>Two</button>
            </ButtonGroup>,
        );
        const bg = screen.getByTestId("bg");
        expect(bg).toHaveClass("list-vertically");
        expect(bg).not.toHaveClass("stack-vertically");
    });

    it("combines is-joint with list-vertically so the CSS radius rules can match", () => {
        render(
            <ButtonGroup data-testid="bg" listVertically>
                <button>One</button>
                <button>Two</button>
            </ButtonGroup>,
        );
        const bg = screen.getByTestId("bg");
        expect(bg).toHaveClass("is-joint", "list-vertically");
    });

    it("combines equal-width with list-vertically (the equal-width vertical CSS path)", () => {
        render(
            <ButtonGroup data-testid="bg" equaliseWidth listVertically>
                <button>One</button>
                <button>Two</button>
            </ButtonGroup>,
        );
        const bg = screen.getByTestId("bg");
        expect(bg).toHaveClass("equal-width", "list-vertically");
    });
});

describe("ButtonGroup — a11y", () => {
    it("has no axe violations for a labelled group of buttons", async () => {
        const { container } = render(
            <ButtonGroup aria-label="Text formatting">
                <button>Bold</button>
                <button>Italic</button>
                <button>Underline</button>
            </ButtonGroup>,
        );
        expect(await axe(container)).toHaveNoViolations();
    });
});
