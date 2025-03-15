import React from "react";
import Link from "next/link";

import { Heading1,
    Heading2,
    Heading3,
    Heading4,
    Heading5,
    Heading6, Portion, Row, Text, Article } from "fictoan-react";

const BreadcrumbsDemoDocs = () => {
    return (
        <>
            <head>
                <title>Breadcrumbs demo — Fictoan documentation</title>
            </head>

            <article id="page-breadcrumbs-demo">
                <Row horizontalPadding="huge" marginTop="medium" marginBottom="small">
                    <Portion>
                        <Heading6 weight="400" marginBottom="micro">
                            This page only exists so that the demo link on the Breadcrumbs components doesn’t return a 404 error.
                        </Heading6>

                        <Heading6 weight="400" marginBottom="micro">
                            You’re welcome.
                        </Heading6>

                        <Link href="/components/breadcrumbs">
                            &larr; Back to breadcrumbs docs
                        </Link>
                    </Portion>
                </Row>
            </article>
        </>
    );
};

export default BreadcrumbsDemoDocs;
