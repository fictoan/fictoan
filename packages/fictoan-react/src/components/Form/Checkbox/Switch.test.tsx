import { describe, it, expect, vi } from "vitest";
import "../../../../vitest-matchers";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "vitest-axe";

import { Switch } from "./Switch";

// Switch is the Checkbox twin: same FormItem wrapper, same <input type="checkbox">
// under the hood, styled as a toggle. The accessible role is therefore "checkbox"
// (there is no role="switch" applied). These tests pin that markup contract plus
// the controlled state / onChange-emits-boolean / disabled / ARIA plumbing.

describe("Switch — rendering & structure", () => {
    it("renders a checkbox input (toggle styled, role stays checkbox)", () => {
        render(<Switch label="Dark mode" />);
        const input = screen.getByRole("checkbox", { name : "Dark mode" });
        expect(input.tagName).toBe("INPUT");
        expect(input).toHaveAttribute("type", "checkbox");
    });

    it("associates the visible label to the input via htmlFor/id (useId)", () => {
        render(<Switch label="Dark mode" />);
        const input = screen.getByRole("checkbox", { name : "Dark mode" });
        const label = screen.getByText("Dark mode");

        expect(label.tagName).toBe("LABEL");
        expect(input.id).toBeTruthy();
        expect(label).toHaveAttribute("for", input.id);
    });

    it("honours an explicit id and derives name from id", () => {
        render(<Switch id="theme" label="Theme" />);
        const input = screen.getByRole("checkbox", { name : "Theme" });
        expect(input).toHaveAttribute("id", "theme");
        expect(input).toHaveAttribute("name", "theme");
    });

    it("uses an explicit name over the id", () => {
        render(<Switch id="theme" name="preference" label="Theme" />);
        expect(screen.getByRole("checkbox")).toHaveAttribute("name", "preference");
    });

    it("renders the decorative switch element with the size class", () => {
        const { container } = render(<Switch label="On" size="large" />);
        expect(container.querySelector("[data-form-item]")).toBeInTheDocument();
        const decorative = container.querySelector("[data-switch]");
        expect(decorative).toBeInTheDocument();
        expect(decorative).toHaveClass("size-large");
    });

    it("defaults size to medium on the decorative element", () => {
        const { container } = render(<Switch label="On" />);
        expect(container.querySelector("[data-switch]")).toHaveClass("size-medium");
    });
});

describe("Switch — controlled checked state", () => {
    it("reflects checked={true}", () => {
        render(<Switch label="On" checked onChange={() => {}} />);
        expect(screen.getByRole("checkbox")).toBeChecked();
    });

    it("reflects checked={false}", () => {
        render(<Switch label="Off" checked={false} onChange={() => {}} />);
        expect(screen.getByRole("checkbox")).not.toBeChecked();
    });

    it("stays on when controlled and the prop is not updated", async () => {
        const user = userEvent.setup();
        render(<Switch label="Locked on" checked onChange={() => {}} />);
        const input = screen.getByRole("checkbox");
        expect(input).toBeChecked();

        await user.click(input);
        expect(input).toBeChecked();
    });
});

describe("Switch — onChange wiring", () => {
    it("fires onChange with true on first click", async () => {
        const user = userEvent.setup();
        const onChange = vi.fn();
        render(<Switch label="Toggle" onChange={onChange} />);

        await user.click(screen.getByRole("checkbox"));
        expect(onChange).toHaveBeenCalledTimes(1);
        expect(onChange).toHaveBeenCalledWith(true);
    });

    it("fires onChange with false when turning off an uncontrolled on-switch", async () => {
        const user = userEvent.setup();
        const onChange = vi.fn();
        render(<Switch label="Toggle" defaultChecked onChange={onChange} />);

        await user.click(screen.getByRole("checkbox"));
        expect(onChange).toHaveBeenCalledWith(false);
    });

    it("passes a boolean (not the event) to onChange", async () => {
        const user = userEvent.setup();
        const onChange = vi.fn();
        render(<Switch label="Toggle" onChange={onChange} />);

        await user.click(screen.getByRole("checkbox"));
        expect(typeof onChange.mock.calls[0][0]).toBe("boolean");
    });
});

describe("Switch — disabled", () => {
    it("renders the disabled attribute", () => {
        render(<Switch label="No" disabled />);
        expect(screen.getByRole("checkbox")).toBeDisabled();
    });

    it("does not fire onChange when disabled and clicked", async () => {
        const user = userEvent.setup();
        const onChange = vi.fn();
        render(<Switch label="No" disabled onChange={onChange} />);

        await user.click(screen.getByRole("checkbox"));
        expect(onChange).not.toHaveBeenCalled();
    });
});

describe("Switch — required & validation ARIA", () => {
    it("sets aria-required and required when required", () => {
        render(<Switch label="Must" required />);
        const input = screen.getByRole("checkbox");
        expect(input).toBeRequired();
        expect(input).toHaveAttribute("aria-required", "true");
    });

    it("wires aria-describedby to a help-text node when helpText is given", () => {
        render(<Switch id="sw" label="Help me" helpText="Some guidance" />);
        const input = screen.getByRole("checkbox");
        expect(input).toHaveAttribute("aria-describedby", "sw-help");
        expect(document.getElementById("sw-help")).toHaveTextContent("Some guidance");
    });

    it("sets aria-invalid and wires error text when errorText is given", () => {
        render(<Switch id="sw" label="Oops" errorText="Required" />);
        const input = screen.getByRole("checkbox");
        expect(input).toHaveAttribute("aria-invalid", "true");
        expect(input).toHaveAttribute("aria-describedby", "sw-error");
        const error = document.getElementById("sw-error");
        expect(error).toHaveTextContent("Required");
        expect(error).toHaveAttribute("role", "alert");
    });

    it("does not set aria-invalid when there is no error", () => {
        render(<Switch label="Fine" />);
        expect(screen.getByRole("checkbox")).not.toHaveAttribute("aria-invalid");
    });
});

describe("Switch — labelFirst", () => {
    it("turns the decorative element into a <label> tied to the input when labelFirst", () => {
        const { container } = render(<Switch id="lf" label="Label first" labelFirst />);
        const decorative = container.querySelector("[data-switch]");
        expect(decorative?.tagName).toBe("LABEL");
        expect(decorative).toHaveAttribute("for", "lf");
    });
});

describe("Switch — a11y", () => {
    it("has no axe violations with a label", async () => {
        const { container } = render(<Switch label="Enable notifications" />);
        expect(await axe(container)).toHaveNoViolations();
    });

    it("has no axe violations with help text and required", async () => {
        const { container } = render(
            <Switch label="Enable two-factor auth" helpText="Strongly recommended" required />,
        );
        expect(await axe(container)).toHaveNoViolations();
    });
});
