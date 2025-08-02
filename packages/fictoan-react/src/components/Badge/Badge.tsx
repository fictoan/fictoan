// REACT CORE ==========================================================================================================
import React from "react";

// ELEMENT =============================================================================================================
import { CommonAndHTMLProps, ShapeTypes, SpacingTypes } from "../Element/constants";
import { Element } from "$element";

// STYLES ==============================================================================================================
import "./badge.css";

// OTHER ===============================================================================================================
import { Text } from "../Typography/Text";

// prettier-ignore
export interface BadgeCustomProps {
        size       ? : SpacingTypes;
        shape      ? : ShapeTypes;
        withDelete ? : boolean;
        onDelete   ? : (event: React.MouseEvent<HTMLElement>) => void;
        label      ? : string;
}

export type BadgeElementType = HTMLDivElement;
export type BadgeProps = Omit<CommonAndHTMLProps<BadgeElementType>, keyof BadgeCustomProps> & BadgeCustomProps;

// COMPONENT ///////////////////////////////////////////////////////////////////////////////////////////////////////////
export const Badge = React.forwardRef(
    ({
         children,
         size = "medium",
         shape,
         withDelete,
         onDelete,
         label,
         ...props
    }: BadgeProps, ref: React.Ref<BadgeElementType>) => {
        let classNames = [];

        if (size) {
            classNames.push(`size-${size}`);
        }

        if (shape) {
            classNames.push(`shape-${shape}`);
        }

        const handleDelete = (e: React.MouseEvent<HTMLElement>) => {
            e.stopPropagation();
            onDelete?.(e);
        };

        const handleKeyPress = (e: React.KeyboardEvent) => {
            if (withDelete && (e.key === "Enter" || e.key === " ")) {
                e.preventDefault();
                onDelete?.(e as unknown as React.MouseEvent<HTMLElement>);
            }
        };

        return (
            <Element<BadgeElementType>
                data-badge
                ref={ref}
                classNames={classNames}
                role="status"
                aria-label={label || (typeof children === "string" ? children : undefined)}
                {...props}
            >
                {children}

                {withDelete && (
                    <Text
                        className="badge-dismiss-button"
                        onClick={handleDelete}
                        onKeyDown={handleKeyPress}
                        role="button"
                        tabIndex={0}
                        aria-label={`Remove badge`}
                    >
                        &times;
                    </Text>
                )}
            </Element>
        );
    },
);
