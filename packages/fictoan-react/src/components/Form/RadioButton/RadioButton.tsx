// REACT CORE ==========================================================================================================
import React, { useMemo } from "react";

// INPUT ===============================================================================================================
import { BaseInputComponent } from "../BaseInputComponent/BaseInputComponent";

// STYLES ==============================================================================================================
import "./radio-button.css";

// OTHER ===============================================================================================================
import { Element } from "$element";
import { RadioButtonProps, RadioButtonElementType } from "./constants";

// COMPONENT ///////////////////////////////////////////////////////////////////////////////////////////////////////////
export const RadioButton = React.forwardRef(
    ({
         id,
         name,
         value,
         onChange,
         checked,
         ...props
     }: RadioButtonProps,
     ref: React.Ref<RadioButtonElementType>,
    ) => {
        const derivedName = useMemo(() => name || id, [name, id]);

        // Handle change events - BaseInputComponent will extract value from event
        // We override with custom logic to only emit when radio is checked
        const handleChange = (extractedValue: string) => {
            // BaseInputComponent passes the extracted value
            // For radio buttons, we only call onChange when this specific button is being checked
            // The extractedValue will be this radio's value
            if (extractedValue === value && onChange) {
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
                aria-disabled={props.disabled}
            >
                <BaseInputComponent
                    as="input"
                    type="radio"
                    id={id}
                    name={derivedName}
                    value={value}
                    checked={checked}
                    onChange={handleChange}
                    {...props}
                />
            </Element>
        );
    },
);
RadioButton.displayName = "RadioButton";
