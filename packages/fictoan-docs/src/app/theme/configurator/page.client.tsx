"use client";

// REACT CORE //////////////////////////////////////////////////////////////////////////////////////////////////////////

// REACT CORE ==========================================================================================================
import React, { useState } from "react";

// UI ==================================================================================================================
import {
    Article,
    Card,
    Div,
    Form,
    Button,
    Badge,
    InputField,
    TextArea,
    Checkbox,
    Switch,
    Select,
    Range,
    ProgressBar,
    Meter,
    Tabs,
    Callout,
    Text,
    Heading1,
    Heading2,
    Heading3,
    Heading4,
    Heading5,
    Heading6,
    Spinner,
    Divider,
    Breadcrumbs,
    Row,
    Portion,
    Section,
} from "fictoan-react";

// STYLES ==============================================================================================================
import "./page-configurator.css";

const ThemeConfigurator = () => {
    const [ checkboxChecked, setCheckboxChecked ] = useState(true);
    const [ switchChecked, setSwitchChecked ] = useState(true);
    const [ rangeValue, setRangeValue ] = useState(50);

    return (
        <Article id="page-configurator">
            <Section>
                <Row horizontalPadding="huge" verticalMargin="small">
                    <Portion>
                        <Div id="intro-header" verticallyCentreItems pushItemsToEnds>
                            <Div>
                                <Heading6 id="component-name">
                                    Theme configurator
                                </Heading6>

                                <Text
                                    id="component-description"
                                    weight="400"
                                >
                                    A simple click to expand/collapse block element.
                                </Text>
                            </Div>

                            <Button></Button>
                        </Div>
                    </Portion>
                </Row>
            </Section>

            <Row horizontalPadding="micro">
                {/* COLUMN 1 /////////////////////////////////////////////////////////////////////////////////////// */}
                <Portion desktopSpan="one-fourth">
                    <Div className="showcase-column">
                        <Card padding="micro" shape="rounded" marginBottom="micro">
                            <Form spacing="micro">
                                <InputField
                                    label="Email"
                                    placeholder="email@example.com"
                                />
                                <InputField
                                    label="Password"
                                    type="password"
                                    placeholder="Enter password"
                                />
                                <Button kind="primary" isFullWidth>
                                    Sign up
                                </Button>
                            </Form>
                        </Card>

                        {/* Callouts */}
                        <Callout kind="success" marginBottom="micro">
                            <Text>Your changes have been saved successfully.</Text>
                        </Callout>

                        <Callout kind="error" marginBottom="micro">
                            <Text>There was an error processing your request.</Text>
                        </Callout>

                        {/* Progress and Meter */}
                        <ProgressBar
                            label="Progress"
                            value={65} max={100} marginBottom="nano"
                        />

                        <Meter
                            value={75}
                            min={0}
                            max={100}
                            low={25}
                            high={75}
                            optimum={90}
                            label="Meter"
                            height="24px"
                        />
                    </Div>
                </Portion>


                {/* COLUMN 2 /////////////////////////////////////////////////////////////////////////////////////// */}
                <Portion desktopSpan="one-fourth">
                    <Div className="showcase-column">
                        {/* Buttons showcase */}
                        <Div marginBottom="nano">
                            <Button kind="primary" size="small" marginRight="nano">Primary</Button>
                            <Button kind="secondary" size="small" marginRight="nano">Secondary</Button>
                            <Button kind="tertiary" size="small">Tertiary</Button>
                        </Div>
                        <Div marginBottom="nano">
                            <Button kind="primary" size="small" isLoading marginRight="nano">Loading</Button>
                            <Button kind="primary" size="small" disabled>Disabled</Button>
                        </Div>

                        {/* Badges */}
                        <Div>
                            <Badge marginRight="nano">Default</Badge>
                            <Badge bgColour="green-light60" textColour="green-dark20" marginRight="nano">Success</Badge>
                            <Badge bgColour="red-light60" textColour="red-dark20" marginRight="nano">Error</Badge>
                            <Badge bgColour="amber-light60" textColour="amber-dark20">Warning</Badge>
                        </Div>

                        {/* Tabs */}
                        <Tabs
                            tabs={[
                                {key : "tab1", label : "Overview", content : null},
                                {key : "tab2", label : "Analytics", content : null},
                                {key : "tab3", label : "Settings", content : null},
                            ]}
                        />

                        {/* Checkbox and Switch */}
                        <Card padding="micro" shape="rounded" marginBottom="micro">
                            <Form spacing="micro">
                                <Checkbox
                                    id="demo-checkbox"
                                    label="Enable notifications"
                                    checked={checkboxChecked}
                                    onChange={() => setCheckboxChecked(!checkboxChecked)}
                                />
                                <Switch
                                    id="demo-switch"
                                    label="Dark mode"
                                    checked={switchChecked}
                                    onChange={() => setSwitchChecked(!switchChecked)}
                                />
                            </Form>
                        </Card>

                        {/* Spinner */}
                        <Card padding="micro" shape="rounded">
                            <Spinner size="small" horizontallyCentreThis />
                        </Card>
                    </Div>
                </Portion>

                {/* COLUMN 3 /////////////////////////////////////////////////////////////////////////////////////// */}
                <Portion desktopSpan="one-fourth">
                    <Div className="showcase-column">
                        {/* Typography */}
                        <Heading1>H1 Heading</Heading1>
                        <Heading2>H2 Heading</Heading2>
                        <Heading3>H3 Heading</Heading3>
                        <Heading4>H4 Heading</Heading4>
                        <Heading5>H5 Heading</Heading5>
                        <Heading6 marginBottom="nano">H6 Heading</Heading6>
                        <Text>
                            Regular paragraph text with some content to demonstrate the default text styling.
                        </Text>
                        <a href="#">Link text</a>

                        {/* Breadcrumbs */}
                        <Breadcrumbs>
                            <span>Home</span>
                            <span>Products</span>
                            <span>Category</span>
                        </Breadcrumbs>

                        {/* Callouts continued */}
                        <Callout kind="info" marginBottom="micro">
                            <Text>This is an informational message for the user.</Text>
                        </Callout>

                        <Callout kind="warning" marginBottom="micro">
                            <Text>Please review before proceeding.</Text>
                        </Callout>
                    </Div>
                </Portion>

                {/* COLUMN 4 /////////////////////////////////////////////////////////////////////////////////////// */}
                <Portion desktopSpan="one-fourth">
                    <Div className="showcase-column">
                        {/* Select and Range */}
                        <Card padding="micro" shape="rounded" marginBottom="micro">
                            <Form spacing="micro">
                                <Select
                                    label="Select option"
                                    options={[
                                        {value : "opt1", label : "Option 1"},
                                        {value : "opt2", label : "Option 2"},
                                        {value : "opt3", label : "Option 3"},
                                    ]}
                                    isFullWidth
                                />

                                <Range
                                    label="Volume"
                                    value={rangeValue}
                                    onChange={setRangeValue}
                                    min={0}
                                    max={100}
                                    suffix="%"
                                />
                            </Form>
                        </Card>

                        {/* Textarea */}
                        <Card padding="micro" shape="rounded" marginBottom="micro">
                            <Form spacing="micro">
                                <TextArea
                                    placeholder="Type your message here..."
                                    rows={4}
                                />
                                <Button kind="primary" size="small">
                                    Send message
                                </Button>
                            </Form>
                        </Card>

                        {/* Input states */}
                        <Card padding="micro" shape="rounded" marginBottom="micro">
                            <Form spacing="micro">
                                <InputField
                                    label="Default"
                                    placeholder="Default input"
                                />
                                <InputField
                                    label="Email"
                                    type="email"
                                    defaultValue="not-an-email"
                                    errorText="Please enter a valid email"
                                />
                                <InputField
                                    label="Disabled"
                                    defaultValue="Disabled input"
                                    disabled
                                />
                            </Form>
                        </Card>

                        {/* Dividers */}
                        <Card padding="micro" shape="rounded" marginBottom="micro">
                            <Divider kind="primary" marginBottom="nano" />
                            <Divider kind="secondary" marginBottom="nano" />
                            <Divider kind="tertiary" />
                        </Card>
                    </Div>
                </Portion>
            </Row>
        </Article>
    );
};

export default ThemeConfigurator;
