// REACT CORE ==========================================================================================================
import React from "react";

// LOCAL COMPONENTS ====================================================================================================
import { CommonAndHTMLProps, SpacingTypes } from "../Element/constants";
import { Element } from "$element";

// STYLES ==============================================================================================================
import "./button-group.css";

// prettier-ignore
export interface ButtonGroupCustomProps {
    isJoint       ? : boolean;
    spacing       ? : SpacingTypes;
    equaliseWidth ? : boolean;
}

export type ButtonGroupElementType = HTMLDivElement;
export type ButtonGroupProps = Omit<CommonAndHTMLProps<ButtonGroupElementType>, keyof ButtonGroupCustomProps> &
                               ButtonGroupCustomProps;

// COMPONENT ///////////////////////////////////////////////////////////////////////////////////////////////////////////
export const ButtonGroup = React.forwardRef(
    (
        {isJoint = true, spacing, equaliseWidth, children, ...props} : ButtonGroupProps,
        ref : React.Ref<ButtonGroupElementType>,
    ) => {
        let classNames : string[] = [];

        if (isJoint) {
            classNames.push("is-joint");
        }

        if (spacing && !isJoint) {
            classNames.push(`spacing-${spacing}`);
        }

        if (equaliseWidth) {
            classNames.push("equal-width");
        }

        return (
            <Element<ButtonGroupElementType>
                as="div"
                data-button-group
                ref={ref}
                role="group"
                classNames={classNames}
                {...props}
            >
                {children}
            </Element>
        );
    },
);

ButtonGroup.displayName = "ButtonGroup";
