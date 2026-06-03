// LOCAL COMPONENTS ====================================================================================================
import { Modal } from "$components/Modal";

// TESTS ===============================================================================================================
import { describe, it, expect } from "vitest";
import { render, waitFor } from "@testing-library/react";

// BROWSER TIER — the Popover open/close lifecycle. jsdom doesn't implement the
// Popover API (showPopover/hidePopover are no-op stubs there), so this is the only
// place the real isOpen -> :popover-open behaviour can be asserted. Here we DO
// import the component (its source CSS injecting is harmless to this assertion).
describe("Popover lifecycle — Modal opens and closes via the Popover API", () => {
    it("isOpen drives :popover-open in a real browser", async () => {
        const { rerender } = render(<Modal id="m">Body</Modal>);
        const modal = document.querySelector("#m") as HTMLElement;

        // closed initially
        expect(modal.matches(":popover-open")).toBe(false);

        // opening puts it in the top layer
        rerender(<Modal id="m" isOpen>Body</Modal>);
        await waitFor(() => expect(modal.matches(":popover-open")).toBe(true));

        // closing removes it
        rerender(<Modal id="m" isOpen={false}>Body</Modal>);
        await waitFor(() => expect(modal.matches(":popover-open")).toBe(false));
    });
});
