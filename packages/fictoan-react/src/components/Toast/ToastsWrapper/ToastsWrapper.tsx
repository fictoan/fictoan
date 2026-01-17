// REACT CORE ==========================================================================================================
import React from "react";

// ELEMENT =============================================================================================================
import { CommonAndHTMLProps } from "../../Element/constants";

// STYLES ==============================================================================================================
import "./toasts-wrapper.css";

// OTHER ===============================================================================================================
import { Element } from "$element";

// prettier-ignore
export interface ToastsWrapperCustomProps {
    anchor ? : "top" | "bottom";
}

export type ToastsWrapperElementType = HTMLDivElement;
export type ToastsWrapperProps = CommonAndHTMLProps<ToastsWrapperElementType> &
    ToastsWrapperCustomProps;

// COMPONENT ///////////////////////////////////////////////////////////////////////////////////////////////////////////
export const ToastsWrapper = React.forwardRef(
    (
        {
            anchor = "top",
            children,
            ...props
        }: ToastsWrapperProps,
        ref: React.Ref<ToastsWrapperElementType>
    ) => {
        const childrenCount = React.Children.count(children);
        if (childrenCount === 0) return null;

        return (
            <Element<ToastsWrapperElementType>
                as="section"
                data-toasts-wrapper
                ref={ref}
                classNames={[anchor]}
                aria-label="Toasts"
                aria-relevant="additions removals"
                role="log"
                {...props}
            >
                {children}
            </Element>
        );
    }
);
ToastsWrapper.displayName = "ToastsWrapper";
