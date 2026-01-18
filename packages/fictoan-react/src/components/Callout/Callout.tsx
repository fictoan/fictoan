// REACT CORE ==========================================================================================================
import React, { ReactNode } from "react";

// LOCAL COMPONENTS ====================================================================================================
import { CommonAndHTMLProps } from "../Element/constants";
import { Element } from "$element";

// STYLES ==============================================================================================================
import "./callout.css";

// prettier-ignore
export interface CalloutCustomProps {
    kind       : "info" | "success" | "warning" | "error";
    children   : ReactNode;
    title    ? : string;
}

export type CalloutElementType = HTMLDivElement;
export type CalloutProps = Omit<CommonAndHTMLProps<CalloutElementType>, keyof CalloutCustomProps> & CalloutCustomProps;

// COMPONENT ///////////////////////////////////////////////////////////////////////////////////////////////////////////
export const Callout = React.forwardRef(
    ({kind, children, title, ...props} : CalloutProps, ref : React.Ref<CalloutElementType>) => {
        const roleMap = {
            info    : "status",
            success : "status",
            warning : "alert",
            error   : "alert",
        };

        return (
            <Element<CalloutElementType>
                as="div"
                data-callout
                ref={ref}
                className={kind}
                role={roleMap[kind]}
                aria-live={kind === "error" || kind === "warning" ? "assertive" : "polite"}
                aria-label={title}
                {...props}
            >
                {children}
            </Element>
        );
    },
);
Callout.displayName = "Callout";
