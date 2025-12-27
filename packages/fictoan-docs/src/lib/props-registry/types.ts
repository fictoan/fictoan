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
    icon ? : React.ReactNode;
}

export interface PropConfig {
    // Display
    label       ? : string;        // Override the prop name display
    description ? : string;        // Help text shown below the control

    // Control
    control     ? : ControlType;   // Which control to render
    options     ? : PropOption[] | string[];  // For select/radio controls

    // Range control specific
    min         ? : number;
    max         ? : number;
    step        ? : number;
    unit        ? : string;        // e.g., "px", "rem", "%"

    // Behavior
    hidden      ? : boolean;       // Don't show this prop in configurator
    disabled    ? : boolean;       // Show but disable interaction
    defaultValue? : any;           // Initial value for the demo

    // Code generation
    excludeFromCode   ? : boolean; // Don't include in generated code
    codeTransform     ? : (value: any) => string; // Custom code output
}

// DEMO CONFIGURATION ==================================================================================================
export interface DemoConfig {
    hasChildren      ? : boolean;
    childrenContent  ? : string | React.ReactNode;
    defaultProps     ? : Record<string, any>;
    wrapperProps     ? : Record<string, any>;  // Props for the demo wrapper
}

// MAIN REGISTRY INTERFACE =============================================================================================
export interface PropsRegistryConfig {
    // Component identification
    component : string;

    // Prop ordering - props appear in this order
    // Props not listed here appear after, in alphabetical order
    propOrder ? : string[];

    // Per-prop configuration overrides
    props ? : {
        [propName: string]: PropConfig;
    };

    // Demo component configuration
    demo ? : DemoConfig;

    // Inherited props to hide (from Element, CommonProps, etc.)
    hideInheritedProps ? : boolean;  // Hide all inherited props
    showInheritedProps ? : string[]; // Explicitly show these inherited props
}

// RESOLVED PROP =======================================================================================================
// After merging with type metadata, this is what the configurator uses
export interface ResolvedProp {
    name         : string;
    label        : string;
    description  : string;
    control      : ControlType;
    options     ?: PropOption[];
    min         ?: number;
    max         ?: number;
    step        ?: number;
    unit        ?: string;
    required     : boolean;
    defaultValue : any;
    currentValue : any;
    hidden       : boolean;
    disabled     : boolean;
}
