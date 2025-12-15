// REACT CORE ==========================================================================================================
import React, { useEffect, useRef } from "react";

// HOOKS ===============================================================================================================
import { useClickOutside } from "$hooks/UseClickOutside";

// ELEMENT =============================================================================================================
import { CommonAndHTMLProps, SpacingTypes } from "../Element/constants";
import { Element } from "$element";

// STYLES ==============================================================================================================
import "./drawer.css";

// OTHER ===============================================================================================================
import { Div } from "$tags";

export interface DrawerCustomProps {
        id                    : string;
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
            ...(showOverlay ? [ "with-overlay" ] : []),
            ...(blurOverlay ? [ "blur-overlay" ] : []),
            ...classNames,
        ];

        // Handle Escape key
        useEffect(() => {
            const handleEscape = (e : KeyboardEvent) => {
                if (e.key === "Escape" && isDismissible) {
                    const drawer = document.querySelector(`#${id}[data-drawer]`);
                    if (drawer?.classList.contains("open")) {
                        hideDrawer(id);
                    }
                }
            };

            document.addEventListener("keydown", handleEscape);
            return () => document.removeEventListener("keydown", handleEscape);
        }, [ id, isDismissible ]);

        // Handle click outside
        useClickOutside(effectiveRef, () => {
            if (closeOnClickOutside && isDismissible) {
                const drawer = effectiveRef.current;
                if (drawer?.classList.contains("open")) {
                    hideDrawer(id);
                }
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
                        className={`drawer-overlay ${blurOverlay ? "blur" : ""}`}
                        data-drawer-overlay-for={id}
                        aria-hidden="true"
                        onClick={closeOnClickOutside && isDismissible ? () => hideDrawer(id) : undefined}
                        style={{ zIndex: zIndex ?? 10000 - 1 }}
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
                    style={{ zIndex: zIndex ?? 10000 }}
                    {...props}
                >
                    {/* DISMISS BUTTON */}
                    {isDismissible && (
                        <button
                            className="drawer-dismiss-button"
                            onClick={() => hideDrawer(id)}
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

// DRAWER METHODS //////////////////////////////////////////////////////////////////////////////////////////////////////
export const showDrawer = (drawerId : string) => {
    const drawer = document.querySelector(`#${drawerId}[data-drawer]`) as HTMLElement;
    const overlay = document.querySelector(`[data-drawer-overlay-for="${drawerId}"]`) as HTMLElement;

    if (drawer) {
        // Remove closing class if it exists
        drawer.classList.remove("closing");
        drawer.classList.add("open");

        // Show overlay
        if (overlay) {
            overlay.classList.add("visible");
        }

        // Focus management
        drawer.focus();

        // Store the element that triggered the drawer
        const activeElement = document.activeElement as HTMLElement;
        if (activeElement) {
            drawer.setAttribute("data-trigger-element", activeElement.id || "");
        }

        // Prevent body scroll
        document.body.style.overflow = "hidden";
    }
};

export const hideDrawer = (drawerId : string) => {
    const drawer = document.querySelector(`#${drawerId}[data-drawer]`) as HTMLElement;
    const overlay = document.querySelector(`[data-drawer-overlay-for="${drawerId}"]`) as HTMLElement;

    if (drawer && drawer.classList.contains("open")) {
        // Add closing class for animation
        drawer.classList.add("closing");
        drawer.classList.remove("open");

        // Hide overlay
        if (overlay) {
            overlay.classList.remove("visible");
        }

        // Restore body scroll
        document.body.style.overflow = "";

        // Return focus to trigger element
        const triggerId = drawer.getAttribute("data-trigger-element");
        if (triggerId) {
            const triggerElement = document.getElementById(triggerId);
            if (triggerElement) {
                triggerElement.focus();
            }
        }
    }
};

export const toggleDrawer = (drawerId : string) => {
    const drawer = document.querySelector(`#${drawerId}[data-drawer]`);
    if (drawer) {
        drawer.classList.contains("open") ? hideDrawer(drawerId) : showDrawer(drawerId);
    }
};

export const closeAllDrawers = () => {
    const openDrawers = document.querySelectorAll("[data-drawer].open");
    openDrawers.forEach((drawer) => {
        if (drawer.id) {
            hideDrawer(drawer.id);
        }
    });
};

export const isDrawerOpen = (drawerId : string) : boolean => {
    const drawer = document.querySelector(`#${drawerId}[data-drawer]`);
    return drawer ? drawer.classList.contains("open") : false;
};