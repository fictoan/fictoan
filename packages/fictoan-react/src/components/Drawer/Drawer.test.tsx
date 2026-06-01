import { describe, it, expect, vi } from "vitest";
import "../../../vitest-matchers";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "vitest-axe";

import { Drawer } from "./Drawer";

// As with Modal, the Popover open/close lifecycle is a stubbed no-op in jsdom,
// so these tests pin the *markup contract* the Drawer emits per prop state — the
// popover attribute, dialog semantics, ARIA wiring, position / size / overlay
// classes, the zIndex inline style, the dismiss button and the document
// wrapper. Visual open/close is left to the future browser tier. (The
// `:popover-open` matches() call jsdom would throw on is shimmed in vitest.setup.ts.)

describe("Drawer — base markup", () => {
    it("renders a <div> carrying the id and data-drawer", () => {
        render(<Drawer id="my-drawer">Body</Drawer>);
        const drawer = document.querySelector("#my-drawer");
        expect(drawer).not.toBeNull();
        expect(drawer!.tagName).toBe("DIV");
        expect(drawer).toHaveAttribute("data-drawer");
    });

    it("carries dialog role, aria-modal and tabindex=-1", () => {
        render(<Drawer id="d">Body</Drawer>);
        const drawer = document.querySelector("#d")!;
        expect(drawer).toHaveAttribute("role", "dialog");
        expect(drawer).toHaveAttribute("aria-modal", "true");
        expect(drawer).toHaveAttribute("tabindex", "-1");
    });

    it("renders children inside a role=document wrapper with the drawer-content class", () => {
        render(<Drawer id="d"><p>Drawer body</p></Drawer>);
        const doc = screen.getByRole("document");
        expect(doc).toHaveClass("drawer-content");
        expect(doc).toContainElement(screen.getByText("Drawer body"));
    });
});

describe("Drawer — popover attribute (derived from isDismissible)", () => {
    it("is popover=auto when dismissible (default)", () => {
        render(<Drawer id="d">Body</Drawer>);
        expect(document.querySelector("#d")).toHaveAttribute("popover", "auto");
    });

    it("is popover=manual when not dismissible", () => {
        render(<Drawer id="d" isDismissible={false}>Body</Drawer>);
        expect(document.querySelector("#d")).toHaveAttribute("popover", "manual");
    });
});

describe("Drawer — position & size classes", () => {
    it("defaults to right position, medium size, and the base drawer class", () => {
        render(<Drawer id="d">Body</Drawer>);
        const drawer = document.querySelector("#d")!;
        expect(drawer).toHaveClass("drawer", "right", "medium");
    });

    it.each([ "top", "right", "bottom", "left" ] as const)(
        "applies the %s position as a literal class",
        (position) => {
            render(<Drawer id={`d-${position}`} position={position}>Body</Drawer>);
            expect(document.querySelector(`#d-${position}`)).toHaveClass(position);
        },
    );

    it("applies the size token as a literal class (not size-*)", () => {
        render(<Drawer id="d" size="large">Body</Drawer>);
        const drawer = document.querySelector("#d")!;
        expect(drawer).toHaveClass("large");
        expect(drawer).not.toHaveClass("size-large");
    });
});

describe("Drawer — overlay classes", () => {
    it("adds with-overlay by default and not blur-overlay", () => {
        render(<Drawer id="d">Body</Drawer>);
        const drawer = document.querySelector("#d")!;
        expect(drawer).toHaveClass("with-overlay");
        expect(drawer).not.toHaveClass("blur-overlay");
    });

    it("drops with-overlay when showOverlay is false", () => {
        render(<Drawer id="d" showOverlay={false}>Body</Drawer>);
        expect(document.querySelector("#d")).not.toHaveClass("with-overlay");
    });

    it("adds blur-overlay when requested", () => {
        render(<Drawer id="d" blurOverlay>Body</Drawer>);
        expect(document.querySelector("#d")).toHaveClass("blur-overlay");
    });

    it("merges caller classNames after the built-in classes", () => {
        render(<Drawer id="d" classNames={[ "caller-class" ]}>Body</Drawer>);
        expect(document.querySelector("#d")).toHaveClass("drawer", "right", "medium", "with-overlay", "caller-class");
    });
});

describe("Drawer — labelling", () => {
    it("falls back to a default aria-label and has no aria-describedby without a description", () => {
        render(<Drawer id="d">Body</Drawer>);
        const drawer = document.querySelector("#d")!;
        expect(drawer).toHaveAttribute("aria-label", "Drawer");
        expect(drawer).not.toHaveAttribute("aria-describedby");
    });

    it("uses the supplied label", () => {
        render(<Drawer id="d" label="Filters">Body</Drawer>);
        expect(document.querySelector("#d")).toHaveAttribute("aria-label", "Filters");
    });

    it("wires aria-describedby to the sr-only description node", () => {
        render(<Drawer id="d" description="Refine your search.">Body</Drawer>);
        const drawer = document.querySelector("#d")!;
        expect(drawer).toHaveAttribute("aria-describedby", "d-description");

        const desc = document.getElementById("d-description")!;
        expect(desc).toHaveClass("sr-only");
        expect(desc).toHaveTextContent("Refine your search.");
    });
});

describe("Drawer — zIndex inline style", () => {
    it("writes zIndex to the inline style when provided", () => {
        render(<Drawer id="d" zIndex={42}>Body</Drawer>);
        expect(document.querySelector("#d")).toHaveStyle({ zIndex: "42" });
    });

    it("does not set an inline zIndex when omitted", () => {
        render(<Drawer id="d">Body</Drawer>);
        expect((document.querySelector("#d") as HTMLElement).style.zIndex).toBe("");
    });
});

describe("Drawer — dismiss button", () => {
    it("renders the dismiss button only when dismissible AND onClose is provided", () => {
        const { rerender } = render(<Drawer id="d" isDismissible onClose={() => {}}>Body</Drawer>);
        expect(screen.getByRole("button", { name: "Close drawer" })).toHaveClass("drawer-dismiss-button");

        rerender(<Drawer id="d" isDismissible>Body</Drawer>);
        expect(screen.queryByRole("button", { name: "Close drawer" })).toBeNull();

        rerender(<Drawer id="d" isDismissible={false} onClose={() => {}}>Body</Drawer>);
        expect(screen.queryByRole("button", { name: "Close drawer" })).toBeNull();
    });

    it("calls onClose when the dismiss button is clicked", async () => {
        const onClose = vi.fn();
        render(<Drawer id="d" onClose={onClose}>Body</Drawer>);
        await userEvent.click(screen.getByRole("button", { name: "Close drawer" }));
        expect(onClose).toHaveBeenCalledTimes(1);
    });
});

describe("Drawer — a11y", () => {
    it("has no axe violations in a realistic, labelled state", async () => {
        const { container } = render(
            <Drawer id="filters" label="Filters" description="Refine the list of results." onClose={() => {}}>
                <p>Filter options go here.</p>
            </Drawer>,
        );
        expect(await axe(container)).toHaveNoViolations();
    });
});
