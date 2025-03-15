"use client";

// EXTERNAL DEPS =======================================================================================================
import React, { useState } from "react";
import Link from "next/link";

// INTERNAL DEPS =======================================================================================================
import {
    Badge,
    Div,
    Header,
    Heading5, Span, Text, useTheme,
} from "fictoan-react";

// COMPONENTS ==========================================================================================================
import { SearchBar } from "./SearchBar/SearchBar";
import { ThemeToggle } from "./ThemeToggle/ThemeToggle";
import { VersionBadge } from "./VersionBadge";

// STYLES ==============================================================================================================
import "./header.css";

// ASSETS ==============================================================================================================
import GithubIcon from "../../assets/icons/github.svg";

export const SiteHeader = ({ toggleSidebarOnMobile }) => {
    // Handle mobile menu toggle =======================================================================================
    const handleMenuToggleClick = (e) => {
        e.stopPropagation();
        toggleSidebarOnMobile();
    };

    return (
        <>
            <Header id="site-header" horizontalPadding="micro" verticalPadding="nano">
                {/* MENU TOGGLE ==================================================================================== */}
                <Div
                    id="menu-toggle"
                    showOnlyOnMobile showOnlyOnTabletPortrait
                    onClick={handleMenuToggleClick}
                >
                    <Heading5>&mdash;</Heading5>
                    <Heading5>&ndash;</Heading5>
                </Div>

                <Div id="links-wrapper">
                    {/* VERSION BADGE ============================================================================== */}
                    <VersionBadge />

                    {/* GITHUB LOGO ================================================================================ */}
                    <Link href="https://github.com/fictoan/fictoan-react" target="_blank" rel="noopener noreferrer">
                        <Div id="github-link" verticallyCentreItems>
                            <GithubIcon />
                        </Div>
                    </Link>
                </Div>

                {/* SEARCH INPUT =================================================================================== */}
                <Div id="search-wrapper">
                    <SearchBar />
                </Div>

                <Div id="toggle-and-badge-wrapper">
                    {/* THEME TOGGLE =============================================================================== */}
                    <ThemeToggle />

                    {/* WIP BADGE ================================================================================== */}
                    <Badge
                        id="wip-badge"
                        bgColour="red" textColour="white" shape="rounded"
                        hideOnMobile
                    >
                        These Docs are WIP
                    </Badge>
                </Div>
            </Header>
        </>
    );
};
