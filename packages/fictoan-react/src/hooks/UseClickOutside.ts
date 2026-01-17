import { RefObject, useCallback, useEffect } from "react";

export const useClickOutside = <T extends HTMLElement = HTMLElement>(
    ref : RefObject<T | null>, handler : (e : Event) => void) => {
    const memoizedHandler = useCallback(handler, [handler]);

    useEffect(() => {
        const listener = (event : Event) => {
            // Skip processing if ref doesn't exist or handler is a no-op function
            if (!ref.current || typeof memoizedHandler !== "function") {
                return;
            }

            // Only call handler if click is outside the referenced element
            if (!ref.current.contains(event.target as Node)) {
                memoizedHandler(event);
            }
        };

        document.addEventListener("mousedown", listener);
        document.addEventListener("touchstart", listener);

        return () => {
            document.removeEventListener("mousedown", listener);
            document.removeEventListener("touchstart", listener);
        };
    }, [ref, memoizedHandler]);
};
