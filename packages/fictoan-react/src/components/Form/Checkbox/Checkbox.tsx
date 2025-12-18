// REACT CORE ==========================================================================================================
import React, { useMemo } from "react";

// LOCAL COMPONENTS ====================================================================================================
import { Element } from "$element";

// UTILS ===============================================================================================================
import { separateFictoanFromHTMLProps } from "$utils/propSeparation";

// INPUT ===============================================================================================================
import { BaseInputComponent } from "../BaseInputComponent/BaseInputComponent";
import { BaseInputComponentProps } from "../BaseInputComponent/constants";

// STYLES ==============================================================================================================
import "./checkbox.css";

export type CheckboxElementType = HTMLInputElement;
export type CheckboxProps = Omit<BaseInputComponentProps<CheckboxElementType>,
    "as" | "onChange" | "value"> & {
        checked        ? : boolean;
        onChange       ? : (checked: boolean) => void;
        defaultChecked ? : boolean;
};

// TODO: Fix required indicator that clashes with tick because both use the same `label::after` setup.

// COMPONENT ///////////////////////////////////////////////////////////////////////////////////////////////////////////
export const Checkbox = React.forwardRef(
    ({ id, name, onChange, checked, defaultChecked, ...props }: CheckboxProps, ref: React.Ref<CheckboxElementType>) => {
        // Use ID as default for name and value if they’re not provided
        const derivedName = useMemo(() => name || id, [name, id]);

        // Handle the change event to return boolean instead of event
        const handleChange = (value: string) => {
            // Since we’re dealing with a checkbox, the value parameter isn’t relevant
            // Instead, we need to check the current checked state
            const isChecked = !checked;
            onChange?.(isChecked);
        };

        // Separate Fictoan props from HTML props
        const { fictoanProps, htmlProps } = separateFictoanFromHTMLProps({ ...props });
        const finalSize = fictoanProps.size || "medium";

        return (
            <BaseInputComponent<CheckboxElementType>
                    as="input"
                    type="checkbox"
                    id={id}
                    name={derivedName}
                    checked={checked}
                    defaultChecked={defaultChecked}
                    onValueChange={handleChange}
                    {...htmlProps}
            >
                <Element<CheckboxElementType>
                    as="div"
                    data-checkbox
                    ref={ref}
                    className={`size-${finalSize}`}
                />
            </BaseInputComponent>
        );
    }
);
Checkbox.displayName = "Checkbox";
