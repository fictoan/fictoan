// REACT CORE ==========================================================================================================
import React, { useMemo } from "react";

// LOCAL COMPONENTS ====================================================================================================
import { Element } from "$element";
import { SpacingTypes } from "../../Element/constants";

// UTILS ===============================================================================================================
import { separateWrapperProps } from "$utils/propSeparation";

// STYLES ==============================================================================================================
import "./switch.css";

// OTHER ===============================================================================================================
import { FormItem, deriveAriaIds } from "../FormItem/FormItem";
import { InputLabelCustomProps } from "../InputLabel/InputLabel";

export type SwitchElementType = HTMLInputElement;
export type SwitchProps = InputLabelCustomProps & {
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
            labelFirst,
            ...props
        } : SwitchProps,
        ref : React.Ref<SwitchElementType>,
    ) => {
        const derivedName = useMemo(() => name || id, [ name, id ]);

        const handleChange = (e : React.ChangeEvent<HTMLInputElement>) => {
            onChange?.(e.target.checked);
        };

        // Separate wrapper-level props (margin, padding, etc.) from input-specific props
        const {wrapperProps, inputProps} = separateWrapperProps(props);

        const reactId = React.useId();
        const finalId = id || `switch-${reactId.replace(/:/g, "")}`;
        const { describedBy } = deriveAriaIds(finalId, helpText, errorText);

        return (
            <FormItem
                label={label}
                htmlFor={finalId}
                helpText={helpText}
                errorText={errorText}
                required={required}
                size={size}
                labelFirst={labelFirst}
                {...wrapperProps}
            >
                <Element<SwitchElementType>
                    as="input"
                    type="checkbox"
                    ref={ref}
                    id={finalId}
                    name={derivedName}
                    checked={checked}
                    defaultChecked={defaultChecked}
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
                    data-switch
                    className={`size-${size}`}
                />
            </FormItem>
        );
    },
);
Switch.displayName = "Switch";
