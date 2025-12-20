import React from "react";

import { BaseInputComponentProps, ValueChangeHandler } from "../BaseInputComponent/constants";
import { SpacingTypes } from "$components/Element/constants";

// RADIO BUTTON ////////////////////////////////////////////////////////////////////////////////////////////////////////
export type RadioButtonElementType = HTMLDivElement;
export type RadioButtonProps = Omit<BaseInputComponentProps<RadioButtonElementType>, "as" | "onChange" | "value"> & {
    value      : string; // Value is required for radio buttons
    checked  ? : boolean;
    onChange ? : ValueChangeHandler<string>;
};

// RADIO GROUP OPTIONS /////////////////////////////////////////////////////////////////////////////////////////////////
export interface RadioGroupOptionProps extends Omit<RadioButtonProps, "onChange" | "checked" | "name"> {
    id    : string;
    label : string;
    value : string;
}

// RADIO GROUP /////////////////////////////////////////////////////////////////////////////////////////////////////////
export interface RadioGroupCustomProps {
    name           : string;
    options        : RadioGroupOptionProps[];
    value        ? : string;  // For controlled usage
    defaultValue ? : string;  // For uncontrolled usage
    onChange     ? : ValueChangeHandler<string>;
}

export type RadioGroupProps = Omit<RadioButtonProps, keyof RadioGroupCustomProps> & RadioGroupCustomProps & {
    align         ? : "horizontal" | "vertical";
    equaliseWidth ? : boolean;
    equalizeWidth ? : boolean;
};

// RADIO TAB GROUP /////////////////////////////////////////////////////////////////////////////////////////////////////
export interface RadioTabGroupCustomProps {
    size ? : SpacingTypes;
}

// Internal props used by RadioTabGroup implementation (not exposed to users)
export interface RadioTabGroupInternalProps {
    onMeasure         : (needsScroll: boolean, maxScroll: number) => void;
    optionsWrapperRef : React.RefObject<HTMLDivElement>;
}

export type RadioTabGroupProps = Omit<RadioGroupProps, keyof RadioTabGroupCustomProps> & RadioTabGroupCustomProps;
