"use client";

// EXTERNAL DEPS =======================================================================================================
import React, { useRef, useState } from "react";

// INTERNAL DEPS =======================================================================================================
import {
    Button,
    ContentWrapper,
    ThemeProvider,
} from "fictoan-react";

// COMPONENTS ==========================================================================================================
import { Sidebar } from "../components/Sidebar/Sidebar";
import { SiteHeader } from "../components/Header/Header";
import { SiteFooter } from "../components/Footer/Footer";

// STYLES ==============================================================================================================
import "../styles/globals.css";

// ROOT LAYOUT /////////////////////////////////////////////////////////////////////////////////////////////////////////
export const RootLayoutClient = ({ children }) => {
    // SIDEBAR =========================================================================================================
    const [sidebarState, setSidebarState] = useState("");
    const [showSidebarOnMobile, setShowSidebarOnMobile] = useState(false);


    const toggleSidebarOnMobile = () => {
        setShowSidebarOnMobile(isShowing => !isShowing);
    };

    const listOfThemes = ["theme-light", "theme-dark", "theme-test"];

    return (
        <html lang="en">
        <head>
            <title>Fictoan framework</title>
            <script src="https://cdn.jsdelivr.net/npm/prismjs@1.29.0/prism.min.js"></script>
            <script src="https://cdn.jsdelivr.net/npm/prismjs@1.29.0/components/prism-jsx.min.js"></script>
        </head>

        <body>
        <ThemeProvider themeList={listOfThemes} currentTheme="theme-dark">
            {/* <LoadingBar */}
            {/*     ref={loadingBarRef} */}
            {/*     height="4px" */}
            {/*     bgColour="blue" */}
            {/*     minimum={10} */}
            {/*     position="top" */}
            {/* /> */}

            <Sidebar
                sidebarState={sidebarState}
                setSidebarState={setSidebarState}
                showSidebarOnMobile={showSidebarOnMobile}
                setShowSidebarOnMobile={setShowSidebarOnMobile}
            />

            <ContentWrapper>
                <SiteHeader toggleSidebarOnMobile={toggleSidebarOnMobile} />
                {children}
                <SiteFooter />
            </ContentWrapper>
        </ThemeProvider>
        </body>
        </html>
    );
}
