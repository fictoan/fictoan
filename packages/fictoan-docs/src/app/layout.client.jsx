"use client";

// FRAMEWORK ===========================================================================================================
import React, { useRef, useState } from "react";

// FICTOAN =============================================================================================================
import {
    Button,
    ContentWrapper,
    ThemeProvider,
} from "fictoan-react";

// COMPONENTS ==========================================================================================================
import { Sidebar } from "../components/Sidebar/Sidebar";
import { SiteFooter } from "../components/Footer/Footer";
import { SiteHeader } from "../components/Header/Header";

// STYLES ==============================================================================================================
import "../styles/globals.css";

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
