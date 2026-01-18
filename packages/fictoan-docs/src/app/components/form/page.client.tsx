"use client";

// REACT CORE ==========================================================================================================
import React, { useState, useMemo } from "react";

// UI ==================================================================================================================
import { Div, Heading2, Divider, Text, Form, RadioTabGroup, Checkbox, CodeBlock, } from "fictoan-react";

// STYLES ==============================================================================================================
import "./page-form.css";

// OTHER ===============================================================================================================
import { ComponentDocsLayout } from "../ComponentDocsLayout";
import { SampleForm } from "./SampleForm";

const FormDocs = () => {
    const [selectedSpacing, setSelectedSpacing] = useState("small");
    const [selectedSize, setSelectedSize] = useState("medium");
    const [isJoint, setIsJoint] = useState(false);
    const [isButtonFullWidth, setIsButtonFullWidth] = useState(false);

    // Generate code
    const codeString = useMemo(() => {
        const sizeAttr = selectedSize !== "medium" ? `\n                size="${selectedSize}"` : "";
        const spacingAttr = selectedSpacing ? `\n            spacing="${selectedSpacing}"` : "";
        const jointAttr = isJoint ? " isJoint" : "";
        const fullWidthAttr = isButtonFullWidth ? `\n                    isFullWidth` : "";

        return `// IMPORTS =====================================================
import { useState, FormEvent } from "react";
import {
    Form,
    FormItemGroup,
    InputField,
    TextArea,
    Select,
    ListBox,
    FileUpload,
    Range,
    RadioTabGroup,
    RadioGroup,
    CheckboxGroup,
    SwitchGroup,
    Checkbox,
    Switch,
    Button,
    Divider,
    Footer,
} from "fictoan-react";

const MyForm = () => {
    const [formData, setFormData] = useState({
        // Text inputs
        firstName   : "",
        lastName    : "",
        email       : "",
        password    : "",
        phoneNumber : "",
        website     : "",

        // Rich inputs
        about : "",

        // Selects and ListBox
        country  : "",
        language : "",
        skills   : [] as string[],

        // Options
        gender            : "female",
        contactPreference : "sms",

        // Checkboxes and Switches
        interests          : [] as string[],
        food               : [] as string[],
        preferredCountries : [] as string[],
        notifications      : false,
        newsletter         : false,

        // Range
        experienceLevel     : "5",
        experienceAsManager : "3",

        termsAccepted : false,
    });

    const [showPassword, setShowPassword] = useState(false);

    const handleInputChange = (name: string) => (
        valueOrEvent: string | string[] | React.ChangeEvent<HTMLInputElement>,
    ) => {
        if (Array.isArray(valueOrEvent)) {
            setFormData(prev => ({ ...prev, [name]: valueOrEvent }));
            return;
        }
        const value = typeof valueOrEvent === "string"
            ? valueOrEvent
            : valueOrEvent.target.value;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleRadioChange = (name: string) => (value: string) => {
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleCheckboxChange = (name: string) => (checked: boolean) => {
        setFormData(prev => ({ ...prev, [name]: checked }));
    };

    const handleRangeChange = (name: string) => (value: number) => {
        setFormData(prev => {
            const updates: Record<string, string> = { [name]: value.toString() };
            if (name === "experienceLevel" && value < Number(prev.experienceAsManager)) {
                updates.experienceAsManager = value.toString();
            }
            return { ...prev, ...updates };
        });
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        console.log("Form submitted:", formData);
    };

    return (
        <Form${spacingAttr}
            onSubmit={handleSubmit}
        >
            {/* NAME FIELDS */}
            <FormItemGroup${jointAttr}>
                <InputField
                    label="First name"
                    value={formData.firstName}
                    onChange={handleInputChange("firstName")}${sizeAttr}
                    required
                />
                <InputField
                    label="Last name"
                    value={formData.lastName}
                    onChange={handleInputChange("lastName")}${sizeAttr}
                    required
                />
            </FormItemGroup>

            {/* EMAIL */}
            <InputField
                label="Email"
                type="email"
                value={formData.email}
                onChange={handleInputChange("email")}${sizeAttr}
                required
            />

            {/* PASSWORD */}
            <InputField
                label="Password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={handleInputChange("password")}
                helpText="At least 8 characters"${sizeAttr}
            />

            {/* PHONE AND WEBSITE */}
            <FormItemGroup${jointAttr}>
                <InputField
                    label="Phone number"
                    type="tel"
                    value={formData.phoneNumber}
                    onChange={handleInputChange("phoneNumber")}${sizeAttr}
                />
                <InputField
                    label="Website"
                    type="url"
                    value={formData.website}
                    onChange={handleInputChange("website")}${sizeAttr}
                />
            </FormItemGroup>

            {/* ABOUT */}
            <TextArea
                label="About you"
                characterLimit={50}
                wordLimit={10}${sizeAttr}
                onChange={handleInputChange("about")}
                value={formData.about}
            />

            {/* SELECTS */}
            <FormItemGroup equalWidthForChildren>
                <Select
                    label="Country"
                    value={formData.country}
                    onChange={handleInputChange("country")}
                    options={[
                        { label: "United States", value: "us" },
                        { label: "United Kingdom", value: "uk" },
                        { label: "Canada", value: "ca" },
                    ]}${sizeAttr}
                    isFullWidth
                />
                <Select
                    label="Language"
                    value={formData.language}
                    onChange={handleInputChange("language")}
                    options={[
                        { label: "English", value: "en" },
                        { label: "Spanish", value: "es" },
                        { label: "French", value: "fr" },
                    ]}${sizeAttr}
                    isFullWidth
                />
            </FormItemGroup>

            {/* LISTBOX */}
            <ListBox
                label="Skills"
                value={formData.skills}
                onChange={handleInputChange("skills")}
                options={[
                    { value: "react", label: "React" },
                    { value: "vue", label: "Vue" },
                    { value: "angular", label: "Angular" },
                ]}
                allowMultiSelect
                allowCustomEntries${sizeAttr}
                isFullWidth
            />

            {/* FILE UPLOAD */}
            <FileUpload
                id="file-upload"
                label="Upload your resume"
                allowMultipleFiles
                accept=".pdf,.doc,.docx"
                onChange={(files) => console.log("Files:", files)}
                required
            />

            {/* RANGE */}
            <FormItemGroup equalWidthForChildren>
                <Range
                    label="Experience"
                    min={1}
                    max={20}
                    suffix=" years"
                    value={Number(formData.experienceLevel)}
                    onChange={handleRangeChange("experienceLevel")}${sizeAttr}
                    isFullWidth
                />
                <Range
                    label="Exp as manager"
                    min={1}
                    max={Number(formData.experienceLevel)}
                    suffix=" years"
                    value={Number(formData.experienceAsManager)}
                    onChange={handleRangeChange("experienceAsManager")}${sizeAttr}
                    isFullWidth
                />
            </FormItemGroup>

            {/* RADIO TAB GROUP */}
            <RadioTabGroup
                id="contact-preference"
                label="Preferred contact method"
                value={formData.contactPreference}
                options={[
                    { id: "email-contact", label: "Email", value: "email" },
                    { id: "phone-contact", label: "Phone", value: "phone" },
                    { id: "sms-contact", label: "SMS", value: "sms" },
                ]}
                onChange={handleRadioChange("contactPreference")}${sizeAttr}
            />

            {/* RADIO GROUP */}
            <RadioGroup
                label="Gender"
                name="gender"
                value={formData.gender}
                options={[
                    { id: "male", label: "Male", value: "male" },
                    { id: "female", label: "Female", value: "female" },
                    { id: "other", label: "Other", value: "other" },
                ]}
                onChange={handleRadioChange("gender")}${sizeAttr}
            />

            {/* CHECKBOX GROUP */}
            <CheckboxGroup
                label="Preferred cuisine"
                name="food"
                options={[
                    { id: "food-indian", value: "Indian", label: "Indian" },
                    { id: "food-italian", value: "Italian", label: "Italian" },
                    { id: "food-french", value: "French", label: "French" },
                ]}
                value={formData.food}
                onChange={(values) => setFormData({ ...formData, food: values })}${sizeAttr}
                columns={2}
            />

            {/* SWITCH GROUP */}
            <SwitchGroup
                label="Preferred country"
                name="preferredCountries"
                options={[
                    { id: "country-india", value: "India", label: "India" },
                    { id: "country-italy", value: "Italy", label: "Italy" },
                    { id: "country-france", value: "France", label: "France" },
                ]}
                value={formData.preferredCountries}
                onChange={(values) => setFormData({ ...formData, preferredCountries: values })}${sizeAttr}
                align="horizontal"
            />

            {/* INDIVIDUAL SWITCHES */}
            <FormItemGroup equalWidthForChildren>
                <Switch
                    id="notifications"
                    label="Enable notifications"
                    checked={formData.notifications}
                    onChange={handleCheckboxChange("notifications")}${sizeAttr}
                />
                <Switch
                    id="newsletter"
                    label="Subscribe to newsletter"
                    checked={formData.newsletter}
                    onChange={handleCheckboxChange("newsletter")}${sizeAttr}
                />
            </FormItemGroup>

            <Divider marginBottom="micro" kind="secondary" />

            <Footer verticallyCentreItems pushItemsToEnds>
                <Checkbox
                    id="terms"
                    label="I accept the terms and conditions"
                    checked={formData.termsAccepted}
                    onChange={handleCheckboxChange("termsAccepted")}${sizeAttr}
                    labelFirst
                />

                <Button
                    kind="primary"
                    type="submit"
                    size="large"${fullWidthAttr}
                >
                    Submit
                </Button>
            </Footer>
        </Form>
    );
};`;
    }, [selectedSpacing, selectedSize, isJoint, isButtonFullWidth]);

    return (
        <ComponentDocsLayout pageId="page-form">
            {/* INTRO HEADER /////////////////////////////////////////////////////////////////////////////////////// */}
            <Div id="intro-header">
                <Heading2 id="component-name">Form</Heading2>

                <Text id="component-description" weight="400">
                    A parent wrapper for all form elements, used to space them evenly
                </Text>
            </Div>

            {/* INTRO NOTES //////////////////////////////////////////////////////////////////////////////////////// */}
            <Div id="intro-notes">
                <Divider kind="tertiary" verticalMargin="micro" />

                <Text>
                    The <code>Form</code> component is a wrapper that provides consistent spacing between
                    form elements. Use the <code>spacing</code> prop to control the gap between items.
                </Text>

                <Text>
                    Group related fields together with <code>FormItemGroup</code>, which can optionally
                    join inputs visually with the <code>isJoint</code> prop.
                </Text>
            </Div>

            {/* DEMO COMPONENT ///////////////////////////////////////////////////////////////////////////////////// */}
            <Div id="demo-component">
                <SampleForm
                    spacing={selectedSpacing}
                    size={selectedSize}
                    isJoint={isJoint}
                    isButtonFullWidth={isButtonFullWidth}
                />
            </Div>

            {/* PROPS CONFIG /////////////////////////////////////////////////////////////////////////////////////// */}
            <Div id="props-config">
                <CodeBlock language="jsx" withSyntaxHighlighting showCopyButton marginBottom="micro">
                    {codeString}
                </CodeBlock>

                <Div className="doc-controls">
                    <RadioTabGroup
                        id="spacing"
                        label="spacing"
                        name="spacing"
                        options={[
                            { id: "spacing-opt-0", value: "none", label: "none" },
                            { id: "spacing-opt-1", value: "nano", label: "nano" },
                            { id: "spacing-opt-2", value: "micro", label: "micro" },
                            { id: "spacing-opt-3", value: "tiny", label: "tiny" },
                            { id: "spacing-opt-4", value: "small", label: "small" },
                            { id: "spacing-opt-5", value: "medium", label: "medium" },
                            { id: "spacing-opt-6", value: "large", label: "large" },
                            { id: "spacing-opt-7", value: "huge", label: "huge" },
                        ]}
                        value={selectedSpacing}
                        onChange={(value) => setSelectedSpacing(value)}
                        helpText="Controls the vertical gap between form elements"
                    />

                    <Divider kind="secondary" horizontalMargin="none" marginTop="micro" />

                    <RadioTabGroup
                        id="size"
                        label="size"
                        name="size"
                        options={[
                            { id: "size-opt-0", value: "tiny", label: "tiny" },
                            { id: "size-opt-1", value: "small", label: "small" },
                            { id: "size-opt-2", value: "medium", label: "medium" },
                            { id: "size-opt-3", value: "large", label: "large" },
                        ]}
                        value={selectedSize}
                        onChange={(value) => setSelectedSize(value)}
                        helpText="Controls the size of form elements"
                    />

                    <Divider kind="secondary" horizontalMargin="none" marginTop="micro" />

                    <Checkbox
                        id="checkbox-is-joint"
                        label="isJoint"
                        checked={isJoint}
                        onChange={(checked) => setIsJoint(checked)}
                        helpText="Visually joins inputs inside a FormItemGroup"
                    />

                    <Divider kind="secondary" horizontalMargin="none" marginTop="micro" />

                    <Checkbox
                        id="checkbox-button-full-width"
                        label="isFullWidth (on Button)"
                        checked={isButtonFullWidth}
                        onChange={(checked) => setIsButtonFullWidth(checked)}
                        helpText="Makes the submit button span the full width"
                    />
                </Div>
            </Div>

            {/* THEME CONFIG /////////////////////////////////////////////////////////////////////////////////////// */}
            <Div id="theme-config">
                <Text textColour="slate">
                    The Form component inherits spacing from theme variables. Individual form elements
                    have their own theme configuration options.
                </Text>
            </Div>
        </ComponentDocsLayout>
    );
};

export default FormDocs;
