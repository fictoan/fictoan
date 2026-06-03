// TESTS ===============================================================================================================
import "../../../../vitest-matchers";
import userEvent from "@testing-library/user-event";
import { axe } from "vitest-axe";
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";

// OTHER ===============================================================================================================
import { ListBox } from "./ListBox";

// ListBox is a custom combobox (a <div role="combobox"> over a <ul role="listbox">),
// NOT a native <select>. These tests pin the jsdom-assertable contract: the
// keyboard-open path (the recent handleComboboxKeyDown fix), search filtering,
// selection -> onChange wiring, the displayed selection, and the ARIA
// relationships (role wiring + aria-activedescendant on the SEARCH INPUT, not the
// combobox div). Visual open/close direction (openUpward) and scrollIntoView are
// geometry/effect concerns left to the browser tier.

const OPTIONS = [
    { value : "apple",  label : "Apple" },
    { value : "banana", label : "Banana" },
    { value : "cherry", label : "Cherry" },
];

// The combobox div carries role="combobox"; the search input only mounts once open.
const getCombobox = () => screen.getByRole("combobox");

describe("ListBox — role / ARIA wiring (closed)", () => {
    it("renders a role=combobox div with aria-haspopup=listbox and aria-expanded=false", () => {
        render(<ListBox label="Fruit" options={OPTIONS} />);
        const combobox = getCombobox();
        expect(combobox.tagName).toBe("DIV");
        expect(combobox).toHaveAttribute("aria-haspopup", "listbox");
        expect(combobox).toHaveAttribute("aria-expanded", "false");
        // tabIndex 0 so a keyboard user can focus and open it
        expect(combobox).toHaveAttribute("tabindex", "0");
    });

    it("does not render the listbox or options while closed", () => {
        render(<ListBox label="Fruit" options={OPTIONS} />);
        expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
        expect(screen.queryAllByRole("option")).toHaveLength(0);
    });

    it("shows the placeholder when nothing is selected", () => {
        render(<ListBox label="Fruit" options={OPTIONS} placeholder="Pick a fruit" />);
        expect(screen.getByText("Pick a fruit")).toBeInTheDocument();
    });

    it("wires aria-controls on the combobox to the listbox id", () => {
        render(<ListBox label="Fruit" options={OPTIONS} id="fruit" />);
        expect(getCombobox()).toHaveAttribute("aria-controls", "fruit-listbox");
    });

    it("marks the combobox aria-disabled and tabIndex -1 when disabled", () => {
        render(<ListBox label="Fruit" options={OPTIONS} disabled />);
        const combobox = getCombobox();
        expect(combobox).toHaveAttribute("aria-disabled", "true");
        expect(combobox).toHaveAttribute("tabindex", "-1");
    });
});

describe("ListBox — keyboard opens the combobox (handleComboboxKeyDown)", () => {
    it("opens on ArrowDown and sets the first option active", async () => {
        const user = userEvent.setup();
        render(<ListBox label="Fruit" options={OPTIONS} id="fruit" />);
        const combobox = getCombobox();

        combobox.focus();
        await user.keyboard("{ArrowDown}");

        expect(combobox).toHaveAttribute("aria-expanded", "true");
        expect(screen.getByRole("listbox")).toBeInTheDocument();

        // First option active: search input's aria-activedescendant points at it
        const search = screen.getByRole("textbox", { name : "Search options" });
        expect(search).toHaveAttribute("aria-activedescendant", "fruit-option-apple");
        const firstOption = screen.getByRole("option", { name : "Apple" });
        expect(firstOption).toHaveClass("active");
    });

    it("opens on Enter and sets the first option active", async () => {
        const user = userEvent.setup();
        render(<ListBox label="Fruit" options={OPTIONS} id="fruit" />);
        const combobox = getCombobox();

        combobox.focus();
        await user.keyboard("{Enter}");

        expect(combobox).toHaveAttribute("aria-expanded", "true");
        const search = screen.getByRole("textbox", { name : "Search options" });
        expect(search).toHaveAttribute("aria-activedescendant", "fruit-option-apple");
    });

    it("opens on Space and sets the first option active", async () => {
        const user = userEvent.setup();
        render(<ListBox label="Fruit" options={OPTIONS} id="fruit" />);
        const combobox = getCombobox();

        combobox.focus();
        await user.keyboard("{ }");

        expect(combobox).toHaveAttribute("aria-expanded", "true");
        const search = screen.getByRole("textbox", { name : "Search options" });
        expect(search).toHaveAttribute("aria-activedescendant", "fruit-option-apple");
    });

    it("does NOT open on keydown when disabled", async () => {
        const user = userEvent.setup();
        render(<ListBox label="Fruit" options={OPTIONS} disabled />);
        const combobox = getCombobox();

        combobox.focus();
        await user.keyboard("{ArrowDown}");

        expect(combobox).toHaveAttribute("aria-expanded", "false");
        expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
    });

    it("opens on click as well", async () => {
        const user = userEvent.setup();
        render(<ListBox label="Fruit" options={OPTIONS} />);
        const combobox = getCombobox();

        await user.click(combobox);
        expect(combobox).toHaveAttribute("aria-expanded", "true");
        expect(screen.getByRole("listbox")).toBeInTheDocument();
    });
});

describe("ListBox — open state markup / ARIA", () => {
    const openListBox = async () => {
        const user = userEvent.setup();
        render(<ListBox label="Fruit" options={OPTIONS} id="fruit" />);
        const combobox = getCombobox();
        combobox.focus();
        await user.keyboard("{ArrowDown}");
        return user;
    };

    it("renders the listbox <ul> with role=listbox and the correct id", async () => {
        await openListBox();
        const listbox = screen.getByRole("listbox");
        expect(listbox.tagName).toBe("UL");
        expect(listbox).toHaveAttribute("id", "fruit-listbox");
        expect(listbox).toHaveAttribute("aria-multiselectable", "false");
    });

    it("renders one role=option per option with the right id and aria-selected", async () => {
        await openListBox();
        const options = screen.getAllByRole("option");
        expect(options).toHaveLength(3);
        expect(options[0]).toHaveAttribute("id", "fruit-option-apple");
        expect(options[1]).toHaveAttribute("id", "fruit-option-banana");
        expect(options[2]).toHaveAttribute("id", "fruit-option-cherry");
        options.forEach(opt => expect(opt).toHaveAttribute("aria-selected", "false"));
    });

    it("puts aria-activedescendant on the search input, NOT the combobox div", async () => {
        await openListBox();
        const combobox = getCombobox();
        const search = screen.getByRole("textbox", { name : "Search options" });

        expect(combobox).not.toHaveAttribute("aria-activedescendant");
        expect(search).toHaveAttribute("aria-activedescendant", "fruit-option-apple");
        // and the id it points at is a real option in the DOM
        expect(document.getElementById("fruit-option-apple")).toHaveAttribute("role", "option");
    });

    it("ArrowDown within the open list advances the active option", async () => {
        const user = await openListBox();
        const search = screen.getByRole("textbox", { name : "Search options" });
        expect(search).toHaveAttribute("aria-activedescendant", "fruit-option-apple");

        await user.keyboard("{ArrowDown}");
        expect(search).toHaveAttribute("aria-activedescendant", "fruit-option-banana");
        expect(screen.getByRole("option", { name : "Banana" })).toHaveClass("active");
    });
});

describe("ListBox — search filtering", () => {
    it("filters options as the user types in the search box", async () => {
        const user = userEvent.setup();
        render(<ListBox label="Fruit" options={OPTIONS} id="fruit" />);
        const combobox = getCombobox();
        combobox.focus();
        await user.keyboard("{ArrowDown}");

        const search = screen.getByRole("textbox", { name : "Search options" });
        await user.type(search, "ban");

        const options = screen.getAllByRole("option");
        expect(options).toHaveLength(1);
        expect(options[0]).toHaveTextContent("Banana");
        expect(screen.queryByRole("option", { name : "Apple" })).not.toBeInTheDocument();
    });

    it("shows the 'No matches found' alert when nothing matches", async () => {
        const user = userEvent.setup();
        render(<ListBox label="Fruit" options={OPTIONS} />);
        const combobox = getCombobox();
        combobox.focus();
        await user.keyboard("{ArrowDown}");

        const search = screen.getByRole("textbox", { name : "Search options" });
        await user.type(search, "zzzzzzzz");

        expect(screen.getByRole("alert")).toHaveTextContent("No matches found");
        expect(screen.queryByRole("option")).not.toBeInTheDocument();
    });
});

describe("ListBox — single-select selection wiring", () => {
    it("fires onChange with the option value and shows the selection on click", async () => {
        const user = userEvent.setup();
        const onChange = vi.fn();
        render(<ListBox label="Fruit" options={OPTIONS} onChange={onChange} />);
        const combobox = getCombobox();

        await user.click(combobox);
        await user.click(screen.getByRole("option", { name : "Banana" }));

        expect(onChange).toHaveBeenCalledTimes(1);
        expect(onChange).toHaveBeenCalledWith("banana");
        // selection now displayed, dropdown closed
        expect(combobox).toHaveAttribute("aria-expanded", "false");
        expect(screen.getByText("Banana")).toBeInTheDocument();
        expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
    });

    it("selects the active option with Enter and fires onChange", async () => {
        const user = userEvent.setup();
        const onChange = vi.fn();
        render(<ListBox label="Fruit" options={OPTIONS} onChange={onChange} />);
        const combobox = getCombobox();

        combobox.focus();
        await user.keyboard("{ArrowDown}"); // open, active = apple
        await user.keyboard("{ArrowDown}"); // active = banana
        await user.keyboard("{Enter}");     // select banana

        expect(onChange).toHaveBeenCalledTimes(1);
        expect(onChange).toHaveBeenCalledWith("banana");
        expect(screen.getByText("Banana")).toBeInTheDocument();
    });

    it("renders the defaultValue selection on first paint without firing onChange", () => {
        const onChange = vi.fn();
        render(
            <ListBox label="Fruit" options={OPTIONS} defaultValue="cherry" onChange={onChange} />,
        );
        expect(screen.getByText("Cherry")).toBeInTheDocument();
        expect(onChange).not.toHaveBeenCalled();
    });

    it("reflects a controlled value and does not mutate it on selection", async () => {
        const user = userEvent.setup();
        const onChange = vi.fn();
        render(
            <ListBox label="Fruit" options={OPTIONS} value="apple" onChange={onChange} />,
        );
        expect(screen.getByText("Apple")).toBeInTheDocument();

        await user.click(getCombobox());
        await user.click(screen.getByRole("option", { name : "Banana" }));

        // onChange is notified, but the displayed value stays "apple" (controlled)
        expect(onChange).toHaveBeenCalledWith("banana");
        expect(screen.getByText("Apple")).toBeInTheDocument();
    });
});

describe("ListBox — multi-select", () => {
    it("fires onChange with an array of values and keeps the dropdown open", async () => {
        const user = userEvent.setup();
        const onChange = vi.fn();
        render(
            <ListBox label="Fruit" options={OPTIONS} allowMultiSelect onChange={onChange} />,
        );
        const combobox = getCombobox();

        await user.click(combobox);
        await user.click(screen.getByRole("option", { name : "Apple" }));

        expect(onChange).toHaveBeenLastCalledWith([ "apple" ]);
        // stays open for further selection in multi-select
        expect(combobox).toHaveAttribute("aria-expanded", "true");

        await user.click(screen.getByRole("option", { name : "Cherry" }));
        expect(onChange).toHaveBeenLastCalledWith([ "apple", "cherry" ]);
    });
});

describe("ListBox — a11y", () => {
    // The combobox now carries its own aria-label (htmlFor on the visible <label>
    // only names native controls, not a role="combobox" div), so the open listbox
    // has a proper accessible name and reports no violations.
    it("open state has no axe violations", async () => {
        const user = userEvent.setup();
        const { container } = render(
            <ListBox label="Favourite fruit" options={OPTIONS} helpText="Choose one" />,
        );
        await user.click(getCombobox());
        expect(screen.getByRole("listbox")).toBeInTheDocument();

        expect(await axe(container)).toHaveNoViolations();
    });
});
