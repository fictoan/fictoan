// REACT CORE ==========================================================================================================
import React, { useRef, useImperativeHandle } from "react";

// HOOKS ===============================================================================================================
import { useClickOutside } from "../../../hooks/UseClickOutside";

// ELEMENT =============================================================================================================
import { CommonAndHTMLProps } from "../../Element/constants";

// STYLES ==============================================================================================================
import "./sidebar-wrapper.css";

// OTHER ===============================================================================================================
import { Element } from "$element";

// prettier-ignore
export interface SidebarWrapperCustomProps {
        collapsed           ? : boolean;
        closeOnClickOutside ? : () => void;
        showMobileSidebar   ? : boolean;
}

export type SidebarWrapperElementType = HTMLDivElement;
export type SidebarWrapperNewProps = Omit<CommonAndHTMLProps<SidebarWrapperElementType>,
    keyof SidebarWrapperCustomProps> & SidebarWrapperCustomProps;

export const SidebarWrapper = React.forwardRef(
    (
        {
            collapsed,
            closeOnClickOutside,
            showMobileSidebar,
            ...props
        }: SidebarWrapperNewProps, forwardedRef: React.Ref<SidebarWrapperElementType>) => {

        const internalRef = useRef<HTMLDivElement>(null);

        // @ts-ignore
        useImperativeHandle(forwardedRef, () => internalRef.current);

        useClickOutside(internalRef, () => {
            if (typeof closeOnClickOutside === "function") {
                closeOnClickOutside();
            }
        });

        let classNames = [];

        if (collapsed) {
            classNames.push("collapsed");
        }

        if (showMobileSidebar) {
            classNames.push("show-sidebar");
        }

        return (
            <Element<SidebarWrapperElementType>
                as="aside"
                data-sidebar-wrapper
                ref={internalRef}
                classNames={classNames}
                {...props}
            />
        );
    },
);
SidebarWrapper.displayName = "SidebarWrapper";
