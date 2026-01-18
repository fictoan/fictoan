// REACT CORE ==========================================================================================================
import React, { useMemo } from "react";

// LOCAL COMPONENTS ====================================================================================================
import { Div } from "../../Element/Tags";
import { Element } from "$element";
import { FormItem } from "../FormItem/FormItem";

// STYLES ==============================================================================================================
import "./radio-group.css";

// TYPES ===============================================================================================================
import { RadioGroupProps } from "./constants";

// COMPONENT ///////////////////////////////////////////////////////////////////////////////////////////////////////////
export const RadioGroup = React.forwardRef(
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
            labelFirst,
            ...props
        }: RadioGroupProps,
        ref: React.Ref<HTMLDivElement>
    ) => {
        const derivedName = useMemo(() => name || id, [name, id]);

        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            onChange?.(e.target.value);
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

        if (labelFirst) {
            classNames.push(`label-first`);
        }

        return (
            <FormItem
                label={label}
                htmlFor={id}
                helpText={helpText}
                errorText={errorText}
                required={required}
                size={size}
            >
                <Element
                    as="div"
                    data-radio-group
                    ref={ref}
                    classNames={classNames}
                    role="radiogroup"
                    aria-label={label}
                    style={columns ? { gridTemplateColumns: `repeat(${columns}, 1fr)` } : undefined}
                    {...props}
                >
                    {options.map((option, index) => {
                        const { id: optionId, value: optionValue, label: optionLabel, ...optionProps } = option;
                        const finalId = optionId || `${id}-option-${index}`;
                        const isChecked = value ? value === optionValue : defaultValue === optionValue;

                        return (
                            <Div
                                key={finalId}
                                data-radio-button
                                role="radio"
                                aria-checked={isChecked}
                                className={labelFirst ? "label-first" : undefined}
                            >
                                <input
                                    type="radio"
                                    id={finalId}
                                    name={derivedName}
                                    value={optionValue}
                                    checked={isChecked}
                                    disabled={disabled}
                                    onChange={handleChange}
                                    {...optionProps}
                                />
                                <label htmlFor={finalId}>{optionLabel}</label>
                                {labelFirst ? (
                                    <label htmlFor={finalId} data-radio />
                                ) : (
                                    <Div data-radio />
                                )}
                            </Div>
                        );
                    })}
                </Element>
            </FormItem>
        );
    }
);
RadioGroup.displayName = "RadioGroup";
