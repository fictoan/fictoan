export const layoutComponentTemplate = (componentName: string, customProps: string[] = []) => ({
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
    as?: "div" | "section" | "article" | "main" | "aside" | "header" | "footer";
    gutters?: "none" | "nano" | "micro" | "tiny" | "small" | "medium" | "large" | "huge";
    verticalGutters?: "none" | "nano" | "micro" | "tiny" | "small" | "medium" | "large" | "huge";
    horizontalGutters?: "none" | "nano" | "micro" | "tiny" | "small" | "medium" | "large" | "huge";
    retainLayoutOnTabletLandscape?: boolean;
    retainLayoutOnTabletPortrait?: boolean;
    retainLayoutOnMobile?: boolean;${customProps.length > 0 ? '\n    ' + customProps.map(prop => `${prop}?: string;`).join('\n    ') : ''}
}

export type ${componentName}ElementType = HTMLDivElement;

export type ${componentName}Props = Omit<CommonAndHTMLProps<${componentName}ElementType>, keyof ${componentName}CustomProps> & ${componentName}CustomProps;

export const ${componentName} = React.forwardRef(
    ({ 
        as = "div",
        gutters,
        verticalGutters,
        horizontalGutters,
        retainLayoutOnTabletLandscape,
        retainLayoutOnTabletPortrait,
        retainLayoutOnMobile,
        ...props 
    }: ${componentName}Props, ref: React.Ref<${componentName}ElementType>) => {
        let classNames = [];

        if (gutters) {
            classNames.push(\`gutters-\${gutters}\`);
        }

        if (verticalGutters) {
            classNames.push(\`vertical-gutters-\${verticalGutters}\`);
        }

        if (horizontalGutters) {
            classNames.push(\`horizontal-gutters-\${horizontalGutters}\`);
        }

        if (retainLayoutOnTabletLandscape) {
            classNames.push("retain-layout-on-tablet-landscape");
        }

        if (retainLayoutOnTabletPortrait) {
            classNames.push("retain-layout-on-tablet-portrait");
        }

        if (retainLayoutOnMobile) {
            classNames.push("retain-layout-on-mobile");
        }

        return (
            <Element<${componentName}ElementType>
                as={as}
                data-${componentName.toLowerCase()}
                ref={ref}
                classNames={classNames}
                {...props}
            />
        );
    }
);`,

  css: `/* ${componentName.toUpperCase()} ============================================================================================= */
[data-${componentName.toLowerCase()}] {
    display: flex;
    flex-direction: column;
    width: 100%;
}

/* GUTTERS ============================================================================================ */
[data-${componentName.toLowerCase()}].gutters-none {
    gap: 0;
}

[data-${componentName.toLowerCase()}].gutters-nano {
    gap: var(--nano);
}

[data-${componentName.toLowerCase()}].gutters-micro {
    gap: var(--micro);
}

[data-${componentName.toLowerCase()}].gutters-tiny {
    gap: var(--tiny);
}

[data-${componentName.toLowerCase()}].gutters-small {
    gap: var(--small);
}

[data-${componentName.toLowerCase()}].gutters-medium {
    gap: var(--medium);
}

[data-${componentName.toLowerCase()}].gutters-large {
    gap: var(--large);
}

[data-${componentName.toLowerCase()}].gutters-huge {
    gap: var(--huge);
}

/* VERTICAL GUTTERS =================================================================================== */
[data-${componentName.toLowerCase()}].vertical-gutters-none {
    row-gap: 0;
}

[data-${componentName.toLowerCase()}].vertical-gutters-nano {
    row-gap: var(--nano);
}

[data-${componentName.toLowerCase()}].vertical-gutters-micro {
    row-gap: var(--micro);
}

[data-${componentName.toLowerCase()}].vertical-gutters-tiny {
    row-gap: var(--tiny);
}

[data-${componentName.toLowerCase()}].vertical-gutters-small {
    row-gap: var(--small);
}

[data-${componentName.toLowerCase()}].vertical-gutters-medium {
    row-gap: var(--medium);
}

[data-${componentName.toLowerCase()}].vertical-gutters-large {
    row-gap: var(--large);
}

[data-${componentName.toLowerCase()}].vertical-gutters-huge {
    row-gap: var(--huge);
}

/* HORIZONTAL GUTTERS ================================================================================= */
[data-${componentName.toLowerCase()}].horizontal-gutters-none {
    column-gap: 0;
}

[data-${componentName.toLowerCase()}].horizontal-gutters-nano {
    column-gap: var(--nano);
}

[data-${componentName.toLowerCase()}].horizontal-gutters-micro {
    column-gap: var(--micro);
}

[data-${componentName.toLowerCase()}].horizontal-gutters-tiny {
    column-gap: var(--tiny);
}

[data-${componentName.toLowerCase()}].horizontal-gutters-small {
    column-gap: var(--small);
}

[data-${componentName.toLowerCase()}].horizontal-gutters-medium {
    column-gap: var(--medium);
}

[data-${componentName.toLowerCase()}].horizontal-gutters-large {
    column-gap: var(--large);
}

[data-${componentName.toLowerCase()}].horizontal-gutters-huge {
    column-gap: var(--huge);
}

/* RESPONSIVE BEHAVIOR ================================================================================ */
@media (max-width: 1024px) {
    [data-${componentName.toLowerCase()}]:not(.retain-layout-on-tablet-landscape) {
        flex-direction: column;
    }
}

@media (max-width: 768px) {
    [data-${componentName.toLowerCase()}]:not(.retain-layout-on-tablet-portrait) {
        flex-direction: column;
    }
}

@media (max-width: 480px) {
    [data-${componentName.toLowerCase()}]:not(.retain-layout-on-mobile) {
        flex-direction: column;
    }
}`,

  index: `export { ${componentName}, type ${componentName}Props } from "./${componentName}";`,

  themeVariables: `/* ${componentName.toUpperCase()} ============================================================================================= */
:root {
    /* Layout components typically use global spacing variables */
    /* Component-specific overrides can be added here if needed */
}`
});