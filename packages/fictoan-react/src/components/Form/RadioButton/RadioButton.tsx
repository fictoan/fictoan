// REACT CORE ==========================================================================================================
import React, { useMemo } from "react";

// LOCAL COMPONENTS ====================================================================================================
import { Element } from "$element";
import { FormItem, deriveAriaIds } from "../FormItem/FormItem";
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

        const reactId = React.useId();
        const finalId = id || `radio-${reactId.replace(/:/g, "")}`;
        const { describedBy } = deriveAriaIds(finalId, helpText, errorText);

        // The native <input type="radio"> below already has role="radio". The
        // wrapper div used to duplicate that role, which made AT announce two
        // radios per RadioButton — left as a plain wrapper now.
        return (
            <Element<RadioButtonElementType>
                as="div"
                data-radio-button
                ref={ref}
                aria-disabled={disabled}
                className={labelFirst ? "label-first" : undefined}
                {...wrapperProps}
            >
                <FormItem
                    label={label}
                    htmlFor={finalId}
                    helpText={helpText}
                    errorText={errorText}
                    required={required}
                    labelFirst={labelFirst}
                >
                    <Element
                        as="input"
                        type="radio"
                        id={finalId}
                        name={derivedName}
                        value={value}
                        checked={checked}
                        disabled={disabled}
                        required={required}
                        aria-invalid={Boolean(errorText) || undefined}
                        aria-required={required}
                        aria-describedby={describedBy}
                        onChange={handleChange}
                        {...inputProps}
                    />
                    <Element
                        as={labelFirst ? "label" : "div"}
                        htmlFor={labelFirst ? finalId : undefined}
                        data-radio
                    />
                </FormItem>
            </Element>
        );
    }
);
RadioButton.displayName = "RadioButton";
