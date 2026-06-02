// TESTS ===============================================================================================================
import "../../../../vitest-matchers";
import userEvent from "@testing-library/user-event";
import { axe } from "vitest-axe";
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";

// OTHER ===============================================================================================================
import { InputField } from "./InputField";

// InputField wraps a native <input> in a FormItem. These tests pin the public
// contract that the jsdom tier can reach: the rendered <input> + its attributes,
// the label<->input id wiring (htmlFor / useId), the required/disabled/type/
// placeholder passthrough, and the FlexibleEventHandler onChange — which hands
// the consumer the string value (e.target.value), NOT the native event.

describe("InputField — rendering & attributes", () => {
    it("renders a native <input> carrying data-input-field", () => {
        render(<InputField label="Name" />);
        const input = screen.getByRole("textbox");
        expect(input.tagName).toBe("INPUT");
        expect(input).toHaveAttribute("data-input-field");
    });

    it("defaults the type to text and passes a given type through", () => {
        const { rerender } = render(<InputField label="Name" />);
        expect(screen.getByRole("textbox")).toHaveAttribute("type", "text");

        rerender(<InputField label="Email" type="email" />);
        expect(screen.getByRole("textbox")).toHaveAttribute("type", "email");
    });

    it("passes the type through for non-textbox types (password)", () => {
        const { container } = render(<InputField label="Password" type="password" />);
        const input = container.querySelector("[data-input-field]");
        expect(input).toHaveAttribute("type", "password");
    });

    it("passes a real placeholder through unchanged", () => {
        render(<InputField label="Name" placeholder="Jane Doe" />);
        expect(screen.getByRole("textbox")).toHaveAttribute("placeholder", "Jane Doe");
    });

    it("falls back to a single-space placeholder when none is given", () => {
        // The component coerces a missing placeholder to " " (drives the CSS
        // floating-label :placeholder-shown trick).
        render(<InputField label="Name" />);
        expect(screen.getByRole("textbox")).toHaveAttribute("placeholder", " ");
    });
});

describe("InputField — label association (htmlFor <-> id, useId)", () => {
    it("links the label to the input via a generated id", () => {
        render(<InputField label="Full name" />);
        // getByLabelText only succeeds if label htmlFor === input id.
        const input = screen.getByLabelText("Full name");
        expect(input).toHaveAttribute("data-input-field");

        const label = screen.getByText("Full name");
        const id = input.getAttribute("id");
        expect(id).toBeTruthy();
        // Generated id must not contain the raw useId colons.
        expect(id).not.toContain(":");
        expect(label).toHaveAttribute("for", id!);
    });

    it("honours an explicit id for the label association", () => {
        render(<InputField label="Full name" id="my-input" />);
        const input = screen.getByLabelText("Full name");
        expect(input).toHaveAttribute("id", "my-input");
        expect(screen.getByText("Full name")).toHaveAttribute("for", "my-input");
    });
});

describe("InputField — required / disabled", () => {
    it("marks the input required and aria-required when required", () => {
        render(<InputField label="Name" required />);
        const input = screen.getByRole("textbox");
        expect(input).toBeRequired();
        expect(input).toHaveAttribute("aria-required", "true");
    });

    it("disables the input when disabled", () => {
        render(<InputField label="Name" disabled />);
        expect(screen.getByRole("textbox")).toBeDisabled();
    });
});

describe("InputField — controlled value & onChange (FlexibleEventHandler)", () => {
    it("reflects a controlled value", () => {
        render(<InputField label="Name" value="hello" onChange={() => {}} />);
        expect(screen.getByRole("textbox")).toHaveValue("hello");
    });

    it("calls onChange with the string value, not the native event", async () => {
        const handleChange = vi.fn();
        const user = userEvent.setup();
        render(<InputField label="Name" onChange={handleChange} />);

        await user.type(screen.getByRole("textbox"), "ab");

        expect(handleChange).toHaveBeenCalledTimes(2);
        // FlexibleEventHandler hands over e.target.value (a string). The input
        // is uncontrolled here, so the DOM value accumulates across keystrokes.
        expect(handleChange).toHaveBeenNthCalledWith(1, "a");
        expect(handleChange).toHaveBeenNthCalledWith(2, "ab");
        handleChange.mock.calls.forEach(([ arg ]) => expect(typeof arg).toBe("string"));
    });
});

describe("InputField — a11y", () => {
    it("has no axe violations with a label", async () => {
        const { container } = render(
            <InputField label="Email address" type="email" placeholder="you@example.com" />
        );
        expect(await axe(container)).toHaveNoViolations();
    });
});
