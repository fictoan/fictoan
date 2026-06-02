import { describe, it, expect } from "vitest";
import "../../../vitest-matchers";
import { render, screen } from "@testing-library/react";
import { axe } from "vitest-axe";

import { Row } from "./Row";

// Row is a layout primitive that resolves its `layout` / `equalisePortions`
// props into a fixed set of class names on the underlying Element, plus a
// `data-row` hook the CSS keys off. These tests pin that class-resolution
// contract — especially the beta-19 rule that `equalisePortions` *implies*
// flexbox (a flex Row is required for equal portions) regardless of the
// `layout` prop. Responsive padding / gutter collapse is driven by @media /
// @container queries and belongs to the browser tier.

const rowOf = (testid = "row") => screen.getByTestId(testid);

describe("Row — base markup", () => {
    it("renders a <div> carrying the data-row hook", () => {
        render(<Row data-testid="row">cells</Row>);
        const row = rowOf();
        expect(row.tagName).toBe("DIV");
        expect(row).toHaveAttribute("data-row");
    });

    it("has no ARIA role by default (a layout primitive, not a data grid)", () => {
        render(<Row data-testid="row">cells</Row>);
        expect(rowOf()).not.toHaveAttribute("role");
    });

    it("exposes role=group only when a groupLabel is provided", () => {
        render(<Row data-testid="row" groupLabel="Pricing tiers">cells</Row>);
        expect(rowOf()).toHaveAttribute("role", "group");
    });

    it("carries Element's default marginBottom='tiny' class", () => {
        render(<Row data-testid="row">cells</Row>);
        expect(rowOf()).toHaveClass("margin-bottom-tiny");
    });
});

describe("Row — layout resolution", () => {
    it("defaults to the grid layout", () => {
        render(<Row data-testid="row">cells</Row>);
        const row = rowOf();
        expect(row).toHaveClass("layout-grid");
        expect(row).not.toHaveClass("layout-flexbox");
        expect(row).not.toHaveClass("equalise-portions");
    });

    it("layout='flexbox' resolves to layout-flexbox (and drops the grid class)", () => {
        render(<Row data-testid="row" layout="flexbox">cells</Row>);
        const row = rowOf();
        expect(row).toHaveClass("layout-flexbox");
        expect(row).not.toHaveClass("layout-grid");
    });

    it("layout='grid' (explicit) resolves to layout-grid", () => {
        render(<Row data-testid="row" layout="grid">cells</Row>);
        const row = rowOf();
        expect(row).toHaveClass("layout-grid");
        expect(row).not.toHaveClass("layout-flexbox");
    });

    it("equalisePortions implies flexbox AND adds equalise-portions", () => {
        render(<Row data-testid="row" equalisePortions>cells</Row>);
        const row = rowOf();
        expect(row).toHaveClass("layout-flexbox", "equalise-portions");
        // equalisePortions forces flex even though `layout` still defaults to grid
        expect(row).not.toHaveClass("layout-grid");
    });

    it("equalisePortions overrides an explicit layout='grid' to flexbox", () => {
        render(<Row data-testid="row" layout="grid" equalisePortions>cells</Row>);
        const row = rowOf();
        expect(row).toHaveClass("layout-flexbox", "equalise-portions");
        expect(row).not.toHaveClass("layout-grid");
    });
});

describe("Row — gutters", () => {
    it("defaults to medium gutters", () => {
        render(<Row data-testid="row">cells</Row>);
        expect(rowOf()).toHaveClass("medium-gutters");
    });

    it("maps a gutter token to the `<token>-gutters` class", () => {
        render(<Row data-testid="row" gutters="large">cells</Row>);
        expect(rowOf()).toHaveClass("large-gutters");
    });

    it("maps gutters='none' to the dedicated no-gutters class", () => {
        render(<Row data-testid="row" gutters="none">cells</Row>);
        const row = rowOf();
        expect(row).toHaveClass("no-gutters");
        expect(row).not.toHaveClass("none-gutters");
    });
});

describe("Row — retain-layout flags", () => {
    it("adds the per-breakpoint retain classes individually", () => {
        render(
            <Row
                data-testid="row"
                retainLayoutOnTabletLandscape
                retainLayoutOnTabletPortrait
                retainLayoutOnMobile
            >
                cells
            </Row>,
        );
        expect(rowOf()).toHaveClass(
            "retain-layout-on-tablet-landscape",
            "retain-layout-on-tablet-portrait",
            "retain-layout-on-mobile",
        );
    });

    it("retainLayoutAlways expands to all three breakpoint classes", () => {
        render(<Row data-testid="row" retainLayoutAlways>cells</Row>);
        expect(rowOf()).toHaveClass(
            "retain-layout-on-tablet-landscape",
            "retain-layout-on-tablet-portrait",
            "retain-layout-on-mobile",
        );
    });
});

describe("Row — assorted flags & labelling", () => {
    it("allowUltraWide adds the allow-ultra-wide class", () => {
        render(<Row data-testid="row" allowUltraWide>cells</Row>);
        expect(rowOf()).toHaveClass("allow-ultra-wide");
    });

    it("groupLabel becomes the aria-label", () => {
        render(<Row data-testid="row" groupLabel="Pricing tiers">cells</Row>);
        expect(rowOf()).toHaveAttribute("aria-label", "Pricing tiers");
    });

    it("omits aria-label when no groupLabel is given", () => {
        render(<Row data-testid="row">cells</Row>);
        expect(rowOf()).not.toHaveAttribute("aria-label");
    });

    it("forwards arbitrary props through to the element", () => {
        render(<Row data-testid="row" id="hero-row">cells</Row>);
        expect(rowOf()).toHaveAttribute("id", "hero-row");
    });
});

describe("Row — a11y", () => {
    // Row no longer claims role="grid", so its normal usage (plain / Portion
    // children) is clean — no aria-required-children, and no grid scaffolding needed.
    it("has no axe violations as a plain layout row", async () => {
        const { container } = render(<Row>Plain content</Row>);
        expect(await axe(container)).toHaveNoViolations();
    });

    it("has no axe violations as a labelled group", async () => {
        const { container } = render(<Row groupLabel="Feature row">Plain content</Row>);
        expect(await axe(container)).toHaveNoViolations();
    });
});
