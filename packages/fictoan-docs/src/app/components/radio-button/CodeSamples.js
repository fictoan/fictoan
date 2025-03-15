//  Code sample 01 ////////////////////////////////////////////////////////////
export const sampleRadioButton = `<RadioButton
    id="radio-1"
    name="choices"
    value="yes"
    label="Yes"
/>

<RadioButton
    id="radio-2"
    name="choices"
    value="no"
    label="No"
/>

<RadioButton
    id="radio-3"
    name="choices"
    value="maybe"
    label="Maybe"
/>`;

//  Code sample 02 ////////////////////////////////////////////////////////////
export const sampleRadioChecked = `<RadioButton
    id="radio-1"
    name="choices-2"
    value="yes"
    label="Yes"
    defaultChecked
/>

<RadioButton
    id="radio-2"
    name="choices-2"
    value="no"
    label="No"
/>`;


//  Code sample 03 /////////////////////////////////////////////////////////////
export const sampleRadioDisabled = `<RadioButton
    id="radio-1"
    name="choices-1"
    value="yes"
    label="Yes"
/>

<RadioButton
    id="radio-2"
    name="choices-1"
    value="no"
    label="No"
/>

<RadioButton
    id="radio-3"
    name="choices-1"
    value="maybe"
    label="Maybe"
    defaultChecked
    disabled
/>`;


//  Code sample 02 ////////////////////////////////////////////////////////////
export const sampleRadioButtonTheming = `--radio-button-circle-bg-default  : var(--slate-light60);
--radio-button-circle-bg-hover    : var(--slate-light40);
--radio-button-circle-bg-checked  : var(--hue);
--radio-button-circle-bg-disabled : var(--slate-light90);

--radio-button-dot                : var(--white);`;
