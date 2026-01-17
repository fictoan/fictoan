"use client";

// REACT CORE ==========================================================================================================
import React, { useState } from "react";

// UI ==================================================================================================================
import { Card, Element, Heading1, Heading2, Heading3, Heading4, Heading5, Heading6, Divider, Portion, Row, Table, Tabs, Text, Article, Div, Header, RadioTabGroup, Checkbox, Button, Select, CodeBlock } from "fictoan-react";

// STYLES ==============================================================================================================
import "./playground-page.css";

const PlaygroundDocs = () => {

    return (
        <Article id="playground-page">
            <Row horizontalPadding="huge" marginTop="medium" marginBottom="small">
                <Portion>
                    <Heading2 id="component-name" marginBottom="nano">
                        Layout playground
                    </Heading2>

                    <Heading6
                        id="component-description"
                        weight="400" opacity="50"
                    >
                        Boolean props to help you quickly place elements in a container.
                    </Heading6>
                </Portion>
            </Row>

            <Row horizontalPadding="micro">
                <Portion>
                    <Card shape="rounded" padding="micro"></Card>
                </Portion>
            </Row>
        </Article>
    );
};

export default PlaygroundDocs;
