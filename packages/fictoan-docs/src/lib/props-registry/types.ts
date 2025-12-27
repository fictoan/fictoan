// PROPS REGISTRY TYPES ================================================================================================
// Core type definitions for the props registry system

// CONTROL TYPES =======================================================================================================
// Use actual Fictoan component names for consistency
export type ControlType =
    | "InputField"
    | "TextArea"
    | "NumberInput"
    | "Checkbox"
    | "ListBox"
    | "RadioTabGroup"
    | "Range"
    | "ColourPicker"
    | "SpacingPicker"
    | "CodeBlock";

// PROP CONFIGURATION ==================================================================================================
export interface PropOption {
    value  : string;
    label  : string;
}

export interface PropConfig {
    // Display
    label       ? : string;        // Override the prop name display

    // Control
    control     ? : ControlType;   // Which control to render
    options     ? : PropOption[] | string[];  // For ListBox/RadioTabGroup

    // Value
    defaultValue? : any;           // Initial value

    // Behavior
    hidden      ? : boolean;       // Don't show this prop in configurator

    // Pass-through props to the input component (helpText, placeholder, etc.)
    inputProps  ? : Record<string, any>;
}

// MAIN REGISTRY INTERFACE =============================================================================================
export interface PropsRegistryConfig {
    // Component name
    component : string;

    // Props configuration - order of keys determines display order
    props : {
        [propName: string]: PropConfig;
    };

    // Inherited props to hide (from Element, CommonProps, etc.)
    hideInheritedProps ? : boolean;
}

// RESOLVED PROP =======================================================================================================
// After merging with type metadata, this is what the configurator uses
export interface ResolvedProp {
    name         : string;
    label        : string;
    control      : ControlType;
    options     ?: PropOption[];
    defaultValue : any;
    currentValue : any;
    hidden       : boolean;
    inputProps  ?: Record<string, any>;
}
