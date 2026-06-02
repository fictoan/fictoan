// FRAMEWORK ===========================================================================================================
import React from "react";

// FICTOAN =============================================================================================================
import { Element } from "../Element";

// STYLES ==============================================================================================================
import "./table.css";

// TYPES ===============================================================================================================
import { CommonAndHTMLProps } from "../Element/constants";

// prettier-ignore
export interface TableCustomProps {
    bordersFor          ? : "rows" | "columns" | "both";
    alignText           ? : "left" | "right" | "centre" | "center";
    isStriped           ? : boolean;
    highlightRowOnHover ? : boolean;
    isFullWidth         ? : boolean;
    caption             ? : string; // Accessible table caption
    summary             ? : string; // Description of table structure for complex tables
}

export type TableElementType = HTMLTableElement;
export type TableProps = Omit<CommonAndHTMLProps<TableElementType>, keyof TableCustomProps> & TableCustomProps;

// COMPONENT ///////////////////////////////////////////////////////////////////////////////////////////////////////////
export const Table = React.forwardRef(
    (
        {
            bordersFor,
            isStriped,
            highlightRowOnHover,
            isFullWidth,
            alignText,
            caption,
            summary,
            children,
            ...props
        }: TableProps,
        ref: React.Ref<TableElementType>
    ) => {
        let classNames = [];

        if (bordersFor) {
            classNames.push(`bordered-${bordersFor}`);
        }

        if (isStriped) {
            classNames.push("striped");
        }

        if (highlightRowOnHover) {
            classNames.push("hoverable");
        }

        if (isFullWidth) {
            classNames.push("full-width");
        }

        if (alignText) {
            classNames.push(`align-text-${alignText}`);
        }

        // No aria-rowcount / aria-colcount: those are for virtualised/paginated tables where the
        // DOM holds only a subset of rows. This Table renders all children, so the native <table>
        // semantics convey the counts — deriving them from arbitrary children was wrong anyway
        // (counted thead+tbody as 2 rows; colcount was dead for any multi-section table).
        return (
            <Element<TableElementType>
                as="table"
                classNames={classNames}
                ref={ref}
                role="table"
                summary={summary}
                {...props}
            >
                {caption && <caption>{caption}</caption>}
                {children}
            </Element>
        );
    }
);
Table.displayName = "Table";
