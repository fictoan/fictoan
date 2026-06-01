import { describe, it, expect } from "vitest";
import "../../../vitest-matchers";
import { render, screen } from "@testing-library/react";
import { axe } from "vitest-axe";

import { Skeleton, SkeletonGroup } from "./Skeleton";

// Skeleton + SkeletonGroup are presentational wrappers over Element. Skeleton
// maps `variant`/`shape`/`effect` to classes and `width`/`height` to inline
// styles, and exposes a `progressbar` ARIA contract; SkeletonGroup provides the
// shared effect/label via context and repeats its child. These tests pin that
// emitted markup contract.

describe("Skeleton — rendering", () => {
    it("renders a <div> with the data-skeleton marker", () => {
        render(<Skeleton data-testid="sk" />);
        const el = screen.getByTestId("sk");
        expect(el.tagName).toBe("DIV");
        expect(el).toHaveAttribute("data-skeleton");
    });

    it("defaults to variant-line and effect-wave", () => {
        render(<Skeleton data-testid="sk" />);
        const el = screen.getByTestId("sk");
        expect(el).toHaveClass("variant-line", "effect-wave");
    });

    it("maps each `variant` to a variant-* class", () => {
        const variants = ["line", "circle", "block"] as const;
        variants.forEach((variant) => {
            render(<Skeleton data-testid={`sk-${variant}`} variant={variant} />);
            expect(screen.getByTestId(`sk-${variant}`)).toHaveClass(`variant-${variant}`);
        });
    });

    it("maps `shape` to a shape-* class", () => {
        render(<Skeleton data-testid="rounded" shape="rounded" />);
        expect(screen.getByTestId("rounded")).toHaveClass("shape-rounded");

        render(<Skeleton data-testid="curved" shape="curved" />);
        expect(screen.getByTestId("curved")).toHaveClass("shape-curved");
    });

    it("maps each `effect` to an effect-* class", () => {
        render(<Skeleton data-testid="pulse" effect="pulse" />);
        expect(screen.getByTestId("pulse")).toHaveClass("effect-pulse");

        render(<Skeleton data-testid="none" effect="none" />);
        expect(screen.getByTestId("none")).toHaveClass("effect-none");
    });
});

describe("Skeleton — dimensions", () => {
    it("defaults width to 100% and aspect-ratio to auto for a line", () => {
        render(<Skeleton data-testid="sk" />);
        const el = screen.getByTestId("sk");
        expect(el.style.width).toBe("100%");
        expect(el.style.aspectRatio).toBe("auto");
    });

    it("applies explicit width and height", () => {
        render(<Skeleton data-testid="sk" width="240px" height="16px" />);
        const el = screen.getByTestId("sk");
        expect(el.style.width).toBe("240px");
        expect(el.style.height).toBe("16px");
    });

    it("forces a 1/1 aspect ratio for the circle variant and squares it from width", () => {
        render(<Skeleton data-testid="sk" variant="circle" width="48px" />);
        const el = screen.getByTestId("sk");
        expect(el.style.aspectRatio).toBe("1 / 1");
        expect(el.style.width).toBe("48px");
        expect(el.style.height).toBe("48px");
    });

    it("converts a numeric circle width into a px height", () => {
        render(<Skeleton data-testid="sk" variant="circle" width={64} />);
        const el = screen.getByTestId("sk");
        expect(el.style.height).toBe("64px");
    });
});

describe("Skeleton — ARIA contract", () => {
    it("exposes a busy progressbar with a 0-100 range", () => {
        render(<Skeleton data-testid="sk" />);
        const el = screen.getByTestId("sk");
        expect(el).toHaveAttribute("role", "progressbar");
        expect(el).toHaveAttribute("aria-busy", "true");
        expect(el).toHaveAttribute("aria-valuemin", "0");
        expect(el).toHaveAttribute("aria-valuemax", "100");
    });

    it("uses the default loading label as name and valuetext", () => {
        render(<Skeleton data-testid="sk" />);
        const el = screen.getByTestId("sk");
        expect(el).toHaveAttribute("aria-label", "Loading...");
        expect(el).toHaveAttribute("aria-valuetext", "Loading...");
    });

    it("honours a custom `loadingLabel`", () => {
        render(<Skeleton data-testid="sk" loadingLabel="Loading avatar" />);
        const el = screen.getByTestId("sk");
        expect(el).toHaveAttribute("aria-label", "Loading avatar");
        expect(el).toHaveAttribute("aria-valuetext", "Loading avatar");
    });
});

describe("SkeletonGroup — rendering", () => {
    it("renders a <div> with the data-skeleton-group marker", () => {
        render(
            <SkeletonGroup data-testid="grp">
                <Skeleton />
            </SkeletonGroup>,
        );
        const el = screen.getByTestId("grp");
        expect(el.tagName).toBe("DIV");
        expect(el).toHaveAttribute("data-skeleton-group");
    });

    it("emits the direction, effect and spacing classes (defaults)", () => {
        render(
            <SkeletonGroup data-testid="grp">
                <Skeleton />
            </SkeletonGroup>,
        );
        expect(screen.getByTestId("grp")).toHaveClass(
            "direction-vertical", "effect-wave", "spacing-small",
        );
    });

    it("honours direction and spacing overrides", () => {
        render(
            <SkeletonGroup data-testid="grp" direction="horizontal" spacing="large">
                <Skeleton />
            </SkeletonGroup>,
        );
        expect(screen.getByTestId("grp")).toHaveClass("direction-horizontal", "spacing-large");
    });

    it("exposes a busy status region named by loadingLabel", () => {
        render(
            <SkeletonGroup data-testid="grp">
                <Skeleton />
            </SkeletonGroup>,
        );
        const el = screen.getByTestId("grp");
        expect(el).toHaveAttribute("role", "status");
        expect(el).toHaveAttribute("aria-busy", "true");
        expect(el).toHaveAttribute("aria-label", "Loading content...");
    });

    it("repeats the child `repeat` times", () => {
        render(
            <SkeletonGroup data-testid="grp" repeat={3}>
                <Skeleton data-testid="child" />
            </SkeletonGroup>,
        );
        expect(screen.getAllByTestId("child")).toHaveLength(3);
    });

    it("propagates its effect to children via context", () => {
        render(
            <SkeletonGroup data-testid="grp" effect="pulse">
                <Skeleton data-testid="child" />
            </SkeletonGroup>,
        );
        // Child has no local effect, so it inherits the group's via context.
        expect(screen.getByTestId("child")).toHaveClass("effect-pulse");
    });

    it("lets a child's local effect override the group context", () => {
        render(
            <SkeletonGroup data-testid="grp" effect="pulse">
                <Skeleton data-testid="child" effect="none" />
            </SkeletonGroup>,
        );
        expect(screen.getByTestId("child")).toHaveClass("effect-none");
        expect(screen.getByTestId("child")).not.toHaveClass("effect-pulse");
    });
});

describe("Skeleton — a11y", () => {
    it("has no axe violations for a single skeleton", async () => {
        const { container } = render(<Skeleton loadingLabel="Loading profile" width="200px" height="20px" />);
        expect(await axe(container)).toHaveNoViolations();
    });

    it("has no axe violations for a skeleton group", async () => {
        const { container } = render(
            <SkeletonGroup repeat={3} loadingLabel="Loading list">
                <Skeleton />
            </SkeletonGroup>,
        );
        expect(await axe(container)).toHaveNoViolations();
    });
});
