"use client";

// REACT CORE ==========================================================================================================
import Link from "next/link";
import React from "react";

// UI ==================================================================================================================
import { Badge, Div, Header, Heading5 } from "fictoan-react";

// ASSETS ==============================================================================================================
import GithubIcon from "../../assets/icons/github.svg";

// STYLES ==============================================================================================================
import "./header.css";

// OTHER ===============================================================================================================
import { SearchBar } from "./SearchBar/SearchBar";
import { ThemeToggle } from "./ThemeToggle/ThemeToggle";
import { VersionBadge } from "./VersionBadge";

interface SiteHeaderProps {
    toggleSidebarOnMobile : () => void;
}

export const SiteHeader = ({ toggleSidebarOnMobile }: SiteHeaderProps) => {
    const handleMenuToggleClick = (e: { stopPropagation: () => void; }) => {
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
                    <Link href="https://github.com/fictoan/fictoan" target="_blank" rel="noopener noreferrer">
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
                </Div>
            </Header>
        </>
    );
};
