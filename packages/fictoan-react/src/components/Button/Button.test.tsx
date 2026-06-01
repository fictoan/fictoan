import { describe, it, expect, vi } from "vitest";
import "../../../vitest-matchers";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "vitest-axe";

import { Button } from "./Button";

// Button is a thin wrapper over Element: each of its own props (kind / variant /
// size / shape / isLoading) becomes a className, and it pins a small set of
// attributes (data-button, aria-* mirroring of disabled / loading). These tests
// characterise that public output — the exact class strings and attributes a
// consumer (and the CSS) depend on.

describe("Button — rendering", () => {
    it("renders a native <button> with the data-button marker", () => {
        render(<Button>Click me</Button>);
        const btn = screen.getByRole("button", { name: "Click me" });
        expect(btn.tagName).toBe("BUTTON");
        expect(btn).toHaveAttribute("data-button");
    });

    it("always emits size-medium by default (size defaults to \"medium\")", () => {
        render(<Button>Default</Button>);
        expect(screen.getByRole("button", { name: "Default" })).toHaveClass("size-medium");
    });
});

describe("Button — variant classes", () => {
    it("maps `kind` straight through as a class name", () => {
        render(<Button kind="primary">Primary</Button>);
        expect(screen.getByRole("button", { name: "Primary" })).toHaveClass("primary");
    });

    it("maps `variant` straight through as a class name", () => {
        render(<Button variant="danger">Delete</Button>);
        expect(screen.getByRole("button", { name: "Delete" })).toHaveClass("danger");
    });

    it("maps `size` to size-<token>", () => {
        render(<Button size="large">Big</Button>);
        expect(screen.getByRole("button", { name: "Big" })).toHaveClass("size-large");
    });

    it("maps `shape` to shape-<token>", () => {
        render(<Button shape="rounded">Round</Button>);
        expect(screen.getByRole("button", { name: "Round" })).toHaveClass("shape-rounded");
    });

    it("stacks kind + variant + size + shape together", () => {
        render(
            <Button kind="secondary" variant="warning" size="small" shape="curved">
                Stacked
            </Button>,
        );
        expect(screen.getByRole("button", { name: "Stacked" })).toHaveClass(
            "secondary", "warning", "size-small", "shape-curved",
        );
    });
});

describe("Button — disabled state", () => {
    it("sets the native disabled attribute and aria-disabled", () => {
        render(<Button disabled>Off</Button>);
        const btn = screen.getByRole("button", { name: "Off" });
        expect(btn).toBeDisabled();
        expect(btn).toHaveAttribute("aria-disabled", "true");
    });

    it("does not fire onClick when disabled", async () => {
        const user = userEvent.setup();
        const onClick = vi.fn();
        render(<Button disabled onClick={onClick}>Off</Button>);
        await user.click(screen.getByRole("button", { name: "Off" }));
        expect(onClick).not.toHaveBeenCalled();
    });
});

describe("Button — onClick", () => {
    it("fires onClick when enabled", async () => {
        const user = userEvent.setup();
        const onClick = vi.fn();
        render(<Button onClick={onClick}>Go</Button>);
        await user.click(screen.getByRole("button", { name: "Go" }));
        expect(onClick).toHaveBeenCalledTimes(1);
    });
});

describe("Button — isLoading state", () => {
    it("adds the is-loading class and mirrors loading into aria-busy / aria-disabled", () => {
        render(<Button isLoading>Saving</Button>);
        const btn = screen.getByRole("button", { name: "Saving" });
        expect(btn).toHaveClass("is-loading");
        expect(btn).toHaveAttribute("aria-busy", "true");
        expect(btn).toHaveAttribute("aria-disabled", "true");
    });

    it("does not add is-loading nor aria-busy when not loading", () => {
        render(<Button>Idle</Button>);
        const btn = screen.getByRole("button", { name: "Idle" });
        expect(btn).not.toHaveClass("is-loading");
        // aria-busy is set to the (falsy) isLoading value — React drops the attribute
        expect(btn).not.toHaveAttribute("aria-busy");
    });
});

describe("Button — label prop", () => {
    it("uses `label` as the accessible name via aria-label", () => {
        render(<Button label="Close dialog" />);
        expect(screen.getByRole("button", { name: "Close dialog" })).toHaveAttribute(
            "aria-label", "Close dialog",
        );
    });
});

describe("Button — rendered element", () => {
    // Button hard-codes `as="button"`, but it sits BEFORE the {...props} spread,
    // so a consumer-supplied `as` overrides it. This is how a Button can be
    // rendered as an anchor today.
    it("can be rendered as an <a> when `as` + href are passed", () => {
        render(<Button {...({ as: "a", href: "https://example.com" } as object)}>Link</Button>);
        const link = screen.getByRole("link", { name: "Link" });
        expect(link.tagName).toBe("A");
        expect(link).toHaveAttribute("href", "https://example.com");
        expect(link).toHaveAttribute("data-button");
    });
});

describe("Button — a11y", () => {
    it("has no axe violations for a labelled button", async () => {
        const { container } = render(<Button kind="primary">Submit form</Button>);
        expect(await axe(container)).toHaveNoViolations();
    });
});
