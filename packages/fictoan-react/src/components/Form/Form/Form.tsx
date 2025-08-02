// REACT CORE ==========================================================================================================
import React from "react";

// ELEMENT =============================================================================================================
import { CommonAndHTMLProps, SpacingTypes } from "../../Element/constants";
import { Element } from "$element";

// STYLES ==============================================================================================================
import "./form.css";

// OTHER ===============================================================================================================
import { Callout } from "$/components";
import { FormFieldsConfig, generateFormThroughConfig } from "./FormGenerator";

// prettier-ignore
export interface FormCustomProps {
        spacing        ? : SpacingTypes;
        fields         ? : FormFieldsConfig[];
        onFieldsChange ? : (values: Record<string, any>) => void;
        errorText      ? : string;
}

export type FormElementType = HTMLFormElement;
export type FormProps = Omit<CommonAndHTMLProps<FormElementType>, keyof FormCustomProps> &
    FormCustomProps;

// COMPONENT ///////////////////////////////////////////////////////////////////////////////////////////////////////////
export const Form = React.forwardRef(
    (
        { spacing = "small", fields, onFieldsChange, children, errorText, ...props }: FormProps,
        ref: React.Ref<FormElementType>
    ) => {
        let classNames = [];

        if (spacing) {
            classNames.push(`spacing-${spacing}`);
        }

        // Handle form field changes to provide direct values
        const handleFieldChange = (fieldName: string, value: any) => {
            if (onFieldsChange) {
                onFieldsChange({
                    [fieldName]: value
                });
            }
        };

        // Generate form fields if config is provided
        const formContent = fields?.length ? generateFormThroughConfig(fields, handleFieldChange, spacing) : children;

        return (
            <Element<FormElementType>
                as="form"
                data-form
                ref={ref}
                classNames={classNames}
                {...props}
            >
                {formContent}
                {errorText && <Callout kind="error">{errorText}</Callout>}
            </Element>
        );
    }
);
