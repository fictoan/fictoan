// REACT CORE ==========================================================================================================
import React, { createContext, useContext, useState, useCallback, ReactNode } from "react";

// INTERNAL ============================================================================================================
import { ToastsWrapper } from "../ToastsWrapper/ToastsWrapper";
import { ToastItem } from "../ToastItem/ToastItem";

// TYPES ===============================================================================================================
interface InternalToast {
    id       : string;
    message  : string;
    duration : number;
}

// prettier-ignore
export interface ToastsProviderProps {
    children   : ReactNode;
    anchor   ? : "top" | "bottom";
}

// TOAST FUNCTION TYPE =================================================================================================
export type ToastFunction = (message: string, duration?: number) => void;

interface ToastsContextValue {
    toast: ToastFunction;
}

// CONTEXT =============================================================================================================
const ToastsContext = createContext<ToastsContextValue | null>(null);

// PROVIDER ============================================================================================================
export const ToastsProvider = ({
    children,
    anchor = "top",
}: ToastsProviderProps) => {
    const [toasts, setToasts] = useState<InternalToast[]>([]);

    // Remove a toast by ID
    const removeToast = useCallback((id: string) => {
        setToasts(prev => prev.filter(t => t.id !== id));
    }, []);

    // Main toast function
    const toast: ToastFunction = useCallback((message: string, duration: number = 4) => {
        const id = `toast-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;

        setToasts(prev => [...prev, {
            id,
            message,
            duration,
        }]);
    }, []);

    return (
        <ToastsContext.Provider value={{ toast }}>
            {children}

            <ToastsWrapper anchor={anchor}>
                {toasts.map(({ id, message, duration }) => (
                    <ToastItem
                        key={id}
                        id={id}
                        duration={duration}
                        onClose={() => removeToast(id)}
                    >
                        {message}
                    </ToastItem>
                ))}
            </ToastsWrapper>
        </ToastsContext.Provider>
    );
};
ToastsProvider.displayName = "ToastsProvider";

// HOOK ================================================================================================================
export const useToasts = (): ToastFunction => {
    const context = useContext(ToastsContext);

    if (!context) {
        throw new Error("useToasts must be used within a ToastsProvider");
    }

    return context.toast;
};
