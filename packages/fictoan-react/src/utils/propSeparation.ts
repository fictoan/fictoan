// LOCAL COMPONENTS ====================================================================================================
import { CommonProps, SpacingTypes } from "$components/Element/constants";

export interface PropSeparationResult<T extends Record<string, any>> {
    fictoanProps : {
        size ? : Exclude<SpacingTypes, "nano" | "huge">;
    };
    htmlProps    : Omit<T, "size"> & {
        size ? : number;
    };
}

/**
 * Separates Fictoan-specific props from HTML props to prevent conflicts.
 *
 * The main conflict is with the 'size' prop:
 * - Fictoan uses size as a string for CSS classes (e.g., "small", "medium", "large")
 * - HTML form elements use size as a number for visual width
 *
 * @param props - The props object to separate
 * @returns Object with fictoanProps and htmlProps
 */
export const separateFictoanFromHTMLProps = <T extends Record<string, any>>(
    props : T,
) : PropSeparationResult<T> => {
    const {size, ...htmlProps} = props;

    // Check if size is a valid FormItem size (excluding nano and huge)
    const isValidFormItemSize = typeof size === "string" && [
        "none", "micro", "tiny", "small", "medium", "large",
    ].includes(size);

    return {
        fictoanProps : {
            size : isValidFormItemSize ? size as Exclude<SpacingTypes, "nano" | "huge"> : undefined,
        },
        htmlProps    : typeof size === "number" ? {...htmlProps, size} : htmlProps,
    };
};

// List of CommonProps keys that should be applied to wrapper elements (like FormItem)
// rather than to inner input elements
const WRAPPER_PROP_KEYS: (keyof CommonProps)[] = [
    // Colours
    "bgColor",
    "bgColour",
    "bgOpacity",
    "textColor",
    "textColour",
    "borderColor",
    "borderColour",
    "borderOpacity",
    "fillColor",
    "fillColour",
    "strokeColor",
    "strokeColour",
    // Visual
    "shadow",
    "shape",
    "opacity",
    // Layout
    "layoutAsFlexbox",
    "stackVertically",
    "stackHorizontally",
    "layoutAsGrid",
    "columns",
    "gap",
    // Margin
    "margin",
    "horizontalMargin",
    "verticalMargin",
    "marginTop",
    "marginRight",
    "marginBottom",
    "marginLeft",
    // Padding
    "padding",
    "horizontalPadding",
    "verticalPadding",
    "paddingTop",
    "paddingRight",
    "paddingBottom",
    "paddingLeft",
    // Alignment
    "horizontallyCentreThis",
    "horizontallyCenterThis",
    "verticallyCentreItems",
    "verticallyCenterItems",
    "pushItemsToEnds",
    // Sizing
    "isFullWidth",
    "isFullHeight",
    // Responsive visibility
    "hideOnMobile",
    "showOnlyOnMobile",
    "hideOnTabletPortrait",
    "showOnlyOnTabletPortrait",
    "hideOnTabletLandscape",
    "showOnlyOnTabletLandscape",
    "hideOnDesktop",
    "showOnlyOnDesktop",
    // Typography
    "weight",
    // Custom classes
    "classNames",
];

export interface WrapperInputSeparationResult<T extends Record<string, any>> {
    wrapperProps : Partial<CommonProps>;
    inputProps   : Omit<T, keyof CommonProps>;
}

/**
 * Separates wrapper-level props (margin, padding, layout, etc.) from input-specific props.
 *
 * Form components like TextArea and InputField wrap their input in a FormItem.
 * Layout/spacing props should be applied to FormItem (the wrapper), not the inner input.
 *
 * @param props - The props object to separate
 * @returns Object with wrapperProps (for FormItem) and inputProps (for the input element)
 *
 * @example
 * const { wrapperProps, inputProps } = separateWrapperProps(props);
 * return (
 *   <FormItem {...wrapperProps}>
 *     <Element as="textarea" {...inputProps} />
 *   </FormItem>
 * );
 */
export const separateWrapperProps = <T extends Record<string, any>>(
    props: T,
): WrapperInputSeparationResult<T> => {
    const wrapperProps: Partial<CommonProps> = {};
    const inputProps: Record<string, any> = {};

    for (const key of Object.keys(props)) {
        if (WRAPPER_PROP_KEYS.includes(key as keyof CommonProps)) {
            (wrapperProps as any)[key] = props[key];
        } else {
            inputProps[key] = props[key];
        }
    }

    return {
        wrapperProps,
        inputProps: inputProps as Omit<T, keyof CommonProps>,
    };
};