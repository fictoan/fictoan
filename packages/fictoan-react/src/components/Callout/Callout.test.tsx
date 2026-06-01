import { describe, it, expect } from "vitest";
import "../../../vitest-matchers";
import { render, screen } from "@testing-library/react";
import { axe } from "vitest-axe";

import { Callout } from "./Callout";

// Callout maps `kind` to a className + ARIA role/live region, and (beta-19) now
// renders the `title` as a visible .callout-title <p> wired to the callout via
// aria-labelledby. These tests pin that title id wiring and the kind contract —
// the title work was a regression-prone change (was aria-label only before).

describe("Callout — rendering & kind", () => {
    it("renders a <div> carrying data-callout and the kind class", () => {
        render(<Callout kind="info" data-testid="callout">Heads up</Callout>);
        const el = screen.getByTestId("callout");
        expect(el.tagName).toBe("DIV");
        expect(el).toHaveAttribute("data-callout");
        expect(el).toHaveClass("info");
    });

    it("emits the bare kind string as the class for each kind", () => {
        const kinds = ["info", "success", "warning", "error"] as const;
        for (const kind of kinds) {
            const { unmount } = render(
                <Callout kind={kind} data-testid={`callout-${kind}`}>body</Callout>,
            );
            expect(screen.getByTestId(`callout-${kind}`)).toHaveClass(kind);
            unmount();
        }
    });

    it("renders its children", () => {
        render(<Callout kind="info" data-testid="callout"><span>inner content</span></Callout>);
        expect(screen.getByText("inner content")).toBeInTheDocument();
    });
});

describe("Callout — role & aria-live mapping", () => {
    it("info and success are role=status / aria-live=polite", () => {
        render(<Callout kind="info" data-testid="info">i</Callout>);
        const info = screen.getByTestId("info");
        expect(info).toHaveAttribute("role", "status");
        expect(info).toHaveAttribute("aria-live", "polite");

        render(<Callout kind="success" data-testid="success">s</Callout>);
        const success = screen.getByTestId("success");
        expect(success).toHaveAttribute("role", "status");
        expect(success).toHaveAttribute("aria-live", "polite");
    });

    it("warning and error are role=alert / aria-live=assertive", () => {
        render(<Callout kind="warning" data-testid="warning">w</Callout>);
        const warning = screen.getByTestId("warning");
        expect(warning).toHaveAttribute("role", "alert");
        expect(warning).toHaveAttribute("aria-live", "assertive");

        render(<Callout kind="error" data-testid="error">e</Callout>);
        const error = screen.getByTestId("error");
        expect(error).toHaveAttribute("role", "alert");
        expect(error).toHaveAttribute("aria-live", "assertive");
    });
});

describe("Callout — title id wiring (beta-19 regression)", () => {
    it("renders a .callout-title <p> with the title text when `title` is given", () => {
        render(<Callout kind="info" title="Important" data-testid="callout">body</Callout>);
        const titleEl = screen.getByText("Important");
        expect(titleEl.tagName).toBe("P");
        expect(titleEl).toHaveClass("callout-title");
        expect(titleEl).toHaveAttribute("id");
    });

    it("points aria-labelledby at the title element's id", () => {
        render(<Callout kind="info" title="Important" data-testid="callout">body</Callout>);
        const el = screen.getByTestId("callout");
        const titleEl = screen.getByText("Important");

        const labelledBy = el.getAttribute("aria-labelledby");
        expect(labelledBy).toBeTruthy();
        expect(labelledBy).toBe(titleEl.id);
    });

    it("uses a React.useId-based id with no colons, prefixed callout-title-", () => {
        render(<Callout kind="info" title="Important">body</Callout>);
        const titleEl = screen.getByText("Important");
        expect(titleEl.id).toMatch(/^callout-title-/);
        expect(titleEl.id).not.toContain(":");
    });

    it("renders no .callout-title and no aria-labelledby when `title` is absent", () => {
        const { container } = render(
            <Callout kind="info" data-testid="callout">just a body</Callout>,
        );
        const el = screen.getByTestId("callout");
        expect(container.querySelector(".callout-title")).toBeNull();
        expect(el).not.toHaveAttribute("aria-labelledby");
    });
});

describe("Callout — a11y", () => {
    it("has no axe violations with a title", async () => {
        const { container } = render(
            <Callout kind="warning" title="Heads up">
                Your session will expire in 5 minutes.
            </Callout>,
        );
        expect(await axe(container)).toHaveNoViolations();
    });

    it("has no axe violations without a title", async () => {
        const { container } = render(
            <Callout kind="info">Settings saved successfully.</Callout>,
        );
        expect(await axe(container)).toHaveNoViolations();
    });
});
