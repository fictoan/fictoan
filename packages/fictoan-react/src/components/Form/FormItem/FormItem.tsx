// REACT CORE ==========================================================================================================
import React from "react";

// ELEMENT =============================================================================================================
import { CommonAndHTMLProps, SpacingTypes } from "../../Element/constants";
import { Element } from "$element";

// STYLES ==============================================================================================================
import "./form-item.css";

export type FormItemElementType = HTMLDivElement;
export type FormItemProps = CommonAndHTMLProps<FormItemElementType> & {
    size?: Exclude<SpacingTypes, "nano" | "huge">;
};

// COMPONENT ///////////////////////////////////////////////////////////////////////////////////////////////////////////
export const FormItem = React.forwardRef(({ size, ...props }: FormItemProps, ref: React.Ref<FormItemElementType>) => {
    return (
        <Element<FormItemElementType>
            as="div"
            data-form-item
            ref={ref}
            role="group"
            className={size ? `size-${size}` : undefined}
            {...props}
        />
    );
});
