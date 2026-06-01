import { describe, it, expect } from "vitest";

import { separateFictoanFromHTMLProps, separateWrapperProps } from "./propSeparation";

// propSeparation is the gate that decides which props are Fictoan recipe props
// (consumed to make classes / inline styles) and which are passed straight on to
// the DOM. These tests pin that split: the `size` overload resolution for form
// items, and the wrapper-vs-input partition used by TextArea / InputField. They
// assert the EXACT return shape so the contract survives an internal rewrite.

describe("separateFictoanFromHTMLProps — the `size` overload", () => {
    it("treats a valid string size as a Fictoan prop and keeps it out of htmlProps", () => {
        const { fictoanProps, htmlProps } = separateFictoanFromHTMLProps({ size : "medium", id : "x" });

        expect(fictoanProps.size).toBe("medium");
        // string size is a recipe prop, so it must NOT reach the DOM bucket
        expect("size" in htmlProps).toBe(false);
        expect((htmlProps as Record<string, unknown>).id).toBe("x");
    });

    it("recognises every valid FormItem string size", () => {
        for (const size of [ "none", "micro", "tiny", "small", "medium", "large" ]) {
            const { fictoanProps, htmlProps } = separateFictoanFromHTMLProps({ size });
            expect(fictoanProps.size).toBe(size);
            expect("size" in htmlProps).toBe(false);
        }
    });

    it("rejects the nano / huge SpacingTypes (excluded from the FormItem list)", () => {
        for (const size of [ "nano", "huge" ]) {
            const { fictoanProps, htmlProps } = separateFictoanFromHTMLProps({ size });
            // not a valid FormItem size -> fictoanProps.size is undefined ...
            expect(fictoanProps.size).toBeUndefined();
            // ... and because the value is a string (not a number) it is also
            // dropped from htmlProps entirely.
            expect("size" in htmlProps).toBe(false);
        }
    });

    it("rejects an unknown string size value", () => {
        const { fictoanProps, htmlProps } = separateFictoanFromHTMLProps({ size : "enormous" });
        expect(fictoanProps.size).toBeUndefined();
        expect("size" in htmlProps).toBe(false);
    });

    it("treats a numeric size as a native HTML prop (kept on htmlProps, off fictoanProps)", () => {
        const { fictoanProps, htmlProps } = separateFictoanFromHTMLProps({ size : 30, id : "y" });

        expect(fictoanProps.size).toBeUndefined();
        expect(htmlProps.size).toBe(30);
        expect((htmlProps as Record<string, unknown>).id).toBe("y");
    });

    it("returns size: undefined and no size key on htmlProps when size is absent", () => {
        const { fictoanProps, htmlProps } = separateFictoanFromHTMLProps({ id : "z", onClick : () => {} });

        expect(fictoanProps.size).toBeUndefined();
        expect("size" in htmlProps).toBe(false);
        expect((htmlProps as Record<string, unknown>).id).toBe("z");
    });

    it("always returns the { fictoanProps, htmlProps } shape and never mutates the input", () => {
        const input = { size : "small", id : "a", "data-foo" : "bar" };
        const result = separateFictoanFromHTMLProps(input);

        expect(Object.keys(result).sort()).toEqual([ "fictoanProps", "htmlProps" ]);
        // the source object is left untouched
        expect(input).toEqual({ size : "small", id : "a", "data-foo" : "bar" });
    });
});

describe("separateWrapperProps — wrapper vs input partition", () => {
    it("routes layout / spacing recipe props to wrapperProps, away from inputProps", () => {
        const { wrapperProps, inputProps } = separateWrapperProps({
            margin           : "small",
            padding          : "large",
            gap              : "tiny",
            listVertically   : true,
            layoutAsGrid     : true,
            columns          : 3,
            // a native prop that should reach the DOM
            placeholder      : "Type here",
        });

        expect(wrapperProps).toEqual({
            margin         : "small",
            padding        : "large",
            gap            : "tiny",
            listVertically : true,
            layoutAsGrid   : true,
            columns        : 3,
        });
        expect(inputProps).toEqual({ placeholder : "Type here" });
    });

    it("preserves native / passthrough props (id, onClick, data-*, aria-*) on inputProps", () => {
        const onClick = () => {};
        const { wrapperProps, inputProps } = separateWrapperProps({
            id            : "field-1",
            onClick,
            "data-testid" : "field",
            "aria-label"  : "Email",
            value         : "hello",
        });

        expect(wrapperProps).toEqual({});
        expect(inputProps).toEqual({
            id            : "field-1",
            onClick,
            "data-testid" : "field",
            "aria-label"  : "Email",
            value         : "hello",
        });
    });

    it("recognises the renamed listVertically / listHorizontally as wrapper props", () => {
        const { wrapperProps, inputProps } = separateWrapperProps({
            listVertically   : true,
            listHorizontally : true,
        });

        expect(wrapperProps).toEqual({ listVertically : true, listHorizontally : true });
        expect(inputProps).toEqual({});
    });

    it("does NOT recognise the old stackVertically / stackHorizontally names (they fall through to inputProps)", () => {
        const { wrapperProps, inputProps } = separateWrapperProps({
            stackVertically   : true,
            stackHorizontally : true,
        });

        // the renamed-away props are unknown now, so they are treated as DOM props
        expect("stackVertically" in wrapperProps).toBe(false);
        expect("stackHorizontally" in wrapperProps).toBe(false);
        expect(inputProps).toEqual({ stackVertically : true, stackHorizontally : true });
    });

    it("routes both US and British colour spellings to wrapperProps", () => {
        const { wrapperProps, inputProps } = separateWrapperProps({
            bgColor     : "red",
            bgColour    : "blue",
            textColor   : "white",
            textColour  : "black",
            borderColor : "grey",
            bgOpacity   : 40,
        });

        expect(wrapperProps).toEqual({
            bgColor     : "red",
            bgColour    : "blue",
            textColor   : "white",
            textColour  : "black",
            borderColor : "grey",
            bgOpacity   : 40,
        });
        expect(inputProps).toEqual({});
    });

    it("routes classNames to wrapperProps", () => {
        const { wrapperProps, inputProps } = separateWrapperProps({
            classNames : [ "one", "two" ],
            name       : "field",
        });

        expect(wrapperProps).toEqual({ classNames : [ "one", "two" ] });
        expect(inputProps).toEqual({ name : "field" });
    });

    it("always returns the { wrapperProps, inputProps } shape for an empty input", () => {
        const result = separateWrapperProps({});
        expect(Object.keys(result).sort()).toEqual([ "inputProps", "wrapperProps" ]);
        expect(result.wrapperProps).toEqual({});
        expect(result.inputProps).toEqual({});
    });
});
