// REACT CORE ==========================================================================================================
import React from "react";

// LOCAL COMPONENTS ====================================================================================================
import { CommonAndHTMLProps, SpacingTypes, WeightTypes } from "../Element/constants";
import { Element } from "$element";

// prettier-ignore
export interface TextCustomProps {
        fontStyle ? : "sans-serif" | "serif" | "monospace";
        weight    ? : WeightTypes;
        size      ? : SpacingTypes;
        align     ? : "left" | "centre" | "center" | "right";
        isSubtext ? : boolean;
}

export type TextElementType = HTMLParagraphElement;
export type TextProps = Omit<CommonAndHTMLProps<TextElementType>, keyof TextCustomProps> & TextCustomProps;

export const Text = React.forwardRef(
    (
        { weight, size, fontStyle = "sans-serif", align, isSubtext, ...props }: TextProps,
        ref: React.Ref<TextElementType>
    ) => {
        let classNames = [];

        if (weight) {
            classNames.push(`weight-${weight}`);
        }

        if (size) {
            classNames.push(`text-${size}`);
        }

        if (fontStyle) {
            classNames.push(`font-${fontStyle}`);
        }

        if (isSubtext) {
            classNames.push("sub-text");
        }

        if (align) {
            classNames.push(`text-${align}`);
        }

        return <Element<TextElementType> as="p" ref={ref} classNames={classNames} {...props} />;
    }
);
Text.displayName = "Text";
