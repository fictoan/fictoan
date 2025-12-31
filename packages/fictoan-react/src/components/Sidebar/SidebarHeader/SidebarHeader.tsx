// REACT CORE ==========================================================================================================
import React from "react";

// ELEMENT =============================================================================================================
import { CommonAndHTMLProps } from "../../Element/constants";

// STYLES ==============================================================================================================
import "./sidebar-header.css";

// OTHER ===============================================================================================================
import { Element } from "$element";

// prettier-ignore
export interface SidebarHeaderCustomProps {
        isSticky ? : boolean;
}

export type SidebarHeaderElementType = HTMLDivElement;
export type SidebarHeaderNewProps = Omit<CommonAndHTMLProps<SidebarHeaderElementType>, keyof SidebarHeaderCustomProps>
    & SidebarHeaderCustomProps;

export const SidebarHeader = React.forwardRef(
    ({ isSticky, ...props }: SidebarHeaderNewProps, ref: React.Ref<SidebarHeaderElementType>) => {
        let classNames = [];

        if (isSticky) {
            classNames.push("is-sticky");
        }

        return (
            <Element<SidebarHeaderElementType>
                as="header"
                data-sidebar-header
                ref={ref}
                classNames={classNames}
                {...props}
            />
        );
    }
);
SidebarHeader.displayName = "SidebarHeader";
