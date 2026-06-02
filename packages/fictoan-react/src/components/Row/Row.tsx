// REACT CORE ==========================================================================================================
import React from "react";

// LOCAL COMPONENTS ====================================================================================================
import { CommonAndHTMLProps, SpacingTypes } from "../Element/constants";
import { Element } from "$element";

// STYLES ==============================================================================================================
import "./row.css";

interface RowCustomProps {
    layout                        ? : "grid" | "flexbox";
    gutters                       ? : SpacingTypes;
    retainLayoutOnTabletLandscape ? : boolean;
    retainLayoutOnTabletPortrait  ? : boolean;
    retainLayoutOnMobile          ? : boolean;
    retainLayoutAlways            ? : boolean;
    allowUltraWide                ? : boolean;
    equalisePortions              ? : boolean;
    groupLabel                    ? : string;
}

export type RowElementType = HTMLDivElement;
export type RowProps = Omit<CommonAndHTMLProps<RowElementType>, keyof RowCustomProps> & RowCustomProps;

// TODO: Fix fixed gutter widths

// COMPONENT //////////////////////////////////////////////////////////////////////////////////////////////////////////
export const Row = React.forwardRef(
    (
        {
            layout = "grid",
            gutters = "medium",
            retainLayoutOnTabletLandscape,
            retainLayoutOnTabletPortrait,
            retainLayoutOnMobile,
            retainLayoutAlways,
            allowUltraWide,
            equalisePortions,
            groupLabel,
            ...props
        } : RowProps,
        ref : React.Ref<RowElementType>,
    ) => {
        // CLASS NAMES -------------------------------------------------------------------------------------------------
        let classNames = [];

        // equalisePortions needs a flex Row, so it forces the flexbox layout
        // regardless of the `layout` prop.
        const resolvedLayout = equalisePortions ? "flexbox" : layout;

        if (resolvedLayout) {
            classNames.push(`layout-${resolvedLayout}`);
        }

        if (equalisePortions) {
            classNames.push("equalise-portions");
        }

        if (gutters) {
            classNames.push(gutters === "none" ? "no-gutters" : `${gutters}-gutters`);
        }

        if (retainLayoutOnTabletLandscape) {
            classNames.push("retain-layout-on-tablet-landscape");
        }

        if (retainLayoutOnTabletPortrait) {
            classNames.push("retain-layout-on-tablet-portrait");
        }

        if (retainLayoutOnMobile) {
            classNames.push("retain-layout-on-mobile");
        }

        if (retainLayoutAlways) {
            classNames.push("retain-layout-on-tablet-landscape");
            classNames.push("retain-layout-on-tablet-portrait");
            classNames.push("retain-layout-on-mobile");
        }

        if (allowUltraWide) {
            classNames.push("allow-ultra-wide");
        }

        // RENDER -----------------------------------------------------------------------------------------------------
        return (
            <Element<RowElementType>
                as="div"
                data-row
                ref={ref}
                classNames={[ classNames.join(" ") ]}
                marginBottom="tiny"
                // Row is a visual layout primitive, not a data grid — claiming role="grid"
                // demands role="row"/"gridcell" children it never has (axe aria-required-children).
                // Expose a named group only when the caller gives it a groupLabel.
                role={groupLabel ? "group" : undefined}
                aria-label={groupLabel}
                {...props}
            />
        );
    },
);
Row.displayName = "Row";
