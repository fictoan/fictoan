// REACT CORE ==========================================================================================================
import React, { useMemo } from "react";

// LOCAL COMPONENTS ====================================================================================================
import { Element } from "$element";
import { FormItem } from "../FormItem/FormItem";
import { Checkbox, CheckboxProps } from "./Checkbox";
import { Switch, SwitchProps } from "./Switch";
import { SpacingTypes } from "../../Element/constants";

// STYLES ==============================================================================================================
import "./checkbox-and-switch-group.css";

// TYPES ===============================================================================================================
import { InputLabelCustomProps } from "../InputLabel/InputLabel";

// COMMON GROUP OPTIONS ////////////////////////////////////////////////////////////////////////////////////////////////
interface BaseGroupOptionProps {
    id: string;
    label: string;
    value: string;
    disabled?: boolean;
}

// Props specific to the group functionality
interface GroupCustomProps {
    id?: string;
    name: string;
    options: BaseGroupOptionProps[];
    value?: string[];
    defaultValue?: string[];
    onChange?: (values: string[]) => void;
    align?: "horizontal" | "vertical";
    equaliseWidth?: boolean;
    equalizeWidth?: boolean;
    size?: Exclude<SpacingTypes, "nano" | "huge">;
    columns?: number;
}

// Combined props for the group component
export type InputGroupProps = InputLabelCustomProps & GroupCustomProps & {
    helpText?: string;
    errorText?: string;
    required?: boolean;
    disabled?: boolean;
};

// CHECKBOX GROUP //////////////////////////////////////////////////////////////////////////////////////////////////////
export const CheckboxGroup = React.forwardRef<HTMLDivElement, InputGroupProps>(
    (
        {
            id,
            name,
            label,
            helpText,
            errorText,
            options,
            value,
            defaultValue,
            onChange,
            align,
            equaliseWidth,
            equalizeWidth,
            required,
            disabled,
            size,
            columns,
            ...props
        },
        ref
    ) => {
        const derivedName = useMemo(() => name || id, [name, id]);

        const [selectedValues, setSelectedValues] = React.useState<string[]>(
            value || defaultValue || []
        );

        React.useEffect(() => {
            if (value !== undefined) {
                setSelectedValues(value);
            }
        }, [value]);

        const handleChange = (optionValue: string, checked: boolean) => {
            let newValues: string[];

            if (checked) {
                newValues = [...selectedValues, optionValue];
            } else {
                newValues = selectedValues.filter(v => v !== optionValue);
            }

            // Update internal state if uncontrolled
            if (value === undefined) {
                setSelectedValues(newValues);
            }

            onChange?.(newValues);
        };

        let classNames: string[] = [];

        if (align) {
            classNames.push(`align-${align}`);
        }

        if (equaliseWidth || equalizeWidth) {
            classNames.push(`equalise-width`);
        }

        if (columns) {
            classNames.push(`with-columns`);
        }

        return (
            <FormItem
                label={label}
                htmlFor={id}
                helpText={helpText}
                errorText={errorText}
                required={required}
            >
                <Element
                    as="div"
                    data-checkbox-group
                    ref={ref}
                    classNames={classNames}
                    role="group"
                    aria-label={label}
                    style={columns ? { gridTemplateColumns: `repeat(${columns}, 1fr)` } : undefined}
                    {...props}
                >
                    {options.map((option, index) => {
                        const { id: optionId, value: optionValue, label: optionLabel, ...optionProps } = option;
                        const finalId = optionId || `${id}-option-${index}`;
                        const isChecked = selectedValues.includes(optionValue);

                        return (
                            <Checkbox
                                key={finalId}
                                id={finalId}
                                name={derivedName}
                                label={optionLabel}
                                checked={isChecked}
                                disabled={disabled || option.disabled}
                                size={size}
                                onChange={(checked: boolean) => handleChange(optionValue, checked)}
                                {...optionProps}
                            />
                        );
                    })}
                </Element>
            </FormItem>
        );
    }
);
CheckboxGroup.displayName = "CheckboxGroup";

// SWITCH GROUP ////////////////////////////////////////////////////////////////////////////////////////////////////////
export const SwitchGroup = React.forwardRef<HTMLDivElement, InputGroupProps>(
    (
        {
            id,
            name,
            label,
            helpText,
            errorText,
            options,
            value,
            defaultValue,
            onChange,
            align,
            equaliseWidth,
            equalizeWidth,
            required,
            disabled,
            size,
            columns,
            ...props
        },
        ref
    ) => {
        const derivedName = useMemo(() => name || id, [name, id]);

        const [selectedValues, setSelectedValues] = React.useState<string[]>(
            value || defaultValue || []
        );

        React.useEffect(() => {
            if (value !== undefined) {
                setSelectedValues(value);
            }
        }, [value]);

        const handleChange = (optionValue: string, checked: boolean) => {
            let newValues: string[];

            if (checked) {
                newValues = [...selectedValues, optionValue];
            } else {
                newValues = selectedValues.filter(v => v !== optionValue);
            }

            // Update internal state if uncontrolled
            if (value === undefined) {
                setSelectedValues(newValues);
            }

            onChange?.(newValues);
        };

        let classNames: string[] = [];

        if (align) {
            classNames.push(`align-${align}`);
        }

        if (equaliseWidth || equalizeWidth) {
            classNames.push(`equalise-width`);
        }

        if (columns) {
            classNames.push(`with-columns`);
        }

        return (
            <FormItem
                label={label}
                htmlFor={id}
                helpText={helpText}
                errorText={errorText}
                required={required}
            >
                <Element
                    as="div"
                    data-switch-group
                    ref={ref}
                    classNames={classNames}
                    role="group"
                    aria-label={label}
                    style={columns ? { gridTemplateColumns: `repeat(${columns}, 1fr)` } : undefined}
                    {...props}
                >
                    {options.map((option, index) => {
                        const { id: optionId, value: optionValue, label: optionLabel, ...optionProps } = option;
                        const finalId = optionId || `${id}-option-${index}`;
                        const isChecked = selectedValues.includes(optionValue);

                        return (
                            <Switch
                                key={finalId}
                                id={finalId}
                                name={derivedName}
                                label={optionLabel}
                                checked={isChecked}
                                disabled={disabled || option.disabled}
                                size={size}
                                onChange={(checked: boolean) => handleChange(optionValue, checked)}
                                {...optionProps}
                            />
                        );
                    })}
                </Element>
            </FormItem>
        );
    }
);
SwitchGroup.displayName = "SwitchGroup";
