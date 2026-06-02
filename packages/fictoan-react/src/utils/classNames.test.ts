// TESTS ===============================================================================================================
import { describe, it, expect } from "vitest";

// OTHER ===============================================================================================================
import { createClassName } from "./classNames";

// Smoke test for the test harness as much as for the function: if this runs
// green, Vitest + jsdom + the alias resolver are all wired correctly.
describe("createClassName", () => {
    it("joins truthy class names with single spaces", () => {
        expect(createClassName([ "a", "b", "c" ])).toBe("a b c");
    });

    it("drops falsy entries (false, null, undefined, empty string, 0)", () => {
        expect(createClassName([ "a", false, null, undefined, "", 0, "b" ])).toBe("a b");
    });

    it("returns an empty string when nothing is truthy", () => {
        expect(createClassName([ false, null, undefined, "" ])).toBe("");
    });
});
