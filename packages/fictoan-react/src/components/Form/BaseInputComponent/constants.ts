import React, { ChangeEvent } from "react";

import { ElementProps } from "../../Element/constants";
import { InputLabelCustomProps } from "../InputLabel/InputLabel";

// prettier-ignore
export interface InputCommonProps {
    helpText        ? : string;
    errorText       ? : string;
    validateThis    ? : boolean;
    valid           ? : boolean;
    invalid         ? : boolean;
    validationState ? : "valid" | "invalid" | null;
}

// INPUT FIELD PROPS ///////////////////////////////////////////////////////////////////////////////////////////////////
// Define allowed combinations for the left side
type LeftSideProps =
    | { innerIconLeft: React.ReactNode; innerTextLeft ? : never }
    | { innerTextLeft: string; innerIconLeft ? : never }
    | { innerIconLeft ? : never; innerTextLeft ? : never };

// Define allowed combinations for the right side
type RightSideProps =
    | { innerIconRight: React.ReactNode; innerTextRight ? : never }
    | { innerTextRight: string; innerIconRight ? : never }
    | { innerIconRight ? : never; innerTextRight ? : never };

// Allows no side elements
export type NoSideElements = {
    innerIconLeft    ? : never;
    innerIconRight   ? : never;
    innerTextLeft    ? : never;
    innerTextRight   ? : never;
};

// Combine left and right side constraints
export type InputSideElementProps = LeftSideProps & RightSideProps;

// Explicit event handler - ALWAYS receives the event object
export type InputEventHandler = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;

// Explicit value handler - ALWAYS receives the extracted value
export type ValueChangeHandler<T = string> = (value: T) => void;

// Explicit focus handler
export type InputFocusHandler = (event: React.FocusEvent<HTMLInputElement>) => void;

export type InputChangeEvent = React.ChangeEvent<HTMLInputElement
    | HTMLTextAreaElement
    | HTMLSelectElement>;

// Base component props including common form input properties
export type BaseInputComponentProps<K extends {}> =
    Omit<ElementProps<K>, "onChange" | "size"> &
    InputLabelCustomProps &
    InputCommonProps & {
        customLabel ? : React.ReactNode; // For Range component
        onChange    ? : ValueChangeHandler; // Value-based handler - receives extracted value directly (modern approach)
        value       ? : string | number | readonly string[];
        helpText    ? : string | JSX.Element | React.ReactNode; // The node is for TextArea to display colours for limits
}   ;

// Extended component props including side element constraints
export type BaseInputComponentWithIconProps<K extends {}> =
    BaseInputComponentProps<K> &
    InputSideElementProps;
