// REACT CORE ==========================================================================================================
import React, { ChangeEvent } from "react";

// LOCAL COMPONENTS ====================================================================================================
import { Div } from "$tags";
import { Element } from "$element";

// UTILS ===============================================================================================================
import { separateFictoanFromHTMLProps } from "$utils/propSeparation";

// OTHER ===============================================================================================================
import { BaseInputComponentWithIconProps } from "./constants";
import { FormItem } from "$/components";
import { InputLabel } from "$/components";
import { Text } from "$/components";

export type InputElementType = HTMLInputElement | HTMLDivElement | HTMLSelectElement | HTMLTextAreaElement;

// COMPONENT ///////////////////////////////////////////////////////////////////////////////////////////////////////////
export const BaseInputComponent = React.forwardRef(
    <K extends InputElementType>(
        {
            as : Component,
            className,
            label,
            customLabel,
            helpText,
            errorText,
            validateThis,
            classNames,
            children,
            onChange,
            onValueChange,
            ...inputProps
        } : BaseInputComponentWithIconProps<K>,
        ref : React.LegacyRef<InputElementType>,
    ) => {
        // Handle both new value-based and legacy event-based onChange
        const handleChange = (valueOrEvent : string | React.ChangeEvent<HTMLInputElement>) => {
            if (!onChange) return;

            // If it's a direct string value, use it as is
            if (typeof valueOrEvent === "string" || Array.isArray(valueOrEvent)) {
                (onChange as (value : string | string[]) => void)(valueOrEvent);
                return;
            }

            // If it's an event, try to get the value from target
            const value = valueOrEvent?.target?.value;
            if (onChange.length === 1) {
                (onChange as (value : string) => void)(value);
            } else {
                (onChange as (e : React.ChangeEvent<HTMLInputElement>) => void)(valueOrEvent);
            }
        };

        // Separate Fictoan props from HTML props to prevent conflicts
        const { fictoanProps, htmlProps } = separateFictoanFromHTMLProps(inputProps);

        return (
            <FormItem
                data-form-item
                required={inputProps.required}
                size={fictoanProps.size}
            >
                {/* LABEL ////////////////////////////////////////////////////////////////////////////////////////// */}
                {customLabel || (label && <InputLabel label={label} htmlFor={inputProps.id} />)}

                {/* MAIN INPUT ///////////////////////////////////////////////////////////////////////////////////// */}
                <Div data-input-wrapper>
                    <Element<K>
                        as={Component}
                        ref={ref}
                        classNames={[
                            className || "",
                            validateThis ? "validate-this" : "",
                        ].concat(classNames || [])}
                        {...htmlProps}
                        onChange={handleChange}
                    />
                    {children}
                </Div>

                {/* INFO SECTION /////////////////////////////////////////////////////////////////////////////////// */}
                {(helpText || errorText) && (
                    <Div className="info-section vertically-center-items">
                        {helpText && (
                            <Text className="help-text">
                                {typeof helpText === "string" ? helpText : helpText}
                            </Text>
                        )}
                        {errorText && (
                            <Text className="error-text">
                                {errorText}
                            </Text>
                        )}
                    </Div>
                )}
            </FormItem>
        );
    },
) as <K extends InputElementType>(
    props : BaseInputComponentWithIconProps<K> & {
        ref? : React.LegacyRef<InputElementType>
    },
) => React.ReactElement;
