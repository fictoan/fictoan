"use client";

import React from "react";

import { Button, Card, Form, Heading1,
    Heading2,
    Heading3,
    Heading4,
    Heading5,
    Heading6, InputField, Portion, Row, Article } from "fictoan-react";

import "./page-home.css";

const HomePage = () => {
    return (
        <Article id="page-home">
            <Row marginTop="medium" horizontalPadding="medium">
                <Portion desktopSpan="two-third">
                    <Heading1>Hello!</Heading1>
                    <Heading6 weight="400">Please login to continue</Heading6>
                </Portion>

                <Portion desktopSpan="one-third">
                    <Card padding="micro" shape="rounded">
                        <Heading6 marginBottom="micro">Login</Heading6>

                        <Form>
                            <InputField label="Email" type="email" />
                            <InputField label="Password" type="password" />

                            <Button
                                bgColour="red"
                                shape="rounded"
                                textColour="white"
                            >
                                LOGIN
                            </Button>
                        </Form>
                    </Card>
                </Portion>
            </Row>
        </Article>
    );
};

export default HomePage;
