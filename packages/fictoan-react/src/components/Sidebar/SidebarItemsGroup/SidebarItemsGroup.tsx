// REACT CORE ==========================================================================================================
import React from "react";

// LOCAL COMPONENTS ====================================================================================================
import { CommonAndHTMLProps } from "../../Element/constants";
import { Element } from "$element";

// STYLES ==============================================================================================================
import "./sidebar-items-group.css";

// prettier-ignore
export interface SidebarItemsGroupCustomProps {
    title ? : string;
}

export type SidebarItemsGroupElementType = HTMLDivElement;
export type SidebarItemsGroupNewProps = Omit<CommonAndHTMLProps<SidebarItemsGroupElementType>,
    keyof SidebarItemsGroupCustomProps> & SidebarItemsGroupCustomProps;

export const SidebarItemsGroup = React.forwardRef(
    (
        {
            title,
            children,
            ...props
        }: SidebarItemsGroupNewProps, forwardedRef: React.Ref<SidebarItemsGroupElementType>) => {

        return (
            <Element<SidebarItemsGroupElementType>
                as="nav"
                data-sidebar-items-group
                ref={forwardedRef}
                {...props}
            >
                {title && <p className="group-title">{title}</p>}
                {children}
            </Element>
        );
    },
);
SidebarItemsGroup.displayName = "SidebarItemsGroup";
