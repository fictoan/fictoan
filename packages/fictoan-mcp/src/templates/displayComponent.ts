export const displayComponentTemplate = (componentName: string, customProps: string[] = []) => ({
  typescript: `// FRAMEWORK ===========================================================================================
import React from "react";

// FICTOAN =============================================================================================
import { Element } from "$element";

// STYLES ==============================================================================================
import "./${componentName.toLowerCase()}.css";

// TYPES ===============================================================================================
import { CommonAndHTMLProps } from "../Element/constants";

// COMPONENT ===========================================================================================
export interface ${componentName}CustomProps {
    kind?: "primary" | "secondary" | "tertiary";
    size?: "tiny" | "small" | "medium" | "large" | "huge";
    shape?: "rounded" | "curved";
    isLoading?: boolean;
    isDisabled?: boolean;${customProps.length > 0 ? '\n    ' + customProps.map(prop => `${prop}?: string;`).join('\n    ') : ''}
}

export type ${componentName}ElementType = HTMLDivElement;

export type ${componentName}Props = Omit<CommonAndHTMLProps<${componentName}ElementType>, keyof ${componentName}CustomProps> & ${componentName}CustomProps;

export const ${componentName} = React.forwardRef(
    ({ kind = "primary", size = "medium", shape, isLoading, isDisabled, ...props }: ${componentName}Props, ref: React.Ref<${componentName}ElementType>) => {
        let classNames = [];

        if (kind) {
            classNames.push(\`kind-\${kind}\`);
        }

        if (size) {
            classNames.push(\`size-\${size}\`);
        }

        if (shape) {
            classNames.push(\`shape-\${shape}\`);
        }

        if (isLoading) {
            classNames.push("is-loading");
        }

        if (isDisabled) {
            classNames.push("is-disabled");
        }

        return (
            <Element<${componentName}ElementType>
                as="div"
                data-${componentName.toLowerCase()}
                ref={ref}
                classNames={classNames}
                aria-disabled={isDisabled}
                {...props}
            />
        );
    }
);`,

  css: `/* ${componentName.toUpperCase()} ============================================================================================= */
[data-${componentName.toLowerCase()}] {
    /* Base styles */
    font-family: var(--${componentName.toLowerCase()}-font, var(--font-sans-serif));
    cursor: pointer;
    user-select: none;
    transition: all var(--global-transition-duration) var(--global-transition-easing);
    
    /* Default kind styles */
    background-color: var(--${componentName.toLowerCase()}-primary-bg-default);
    color: var(--${componentName.toLowerCase()}-primary-text-default);
    border: var(--${componentName.toLowerCase()}-primary-border-width-default) solid var(--${componentName.toLowerCase()}-primary-border-default);
    border-radius: var(--${componentName.toLowerCase()}-primary-border-radius-default);
}

/* KINDS ============================================================================================== */
[data-${componentName.toLowerCase()}].kind-primary {
    background-color: var(--${componentName.toLowerCase()}-primary-bg-default);
    color: var(--${componentName.toLowerCase()}-primary-text-default);
    border-color: var(--${componentName.toLowerCase()}-primary-border-default);
}

[data-${componentName.toLowerCase()}].kind-primary:hover {
    background-color: var(--${componentName.toLowerCase()}-primary-bg-hover);
    color: var(--${componentName.toLowerCase()}-primary-text-hover);
    border-color: var(--${componentName.toLowerCase()}-primary-border-hover);
}

[data-${componentName.toLowerCase()}].kind-secondary {
    background-color: var(--${componentName.toLowerCase()}-secondary-bg-default);
    color: var(--${componentName.toLowerCase()}-secondary-text-default);
    border-color: var(--${componentName.toLowerCase()}-secondary-border-default);
}

[data-${componentName.toLowerCase()}].kind-secondary:hover {
    background-color: var(--${componentName.toLowerCase()}-secondary-bg-hover);
    color: var(--${componentName.toLowerCase()}-secondary-text-hover);
    border-color: var(--${componentName.toLowerCase()}-secondary-border-hover);
}

/* SIZES ============================================================================================== */
[data-${componentName.toLowerCase()}].size-tiny {
    padding: var(--tiny);
    font-size: var(--text-tiny);
}

[data-${componentName.toLowerCase()}].size-small {
    padding: var(--small);
    font-size: var(--text-small);
}

[data-${componentName.toLowerCase()}].size-medium {
    padding: var(--medium);
    font-size: var(--text-medium);
}

[data-${componentName.toLowerCase()}].size-large {
    padding: var(--large);
    font-size: var(--text-large);
}

[data-${componentName.toLowerCase()}].size-huge {
    padding: var(--huge);
    font-size: var(--text-huge);
}

/* SHAPES ============================================================================================= */
[data-${componentName.toLowerCase()}].shape-rounded {
    border-radius: var(--global-border-radius);
}

[data-${componentName.toLowerCase()}].shape-curved {
    border-radius: var(--global-border-radius-curved);
}

/* STATES ============================================================================================= */
[data-${componentName.toLowerCase()}].is-loading {
    pointer-events: none;
    opacity: 0.7;
}

[data-${componentName.toLowerCase()}].is-disabled {
    pointer-events: none;
    opacity: 0.5;
    background-color: var(--${componentName.toLowerCase()}-primary-bg-disabled);
    color: var(--${componentName.toLowerCase()}-primary-text-disabled);
    border-color: var(--${componentName.toLowerCase()}-primary-border-disabled);
}`,

  index: `export { ${componentName}, type ${componentName}Props } from "./${componentName}";`,

  themeVariables: `/* ${componentName.toUpperCase()} ============================================================================================= */
:root {
    --${componentName.toLowerCase()}-font                              : var(--font-sans-serif);
    
    /* PRIMARY KIND ================================================================================= */
    --${componentName.toLowerCase()}-primary-bg-default                : var(--hue);
    --${componentName.toLowerCase()}-primary-text-default              : var(--white);
    --${componentName.toLowerCase()}-primary-border-default            : var(--hue);
    --${componentName.toLowerCase()}-primary-border-width-default      : var(--global-border-width);
    --${componentName.toLowerCase()}-primary-border-radius-default     : var(--global-border-radius);
    
    --${componentName.toLowerCase()}-primary-bg-hover                  : var(--hue-dark10);
    --${componentName.toLowerCase()}-primary-text-hover                : var(--white);
    --${componentName.toLowerCase()}-primary-border-hover              : var(--hue-dark10);
    
    --${componentName.toLowerCase()}-primary-bg-active                 : var(--hue-dark20);
    --${componentName.toLowerCase()}-primary-text-active               : var(--white);
    --${componentName.toLowerCase()}-primary-border-active             : var(--hue-dark20);
    
    --${componentName.toLowerCase()}-primary-bg-disabled               : var(--slate-light60);
    --${componentName.toLowerCase()}-primary-text-disabled             : var(--slate);
    --${componentName.toLowerCase()}-primary-border-disabled           : var(--slate-light60);
    
    /* SECONDARY KIND =============================================================================== */
    --${componentName.toLowerCase()}-secondary-bg-default              : var(--transparent);
    --${componentName.toLowerCase()}-secondary-text-default            : var(--hue);
    --${componentName.toLowerCase()}-secondary-border-default          : var(--hue);
    --${componentName.toLowerCase()}-secondary-border-width-default    : var(--global-border-width);
    --${componentName.toLowerCase()}-secondary-border-radius-default   : var(--global-border-radius);
    
    --${componentName.toLowerCase()}-secondary-bg-hover                : var(--hue-light80);
    --${componentName.toLowerCase()}-secondary-text-hover              : var(--hue);
    --${componentName.toLowerCase()}-secondary-border-hover            : var(--hue);
    
    --${componentName.toLowerCase()}-secondary-bg-active               : var(--hue-light70);
    --${componentName.toLowerCase()}-secondary-text-active             : var(--hue);
    --${componentName.toLowerCase()}-secondary-border-active           : var(--hue);
    
    --${componentName.toLowerCase()}-secondary-bg-disabled             : var(--transparent);
    --${componentName.toLowerCase()}-secondary-text-disabled           : var(--slate);
    --${componentName.toLowerCase()}-secondary-border-disabled         : var(--slate);
}`
});