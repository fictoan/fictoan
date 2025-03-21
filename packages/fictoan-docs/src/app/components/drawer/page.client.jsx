"use client";

// FRAMEWORK ===========================================================================================================
import React, { useState } from "react";

// FICTOAN =============================================================================================================
import {
    Element,
    Heading1,
    Heading2,
    Heading4,
    Divider,
    Portion,
    Row,
    Text,
    Article,
    Card,
    Form,
    Header,
    Button,
    Drawer,
    Range,
    Select,
    CodeBlock,
} from "fictoan-react";

// STYLES ==============================================================================================================
import "./page-drawer.css";

// OTHER ===============================================================================================================
import { colourOptions } from "../../colour/colours";
import { createPropsConfigurator } from "../../../utils/propsConfigurator";
import { drawerProps } from "./config";
import { useThemeVariables } from "../../../utils/useThemeVariables";

const DrawerDocs = () => {
    const { componentVariables, handleVariableChange, cssVariablesList } = useThemeVariables(drawerProps.variables);
    const [isSampleDrawerOpen, setIsSampleDrawerOpen] = useState(false);

    // PROPS CONFIGURATOR ==============================================================================================
    const {
        propsConfigurator,
        componentProps: propsConfig,
        propValues,
    } = createPropsConfigurator(
        "Drawer",
        [
            "position",
            "size",
            "padding",
            "showOverlay",
            "isDismissible",
            "closeOnClickOutside",
        ],
        colourOptions,
        {
            isSelfClosing: false,
            canHaveChildren: true,
            defaultChildren: "Content goes here"
        }
    );
    
    // For debugging
    console.log("Current props config:", propValues);

    return (
        <Article id="page-drawer">
            <Row horizontalPadding="huge" marginTop="medium" marginBottom="small">
                <Portion>
                    <Heading1>Drawer</Heading1>
                    <Text size="large" marginBottom="small">
                        The component is a panel that opens from any designated side of the screen.
                    </Text>
                </Portion>

                <Portion>
                    <Heading4 marginBottom="micro">Characteristics</Heading4>
                    <ul>
                        <li>Accept any React node as children</li>
                    </ul>
                </Portion>
            </Row>

            <Divider kind="primary" horizontalMargin="huge" verticalMargin="small" />

            {/* //////////////////////////////////////////////////////////////////////////////////////////////////// */}
            {/*  CONFIGURATOR */}
            {/* //////////////////////////////////////////////////////////////////////////////////////////////////// */}
            <Row horizontalPadding="small" className="rendered-component">
                {/* DEMO COMPONENT ///////////////////////////////////////////////////////////////////////////////// */}
                <Portion id="component-wrapper">
                    <Element
                        as="div" padding="small" shape="rounded" bgColour="slate-light80"
                        data-centered-children
                    >
                        <Button
                            onClick={() => setIsSampleDrawerOpen(true)}
                            kind="primary"
                        >
                            Open the drawer
                        </Button>
                    </Element>
                </Portion>

                {/* CONFIGURATOR /////////////////////////////////////////////////////////////////////////////////// */}
                <Portion desktopSpan="half">
                    {propsConfigurator()}
                </Portion>

                {/* GLOBAL THEME /////////////////////////////////////////////////////////////////////////////////// */}
                <Portion desktopSpan="half">
                    <Card padding="micro" shape="rounded">
                        <Form>
                            <Header verticallyCentreItems pushItemsToEnds>
                                <Text size="large" weight="700" textColour="white" marginBottom="nano">
                                    Set global theme values
                                </Text>
                            </Header>

                            <Row marginBottom="none">
                                <Portion>
                                    <CodeBlock
                                        withSyntaxHighlighting
                                        source={cssVariablesList}
                                        language="css"
                                        showCopyButton
                                        marginBottom="micro"
                                    />
                                </Portion>

                                {/* BG COLOUR ====================================================================== */}
                                <Portion desktopSpan="half">
                                    <Select
                                        label="Background colour"
                                        options={[{
                                            label    : "Select a colour",
                                            value    : "select-a-colour",
                                            disabled : true,
                                            selected : true,
                                        },
                                            ...colourOptions,]}
                                        defaultValue={componentVariables["drawer-bg"].defaultValue || "select-a-colour"}
                                        onChange={(value) => handleVariableChange("drawer-bg", value)}
                                        isFullWidth
                                    />
                                </Portion>

                                {/* BORDER COLOUR ================================================================== */}
                                <Portion desktopSpan="half">
                                    <Select
                                        label="Border colour"
                                        options={[{
                                            label    : "Select a colour",
                                            value    : "select-a-colour",
                                            disabled : true,
                                            selected : true,
                                        },
                                            ...colourOptions,
                                        ]}
                                        defaultValue={componentVariables["drawer-border"].defaultValue || "select-a-colour"}
                                        onChange={(value) => handleVariableChange("drawer-border", value)}
                                        isFullWidth
                                    />
                                </Portion>

                                {/* DISMISS BUTTON COLOUR ========================================================== */}
                                <Portion desktopSpan="half">
                                    <Select
                                        label="Dismiss button colour"
                                        options={[{
                                            label    : "Select a colour",
                                            value    : "select-a-colour",
                                            disabled : true,
                                            selected : true,
                                        },
                                            ...colourOptions,
                                        ]}
                                        defaultValue={componentVariables["drawer-dismiss-button"].defaultValue || "select-a-colour"}
                                        onChange={(value) => handleVariableChange("drawer-dismiss-button", value)}
                                        isFullWidth
                                    />
                                </Portion>

                                <Portion desktopSpan="half" />

                                {/* BORDER RADIUS ================================================================== */}
                                <Portion desktopSpan="half">
                                    <Range
                                        label="Border radius"
                                        value={componentVariables["drawer-border-radius"].value}
                                        onChange={(value) => handleVariableChange("drawer-border-radius", value)}
                                        min={0} max={50} step={1}
                                        suffix={componentVariables["drawer-border-radius"].unit}
                                    />
                                </Portion>

                                {/* OVERLAY COLOUR ================================================================= */}
                                <Portion desktopSpan="half">
                                    <Range
                                        label="Overlay blur"
                                        value={componentVariables["drawer-overlay-blur"].value}
                                        onChange={(value) => handleVariableChange("drawer-overlay-blur", value)}
                                        min={0} max={50} step={1}
                                        suffix={componentVariables["drawer-overlay-blur"].unit}
                                    />
                                </Portion>
                            </Row>
                        </Form>
                    </Card>
                </Portion>
            </Row>

            <Drawer
                openWhen={isSampleDrawerOpen}
                closeWhen={() => setIsSampleDrawerOpen(false)}
                position={propsConfig.position || "right"}
                size={propsConfig.size}
                padding={propsConfig.padding}
                showOverlay={propsConfig.showOverlay}
                isDismissible={propsConfig.isDismissible} 
                closeOnClickOutside={propsConfig.closeOnClickOutside}
            >
                <Heading2 marginBottom="nano">Hello</Heading2>
                <Text>You can add all sorts of content here inside the info panel.</Text>
                <Button onClick={() => setIsSampleDrawerOpen(false)}>Close</Button>

                <Row marginTop="medium" marginBottom="medium">
                    {/* PROBLEM ================================================ */}
                    <Portion>
                        <Text weight="700" marginBottom="small">MANIFESTO</Text>
                    </Portion>

                    <Portion>
                        <Heading1 weight="400" marginBottom="micro">
                            The hand-off process is broken
                        </Heading1>

                        <Text size="large" marginBottom="micro">
                            Hand-offs are treated akin to passing baton, and a its-your-problem-now attitude.
                        </Text>

                        <Text size="large" marginBottom="micro">
                            Designers and developers bickering over details is a common sight.
                        </Text>

                        <Text size="large" marginBottom="micro">
                            Back and forth over specifics is a massive time-sponge.
                        </Text>

                        <Text size="large" marginBottom="micro">
                            It shouldn’t be this way.
                        </Text>
                    </Portion>
                </Row>
            </Drawer>
        </Article>
    );
};

export default DrawerDocs;
