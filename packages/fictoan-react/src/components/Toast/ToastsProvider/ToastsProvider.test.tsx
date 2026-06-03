// REACT CORE ==========================================================================================================
import { useState } from "react";

// TESTS ===============================================================================================================
import "../../../../vitest-matchers";
import { axe } from "vitest-axe";
import { describe, it, expect, vi } from "vitest";
import { render, screen, act } from "@testing-library/react";

// OTHER ===============================================================================================================
import { ToastsProvider, useToasts } from "./ToastsProvider";

// ToastsProvider exposes an imperative `toast(message, duration?)` via the
// `useToasts` hook. The context value is memoised (useMemo over the
// useCallback'd `toast`), so the function identity must stay stable across a
// parent re-render — this is the beta-19 regression these tests pin. We also
// assert the round-trip: calling `toast` renders a [data-toast-item], and the
// duration timer + fallback removes it.
//
// What this tier CANNOT cover: the CSS exit transition / animation (the
// `dismissed` class drives a visual transition; jsdom never fires
// transitionend), so removal here is driven by the setTimeout fallbacks.

// Captures the `toast` fn on every render so a test can compare its identity
// across a forced parent re-render.
const IdentityProbe = ({ onRender }: { onRender: (fn: unknown) => void }) => {
    const toast = useToasts();
    onRender(toast);
    return null;
};

// A consumer whose button fires a toast through the public API.
const Trigger = ({ message, duration }: { message: string; duration?: number }) => {
    const toast = useToasts();
    return (
        <button type="button" onClick={() => toast(message, duration)}>
            fire
        </button>
    );
};

describe("ToastsProvider — context wiring", () => {
    it("useToasts throws outside a provider", () => {
        // Swallow the expected React error log so the run output stays clean.
        const spy = vi.spyOn(console, "error").mockImplementation(() => {});
        const Bare = () => {
            useToasts();
            return null;
        };
        expect(() => render(<Bare />)).toThrow("useToasts must be used within a ToastsProvider");
        spy.mockRestore();
    });

    it("hands the consumer a callable `toast` function", () => {
        let captured: unknown;
        render(
            <ToastsProvider>
                <IdentityProbe onRender={(fn) => (captured = fn)} />
            </ToastsProvider>,
        );
        expect(typeof captured).toBe("function");
    });
});

describe("ToastsProvider — memoised identity (beta-19 regression)", () => {
    it("keeps the `toast` reference stable across a parent re-render", () => {
        const seen: unknown[] = [];
        let bump!: () => void;

        // Parent owns a tick it can bump to re-render the provider + consumer.
        const Parent = () => {
            const [, setTick] = useState(0);
            bump = () => setTick((n) => n + 1);
            return (
                <ToastsProvider>
                    <IdentityProbe onRender={(fn) => seen.push(fn)} />
                </ToastsProvider>
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

describe("ToastsProvider — render / dismiss round-trip", () => {
    it("renders a toast item when `toast` is called", () => {
        const { container } = render(
            <ToastsProvider>
                <Trigger message="Saved!" duration={0} />
            </ToastsProvider>,
        );

        // Nothing rendered while the queue is empty.
        expect(container.querySelector("[data-toast-item]")).toBeNull();
        expect(container.querySelector("[data-toasts-wrapper]")).toBeNull();

        act(() => {
            screen.getByRole("button", { name: "fire" }).click();
        });

        const item = container.querySelector("[data-toast-item]");
        expect(item).not.toBeNull();
        expect(item).toHaveTextContent("Saved!");
        // ToastItem markup contract.
        expect(item).toHaveAttribute("role", "status");
        expect(item).toHaveAttribute("aria-live", "polite");
        expect(item).toHaveAttribute("aria-atomic", "true");

        // Wrapper appears once there is at least one toast, anchored top by default.
        const wrapper = container.querySelector("[data-toasts-wrapper]");
        expect(wrapper).not.toBeNull();
        expect(wrapper).toHaveClass("top");
        expect(wrapper).toHaveAttribute("aria-label", "Toasts");
    });

    it("honours the `anchor` prop on the wrapper", () => {
        const { container } = render(
            <ToastsProvider anchor="bottom">
                <Trigger message="Hi" duration={0} />
            </ToastsProvider>,
        );
        act(() => {
            screen.getByRole("button", { name: "fire" }).click();
        });
        expect(container.querySelector("[data-toasts-wrapper]")).toHaveClass("bottom");
    });

    it("auto-dismisses the toast after its duration elapses", () => {
        vi.useFakeTimers();
        try {
            const { container } = render(
                <ToastsProvider>
                    {/* 1s duration keeps the timer maths small */}
                    <Trigger message="Temporary" duration={1} />
                </ToastsProvider>,
            );

            act(() => {
                screen.getByRole("button", { name: "fire" }).click();
            });
            expect(container.querySelector("[data-toast-item]")).not.toBeNull();

            // duration * 1000 marks exiting; the 500ms fallback then calls onClose.
            act(() => {
                vi.advanceTimersByTime(1000);
            });
            act(() => {
                vi.advanceTimersByTime(500);
            });

            expect(container.querySelector("[data-toast-item]")).toBeNull();
            // Wrapper collapses back to null once the last toast is gone.
            expect(container.querySelector("[data-toasts-wrapper]")).toBeNull();
        } finally {
            vi.useRealTimers();
        }
    });

    it("stacks multiple toasts", () => {
        const { container } = render(
            <ToastsProvider>
                <Trigger message="One" duration={0} />
            </ToastsProvider>,
        );
        const btn = screen.getByRole("button", { name: "fire" });
        act(() => {
            btn.click();
        });
        act(() => {
            btn.click();
        });
        expect(container.querySelectorAll("[data-toast-item]")).toHaveLength(2);
    });
});

describe("ToastsProvider — a11y", () => {
    it("has no axe violations with a live toast", async () => {
        const { container } = render(
            <ToastsProvider>
                <Trigger message="Your changes were saved" duration={0} />
            </ToastsProvider>,
        );
        act(() => {
            screen.getByRole("button", { name: "fire" }).click();
        });
        expect(await axe(container)).toHaveNoViolations();
    });
});
