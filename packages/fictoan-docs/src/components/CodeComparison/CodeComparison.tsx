"use client";

// REACT CORE ==========================================================================================================
import React from "react";

// UI ==================================================================================================================
import { Row, Portion, Text, CodeBlock, Section, Heading2 } from "fictoan-react";

// STYLES ==============================================================================================================
import "./code-comparison.css";

export const CodeComparison = () => {
    return (
        <Section id="comparison-section" verticalPadding="medium">
            {/* CARD COMPARISON */}
            <Row horizontalPadding="medium" gutters="large" marginBottom="none">
                <Portion desktopSpan="two-third">
                    <Heading2 fontStyle="serif" weight="400" marginBottom="nano">
                        See the difference
                    </Heading2>
                </Portion>

                <Portion desktopSpan="one-third" />

                <Portion>
                    <Text marginBottom="micro" textColour="slate-light40">
                        A simple card — same output, different syntax
                    </Text>
                </Portion>

                <Portion desktopSpan="half" className="code-portion">
                    <CodeBlock
                        withSyntaxHighlighting
                        language="jsx"
                        marginBottom="none"
                    >
{`// Utility classes
<div className="bg-white rounded-lg shadow-md
    p-4 mb-4 border border-slate-200"
>
    <h4 className="text-xl font-semibold
        text-slate-800 mb-2"
    >
        Card title
    </h4>

    <p className="text-slate-600">
        Card content goes here
    </p>
</div>`}
                    </CodeBlock>
                </Portion>

                <Portion desktopSpan="half" className="code-portion">
                    <CodeBlock
                        withSyntaxHighlighting
                        language="jsx"
                        marginBottom="none"
                    >
{`// Fictoan
<Card
    shape="rounded" shadow="soft" padding="small"
    bgColour="white" borderColour="slate-light20"
    marginBottom="small"
>
    <Heading4
        textColour="slate" weight="600"
        marginBottom="nano"
    >
        Card title
    </Heading4>

    <Text textColour="slate-light40">
        Card content goes here
    </Text>
</Card>`}
                    </CodeBlock>
                </Portion>
            </Row>

            {/* INPUT FIELD COMPARISON */}
            <Row horizontalPadding="medium" gutters="large" marginTop="medium" marginBottom="none">
                <Portion>
                    <Text marginBottom="micro" textColour="slate-light40">
                        A form input with icon, suffix, label, help text, and validation — built-in
                    </Text>
                </Portion>

                <Portion desktopSpan="half" className="code-portion">
                    <CodeBlock
                        withSyntaxHighlighting
                        language="jsx"
                        marginBottom="none"
                    >
{`// Utility classes
<div className="form-group mb-4">
    <label htmlFor="email"
        className="block text-sm font-medium
            text-gray-700 mb-1">
        Email <span className="text-red-500">*</span>
    </label>

    <div className="relative">
        <span className="absolute left-3 top-1/2
            -translate-y-1/2 text-gray-400">
            <MailIcon size={16} />
        </span>

        <input id="email" type="email" required
            placeholder="you@company.com"
            className="w-full pl-10 pr-14 py-2
                border border-gray-300 rounded-md
                focus:outline-none focus:ring-2
                focus:ring-blue-500"
            aria-required="true"
            aria-invalid={hasError}
            aria-describedby="email-help email-error"
        />

        <span className="absolute right-3 top-1/2
            -translate-y-1/2 text-gray-500
            text-sm">
            .com
        </span>
    </div>

    <p id="email-help"
        className="mt-1 text-sm text-gray-500">
        We'll never share your email
    </p>

    {hasError && (
        <p id="email-error"
            className="mt-1 text-sm text-red-600">
            Please enter a valid email
        </p>
    )}
</div>`}
                    </CodeBlock>
                </Portion>

                <Portion desktopSpan="half" className="code-portion">
                    <CodeBlock
                        withSyntaxHighlighting
                        language="jsx"
                        marginBottom="none"
                    >
{`// Fictoan
<InputField
    label="Email"
    type="email"
    placeholder="you@company.com"
    helpText="We'll never share your email"
    errorText="Please enter a valid email"
    innerIconLeft={<MailIcon />}
    innerTextRight=".com"
    validateThis
    required
/>`}
                    </CodeBlock>
                </Portion>
            </Row>
        </Section>
    );
};
