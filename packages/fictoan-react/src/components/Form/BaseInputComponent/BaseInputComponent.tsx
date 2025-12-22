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
            validationState,
            classNames,
            children,
            onChange,
            ...inputProps
        } : BaseInputComponentWithIconProps<K>,
        ref : React.LegacyRef<InputElementType>,
    ) => {
        const handleChange = (event : React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
            // Guard against invalid event objects
            if (!event || !event.target) {
                console.warn("[BaseInputComponent] Received invalid event object:", event);
                return;
            }

            // Call value-based handler with extracted value (modern approach)
            if (onChange) {
                const value = event.target.value;
                onChange(value);
            }
        };

        // Separate Fictoan props from HTML props to prevent conflicts
        const {fictoanProps, htmlProps} = separateFictoanFromHTMLProps(inputProps);

        // Determine if this is a native HTML element or a custom component
        const isNativeElement = typeof Component === "string";

        // Render validation icon based on state
        const renderValidationIcon = () => {
            if (!validationState) return null;

            if (validationState === "valid") {
                return (
                    <svg
                        data-validation-icon="valid"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width="20"
                        height="20"
                    >
                        <polyline
                            points="3.5 12.5 8.5 17.5 20.5 5.5"
                            fill="none"
                            stroke="#0ec05c"
                            strokeMiterlimit="10"
                            strokeWidth="2"
                        />
                    </svg>
                );
            }

            if (validationState === "invalid") {
                return (
                    <svg
                        data-validation-icon="invalid"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width="20"
                        height="20"
                    >
                        <line
                            x1="6.5"
                            y1="17.5"
                            x2="18.5"
                            y2="5.5"
                            fill="none"
                            stroke="#ef4343"
                            strokeMiterlimit="10"
                            strokeWidth="2"
                        />
                        <line
                            x1="6.5"
                            y1="5.5"
                            x2="18.5"
                            y2="17.5"
                            fill="none"
                            stroke="#ef4343"
                            strokeMiterlimit="10"
                            strokeWidth="2"
                        />
                    </svg>
                );
            }

            return null;
        };

        return (
            <FormItem
                data-form-item
                required={inputProps.required}
                size={fictoanProps.size}
            >
                {/* LABEL ////////////////////////////////////////////////////////////////////////////////////////// */}
                <Div data-label-wrapper data-has-validation={validationState ? "true" : undefined}>
                    {customLabel || (label && <InputLabel label={label} htmlFor={inputProps.id} />)}
                    {renderValidationIcon()}
                </Div>

                {/* MAIN INPUT ///////////////////////////////////////////////////////////////////////////////////// */}
                <Div data-input-wrapper>
                    <Element<K>
                        as={Component}
                        ref={ref}
                        classNames={[
                            className || "",
                        ].concat(classNames || [])}
                        {...htmlProps}
                        onChange={isNativeElement ? handleChange : onChange}
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
