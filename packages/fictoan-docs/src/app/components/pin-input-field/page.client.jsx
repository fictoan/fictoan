"use client";


// EXTERNAL DEPS =======================================================================================================
import React, { useEffect, useState } from "react";
import Link from "next/link";

// INTERNAL DEPS =======================================================================================================
import {
    Element,
    Row,
    Portion,
    Heading1,
    Heading2,
    Heading3,
    Heading4,
    Heading5,
    Heading6,
    Text,
    Divider,
    PinInputField,
    Article,
    CodeBlock,
} from "fictoan-react";

// COMPONENTS ==========================================================================================================

// STYLES ==============================================================================================================
import "./pin-input-field.css";

// HOOKS ===============================================================================================================

// UTILS ===============================================================================================================

// DATA ================================================================================================================
import {
    samplePinInput,
    sampleInputNumberOfFields,
    samplePinInputType, samplePinInputMask, samplePinInputOTP,
} from "./CodeSamples";


const PINInputFieldDocs = () => {
    return (
        <Article id="page-input-field">
            {/* //////////////////////////////////////////////////////////////////////////////////////////////////// */}
            {/* INTRO */}
            {/* //////////////////////////////////////////////////////////////////////////////////////////////////// */}
            <Element as="section" id="intro" marginTop="medium" marginBottom="small">
                <Row layout="flexbox" horizontalPadding="huge">
                    <Portion>
                        <Heading1 className="text-hue">Pin Input field</Heading1>
                        <Text size="large" marginBottom="small">
                            A set of single-character input fields that obscures data entry
                        </Text>
                    </Portion>
                </Row>
            </Element>

            <Divider horizontalMargin="huge" verticalMargin="small" />

            {/* //////////////////////////////////////////////////////////////////////////////////////////////////// */}
            {/*  BASICS  */}
            {/* //////////////////////////////////////////////////////////////////////////////////////////////////// */}
            <Element as="section" id="default">
                <Row horizontalPadding="huge">
                    <Portion>
                        <Heading4 marginBottom="nano">Default</Heading4>

                        <Text marginBottom="micro">
                            The <code>PinInputField</code> uses an array of <code>InputField</code> component, but added
                            with superpowers.
                        </Text>

                        <Text marginBottom="micro">As the bare minimum, add the <code>numberOfFields</code> prop.</Text>

                        <CodeBlock withSyntaxHighlighting source={samplePinInput} language="jsx" marginBottom="micro" />

                        <PinInputField numberOfFields={4} />
                    </Portion>
                </Row>
            </Element>


            <Divider horizontalMargin="huge" verticalMargin="small" />


            {/* //////////////////////////////////////////////////////////////////////////////////////////////////// */}
            {/* PROPS */}
            {/* //////////////////////////////////////////////////////////////////////////////////////////////////// */}
            <Element as="section" id="props">
                {/* NUMBER OF FIELDS ======================================= */}
                <Row horizontalPadding="huge">
                    <Portion>
                        <Heading5 marginBottom="nano">Number of fields</Heading5>

                        <Text marginBottom="micro">
                            This decides the length of PIN you want to accept.
                        </Text>

                        <CodeBlock withSyntaxHighlighting source={sampleInputNumberOfFields} language="jsx" marginBottom="micro" />

                        <PinInputField numberOfFields={3} />
                        <PinInputField numberOfFields={5} />
                    </Portion>
                </Row>


                <Divider kind="secondary" horizontalMargin="huge" verticalMargin="small" />


                {/* TYPE =================================================== */}
                <Row horizontalPadding="huge">
                    <Portion>
                        <Heading5 marginBottom="nano">Type</Heading5>

                        <Text marginBottom="micro">
                            <code>numeric</code>, <code>alphanumeric</code>
                        </Text>

                        <Text marginBottom="micro">
                            This prop decides whether the PIN should be just digits, or accept both alphabets and
                            digits.
                        </Text>

                        <CodeBlock withSyntaxHighlighting source={samplePinInputType} language="jsx" marginBottom="micro" />

                        <Text marginBottom="nano">Numeric:</Text>
                        <PinInputField numberOfFields={4} type="numeric" />

                        <Text marginTop="micro" marginBottom="nano">Alphanumeric:</Text>
                        <PinInputField numberOfFields={4} type="alphanumeric" />

                        <Text marginTop="micro">
                            The <code>numeric</code> type also brings up the numpad by default on phones, when the Pin
                            input is in focus.
                        </Text>
                    </Portion>
                </Row>


                <Divider kind="secondary" horizontalMargin="huge" verticalMargin="small" />


                {/* MASK =================================================== */}
                <Row horizontalPadding="huge">
                    <Portion>
                        <Heading5 marginBottom="nano">Mask</Heading5>

                        <Text marginBottom="micro">
                            This hides the entered character and shows a dot instead.
                        </Text>

                        <CodeBlock withSyntaxHighlighting source={samplePinInputMask} language="jsx" marginBottom="micro" />

                        <PinInputField numberOfFields={4} mask />
                    </Portion>
                </Row>


                <Divider kind="secondary" horizontalMargin="huge" verticalMargin="small" />


                {/* OTP ==================================================== */}
                <Row horizontalPadding="huge">
                    <Portion>
                        <Heading5 marginBottom="nano">OTP</Heading5>

                        <Text marginBottom="micro">
                            Add the <code>isOTP</code> prop, and on supported OSes, the incoming SMS will suggested as a
                            paste-able value.
                        </Text>

                        <CodeBlock withSyntaxHighlighting source={samplePinInputOTP} language="jsx" marginBottom="micro" />

                        <PinInputField numberOfFields={4} isOTP />
                    </Portion>
                </Row>


                <Divider horizontalMargin="huge" verticalMargin="small" />


                {/* //////////////////////////////////////////////////////////////////////////////////////////////////// */}
                {/* THEMING */}
                {/* //////////////////////////////////////////////////////////////////////////////////////////////////// */}
                <Element as="section" id="theming">
                    <Row horizontalPadding="huge" marginBottom="small">
                        <Portion>
                            <Heading4 marginBottom="tiny">Theme</Heading4>

                            <Text>Same as <Link href="/components/form/input-field">InputField</Link>.</Text>
                        </Portion>
                    </Row>
                </Element>
            </Element>
        </Article>
    );
};

export default PINInputFieldDocs;
