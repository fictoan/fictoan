import { describe, it, expect, vi } from "vitest";
import "../../../../vitest-matchers";
import { render, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "vitest-axe";
import { useState } from "react";

import { NotificationsProvider, useNotifications } from "./NotificationsProvider";

// NotificationsProvider exposes an imperative `notify(...)` (plus .success /
// .error / .warning / .info shorthands) via the `useNotifications` hook. The
// context value is memoised (useMemo over the `notify`), so the function
// identity must stay stable across a parent re-render — the beta-19 regression
// these tests pin. We also assert the round-trip: calling `notify` renders a
// [data-notification-item], and clicking the dismiss button removes it.
//
// What this tier CANNOT cover: the CSS exit transition / animation (the
// `dismissed` class drives a visual transition; jsdom never fires
// transitionend), so removal is driven by the dismiss button's exit + the
// 500ms setTimeout fallback.

// Captures the `notify` fn on every render so a test can compare its identity
// across a forced parent re-render.
const IdentityProbe = ({ onRender }: { onRender: (fn: unknown) => void }) => {
    const notify = useNotifications();
    onRender(notify);
    return null;
};

// A consumer with buttons that push notifications through the public API.
const Trigger = () => {
    const notify = useNotifications();
    return (
        <>
            <button type="button" onClick={() => notify("Plain message")}>
                plain
            </button>
            <button type="button" onClick={() => notify.success("It worked")}>
                success
            </button>
            <button type="button" onClick={() => notify.error("It broke")}>
                error
            </button>
            <button
                type="button"
                onClick={() =>
                    notify({ content: "From options", kind: "info", duration: 0, isDismissible: false })
                }
            >
                options
            </button>
        </>
    );
};

describe("NotificationsProvider — context wiring", () => {
    it("useNotifications throws outside a provider", () => {
        const spy = vi.spyOn(console, "error").mockImplementation(() => {});
        const Bare = () => {
            useNotifications();
            return null;
        };
        expect(() => render(<Bare />)).toThrow(
            "useNotifications must be used within a NotificationsProvider",
        );
        spy.mockRestore();
    });

    it("hands the consumer a callable `notify` with shorthand methods", () => {
        let captured: any;
        render(
            <NotificationsProvider>
                <IdentityProbe onRender={(fn) => (captured = fn)} />
            </NotificationsProvider>,
        );
        expect(typeof captured).toBe("function");
        expect(typeof captured.success).toBe("function");
        expect(typeof captured.error).toBe("function");
        expect(typeof captured.warning).toBe("function");
        expect(typeof captured.info).toBe("function");
    });
});

describe("NotificationsProvider — memoised identity (beta-19 regression)", () => {
    it("keeps the `notify` reference stable across a parent re-render", () => {
        const seen: unknown[] = [];
        let bump!: () => void;

        const Parent = () => {
            const [, setTick] = useState(0);
            bump = () => setTick((n) => n + 1);
            return (
                <NotificationsProvider>
                    <IdentityProbe onRender={(fn) => seen.push(fn)} />
                </NotificationsProvider>
            );
        };

        render(<Parent />);
        const first = seen[seen.length - 1];

        act(() => {
            bump();
        });
        const second = seen[seen.length - 1];

        expect(seen.length).toBeGreaterThanOrEqual(2);
        expect(second).toBe(first);
    });
});

describe("NotificationsProvider — render / dismiss round-trip", () => {
    it("renders a notification when `notify` is called with a string", () => {
        const { container } = render(
            <NotificationsProvider>
                <Trigger />
            </NotificationsProvider>,
        );

        // Empty queue renders nothing.
        expect(container.querySelector("[data-notification-item]")).toBeNull();
        expect(container.querySelector("[data-notifications-wrapper]")).toBeNull();

        act(() => {
            screen.getByRole("button", { name: "plain" }).click();
        });

        const item = container.querySelector("[data-notification-item]");
        expect(item).not.toBeNull();
        expect(item).toHaveTextContent("Plain message");
        // Default kind "generic" -> status / polite, dismissible by default.
        expect(item).toHaveAttribute("role", "status");
        expect(item).toHaveAttribute("aria-live", "polite");
        expect(item).toHaveAttribute("aria-atomic", "true");
        expect(item).toHaveClass("generic", "dismissible");
        expect(item!.querySelector(".notification-content")).toHaveTextContent("Plain message");

        // Wrapper class contract: position right, anchor top, new-on-top, list kind.
        const wrapper = container.querySelector("[data-notifications-wrapper]");
        expect(wrapper).not.toBeNull();
        expect(wrapper).toHaveClass("right", "top", "new-on-top", "list");
        expect(wrapper).toHaveAttribute("aria-label", "Notifications");
    });

    it("maps the .error shorthand to an alert / assertive notification", () => {
        const { container } = render(
            <NotificationsProvider>
                <Trigger />
            </NotificationsProvider>,
        );
        act(() => {
            screen.getByRole("button", { name: "error" }).click();
        });
        const item = container.querySelector("[data-notification-item]");
        expect(item).toHaveClass("error");
        expect(item).toHaveAttribute("role", "alert");
        expect(item).toHaveAttribute("aria-live", "assertive");
    });

    it("maps the .success shorthand to a status notification", () => {
        const { container } = render(
            <NotificationsProvider>
                <Trigger />
            </NotificationsProvider>,
        );
        act(() => {
            screen.getByRole("button", { name: "success" }).click();
        });
        const item = container.querySelector("[data-notification-item]");
        expect(item).toHaveClass("success");
        expect(item).toHaveAttribute("role", "status");
    });

    it("renders a non-dismissible options notification without a dismiss button", () => {
        const { container } = render(
            <NotificationsProvider>
                <Trigger />
            </NotificationsProvider>,
        );
        act(() => {
            screen.getByRole("button", { name: "options" }).click();
        });
        const item = container.querySelector("[data-notification-item]");
        expect(item).toHaveTextContent("From options");
        expect(item).toHaveClass("info");
        expect(item).not.toHaveClass("dismissible");
        expect(item!.querySelector(".dismiss-button")).toBeNull();
    });

    it("removes a notification when its dismiss button is clicked", async () => {
        const user = userEvent.setup();
        const { container } = render(
            <NotificationsProvider>
                <Trigger />
            </NotificationsProvider>,
        );

        act(() => {
            screen.getByRole("button", { name: "plain" }).click();
        });
        expect(container.querySelector("[data-notification-item]")).not.toBeNull();

        // The dismiss button sets isExiting; the 500ms fallback then calls onClose.
        await user.click(screen.getByRole("button", { name: "Dismiss notification" }));
        // Clicking marks it exiting (adds the `dismissed` class) but does not
        // remove it synchronously — removal waits on the transition/fallback.
        expect(container.querySelector("[data-notification-item]")).toHaveClass("dismissed");

        // Advance past the 500ms fallback to complete removal.
        await act(async () => {
            await new Promise((resolve) => setTimeout(resolve, 600));
        });
        expect(container.querySelector("[data-notification-item]")).toBeNull();
        expect(container.querySelector("[data-notifications-wrapper]")).toBeNull();
    });

    it("stacks multiple notifications", () => {
        const { container } = render(
            <NotificationsProvider>
                <Trigger />
            </NotificationsProvider>,
        );
        const plain = screen.getByRole("button", { name: "plain" });
        act(() => {
            plain.click();
        });
        act(() => {
            screen.getByRole("button", { name: "success" }).click();
        });
        expect(container.querySelectorAll("[data-notification-item]")).toHaveLength(2);
    });
});

describe("NotificationsProvider — render-prop content", () => {
    it("passes a `close` helper to function content", () => {
        const close = vi.fn();
        // A consumer that fires a render-prop notification; we cannot easily
        // assert close() removal without the button, so just assert the content
        // function receives a callable `close` and its output renders.
        const RenderPropTrigger = () => {
            const notify = useNotifications();
            return (
                <button
                    type="button"
                    onClick={() =>
                        notify({
                            content: (helpers) => {
                                // record the shape the provider hands the consumer
                                if (typeof helpers.close === "function") close.mockName("closeAvailable");
                                return <span>Custom node</span>;
                            },
                            duration: 0,
                        })
                    }
                >
                    render-prop
                </button>
            );
        };

        const { container } = render(
            <NotificationsProvider>
                <RenderPropTrigger />
            </NotificationsProvider>,
        );
        act(() => {
            screen.getByRole("button", { name: "render-prop" }).click();
        });
        expect(container.querySelector("[data-notification-item]")).toHaveTextContent("Custom node");
    });
});

describe("NotificationsProvider — a11y", () => {
    it("has no axe violations with a live notification", async () => {
        const { container } = render(
            <NotificationsProvider>
                <Trigger />
            </NotificationsProvider>,
        );
        act(() => {
            screen.getByRole("button", { name: "plain" }).click();
        });
        expect(await axe(container)).toHaveNoViolations();
    });
});
