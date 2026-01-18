// REACT CORE ==========================================================================================================
import React from "react";

// LOCAL COMPONENTS ====================================================================================================
import { CommonAndHTMLProps } from "../Element/constants";
import { Element } from "$element";

// STYLES ==============================================================================================================
import "./card.css";

export type CardElementType = HTMLDivElement;

export interface CardCustomProps {
    heading ? : string;
}

export type CardProps = CommonAndHTMLProps<CardElementType> & CardCustomProps;

// COMPONENT ///////////////////////////////////////////////////////////////////////////////////////////////////////////
export const Card = React.forwardRef((
    {shape, heading, children, ...props} : CardProps, ref : React.Ref<CardElementType>) => {
    let classNames = [];

    if (shape) {
        classNames.push(`shape-${shape}`);
    }

    return (
        <Element<CardElementType>
            as="div"
            data-card
            ref={ref}
            classNames={classNames}
            role="region"
            aria-label={heading}
            tabIndex={0}
            {...props}
        >
            {children}
        </Element>
    );
});
Card.displayName = "Card";
