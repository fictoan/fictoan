// REACT CORE ==========================================================================================================
import React from "react";

// UTILS ===============================================================================================================
import { createClassName } from "$utils/classNames";

// OTHER ===============================================================================================================
import { ElementProps } from "./constants";

// Spacing props accept a scale token OR an arbitrary CSS length. Tokens map to a
// utility class (stays in @layer fictoan, overridable); anything else is treated
// as a raw length and applied via inline style.
const SPACING_TOKENS = new Set<string>([
    "none", "nano", "micro", "tiny", "small", "medium", "large", "huge",
]);
const isSpacingToken = (value: string): boolean => SPACING_TOKENS.has(value);

// COMPONENT ///////////////////////////////////////////////////////////////////////////////////////////////////////////
// Internally typed against HTMLElement (the underlying forwardRef call can
// only carry one ref type). The exported cast below re-types `Element` as a
// generic component so `<Element<HTMLButtonElement>>` actually flows a button-
// typed ref through to consumers — `forwardRef` strips the generic K from the
// outer signature without this cast.
export const Element = React.forwardRef(
    <K extends HTMLElement>(
        {
            as : Component = "div",
            role,
            ariaLabel,
            tabIndex,
            onKeyDown,
            ...props
        }: ElementProps<K> & {
            role      ? : string;
            ariaLabel ? : string;
            tabIndex  ? : number;
            onKeyDown ? : (event: React.KeyboardEvent) => void;
        }, ref: React.Ref<HTMLElement>
    ) => {
        const {
            classNames = [],
            bgColor,
            bgColour,
            bgOpacity,
            borderColor,
            borderColour,
            borderOpacity,
            className,
            columns,
            fillColor,
            fillColour,
            gap,
            hideOnDesktop,
            hideOnMobile,
            hideOnTabletLandscape,
            hideOnTabletPortrait,
            horizontalMargin,
            horizontalPadding,
            horizontallyCenterThis,
            horizontallyCentreThis,
            inheritFormSpacing,
            isClickable,
            isFullHeight,
            isFullWidth,
            layoutAsFlexbox,
            layoutAsGrid,
            listVertically,
            listHorizontally,
            marginLeft,
            marginBottom,
            margin,
            marginRight,
            marginTop,
            opacity,
            paddingBottom,
            paddingLeft,
            padding,
            paddingRight,
            paddingTop,
            pushItemsToEnds,
            shadow,
            shape,
            showOnlyOnDesktop,
            showOnlyOnMobile,
            showOnlyOnTabletLandscape,
            showOnlyOnTabletPortrait,
            size,
            strokeColor,
            strokeColour,
            textColor,
            textColour,
            verticalMargin,
            verticalPadding,
            verticallyCenterItems,
            verticallyCentreItems,
            weight,
            style,
            ...minimalProps
        } = props;

        // Spacing props: a scale token emits a utility class; any other string is
        // treated as a raw CSS length and applied via inline style.
        const spacingClasses: string[] = [];
        const spacingStyle: Record<string, string> = {};
        const applySpacing = (
            value      : string | undefined,
            tokenClass : (token: string) => string,
            cssProps   : string[],
        ) => {
            if (!value) return;
            if (isSpacingToken(value)) {
                spacingClasses.push(tokenClass(value));
            } else {
                cssProps.forEach((prop) => { spacingStyle[prop] = value; });
            }
        };

        applySpacing(gap,               (t) => `gap-${t}`,                             ["gap"]);
        applySpacing(margin,            (t) => `margin-all-${t}`,                      ["margin"]);
        applySpacing(marginTop,         (t) => `margin-top-${t}`,                      ["marginTop"]);
        applySpacing(marginRight,       (t) => `margin-right-${t}`,                    ["marginRight"]);
        applySpacing(marginBottom,      (t) => `margin-bottom-${t}`,                   ["marginBottom"]);
        applySpacing(marginLeft,        (t) => `margin-left-${t}`,                     ["marginLeft"]);
        applySpacing(horizontalMargin,  (t) => `margin-right-${t} margin-left-${t}`,   ["marginLeft", "marginRight"]);
        applySpacing(verticalMargin,    (t) => `margin-top-${t} margin-bottom-${t}`,   ["marginTop", "marginBottom"]);
        applySpacing(padding,           (t) => `padding-all-${t}`,                     ["padding"]);
        applySpacing(paddingTop,        (t) => `padding-top-${t}`,                     ["paddingTop"]);
        applySpacing(paddingRight,      (t) => `padding-right-${t}`,                   ["paddingRight"]);
        applySpacing(paddingBottom,     (t) => `padding-bottom-${t}`,                  ["paddingBottom"]);
        applySpacing(paddingLeft,       (t) => `padding-left-${t}`,                    ["paddingLeft"]);
        applySpacing(horizontalPadding, (t) => `padding-right-${t} padding-left-${t}`, ["paddingLeft", "paddingRight"]);
        applySpacing(verticalPadding,   (t) => `padding-top-${t} padding-bottom-${t}`, ["paddingTop", "paddingBottom"]);

        // Build style object: user style + opacity custom properties + arbitrary spacing
        const computedStyle = {
            ...style,
            ...(bgOpacity && { "--bg-opacity": Number(bgOpacity) / 100 }),
            ...(borderOpacity && { "--border-opacity": Number(borderOpacity) / 100 }),
            ...spacingStyle,
        } as React.CSSProperties;

        return (
            <Component
                ref={ref}
                role={role}
                aria-label={ariaLabel}
                tabIndex={tabIndex}
                onKeyDown={onKeyDown}
                {...minimalProps}
                data-form-spaced={inheritFormSpacing || undefined}
                style={Object.keys(computedStyle).length > 0 ? computedStyle : undefined}
                className={createClassName(
                    [
                        className,
                        bgColor && `bg-${bgColor}`,
                        bgColour && `bg-${bgColour}`,
                        borderColor && `border-${borderColor}`,
                        borderColour && `border-${borderColour}`,
                        fillColor && `fill-${fillColor}`,
                        fillColour && `fill-${fillColour}`,
                        hideOnDesktop && "hide-on-desktop",
                        hideOnMobile && "hide-on-mobile",
                        hideOnTabletLandscape && "hide-on-tablet-landscape",
                        hideOnTabletPortrait && "hide-on-tablet-portrait",
                        horizontallyCenterThis && "horizontally-centre-this",
                        horizontallyCentreThis && "horizontally-centre-this",
                        isClickable && "is-clickable",
                        isFullHeight && "full-height",
                        isFullWidth && "full-width",
                        layoutAsFlexbox && "layout-flexbox",
                        layoutAsGrid && "layout-grid",
                        listVertically && "list-vertically",
                        listHorizontally && "list-horizontally",
                        opacity && `opacity-${opacity}`,
                        pushItemsToEnds && "push-to-ends",
                        shadow && `shadow-${shadow}`,
                        shape && `shape-${shape}`,
                        showOnlyOnDesktop && "show-only-on-desktop",
                        showOnlyOnMobile && "show-only-on-mobile",
                        showOnlyOnTabletLandscape && "show-only-on-tablet-landscape",
                        showOnlyOnTabletPortrait && "show-only-on-tablet-portrait",
                        size && `size-${size}`,
                        strokeColor && `stroke-${strokeColor}`,
                        strokeColour && `stroke-${strokeColour}`,
                        textColor && `text-${textColor}`,
                        textColour && `text-${textColour}`,
                        verticallyCenterItems && "vertically-centre-items",
                        verticallyCentreItems && "vertically-centre-items",
                        weight && `weight-${weight}`,
                    ].concat(spacingClasses, classNames),
                )}
            />
        );
    },
) as <K extends HTMLElement = HTMLElement>(
    props: ElementProps<K> & {
        role      ? : string;
        ariaLabel ? : string;
        tabIndex  ? : number;
        onKeyDown ? : React.KeyboardEventHandler<K>;
        ref       ? : React.Ref<K>;
    },
) => React.ReactElement;
(Element as any).displayName = "Element";
