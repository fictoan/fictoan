// REACT CORE ==========================================================================================================
import { useCallback } from "react";
import { flushSync } from "react-dom";

// HOOK ================================================================================================================
// Wraps a state-update callback in document.startViewTransition() when the
// browser supports the API, otherwise calls through. flushSync makes any
// React state set inside the callback synchronous so the browser captures the
// post-update snapshot — without it, React batches the update and the
// transition snapshots both look identical.
//
// Usage:
//   const startTransition = useViewTransition();
//   <button onClick={() => startTransition(() => setExpanded(prev => !prev))}>
//
// Browsers without the API (older Firefox) silently get an instant change.
export const useViewTransition = () : ((mutation: () => void) => void) => {
    return useCallback((mutation : () => void) => {
        if (typeof document === "undefined") {
            mutation();
            return;
        }

        const doc = document as Document & {
            startViewTransition? : (cb : () => void) => unknown;
        };

        if (typeof doc.startViewTransition === "function") {
            doc.startViewTransition(() => {
                flushSync(mutation);
            });
        } else {
            mutation();
        }
    }, []);
};
