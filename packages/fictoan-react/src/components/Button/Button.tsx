// REACT CORE ==========================================================================================================
import React from "react";

// LOCAL COMPONENTS ====================================================================================================
import { CommonAndHTMLProps, EmphasisTypes, ShapeTypes, SpacingTypes, ButtonVariantTypes } from "../Element/constants";
import { Element } from "$element";

// STYLES ==============================================================================================================
import "./Button.css";

// prettier-ignore
export interface ButtonCustomProps {
    kind      ? : EmphasisTypes;
    variant   ? : ButtonVariantTypes;
    size      ? : SpacingTypes;
    shape     ? : ShapeTypes;
    isLoading ? : boolean;
    label     ? : string;
}

export type ButtonElementType = HTMLButtonElement;
export type ButtonProps = Omit<CommonAndHTMLProps<ButtonElementType>, keyof ButtonCustomProps> & ButtonCustomProps;

// COMPONENT ///////////////////////////////////////////////////////////////////////////////////////////////////////////
export const Button = React.forwardRef(
    // type defaults to "button" — a native <button> inside a <form> defaults
    // to type="submit", so an onClick-only Button placed in a Form silently
    // submits it (the copy-button-resubmits-the-form trap). Pass
    // type="submit" explicitly on the one button per form that should submit.
    ({size = "medium", shape, kind, variant, isLoading, label, type = "button", ...props} : ButtonProps, ref : React.Ref<ButtonElementType>) => {
        let classNames = [];

        if (kind) {
            classNames.push(kind);
        }

        if (variant) {
            classNames.push(variant);
        }

        if (size) {
            classNames.push(`size-${size}`);
        }

        if (shape) {
            classNames.push(`shape-${shape}`);
        }

        if (isLoading) {
            classNames.push("is-loading");
        }

        return (
            <Element<ButtonElementType>
                as="button"
                data-button
                ref={ref}
                type={type}
                classNames={classNames}
                aria-label={label}
                aria-disabled={props.disabled || isLoading}
                aria-busy={isLoading}
                {...props}
            />
        );
    },
);
Button.displayName = "Button";
