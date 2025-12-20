// REACT CORE ==========================================================================================================
import React, { ReactNode } from "react";

// LOCAL COMPONENTS ====================================================================================================
import { CommonAndHTMLProps } from "../Element/constants";
import { Element } from "$element";

// STYLES ==============================================================================================================
import "./accordion.css";

// OTHER ===============================================================================================================
import { Text } from "../Typography/Text";

export interface AccordionCustomProps {
    isOpen   ? : boolean;
    summary    : ReactNode;
    children   : ReactNode;
}

export type AccordionElementType = HTMLDetailsElement;
export type AccordionProps =
    Omit<CommonAndHTMLProps<AccordionElementType>, keyof AccordionCustomProps>
    & AccordionCustomProps;

// COMPONENT ///////////////////////////////////////////////////////////////////////////////////////////////////////////
export const Accordion = React.forwardRef(
    ({summary, children, isOpen = false, ...props} : AccordionProps, ref : React.Ref<AccordionElementType>) => {

        return (
            <Element
                as="details"
                data-expandable-content
                ref={ref}
                {...props}
                open={isOpen}
                role="region"
                aria-labelledby="accordion-summary"
            >
                <summary
                    role="button"
                    tabIndex={0}
                    aria-controls="accordion-content"
                    aria-expanded={isOpen}
                >
                    {typeof summary === "string" ? <Text margin="none">{summary}</Text> : summary}
                </summary>
                {children}
            </Element>
        );
    },
);
Accordion.displayName = "Accordion";
