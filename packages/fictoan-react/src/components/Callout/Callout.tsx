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

        // Render the title visibly and label the callout by it (was aria-label only — invisible to sighted users).
        const reactId = React.useId();
        const titleId = title ? `callout-title-${reactId.replace(/:/g, "")}` : undefined;

        return (
            <Element<CalloutElementType>
                as="div"
                data-callout
                ref={ref}
                className={kind}
                role={roleMap[kind]}
                aria-live={kind === "error" || kind === "warning" ? "assertive" : "polite"}
                aria-labelledby={titleId}
                {...props}
            >
                {title && (
                    <p className="callout-title" id={titleId}>
                        {title}
                    </p>
                )}
                {children}
            </Element>
        );
    },
);
Callout.displayName = "Callout";
