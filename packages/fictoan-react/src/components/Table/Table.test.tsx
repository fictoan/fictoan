import { describe, it, expect } from "vitest";
import "../../../vitest-matchers";
import { render, screen } from "@testing-library/react";
import { axe } from "vitest-axe";

import { Table } from "./Table";

// Table is a thin, COMPOSABLE wrapper over Element<table>: the consumer passes
// real <thead>/<tbody>/<tr>/<th>/<td> children, and Table only layers on the
// recipe classes (borders / striping / hover / alignment / full-width), an
// optional <caption>, a deprecated `summary` passthrough, and a pair of
// aria-rowcount / aria-colcount counters derived from the child tree. These
// tests pin that public output. NOTE: the aria-*count derivation counts DIRECT
// children, not <tr>/<th>, so the emitted numbers are structural, not semantic
// — see findings. The tests below assert the CURRENT actual values.

// A small, realistic, accessibly-named table used across the cases below.
const SampleTable = (props: React.ComponentProps<typeof Table>) => (
    <Table {...props}>
        <thead>
            <tr>
                <th scope="col">Name</th>
                <th scope="col">Role</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>Ada</td>
                <td>Engineer</td>
            </tr>
            <tr>
                <td>Linus</td>
                <td>Maintainer</td>
            </tr>
        </tbody>
    </Table>
);

describe("Table — rendering", () => {
    it("renders a real <table> element carrying role=table", () => {
        render(<SampleTable data-testid="tbl" />);
        const table = screen.getByTestId("tbl");
        expect(table.tagName).toBe("TABLE");
        expect(table).toHaveAttribute("role", "table");
    });

    it("renders the composed head/body/row/cell children verbatim", () => {
        render(<SampleTable data-testid="tbl" />);
        const table = screen.getByTestId("tbl");

        // header cells exist with their accessible names
        expect(screen.getByRole("columnheader", { name: "Name" })).toBeInTheDocument();
        expect(screen.getByRole("columnheader", { name: "Role" })).toBeInTheDocument();

        // body data cells render the passed text
        expect(screen.getByRole("cell", { name: "Ada" })).toBeInTheDocument();
        expect(screen.getByRole("cell", { name: "Maintainer" })).toBeInTheDocument();

        // structure: one thead + one tbody as the direct element children
        expect(table.querySelectorAll("thead")).toHaveLength(1);
        expect(table.querySelectorAll("tbody")).toHaveLength(1);
        expect(table.querySelectorAll("tbody tr")).toHaveLength(2);
    });

    it("adds no recipe classes when no recipe props are passed", () => {
        render(<SampleTable data-testid="tbl" />);
        const table = screen.getByTestId("tbl");
        expect(table.className).not.toMatch(
            /bordered-|striped|hoverable|full-width|align-text-/,
        );
    });
});

describe("Table — recipe prop classes", () => {
    it("bordersFor=rows | columns | both -> bordered-<value>", () => {
        render(<SampleTable data-testid="rows" bordersFor="rows" />);
        expect(screen.getByTestId("rows")).toHaveClass("bordered-rows");

        render(<SampleTable data-testid="cols" bordersFor="columns" />);
        expect(screen.getByTestId("cols")).toHaveClass("bordered-columns");

        render(<SampleTable data-testid="both" bordersFor="both" />);
        expect(screen.getByTestId("both")).toHaveClass("bordered-both");
    });

    it("isStriped adds `striped`", () => {
        render(<SampleTable data-testid="tbl" isStriped />);
        expect(screen.getByTestId("tbl")).toHaveClass("striped");
    });

    it("highlightRowOnHover adds `hoverable`", () => {
        render(<SampleTable data-testid="tbl" highlightRowOnHover />);
        expect(screen.getByTestId("tbl")).toHaveClass("hoverable");
    });

    it("isFullWidth adds `full-width`", () => {
        render(<SampleTable data-testid="tbl" isFullWidth />);
        expect(screen.getByTestId("tbl")).toHaveClass("full-width");
    });

    it("alignText -> align-text-<value> (centre / center both pass through verbatim)", () => {
        render(<SampleTable data-testid="left" alignText="left" />);
        expect(screen.getByTestId("left")).toHaveClass("align-text-left");

        render(<SampleTable data-testid="right" alignText="right" />);
        expect(screen.getByTestId("right")).toHaveClass("align-text-right");

        render(<SampleTable data-testid="centre" alignText="centre" />);
        expect(screen.getByTestId("centre")).toHaveClass("align-text-centre");

        render(<SampleTable data-testid="center" alignText="center" />);
        expect(screen.getByTestId("center")).toHaveClass("align-text-center");
    });

    it("stacks multiple recipe classes together", () => {
        render(
            <SampleTable
                data-testid="tbl"
                bordersFor="both"
                isStriped
                highlightRowOnHover
                isFullWidth
                alignText="right"
            />,
        );
        expect(screen.getByTestId("tbl")).toHaveClass(
            "bordered-both",
            "striped",
            "hoverable",
            "full-width",
            "align-text-right",
        );
    });
});

describe("Table — caption", () => {
    it("renders a <caption> as the first child when `caption` is provided", () => {
        render(<SampleTable data-testid="tbl" caption="Team roster" />);
        const table = screen.getByTestId("tbl");
        const caption = table.querySelector("caption");
        expect(caption).not.toBeNull();
        expect(caption).toHaveTextContent("Team roster");
        // <caption> must be the first child of the table per HTML rules
        expect(table.firstElementChild?.tagName).toBe("CAPTION");
    });

    it("omits <caption> entirely when no caption prop is given", () => {
        render(<SampleTable data-testid="tbl" />);
        expect(screen.getByTestId("tbl").querySelector("caption")).toBeNull();
    });
});

describe("Table — derived aria counts (structural, current behaviour)", () => {
    it("aria-rowcount counts DIRECT children (thead + tbody = 2 here, not the row count)", () => {
        render(<SampleTable data-testid="tbl" />);
        // CHARACTERISATION: rowCount = React.Children.count(children) = 2
        // (the <thead> and the <tbody>), NOT the four <tr>. See findings.
        expect(screen.getByTestId("tbl")).toHaveAttribute("aria-rowcount", "2");
    });

    it("aria-colcount is ABSENT for a normal multi-section table", () => {
        render(<SampleTable data-testid="tbl" />);
        // CHARACTERISATION: getColumnCount() bails on its very first guard —
        // `!React.isValidElement(children)` is true because `children` is an
        // ARRAY (<thead> + <tbody>), so it returns undefined and the attribute
        // is never emitted. The colcount feature is effectively dead for any
        // table with more than one top-level child. See findings.
        expect(screen.getByTestId("tbl")).not.toHaveAttribute("aria-colcount");
    });

    it("aria-colcount IS derived when there is exactly one top-level child", () => {
        // A <colgroup> is a valid single direct child of <table>; its three
        // <col> children let us exercise the guard's happy path without an
        // invalid <tr>-under-<table> nesting warning.
        render(
            <Table data-testid="tbl">
                <colgroup>
                    <col />
                    <col />
                    <col />
                </colgroup>
            </Table>,
        );
        // CHARACTERISATION: with a single direct child, the guard passes and
        // the count becomes the number of that child's children — 3 here.
        expect(screen.getByTestId("tbl")).toHaveAttribute("aria-colcount", "3");
    });

    it("hasColSpan suppresses aria-colcount", () => {
        render(<SampleTable data-testid="tbl" hasColSpan />);
        const table = screen.getByTestId("tbl");
        expect(table).not.toHaveAttribute("aria-colcount");
        // aria-rowcount is still emitted
        expect(table).toHaveAttribute("aria-rowcount", "2");
    });

    it("omits both aria counts when there are no children", () => {
        render(<Table data-testid="tbl" />);
        const table = screen.getByTestId("tbl");
        // rowCount === 0 -> `0 || undefined` -> attribute absent
        expect(table).not.toHaveAttribute("aria-rowcount");
        expect(table).not.toHaveAttribute("aria-colcount");
    });
});

describe("Table — passthrough props", () => {
    it("passes the deprecated `summary` attribute straight onto the <table>", () => {
        render(<SampleTable data-testid="tbl" summary="Members and their roles" />);
        // CHARACTERISATION: `summary` is a deprecated/obsolete HTML attribute,
        // but Table forwards it to the DOM table as-is. See findings.
        expect(screen.getByTestId("tbl")).toHaveAttribute("summary", "Members and their roles");
    });

    it("forwards arbitrary HTML attributes (id, className) through Element", () => {
        render(<SampleTable data-testid="tbl" id="roster" className="custom-table" />);
        const table = screen.getByTestId("tbl");
        expect(table).toHaveAttribute("id", "roster");
        expect(table).toHaveClass("custom-table");
    });

    it("forwards a ref to the underlying <table> element", () => {
        const ref = { current: null as HTMLTableElement | null };
        render(<SampleTable ref={ref} />);
        expect(ref.current).not.toBeNull();
        expect(ref.current?.tagName).toBe("TABLE");
    });
});

describe("Table — a11y", () => {
    it("has no axe violations for a captioned, header-bearing table", async () => {
        const { container } = render(
            <Table caption="Team roster">
                <thead>
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Role</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Ada</td>
                        <td>Engineer</td>
                    </tr>
                    <tr>
                        <td>Linus</td>
                        <td>Maintainer</td>
                    </tr>
                </tbody>
            </Table>,
        );
        expect(await axe(container)).toHaveNoViolations();
    });
});
