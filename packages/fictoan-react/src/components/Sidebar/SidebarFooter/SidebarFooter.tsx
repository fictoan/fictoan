// REACT CORE ==========================================================================================================
import React from "react";

// ELEMENT =============================================================================================================
import { CommonAndHTMLProps } from "../../Element/constants";

// STYLES ==============================================================================================================
import "./sidebar-footer.css";

// OTHER ===============================================================================================================
import { Element } from "$element";

// prettier-ignore
export interface SidebarFooterCustomProps {
        isSticky ? : boolean;
}

export type SidebarFooterElementType = HTMLDivElement;
export type SidebarFooterNewProps = Omit<CommonAndHTMLProps<SidebarFooterElementType>, keyof SidebarFooterCustomProps>
    & SidebarFooterCustomProps;

export const SidebarFooter = React.forwardRef(
    ({ isSticky, ...props }: SidebarFooterNewProps, ref: React.Ref<SidebarFooterElementType>) => {
        let classNames = [];

        if (isSticky) {
            classNames.push("is-sticky");
        }

        return (
            <Element<SidebarFooterElementType>
                as="footer"
                data-sidebar-footer
                ref={ref}
                classNames={classNames}
                {...props}
            />
        );
    });
