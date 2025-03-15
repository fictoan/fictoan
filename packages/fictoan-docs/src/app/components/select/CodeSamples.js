//  Code sample 01 ////////////////////////////////////////////////////////////
import { Select } from "fictoan-react";
import React from "react";

export const sampleSelect = `<Select
    name="list-of-options"
    options={[
        { label: "Option 1", value: "1" },
        { label: "Option 2", value: "2" }
    ]}
/>`;


//  Code sample 02 ////////////////////////////////////////////////////////////
export const sampleSelectLabel = `<Select
    label="Your options"
    name="list-of-options"
    options={[
        { label : "Option 1", value : "1" },
        { label : "Option 2", value : "2" },
    ]}
/>`;

//  Code sample 03 ////////////////////////////////////////////////////////////
export const sampleSelectOption = `<Select
    label="Your options"
    name="list-of-options"
    options={[
        { label : "Option 1", value : "1" },
        { label : "Option 2", value : "2" },
    ]}
/>`;

//  Code sample 04 ////////////////////////////////////////////////////////////
export const sampleSelectOptionSelected = `<Select
    label="Your options"
    name="list-of-options"
    defaultValue="3" // Set the value from the options array
    options={[
        { label : "Option 1", value : "1" },
        { label : "Option 2", value : "2" },
        { label : "Option 3", value : "3" }
    ]}
/>`;


//  Code sample 05 ////////////////////////////////////////////////////////////
export const sampleSelectGroupOptions = `<Select
    label="Your options"
    name="list-of-options"
    defaultValue="g2-2"
    options={[
        { label : "Option 1", value : "1" },
        { label : "Option 2", value : "2" },
        {
            label   : "Group 1",
            options : [
                { label : "Group 1 Option 1", value : "g1-1" },
                { label : "Group 1 Option 2", value : "g1-2" }
            ]
        },
        {
            label   : "Group 2",
            options : [
                { label : "Group 2 Option 1", value : "g2-1" },
                { label : "Group 2 Option 2", value : "g2-2" }
            ]
        }
    ]}
/>`;


//  Code sample 02 ////////////////////////////////////////////////////////////
export const sampleSelectTheming = `--dropdown-chevron : var(--slate-light40);`;
