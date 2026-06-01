import { describe, it, expect, vi } from "vitest";
import "../../../../vitest-matchers";
import { useState } from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "vitest-axe";

import { TextArea } from "./TextArea";

// TextArea wraps a native <textarea> in a FormItem. It is always controlled
// (value defaults to ""). These tests pin what the jsdom tier can reach: the
// rendered <textarea> + attributes, label<->id wiring (htmlFor / useId),
// required/disabled passthrough, placeholder, and the FlexibleEventHandler
// onChange — which hands the consumer the string value, NOT the native event.

describe("TextArea — rendering & attributes", () => {
    it("renders a native <textarea> carrying data-textarea", () => {
        render(<TextArea label="Bio" />);
        const textarea = screen.getByRole("textbox");
        expect(textarea.tagName).toBe("TEXTAREA");
        expect(textarea).toHaveAttribute("data-textarea");
    });

    it("passes the placeholder through unchanged", () => {
        render(<TextArea label="Bio" placeholder="Tell us about yourself" />);
        expect(screen.getByRole("textbox")).toHaveAttribute("placeholder", "Tell us about yourself");
    });

    it("does not add a fallback placeholder when none is given", () => {
        // Unlike InputField, TextArea passes placeholder straight through.
        render(<TextArea label="Bio" />);
        expect(screen.getByRole("textbox")).not.toHaveAttribute("placeholder");
    });

    it("passes rows / cols through", () => {
        render(<TextArea label="Bio" rows={5} cols={40} />);
        const textarea = screen.getByRole("textbox");
        expect(textarea).toHaveAttribute("rows", "5");
        expect(textarea).toHaveAttribute("cols", "40");
    });
});

describe("TextArea — label association (htmlFor <-> id, useId)", () => {
    it("links the label to the textarea via a generated id", () => {
        render(<TextArea label="About you" />);
        const textarea = screen.getByLabelText("About you");
        expect(textarea).toHaveAttribute("data-textarea");

        const label = screen.getByText("About you");
        const id = textarea.getAttribute("id");
        expect(id).toBeTruthy();
        expect(id).not.toContain(":");
        expect(label).toHaveAttribute("for", id!);
    });

    it("honours an explicit id for the label association", () => {
        render(<TextArea label="About you" id="my-area" />);
        const textarea = screen.getByLabelText("About you");
        expect(textarea).toHaveAttribute("id", "my-area");
        expect(screen.getByText("About you")).toHaveAttribute("for", "my-area");
    });
});

describe("TextArea — required / disabled", () => {
    it("marks the textarea required and aria-required when required", () => {
        render(<TextArea label="Bio" required />);
        const textarea = screen.getByRole("textbox");
        expect(textarea).toBeRequired();
        expect(textarea).toHaveAttribute("aria-required", "true");
    });

    it("disables the textarea when disabled", () => {
        render(<TextArea label="Bio" disabled />);
        expect(screen.getByRole("textbox")).toBeDisabled();
    });
});

describe("TextArea — controlled value & onChange (FlexibleEventHandler)", () => {
    it("reflects a controlled value", () => {
        render(<TextArea label="Bio" value="hello" onChange={() => {}} />);
        expect(screen.getByRole("textbox")).toHaveValue("hello");
    });

    it("calls onChange with the string value, not the native event", async () => {
        const handleChange = vi.fn();
        const user = userEvent.setup();

        // Drive value through state so the controlled textarea actually updates
        // and successive keystrokes append (verifying the string is forwarded).
        const Harness = () => {
            const [ value, setValue ] = useState("");
            return (
                <TextArea
                    label="Bio"
                    value={value}
                    onChange={(v) => {
                        handleChange(v);
                        setValue(v);
                    }}
                />
            );
        };

        render(<Harness />);
        await user.type(screen.getByRole("textbox"), "hi");

        expect(handleChange).toHaveBeenCalledTimes(2);
        expect(handleChange).toHaveBeenNthCalledWith(1, "h");
        expect(handleChange).toHaveBeenNthCalledWith(2, "hi");
        handleChange.mock.calls.forEach(([ arg ]) => expect(typeof arg).toBe("string"));
        expect(screen.getByRole("textbox")).toHaveValue("hi");
    });
});

describe("TextArea — a11y", () => {
    it("has no axe violations with a label", async () => {
        const { container } = render(
            <TextArea label="Your message" placeholder="Type here" />
        );
        expect(await axe(container)).toHaveNoViolations();
    });
});
