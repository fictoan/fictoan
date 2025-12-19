// REACT CORE ==========================================================================================================
import { ReactNode } from "react";

// OTHER ===============================================================================================================
import { RootLayoutClient } from "./layout.client";

const RootLayout = ({children}: {children: ReactNode}) => {
    return <RootLayoutClient>{children}</RootLayoutClient>;
}

export default RootLayout;
