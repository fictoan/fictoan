// REACT CORE ==========================================================================================================
import React, { useEffect, useId, ReactNode } from "react";

// STYLES ==============================================================================================================
import "./tooltip.css";

// TYPES ===============================================================================================================
type Position = "top" | "bottom" | "left" | "right";
type ShowOn = "click" | "hover";

export interface TooltipProps {
    children     : ReactNode;
    isTooltipFor : string;
    showOn     ? : ShowOn;
    position   ? : Position;
    zIndex     ? : number;
}

// COMPONENT ===========================================================================================================
// Each Tooltip is its own popover. Show/hide goes through the native popover
// API; placement uses CSS anchor positioning (anchor-name / position-anchor +
// position-area), so there's no JS getBoundingClientRect math, no scroll/resize
// listeners, no shared singleton DOM node.
export const Tooltip = ({
    children,
    isTooltipFor,
    showOn   = "hover",
    position = "top",
    zIndex,
}: TooltipProps) => {
    const reactId   = useId();
    const tooltipId = `tooltip-${reactId.replace(/:/g, "")}`;
    const anchorName = `--anchor-${reactId.replace(/:/g, "")}`;

    useEffect(() => {
        const target = document.getElementById(isTooltipFor);
        const tooltip = document.getElementById(tooltipId) as HTMLElement | null;
        if (!target || !tooltip) return;

        // Brand the target as the anchor. We set this dynamically rather than
        // requiring the caller to add the anchor-name themselves.
        target.style.setProperty("anchor-name", anchorName);

        const show = () => {
            if (!tooltip.matches(":popover-open")) tooltip.showPopover();
        };
        const hide = () => {
            if (tooltip.matches(":popover-open")) tooltip.hidePopover();
        };
        const toggle = () => (tooltip.matches(":popover-open") ? hide() : show());

        const cleanups: Array<() => void> = [];

        if (showOn === "hover") {
            // Pointer + keyboard parity. focusin/focusout cover keyboard users
            // who tab to the target.
            target.addEventListener("mouseenter", show);
            target.addEventListener("mouseleave", hide);
            target.addEventListener("focusin", show);
            target.addEventListener("focusout", hide);
            cleanups.push(() => {
                target.removeEventListener("mouseenter", show);
                target.removeEventListener("mouseleave", hide);
                target.removeEventListener("focusin", show);
                target.removeEventListener("focusout", hide);
            });
        } else {
            // click: toggle on target click, close on click anywhere else
            // (manual light-dismiss because popover="auto" interacts badly with
            // re-toggling from the same target).
            target.addEventListener("click", toggle);
            const handleOutside = (e: MouseEvent) => {
                const node = e.target as Node;
                if (node === target || target.contains(node) || tooltip.contains(node)) return;
                hide();
            };
            const handleEscape = (e: KeyboardEvent) => {
                if (e.key === "Escape") hide();
            };
            document.addEventListener("click", handleOutside);
            document.addEventListener("keydown", handleEscape);
            cleanups.push(() => {
                target.removeEventListener("click", toggle);
                document.removeEventListener("click", handleOutside);
                document.removeEventListener("keydown", handleEscape);
            });
        }

        return () => {
            cleanups.forEach((fn) => fn());
            target.style.removeProperty("anchor-name");
        };
    }, [ isTooltipFor, showOn, tooltipId, anchorName ]);

    return (
        <div
            id={tooltipId}
            data-tooltip
            data-position={position}
            popover="manual"
            role="tooltip"
            style={{
                // CSS anchor positioning: tie this popover to the target's anchor-name.
                ["positionAnchor" as keyof React.CSSProperties]: anchorName,
                ...(zIndex !== undefined ? { zIndex } : {}),
            } as React.CSSProperties}
        >
            {children}
        </div>
    );
};
