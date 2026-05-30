// REACT CORE ==========================================================================================================
import React, { useEffect, useRef } from "react";

// LOCAL COMPONENTS ====================================================================================================
import { CommonAndHTMLProps, SpacingTypes } from "../Element/constants";
import { Div } from "$tags";
import { Element } from "$element";

// STYLES ==============================================================================================================
import "./drawer.css";

export interface DrawerCustomProps {
    id                    : string;
    isOpen              ? : boolean;
    onClose             ? : () => void;
    position            ? : "top" | "right" | "bottom" | "left";
    size                ? : SpacingTypes;
    isDismissible       ? : boolean;
    showOverlay         ? : boolean;
    blurOverlay         ? : boolean;
    /** @deprecated Click-outside-to-close is governed by `isDismissible` via the
     *  popover API: when dismissible, both ESC and backdrop click close the
     *  drawer. Splitting the two is no longer supported. */
    closeOnClickOutside ? : boolean;
    label               ? : string;
    description         ? : string;
    zIndex              ? : number;
}

export type DrawerElementType = HTMLDivElement;
export type DrawerProps = Omit<CommonAndHTMLProps<DrawerElementType>, keyof DrawerCustomProps> & DrawerCustomProps;

// COMPONENT ///////////////////////////////////////////////////////////////////////////////////////////////////////////
export const Drawer = React.forwardRef(
    (
        {
            id,
            children,
            isOpen = false,
            onClose,
            position = "right",
            size = "medium",
            padding = "micro",
            bgColor,
            bgColour,
            isDismissible = true,
            showOverlay = true,
            blurOverlay = false,
            closeOnClickOutside : _closeOnClickOutside,
            zIndex,
            label,
            description,
            classNames = [],
            ...props
        } : DrawerProps,
        ref : React.Ref<DrawerElementType>,
    ) => {
        const drawerId      = `${id}`;
        const descriptionId = description ? `${drawerId}-description` : undefined;
        const drawerRef     = useRef<HTMLDivElement>(null);
        const effectiveRef  = (ref as React.MutableRefObject<HTMLDivElement | null>) || drawerRef;

        const drawerClasses : string[] = [
            "drawer",
            position,
            size,
            ...(showOverlay ? [ "with-overlay" ] : []),
            ...(blurOverlay ? [ "blur-overlay" ] : []),
            ...classNames,
        ];

        // Sync isOpen prop to popover state. The popover API handles backdrop
        // click and ESC dismissal natively; we only call showPopover/hidePopover.
        useEffect(() => {
            const drawer = effectiveRef.current;
            if (!drawer) return;

            if (isOpen && !drawer.matches(":popover-open")) {
                drawer.showPopover();
                // Focus the dismiss button or the drawer itself for keyboard users.
                drawer.focus();
            } else if (!isOpen && drawer.matches(":popover-open")) {
                drawer.hidePopover();
            }
        }, [ isOpen, effectiveRef ]);

        // When the popover closes externally (ESC, backdrop click), keep React
        // state in sync by firing onClose.
        useEffect(() => {
            const drawer = effectiveRef.current;
            if (!drawer) return;

            const handleToggle = (e : Event) => {
                const toggleEvent = e as ToggleEvent;
                if (toggleEvent.newState === "closed" && isOpen && onClose) {
                    onClose();
                }
            };

            drawer.addEventListener("toggle", handleToggle);
            return () => drawer.removeEventListener("toggle", handleToggle);
        }, [ isOpen, onClose, effectiveRef ]);

        return (
            <Element<DrawerElementType>
                as="div"
                id={drawerId}
                data-drawer
                ref={effectiveRef}
                classNames={drawerClasses}
                popover={isDismissible ? "auto" : "manual"}
                role="dialog"
                aria-modal="true"
                aria-label={label || "Drawer"}
                aria-describedby={descriptionId}
                tabIndex={-1}
                style={zIndex !== undefined ? { zIndex } : undefined}
                {...props}
            >
                {isDismissible && onClose && (
                    <button
                        type="button"
                        className="drawer-dismiss-button"
                        onClick={onClose}
                        aria-label="Close drawer"
                    >
                        &times;
                    </button>
                )}

                <Div
                    className="drawer-content"
                    role="document"
                    padding={padding}
                    bgColor={bgColor}
                    bgColour={bgColour}
                >
                    {description && (
                        <div id={descriptionId} className="sr-only">
                            {description}
                        </div>
                    )}

                    {children}
                </Div>
            </Element>
        );
    },
);
Drawer.displayName = "Drawer";
