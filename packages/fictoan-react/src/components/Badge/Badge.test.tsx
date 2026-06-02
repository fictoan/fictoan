// TESTS ===============================================================================================================
import "../../../vitest-matchers";
import userEvent from "@testing-library/user-event";
import { axe } from "vitest-axe";
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";

// OTHER ===============================================================================================================
import { Badge } from "./Badge";

// Badge is a thin recipe over <Element>: it turns `size`/`shape` into its own
// `size-*`/`shape-*` classes (NOT via Element's size/shape props — it builds a
// classNames array), passes the colour props straight through to Element, and
// optionally renders an action <button>. These tests pin that emitted-markup
// contract: real class strings, data-* flags, the action-button wiring, and a
// realistically-named accessible render.

describe("Badge — rendering", () => {
    it("renders a <div> with the data-badge marker by default", () => {
        render(<Badge data-testid="b">New</Badge>);
        const badge = screen.getByTestId("b");
        expect(badge.tagName).toBe("DIV");
        expect(badge).toHaveAttribute("data-badge");
    });

    it("renders its children", () => {
        render(<Badge data-testid="b">99+</Badge>);
        expect(screen.getByTestId("b")).toHaveTextContent("99+");
    });

    it("honours the `as` prop (passed through to Element)", () => {
        // `as` is forwarded to Element at runtime but omitted from Badge's public type.
        render(<Badge data-testid="b" {...({ as: "span" } as object)}>New</Badge>);
        expect(screen.getByTestId("b").tagName).toBe("SPAN");
    });
});

describe("Badge — size prop -> className", () => {
    it("defaults to size-medium when no size is given", () => {
        render(<Badge data-testid="b">New</Badge>);
        expect(screen.getByTestId("b")).toHaveClass("size-medium");
    });

    it.each([
        ["nano",   "size-nano"],
        ["micro",  "size-micro"],
        ["tiny",   "size-tiny"],
        ["small",  "size-small"],
        ["medium", "size-medium"],
        ["large",  "size-large"],
        ["huge",   "size-huge"],
    ] as const)("emits %s -> %s", (size, expected) => {
        render(<Badge data-testid="b" size={size}>New</Badge>);
        expect(screen.getByTestId("b")).toHaveClass(expected);
    });
});

describe("Badge — shape prop -> className", () => {
    it("adds shape-rounded", () => {
        render(<Badge data-testid="b" shape="rounded">New</Badge>);
        expect(screen.getByTestId("b")).toHaveClass("shape-rounded");
    });

    it("adds shape-curved", () => {
        render(<Badge data-testid="b" shape="curved">New</Badge>);
        expect(screen.getByTestId("b")).toHaveClass("shape-curved");
    });

    it("emits no shape-* class when shape is omitted", () => {
        render(<Badge data-testid="b">New</Badge>);
        expect(screen.getByTestId("b").className).not.toMatch(/shape-/);
    });
});

describe("Badge — colour props pass through to Element", () => {
    it("maps bgColour / textColour to utility classes", () => {
        render(<Badge data-testid="b" bgColour="red" textColour="white">New</Badge>);
        expect(screen.getByTestId("b")).toHaveClass("bg-red", "text-white");
    });

    it("supports the US-spelled colour props too", () => {
        render(<Badge data-testid="b" bgColor="green" textColor="black">New</Badge>);
        expect(screen.getByTestId("b")).toHaveClass("bg-green", "text-black");
    });

    it("writes bgOpacity as the --bg-opacity custom property (value / 100)", () => {
        render(<Badge data-testid="b" bgColour="red" bgOpacity="40">New</Badge>);
        expect(screen.getByTestId("b").style.getPropertyValue("--bg-opacity")).toBe("0.4");
    });

    it("combines size, shape and colour classes together", () => {
        render(<Badge data-testid="b" size="small" shape="rounded" bgColour="blue">New</Badge>);
        expect(screen.getByTestId("b")).toHaveClass("size-small", "shape-rounded", "bg-blue");
    });
});

describe("Badge — aria-label", () => {
    it("does not set aria-label for plain-string children (the visible text already names it)", () => {
        render(<Badge data-testid="b">Beta</Badge>);
        expect(screen.getByTestId("b")).not.toHaveAttribute("aria-label");
    });

    it("does not set aria-label when children are not a plain string", () => {
        render(<Badge data-testid="b"><span>Beta</span></Badge>);
        expect(screen.getByTestId("b")).not.toHaveAttribute("aria-label");
    });

    it("keeps an explicitly-passed aria-label", () => {
        render(<Badge data-testid="b" aria-label="New items">Beta</Badge>);
        expect(screen.getByTestId("b")).toHaveAttribute("aria-label", "New items");
    });
});

describe("Badge — action button", () => {
    it("renders no action button and no data-has-action by default", () => {
        render(<Badge data-testid="b">New</Badge>);
        expect(screen.getByTestId("b")).not.toHaveAttribute("data-has-action");
        expect(screen.queryByRole("button")).toBeNull();
    });

    it("renders the action button and sets data-has-action when actionIcon is given", () => {
        render(
            <Badge data-testid="b" actionIcon="cross" actionAriaLabel="Remove tag">
                Tag
            </Badge>,
        );
        expect(screen.getByTestId("b")).toHaveAttribute("data-has-action");
        const button = screen.getByRole("button", { name: "Remove tag" });
        expect(button).toHaveClass("badge-action-button");
        expect(button).toHaveAttribute("type", "button");
    });

    it("fires onActionClick when the action button is clicked", async () => {
        const onActionClick = vi.fn();
        const user = userEvent.setup();
        render(
            <Badge actionIcon="tick" actionAriaLabel="Confirm" onActionClick={onActionClick}>
                Tag
            </Badge>,
        );
        await user.click(screen.getByRole("button", { name: "Confirm" }));
        expect(onActionClick).toHaveBeenCalledTimes(1);
    });

    it("does not throw when the action button is clicked without an onActionClick handler", async () => {
        const user = userEvent.setup();
        render(
            <Badge actionIcon="plus" actionAriaLabel="Add">
                Tag
            </Badge>,
        );
        await user.click(screen.getByRole("button", { name: "Add" }));
        // optional-chained handler — click is a no-op, just must not blow up
        expect(screen.getByRole("button", { name: "Add" })).toBeInTheDocument();
    });
});

describe("Badge — a11y", () => {
    it("has no axe violations as a plain text badge", async () => {
        const { container } = render(<Badge>Beta</Badge>);
        expect(await axe(container)).toHaveNoViolations();
    });

    it("has no axe violations with a labelled action button", async () => {
        const { container } = render(
            <Badge actionIcon="cross" actionAriaLabel="Remove tag">
                Tag
            </Badge>,
        );
        expect(await axe(container)).toHaveNoViolations();
    });
});
