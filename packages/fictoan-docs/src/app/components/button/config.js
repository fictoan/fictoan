// LIST OF PROPS =======================================================================================================
import { Portion, Row, Button } from "fictoan-react";
import React from "react";

export const buttonProps = {
    component  : "Button",
    properties : [
        "label",
        "kind",
        "size",
        "shape",
        "shadow",
        "bgColour",
        "textColour",
        "borderColour",
        "is-loading",
    ],
    variables  : {
        // PRIMARY BUTTON ======================================================
        "button-primary-bg-default"             : {
            type         : "reference",
            defaultValue : "blue",
        },
        "button-primary-text-default"           : {
            type         : "reference",
            defaultValue : "white",
        },
        "button-primary-border-default"         : {
            type         : "reference",
            defaultValue : "blue",
        },
        "button-primary-border-width-default"   : {
            type         : "reference",
            defaultValue : "global-border-width",
        },
        "button-primary-border-radius-default"  : {
            type         : "reference",
            defaultValue : "global-border-radius",
        },
        "button-primary-bg-hover"               : {
            type         : "reference",
            defaultValue : "blue-light10",
        },
        "button-primary-text-hover"             : {
            type         : "reference",
            defaultValue : "white",
        },
        "button-primary-border-hover"           : {
            type         : "reference",
            defaultValue : "blue-dark30",
        },
        "button-primary-border-width-hover"     : {
            type         : "reference",
            defaultValue : "global-border-width",
        },
        "button-primary-border-radius-hover"    : {
            type         : "reference",
            defaultValue : "global-border-radius",
        },
        "button-primary-spinner-loading"        : {
            type         : "reference",
            defaultValue : "white",
        },
        "button-primary-bg-disabled"            : {
            type         : "reference",
            defaultValue : "blue-light10",
        },
        "button-primary-text-disabled"          : {
            type         : "reference",
            defaultValue : "white",
        },
        "button-primary-border-disabled" : {
            type         : "reference",
            defaultValue : "blue-light10",
        },
        "button-primary-border-width-disabled"  : {
            type         : "reference",
            defaultValue : "global-border-width",
        },
        "button-primary-border-radius-disabled" : {
            type         : "reference",
            defaultValue : "global-border-radius",
        },
    },
};

// RENDER SAMPLE =======================================================================================================
export const ButtonSample = () => (
    <Row marginBottom="none">
        <Portion desktopSpan="one-fourth">
            <Button kind="primary" isFullWidth>Primary button</Button>
        </Portion>

        <Portion desktopSpan="one-fourth">
            <Button kind="primary" isFullWidth isLoading>Primary button</Button>
        </Portion>

        <Portion desktopSpan="one-fourth">
            <Button kind="secondary" isFullWidth>Secondary button</Button>
        </Portion>

        <Portion desktopSpan="one-fourth">
            <Button kind="secondary" isFullWidth isLoading>Secondary button</Button>
        </Portion>

        <Portion desktopSpan="one-fourth">
            <Button kind="tertiary" isFullWidth>Tertiary button</Button>
        </Portion>

        <Portion desktopSpan="one-fourth">
            <Button kind="tertiary" isFullWidth isLoading>Tertiary button</Button>
        </Portion>
    </Row>
);
