// REACT CORE ==========================================================================================================
import React, { createContext, useContext, useState, useCallback, ReactNode } from "react";

// INTERNAL ============================================================================================================
import { NotificationsWrapper } from "../NotificationsWrapper/NotificationsWrapper";
import { NotificationItem, NotificationKind } from "../NotificationItem/NotificationItem";

// TYPES ===============================================================================================================
export interface NotificationOptions {
    content         : ReactNode | ((helpers: { close: () => void }) => ReactNode);
    kind          ? : NotificationKind;
    duration      ? : number;  // seconds, 0 = no auto-dismiss
    isDismissible ? : boolean;
}

interface InternalNotification {
    id            : string;
    content       : ReactNode | ((helpers: { close: () => void }) => ReactNode);
    kind          : NotificationKind;
    duration      : number;
    isDismissible : boolean;
}

// prettier-ignore
export interface NotificationsProviderProps {
    children     : ReactNode;
    position   ? : "left" | "right";
    anchor     ? : "top" | "bottom";
    order      ? : "new-on-top" | "new-on-bottom";
    kind       ? : "list" | "stack";
}

// NOTIFY FUNCTION TYPE ================================================================================================
export interface NotifyFunction {
    (message: string): void;
    (content: ReactNode): void;
    (options: NotificationOptions): void;
    success : (message: string | ReactNode) => void;
    error   : (message: string | ReactNode) => void;
    warning : (message: string | ReactNode) => void;
    info    : (message: string | ReactNode) => void;
}

interface NotificationsContextValue {
    notify: NotifyFunction;
}

// CONTEXT =============================================================================================================
const NotificationsContext = createContext<NotificationsContextValue | null>(null);

// PROVIDER ============================================================================================================
export const NotificationsProvider = ({
    children,
    position = "right",
    anchor = "top",
    order = "new-on-top",
    kind = "list",
}: NotificationsProviderProps) => {
    const [notifications, setNotifications] = useState<InternalNotification[]>([]);

    // Remove a notification by ID
    const removeNotification = useCallback((id: string) => {
        setNotifications(prev => prev.filter(n => n.id !== id));
    }, []);

    // Add a notification
    const addNotification = useCallback((
        content: ReactNode | ((helpers: { close: () => void }) => ReactNode),
        kind: NotificationKind = "generic",
        duration: number = 4,
        isDismissible: boolean = true
    ) => {
        const id = `notification-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;

        setNotifications(prev => [...prev, {
            id,
            content,
            kind,
            duration,
            isDismissible,
        }]);

        return id;
    }, []);

    // Main notify function
    const baseNotify = useCallback((
        messageOrOptions: string | ReactNode | NotificationOptions
    ) => {
        // String message
        if (typeof messageOrOptions === "string") {
            addNotification(messageOrOptions);
            return;
        }

        // Options object (has 'content' property)
        if (
            messageOrOptions !== null &&
            typeof messageOrOptions === "object" &&
            "content" in messageOrOptions
        ) {
            const opts = messageOrOptions as NotificationOptions;
            addNotification(
                opts.content,
                opts.kind ?? "generic",
                opts.duration ?? 4,
                opts.isDismissible ?? true
            );
            return;
        }

        // ReactNode
        addNotification(messageOrOptions as ReactNode);
    }, [addNotification]);

    // Create the notify function with shorthand methods
    const notify = useCallback(() => {
        const fn = baseNotify as NotifyFunction;

        fn.success = (message: string | ReactNode) => {
            addNotification(message, "success");
        };

        fn.error = (message: string | ReactNode) => {
            addNotification(message, "error");
        };

        fn.warning = (message: string | ReactNode) => {
            addNotification(message, "warning");
        };

        fn.info = (message: string | ReactNode) => {
            addNotification(message, "info");
        };

        return fn;
    }, [baseNotify, addNotification])();

    return (
        <NotificationsContext.Provider value={{ notify }}>
            {children}

            <NotificationsWrapper
                position={position}
                anchor={anchor}
                order={order}
                kind={kind}
            >
                {notifications.map(({ id, content, kind, duration, isDismissible }) => (
                    <NotificationItem
                        key={id}
                        id={id}
                        kind={kind}
                        duration={duration}
                        isDismissible={isDismissible}
                        onClose={() => removeNotification(id)}
                    >
                        {typeof content === "function"
                            ? content({ close: () => removeNotification(id) })
                            : content
                        }
                    </NotificationItem>
                ))}
            </NotificationsWrapper>
        </NotificationsContext.Provider>
    );
};
NotificationsProvider.displayName = "NotificationsProvider";

// HOOK ================================================================================================================
export const useNotifications = (): NotifyFunction => {
    const context = useContext(NotificationsContext);

    if (!context) {
        throw new Error("useNotifications must be used within a NotificationsProvider");
    }

    return context.notify;
};
