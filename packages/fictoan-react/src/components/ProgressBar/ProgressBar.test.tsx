// TESTS ===============================================================================================================
import "../../../vitest-matchers";
import { axe } from "vitest-axe";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";

// OTHER ===============================================================================================================
import { ProgressBar } from "./ProgressBar";

// ProgressBar renders a native <progress>. The a11y sweep deliberately stripped
// the redundant ARIA that duplicated the native progressbar role's value
// semantics: aria-valuemin / aria-valuemax / aria-valuenow are NOT set, because
// the value/max attributes on <progress> already convey them. What stays is the
// accessible name (aria-label) and a human-readable aria-valuetext. These tests
// pin that contract so a future refactor can't silently re-add the redundancy.

const getProgress = () => screen.getByTestId("pb").querySelector("[data-progress-bar]") as HTMLProgressElement;

describe("ProgressBar — native semantics", () => {
    it("renders a native <progress> element", () => {
        render(<div data-testid="pb"><ProgressBar value={40} /></div>);
        const progress = getProgress();
        expect(progress.tagName).toBe("PROGRESS");
    });

    it("sets the native value and max attributes", () => {
        render(<div data-testid="pb"><ProgressBar value={40} max={200} /></div>);
        const progress = getProgress();
        expect(progress).toHaveAttribute("value", "40");
        expect(progress).toHaveAttribute("max", "200");
    });

    it("defaults max to 100", () => {
        render(<div data-testid="pb"><ProgressBar value={40} /></div>);
        expect(getProgress()).toHaveAttribute("max", "100");
    });

    it("clamps the value to the [0, max] range", () => {
        render(<div data-testid="lo"><ProgressBar value={-50} /></div>);
        expect(screen.getByTestId("lo").querySelector("[data-progress-bar]")).toHaveAttribute("value", "0");

        render(<div data-testid="hi"><ProgressBar value={500} max={100} /></div>);
        expect(screen.getByTestId("hi").querySelector("[data-progress-bar]")).toHaveAttribute("value", "100");
    });

    it("coerces a missing/NaN value to 0", () => {
        render(<div data-testid="pb"><ProgressBar /></div>);
        expect(getProgress()).toHaveAttribute("value", "0");
    });

    it("carries the data-progress-bar marker attribute", () => {
        render(<div data-testid="pb"><ProgressBar value={40} /></div>);
        expect(getProgress()).toHaveAttribute("data-progress-bar");
    });
});

describe("ProgressBar — ARIA contract (redundant ARIA removed)", () => {
    it("keeps aria-label from the label prop", () => {
        render(<div data-testid="pb"><ProgressBar label="Upload" value={40} /></div>);
        expect(getProgress()).toHaveAttribute("aria-label", "Upload");
    });

    it("keeps aria-valuetext (label + value + suffix)", () => {
        render(<div data-testid="pb"><ProgressBar label="Upload" value={40} suffix="%" /></div>);
        expect(getProgress()).toHaveAttribute("aria-valuetext", "Upload: 40%");
    });

    it("aria-valuetext omits the label prefix when there is no label", () => {
        render(<div data-testid="pb"><ProgressBar value={40} suffix="%" /></div>);
        expect(getProgress()).toHaveAttribute("aria-valuetext", "40%");
    });

    it("does NOT set the redundant aria-valuemin / aria-valuemax / aria-valuenow", () => {
        render(<div data-testid="pb"><ProgressBar label="Upload" value={40} max={100} /></div>);
        const progress = getProgress();
        expect(progress).not.toHaveAttribute("aria-valuemin");
        expect(progress).not.toHaveAttribute("aria-valuemax");
        expect(progress).not.toHaveAttribute("aria-valuenow");
    });
});

describe("ProgressBar — label meta block", () => {
    it("renders the aria-hidden meta block with label and value text when label is set", () => {
        render(<div data-testid="pb"><ProgressBar label="Upload" value={40} suffix="%" /></div>);
        const meta = screen.getByTestId("pb").querySelector("[data-progress-bar-meta]") as HTMLElement;
        expect(meta).not.toBeNull();
        expect(meta).toHaveAttribute("aria-hidden", "true");
        expect(meta).toHaveTextContent("Upload");
        expect(meta).toHaveTextContent("40%");
    });

    it("renders no meta block when label is absent", () => {
        render(<div data-testid="pb"><ProgressBar value={40} /></div>);
        expect(screen.getByTestId("pb").querySelector("[data-progress-bar-meta]")).toBeNull();
    });
});

describe("ProgressBar — styling props", () => {
    it("maps shape to the shape-* class", () => {
        render(<div data-testid="pb"><ProgressBar value={40} shape="rounded" /></div>);
        expect(getProgress()).toHaveClass("shape-rounded");
    });

    it("writes height and the colour custom properties (UK spelling preferred)", () => {
        render(
            <div data-testid="pb">
                <ProgressBar value={40} height="16px" bgColour="slate" fillColour="green" />
            </div>,
        );
        const progress = getProgress();
        expect(progress.style.height).toBe("16px");
        expect(progress.style.getPropertyValue("--progress-bar-bg")).toBe("var(--slate)");
        expect(progress.style.getPropertyValue("--progress-bar-fill")).toBe("var(--green)");
    });

    it("falls back to US spelling for the colour custom properties", () => {
        render(
            <div data-testid="pb">
                <ProgressBar value={40} bgColor="slate" fillColor="green" />
            </div>,
        );
        const progress = getProgress();
        expect(progress.style.getPropertyValue("--progress-bar-bg")).toBe("var(--slate)");
        expect(progress.style.getPropertyValue("--progress-bar-fill")).toBe("var(--green)");
    });
});

describe("ProgressBar — a11y", () => {
    it("has no axe violations with a label and value", async () => {
        const { container } = render(<ProgressBar label="File upload" value={60} suffix="%" />);
        expect(await axe(container)).toHaveNoViolations();
    });
});
