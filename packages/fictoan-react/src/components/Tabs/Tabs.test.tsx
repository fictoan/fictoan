import { describe, it, expect } from "vitest";
import "../../../vitest-matchers";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "vitest-axe";

import { Tabs } from "./Tabs";

// Tabs is a data-driven tablist: it owns the active-tab state internally and
// wires up the WAI-ARIA tab pattern (role=tablist/tab/tabpanel, aria-selected,
// aria-controls/labelledby, roaming tabindex). These tests pin that ARIA
// contract and the click/keyboard switching.
//
// NOTE on timing: handleTabChange does NOT switch synchronously — it sets an
// `isExiting` flag, then commits the new active tab after a 150ms setTimeout
// (the exit-animation duration). So every interaction test runs under fake
// timers and advances them past 150ms before asserting the committed state.

const tabs = [
    { key : "one",   label : "Tab one",   content : "Panel one content" },
    { key : "two",   label : "Tab two",   content : "Panel two content" },
    { key : "three", label : "Tab three", content : "Panel three content" },
];

describe("Tabs — initial render & ARIA roles", () => {
    it("renders a tablist with one tab button per entry", () => {
        render(<Tabs tabs={tabs} />);
        const tablist = screen.getByRole("tablist");
        expect(tablist).toBeInTheDocument();
        expect(tablist).toHaveAttribute("aria-label", "Tab Navigation");

        const tabButtons = screen.getAllByRole("tab");
        expect(tabButtons).toHaveLength(3);
        expect(tabButtons[0]).toHaveTextContent("Tab one");
        expect(tabButtons[1]).toHaveTextContent("Tab two");
        expect(tabButtons[2]).toHaveTextContent("Tab three");
    });

    it("renders a tabpanel per entry, only the active one visible", () => {
        render(<Tabs tabs={tabs} />);
        // hidden panels are excluded from the accessibility tree, so only the
        // active panel is returned by getAllByRole("tabpanel").
        const visiblePanels = screen.getAllByRole("tabpanel");
        expect(visiblePanels).toHaveLength(1);
        expect(visiblePanels[0]).toHaveTextContent("Panel one content");

        // All three panel nodes exist in the DOM; the inactive two carry `hidden`.
        expect(document.getElementById("tab-panel-one")).not.toHaveAttribute("hidden");
        expect(document.getElementById("tab-panel-two")).toHaveAttribute("hidden");
        expect(document.getElementById("tab-panel-three")).toHaveAttribute("hidden");
    });

    it("marks the first tab active by default (aria-selected, data-active, is-active)", () => {
        render(<Tabs tabs={tabs} />);
        const [ first, second, third ] = screen.getAllByRole("tab");

        expect(first).toHaveAttribute("aria-selected", "true");
        expect(second).toHaveAttribute("aria-selected", "false");
        expect(third).toHaveAttribute("aria-selected", "false");

        expect(first).toHaveAttribute("data-active", "true");
        expect(second).toHaveAttribute("data-active", "false");

        expect(first).toHaveClass("tab-button", "is-active");
        expect(second).toHaveClass("tab-button");
        expect(second).not.toHaveClass("is-active");
    });

    it("applies a roaming tabindex (active=0, others=-1) on tabs and panels", () => {
        render(<Tabs tabs={tabs} />);
        const [ first, second, third ] = screen.getAllByRole("tab");
        expect(first).toHaveAttribute("tabindex", "0");
        expect(second).toHaveAttribute("tabindex", "-1");
        expect(third).toHaveAttribute("tabindex", "-1");

        expect(document.getElementById("tab-panel-one")).toHaveAttribute("tabindex", "0");
        expect(document.getElementById("tab-panel-two")).toHaveAttribute("tabindex", "-1");
    });

    it("wires aria-controls / aria-labelledby between tabs and panels", () => {
        render(<Tabs tabs={tabs} />);
        const [ first ] = screen.getAllByRole("tab");

        expect(first).toHaveAttribute("id", "tab-one");
        expect(first).toHaveAttribute("aria-controls", "tab-panel-one");

        const panelOne = document.getElementById("tab-panel-one");
        expect(panelOne).toHaveAttribute("role", "tabpanel");
        expect(panelOne).toHaveAttribute("aria-labelledby", "tab-one");
    });
});

describe("Tabs — props", () => {
    it("honours defaultActiveTab to pick the initially active tab", () => {
        render(<Tabs tabs={tabs} defaultActiveTab="two" />);
        const [ first, second ] = screen.getAllByRole("tab");

        expect(second).toHaveAttribute("aria-selected", "true");
        expect(first).toHaveAttribute("aria-selected", "false");

        expect(screen.getByRole("tabpanel")).toHaveTextContent("Panel two content");
        expect(document.getElementById("tab-panel-two")).not.toHaveAttribute("hidden");
    });

    it("falls back to the first tab when defaultActiveTab does not match a key", () => {
        render(<Tabs tabs={tabs} defaultActiveTab="does-not-exist" />);
        const [ first ] = screen.getAllByRole("tab");
        expect(first).toHaveAttribute("aria-selected", "true");
        expect(screen.getByRole("tabpanel")).toHaveTextContent("Panel one content");
    });

    it("renders the root with data-tabs, data-align and data-full-width attributes", () => {
        const { container } = render(<Tabs tabs={tabs} align="right" isFullWidth />);
        const root = container.querySelector("[data-tabs]");
        expect(root).toBeInTheDocument();
        expect(root).toHaveAttribute("data-align", "right");
        expect(root).toHaveAttribute("data-full-width", "true");
    });

    it("defaults data-align to 'left'", () => {
        const { container } = render(<Tabs tabs={tabs} />);
        expect(container.querySelector("[data-tabs]")).toHaveAttribute("data-align", "left");
    });

    it("renders additionalNavContentWrapper inside the labels list", () => {
        render(
            <Tabs
                tabs={tabs}
                additionalNavContentWrapper={<li data-testid="extra-nav">extra</li>}
            />,
        );
        expect(screen.getByTestId("extra-nav")).toBeInTheDocument();
    });

    it("marks a tab with data-alert when hasAlert is set", () => {
        const alertTabs = [
            { key : "a", label : "Alpha", content : "A", hasAlert : true },
            { key : "b", label : "Beta",  content : "B" },
        ];
        render(<Tabs tabs={alertTabs} />);
        const [ alpha, beta ] = screen.getAllByRole("tab");
        expect(alpha).toHaveAttribute("data-alert", "true");
        // hasAlert is undefined on the second tab, so data-alert={undefined}
        // emits NO attribute at all (React drops it) — unlike data-active, which
        // is a real boolean `false` and renders as the string "false".
        expect(beta).not.toHaveAttribute("data-alert");
        expect(beta).toHaveAttribute("data-active", "false");
    });

    it("renders nothing when the tabs array is empty", () => {
        const { container } = render(<Tabs tabs={[]} />);
        expect(container.querySelector("[data-tabs]")).not.toBeInTheDocument();
        expect(screen.queryByRole("tablist")).not.toBeInTheDocument();
    });
});

describe("Tabs — switching (click + keyboard)", () => {
    // handleTabChange commits the new tab only after a 150ms setTimeout (the
    // exit-animation duration). Under real timers, waitFor / findBy polls until
    // that commit lands, which is the simplest reliable way to drive it.

    it("switches the active panel when another tab is clicked", async () => {
        const user = userEvent.setup();
        render(<Tabs tabs={tabs} />);

        await user.click(screen.getByRole("tab", { name : "Tab two" }));

        await waitFor(() => {
            expect(screen.getByRole("tab", { name : "Tab two" })).toHaveAttribute("aria-selected", "true");
        });

        expect(screen.getByRole("tab", { name : "Tab one" })).toHaveAttribute("aria-selected", "false");
        expect(screen.getByRole("tabpanel")).toHaveTextContent("Panel two content");
        expect(document.getElementById("tab-panel-two")).not.toHaveAttribute("hidden");
        expect(document.getElementById("tab-panel-one")).toHaveAttribute("hidden");
    });

    it("does NOT switch synchronously — the old panel is still shown before the timer fires", async () => {
        const user = userEvent.setup();
        render(<Tabs tabs={tabs} />);

        await user.click(screen.getByRole("tab", { name : "Tab two" }));

        // Immediately after the click (before the 150ms timer) tab one is still
        // the committed active tab.
        expect(screen.getByRole("tab", { name : "Tab one" })).toHaveAttribute("aria-selected", "true");
        expect(screen.getByRole("tabpanel")).toHaveTextContent("Panel one content");
    });

    it("ArrowRight moves to the next tab", async () => {
        const user = userEvent.setup();
        render(<Tabs tabs={tabs} />);

        screen.getAllByRole("tab")[0].focus();
        await user.keyboard("{ArrowRight}");

        await waitFor(() => {
            expect(screen.getAllByRole("tab")[1]).toHaveAttribute("aria-selected", "true");
        });
        expect(screen.getByRole("tabpanel")).toHaveTextContent("Panel two content");
    });

    it("ArrowLeft wraps from the first tab to the last", async () => {
        const user = userEvent.setup();
        render(<Tabs tabs={tabs} />);

        screen.getAllByRole("tab")[0].focus();
        await user.keyboard("{ArrowLeft}");

        await waitFor(() => {
            expect(screen.getAllByRole("tab")[2]).toHaveAttribute("aria-selected", "true");
        });
        expect(screen.getByRole("tabpanel")).toHaveTextContent("Panel three content");
    });

    it("End jumps to the last tab, Home back to the first", async () => {
        const user = userEvent.setup();
        render(<Tabs tabs={tabs} />);

        screen.getAllByRole("tab")[0].focus();
        await user.keyboard("{End}");
        await waitFor(() => {
            expect(screen.getAllByRole("tab")[2]).toHaveAttribute("aria-selected", "true");
        });

        screen.getAllByRole("tab")[2].focus();
        await user.keyboard("{Home}");
        await waitFor(() => {
            expect(screen.getAllByRole("tab")[0]).toHaveAttribute("aria-selected", "true");
        });
    });

    it("ignores non-navigation keys (state unchanged)", async () => {
        const user = userEvent.setup();
        render(<Tabs tabs={tabs} />);

        screen.getAllByRole("tab")[0].focus();
        await user.keyboard("a");

        // No navigation key was pressed, so nothing changes even after a tick.
        await new Promise((resolve) => setTimeout(resolve, 200));
        expect(screen.getAllByRole("tab")[0]).toHaveAttribute("aria-selected", "true");
        expect(screen.getByRole("tabpanel")).toHaveTextContent("Panel one content");
    });
});

describe("Tabs — a11y", () => {
    // role="none" on the <ul>/<li> wrappers means the role="tab" buttons are the
    // tablist's effective children, so the aria-required-children / aria-required-parent
    // pair that used to fire no longer does.
    it("has no axe violations (tab buttons are owned by the tablist)", async () => {
        const { container } = render(
            <Tabs
                tabs={[
                    { key : "details",  label : "Details",  content : "Account details go here." },
                    { key : "security", label : "Security", content : "Security settings go here." },
                ]}
            />,
        );

        expect(await axe(container)).toHaveNoViolations();
    });
});
