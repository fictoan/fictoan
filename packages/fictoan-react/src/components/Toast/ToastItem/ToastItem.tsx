// REACT CORE ==========================================================================================================
import React, { useState, useEffect } from "react";

// STYLES ==============================================================================================================
import "./toast-item.css";

// OTHER ===============================================================================================================
import { Element } from "$element";

// TYPES ===============================================================================================================
export interface ToastItemProps {
    id         : string;
    duration ? : number;
    onClose    : () => void;
    children   : React.ReactNode;
}

export type ToastItemElementType = HTMLDivElement;

// COMPONENT ===========================================================================================================
export const ToastItem = ({
    id,
    duration = 4,
    onClose,
    children,
}: ToastItemProps) => {
    const [isExiting, setIsExiting] = useState(false);

    useEffect(() => {
        if (duration === 0) return;

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
        }, 500);

        return () => clearTimeout(fallbackTimer);
    }, [isExiting, onClose]);

    const handleTransitionEnd = () => {
        if (isExiting) {
            onClose();
        }
    };

    return (
        <Element<ToastItemElementType>
            as="div"
            data-toast-item
            id={id}
            classNames={isExiting ? ["dismissed"] : []}
            onTransitionEnd={handleTransitionEnd}
            role="status"
            aria-live="polite"
            aria-atomic="true"
            shadow="soft"
        >
            {children}
        </Element>
    );
};
ToastItem.displayName = "ToastItem";
