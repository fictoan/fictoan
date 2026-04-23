// REACT CORE ==========================================================================================================
import React from "react";

// LOCAL COMPONENTS ====================================================================================================
import { CommonAndHTMLProps } from "../../Element/constants";
import { Element } from "$element";

// STYLES ==============================================================================================================
import "./form-item-group.css";

// prettier-ignore
export interface FormItemGroupCustomProps {
    isJoint               ? : boolean;
    equalWidthForChildren ? : React.ReactNode;
    retainLayout          ? : boolean;
    legend                ? : string;
    columns               ? : number;
}

export type FormItemGroupElementType = HTMLDivElement;
export type FormItemGroupProps = Omit<CommonAndHTMLProps<FormItemGroupElementType>, keyof FormItemGroupCustomProps> &
                                 FormItemGroupCustomProps;

// COMPONENT ///////////////////////////////////////////////////////////////////////////////////////////////////////////
export const FormItemGroup = React.forwardRef(
    (
        {
            isJoint,
            equalWidthForChildren,
            retainLayout,
            children,
            legend,
            id,
            columns,
            style,
            ...props
        } : FormItemGroupProps,
        ref : React.Ref<FormItemGroupElementType>,
    ) => {
        const groupId = id || `form-group-${Math.random().toString(36).substring(2, 9)}`;
        let classNames = [];

        if (isJoint) {
            classNames.push("is-joint");
        }

        if (equalWidthForChildren) {
            classNames.push("equal-width-for-children");
        }

        if (retainLayout) {
            classNames.push("retain-layout");
        }

        if (columns) {
            classNames.push("with-columns");
        }

        return (
            <Element<FormItemGroupElementType>
                as="div"
                data-form-item-group
                data-form-spaced
                ref={ref}
                id={groupId}
                role="group"
                aria-label={legend}
                classNames={classNames}
                style={columns ? { gridTemplateColumns : `repeat(${columns}, 1fr)`, ...style } : style}
                {...props}
            >
                {children}
            </Element>
        );
    },
);
FormItemGroup.displayName = "FormItemGroup";
