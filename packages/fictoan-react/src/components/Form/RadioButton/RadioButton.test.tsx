// TESTS ===============================================================================================================
import "../../../../vitest-matchers";
import userEvent from "@testing-library/user-event";
import { axe } from "vitest-axe";
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";

// OTHER ===============================================================================================================
import { RadioButton } from "./RadioButton";
import { RadioGroup } from "./RadioGroup";
import { RadioTabGroup } from "./RadioTabGroup";

// These three components are the radio family. The jsdom tier pins the markup
// contract: the rendered <input type="radio">, the label association via
// htmlFor, the data-* hooks the CSS relies on, the radiogroup role/aria wiring,
// and the controlled value + onChange(value) plumbing. RadioTabGroup's sliding
// indicator + scroll buttons need real geometry (offsetWidth / ResizeObserver),
// so only its selection state and emitted markup are asserted here.

// RADIO BUTTON ////////////////////////////////////////////////////////////////////////////////////////////////////////
describe("RadioButton — rendering & markup", () => {
    it("renders a wrapper div with [data-radio-button] around a radio input", () => {
        const { container } = render(
            <RadioButton id="ride" value="bike" label="Bike" />
        );

        const wrapper = container.querySelector("[data-radio-button]");
        expect(wrapper).not.toBeNull();
        expect(wrapper!.tagName).toBe("DIV");

        const input = screen.getByRole("radio");
        expect(input.tagName).toBe("INPUT");
        expect(input).toHaveAttribute("type", "radio");
        expect(input).toHaveAttribute("value", "bike");
    });

    it("associates the label with the input via htmlFor / id", () => {
        render(<RadioButton id="ride" value="bike" label="Bike" />);

        // getByLabelText proves the <label htmlFor> ties to the input id.
        const input = screen.getByLabelText("Bike");
        expect(input).toHaveAttribute("id", "ride");
        expect(input).toHaveAttribute("type", "radio");
    });

    it("derives the input `name` from `id` when no name is given", () => {
        render(<RadioButton id="ride" value="bike" label="Bike" />);
        expect(screen.getByRole("radio")).toHaveAttribute("name", "ride");
    });

    it("uses an explicit `name` over the id when provided", () => {
        render(<RadioButton id="ride" name="transport" value="bike" label="Bike" />);
        expect(screen.getByRole("radio")).toHaveAttribute("name", "transport");
    });

    it("renders the [data-radio] visual marker element", () => {
        const { container } = render(
            <RadioButton id="ride" value="bike" label="Bike" />
        );
        expect(container.querySelector("[data-radio]")).not.toBeNull();
    });
});

describe("RadioButton — controlled checked state", () => {
    it("reflects the `checked` prop on the input", () => {
        render(<RadioButton id="ride" value="bike" label="Bike" checked onChange={vi.fn()} />);
        expect(screen.getByRole("radio")).toBeChecked();
    });

    it("renders unchecked when `checked` is false", () => {
        render(<RadioButton id="ride" value="bike" label="Bike" checked={false} onChange={vi.fn()} />);
        expect(screen.getByRole("radio")).not.toBeChecked();
    });
});

describe("RadioButton — onChange", () => {
    it("calls onChange with the radio's `value` when selected", async () => {
        const onChange = vi.fn();
        const user = userEvent.setup();
        render(<RadioButton id="ride" value="bike" label="Bike" onChange={onChange} />);

        await user.click(screen.getByRole("radio"));

        expect(onChange).toHaveBeenCalledTimes(1);
        expect(onChange).toHaveBeenCalledWith("bike");
    });

    it("does not call onChange when the input is disabled", async () => {
        const onChange = vi.fn();
        const user = userEvent.setup();
        render(<RadioButton id="ride" value="bike" label="Bike" disabled onChange={onChange} />);

        await user.click(screen.getByRole("radio"));

        expect(onChange).not.toHaveBeenCalled();
    });
});

describe("RadioButton — disabled", () => {
    it("disables the input and marks the wrapper aria-disabled", () => {
        const { container } = render(
            <RadioButton id="ride" value="bike" label="Bike" disabled />
        );

        expect(screen.getByRole("radio")).toBeDisabled();
        expect(container.querySelector("[data-radio-button]"))
            .toHaveAttribute("aria-disabled", "true");
    });
});

describe("RadioButton — labelFirst", () => {
    it("adds the `label-first` class to the wrapper when labelFirst is set", () => {
        const { container } = render(
            <RadioButton id="ride" value="bike" label="Bike" labelFirst />
        );
        expect(container.querySelector("[data-radio-button]")).toHaveClass("label-first");
    });
});

describe("RadioButton — help & error text wiring", () => {
    it("wires aria-describedby to the help text id and marks aria-invalid on error", () => {
        render(
            <RadioButton
                id="ride"
                value="bike"
                label="Bike"
                helpText="Pedal power"
                errorText="Pick one"
            />
        );

        const input = screen.getByRole("radio");
        // deriveAriaIds joins errorText id first, then helpText id.
        expect(input).toHaveAttribute("aria-describedby", "ride-error ride-help");
        expect(input).toHaveAttribute("aria-invalid", "true");
        expect(document.getElementById("ride-help")).toHaveTextContent("Pedal power");
        expect(document.getElementById("ride-error")).toHaveTextContent("Pick one");
    });
});

describe("RadioButton — a11y", () => {
    it("has no axe violations for a labelled radio", async () => {
        const { container } = render(
            <RadioButton id="ride" value="bike" label="Travel by bike" />
        );
        expect(await axe(container)).toHaveNoViolations();
    });
});

// RADIO GROUP /////////////////////////////////////////////////////////////////////////////////////////////////////////
const groupOptions = [
    { id : "opt-bike", value : "bike", label : "Bike" },
    { id : "opt-bus", value : "bus", label : "Bus" },
    { id : "opt-car", value : "car", label : "Car" },
];

describe("RadioGroup — rendering & markup", () => {
    it("renders a radiogroup with one radio per option", () => {
        render(<RadioGroup name="transport" label="Transport" options={groupOptions} />);

        const group = screen.getByRole("radiogroup");
        expect(group).toHaveAttribute("data-radio-group");
        expect(group).toHaveAttribute("aria-label", "Transport");
        expect(screen.getAllByRole("radio")).toHaveLength(3);
    });

    it("gives every radio the shared group `name`", () => {
        render(<RadioGroup name="transport" label="Transport" options={groupOptions} />);
        screen.getAllByRole("radio").forEach((radio) => {
            expect(radio).toHaveAttribute("name", "transport");
        });
    });

    it("associates each option label with its radio via htmlFor", () => {
        render(<RadioGroup name="transport" label="Transport" options={groupOptions} />);
        expect(screen.getByLabelText("Bike")).toHaveAttribute("value", "bike");
        expect(screen.getByLabelText("Bus")).toHaveAttribute("value", "bus");
        expect(screen.getByLabelText("Car")).toHaveAttribute("value", "car");
    });
});

describe("RadioGroup — controlled selection", () => {
    it("checks only the radio matching the controlled `value`", () => {
        render(<RadioGroup name="transport" label="Transport" options={groupOptions} value="bus" onChange={vi.fn()} />);
        expect(screen.getByLabelText("Bike")).not.toBeChecked();
        expect(screen.getByLabelText("Bus")).toBeChecked();
        expect(screen.getByLabelText("Car")).not.toBeChecked();
    });

    it("falls back to defaultValue when no controlled value is given", () => {
        render(<RadioGroup name="transport" label="Transport" options={groupOptions} defaultValue="car" />);
        expect(screen.getByLabelText("Car")).toBeChecked();
        expect(screen.getByLabelText("Bike")).not.toBeChecked();
    });
});

describe("RadioGroup — onChange", () => {
    it("calls onChange with the selected option's value", async () => {
        const onChange = vi.fn();
        const user = userEvent.setup();
        render(<RadioGroup name="transport" label="Transport" options={groupOptions} onChange={onChange} />);

        await user.click(screen.getByLabelText("Bus"));

        expect(onChange).toHaveBeenCalledTimes(1);
        expect(onChange).toHaveBeenCalledWith("bus");
    });
});

describe("RadioGroup — disabled", () => {
    it("disables every radio when `disabled` is set on the group", () => {
        render(<RadioGroup name="transport" label="Transport" options={groupOptions} disabled />);
        screen.getAllByRole("radio").forEach((radio) => {
            expect(radio).toBeDisabled();
        });
    });
});

describe("RadioGroup — layout & semantics props", () => {
    it("adds align / equalise-width / label-first / with-columns classes", () => {
        render(
            <RadioGroup
                name="transport"
                label="Transport"
                options={groupOptions}
                align="vertical"
                equaliseWidth
                labelFirst
                columns={3}
            />
        );
        const group = screen.getByRole("radiogroup");
        expect(group).toHaveClass("align-vertical", "equalise-width", "label-first", "with-columns");
        // columns also drives the grid template inline style
        expect(group).toHaveStyle({ gridTemplateColumns : "repeat(3, 1fr)" });
    });

    it("marks aria-required and aria-invalid when required + errorText are set", () => {
        render(
            <RadioGroup
                name="transport"
                label="Transport"
                options={groupOptions}
                required
                errorText="Choose a mode"
            />
        );
        const group = screen.getByRole("radiogroup");
        expect(group).toHaveAttribute("aria-required", "true");
        expect(group).toHaveAttribute("aria-invalid", "true");
    });
});

describe("RadioGroup — a11y", () => {
    it("has no axe violations for a labelled group", async () => {
        const { container } = render(
            <RadioGroup name="transport" label="Pick your transport" options={groupOptions} />
        );
        expect(await axe(container)).toHaveNoViolations();
    });
});

// RADIO TAB GROUP /////////////////////////////////////////////////////////////////////////////////////////////////////
const tabOptions = [
    { id : "tab-day", value : "day", label : "Day" },
    { id : "tab-week", value : "week", label : "Week" },
    { id : "tab-month", value : "month", label : "Month" },
];

describe("RadioTabGroup — rendering & markup", () => {
    it("renders a radiogroup with [data-radio-tab-group] and one radio per option", () => {
        render(<RadioTabGroup label="Range" options={tabOptions} />);

        const group = screen.getByRole("radiogroup");
        expect(group).toHaveAttribute("data-radio-tab-group");
        expect(group).toHaveAttribute("aria-label", "Range");
        expect(screen.getAllByRole("radio")).toHaveLength(3);
    });

    it("emits the size-* class on the group (defaults to size-medium)", () => {
        const { rerender } = render(<RadioTabGroup label="Range" options={tabOptions} />);
        expect(screen.getByRole("radiogroup")).toHaveClass("size-medium");

        rerender(<RadioTabGroup label="Range" options={tabOptions} size="large" />);
        expect(screen.getByRole("radiogroup")).toHaveClass("size-large");
    });

    it("derives the radios' shared name from id when no name is given", () => {
        render(<RadioTabGroup id="range" label="Range" options={tabOptions} />);
        screen.getAllByRole("radio").forEach((radio) => {
            expect(radio).toHaveAttribute("name", "range");
        });
    });

    it("associates each option label with its radio via htmlFor", () => {
        render(<RadioTabGroup label="Range" options={tabOptions} />);
        expect(screen.getByLabelText("Day")).toHaveAttribute("value", "day");
        expect(screen.getByLabelText("Week")).toHaveAttribute("value", "week");
        expect(screen.getByLabelText("Month")).toHaveAttribute("value", "month");
    });
});

describe("RadioTabGroup — controlled selection", () => {
    it("checks only the radio matching the controlled `value`", () => {
        render(<RadioTabGroup label="Range" options={tabOptions} value="week" onChange={vi.fn()} />);
        expect(screen.getByLabelText("Day")).not.toBeChecked();
        expect(screen.getByLabelText("Week")).toBeChecked();
        expect(screen.getByLabelText("Month")).not.toBeChecked();
    });

    it("leaves all radios unchecked when value matches no option", () => {
        render(<RadioTabGroup label="Range" options={tabOptions} value="year" onChange={vi.fn()} />);
        screen.getAllByRole("radio").forEach((radio) => {
            expect(radio).not.toBeChecked();
        });
    });
});

describe("RadioTabGroup — onChange", () => {
    it("calls onChange with the selected option's value", async () => {
        const onChange = vi.fn();
        const user = userEvent.setup();
        render(<RadioTabGroup label="Range" options={tabOptions} onChange={onChange} />);

        await user.click(screen.getByLabelText("Month"));

        expect(onChange).toHaveBeenCalledTimes(1);
        expect(onChange).toHaveBeenCalledWith("month");
    });
});

describe("RadioTabGroup — disabled", () => {
    it("disables every radio when `disabled` is set on the group", () => {
        render(<RadioTabGroup label="Range" options={tabOptions} disabled />);
        screen.getAllByRole("radio").forEach((radio) => {
            expect(radio).toBeDisabled();
        });
    });

    it("disables only the per-option radio that opts in", () => {
        const mixed = [
            { id : "tab-day", value : "day", label : "Day" },
            { id : "tab-week", value : "week", label : "Week", disabled : true },
        ];
        render(<RadioTabGroup label="Range" options={mixed} />);
        expect(screen.getByLabelText("Day")).not.toBeDisabled();
        expect(screen.getByLabelText("Week")).toBeDisabled();
    });
});

describe("RadioTabGroup — a11y", () => {
    it("has no axe violations for a labelled tab group", async () => {
        const { container } = render(
            <RadioTabGroup label="Pick a date range" options={tabOptions} />
        );
        expect(await axe(container)).toHaveNoViolations();
    });
});
