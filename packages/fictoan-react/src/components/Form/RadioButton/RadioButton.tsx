// REACT CORE ==========================================================================================================
import React, { useMemo } from "react";

// LOCAL COMPONENTS ====================================================================================================
import { Element } from "$element";
import { FormItem } from "../FormItem/FormItem";
import { separateWrapperProps } from "../../../utils/propSeparation";

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
            labelFirst,
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

        // Separate wrapper-level props (margin, padding, etc.) from input-specific props
        const { wrapperProps, inputProps } = separateWrapperProps(props);

        return (
            <Element<RadioButtonElementType>
                as="div"
                data-radio-button
                ref={ref}
                role="radio"
                aria-checked={checked}
                aria-disabled={disabled}
                className={labelFirst ? "label-first" : undefined}
                {...wrapperProps}
            >
                <FormItem
                    label={label}
                    htmlFor={id}
                    helpText={helpText}
                    errorText={errorText}
                    required={required}
                    labelFirst={labelFirst}
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
                        {...inputProps}
                    />
                    <Element
                        as={labelFirst ? "label" : "div"}
                        htmlFor={labelFirst ? id : undefined}
                        data-radio
                    />
                </FormItem>
            </Element>
        );
    }
);
RadioButton.displayName = "RadioButton";
