"use client";

import { useEffect, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";
// import type { LoadingBarRef } from "fictoan-react";

export function useNavigationProgress(loadingRef: React.RefObject<any>) {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const isFirstRender = useRef(true);

    useEffect(() => {
        // Skip initial render
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }

        // Start progress on navigation
        loadingRef.current?.start();

        // Complete after a short delay to account for content loading
        const timer = setTimeout(() => {
            loadingRef.current?.complete();
        }, 500);

        return () => clearTimeout(timer);
    }, [pathname, searchParams, loadingRef]);

    return {
        pathname,
        searchParams
    };
}
