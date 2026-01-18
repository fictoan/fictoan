// REACT CORE ==========================================================================================================
import React from "react";

// LOCAL COMPONENTS ====================================================================================================
import { CommonAndHTMLProps, ShapeTypes, SpacingTypes } from "../Element/constants";
import { Element } from "$element";

// STYLES ==============================================================================================================
import "./badge.css";

export type BadgeActionIconType = "cross" | "tick" | "plus" | "minus";

export interface BadgeCustomProps {
    size            ? : SpacingTypes;
    shape           ? : ShapeTypes;
    actionIcon      ? : BadgeActionIconType;
    onActionClick   ? : (event : React.MouseEvent<HTMLButtonElement>) => void;
    actionAriaLabel ? : string;
}

export type BadgeElementType = HTMLDivElement;
export type BadgeProps = Omit<CommonAndHTMLProps<BadgeElementType>, keyof BadgeCustomProps> & BadgeCustomProps;

// ICONS ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
const ActionIcons : Record<BadgeActionIconType, React.ReactNode> = {
    cross : (
        <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M18 6L6 18M6 6l12 12" />
        </svg>
    ),
    tick  : (
        <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M5 12l5 5L20 7" />
        </svg>
    ),
    plus  : (
        <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12 5v14M5 12h14" />
        </svg>
    ),
    minus : (
        <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M5 12h14" />
        </svg>
    ),
};

// COMPONENT ///////////////////////////////////////////////////////////////////////////////////////////////////////////
export const Badge = React.forwardRef(
    ({
        children,
        size = "medium",
        shape,
        actionIcon,
        onActionClick,
        actionAriaLabel,
        ...props
    } : BadgeProps, ref : React.Ref<BadgeElementType>) => {
        let classNames = [];

        if (size) {
            classNames.push(`size-${size}`);
        }

        if (shape) {
            classNames.push(`shape-${shape}`);
        }

        const handleActionClick = (e : React.MouseEvent<HTMLButtonElement>) => {
            e.stopPropagation();
            onActionClick?.(e);
        };

        const hasAction = Boolean(actionIcon);

        return (
            <Element<BadgeElementType>
                data-badge
                data-has-action={hasAction || undefined}
                ref={ref}
                classNames={classNames}
                role="status"
                aria-label={(typeof children === "string" ? children : undefined)}
                {...props}
            >
                {children}

                {hasAction && (
                    <button
                        type="button"
                        className="badge-action-button"
                        onClick={handleActionClick}
                        aria-label={actionAriaLabel}
                    >
                        {ActionIcons[actionIcon!]}
                    </button>
                )}
            </Element>
        );
    },
);
Badge.displayName = "Badge";
