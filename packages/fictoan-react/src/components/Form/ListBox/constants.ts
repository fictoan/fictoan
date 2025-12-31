// REACT CORE ==========================================================================================================
import React from "react";

// LOCAL COMPONENTS ====================================================================================================
import { CommonAndHTMLProps } from "$components/Element/constants";

// Value handler type
export type ValueChangeHandler<T = string> = (value: T) => void;
export interface OptionForListBoxProps {
    value         : string;
    label         : string;
    customLabel ? : React.ReactNode;
    disabled    ? : boolean;
}

export type ListBoxElementType = HTMLDivElement;

type NonZeroNumber = Exclude<number, 0>;

export interface ListBoxCustomProps {
    options            ? : OptionForListBoxProps[];
    label              ? : string;
    helpText           ? : string;
    errorText          ? : string;
    allowMultiSelect   ? : boolean;
    disabled           ? : boolean;
    placeholder        ? : string;
    id                 ? : string;
    defaultValue       ? : string;
    selectionLimit     ? : NonZeroNumber;
    allowCustomEntries ? : boolean;
    isLoading          ? : boolean;
    onChange           ? : ValueChangeHandler<string | string[]>;
    value              ? : string | string[];
    isFullWidth        ? : boolean;
}

export type ListBoxProps =
    Omit<CommonAndHTMLProps<ListBoxElementType>, keyof ListBoxCustomProps>
    & ListBoxCustomProps;
