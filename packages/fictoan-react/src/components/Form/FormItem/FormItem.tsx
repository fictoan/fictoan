// REACT CORE ==========================================================================================================
import React from "react";

// LOCAL COMPONENTS ====================================================================================================
import { CommonAndHTMLProps, SpacingTypes } from "../../Element/constants";
import { Div } from "$tags";
import { Element } from "$element";

// STYLES ==============================================================================================================
import "./form-item.css";

// OTHER ===============================================================================================================
import { InputLabel } from "../InputLabel/InputLabel";
import { Text } from "../../Typography/Text";

// TYPES ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
export type FormItemElementType = HTMLDivElement;

export interface FormItemProps extends CommonAndHTMLProps<FormItemElementType> {
    // Label
    label           ? : string;
    customLabel     ? : React.ReactNode;
    htmlFor         ? : string;
    // Info section
    helpText        ? : string | React.ReactNode;
    errorText       ? : string;
    // Validation
    validationState ? : "valid" | "invalid" | null;
    // Form semantics
    required        ? : boolean;
    size            ? : Exclude<SpacingTypes, "nano" | "huge">;
    // Layout
    labelFirst      ? : boolean;
}

// VALIDATION ICON /////////////////////////////////////////////////////////////////////////////////////////////////////
const ValidationIcon = ({state} : { state : "valid" | "invalid" }) => {
    if (state === "valid") {
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
};

// COMPONENT ///////////////////////////////////////////////////////////////////////////////////////////////////////////
export const FormItem = React.forwardRef(
    (
        {
            label,
            customLabel,
            htmlFor,
            helpText,
            errorText,
            validationState,
            required,
            size,
            labelFirst,
            children,
            ...props
        } : FormItemProps,
        ref : React.Ref<FormItemElementType>,
    ) => {
        const hasLabel = label || customLabel;
        const hasInfoSection = helpText || errorText;

        return (
            <Element<FormItemElementType>
                as="div"
                data-form-item
                ref={ref}
                role="group"
                required={required}
                className={[ size ? `size-${size}` : "", labelFirst ? "label-first" : "" ].filter(Boolean)
                    .join(" ") || undefined}
                {...props}
            >
                {/* LABEL ////////////////////////////////////////////////////////////////////////////////////// */}
                {hasLabel && (
                    <Div data-label-wrapper data-has-validation={validationState ? "true" : undefined}>
                        {customLabel || (label && <InputLabel label={label} htmlFor={htmlFor} />)}
                        {validationState && <ValidationIcon state={validationState} />}
                    </Div>
                )}

                {/* INPUT ////////////////////////////////////////////////////////////////////////////////////// */}
                <Div data-input-wrapper>
                    {children}
                </Div>

                {/* INFO SECTION /////////////////////////////////////////////////////////////////////////////// */}
                {hasInfoSection && (
                    <Div className="info-section vertically-center-items">
                        {helpText && (
                            <Text className="help-text">
                                {helpText}
                            </Text>
                        )}
                        {errorText && (
                            <Text className="error-text">
                                {errorText}
                            </Text>
                        )}
                    </Div>
                )}
            </Element>
        );
    },
);
FormItem.displayName = "FormItem";
