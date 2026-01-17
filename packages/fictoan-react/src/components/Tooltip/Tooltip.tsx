// REACT CORE ==========================================================================================================
import React, { useEffect, useRef, ReactNode } from "react";
import { createRoot, Root } from "react-dom/client";

// STYLES ==============================================================================================================
import "./tooltip.css";

// TYPES ===============================================================================================================
type Position = "top" | "bottom" | "left" | "right";
type ShowOn = "click" | "hover";

interface TooltipConfig {
    content  : ReactNode;
    position : Position;
    showOn   : ShowOn;
    zIndex   : number;
}

export interface TooltipProps {
    children     : ReactNode;
    isTooltipFor : string;
    showOn     ? : ShowOn;
    position   ? : Position;
    zIndex     ? : number;
}

// CONSTANTS ===========================================================================================================
const TOOLTIP_OFFSET = 8;
const SCREEN_PADDING = 16;

// MODULE-LEVEL SINGLETON ==============================================================================================
let singletonContainer : HTMLDivElement | null = null;
let singletonRoot      : Root | null = null;
let isInitialized      = false;
let activeTargetId     : string | null = null;
let activeTarget       : HTMLElement | null = null;

const registry = new Map<string, TooltipConfig>();

// POSITIONING =========================================================================================================
const calculatePosition = (
    tooltipElement: HTMLElement,
    targetElement: HTMLElement,
    position: Position,
) => {
    const tooltipRect    = tooltipElement.getBoundingClientRect();
    const targetRect     = targetElement.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    const viewportWidth  = window.innerWidth;

    let top: number;
    let left: number;

    switch (position) {
        case "top":
            top  = targetRect.top - tooltipRect.height - TOOLTIP_OFFSET;
            left = targetRect.left + (targetRect.width - tooltipRect.width) / 2;
            if (top < SCREEN_PADDING) {
                top = targetRect.bottom + TOOLTIP_OFFSET;
            }
            break;
        case "bottom":
            top  = targetRect.bottom + TOOLTIP_OFFSET;
            left = targetRect.left + (targetRect.width - tooltipRect.width) / 2;
            if (top + tooltipRect.height > viewportHeight - SCREEN_PADDING) {
                top = targetRect.top - tooltipRect.height - TOOLTIP_OFFSET;
            }
            break;
        case "left":
            top  = targetRect.top + (targetRect.height - tooltipRect.height) / 2;
            left = targetRect.left - tooltipRect.width - TOOLTIP_OFFSET;
            if (left < SCREEN_PADDING) {
                left = targetRect.right + TOOLTIP_OFFSET;
            }
            break;
        case "right":
            top  = targetRect.top + (targetRect.height - tooltipRect.height) / 2;
            left = targetRect.right + TOOLTIP_OFFSET;
            if (left + tooltipRect.width > viewportWidth - SCREEN_PADDING) {
                left = targetRect.left - tooltipRect.width - TOOLTIP_OFFSET;
            }
            break;
        default:
            top  = targetRect.top - tooltipRect.height - TOOLTIP_OFFSET;
            left = targetRect.left + (targetRect.width - tooltipRect.width) / 2;
    }

    // Ensure tooltip stays within viewport bounds
    if (left < SCREEN_PADDING) {
        left = SCREEN_PADDING;
    } else if (left + tooltipRect.width > viewportWidth - SCREEN_PADDING) {
        left = viewportWidth - tooltipRect.width - SCREEN_PADDING;
    }

    if (top < SCREEN_PADDING) {
        top = SCREEN_PADDING;
    } else if (top + tooltipRect.height > viewportHeight - SCREEN_PADDING) {
        top = viewportHeight - tooltipRect.height - SCREEN_PADDING;
    }

    return { top, left };
};

// TOOLTIP CONTENT COMPONENT ===========================================================================================
interface TooltipContentProps {
    content   : ReactNode;
    isVisible : boolean;
    position  : { top: number; left: number };
    zIndex    : number;
}

const TooltipContent = ({ content, isVisible, position, zIndex }: TooltipContentProps) => (
    <div
        data-tooltip
        className={isVisible ? "visible" : ""}
        role="tooltip"
        style={{
            position : "fixed",
            zIndex   : zIndex,
            top      : `${position.top}px`,
            left     : `${position.left}px`,
        }}
    >
        {content}
    </div>
);

// RENDER FUNCTIONS ====================================================================================================
const renderTooltip = (config: TooltipConfig | null, target: HTMLElement | null) => {
    if (!singletonRoot || !singletonContainer) return;

    if (!config || !target) {
        singletonRoot.render(
            <TooltipContent content={null} isVisible={false} position={{ top: -9999, left: -9999 }} zIndex={100000} />
        );
        return;
    }

    // First render hidden to measure
    singletonRoot.render(
        <TooltipContent content={config.content} isVisible={false} position={{ top: -9999, left: -9999 }} zIndex={config.zIndex} />
    );

    // Calculate position after render
    requestAnimationFrame(() => {
        if (!singletonContainer || !target) return;
        const tooltipEl = singletonContainer.firstElementChild as HTMLElement;
        if (!tooltipEl) return;

        const { top, left } = calculatePosition(tooltipEl, target, config.position);
        singletonRoot?.render(
            <TooltipContent content={config.content} isVisible={true} position={{ top, left }} zIndex={config.zIndex} />
        );
    });
};

const updatePosition = () => {
    if (!activeTargetId || !activeTarget) return;
    const config = registry.get(activeTargetId);
    if (config) {
        renderTooltip(config, activeTarget);
    }
};

const showTooltip = (targetId: string, target: HTMLElement) => {
    const config = registry.get(targetId);
    if (!config) return;

    activeTargetId = targetId;
    activeTarget = target;
    renderTooltip(config, target);
};

const hideTooltip = (targetId?: string) => {
    if (targetId && activeTargetId !== targetId) return;
    activeTargetId = null;
    activeTarget = null;
    renderTooltip(null, null);
};

// EVENT HANDLERS ======================================================================================================
const handleMouseOver = (e: MouseEvent) => {
    const target = (e.target as HTMLElement).closest("[id]") as HTMLElement;
    if (!target?.id) return;

    const config = registry.get(target.id);
    if (config?.showOn === "hover") {
        showTooltip(target.id, target);
    }
};

const handleMouseOut = (e: MouseEvent) => {
    const target = (e.target as HTMLElement).closest("[id]") as HTMLElement;
    if (!target?.id) return;

    const config = registry.get(target.id);
    if (config?.showOn === "hover") {
        hideTooltip(target.id);
    }
};

const handleClick = (e: MouseEvent) => {
    // Check if click is inside the tooltip itself
    if (singletonContainer?.contains(e.target as Node)) {
        return;
    }

    const target = (e.target as HTMLElement).closest("[id]") as HTMLElement;

    // Check if click is on a registered click-trigger element
    if (target?.id) {
        const config = registry.get(target.id);
        if (config?.showOn === "click") {
            if (activeTargetId === target.id) {
                hideTooltip();
            } else {
                showTooltip(target.id, target);
            }
            return;
        }
    }

    // Click outside - hide any active click tooltip
    if (activeTargetId) {
        const activeConfig = registry.get(activeTargetId);
        if (activeConfig?.showOn === "click") {
            hideTooltip();
        }
    }
};

// INITIALIZATION ======================================================================================================
const initializeSingleton = () => {
    if (typeof document === "undefined") return;

    // Check if container still exists in DOM (might be removed after navigation)
    const existingContainer = document.getElementById("fictoan-tooltip-singleton");
    if (existingContainer && isInitialized) {
        singletonContainer = existingContainer as HTMLDivElement;
        return;
    }

    // Reset if container was removed or never created
    isInitialized = false;
    singletonContainer = null;
    singletonRoot = null;

    // Create container
    singletonContainer = document.createElement("div");
    singletonContainer.id = "fictoan-tooltip-singleton";
    document.body.appendChild(singletonContainer);

    // Create React root
    singletonRoot = createRoot(singletonContainer);

    // Initial render (hidden)
    singletonRoot.render(
        <TooltipContent content={null} isVisible={false} position={{ top: -9999, left: -9999 }} zIndex={100000} />
    );

    // Set up event delegation
    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseout", handleMouseOut);
    document.addEventListener("click", handleClick);
    window.addEventListener("scroll", updatePosition, true);
    window.addEventListener("resize", updatePosition);

    isInitialized = true;
};

// COMPONENT ===========================================================================================================
export const Tooltip = ({
    children,
    isTooltipFor,
    showOn = "hover",
    position = "top",
    zIndex = 100000,
}: TooltipProps) => {
    const configRef = useRef<TooltipConfig>({ content: children, position, showOn, zIndex });

    // Update ref when props change
    configRef.current = { content: children, position, showOn, zIndex };

    useEffect(() => {
        // Initialize singleton on first mount
        initializeSingleton();

        // Register this tooltip
        registry.set(isTooltipFor, configRef.current);

        // If this tooltip is currently active, update its content
        if (activeTargetId === isTooltipFor && activeTarget) {
            renderTooltip(configRef.current, activeTarget);
        }

        return () => {
            registry.delete(isTooltipFor);
            // Hide if this was the active tooltip
            if (activeTargetId === isTooltipFor) {
                hideTooltip();
            }
        };
    }, [isTooltipFor]);

    // Update registry when content/position/showOn/zIndex changes
    useEffect(() => {
        registry.set(isTooltipFor, configRef.current);

        // If this tooltip is currently active, update it
        if (activeTargetId === isTooltipFor && activeTarget) {
            renderTooltip(configRef.current, activeTarget);
        }
    }, [children, position, showOn, zIndex, isTooltipFor]);

    // Renders nothing - the singleton renders the actual tooltip
    return null;
};
