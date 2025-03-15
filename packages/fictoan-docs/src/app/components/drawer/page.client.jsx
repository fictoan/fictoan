"use client";

// EXTERNAL DEPS =======================================================================================================
import React, { useState } from "react";

// INTERNAL DEPS =======================================================================================================
import {
    Element,
    Heading1,
    Heading2,
    Heading3,
    Heading4,
    Heading5,
    Heading6,
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
    RadioTabGroup,
    Checkbox,
    Range,
    Select,
    CodeBlock,
} from "fictoan-react";

// COMPONENTS ==========================================================================================================

// STYLES ==============================================================================================================
import "./page-drawer.css";

// HOOKS ===============================================================================================================
import { useThemeVariables } from "../../../utils/useThemeVariables";

// UTILS ===============================================================================================================
import { colourOptions } from "../../colour/colours";

// DATA ================================================================================================================
import { drawerProps } from "./config";

const DrawerDocs = () => {
    const { componentVariables, handleVariableChange, cssVariablesList } = useThemeVariables(drawerProps.variables);

    // CUSTOMISE =======================================================================================================
    const [selectedPosition, setSelectedPosition] = useState("right");
    const [selectedSize, setSelectedSize] = useState("");
    const [selectedPadding, setSelectedPadding] = useState("");
    const [showOverlay, setShowOverlay] = useState(false);
    const [isDismissible, setIsDismissible] = useState(false);
    const [closeOnClickOutside, setCloseOnClickOutside] = useState(false);
    const [openWhen, setOpenWhen] = useState("");
    const [closeWhen, setCloseWhen] = useState("");

    // THEME ===========================================================================================================
    const [selectedBgColour, setSelectedBgColour] = useState("");
    const [selectedBorderColour, setSelectedBorderColour] = useState("");

    const [isSampleDrawerOpen, setIsSampleDrawerOpen] = useState(false);

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
                    <Form>
                        <Card padding="micro" shape="rounded">
                            <Header verticallyCentreItems pushItemsToEnds marginBottom="micro">
                                <Text size="large" weight="700" textColour="white">
                                    Configure props
                                </Text>
                            </Header>

                            <Row marginBottom="none">
                                <Portion>
                                    <CodeBlock withSyntaxHighlighting language="jsx" showCopyButton marginBottom="micro">
                                        {[
                                            `// Paste this in your content file`,
                                            `const [isSampleDrawerOpen, setIsSampleDrawerOpen] = useState(false);`,
                                            ` `,
                                            `<Button onClick={() => setIsSampleDrawerOpen(true)}>Open the drawer</Button>`,
                                            ` `,
                                            `<Drawer`,
                                            selectedPosition ? `    position="${selectedPosition}"` : null,
                                            selectedPadding ? `    padding="${selectedPadding}"` : null,
                                            selectedSize ? `    size="${selectedSize}"` : null,
                                            openWhen ? `    openWhen="${openWhen}"` : null,
                                            closeWhen ? `    closeWhen="${closeWhen}"` : null,
                                            closeOnClickOutside ? `    closeOnClickOutside` : null,
                                            isDismissible ? `    isDismissible` : null,
                                            showOverlay ? `    showOverlay` : null,
                                            `>Content goes here</Drawer>`,
                                        ].filter(Boolean).join("\n")}
                                    </CodeBlock>
                                </Portion>

                                {/* POSITION ======================================================================= */}
                                <Portion>
                                    <RadioTabGroup
                                        id="position" label="Position" name="position"
                                        options={[
                                            { id : "position-opt-0", value : "left", label : "left" },
                                            { id : "position-opt-1", value : "top", label : "top" },
                                            { id : "position-opt-2", value : "right", label : "right" },
                                            { id : "position-opt-3", value : "bottom", label : "bottom" },
                                        ]}
                                        value={selectedPosition || "right"}
                                        onChange={(value) => setSelectedPosition(value)}
                                    />

                                    <Divider kind="secondary" horizontalMargin="none" verticalMargin="nano" />
                                </Portion>

                                {/* SIZE =========================================================================== */}
                                <Portion>
                                    <RadioTabGroup
                                        id="size" label="Size" name="size"
                                        options={[
                                            { id : "size-opt-0", value : "none", label : "none" },
                                            { id : "size-opt-3", value : "tiny", label : "tiny" },
                                            { id : "size-opt-4", value : "small", label : "small" },
                                            { id : "size-opt-5", value : "medium", label : "medium" },
                                            { id : "size-opt-6", value : "large", label : "large" },
                                            { id : "size-opt-7", value : "huge", label : "huge" },
                                        ]}
                                        value={selectedSize}
                                        onChange={(value) => setSelectedSize(value !== "none" ? value : undefined)}
                                    />

                                    <Divider kind="secondary" horizontalMargin="none" verticalMargin="micro" />
                                </Portion>

                                {/* PADDING ======================================================================== */}
                                <Portion>
                                    <RadioTabGroup
                                        id="padding" name="padding" label="Padding"
                                        options={[
                                            { id : "padding-opt-0", value : "none", label : "none" },
                                            { id : "padding-opt-1", value : "nano", label : "nano" },
                                            { id : "padding-opt-2", value : "micro", label : "micro" },
                                            { id : "padding-opt-3", value : "tiny", label : "tiny" },
                                            { id : "padding-opt-4", value : "small", label : "small" },
                                            { id : "padding-opt-5", value : "medium", label : "medium" },
                                            { id : "padding-opt-6", value : "large", label : "large" },
                                            { id : "padding-opt-7", value : "huge", label : "huge" },
                                        ]}
                                        value={selectedPadding}
                                        onChange={(value) => setSelectedPadding(value !== "none" ? value : undefined)}
                                    />

                                    <Divider kind="secondary" horizontalMargin="none" verticalMargin="nano" />
                                </Portion>

                                {/* OVERLAY ======================================================================== */}
                                <Portion>
                                    <Checkbox
                                        id="checkbox-overlay"
                                        value="checkbox-overlay"
                                        name="checkbox-overlay"
                                        label="Show overlay"
                                        checked={showOverlay}
                                        onChange={(checked) => setShowOverlay(checked)}
                                    />

                                    <Divider kind="secondary" horizontalMargin="none" verticalMargin="nano" />
                                </Portion>

                                {/* DISMISSIBLE ==================================================================== */}
                                <Portion>
                                    <Checkbox
                                        id="checkbox-dismissible"
                                        value="checkbox-dismissible"
                                        name="checkbox-dismissible"
                                        label="Is dismissible"
                                        checked={isDismissible}
                                        onChange={(checked) => setIsDismissible(checked)}
                                    />

                                    <Divider kind="secondary" horizontalMargin="none" verticalMargin="nano" />
                                </Portion>

                                {/* OVERLAY ======================================================================== */}
                                <Portion>
                                    <Checkbox
                                        id="checkbox-close-on-click-outside"
                                        value="checkbox-close-on-click-outside"
                                        name="checkbox-close-on-click-outside"
                                        label="Close on clicking outside"
                                        checked={closeOnClickOutside}
                                        onChange={(checked) => setCloseOnClickOutside(checked)}
                                    />
                                </Portion>
                            </Row>
                        </Card>
                    </Form>
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
                position={selectedPosition}
                padding={selectedPadding}
                openWhen={isSampleDrawerOpen}
                closeWhen={() => setIsSampleDrawerOpen(false)}
                showOverlay={showOverlay}
                isDismissable={isDismissible}
                closeOnClickOutside={closeOnClickOutside}
                size={selectedSize}
                {...(
                    selectedBgColour !== undefined ? { bgColour : selectedBgColour } : {}
                )}
            >
                <Heading2 marginBottom="nano">Hello</Heading2>
                <Text>You can add all sorts of content here inside the info panel.</Text>
                <Button onClick={() => setIsSampleDrawerOpen(false)}>Close</Button>
            </Drawer>
        </Article>
    );
};

export default DrawerDocs;
