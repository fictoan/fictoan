import { describe, it, expect } from "vitest";
import "../../../vitest-matchers";
import { render, screen } from "@testing-library/react";
import { axe } from "vitest-axe";

import { Card } from "./Card";

// Card is a thin semantic wrapper over Element: it marks itself with [data-card],
// becomes a labelled `region` landmark, and forwards every recipe prop (padding,
// colour, etc.) straight through to Element. These tests pin that contract — the
// emitted markup/classes/ARIA — not the painted result (background colour, radius
// and the responsive padding live in CSS, which jsdom does not evaluate).

describe("Card — rendering", () => {
    it("renders a <div> carrying the data-card marker", () => {
        render(<Card data-testid="card">Body</Card>);
        const card = screen.getByTestId("card");
        expect(card.tagName).toBe("DIV");
        expect(card).toHaveAttribute("data-card");
    });

    it("renders its children", () => {
        render(<Card>Some card body</Card>);
        expect(screen.getByText("Some card body")).toBeInTheDocument();
    });

    it("is a labelled region with tabIndex 0", () => {
        render(<Card heading="Account summary">Body</Card>);
        const region = screen.getByRole("region", { name: "Account summary" });
        expect(region).toHaveAttribute("aria-label", "Account summary");
        expect(region).toHaveAttribute("tabindex", "0");
    });
});

describe("Card — shape prop", () => {
    it("emits shape-rounded for shape=\"rounded\"", () => {
        render(<Card data-testid="card" shape="rounded">Body</Card>);
        expect(screen.getByTestId("card")).toHaveClass("shape-rounded");
    });

    it("emits shape-curved for shape=\"curved\"", () => {
        render(<Card data-testid="card" shape="curved">Body</Card>);
        expect(screen.getByTestId("card")).toHaveClass("shape-curved");
    });

    it("emits no shape-* class when shape is omitted", () => {
        render(<Card data-testid="card">Body</Card>);
        expect(screen.getByTestId("card").className).not.toMatch(/shape-/);
    });
});

describe("Card — padding prop (token -> utility class)", () => {
    it("maps each spacing token to a padding-all-* class", () => {
        const tokens = ["nano", "micro", "tiny", "small", "medium", "large", "huge"] as const;
        tokens.forEach((token) => {
            const { unmount } = render(
                <Card data-testid="card" padding={token}>Body</Card>,
            );
            expect(screen.getByTestId("card")).toHaveClass(`padding-all-${token}`);
            // token must not leak into inline style
            expect(screen.getByTestId("card").style.padding).toBe("");
            unmount();
        });
    });

    it("applies an arbitrary CSS length via inline style (no class)", () => {
        render(<Card data-testid="card" padding="12px">Body</Card>);
        const card = screen.getByTestId("card");
        expect(card).toHaveStyle({ padding: "12px" });
        expect(card.className).not.toMatch(/padding-all-/);
    });
});

describe("Card — colour props", () => {
    it("maps bgColour / textColour to utility classes (British spelling)", () => {
        render(<Card data-testid="card" bgColour="blue" textColour="white">Body</Card>);
        expect(screen.getByTestId("card")).toHaveClass("bg-blue", "text-white");
    });

    it("maps bgColor / textColor to utility classes (US spelling)", () => {
        render(<Card data-testid="card" bgColor="green" textColor="black">Body</Card>);
        expect(screen.getByTestId("card")).toHaveClass("bg-green", "text-black");
    });

    it("maps borderColour to a border-* class", () => {
        render(<Card data-testid="card" borderColour="red">Body</Card>);
        expect(screen.getByTestId("card")).toHaveClass("border-red");
    });

    it("writes bgOpacity as the --bg-opacity custom property (value / 100)", () => {
        render(<Card data-testid="card" bgColour="blue" bgOpacity="40">Body</Card>);
        expect(screen.getByTestId("card").style.getPropertyValue("--bg-opacity")).toBe("0.4");
    });
});

describe("Card — a11y", () => {
    it("has no axe violations as a labelled region", async () => {
        const { container } = render(
            <Card heading="Latest activity">
                <p>Three new messages and one pending request.</p>
            </Card>,
        );
        expect(await axe(container)).toHaveNoViolations();
    });
});
