// REACT CORE ==========================================================================================================
import React, { useRef } from "react";

// LOCAL COMPONENTS ====================================================================================================
import { Element } from "$element";
import { FormItem } from "../FormItem/FormItem";

// STYLES ==============================================================================================================
import "./textarea.css";

// TYPES ===============================================================================================================
import { CommonAndHTMLProps, SpacingTypes } from "../../Element/constants";
import { InputLabelCustomProps } from "../InputLabel/InputLabel";

// Common input types
export interface InputCommonProps {
    label?: string;
    helpText?: string | React.ReactNode;
    errorText?: string;
    validateThis?: boolean;
    valid?: boolean;
    invalid?: boolean;
    required?: boolean;
    disabled?: boolean;
}

export type TextareaElementType = HTMLTextAreaElement;
export type TextareaProps =
    Omit<CommonAndHTMLProps<TextareaElementType>, "onChange" | "size"> &
    InputLabelCustomProps &
    Omit<InputCommonProps, "validationState"> & {
        id?: string;
        name?: string;
        onChange?: (value: string) => void;
        value?: string;
        rows?: number;
        cols?: number;
        minLength?: number;
        maxLength?: number;
        placeholder?: string;
        readOnly?: boolean;
        required?: boolean;
        disabled?: boolean;
        autoComplete?: string;
        characterLimit?: number;
        wordLimit?: number;
        size?: Exclude<SpacingTypes, "nano" | "huge">;
    };

// Helper functions to determine limit states
const getLimitState = (current: number, limit: number): "normal" | "warning" | "exceeded" => {
    if (current > limit) return "exceeded";
    if (current >= limit * 0.9) return "warning";
    return "normal";
};

const pluralise = (count: number, singular: string, plural: string): string => {
    return Math.abs(count) === 1 ? singular : plural;
};

// COMPONENT ///////////////////////////////////////////////////////////////////////////////////////////////////////////
export const TextArea = React.forwardRef(
    (
        {
            // FormItem props
            label,
            hideLabel,
            helpText,
            errorText,
            size,
            required,
            // TextArea-specific
            onChange,
            value = "",
            characterLimit,
            wordLimit,
            // Input props
            id,
            name,
            rows,
            cols,
            minLength,
            maxLength,
            placeholder,
            readOnly,
            disabled,
            autoComplete,
            // Validation (unused but destructured to not pass to DOM)
            validateThis,
            valid,
            invalid,
            ...props
        }: TextareaProps,
        ref: React.Ref<TextareaElementType>
    ) => {
        const textareaRef = useRef<HTMLTextAreaElement | null>(null);

        const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
            onChange?.(e.target.value);
        };

        const constructHelpText = (): React.ReactNode => {
            const limitsMessages: React.ReactNode[] = [];

            if (characterLimit) {
                const currentChars = value.length;
                const limitState = getLimitState(currentChars, characterLimit);
                const excessChars = Math.max(0, currentChars - characterLimit);
                const remaining = characterLimit - currentChars;

                limitsMessages.push(
                    <span key="char-limit" className={`limit-${limitState}`}>
                        {excessChars > 0
                            ? `${excessChars} ${pluralise(excessChars, "char", "chars")} over limit`
                            : `${remaining} ${pluralise(remaining, "char", "chars")} left`}
                    </span>
                );
            }

            if (wordLimit) {
                const currentWords = value.trim().split(/\s+/).filter(Boolean).length;
                const limitState = getLimitState(currentWords, wordLimit);
                const excessWords = Math.max(0, currentWords - wordLimit);
                const remaining = wordLimit - currentWords;

                limitsMessages.push(
                    <span key="word-limit" className={`limit-${limitState}`}>
                        {excessWords > 0
                            ? `${excessWords} ${pluralise(excessWords, "word", "words")} over limit`
                            : `${remaining} ${pluralise(remaining, "word", "words")} left`}
                    </span>
                );
            }

            if (!limitsMessages.length && !helpText) return undefined;

            return (
                <>
                    {helpText}
                    {helpText && limitsMessages.length > 0 && <span className="separator"> • </span>}
                    {limitsMessages.map((msg, i) => (
                        <React.Fragment key={i}>
                            {i > 0 && <span className="separator"> • </span>}
                            {msg}
                        </React.Fragment>
                    ))}
                </>
            );
        };

        const setRefs = (element: HTMLTextAreaElement | null) => {
            textareaRef.current = element;
            if (typeof ref === "function") {
                ref(element);
            } else if (ref) {
                (ref as React.MutableRefObject<HTMLTextAreaElement | null>).current = element;
            }
        };

        return (
            <FormItem
                label={label}
                htmlFor={id}
                helpText={constructHelpText()}
                errorText={errorText}
                required={required}
                size={size}
            >
                <Element<TextareaElementType>
                    as="textarea"
                    ref={setRefs}
                    data-textarea
                    id={id}
                    name={name}
                    value={value}
                    rows={rows}
                    cols={cols}
                    minLength={minLength}
                    maxLength={maxLength}
                    placeholder={placeholder}
                    readOnly={readOnly}
                    disabled={disabled}
                    required={required}
                    autoComplete={autoComplete}
                    onChange={handleChange}
                    {...props}
                />
            </FormItem>
        );
    }
);
TextArea.displayName = "TextArea";
