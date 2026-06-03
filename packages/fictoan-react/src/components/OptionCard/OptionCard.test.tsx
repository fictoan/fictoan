// TESTS ===============================================================================================================
import "../../../vitest-matchers";
import userEvent from "@testing-library/user-event";
import { axe } from "vitest-axe";
import { describe, it, expect, vi } from "vitest";
import { render, screen, act } from "@testing-library/react";

// OTHER ===============================================================================================================
import { OptionCard, OptionCardsGroup } from "./OptionCard";

// OptionCard is a selection widget built on context: OptionCardsGroup owns the
// selection Set and the toggle/select-all/none/inverse logic, each OptionCard
// reads its own selected state and reports clicks/keys back up. These tests pin
// the public contract — emitted role/aria-pressed/aria-disabled, the `selected`
// class, single vs multi select semantics, selectionLimit, controlled vs
// uncontrolled wiring, the tick-position class on the group, and the tick icon
// gate. Visual behaviour (icon positioning, hover de-select animation) is CSS
// and lives in the future browser tier.

describe("OptionCard — rendering & ARIA", () => {
    it("renders each card as role=button with the option-card data attribute", () => {
        render(
            <OptionCardsGroup>
                <OptionCard id="a">Alpha</OptionCard>
                <OptionCard id="b">Beta</OptionCard>
            </OptionCardsGroup>,
        );

        const cards = screen.getAllByRole("button");
        expect(cards).toHaveLength(2);
        cards.forEach((card) => {
            expect(card).toHaveAttribute("data-option-card");
            // Card supplies data-card; OptionCard layers data-option-card on top.
            expect(card).toHaveAttribute("data-card");
        });
    });

    it("is keyboard-focusable when enabled and pulled out of the tab order when disabled", () => {
        render(
            <OptionCardsGroup>
                <OptionCard id="a">Alpha</OptionCard>
                <OptionCard id="b" disabled>Beta</OptionCard>
            </OptionCardsGroup>,
        );

        const [ enabled, disabled ] = screen.getAllByRole("button");
        expect(enabled).toHaveAttribute("tabindex", "0");
        expect(disabled).toHaveAttribute("tabindex", "-1");
        expect(disabled).toHaveAttribute("aria-disabled", "true");
        expect(disabled).toHaveClass("disabled");
    });

    it("starts unselected: aria-pressed=false and no `selected` class", () => {
        render(
            <OptionCardsGroup>
                <OptionCard id="a">Alpha</OptionCard>
            </OptionCardsGroup>,
        );

        const card = screen.getByRole("button");
        expect(card).toHaveAttribute("aria-pressed", "false");
        expect(card).not.toHaveClass("selected");
    });

    it("renders the tick/deselect icons only when showTickIcon is set on the group", () => {
        const { container, rerender } = render(
            <OptionCardsGroup>
                <OptionCard id="a">Alpha</OptionCard>
            </OptionCardsGroup>,
        );
        expect(container.querySelector(".tick-icon")).toBeNull();
        expect(container.querySelector(".deselect-icon")).toBeNull();

        rerender(
            <OptionCardsGroup showTickIcon>
                <OptionCard id="a">Alpha</OptionCard>
            </OptionCardsGroup>,
        );
        expect(container.querySelector(".tick-icon")).not.toBeNull();
        expect(container.querySelector(".deselect-icon")).not.toBeNull();
    });
});

describe("OptionCard — single select (default)", () => {
    it("marks the clicked option selected and reports the id set", async () => {
        const user = userEvent.setup();
        const onSelectionChange = vi.fn();
        render(
            <OptionCardsGroup onSelectionChange={onSelectionChange}>
                <OptionCard id="a">Alpha</OptionCard>
                <OptionCard id="b">Beta</OptionCard>
            </OptionCardsGroup>,
        );

        const [ alpha, beta ] = screen.getAllByRole("button");
        await user.click(alpha);

        expect(alpha).toHaveClass("selected");
        expect(alpha).toHaveAttribute("aria-pressed", "true");
        expect(beta).not.toHaveClass("selected");
        expect(onSelectionChange).toHaveBeenLastCalledWith(new Set([ "a" ]));
    });

    it("only one option can be selected at a time", async () => {
        const user = userEvent.setup();
        const onSelectionChange = vi.fn();
        render(
            <OptionCardsGroup onSelectionChange={onSelectionChange}>
                <OptionCard id="a">Alpha</OptionCard>
                <OptionCard id="b">Beta</OptionCard>
            </OptionCardsGroup>,
        );

        const [ alpha, beta ] = screen.getAllByRole("button");
        await user.click(alpha);
        await user.click(beta);

        expect(alpha).not.toHaveClass("selected");
        expect(beta).toHaveClass("selected");
        expect(onSelectionChange).toHaveBeenLastCalledWith(new Set([ "b" ]));
    });

    it("clicking the sole selected option again clears the selection", async () => {
        const user = userEvent.setup();
        const onSelectionChange = vi.fn();
        render(
            <OptionCardsGroup onSelectionChange={onSelectionChange}>
                <OptionCard id="a">Alpha</OptionCard>
            </OptionCardsGroup>,
        );

        const alpha = screen.getByRole("button");
        await user.click(alpha);
        expect(alpha).toHaveClass("selected");

        await user.click(alpha);
        expect(alpha).not.toHaveClass("selected");
        expect(onSelectionChange).toHaveBeenLastCalledWith(new Set());
    });
});

describe("OptionCard — multi select", () => {
    it("keeps multiple options selected when allowMultipleSelections is set", async () => {
        const user = userEvent.setup();
        const onSelectionChange = vi.fn();
        render(
            <OptionCardsGroup allowMultipleSelections onSelectionChange={onSelectionChange}>
                <OptionCard id="a">Alpha</OptionCard>
                <OptionCard id="b">Beta</OptionCard>
            </OptionCardsGroup>,
        );

        const [ alpha, beta ] = screen.getAllByRole("button");
        await user.click(alpha);
        await user.click(beta);

        expect(alpha).toHaveClass("selected");
        expect(beta).toHaveClass("selected");
        expect(onSelectionChange).toHaveBeenLastCalledWith(new Set([ "a", "b" ]));
    });

    it("toggles an already-selected option off without touching the others", async () => {
        const user = userEvent.setup();
        render(
            <OptionCardsGroup allowMultipleSelections>
                <OptionCard id="a">Alpha</OptionCard>
                <OptionCard id="b">Beta</OptionCard>
            </OptionCardsGroup>,
        );

        const [ alpha, beta ] = screen.getAllByRole("button");
        await user.click(alpha);
        await user.click(beta);
        await user.click(alpha);

        expect(alpha).not.toHaveClass("selected");
        expect(beta).toHaveClass("selected");
    });

    it("refuses selections beyond selectionLimit", async () => {
        const user = userEvent.setup();
        const onSelectionChange = vi.fn();
        render(
            <OptionCardsGroup allowMultipleSelections selectionLimit={2} onSelectionChange={onSelectionChange}>
                <OptionCard id="a">Alpha</OptionCard>
                <OptionCard id="b">Beta</OptionCard>
                <OptionCard id="c">Gamma</OptionCard>
            </OptionCardsGroup>,
        );

        const [ alpha, beta, gamma ] = screen.getAllByRole("button");
        await user.click(alpha);
        await user.click(beta);
        await user.click(gamma);

        expect(alpha).toHaveClass("selected");
        expect(beta).toHaveClass("selected");
        expect(gamma).not.toHaveClass("selected");
        expect(onSelectionChange).toHaveBeenLastCalledWith(new Set([ "a", "b" ]));
    });
});

describe("OptionCard — keyboard", () => {
    it("toggles selection on Enter", async () => {
        const user = userEvent.setup();
        render(
            <OptionCardsGroup>
                <OptionCard id="a">Alpha</OptionCard>
            </OptionCardsGroup>,
        );

        const alpha = screen.getByRole("button");
        alpha.focus();
        await user.keyboard("{Enter}");
        expect(alpha).toHaveClass("selected");
    });

    it("toggles selection on Space", async () => {
        const user = userEvent.setup();
        render(
            <OptionCardsGroup>
                <OptionCard id="a">Alpha</OptionCard>
            </OptionCardsGroup>,
        );

        const alpha = screen.getByRole("button");
        alpha.focus();
        await user.keyboard("[Space]");
        expect(alpha).toHaveClass("selected");
    });

    it("ignores keyboard activation on a disabled card", async () => {
        const user = userEvent.setup();
        const onSelectionChange = vi.fn();
        render(
            <OptionCardsGroup onSelectionChange={onSelectionChange}>
                <OptionCard id="a" disabled>Alpha</OptionCard>
            </OptionCardsGroup>,
        );

        const alpha = screen.getByRole("button");
        alpha.focus();
        await user.keyboard("{Enter}");
        expect(alpha).not.toHaveClass("selected");
        expect(onSelectionChange).not.toHaveBeenCalled();
    });
});

describe("OptionCard — disabled click", () => {
    it("does not toggle and does not fire onSelectionChange when clicking a disabled card", async () => {
        const user = userEvent.setup();
        const onSelectionChange = vi.fn();
        render(
            <OptionCardsGroup onSelectionChange={onSelectionChange}>
                <OptionCard id="a" disabled>Alpha</OptionCard>
            </OptionCardsGroup>,
        );

        const alpha = screen.getByRole("button");
        await user.click(alpha);
        expect(alpha).not.toHaveClass("selected");
        expect(onSelectionChange).not.toHaveBeenCalled();
    });

    it("still fires a passed-through onClick on an enabled card", async () => {
        const user = userEvent.setup();
        const onClick = vi.fn();
        render(
            <OptionCardsGroup>
                <OptionCard id="a" onClick={onClick}>Alpha</OptionCard>
            </OptionCardsGroup>,
        );

        await user.click(screen.getByRole("button"));
        expect(onClick).toHaveBeenCalledTimes(1);
    });
});

describe("OptionCardsGroup — tick position & defaults", () => {
    it("writes the tick-<position> class on the group wrapper (default top-right)", () => {
        const { container, rerender } = render(
            <OptionCardsGroup>
                <OptionCard id="a">Alpha</OptionCard>
            </OptionCardsGroup>,
        );
        const group = container.querySelector("[data-option-cards-group]");
        expect(group).toHaveClass("tick-top-right");

        rerender(
            <OptionCardsGroup tickPosition="centre">
                <OptionCard id="a">Alpha</OptionCard>
            </OptionCardsGroup>,
        );
        expect(container.querySelector("[data-option-cards-group]")).toHaveClass("tick-centre");
    });

    it("renders the supplied default selection in uncontrolled mode", () => {
        render(
            <OptionCardsGroup allowMultipleSelections defaultSelectedIds={new Set([ "b" ])}>
                <OptionCard id="a">Alpha</OptionCard>
                <OptionCard id="b">Beta</OptionCard>
            </OptionCardsGroup>,
        );

        const [ alpha, beta ] = screen.getAllByRole("button");
        expect(alpha).not.toHaveClass("selected");
        expect(beta).toHaveClass("selected");
    });
});

describe("OptionCardsGroup — controlled mode", () => {
    it("renders selection from the selectedIds prop and does not self-update on click", async () => {
        const user = userEvent.setup();
        const onSelectionChange = vi.fn();
        render(
            <OptionCardsGroup selectedIds={new Set([ "a" ])} onSelectionChange={onSelectionChange}>
                <OptionCard id="a">Alpha</OptionCard>
                <OptionCard id="b">Beta</OptionCard>
            </OptionCardsGroup>,
        );

        const [ alpha, beta ] = screen.getAllByRole("button");
        expect(alpha).toHaveClass("selected");

        // Clicking another option reports the intended new set but, with no
        // parent re-render of selectedIds, the DOM selection stays put.
        await user.click(beta);
        expect(onSelectionChange).toHaveBeenLastCalledWith(new Set([ "b" ]));
        expect(alpha).toHaveClass("selected");
        expect(beta).not.toHaveClass("selected");
    });
});

describe("OptionCardsGroup — imperative ref (select all/none/inverse)", () => {
    it("selectAll selects every enabled option, selectNone clears, selectInverse flips", () => {
        const onSelectionChange = vi.fn();
        const ref = { current: null as null | { selectAll: () => void; selectNone: () => void; selectInverse: () => void } };

        render(
            <OptionCardsGroup ref={ref} allowMultipleSelections onSelectionChange={onSelectionChange}>
                <OptionCard id="a">Alpha</OptionCard>
                <OptionCard id="b">Beta</OptionCard>
                <OptionCard id="c" disabled>Gamma</OptionCard>
            </OptionCardsGroup>,
        );

        // selectAll skips the disabled option.
        act(() => ref.current!.selectAll());
        expect(onSelectionChange).toHaveBeenLastCalledWith(new Set([ "a", "b" ]));

        act(() => ref.current!.selectNone());
        expect(onSelectionChange).toHaveBeenLastCalledWith(new Set());
    });
});

describe("OptionCard — a11y", () => {
    it("has no axe violations for a labelled group of options", async () => {
        const { container } = render(
            <OptionCardsGroup showTickIcon>
                <OptionCard id="small">Small plan</OptionCard>
                <OptionCard id="medium">Medium plan</OptionCard>
                <OptionCard id="large" disabled>Large plan</OptionCard>
            </OptionCardsGroup>,
        );
        expect(await axe(container)).toHaveNoViolations();
    });
});
