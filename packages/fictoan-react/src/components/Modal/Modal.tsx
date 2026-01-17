// REACT CORE ==========================================================================================================
import React, { useEffect } from "react";

// ELEMENT =============================================================================================================
import { CommonAndHTMLProps } from "../Element/constants";
import { Element } from "$element";

// STYLES ==============================================================================================================
import "./modal.css";

// OTHER ===============================================================================================================
import { Text } from "$/components";

export type ModalElementType = HTMLDivElement;

export interface ModalCustomProps {
        id              : string;
        isOpen        ? : boolean;
        onClose       ? : () => void;
        isDismissible ? : boolean;
        showBackdrop  ? : boolean;
        blurBackdrop  ? : boolean;
        label         ? : string;
        description   ? : string;
}

export type ModalProps = Omit<CommonAndHTMLProps<ModalElementType>, keyof ModalCustomProps> & ModalCustomProps;

// COMPONENT ///////////////////////////////////////////////////////////////////////////////////////////////////////////
export const Modal = React.forwardRef(
    (
        {
            id,
            children,
            classNames = [],
            isOpen = false,
            onClose,
            isDismissible = true,
            showBackdrop,
            blurBackdrop,
            label,
            description,
            ...props
        }: ModalProps, ref: React.Ref<ModalElementType>,
    ) => {
        const modalId       = `${id}`;
        const descriptionId = description ? `${modalId}-description` : undefined;

        if (showBackdrop) {
            classNames.push("show-backdrop");
        }

        if (blurBackdrop) {
            classNames.push("blur-backdrop");
        }

        // Handle open/close state declaratively
        useEffect(() => {
            const modal = document.querySelector(`#${modalId}[data-modal]`);
            if (!modal || !(modal instanceof HTMLElement)) return;

            if (isOpen) {
                // Show modal
                modal.showPopover();

                // Focus first focusable element
                const focusableElements = modal.querySelectorAll(
                    "button, [href], input, select, textarea, [tabindex]:not([tabindex=\"-1\"])",
                );
                if (focusableElements.length) {
                    (focusableElements[0] as HTMLElement).focus();
                }
            } else {
                // Hide modal
                if (modal.matches(":popover-open")) {
                    modal.hidePopover();
                }
            }
        }, [isOpen, modalId]);

        // Listen for popover toggle events to sync React state when closed externally
        // (e.g., clicking outside with popover="auto", or pressing Escape)
        useEffect(() => {
            const modal = document.querySelector(`#${modalId}[data-modal]`);
            if (!modal || !(modal instanceof HTMLElement)) return;

            const handleToggle = (e: Event) => {
                const toggleEvent = e as ToggleEvent;
                // If popover was closed externally and React still thinks it's open, sync state
                if (toggleEvent.newState === "closed" && isOpen && onClose) {
                    onClose();
                }
            };

            modal.addEventListener("toggle", handleToggle);
            return () => modal.removeEventListener("toggle", handleToggle);
        }, [modalId, isOpen, onClose]);

        return (
            <Element<ModalElementType>
                as="dialog"
                id={modalId}
                data-modal
                // @ts-ignore
                popover={isDismissible ? "auto" : "manual"}
                ref={ref}
                classNames={classNames}
                role="dialog"
                aria-modal="true"
                aria-label={label || "Modal dialog"}
                aria-describedby={descriptionId}
                {...props}
            >
                {isDismissible && onClose && (
                    <Text
                        className="dismiss-button"
                        onClick={onClose}
                        aria-label="Close modal"
                        tabIndex={0}
                    >
                        &times;
                    </Text>
                )}
                {description && (
                    <div id={descriptionId} className="sr-only">
                        {description}
                    </div>
                )}
                <div role="document">
                    {children}
                </div>
            </Element>
        );
    },
);
Modal.displayName = "Modal";

