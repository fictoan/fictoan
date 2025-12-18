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
        const handleChange = (event : React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
            // Call event-based handler if provided
            if (onChange) {
                onChange(event);
            }

            // Call value-based handler if provided
            if (onValueChange) {
                const value = event.target.value;
                onValueChange(value);
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
(BaseInputComponent as any).displayName = "BaseInputComponent";
