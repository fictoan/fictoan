// REACT CORE ==========================================================================================================
import React, { useMemo } from "react";

// LOCAL COMPONENTS ====================================================================================================
import { Element } from "$element";
import { FormItem } from "../FormItem/FormItem";
import { SpacingTypes } from "../../Element/constants";

// STYLES ==============================================================================================================
import "./checkbox.css";

// TYPES ===============================================================================================================
import { InputLabelCustomProps } from "../InputLabel/InputLabel";

export type CheckboxElementType = HTMLInputElement;
export type CheckboxProps = InputLabelCustomProps & {
    id?: string;
    name?: string;
    checked?: boolean;
    defaultChecked?: boolean;
    disabled?: boolean;
    required?: boolean;
    onChange?: (checked: boolean) => void;
    size?: Exclude<SpacingTypes, "nano" | "huge">;
    helpText?: string;
    errorText?: string;
};

// TODO: Fix required indicator that clashes with tick because both use the same `label::after` setup.

// COMPONENT ///////////////////////////////////////////////////////////////////////////////////////////////////////////
export const Checkbox = React.forwardRef(
    (
        {
            id,
            name,
            label,
            hideLabel,
            helpText,
            errorText,
            onChange,
            checked,
            defaultChecked,
            disabled,
            required,
            size = "medium",
            ...props
        }: CheckboxProps,
        ref: React.Ref<CheckboxElementType>
    ) => {
        const derivedName = useMemo(() => name || id, [name, id]);

        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            onChange?.(e.target.checked);
        };

        return (
            <FormItem
                label={label}
                htmlFor={id}
                helpText={helpText}
                errorText={errorText}
                required={required}
                size={size}
            >
                <Element<CheckboxElementType>
                    as="input"
                    type="checkbox"
                    ref={ref}
                    id={id}
                    name={derivedName}
                    checked={checked}
                    defaultChecked={defaultChecked}
                    disabled={disabled}
                    required={required}
                    onChange={handleChange}
                    {...props}
                />
                <Element
                    as="div"
                    data-checkbox
                    className={`size-${size}`}
                />
            </FormItem>
        );
    }
);
Checkbox.displayName = "Checkbox";
