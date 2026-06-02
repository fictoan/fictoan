// TESTS ===============================================================================================================
import "../../../vitest-matchers";
import userEvent from "@testing-library/user-event";
import { axe } from "vitest-axe";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";

// OTHER ===============================================================================================================
import { Accordion } from "./Accordion";

// Accordion is a thin wrapper over the native <details>/<summary> disclosure
// widget: it renders `as="details"`, tags the element with
// `data-expandable-content`, drops `summary` into a <summary> and the children
// after it, and reflects the `isOpen` prop onto the native `open` attribute.
// These tests pin that markup contract plus the open/close interaction. Note
// that native <details> does NOT expose aria-expanded / role on the summary —
// the disclosure semantics are implicit — so we observe state via `.open`.

describe("Accordion — rendering", () => {
    it("renders a <details> tagged as expandable content", () => {
        const {container} = render(
            <Accordion summary="Heading">Body content</Accordion>,
        );
        const details = container.querySelector("details");
        expect(details).not.toBeNull();
        expect(details).toHaveAttribute("data-expandable-content", "true");
    });

    it("wraps a string summary in a <summary> with a margin-less <Text>", () => {
        const {container} = render(
            <Accordion summary="My summary">Body content</Accordion>,
        );
        const summary = container.querySelector("summary");
        expect(summary).not.toBeNull();
        // string summary is wrapped by <Text margin="none"> -> a <p class="margin-all-none">
        const text = summary!.querySelector("p");
        expect(text).not.toBeNull();
        expect(text).toHaveClass("margin-all-none");
        expect(text).toHaveTextContent("My summary");
    });

    it("renders a ReactNode summary verbatim (not wrapped in <Text>)", () => {
        const {container} = render(
            <Accordion summary={<span data-testid="custom-summary">Custom</span>}>
                Body content
            </Accordion>,
        );
        const summary = container.querySelector("summary");
        expect(summary).not.toBeNull();
        // non-string summary is rendered as-is, with no wrapping <p>
        expect(summary!.querySelector("p")).toBeNull();
        expect(screen.getByTestId("custom-summary")).toHaveTextContent("Custom");
    });

    it("renders the children as the disclosure body", () => {
        render(
            <Accordion summary="Heading">
                <span data-testid="body">Hidden body</span>
            </Accordion>,
        );
        // children are always present in the DOM (native <details> hides them via CSS)
        expect(screen.getByTestId("body")).toHaveTextContent("Hidden body");
    });

    it("forwards arbitrary props (id, className) through Element", () => {
        const {container} = render(
            <Accordion summary="Heading" id="faq-1" className="custom-accordion">
                Body
            </Accordion>,
        );
        const details = container.querySelector("details");
        expect(details).toHaveAttribute("id", "faq-1");
        expect(details).toHaveClass("custom-accordion");
    });
});

describe("Accordion — open / closed state", () => {
    it("is closed by default (isOpen defaults to false)", () => {
        const {container} = render(
            <Accordion summary="Heading">Body content</Accordion>,
        );
        const details = container.querySelector("details") as HTMLDetailsElement;
        expect(details.open).toBe(false);
        expect(details).not.toHaveAttribute("open");
    });

    it("reflects isOpen onto the native `open` attribute", () => {
        const {container} = render(
            <Accordion summary="Heading" isOpen>
                Body content
            </Accordion>,
        );
        const details = container.querySelector("details") as HTMLDetailsElement;
        expect(details.open).toBe(true);
        expect(details).toHaveAttribute("open");
    });
});

describe("Accordion — toggle interaction", () => {
    it("opens when the summary is clicked", async () => {
        const user = userEvent.setup();
        const {container} = render(
            <Accordion summary="Click me">Body content</Accordion>,
        );
        const details = container.querySelector("details") as HTMLDetailsElement;
        expect(details.open).toBe(false);

        await user.click(screen.getByText("Click me"));
        expect(details.open).toBe(true);
    });

    it("closes when an open accordion's summary is clicked", async () => {
        const user = userEvent.setup();
        const {container} = render(
            <Accordion summary="Toggle me" isOpen>
                Body content
            </Accordion>,
        );
        const details = container.querySelector("details") as HTMLDetailsElement;
        expect(details.open).toBe(true);

        await user.click(screen.getByText("Toggle me"));
        expect(details.open).toBe(false);
    });
});

describe("Accordion — a11y", () => {
    it("has no axe violations when closed", async () => {
        const {container} = render(
            <Accordion summary="Frequently asked question">
                The answer to the question.
            </Accordion>,
        );
        expect(await axe(container)).toHaveNoViolations();
    });

    it("has no axe violations when open", async () => {
        const {container} = render(
            <Accordion summary="Frequently asked question" isOpen>
                The answer to the question.
            </Accordion>,
        );
        expect(await axe(container)).toHaveNoViolations();
    });
});
