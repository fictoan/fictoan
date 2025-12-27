// REACT CORE ==========================================================================================================
import React, { useMemo } from "react";

// LOCAL COMPONENTS ====================================================================================================
import { Element } from "$element";
import { FormItem } from "../FormItem/FormItem";

// STYLES ==============================================================================================================
import "./radio-button.css";

// OTHER ===============================================================================================================
import { RadioButtonProps, RadioButtonElementType } from "./constants";

// COMPONENT ///////////////////////////////////////////////////////////////////////////////////////////////////////////
export const RadioButton = React.forwardRef(
    (
        {
            id,
            name,
            value,
            label,
            helpText,
            errorText,
            onChange,
            checked,
            disabled,
            required,
            ...props
        }: RadioButtonProps,
        ref: React.Ref<RadioButtonElementType>
    ) => {
        const derivedName = useMemo(() => name || id, [name, id]);

        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            if (e.target.checked && onChange) {
                onChange(value);
            }
        };

        return (
            <Element<RadioButtonElementType>
                as="div"
                data-radio-button
                ref={ref}
                role="radio"
                aria-checked={checked}
                aria-disabled={disabled}
            >
                <FormItem
                    label={label}
                    htmlFor={id}
                    helpText={helpText}
                    errorText={errorText}
                    required={required}
                >
                    <Element
                        as="input"
                        type="radio"
                        id={id}
                        name={derivedName}
                        value={value}
                        checked={checked}
                        disabled={disabled}
                        required={required}
                        onChange={handleChange}
                        {...props}
                    />
                </FormItem>
            </Element>
        );
    }
);
RadioButton.displayName = "RadioButton";
