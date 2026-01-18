import React from "react";

import { SpacingTypes, CommonProps } from "$components/Element/constants";
import { InputLabelCustomProps } from "../InputLabel/InputLabel";

// Value handler type
export type ValueChangeHandler<T = string> = (value: T) => void;

// RADIO BUTTON ////////////////////////////////////////////////////////////////////////////////////////////////////////
export type RadioButtonElementType = HTMLDivElement;
export type RadioButtonProps = InputLabelCustomProps & {
    id?: string;
    name?: string;
    value: string; // Value is required for radio buttons
    checked?: boolean;
    disabled?: boolean;
    required?: boolean;
    onChange?: ValueChangeHandler<string>;
    helpText?: string;
    errorText?: string;
};

// RADIO GROUP OPTIONS /////////////////////////////////////////////////////////////////////////////////////////////////
export interface RadioGroupOptionProps extends Omit<RadioButtonProps, "onChange" | "checked" | "name"> {
    id: string;
    label: string;
    value: string;
}

// RADIO GROUP /////////////////////////////////////////////////////////////////////////////////////////////////////////
export interface RadioGroupCustomProps {
    name: string;
    options: RadioGroupOptionProps[];
    value?: string;  // For controlled usage
    defaultValue?: string;  // For uncontrolled usage
    onChange?: ValueChangeHandler<string>;
    size?: Exclude<SpacingTypes, "nano" | "huge">;
    columns?: number;
}

export type RadioGroupProps = Omit<RadioButtonProps, keyof RadioGroupCustomProps | "value"> & RadioGroupCustomProps & {
    align?: "horizontal" | "vertical";
    equaliseWidth?: boolean;
    equalizeWidth?: boolean;
};

// RADIO TAB GROUP /////////////////////////////////////////////////////////////////////////////////////////////////////
export interface RadioTabGroupCustomProps {
    size?: Exclude<SpacingTypes, "nano" | "huge">;
    bgColour?: string;
}

// Internal props used by RadioTabGroup implementation (not exposed to users)
export interface RadioTabGroupInternalProps {
    onMeasure: (needsScroll: boolean, maxScroll: number) => void;
    optionsWrapperRef: React.RefObject<HTMLDivElement>;
}

export type RadioTabGroupProps = Omit<RadioGroupProps, keyof RadioTabGroupCustomProps | "name"> & RadioTabGroupCustomProps & CommonProps & {
    name?: string;  // Optional - derived from id if not provided
};
