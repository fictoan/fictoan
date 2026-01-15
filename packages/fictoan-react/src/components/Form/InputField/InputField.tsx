// REACT CORE ==========================================================================================================
import React, { useEffect, useRef, useState } from "react";

// LOCAL COMPONENTS ====================================================================================================
import { Div } from "$tags";
import { Element } from "$element";
import { SpacingTypes } from "../../Element/constants";

// STYLES ==============================================================================================================
import "./input-field.css";

// OTHER ===============================================================================================================
import { FormItem } from "../FormItem/FormItem";
import { InputLabelCustomProps } from "../InputLabel/InputLabel";
import { separateWrapperProps } from "../../../utils/propSeparation";

// TODO: Add full-width support for standalone input fields

export type ValueChangeHandler<T = string> = (value: T) => void;
export type InputFocusHandler = (e: React.FocusEvent<HTMLInputElement>) => void;
export interface InputCommonProps {
    label           ? : string;
    helpText        ? : string | React.ReactNode;
    errorText       ? : string;
    validateThis    ? : boolean;
    valid           ? : boolean;
    invalid         ? : boolean;
    validationState ? : "valid" | "invalid" | null;
    required        ? : boolean;
    disabled        ? : boolean;
}

export interface InputSideElementProps {
    innerIconLeft  ? : React.ReactNode;
    innerIconRight ? : React.ReactNode;
    innerTextLeft  ? : string;
    innerTextRight ? : string;
}

export type InputFieldElementType = HTMLInputElement;

export type InputFieldProps =
    Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange" | "onBlur" | "onFocus" | "size"> &
    InputLabelCustomProps &
    InputCommonProps &
    InputSideElementProps & {
    type     ? : "text" | "password" | "email" | "number" | "tel" | "url" | "search" | "file";
    size     ? : Exclude<SpacingTypes, "nano" | "huge">;
    onFocus  ? : InputFocusHandler;
    onBlur   ? : InputFocusHandler;
    onChange ? : ValueChangeHandler<string>;
};

// COMPONENT ///////////////////////////////////////////////////////////////////////////////////////////////////////////
export const InputField = React.forwardRef(
    (
        {
            // FormItem props
            label,
            hideLabel,
            helpText,
            errorText,
            size,
            required,
            // Side elements
            innerIconLeft,
            innerIconRight,
            innerTextLeft,
            innerTextRight,
            // Validation
            validateThis,
            valid,
            invalid,
            validationState: externalValidationState,
            // Handlers
            onChange,
            onBlur,
            onFocus,
            // Aria
            "aria-label": ariaLabel,
            "aria-invalid": ariaInvalid,
            // Input props
            id,
            name,
            value,
            defaultValue,
            type = "text",
            placeholder,
            autoComplete,
            maxLength,
            minLength,
            pattern,
            readOnly,
            disabled,
            className,
            ...props
        }: InputFieldProps,
        ref: React.Ref<InputFieldElementType>
    ) => {
        const leftElementRef = useRef<HTMLDivElement>(null);
        const rightElementRef = useRef<HTMLDivElement>(null);
        const internalInputRef = useRef<HTMLInputElement>(null);

        const [touched, setTouched] = useState(false);
        const [internalValidationState, setInternalValidationState] = useState<"valid" | "invalid" | null>(null);

        // Use external validation state if provided, otherwise use internal
        const validationState = externalValidationState ?? (validateThis ? internalValidationState : null);

        // Merge refs
        const mergeRefs = React.useCallback(
            (el: HTMLInputElement | null) => {
                (internalInputRef as React.MutableRefObject<HTMLInputElement | null>).current = el;
                if (typeof ref === "function") {
                    ref(el);
                } else if (ref) {
                    (ref as React.MutableRefObject<HTMLInputElement | null>).current = el;
                }
            },
            [ref]
        );

        const updateValidationState = () => {
            const input = internalInputRef.current;
            if (!input || input.value === "") {
                setInternalValidationState(null);
                return;
            }
            setInternalValidationState(input.validity.valid ? "valid" : "invalid");
        };

        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            onChange?.(e.target.value);
            if (touched && validateThis) {
                updateValidationState();
            }
        };

        const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
            setTouched(true);
            if (validateThis) {
                updateValidationState();
            }
            onBlur?.(e);
        };

        const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
            onFocus?.(e);
        };

        // Side element width calculation
        useEffect(() => {
            const updateWidth = (el: HTMLDivElement | null, pos: "left" | "right") => {
                if (!el) return;
                const formItem = el.closest("[data-form-item]") as HTMLElement;
                formItem?.style.setProperty(
                    `--side-element-${pos}-width`,
                    `${el.getBoundingClientRect().width}px`
                );
            };

            if (innerTextLeft || innerIconLeft) {
                updateWidth(leftElementRef.current, "left");
            }
            if (innerTextRight || innerIconRight) {
                updateWidth(rightElementRef.current, "right");
            }
        }, [innerTextLeft, innerTextRight, innerIconLeft, innerIconRight]);

        const renderSideElement = (
            content: React.ReactNode,
            position: "left" | "right",
            elRef: React.RefObject<HTMLDivElement>
        ) => {
            if (!content) return null;

            const isText = typeof content === "string";
            const isInteractive =
                !isText &&
                React.isValidElement(content) &&
                (content.props.onClick ||
                    content.props.onKeyDown ||
                    content.type === "button" ||
                    content.type === "a");

            return (
                <Div
                    ref={elRef}
                    data-input-side-element
                    className={`${position} ${isText ? "is-text" : "is-icon"} ${isInteractive ? "is-interactive" : ""}`}
                    aria-hidden="true"
                >
                    {content}
                </Div>
            );
        };

        const hasLeftElement = Boolean(innerIconLeft || innerTextLeft);
        const hasRightElement = Boolean(innerIconRight || innerTextRight);

        // Separate wrapper-level props (margin, padding, etc.) from input-specific props
        const { wrapperProps, inputProps } = separateWrapperProps(props);

        return (
            <FormItem
                label={label}
                htmlFor={id}
                helpText={helpText}
                errorText={errorText}
                validationState={validationState}
                required={required}
                size={size}
                {...wrapperProps}
            >
                <Element<InputFieldElementType>
                    as="input"
                    ref={mergeRefs}
                    data-input-field
                    id={id}
                    name={name}
                    type={type}
                    value={value}
                    defaultValue={defaultValue}
                    placeholder={placeholder || " "}
                    autoComplete={autoComplete}
                    maxLength={maxLength}
                    minLength={minLength}
                    pattern={pattern}
                    readOnly={readOnly}
                    disabled={disabled}
                    required={required}
                    className={[
                        className,
                        hasLeftElement && "with-left-element",
                        hasRightElement && "with-right-element",
                    ]
                        .filter(Boolean)
                        .join(" ")}
                    aria-label={ariaLabel || label}
                    aria-invalid={ariaInvalid || invalid}
                    aria-required={required}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    onFocus={handleFocus}
                    {...inputProps}
                />
                {(hasLeftElement || hasRightElement) && (
                    <Div data-input-helper aria-hidden="true">
                        {renderSideElement(innerIconLeft || innerTextLeft, "left", leftElementRef)}
                        {renderSideElement(innerIconRight || innerTextRight, "right", rightElementRef)}
                    </Div>
                )}
            </FormItem>
        );
    }
);
InputField.displayName = "InputField";
