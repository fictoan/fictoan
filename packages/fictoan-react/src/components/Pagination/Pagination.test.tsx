import { describe, it, expect, vi } from "vitest";
import "../../../vitest-matchers";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "vitest-axe";

import { Pagination } from "./Pagination";

// Pagination is a controlled nav: it takes totalItems (= totalPages, one page
// per item) + currentPage and renders first/prev, the numbered page window,
// and next/last as `kind="custom"` Buttons. These tests pin the page-control
// markup, the onPageChange wiring, the disabled edges, and the aria-current
// marking of the active page. (The page-window maths lives in usePagination;
// here we assert the buttons the component actually emits.)

// Helper: grab the numbered page buttons (excludes the four nav buttons, which
// carry aria-labels, and the ellipsis Text node, which is not a button).
const getPageButtons = () =>
    screen.getAllByRole("button").filter((b) => !b.getAttribute("aria-label"));

describe("Pagination — rendering", () => {
    it("renders a <nav> with the pagination contract attributes", () => {
        const { container } = render(
            <Pagination totalItems={5} currentPage={1} onPageChange={vi.fn()} itemsToShowEachSide={1} />,
        );
        const nav = container.querySelector("nav");
        expect(nav).toBeInTheDocument();
        expect(nav).toHaveClass("pagination", "plain");
        expect(nav).toHaveAttribute("data-pagination");
        expect(nav).toHaveAttribute("aria-label", "pagination");
        expect(nav).toHaveAttribute("role", "navigation");
    });

    it("renders one numbered button per page when total fits the window", () => {
        // totalNumbers = itemsToShowEachSide*2 + 1 = 5, totalPages = 5 => show all
        render(
            <Pagination totalItems={5} currentPage={3} onPageChange={vi.fn()} itemsToShowEachSide={2} />,
        );
        const pageButtons = getPageButtons();
        expect(pageButtons.map((b) => b.textContent)).toEqual([ "1", "2", "3", "4", "5" ]);
    });

    it("renders the four navigation buttons with their accessible labels", () => {
        render(
            <Pagination totalItems={5} currentPage={3} onPageChange={vi.fn()} itemsToShowEachSide={1} />,
        );
        expect(screen.getByRole("button", { name : "Go to first page" })).toBeInTheDocument();
        expect(screen.getByRole("button", { name : "Go to previous page" })).toBeInTheDocument();
        expect(screen.getByRole("button", { name : "Go to next page" })).toBeInTheDocument();
        expect(screen.getByRole("button", { name : "Go to last page" })).toBeInTheDocument();
    });

    it("renders an ellipsis when the page window does not cover all pages", () => {
        // totalPages 10, window of 1 each side around page 1 => 1 ... 10
        const { container } = render(
            <Pagination totalItems={10} currentPage={1} onPageChange={vi.fn()} itemsToShowEachSide={1} />,
        );
        expect(container.querySelector(".pagination-ellipsis")).toBeInTheDocument();
        expect(container.querySelector(".pagination-ellipsis")).toHaveTextContent("...");
    });

    it("renders the empty-state Text and no nav when totalItems is 0", () => {
        const { container } = render(
            <Pagination totalItems={0} currentPage={1} onPageChange={vi.fn()} itemsToShowEachSide={1} />,
        );
        expect(container.querySelector("nav")).not.toBeInTheDocument();
        expect(container.querySelector(".pagination-empty")).toHaveTextContent("No items to display");
    });

    it("honours a custom emptyText", () => {
        const { container } = render(
            <Pagination
                totalItems={0}
                currentPage={1}
                onPageChange={vi.fn()}
                itemsToShowEachSide={1}
                emptyText="Nothing here"
            />,
        );
        expect(container.querySelector(".pagination-empty")).toHaveTextContent("Nothing here");
    });
});

describe("Pagination — onPageChange wiring", () => {
    it("clicking a numbered page calls onPageChange with that page", async () => {
        const onPageChange = vi.fn();
        render(
            <Pagination totalItems={5} currentPage={3} onPageChange={onPageChange} itemsToShowEachSide={2} />,
        );
        await userEvent.click(screen.getByRole("button", { name : "4" }));
        expect(onPageChange).toHaveBeenCalledTimes(1);
        expect(onPageChange).toHaveBeenCalledWith(4);
    });

    it("clicking next calls onPageChange with currentPage + 1", async () => {
        const onPageChange = vi.fn();
        render(
            <Pagination totalItems={5} currentPage={3} onPageChange={onPageChange} itemsToShowEachSide={2} />,
        );
        await userEvent.click(screen.getByRole("button", { name : "Go to next page" }));
        expect(onPageChange).toHaveBeenCalledWith(4);
    });

    it("clicking previous calls onPageChange with currentPage - 1", async () => {
        const onPageChange = vi.fn();
        render(
            <Pagination totalItems={5} currentPage={3} onPageChange={onPageChange} itemsToShowEachSide={2} />,
        );
        await userEvent.click(screen.getByRole("button", { name : "Go to previous page" }));
        expect(onPageChange).toHaveBeenCalledWith(2);
    });

    it("clicking first calls onPageChange with 1", async () => {
        const onPageChange = vi.fn();
        render(
            <Pagination totalItems={5} currentPage={3} onPageChange={onPageChange} itemsToShowEachSide={2} />,
        );
        await userEvent.click(screen.getByRole("button", { name : "Go to first page" }));
        expect(onPageChange).toHaveBeenCalledWith(1);
    });

    it("clicking last calls onPageChange with totalPages", async () => {
        const onPageChange = vi.fn();
        render(
            <Pagination totalItems={5} currentPage={3} onPageChange={onPageChange} itemsToShowEachSide={2} />,
        );
        await userEvent.click(screen.getByRole("button", { name : "Go to last page" }));
        // totalPages === totalItems === 5
        expect(onPageChange).toHaveBeenCalledWith(5);
    });
});

describe("Pagination — disabled edges", () => {
    it("disables first & previous on the first page, enables next & last", () => {
        render(
            <Pagination totalItems={5} currentPage={1} onPageChange={vi.fn()} itemsToShowEachSide={2} />,
        );
        expect(screen.getByRole("button", { name : "Go to first page" })).toBeDisabled();
        expect(screen.getByRole("button", { name : "Go to previous page" })).toBeDisabled();
        expect(screen.getByRole("button", { name : "Go to next page" })).toBeEnabled();
        expect(screen.getByRole("button", { name : "Go to last page" })).toBeEnabled();
    });

    it("disables next & last on the last page, enables first & previous", () => {
        render(
            <Pagination totalItems={5} currentPage={5} onPageChange={vi.fn()} itemsToShowEachSide={2} />,
        );
        expect(screen.getByRole("button", { name : "Go to next page" })).toBeDisabled();
        expect(screen.getByRole("button", { name : "Go to last page" })).toBeDisabled();
        expect(screen.getByRole("button", { name : "Go to first page" })).toBeEnabled();
        expect(screen.getByRole("button", { name : "Go to previous page" })).toBeEnabled();
    });

    it("does not fire onPageChange when a disabled edge button is clicked", async () => {
        const onPageChange = vi.fn();
        render(
            <Pagination totalItems={5} currentPage={1} onPageChange={onPageChange} itemsToShowEachSide={2} />,
        );
        await userEvent.click(screen.getByRole("button", { name : "Go to previous page" }));
        expect(onPageChange).not.toHaveBeenCalled();
    });

    it("hideDisabledButtons removes the disabled edge buttons from the DOM", () => {
        render(
            <Pagination
                totalItems={5}
                currentPage={1}
                onPageChange={vi.fn()}
                itemsToShowEachSide={2}
                hideDisabledButtons
            />,
        );
        expect(screen.queryByRole("button", { name : "Go to first page" })).not.toBeInTheDocument();
        expect(screen.queryByRole("button", { name : "Go to previous page" })).not.toBeInTheDocument();
        expect(screen.getByRole("button", { name : "Go to next page" })).toBeInTheDocument();
        expect(screen.getByRole("button", { name : "Go to last page" })).toBeInTheDocument();
    });

    it("disabled prop disables every page button", () => {
        render(
            <Pagination
                totalItems={5}
                currentPage={3}
                onPageChange={vi.fn()}
                itemsToShowEachSide={2}
                disabled
            />,
        );
        getPageButtons().forEach((b) => expect(b).toBeDisabled());
        expect(screen.getByRole("button", { name : "Go to next page" })).toBeDisabled();
    });
});

describe("Pagination — current page marking", () => {
    it("marks the current page with aria-current=page and the selected class", () => {
        render(
            <Pagination totalItems={5} currentPage={3} onPageChange={vi.fn()} itemsToShowEachSide={2} />,
        );
        const current = screen.getByRole("button", { name : "3" });
        expect(current).toHaveAttribute("aria-current", "page");
        expect(current).toHaveClass("selected");
    });

    it("does not mark non-current pages as current", () => {
        render(
            <Pagination totalItems={5} currentPage={3} onPageChange={vi.fn()} itemsToShowEachSide={2} />,
        );
        const other = screen.getByRole("button", { name : "2" });
        expect(other).not.toHaveAttribute("aria-current");
        expect(other).not.toHaveClass("selected");
    });
});

describe("Pagination — a11y", () => {
    it("has no axe violations in a typical multi-page state", async () => {
        const { container } = render(
            <Pagination totalItems={10} currentPage={5} onPageChange={vi.fn()} itemsToShowEachSide={2} />,
        );
        expect(await axe(container)).toHaveNoViolations();
    });
});
