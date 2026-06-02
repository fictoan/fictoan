// TESTS ===============================================================================================================
import "../../../vitest-matchers";
import userEvent from "@testing-library/user-event";
import { axe } from "vitest-axe";
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";

// OTHER ===============================================================================================================
import { Modal } from "./Modal";

// The Popover open/close lifecycle (showPopover / hidePopover) is a stubbed
// no-op in jsdom, so these tests pin the *markup contract* the Modal emits in a
// given prop state — the popover attribute value, dialog semantics, ARIA
// wiring, backdrop classes, the dismiss button, and the document wrapper. The
// actual open/close behaviour is left to the future browser tier. (The
// `:popover-open` matches() call jsdom would throw on is shimmed in vitest.setup.ts.)

describe("Modal — base markup", () => {
    it("renders a <dialog> carrying the id and data-modal", () => {
        render(<Modal id="my-modal">Body</Modal>);
        const modal = document.querySelector("#my-modal");
        expect(modal).not.toBeNull();
        expect(modal!.tagName).toBe("DIALOG");
        expect(modal).toHaveAttribute("data-modal");
    });

    it("carries the dialog role and aria-modal", () => {
        render(<Modal id="m">Body</Modal>);
        const modal = document.querySelector("#m")!;
        expect(modal).toHaveAttribute("role", "dialog");
        expect(modal).toHaveAttribute("aria-modal", "true");
    });

    it("renders children inside a role=document wrapper", () => {
        render(<Modal id="m"><p>Hello there</p></Modal>);
        // The <dialog> never opens in jsdom (showPopover is a no-op), so it stays
        // a closed dialog and its descendants are excluded from the accessibility
        // tree — role queries must opt in with `hidden: true`. This is the real,
        // correct behaviour of a closed native dialog, not a test workaround.
        const doc = screen.getByRole("document", { hidden : true });
        expect(doc).toContainElement(screen.getByText("Hello there"));
    });
});

describe("Modal — popover attribute (derived from isDismissible)", () => {
    it("is popover=auto when dismissible (default)", () => {
        render(<Modal id="m">Body</Modal>);
        expect(document.querySelector("#m")).toHaveAttribute("popover", "auto");
    });

    it("is popover=manual when not dismissible", () => {
        render(<Modal id="m" isDismissible={false}>Body</Modal>);
        expect(document.querySelector("#m")).toHaveAttribute("popover", "manual");
    });
});

describe("Modal — labelling", () => {
    it("falls back to a default aria-label and has no aria-describedby without a description", () => {
        render(<Modal id="m">Body</Modal>);
        const modal = document.querySelector("#m")!;
        expect(modal).toHaveAttribute("aria-label", "Modal dialog");
        expect(modal).not.toHaveAttribute("aria-describedby");
    });

    it("uses the supplied label", () => {
        render(<Modal id="m" label="Edit profile">Body</Modal>);
        expect(document.querySelector("#m")).toHaveAttribute("aria-label", "Edit profile");
    });

    it("wires aria-describedby to the sr-only description node", () => {
        render(<Modal id="m" description="Update your account details.">Body</Modal>);
        const modal = document.querySelector("#m")!;
        expect(modal).toHaveAttribute("aria-describedby", "m-description");

        const desc = document.getElementById("m-description")!;
        expect(desc).toHaveClass("sr-only");
        expect(desc).toHaveTextContent("Update your account details.");
    });
});

describe("Modal — backdrop classes", () => {
    it("adds show-backdrop / blur-backdrop only when requested", () => {
        const { rerender } = render(<Modal id="m">Body</Modal>);
        const modal = document.querySelector("#m")!;
        expect(modal).not.toHaveClass("show-backdrop");
        expect(modal).not.toHaveClass("blur-backdrop");

        rerender(<Modal id="m" showBackdrop blurBackdrop>Body</Modal>);
        expect(document.querySelector("#m")).toHaveClass("show-backdrop", "blur-backdrop");
    });
});

describe("Modal — dismiss button", () => {
    it("renders the dismiss button only when dismissible AND onClose is provided", () => {
        // Closed-dialog descendants are hidden from the a11y tree (see note in the
        // base-markup block), so role queries pass `hidden: true`.
        const { rerender } = render(<Modal id="m" isDismissible onClose={() => {}}>Body</Modal>);
        expect(screen.getByRole("button", { name: "Close modal", hidden : true })).toHaveClass("dismiss-button");

        // no onClose -> no button
        rerender(<Modal id="m" isDismissible>Body</Modal>);
        expect(screen.queryByRole("button", { name: "Close modal", hidden : true })).toBeNull();

        // onClose but not dismissible -> no button
        rerender(<Modal id="m" isDismissible={false} onClose={() => {}}>Body</Modal>);
        expect(screen.queryByRole("button", { name: "Close modal", hidden : true })).toBeNull();
    });

    it("calls onClose when the dismiss button is clicked", async () => {
        const onClose = vi.fn();
        render(<Modal id="m" onClose={onClose}>Body</Modal>);
        await userEvent.click(screen.getByRole("button", { name: "Close modal", hidden : true }));
        expect(onClose).toHaveBeenCalledTimes(1);
    });
});

describe("Modal — classNames are copied fresh (no mutation)", () => {
    it("does not blow up and does not mutate the caller's array, even with backdrop flags", () => {
        const caller : string[] = [ "caller-class" ];
        const { rerender } = render(
            <Modal id="m" classNames={caller} showBackdrop blurBackdrop>Body</Modal>,
        );
        const modal = document.querySelector("#m")!;
        expect(modal).toHaveClass("caller-class", "show-backdrop", "blur-backdrop");

        // a second render with the same reference must not double-append
        rerender(<Modal id="m" classNames={caller} showBackdrop blurBackdrop>Body</Modal>);
        expect(caller).toEqual([ "caller-class" ]);
    });
});

describe("Modal — a11y", () => {
    it("has no axe violations in a realistic, labelled state", async () => {
        const { container } = render(
            <Modal id="confirm" label="Confirm deletion" description="This cannot be undone." onClose={() => {}}>
                <p>Are you sure you want to delete this item?</p>
            </Modal>,
        );
        expect(await axe(container)).toHaveNoViolations();
    });
});
