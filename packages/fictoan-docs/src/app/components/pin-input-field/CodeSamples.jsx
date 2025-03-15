// Code sample 01 //////////////////////////////////////////////////////////////

import { PinInputField } from "fictoan-react";
import React from "react";

export const samplePinInput = `<PinInputField numberOfFields={4} />`;


// Code sample 02 //////////////////////////////////////////////////////////////
export const sampleInputNumberOfFields = `<PinInputField numberOfFields={3} />
<PinInputField numberOfFields={5} />`;


// Code sample 02 //////////////////////////////////////////////////////////////
export const samplePinInputType = `<PinInputField numberOfFields={4} type="numeric" />
<PinInputField numberOfFields={4} type="alphanumeric" />`;



// Code sample 02 //////////////////////////////////////////////////////////////
export const samplePinInputMask = `<PinInputField numberOfFields={4} mask />`;



// Code sample 02 //////////////////////////////////////////////////////////////
export const samplePinInputOTP = `<PinInputField numberOfFields={4} isOTP />`;


// Code sample 01 //////////////////////////////////////////////////////////////
export const sampleInputHelpText = `<InputField
    label="Email"
    placeholder="Work email preferred"
    helpText="Confirmation will be sent here"
/>`;

// Code sample 03 //////////////////////////////////////////////////////////////
export const sampleInputRequired = `<InputField
    label="Email"
    placeholder="Work email preferred"
    helpText="Confirmation will be sent to this id"
    required
/>`;

// Code sample 04 //////////////////////////////////////////////////////////////
export const sampleInputTheme = `--input-bg-default            : var(--white);

--input-border-default        : var(--slate-light40);
--input-border-radius-default : var(--global-border-radius);
--input-border-width-default  : var(--global-border-width);

--input-label-default         : var(--paragraph-text-colour);
--input-placeholder-default   : var(--slate-light40);
--input-text-default          : var(--shade);

--input-bg-focus              : var(--white);
--input-border-focus          : var(--slate-light40);
--input-border-width-focus    : var(--global-border-width);
--input-text-focus            : var(--shade);

--input-bg-valid              : var(--white);
--input-border-valid          : var(--green-dark30);
--input-label-valid           : var(--shade);

--input-bg-invalid            : var(--red-light60);
--input-border-invalid        : var(--red-dark30);
--input-label-invalid         : var(--red);
--input-text-invalid          : var(--red);
--input-error-text-invalid    : var(--red);

--input-bg-disabled           : var(--slate-light40);
--input-border-disabled       : var(--slate-light40);
--input-label-disabled        : var(--slate-dark40);
--input-text-disabled         : var(--slate-dark60);

--input-bg-read-only          : var(--slate-light40);
--input-border-read-only      : var(--slate-light40);
--input-label-read-only       : var(--slate-dark40);
--input-text-read-only        : var(--slate-dark60);

--input-required-indicator    : var(--red);

--input-helptext              : var(--slate-dark40);
--input-helptext-scale        : 92%;

--input-icon-default          : var(--slate-light40);
--input-icon-focus            : var(--hue);
--input-icon-valid            : var(--green-dark30);`;
