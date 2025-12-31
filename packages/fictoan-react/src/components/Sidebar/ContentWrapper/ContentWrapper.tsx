// REACT CORE ==========================================================================================================
import React from "react";

// ELEMENT =============================================================================================================
import { CommonAndHTMLProps } from "../../Element/constants";

// STYLES ==============================================================================================================
import "./content-wrapper.css";

// OTHER ===============================================================================================================
import { Element } from "$element";

export type ContentWrapperElementType = HTMLDivElement;
interface ContentWrapperCustomProps {
    label ? : string;
    // For aria-label
}
export type ContentWrapperProps = CommonAndHTMLProps<ContentWrapperElementType> & ContentWrapperCustomProps;

// COMPONENT ///////////////////////////////////////////////////////////////////////////////////////////////////////////
export const ContentWrapper = React.forwardRef(
    (
        { label, ...props }: ContentWrapperProps, ref: React.Ref<ContentWrapperElementType>) => {

        return (
            <Element<ContentWrapperElementType>
                as="main"
                data-content-wrapper
                ref={ref}
                role="main"
                aria-label={label || "Main content"}
                {...props}
            />
        );
    }
);
ContentWrapper.displayName = "ContentWrapper";
