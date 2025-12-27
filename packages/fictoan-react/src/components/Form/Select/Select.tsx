// REACT CORE ==========================================================================================================
import React, { useMemo } from "react";

// LOCAL COMPONENTS ====================================================================================================
import { Div } from "$tags";
import { Element } from "$element";
import { FormItem } from "../FormItem/FormItem";

// STYLES ==============================================================================================================
import "./select.css";

// OTHER ===============================================================================================================
import { OptionProps, OptGroupProps, SelectProps, OptionElementType, SelectElementType } from "./constants";

// COMPONENT ///////////////////////////////////////////////////////////////////////////////////////////////////////////
export const Select = React.forwardRef(
    (
        {
            // FormItem props
            label,
            helpText,
            errorText,
            required,
            // Select props
            id,
            name,
            options,
            onChange,
            disabled,
            className,
            ...props
        }: SelectProps,
        ref: React.Ref<SelectElementType>
    ) => {
        const derivedName = useMemo(() => name || id, [name, id]);

        const renderOption = (option: OptionProps) => (
            <Element<OptionElementType>
                as="option"
                key={option.value}
                value={option.value}
                disabled={option.disabled}
            >
                {option.label}
            </Element>
        );

        const renderOptGroup = (group: OptGroupProps) => (
            <Element<HTMLOptGroupElement>
                as="optgroup"
                key={group.label}
                label={group.label}
            >
                {group.options.map(renderOption)}
            </Element>
        );

        const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
            onChange?.(e.target.value);
        };

        return (
            <FormItem
                label={label}
                htmlFor={id}
                helpText={helpText}
                errorText={errorText}
                required={required}
            >
                <Div data-select className={className} disabled={disabled}>
                    <Element<SelectElementType>
                        as="select"
                        ref={ref}
                        id={id}
                        name={derivedName}
                        disabled={disabled}
                        required={required}
                        onChange={handleChange}
                        {...props}
                    >
                        {options.map((option) =>
                            "options" in option ? renderOptGroup(option) : renderOption(option)
                        )}
                    </Element>
                </Div>
            </FormItem>
        );
    }
);
Select.displayName = "Select";
