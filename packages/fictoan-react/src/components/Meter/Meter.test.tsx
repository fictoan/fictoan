// TESTS ===============================================================================================================
import "../../../vitest-matchers";
import { axe } from "vitest-axe";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";

// OTHER ===============================================================================================================
import { Meter } from "./Meter";

// Meter renders a native <meter>. The a11y sweep removed two kinds of redundant
// ARIA: (1) the outer wrapper no longer claims role="region" (a meter is not a
// landmark, and the native <meter> already exposes its own role), and
// (2) aria-valuemin / aria-valuemax / aria-valuenow are gone because the native
// value/min/max attributes convey them. What stays is the accessible name
// (aria-label) and a descriptive aria-valuetext. These tests pin that contract.

const getMeter = () => screen.getByTestId("m").querySelector("[data-meter]") as HTMLMeterElement;

const baseProps = { min : 0, max : 100, low : 20, high : 80, value : 50 } as const;

describe("Meter — native semantics", () => {
    it("renders a native <meter> element", () => {
        render(<div data-testid="m"><Meter {...baseProps} /></div>);
        expect(getMeter().tagName).toBe("METER");
    });

    it("sets the native value / min / max / low / high attributes", () => {
        render(<div data-testid="m"><Meter {...baseProps} optimum={90} /></div>);
        const meter = getMeter();
        expect(meter).toHaveAttribute("value", "50");
        expect(meter).toHaveAttribute("min", "0");
        expect(meter).toHaveAttribute("max", "100");
        expect(meter).toHaveAttribute("low", "20");
        expect(meter).toHaveAttribute("high", "80");
        expect(meter).toHaveAttribute("optimum", "90");
    });

    it("carries the data-meter marker attribute", () => {
        render(<div data-testid="m"><Meter {...baseProps} /></div>);
        expect(getMeter()).toHaveAttribute("data-meter");
    });

    it("writes the height inline style on the meter", () => {
        render(<div data-testid="m"><Meter {...baseProps} height="12px" /></div>);
        expect(getMeter().style.height).toBe("12px");
    });
});

describe("Meter — no role=region wrapper (redundant landmark removed)", () => {
    it("does NOT render any role=region element", () => {
        const { container } = render(<Meter {...baseProps} label="Disk" />);
        expect(container.querySelector("[role='region']")).toBeNull();
        expect(screen.queryByRole("region")).toBeNull();
    });

    it("uses role=presentation on the inner meter-wrapper, not a landmark", () => {
        render(<div data-testid="m"><Meter {...baseProps} /></div>);
        const wrapper = screen.getByTestId("m").querySelector(".meter-wrapper") as HTMLElement;
        expect(wrapper).not.toBeNull();
        expect(wrapper).toHaveAttribute("role", "presentation");
    });
});

describe("Meter — ARIA contract (redundant ARIA removed)", () => {
    it("keeps aria-label from the label prop", () => {
        render(<div data-testid="m"><Meter {...baseProps} label="Disk usage" /></div>);
        expect(getMeter()).toHaveAttribute("aria-label", "Disk usage");
    });

    it("falls back to ariaLabel, then to a default name, when there is no label", () => {
        render(<div data-testid="a"><Meter {...baseProps} ariaLabel="Battery" /></div>);
        expect(screen.getByTestId("a").querySelector("[data-meter]")).toHaveAttribute("aria-label", "Battery");

        render(<div data-testid="b"><Meter {...baseProps} /></div>);
        expect(screen.getByTestId("b").querySelector("[data-meter]")).toHaveAttribute("aria-label", "Progress meter");
    });

    it("keeps a descriptive aria-valuetext with value, percentage and status", () => {
        render(<div data-testid="m"><Meter {...baseProps} value={50} suffix="%" /></div>);
        // (50 - 0) / (100 - 0) * 100 = 50.0%, between low(20) and high(80) => Normal
        expect(getMeter()).toHaveAttribute(
            "aria-valuetext",
            "Current value is 50% (50.0%). Status: Normal",
        );
    });

    it("reports Low status when value <= low", () => {
        render(<div data-testid="m"><Meter {...baseProps} value={10} /></div>);
        expect(getMeter().getAttribute("aria-valuetext")).toContain("Status: Low");
    });

    it("reports High status when value >= high", () => {
        render(<div data-testid="m"><Meter {...baseProps} value={90} /></div>);
        expect(getMeter().getAttribute("aria-valuetext")).toContain("Status: High");
    });

    it("does NOT set the redundant aria-valuemin / aria-valuemax / aria-valuenow", () => {
        render(<div data-testid="m"><Meter {...baseProps} label="Disk" /></div>);
        const meter = getMeter();
        expect(meter).not.toHaveAttribute("aria-valuemin");
        expect(meter).not.toHaveAttribute("aria-valuemax");
        expect(meter).not.toHaveAttribute("aria-valuenow");
    });
});

describe("Meter — label meta block", () => {
    it("renders the meta block with a slugified id when label is set", () => {
        render(<div data-testid="m"><Meter {...baseProps} label="Disk Usage" value={50} suffix="%" /></div>);
        const meta = screen.getByTestId("m").querySelector("[data-meter-meta]") as HTMLElement;
        expect(meta).not.toBeNull();
        expect(meta).toHaveAttribute("id", "meter-label-disk-usage");
        expect(meta).toHaveTextContent("Disk Usage");
        expect(meta).toHaveTextContent("50%");
    });

    it("renders no meta block when label is absent", () => {
        render(<div data-testid="m"><Meter {...baseProps} /></div>);
        expect(screen.getByTestId("m").querySelector("[data-meter-meta]")).toBeNull();
    });
});

describe("Meter — description wiring", () => {
    it("wires aria-describedby to the sr-only description node by id", () => {
        render(
            <div data-testid="m">
                <Meter {...baseProps} label="Disk Usage" description="Almost full" />
            </div>,
        );
        const meter = getMeter();
        const describedById = meter.getAttribute("aria-describedby");
        expect(describedById).toBe("meter-description-disk-usage");

        const descNode = screen.getByTestId("m").querySelector(`#${describedById}`) as HTMLElement;
        expect(descNode).not.toBeNull();
        expect(descNode).toHaveClass("sr-only");
        expect(descNode).toHaveTextContent("Almost full");
    });

    it("does not set aria-describedby when no description is given", () => {
        render(<div data-testid="m"><Meter {...baseProps} label="Disk" /></div>);
        expect(getMeter()).not.toHaveAttribute("aria-describedby");
    });
});

describe("Meter — optimum marker", () => {
    it("renders an aria-hidden presentation marker when showOptimumMarker + optimum are set", () => {
        render(
            <div data-testid="m">
                <Meter {...baseProps} optimum={90} showOptimumMarker />
            </div>,
        );
        const marker = screen.getByTestId("m").querySelector(".optimum-marker") as HTMLElement;
        expect(marker).not.toBeNull();
        expect(marker).toHaveAttribute("aria-hidden", "true");
        expect(marker).toHaveAttribute("role", "presentation");
        expect(marker).toHaveAttribute("title", "Optimum: 90");
    });

    it("renders no marker when showOptimumMarker is absent", () => {
        render(<div data-testid="m"><Meter {...baseProps} optimum={90} /></div>);
        expect(screen.getByTestId("m").querySelector(".optimum-marker")).toBeNull();
    });
});

describe("Meter — a11y", () => {
    it("has no axe violations with a label, value and description", async () => {
        const { container } = render(
            <Meter min={0} max={100} low={20} high={80} value={65} label="Disk usage" suffix="%" description="System drive" />,
        );
        expect(await axe(container)).toHaveNoViolations();
    });
});
