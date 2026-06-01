import { describe, it, expect, vi } from "vitest";
import "../../../../vitest-matchers";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "vitest-axe";

import { Checkbox } from "./Checkbox";

// Checkbox wraps a real <input type="checkbox"> in a FormItem. These tests pin
// the public contract the jsdom tier can see: the rendered input + its id/label
// wiring, the controlled `checked` prop, the onChange callback shape (it emits a
// boolean, NOT the event), disabled gating, and the ARIA plumbing FormItem adds.

describe("Checkbox — rendering & structure", () => {
    it("renders a checkbox input", () => {
        render(<Checkbox label="Accept terms" />);
        const input = screen.getByRole("checkbox", { name : "Accept terms" });
        expect(input.tagName).toBe("INPUT");
        expect(input).toHaveAttribute("type", "checkbox");
    });

    it("renders the visible label associated to the input via htmlFor/id (useId)", () => {
        render(<Checkbox label="Accept terms" />);
        const input = screen.getByRole("checkbox", { name : "Accept terms" });
        const label = screen.getByText("Accept terms");

        expect(label.tagName).toBe("LABEL");
        // The label's `for` must point at the input's auto-generated id.
        expect(input.id).toBeTruthy();
        expect(label).toHaveAttribute("for", input.id);
    });

    it("honours an explicit id (no generated id) and derives name from id", () => {
        render(<Checkbox id="agree" label="Agree" />);
        const input = screen.getByRole("checkbox", { name : "Agree" });
        expect(input).toHaveAttribute("id", "agree");
        // name falls back to id when name is not provided
        expect(input).toHaveAttribute("name", "agree");
    });

    it("uses an explicit name over the id", () => {
        render(<Checkbox id="agree" name="consent" label="Agree" />);
        expect(screen.getByRole("checkbox")).toHaveAttribute("name", "consent");
    });

    it("wraps the input in a FormItem group with the decorative checkbox element", () => {
        const { container } = render(<Checkbox label="Pick me" size="small" />);
        expect(container.querySelector("[data-form-item]")).toBeInTheDocument();
        const decorative = container.querySelector("[data-checkbox]");
        expect(decorative).toBeInTheDocument();
        // size flows onto the decorative element as a size-* class
        expect(decorative).toHaveClass("size-small");
    });

    it("defaults size to medium on the decorative element", () => {
        const { container } = render(<Checkbox label="Pick me" />);
        expect(container.querySelector("[data-checkbox]")).toHaveClass("size-medium");
    });
});

describe("Checkbox — controlled checked state", () => {
    it("reflects checked={true}", () => {
        render(<Checkbox label="On" checked onChange={() => {}} />);
        expect(screen.getByRole("checkbox")).toBeChecked();
    });

    it("reflects checked={false}", () => {
        render(<Checkbox label="Off" checked={false} onChange={() => {}} />);
        expect(screen.getByRole("checkbox")).not.toBeChecked();
    });

    it("stays checked when controlled and onChange does not update the prop", async () => {
        const user = userEvent.setup();
        render(<Checkbox label="Locked on" checked onChange={() => {}} />);
        const input = screen.getByRole("checkbox");
        expect(input).toBeChecked();

        await user.click(input);
        // Controlled with a static prop: React keeps it checked.
        expect(input).toBeChecked();
    });
});

describe("Checkbox — onChange wiring", () => {
    it("fires onChange with the new boolean (true) on click", async () => {
        const user = userEvent.setup();
        const onChange = vi.fn();
        render(<Checkbox label="Toggle" onChange={onChange} />);

        await user.click(screen.getByRole("checkbox"));
        expect(onChange).toHaveBeenCalledTimes(1);
        expect(onChange).toHaveBeenCalledWith(true);
    });

    it("fires onChange with false when toggling an already-checked uncontrolled box", async () => {
        const user = userEvent.setup();
        const onChange = vi.fn();
        render(<Checkbox label="Toggle" defaultChecked onChange={onChange} />);

        await user.click(screen.getByRole("checkbox"));
        expect(onChange).toHaveBeenCalledWith(false);
    });

    it("passes a boolean (not the event) to onChange", async () => {
        const user = userEvent.setup();
        const onChange = vi.fn();
        render(<Checkbox label="Toggle" onChange={onChange} />);

        await user.click(screen.getByRole("checkbox"));
        expect(typeof onChange.mock.calls[0][0]).toBe("boolean");
    });
});

describe("Checkbox — disabled", () => {
    it("renders the disabled attribute", () => {
        render(<Checkbox label="No" disabled />);
        expect(screen.getByRole("checkbox")).toBeDisabled();
    });

    it("does not fire onChange when disabled and clicked", async () => {
        const user = userEvent.setup();
        const onChange = vi.fn();
        render(<Checkbox label="No" disabled onChange={onChange} />);

        await user.click(screen.getByRole("checkbox"));
        expect(onChange).not.toHaveBeenCalled();
    });
});

describe("Checkbox — required & validation ARIA", () => {
    it("sets aria-required and required when required", () => {
        render(<Checkbox label="Must" required />);
        const input = screen.getByRole("checkbox");
        expect(input).toBeRequired();
        expect(input).toHaveAttribute("aria-required", "true");
    });

    it("wires aria-describedby to a help-text node when helpText is given", () => {
        render(<Checkbox id="cb" label="Help me" helpText="Some guidance" />);
        const input = screen.getByRole("checkbox");
        expect(input).toHaveAttribute("aria-describedby", "cb-help");
        const help = document.getElementById("cb-help");
        expect(help).toHaveTextContent("Some guidance");
    });

    it("sets aria-invalid and wires error text when errorText is given", () => {
        render(<Checkbox id="cb" label="Oops" errorText="This is required" />);
        const input = screen.getByRole("checkbox");
        expect(input).toHaveAttribute("aria-invalid", "true");
        expect(input).toHaveAttribute("aria-describedby", "cb-error");
        const error = document.getElementById("cb-error");
        expect(error).toHaveTextContent("This is required");
        expect(error).toHaveAttribute("role", "alert");
    });

    it("joins error before help in aria-describedby when both present", () => {
        render(<Checkbox id="cb" label="Both" helpText="H" errorText="E" />);
        expect(screen.getByRole("checkbox")).toHaveAttribute("aria-describedby", "cb-error cb-help");
    });

    it("does not set aria-invalid when there is no error", () => {
        render(<Checkbox label="Fine" />);
        expect(screen.getByRole("checkbox")).not.toHaveAttribute("aria-invalid");
    });
});

describe("Checkbox — labelFirst", () => {
    it("turns the decorative element into a <label> tied to the input when labelFirst", () => {
        const { container } = render(<Checkbox id="lf" label="Label first" labelFirst />);
        const decorative = container.querySelector("[data-checkbox]");
        expect(decorative?.tagName).toBe("LABEL");
        expect(decorative).toHaveAttribute("for", "lf");
    });
});

describe("Checkbox — a11y", () => {
    it("has no axe violations with a label", async () => {
        const { container } = render(<Checkbox label="Subscribe to the newsletter" />);
        expect(await axe(container)).toHaveNoViolations();
    });

    it("has no axe violations with help text and required", async () => {
        const { container } = render(
            <Checkbox label="Accept the terms" helpText="You must agree to continue" required />,
        );
        expect(await axe(container)).toHaveNoViolations();
    });
});
