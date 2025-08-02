// REACT CORE ==========================================================================================================
import React from "react";

// ELEMENT =============================================================================================================
import { CommonAndHTMLProps } from "../../Element/constants";
import { Element } from "$element";

// STYLES ==============================================================================================================
import "./form-item.css";

export type FormItemElementType = HTMLDivElement;
export type FormItemProps = CommonAndHTMLProps<FormItemElementType>;

// COMPONENT ///////////////////////////////////////////////////////////////////////////////////////////////////////////
export const FormItem = React.forwardRef(({ ...props }: FormItemProps, ref: React.Ref<FormItemElementType>) => {
    return (
        <Element<FormItemElementType>
            as="div"
            data-form-item
            ref={ref}
            role="group"
            {...props}
        />
    );
});
