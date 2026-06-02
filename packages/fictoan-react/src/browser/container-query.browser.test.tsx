// TESTS ===============================================================================================================
import { describe, it, expect } from "vitest";

// BROWSER TIER — Row/Portion responsive grid via CSS container queries. [data-row]
// is the query container (`container-type: inline-size; container-name: fictoan-row`)
// and Portion's `*-on-mobile` spans flip at `@container fictoan-row (max-width: 600px)`.
// jsdom has no layout/container-size resolution, so this is browser-only. Raw markup
// mirrors `<Row><Portion desktopSpan="whole" mobileSpan="half" /></Row>`.

const portionSpan = (rowWidth: number, portionClass: string): string => {
    const row = document.createElement("div");
    row.setAttribute("data-row", "");
    row.style.width = `${rowWidth}px`;

    const portion = document.createElement("div");
    portion.setAttribute("data-portion", "");
    portion.className = portionClass;
    row.appendChild(portion);

    document.body.appendChild(row);
    const span = getComputedStyle(portion).gridColumnStart;
    row.remove();
    return span;
};

describe("container queries — Portion spans flip on the Row's own width", () => {
    it("a desktop=whole / mobile=half Portion spans 24 in a wide Row and 12 in a narrow one", () => {
        const wide   = portionSpan(1000, "whole half-on-mobile"); // > 600px container
        const narrow = portionSpan(400, "whole half-on-mobile");  // <= 600px container

        expect(wide).toBe("span 24");
        expect(narrow).toBe("span 12");
    });
});
