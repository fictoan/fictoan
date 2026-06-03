// TESTS ===============================================================================================================
import "../../../vitest-matchers";
import { axe } from "vitest-axe";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";

// OTHER ===============================================================================================================
import { Spinner } from "./Spinner";

// Spinner is a thin presentational wrapper over Element: it renders a <div>
// with the live-region status ARIA contract, maps `size` to a `size-*` class,
// and uses `loadingText` as the accessible name. These tests pin that emitted
// markup contract.

describe("Spinner — rendering", () => {
    it("renders a <div> with the data-spinner marker", () => {
        render(<Spinner data-testid="spin" />);
        const el = screen.getByTestId("spin");
        expect(el.tagName).toBe("DIV");
        expect(el).toHaveAttribute("data-spinner");
    });

    it("defaults to size-medium", () => {
        render(<Spinner data-testid="spin" />);
        expect(screen.getByTestId("spin")).toHaveClass("size-medium");
    });

    it("maps each `size` token to a size-* class", () => {
        const sizes = ["tiny", "small", "medium", "large", "huge"] as const;
        sizes.forEach((size) => {
            render(<Spinner data-testid={`spin-${size}`} size={size} />);
            expect(screen.getByTestId(`spin-${size}`)).toHaveClass(`size-${size}`);
        });
    });
});

describe("Spinner — ARIA contract", () => {
    it("exposes a polite, busy status live region", () => {
        render(<Spinner data-testid="spin" />);
        const el = screen.getByTestId("spin");
        expect(el).toHaveAttribute("role", "status");
        expect(el).toHaveAttribute("aria-busy", "true");
        expect(el).toHaveAttribute("aria-live", "polite");
    });

    it("uses the default loading text as the accessible name", () => {
        render(<Spinner data-testid="spin" />);
        expect(screen.getByTestId("spin")).toHaveAttribute("aria-label", "Loading...");
    });

    it("honours a custom `loadingText`", () => {
        render(<Spinner data-testid="spin" loadingText="Fetching results" />);
        expect(screen.getByTestId("spin")).toHaveAttribute("aria-label", "Fetching results");
    });
});

describe("Spinner — a11y", () => {
    it("has no axe violations", async () => {
        const { container } = render(<Spinner loadingText="Loading your dashboard" />);
        expect(await axe(container)).toHaveNoViolations();
    });
});
