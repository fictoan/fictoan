// REACT CORE ==========================================================================================================
import React, { useMemo } from "react";

// LOCAL COMPONENTS ====================================================================================================
import { CommonProps, SpacingTypes } from "../../Element/constants";
import { Element } from "$element";

// UTILS ===============================================================================================================
import { separateWrapperProps } from "$utils/propSeparation";

// STYLES ==============================================================================================================
import "./checkbox.css";

// OTHER ===============================================================================================================
import { FormItem } from "../FormItem/FormItem";
import { InputLabelCustomProps } from "../InputLabel/InputLabel";

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
    labelFirst     ? : boolean;
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
            labelFirst,
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
                labelFirst={labelFirst}
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
                    as={labelFirst ? "label" : "div"}
                    htmlFor={labelFirst ? id : undefined}
                    data-checkbox
                    className={`size-${size}`}
                />
            </FormItem>
        );
    },
);
Checkbox.displayName = "Checkbox";
