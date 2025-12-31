// REACT CORE ==========================================================================================================
import React from "react";

// LOCAL COMPONENTS ====================================================================================================
import { CommonAndHTMLProps } from "../../Element/constants";
import { Div } from "$tags";
import { Element } from "$element";

// STYLES ==============================================================================================================
import "./sidebar-item.css";

type BaseItemProps = {
    hasAlert ? : boolean;
}

type IconProps =
    | {
        hasEmptyIcon   : boolean;
        hasNoIcon    ? : never;
    } // If hasEmptyIcon is set, hasNoIcon can't be set
    | {
        hasEmptyIcon ? : never;
        hasNoIcon      : boolean;
    } // If hasNoIcon is set, hasEmptyIcon can't be set
    | {
        hasEmptyIcon ? : never;
        hasNoIcon    ? : never;
    } // Neither is set

export type SidebarItemCustomProps = BaseItemProps & IconProps;

export type SidebarItemElementType = HTMLDivElement;
export type SidebarItemNewProps = Omit<CommonAndHTMLProps<SidebarItemElementType>, keyof SidebarItemCustomProps> &
                                  SidebarItemCustomProps;

export const SidebarItem = React.forwardRef(
    (
        {hasAlert, hasEmptyIcon, hasNoIcon, children, ...props} : SidebarItemNewProps,
        ref : React.Ref<SidebarItemElementType>) => {
        let classNames = [];

        if (hasAlert) {
            classNames.push("has-alert");
        }

        if (hasEmptyIcon) {
            classNames.push("has-empty-icon");
        } else if (hasNoIcon) {
            classNames.push("has-no-icon");
        }

        return (
            <Element<SidebarItemElementType>
                as="div"
                data-sidebar-item
                ref={ref}
                classNames={classNames}
                {...props}
            >
                {hasEmptyIcon && <Div className="empty-icon-wrapper" />}
                {children}
            </Element>
        );
    },
);
SidebarItem.displayName = "SidebarItem";
