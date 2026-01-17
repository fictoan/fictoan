"use client";

// REACT CORE ==========================================================================================================
import React, { ReactNode, useState } from "react";

// UI ==================================================================================================================
import { ContentWrapper, ThemeProvider } from "fictoan-react";

// LOCAL COMPONENTS ====================================================================================================
import { Sidebar } from "$components/Sidebar/Sidebar";
import { SiteFooter } from "$components/Footer/Footer";
import { SiteHeader } from "$components/Header/Header";

// STYLES ==============================================================================================================
import "../styles/globals.css";

export const RootLayoutClient = ({children} : { children : ReactNode }) => {
    const [ sidebarState, setSidebarState ] = useState("");
    const [ showSidebarOnMobile, setShowSidebarOnMobile ] = useState(false);


    const toggleSidebarOnMobile = () => {
        setShowSidebarOnMobile(isShowing => !isShowing);
    };

    const listOfThemes = [ "theme-light", "theme-dark", "theme-test" ];

    return (
        <html lang="en">
        <head>
            <title>Fictoan framework</title>
            <meta
                httpEquiv="Content-Security-Policy"
                content="script-src 'self' 'unsafe-eval' 'unsafe-inline';"
            />
        </head>

        <body>
        <ThemeProvider themeList={listOfThemes} currentTheme="theme-light">
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
};
