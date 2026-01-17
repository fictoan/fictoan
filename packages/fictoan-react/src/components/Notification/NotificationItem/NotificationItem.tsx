// REACT CORE ==========================================================================================================
import React, { useState, useEffect } from "react";

// ELEMENT =============================================================================================================
import { Div } from "../../Element/Tags";

// STYLES ==============================================================================================================
import "./notification-item.css";

// OTHER ===============================================================================================================
import { Element } from "$element";

// TYPES ===============================================================================================================
export type NotificationKind = "generic" | "info" | "warning" | "error" | "success";

export interface NotificationItemProps {
    id              : string;
    kind          ? : NotificationKind;
    duration      ? : number;
    isDismissible ? : boolean;
    onClose         : () => void;
    children        : React.ReactNode;
}

export type NotificationItemElementType = HTMLDivElement;

// Map notification types to ARIA roles
const roleMap: Record<NotificationKind, string> = {
    generic : "status",
    info    : "status",
    warning : "alert",
    error   : "alert",
    success : "status",
};

// COMPONENT ===========================================================================================================
export const NotificationItem = ({
    id,
    kind = "generic",
    duration = 4,
    isDismissible = true,
    onClose,
    children,
}: NotificationItemProps) => {
    const [isExiting, setIsExiting] = useState(false);

    useEffect(() => {
        if (duration === 0) return; // No auto-dismiss

        const timer = setTimeout(() => {
            setIsExiting(true);
        }, duration * 1000);

        return () => clearTimeout(timer);
    }, [duration]);

    // Fallback: if transition doesn't fire, remove after animation duration
    useEffect(() => {
        if (!isExiting) return;

        const fallbackTimer = setTimeout(() => {
            onClose();
        }, 500); // slightly longer than the 0.4s transition

        return () => clearTimeout(fallbackTimer);
    }, [isExiting, onClose]);

    const handleDismissClick = (event: React.MouseEvent<HTMLDivElement>) => {
        event.preventDefault();
        setIsExiting(true);
    };

    const handleKeyDown = (event: React.KeyboardEvent) => {
        if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            setIsExiting(true);
        }
    };

    const handleTransitionEnd = () => {
        if (isExiting) {
            onClose();
        }
    };

    const classNames: string[] = [kind];
    if (isDismissible) classNames.push("dismissible");
    if (isExiting) classNames.push("dismissed");

    return (
        <Element<NotificationItemElementType>
            as="div"
            data-notification-item
            id={id}
            classNames={classNames}
            onTransitionEnd={handleTransitionEnd}
            role={roleMap[kind]}
            aria-live={kind === "error" || kind === "warning" ? "assertive" : "polite"}
            aria-atomic="true"
        >
            <div className="notification-content">
                {children}
            </div>

            {isDismissible && (
                <Div
                    className="dismiss-button"
                    onClick={handleDismissClick}
                    onKeyDown={handleKeyDown}
                    aria-label="Dismiss notification"
                    tabIndex={0}
                >
                    <span className="sr-only">Close notification</span>
                </Div>
            )}
        </Element>
    );
};
NotificationItem.displayName = "NotificationItem";
