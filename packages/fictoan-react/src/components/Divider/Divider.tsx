// REACT CORE ==========================================================================================================
import React from "react";

// ELEMENT =============================================================================================================
import { CommonAndHTMLProps } from "../Element/constants";
import { Element } from "$element";

// STYLES ==============================================================================================================
import "./divider.css";

// prettier-ignore
export interface DividerCustomProps {
        kind   ? : "primary" | "secondary" | "tertiary";
        height ? : string;
        label  ? : string;
}

export type DividerElementType = HTMLHRElement;
export type DividerProps = Omit<CommonAndHTMLProps<DividerElementType>, keyof DividerCustomProps> & DividerCustomProps;

// COMPONENT ///////////////////////////////////////////////////////////////////////////////////////////////////////////
export const Divider = React.forwardRef(
    (
        { kind, height, label, ...props }: DividerProps, ref: React.Ref<DividerElementType>) => {
        let classNames = [];

        if (kind) {
            classNames.push(kind);
        }

        return (
            <Element<DividerElementType>
                as="hr"
                data-hrule
                ref={ref}
                classNames={classNames}
                role="separator"
                aria-orientation="horizontal"
                aria-label={label}
                {...props}
                style={{ height : height }}
            />
        );
    },
);
