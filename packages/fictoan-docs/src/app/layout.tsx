// REACT CORE ==========================================================================================================
import { ReactNode } from "react";
import { Metadata } from "next";

// OTHER ===============================================================================================================
import { RootLayoutClient } from "./layout.client";

export const metadata: Metadata = {
    icons: {
        icon: "/favicon.svg",
    },
};

const RootLayout = ({children}: {children: ReactNode}) => {
    return <RootLayoutClient>{children}</RootLayoutClient>;
}

export default RootLayout;
