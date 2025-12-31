// LOCAL COMPONENTS ====================================================================================================
import { SpacingTypes } from "$components/Element/constants";

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