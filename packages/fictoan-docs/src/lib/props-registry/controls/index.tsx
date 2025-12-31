"use client";

// Maps control types to their React components

// REACT CORE ==========================================================================================================
import React from "react";

// UI ==================================================================================================================
import { Checkbox, InputField, RadioTabGroup, Range, ListBox, TextArea } from "fictoan-react";

// OTHER ===============================================================================================================
import { ControlType, ResolvedProp, PropOption } from "../types";

export interface ControlProps {
    prop     : ResolvedProp;
    value    : any;
    onChange : (value : any) => void;
}

// Text Input Control
const TextControl : React.FC<ControlProps> = ({ prop, value, onChange }) => (
    <InputField
        label={prop.label}
        value={value || ""}
        onChange={onChange}
        {...prop.inputProps}
    />
);

// Textarea Control
const TextareaControl : React.FC<ControlProps> = ({ prop, value, onChange }) => (
    <TextArea
        label={prop.label}
        value={value || ""}
        onChange={onChange}
        {...prop.inputProps}
    />
);

// Number Control
const NumberControl : React.FC<ControlProps> = ({ prop, value, onChange }) => (
    <InputField
        type="number"
        label={prop.label}
        value={value?.toString() || ""}
        onChange={(val : string) => onChange(val ? Number(val) : undefined)}
        {...prop.inputProps}
    />
);

// Checkbox Control
const CheckboxControl : React.FC<ControlProps> = ({ prop, value, onChange }) => (
    <Checkbox
        id={`prop-${prop.name}`}
        label={prop.label}
        checked={value ?? prop.defaultValue ?? false}
        onChange={onChange}
        {...prop.inputProps}
    />
);

// Select Control (using ListBox)
const SelectControl : React.FC<ControlProps> = ({ prop, value, onChange }) => {
    const options = (prop.options || []).map((opt : PropOption) => ({
        value : opt.value,
        label : opt.label,
    }));

    return (
        <ListBox
            label={prop.label}
            options={options}
            value={value || ""}
            onChange={onChange}
            {...prop.inputProps}
        />
    );
};

// Radio Control
const RadioControl : React.FC<ControlProps> = ({ prop, value, onChange }) => {
    const options = (prop.options || []).map((opt : PropOption) => ({
        id    : `prop-${prop.name}-${opt.value}`,
        value : opt.value,
        label : opt.label,
    }));

    return (
        <RadioTabGroup
            id={`prop-${prop.name}`}
            name={prop.name}
            label={prop.label}
            options={options}
            value={value}
            onChange={onChange}
            {...prop.inputProps}
        />
    );
};

// Range Control
const RangeControl : React.FC<ControlProps> = ({ prop, value, onChange }) => (
    <Range
        label={prop.label}
        value={value ?? prop.defaultValue ?? 0}
        onChange={onChange}
        {...prop.inputProps}
    />
);

// Color Control (using ListBox with color options)
const ColorControl : React.FC<ControlProps> = ({ prop, value, onChange }) => {
    const options = (prop.options || []).map((opt : PropOption) => ({
        value : opt.value,
        label : opt.label,
    }));

    return (
        <ListBox
            label={prop.label}
            options={options}
            value={value || ""}
            onChange={onChange}
            placeholder="Select colour"
            {...prop.inputProps}
        />
    );
};

// Spacing Control
const SpacingControl : React.FC<ControlProps> = ({ prop, value, onChange }) => {
    const spacingOptions = [
        { id : `prop-${prop.name}-none`, value : "none", label : "none" },
        { id : `prop-${prop.name}-nano`, value : "nano", label : "nano" },
        { id : `prop-${prop.name}-micro`, value : "micro", label : "micro" },
        { id : `prop-${prop.name}-tiny`, value : "tiny", label : "tiny" },
        { id : `prop-${prop.name}-small`, value : "small", label : "small" },
        { id : `prop-${prop.name}-medium`, value : "medium", label : "medium" },
        { id : `prop-${prop.name}-large`, value : "large", label : "large" },
        { id : `prop-${prop.name}-huge`, value : "huge", label : "huge" },
    ];

    return (
        <RadioTabGroup
            id={`prop-${prop.name}`}
            name={prop.name}
            label={prop.label}
            options={spacingOptions}
            value={value}
            onChange={onChange}
            {...prop.inputProps}
        />
    );
};

// Code Control (for complex values displayed as code)
const CodeControl : React.FC<ControlProps> = ({ prop, value, onChange }) => (
    <TextArea
        label={prop.label}
        value={typeof value === "string" ? value : JSON.stringify(value, null, 2)}
        onChange={(val : string) => {
            try {
                onChange(JSON.parse(val));
            } catch {
                onChange(val);
            }
        }}
        {...prop.inputProps}
    />
);

export const controlRegistry : Record<ControlType, React.FC<ControlProps>> = {
    InputField     : TextControl,
    TextArea       : TextareaControl,
    NumberInput    : NumberControl,
    Checkbox       : CheckboxControl,
    ListBox        : SelectControl,
    RadioTabGroup  : RadioControl,
    Range          : RangeControl,
    ColourPicker   : ColorControl,
    SpacingPicker  : SpacingControl,
    CodeBlock      : CodeControl,
};

// Get the appropriate control component for a prop
export function getControlComponent(controlType : ControlType) : React.FC<ControlProps> {
    return controlRegistry[controlType] || TextControl;
}

// Infer the best control type from prop metadata
export function inferControlType(
    propName : string,
    propType : string,
    options? : PropOption[],
) : ControlType {
    // If options are provided, use RadioTabGroup for few options, ListBox for many
    if (options && options.length > 0) {
        return options.length <= 5 ? "RadioTabGroup" : "ListBox";
    }

    // Check prop type
    if (propType === "boolean") {
        return "Checkbox";
    }

    if (propType === "number") {
        return "NumberInput";
    }

    // Check for enum types (contains |)
    if (propType.includes("|")) {
        const enumValues = propType.split("|").map((v) => v.trim().replace(/['"]/g, ""));
        return enumValues.length <= 5 ? "RadioTabGroup" : "ListBox";
    }

    // Check prop name patterns
    const lowerName = propName.toLowerCase();

    if (lowerName.includes("color") || lowerName.includes("colour")) {
        return "ColourPicker";
    }

    if (lowerName.includes("padding") || lowerName.includes("margin") || lowerName === "size") {
        return "SpacingPicker";
    }

    // Default to InputField
    return "InputField";
}
