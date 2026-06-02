import { describe, it, expect } from "vitest";
import "../../../../vitest-matchers";
import { render, screen } from "@testing-library/react";
import { axe } from "vitest-axe";

import { FormItemGroup } from "./FormItemGroup";

// FormItemGroup is the fieldset-like wrapper that bundles related form controls.
// Its load-bearing contract is the group id: beta-19 moved id generation from a
// non-deterministic Math.random() to React.useId(), and then strips the colons
// useId emits so the value is a valid, stable, CSS-/selector-safe id. These
// tests pin that derivation (and that an explicit `id` still wins), plus the
// group's role/aria wiring and its conditional recipe classes.

describe("FormItemGroup — rendering & structure", () => {
    it("renders a <div> carrying the data-form-item-group attribute", () => {
        render(
            <FormItemGroup legend="Contact details" data-testid="grp">
                <span>child</span>
            </FormItemGroup>,
        );
        const grp = screen.getByTestId("grp");
        expect(grp.tagName).toBe("DIV");
        expect(grp).toHaveAttribute("data-form-item-group");
    });

    it("emits data-form-spaced (via the inheritFormSpacing prop)", () => {
        // FormItemGroup now passes the semantic `inheritFormSpacing` prop, which
        // Element turns into data-form-spaced — instead of a raw attribute that
        // Element's own data-form-spaced={inheritFormSpacing || undefined} clobbered.
        render(
            <FormItemGroup legend="Contact details" data-testid="grp">
                <span>child</span>
            </FormItemGroup>,
        );
        expect(screen.getByTestId("grp")).toHaveAttribute("data-form-spaced");
    });

    it("renders its children", () => {
        render(
            <FormItemGroup legend="Names">
                <span data-testid="first">First</span>
                <span data-testid="last">Last</span>
            </FormItemGroup>,
        );
        expect(screen.getByTestId("first")).toBeInTheDocument();
        expect(screen.getByTestId("last")).toBeInTheDocument();
    });

    it("exposes role=group and uses `legend` as the accessible name", () => {
        render(
            <FormItemGroup legend="Shipping address" data-testid="grp">
                <span>child</span>
            </FormItemGroup>,
        );
        const grp = screen.getByRole("group", { name : "Shipping address" });
        expect(grp).toBe(screen.getByTestId("grp"));
        expect(grp).toHaveAttribute("aria-label", "Shipping address");
    });
});

describe("FormItemGroup — id derivation (beta-19 useId regression)", () => {
    it("derives a stable, colon-free id from useId when no `id` is passed", () => {
        render(
            <FormItemGroup legend="Generated" data-testid="grp">
                <span>child</span>
            </FormItemGroup>,
        );
        const id = screen.getByTestId("grp").getAttribute("id");
        expect(id).toMatch(/^form-group-/);
        // useId emits colons; FormItemGroup strips them so the id is selector-safe.
        expect(id).not.toContain(":");
    });

    it("keeps the generated id stable across re-renders of the same instance", () => {
        const { rerender } = render(
            <FormItemGroup legend="Stable" data-testid="grp">
                <span>child</span>
            </FormItemGroup>,
        );
        const first = screen.getByTestId("grp").getAttribute("id");

        rerender(
            <FormItemGroup legend="Stable" data-testid="grp">
                <span>changed child</span>
            </FormItemGroup>,
        );
        const second = screen.getByTestId("grp").getAttribute("id");

        expect(second).toBe(first);
    });

    it("honours an explicit `id` prop verbatim", () => {
        render(
            <FormItemGroup id="my-group" legend="Explicit" data-testid="grp">
                <span>child</span>
            </FormItemGroup>,
        );
        expect(screen.getByTestId("grp")).toHaveAttribute("id", "my-group");
    });
});

describe("FormItemGroup — recipe classes", () => {
    it("adds is-joint / equal-width-for-children / retain-layout when set", () => {
        render(
            <FormItemGroup
                legend="Recipes"
                data-testid="grp"
                isJoint
                equalWidthForChildren
                retainLayout
            >
                <span>child</span>
            </FormItemGroup>,
        );
        expect(screen.getByTestId("grp")).toHaveClass(
            "is-joint", "equal-width-for-children", "retain-layout",
        );
    });

    it("adds none of the recipe classes by default", () => {
        render(
            <FormItemGroup legend="Plain" data-testid="grp">
                <span>child</span>
            </FormItemGroup>,
        );
        const grp = screen.getByTestId("grp");
        expect(grp).not.toHaveClass("is-joint");
        expect(grp).not.toHaveClass("equal-width-for-children");
        expect(grp).not.toHaveClass("retain-layout");
        expect(grp).not.toHaveClass("with-columns");
    });
});

describe("FormItemGroup — columns", () => {
    it("adds with-columns and sets grid-template-columns inline", () => {
        render(
            <FormItemGroup legend="Grid" data-testid="grp" columns={3}>
                <span>child</span>
            </FormItemGroup>,
        );
        const grp = screen.getByTestId("grp");
        expect(grp).toHaveClass("with-columns");
        expect(grp).toHaveStyle({ gridTemplateColumns : "repeat(3, 1fr)" });
    });

    it("merges a caller-supplied style with the generated grid template", () => {
        render(
            <FormItemGroup
                legend="Grid"
                data-testid="grp"
                columns={2}
                style={{ marginTop : "8px" }}
            >
                <span>child</span>
            </FormItemGroup>,
        );
        const grp = screen.getByTestId("grp");
        expect(grp).toHaveStyle({ gridTemplateColumns : "repeat(2, 1fr)", marginTop : "8px" });
    });
});

describe("FormItemGroup — a11y", () => {
    it("has no axe violations for a labelled group", async () => {
        const { container } = render(
            <FormItemGroup legend="Account details">
                <label htmlFor="email">Email</label>
                <input id="email" type="email" />
            </FormItemGroup>,
        );
        expect(await axe(container)).toHaveNoViolations();
    });
});
