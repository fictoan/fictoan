// REACT CORE ==========================================================================================================
import React, { useMemo } from "react";

// LOCAL COMPONENTS ====================================================================================================
import { Element } from "$element";
import { CommonProps, SpacingTypes } from "../../Element/constants";

// STYLES ==============================================================================================================
import "./checkbox.css";

// OTHER ===============================================================================================================
import { FormItem } from "../FormItem/FormItem";
import { InputLabelCustomProps } from "../InputLabel/InputLabel";
import { separateWrapperProps } from "../../../utils/propSeparation";

export type CheckboxElementType = HTMLInputElement;
export type CheckboxProps = InputLabelCustomProps & CommonProps & {
    id             ? : string;
    name           ? : string;
    checked        ? : boolean;
    defaultChecked ? : boolean;
    disabled       ? : boolean;
    required       ? : boolean;
    onChange       ? : (checked : boolean) => void;
    size           ? : Exclude<SpacingTypes, "nano" | "huge">;
    helpText       ? : string;
    errorText      ? : string;
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
        } : CheckboxProps,
        ref : React.Ref<CheckboxElementType>,
    ) => {
        const derivedName = useMemo(() => name || id, [ name, id ]);

        const handleChange = (e : React.ChangeEvent<HTMLInputElement>) => {
            onChange?.(e.target.checked);
        };

        // Separate wrapper-level props (margin, padding, etc.) from input-specific props
        const { wrapperProps, inputProps } = separateWrapperProps(props);

        return (
            <FormItem
                label={label}
                htmlFor={id}
                helpText={helpText}
                errorText={errorText}
                required={required}
                size={size}
                {...wrapperProps}
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
                    {...inputProps}
                />
                <Element
                    as="div"
                    data-checkbox
                    className={`size-${size}`}
                />
            </FormItem>
        );
    },
);
Checkbox.displayName = "Checkbox";
