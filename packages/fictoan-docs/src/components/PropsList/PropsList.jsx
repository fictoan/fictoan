"use client";

import React from "react";

import {
    Heading6, Divider, Portion, Row, Text } from "fictoan-react";

import "./props-list.css";

export const PropsList = ({ propData }) => {
    return (
        <>
            <Row gutters="huge" horizontalPadding="large" marginBottom="none">
                <Portion>
                    <Heading6>{propData.elementName}</Heading6>
                </Portion>

                <Portion desktopSpan="5">
                    <Text weight="700">Name</Text>
                </Portion>

                <Portion desktopSpan="9">
                    <Text weight="700">Description</Text>
                </Portion>

                <Portion desktopSpan="5">
                    <Text weight="700">Values</Text>
                </Portion>

                <Portion desktopSpan="5">
                    <Text weight="700">Default</Text>
                </Portion>
            </Row>

            <Divider kind="secondary" horizontalMargin="large" verticalMargin="nano" />

            {propData.props.map((props, index) => (
                <React.Fragment key={`props.name - ${index}`}>
                    <Row
                        layout="grid"
                        gutters="huge"
                        horizontalPadding="large"
                        marginBottom="none"
                    >
                        <Portion desktopSpan="5">
                            <Text>
                                {<span dangerouslySetInnerHTML={{ __html: props.name }} />}
                            </Text>
                        </Portion>

                        <Portion desktopSpan="9">
                            <Text>
                                {<span dangerouslySetInnerHTML={{ __html: props.description }} />}
                            </Text>
                        </Portion>

                        <Portion desktopSpan="5" className="props-values-list">
                            {props.values.map((value, index) => (
                                <code key={index}>{value}</code>
                            ))}
                        </Portion>

                        <Portion desktopSpan="5">
                            {props.defaultValue
                                ? <code>{props.defaultValue}</code>
                                : <Text>—</Text>
                            }
                        </Portion>
                    </Row>

                    <Divider kind="tertiary" horizontalMargin="large" verticalMargin="nano" />
                </React.Fragment>
            ))}
        </>
    );
};
