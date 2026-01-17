// REACT CORE ==========================================================================================================
import React from "react";

// ELEMENT =============================================================================================================
import { CommonAndHTMLProps } from "../../Element/constants";

// STYLES ==============================================================================================================
import "./notifications-wrapper.css";

// OTHER ===============================================================================================================
import { Element } from "$element";

// prettier-ignore
export interface NotificationsWrapperCustomProps {
        position ? : "left" | "right";
        anchor   ? : "top" | "bottom";
        order    ? : "new-on-top" | "new-on-bottom";
        kind     ? : "list" | "stack";
        label    ? : string;
}

export type NotificationsWrapperElementType = HTMLDivElement;
export type NotificationsWrapperProps = CommonAndHTMLProps<NotificationsWrapperElementType> &
    NotificationsWrapperCustomProps;

// COMPONENT ///////////////////////////////////////////////////////////////////////////////////////////////////////////
export const NotificationsWrapper = React.forwardRef(
    (
        {
            position = "right",
            anchor = "top",
            order = "new-on-top",
            kind = "list",
            children,
            label,
            ...props
        }: NotificationsWrapperProps,
        ref: React.Ref<NotificationsWrapperElementType>
    ) => {
        let classNames = [];
        if (position) classNames.push(position);
        if (anchor) classNames.push(anchor);
        if (order) classNames.push(order);
        if (kind) classNames.push(kind);

        const childrenCount = React.Children.count(children);
        if (childrenCount === 0) return null;

        return (
            <Element<NotificationsWrapperElementType>
                as="section"
                data-notifications-wrapper
                ref={ref}
                classNames={classNames}
                aria-label={label || "Notifications"}
                aria-relevant="additions removals"
                role="log"
                {...props}
            >
                {children}
            </Element>
        );
    }
);
NotificationsWrapper.displayName = "NotificationsWrapper";
