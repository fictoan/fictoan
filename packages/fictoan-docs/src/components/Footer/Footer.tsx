"use client";

// REACT CORE ==========================================================================================================
import Link from "next/link";
import React from "react";

// UI ==================================================================================================================
import { Footer, Row, Portion, Text, Heading6, Divider } from "fictoan-react";

// ASSETS ==============================================================================================================
import FictoanLogo from "../../assets/images/fictoan-logo.svg";
import GithubIcon from "../../assets/icons/github.svg";

// STYLES ==============================================================================================================
import "./footer.css";

// OTHER ===============================================================================================================
import { DensityGridPattern } from "../DensityGridPattern/DensityGridPattern";

export const SiteFooter = () => {
    const currentYear = new Date().getFullYear();

    return (
        <Footer id="site-footer" paddingTop="small" paddingBottom="huge">
            {/* BACKGROUND PATTERN ///////////////////////////////////////////////////////////////////////////////// */}
            <DensityGridPattern
                fadeDirection="to-top"
                color="var(--footer-pattern-color)"
                dotSize={12} gap={24}
                height="80%"
                className="footer-bg-pattern"
            />

            {/* MAIN FOOTER CONTENT //////////////////////////////////////////////////////////////////////////////// */}
            <Row horizontalPadding="medium" marginBottom="none">
                {/* BRANDING */}
                <Portion desktopSpan="half">
                    <div className="footer-logo">
                        <FictoanLogo />
                    </div>
                    <Text marginTop="nano" size="small">
                        A design-centric UI framework with plain-English props
                    </Text>
                </Portion>

                {/* DOCUMENTATION LINKS //////////////////////////////////////////////////////////////////////////// */}
                <Portion desktopSpan="one-fourth" tabletLandscapeSpan="3" tabletPortraitSpan="6" mobileSpan="6">
                    <Heading6 weight="600" marginBottom="nano">Docs</Heading6>
                    <ul className="footer-links">
                        <li>
                            <Link href="/getting-started">
                                <Text size="small">Getting started</Text>
                            </Link>
                        </li>
                        <li>
                            <Link href="/theme">
                                <Text size="small">Theme</Text>
                            </Link>
                        </li>
                        <li>
                            <Link href="/layout">
                                <Text size="small">Layout</Text>
                            </Link>
                        </li>
                        <li>
                            <Link href="/typography">
                                <Text size="small">Typography</Text>
                            </Link>
                        </li>
                        <li>
                            <Link href="/colour">
                                <Text size="small">Colour</Text>
                            </Link>
                        </li>
                    </ul>
                </Portion>

                {/* RESOURCES LINKS */}
                <Portion desktopSpan="one-fourth" tabletLandscapeSpan="3" tabletPortraitSpan="6" mobileSpan="6">
                    <Heading6 weight="600" marginBottom="nano">Resources</Heading6>
                    <ul className="footer-links">
                        <li>
                            <Link href="/manifesto">
                                <Text size="small">Manifesto</Text>
                            </Link>
                        </li>
                        <li>
                            <Link href="/base-element">
                                <Text size="small">Base element</Text>
                            </Link>
                        </li>
                    </ul>

                    <Heading6 weight="600" marginBottom="nano">Community</Heading6>
                    <ul className="footer-links">
                        <li>
                            <Link
                                href="https://github.com/fictoan/fictoan"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <Text size="small">GitHub</Text>
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="https://www.npmjs.com/package/fictoan-react"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <Text size="small">npm</Text>
                            </Link>
                        </li>
                    </ul>
                </Portion>
            </Row>

            <Divider kind="tertiary" verticalMargin="micro" horizontalMargin="medium" />

            {/* COPYRIGHT ROW */}
            <Row horizontalPadding="medium" marginBottom="none">
                <Portion desktopSpan="half" tabletLandscapeSpan="half" tabletPortraitSpan="12" mobileSpan="12">
                    <Text size="small">&copy; {currentYear} Fictoan. Open source under MIT license.</Text>
                </Portion>

                <Portion
                    desktopSpan="half"
                    tabletLandscapeSpan="half"
                    tabletPortraitSpan="12"
                    mobileSpan="12"
                    className="footer-social"
                >
                    <Link
                        href="https://github.com/fictoan/fictoan"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="social-icon"
                    >
                        <GithubIcon />
                    </Link>
                </Portion>
            </Row>
        </Footer>
    );
};
