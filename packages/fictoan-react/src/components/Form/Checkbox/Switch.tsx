// REACT CORE ==========================================================================================================
import React, { useMemo } from "react";

// LOCAL COMPONENTS ====================================================================================================
import { Element } from "$element";
import { FormItem } from "../FormItem/FormItem";
import { SpacingTypes } from "../../Element/constants";
import { separateWrapperProps } from "../../../utils/propSeparation";

// STYLES ==============================================================================================================
import "./switch.css";

// TYPES ===============================================================================================================
import { InputLabelCustomProps } from "../InputLabel/InputLabel";

export type SwitchElementType = HTMLInputElement;
export type SwitchProps = InputLabelCustomProps & {
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

// COMPONENT ///////////////////////////////////////////////////////////////////////////////////////////////////////////
export const Switch = React.forwardRef(
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
        }: SwitchProps,
        ref: React.Ref<SwitchElementType>
    ) => {
        const derivedName = useMemo(() => name || id, [name, id]);

        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
                <Element<SwitchElementType>
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
                    data-switch
                    className={`size-${size}`}
                />
            </FormItem>
        );
    }
);
Switch.displayName = "Switch";
