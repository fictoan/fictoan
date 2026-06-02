// TESTS ===============================================================================================================
import "../../../vitest-matchers";
import { axe } from "vitest-axe";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";

// OTHER ===============================================================================================================
import { Breadcrumbs } from "./Breadcrumbs";

// Breadcrumbs wraps its children in a landmark <nav aria-label="Breadcrumb">
// containing a role="list" <ul>; each child becomes a role="listitem" <li>, with
// the LAST item marked aria-current="page", and a presentational separator is
// injected between items. These tests pin that structural + ARIA contract — the
// beta-19 regression focus is specifically the <nav> + aria-label.

describe("Breadcrumbs — landmark + structure", () => {
    it("renders a <nav> with aria-label=\"Breadcrumb\"", () => {
        render(
            <Breadcrumbs>
                <a href="/">Home</a>
            </Breadcrumbs>,
        );
        const nav = screen.getByRole("navigation", { name: "Breadcrumb" });
        expect(nav.tagName).toBe("NAV");
        expect(nav).toHaveAttribute("aria-label", "Breadcrumb");
    });

    it("renders the children inside a role=\"list\" <ul> wrapper", () => {
        render(
            <Breadcrumbs>
                <a href="/">Home</a>
                <a href="/library">Library</a>
            </Breadcrumbs>,
        );
        const list = screen.getByRole("list");
        expect(list.tagName).toBe("UL");
        expect(list).toHaveAttribute("data-breadcrumbs-wrapper");
        // The default spacing prop ("micro") becomes a class on the wrapper.
        expect(list).toHaveClass("spacing-micro");
    });

    it("wraps each child in a role=\"listitem\" <li> with the breadcrumb-content span", () => {
        render(
            <Breadcrumbs>
                <a href="/">Home</a>
                <a href="/library">Library</a>
                <a href="/library/data">Data</a>
            </Breadcrumbs>,
        );
        const items = screen.getAllByRole("listitem");
        expect(items).toHaveLength(3);
        items.forEach((item) => {
            expect(item.tagName).toBe("LI");
            expect(item).toHaveAttribute("data-breadcrumb-item");
            expect(item.querySelector(".breadcrumb-content")).not.toBeNull();
        });
    });

    it("renders the actual child content (links survive into the markup)", () => {
        render(
            <Breadcrumbs>
                <a href="/">Home</a>
                <a href="/library">Library</a>
            </Breadcrumbs>,
        );
        expect(screen.getByRole("link", { name: "Home" })).toHaveAttribute("href", "/");
        expect(screen.getByRole("link", { name: "Library" })).toHaveAttribute("href", "/library");
    });
});

describe("Breadcrumbs — current page", () => {
    it("marks ONLY the last item with aria-current=\"page\" and the `current` class", () => {
        render(
            <Breadcrumbs>
                <a href="/">Home</a>
                <a href="/library">Library</a>
                <a href="/library/data">Data</a>
            </Breadcrumbs>,
        );
        const items = screen.getAllByRole("listitem");
        expect(items[0]).not.toHaveAttribute("aria-current");
        expect(items[1]).not.toHaveAttribute("aria-current");
        expect(items[2]).toHaveAttribute("aria-current", "page");
        expect(items[2]).toHaveClass("current");
        expect(items[0]).not.toHaveClass("current");
    });

    it("a single child is itself the current page", () => {
        render(
            <Breadcrumbs>
                <a href="/">Home</a>
            </Breadcrumbs>,
        );
        const item = screen.getByRole("listitem");
        expect(item).toHaveAttribute("aria-current", "page");
        expect(item).toHaveClass("current");
    });
});

describe("Breadcrumbs — separators", () => {
    it("injects N-1 presentational separators between N items, defaulting to \"/\"", () => {
        const { container } = render(
            <Breadcrumbs>
                <a href="/">Home</a>
                <a href="/library">Library</a>
                <a href="/library/data">Data</a>
            </Breadcrumbs>,
        );
        const separators = container.querySelectorAll(".breadcrumb-separator");
        expect(separators).toHaveLength(2);
        separators.forEach((sep) => {
            expect(sep).toHaveAttribute("aria-hidden", "true");
            expect(sep).toHaveAttribute("role", "presentation");
            expect(sep).toHaveTextContent("/");
        });
    });

    it("honours a custom `separator` string", () => {
        const { container } = render(
            <Breadcrumbs separator=">">
                <a href="/">Home</a>
                <a href="/library">Library</a>
            </Breadcrumbs>,
        );
        const separators = container.querySelectorAll(".breadcrumb-separator");
        expect(separators).toHaveLength(1);
        expect(separators[0]).toHaveTextContent(">");
    });

    it("renders no separator for a single child", () => {
        const { container } = render(
            <Breadcrumbs>
                <a href="/">Home</a>
            </Breadcrumbs>,
        );
        expect(container.querySelectorAll(".breadcrumb-separator")).toHaveLength(0);
    });
});

describe("Breadcrumbs — spacing prop", () => {
    it("applies the requested spacing token as a class on the wrapper", () => {
        render(
            <Breadcrumbs spacing="large">
                <a href="/">Home</a>
                <a href="/library">Library</a>
            </Breadcrumbs>,
        );
        expect(screen.getByRole("list")).toHaveClass("spacing-large");
    });
});

describe("Breadcrumbs — children handling", () => {
    it("filters out falsy children before processing", () => {
        render(
            <Breadcrumbs>
                <a href="/">Home</a>
                {false}
                {null}
                <a href="/library">Library</a>
            </Breadcrumbs>,
        );
        // Only the two real anchors should become list items.
        expect(screen.getAllByRole("listitem")).toHaveLength(2);
    });
});

describe("Breadcrumbs — a11y", () => {
    it("has no axe violations for a typical breadcrumb trail", async () => {
        const { container } = render(
            <Breadcrumbs>
                <a href="/">Home</a>
                <a href="/library">Library</a>
                <a href="/library/data">Data</a>
            </Breadcrumbs>,
        );
        expect(await axe(container)).toHaveNoViolations();
    });
});
