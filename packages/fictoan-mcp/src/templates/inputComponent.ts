export const inputComponentTemplate = (componentName: string, customProps: string[] = []) => ({
  typescript: `// FRAMEWORK ===========================================================================================
import React from "react";

// FICTOAN =============================================================================================
import { Element } from "../Element/Element";

// STYLES ==============================================================================================
import "./${componentName.toLowerCase()}.css";

// TYPES ===============================================================================================
import { CommonAndHTMLProps } from "../Element/constants";

// COMPONENT ===========================================================================================
export interface ${componentName}CustomProps {
    label?: string;
    placeholder?: string;
    helpText?: string;
    errorText?: string;
    value?: string;
    defaultValue?: string;
    onChange?: (value: string | React.ChangeEvent<HTMLInputElement>) => void;
    onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
    onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
    isFullWidth?: boolean;
    isRequired?: boolean;
    isDisabled?: boolean;
    isReadOnly?: boolean;
    isInvalid?: boolean;
    autoFocus?: boolean;${customProps.length > 0 ? '\n    ' + customProps.map(prop => `${prop}?: string;`).join('\n    ') : ''}
}

export type ${componentName}ElementType = HTMLInputElement;

export type ${componentName}Props = Omit<CommonAndHTMLProps<${componentName}ElementType>, keyof ${componentName}CustomProps> & ${componentName}CustomProps;

export const ${componentName} = React.forwardRef(
    ({ 
        label, 
        placeholder, 
        helpText, 
        errorText, 
        value, 
        defaultValue, 
        onChange, 
        onFocus, 
        onBlur, 
        isFullWidth, 
        isRequired, 
        isDisabled, 
        isReadOnly, 
        isInvalid, 
        autoFocus, 
        ...props 
    }: ${componentName}Props, ref: React.Ref<${componentName}ElementType>) => {
        let classNames = [];

        if (isFullWidth) {
            classNames.push("is-full-width");
        }

        if (isRequired) {
            classNames.push("is-required");
        }

        if (isDisabled) {
            classNames.push("is-disabled");
        }

        if (isReadOnly) {
            classNames.push("is-read-only");
        }

        if (isInvalid) {
            classNames.push("is-invalid");
        }

        const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
            if (onChange) {
                onChange(event.target.value);
            }
        };

        return (
            <div data-${componentName.toLowerCase()}-wrapper>
                {label && (
                    <label data-${componentName.toLowerCase()}-label htmlFor={props.id}>
                        {label}
                        {isRequired && <span aria-label="required" data-required-indicator>*</span>}
                    </label>
                )}
                
                <Element<${componentName}ElementType>
                    as="input"
                    data-${componentName.toLowerCase()}
                    ref={ref}
                    classNames={classNames}
                    placeholder={placeholder}
                    value={value}
                    defaultValue={defaultValue}
                    onChange={handleChange}
                    onFocus={onFocus}
                    onBlur={onBlur}
                    required={isRequired}
                    disabled={isDisabled}
                    readOnly={isReadOnly}
                    aria-invalid={isInvalid}
                    aria-describedby={helpText || errorText ? \`\${props.id}-help\` : undefined}
                    autoFocus={autoFocus}
                    {...props}
                />
                
                {(helpText || errorText) && (
                    <div id={\`\${props.id}-help\`} data-${componentName.toLowerCase()}-help>
                        {isInvalid && errorText ? errorText : helpText}
                    </div>
                )}
            </div>
        );
    }
);`,

  css: `/* ${componentName.toUpperCase()} ============================================================================================= */
[data-${componentName.toLowerCase()}-wrapper] {
    display: flex;
    flex-direction: column;
    gap: var(--nano);
}

[data-${componentName.toLowerCase()}-wrapper].is-full-width {
    width: 100%;
}

[data-${componentName.toLowerCase()}-label] {
    font-family: var(--input-label-font, var(--font-sans-serif));
    font-size: var(--text-small);
    font-weight: 600;
    color: var(--input-label-default);
    cursor: pointer;
}

[data-${componentName.toLowerCase()}-label] [data-required-indicator] {
    color: var(--input-required-indicator);
    margin-left: var(--nano);
}

[data-${componentName.toLowerCase()}] {
    font-family: var(--input-font, var(--font-sans-serif));
    font-size: var(--text-medium);
    padding: var(--input-padding);
    
    background-color: var(--input-bg-default);
    color: var(--input-text-default);
    border: var(--input-border-width-default) solid var(--input-border-default);
    border-radius: var(--input-border-radius-default);
    
    transition: all var(--global-transition-duration) var(--global-transition-easing);
}

[data-${componentName.toLowerCase()}]:focus {
    outline: none;
    background-color: var(--input-bg-focus);
    border-color: var(--input-border-focus);
    border-width: var(--input-border-width-focus);
    color: var(--input-text-focus);
    box-shadow: 0 0 0 2px var(--global-focus-colour);
}

[data-${componentName.toLowerCase()}]::placeholder {
    color: var(--input-placeholder-default);
    opacity: var(--input-placeholder-opacity);
}

[data-${componentName.toLowerCase()}].is-full-width {
    width: 100%;
}

[data-${componentName.toLowerCase()}].is-invalid {
    background-color: var(--input-bg-invalid);
    border-color: var(--input-border-invalid);
    color: var(--input-text-invalid);
}

[data-${componentName.toLowerCase()}].is-disabled {
    background-color: var(--input-bg-disabled);
    border-color: var(--input-border-disabled);
    color: var(--input-text-disabled);
    cursor: not-allowed;
}

[data-${componentName.toLowerCase()}].is-read-only {
    background-color: var(--input-bg-read-only);
    border-color: var(--input-border-read-only);
    color: var(--input-text-read-only);
    cursor: default;
}

[data-${componentName.toLowerCase()}-help] {
    font-size: var(--input-helptext-scale);
    color: var(--input-helptext);
}

[data-${componentName.toLowerCase()}-wrapper].is-invalid [data-${componentName.toLowerCase()}-help] {
    color: var(--input-error-text-invalid);
}`,

  index: `export { ${componentName}, type ${componentName}Props } from "./${componentName}";`,

  themeVariables: `/* ${componentName.toUpperCase()} ============================================================================================= */
:root {
    /* Uses existing input field theme variables from theme.css */
    /* Component-specific overrides can be added here if needed */
}`
});