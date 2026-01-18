// REACT CORE ==========================================================================================================
import React, { useEffect, useRef } from "react";

// LOCAL COMPONENTS ====================================================================================================
import { CommonAndHTMLProps, SpacingTypes } from "../Element/constants";
import { Div } from "$tags";
import { Element } from "$element";

// HOOKS ===============================================================================================================
import { useClickOutside } from "$hooks/UseClickOutside";

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
            closeOnClickOutside = true,
            zIndex,
            label,
            description,
            classNames = [],
            ...props
        } : DrawerProps,
        ref : React.Ref<DrawerElementType>,
    ) => {
        const drawerId = `${id}`;
        const descriptionId = description ? `${drawerId}-description` : undefined;
        const drawerRef = useRef<HTMLDivElement>(null);
        const effectiveRef = (ref || drawerRef) as React.RefObject<HTMLDivElement>;

        // Build class names
        const drawerClasses : string[] = [
            "drawer",
            position,
            size,
            ...(isOpen ? [ "open" ] : []),
            ...(showOverlay ? [ "with-overlay" ] : []),
            ...(blurOverlay ? [ "blur-overlay" ] : []),
            ...classNames,
        ];

        // Handle open/close state declaratively
        useEffect(() => {
            const drawer = effectiveRef.current;
            const overlay = document.querySelector(`[data-drawer-overlay-for="${drawerId}"]`) as HTMLElement;

            if (isOpen) {
                // Show drawer
                drawer?.classList.add("open");
                drawer?.classList.remove("closing");
                drawer?.focus();

                // Show overlay
                if (overlay) {
                    overlay.classList.add("visible");
                }

                // Prevent body scroll
                document.body.style.overflow = "hidden";
            } else {
                // Hide drawer
                if (drawer?.classList.contains("open")) {
                    drawer.classList.add("closing");
                    drawer.classList.remove("open");

                    // Hide overlay
                    if (overlay) {
                        overlay.classList.remove("visible");
                    }

                    // Restore body scroll
                    document.body.style.overflow = "";
                }
            }

            // Cleanup on unmount
            return () => {
                document.body.style.overflow = "";
            };
        }, [ isOpen, drawerId, effectiveRef ]);

        // Handle Escape key
        useEffect(() => {
            const handleEscape = (e : KeyboardEvent) => {
                if (e.key === "Escape" && isDismissible && isOpen && onClose) {
                    onClose();
                }
            };

            document.addEventListener("keydown", handleEscape);
            return () => document.removeEventListener("keydown", handleEscape);
        }, [ isDismissible, isOpen, onClose ]);

        // Handle click outside
        useClickOutside(effectiveRef, () => {
            if (closeOnClickOutside && isDismissible && isOpen && onClose) {
                onClose();
            }
        });

        // Handle animation end
        const handleAnimationEnd = (e : React.AnimationEvent) => {
            if (e.animationName.includes("slide-out") || e.animationName.includes("fade-out")) {
                e.currentTarget.classList.remove("closing");
            }
        };

        return (
            <>
                {/* OVERLAY */}
                {showOverlay && (
                    <Div
                        className={`drawer-overlay ${blurOverlay ? "blur" : ""} ${isOpen ? "visible" : ""}`}
                        data-drawer-overlay-for={id}
                        aria-hidden="true"
                        onClick={closeOnClickOutside && isDismissible && onClose ? onClose : undefined}
                        style={{zIndex : zIndex ?? 10000 - 1}}
                    />
                )}

                {/* DRAWER */}
                <Element<DrawerElementType>
                    as="div"
                    id={drawerId}
                    data-drawer
                    ref={effectiveRef}
                    classNames={drawerClasses}
                    onAnimationEnd={handleAnimationEnd}
                    role="dialog"
                    aria-modal="true"
                    aria-label={label || "Drawer"}
                    aria-describedby={descriptionId}
                    tabIndex={-1}
                    style={{zIndex : zIndex ?? 10000}}
                    {...props}
                >
                    {/* DISMISS BUTTON */}
                    {isDismissible && onClose && (
                        <button
                            className="drawer-dismiss-button"
                            onClick={onClose}
                            aria-label="Close drawer"
                            tabIndex={0}
                        >
                            &times;
                        </button>
                    )}

                    <Div
                        className="drawer-content"
                        padding={padding}
                        bgColor={bgColor}
                        bgColour={bgColour}
                    >

                        {/* SR-ONLY DESCRIPTION */}
                        {description && (
                            <div id={descriptionId} className="sr-only">
                                {description}
                            </div>
                        )}

                        {/* CONTENT */}
                        <div role="document">
                            {children}
                        </div>
                    </Div>
                </Element>
            </>
        );
    },
);
Drawer.displayName = "Drawer";
