// TESTS ===============================================================================================================
import "../../../vitest-matchers";
import userEvent from "@testing-library/user-event";
import { axe } from "vitest-axe";
import { describe, it, expect, vi, afterEach } from "vitest";
import { render, screen } from "@testing-library/react";

// OTHER ===============================================================================================================
import { ThemeProvider, useTheme } from "./ThemeProvider";

// ThemeProvider is the library's theming root: it seeds a theme from
// localStorage (or `currentTheme`), exposes [theme, setTheme] via useTheme, and
// the visible switch is mutating document.documentElement.className — every
// theme-* CSS rule cascades off that. These tests pin that contract: context
// shape, the className mutation, localStorage read/write under the configured
// storageKey, and themeList validation. document.startViewTransition is absent
// in jsdom, so the component takes its instant-apply fallback path (expected).

// A tiny consumer that surfaces the context tuple and lets a test drive setTheme.
const ThemeConsumer = () => {
    const [theme, setTheme] = useTheme();
    return (
        <div>
            <span data-testid="theme">{theme}</span>
            <button onClick={() => setTheme("midnight")}>to-midnight</button>
            <button onClick={() => setTheme("not-a-real-theme")}>to-bogus</button>
            <button onClick={() => setTheme((prev) => (prev === "dawn" ? "midnight" : "dawn"))}>
                toggle
            </button>
        </div>
    );
};

const THEMES = [ "dawn", "midnight", "dusk" ];

const renderProvider = (props: Partial<React.ComponentProps<typeof ThemeProvider>> = {}) =>
    render(
        <ThemeProvider themeList={THEMES} currentTheme="dawn" {...props}>
            <ThemeConsumer />
        </ThemeProvider>,
    );

afterEach(() => {
    localStorage.clear();
    // The on-mount effect / setTheme writes the theme class onto <html>; reset
    // it so each test starts from a clean documentElement.
    document.documentElement.className = "";
});

describe("ThemeProvider — context wiring", () => {
    it("provides the current theme to children via useTheme", () => {
        renderProvider();
        // The mount effect resolves to `currentTheme` (nothing in localStorage).
        expect(screen.getByTestId("theme")).toHaveTextContent("dawn");
    });

    it("renders the inner Element with the data-theme-provider attribute", () => {
        const { container } = renderProvider();
        expect(container.querySelector("[data-theme-provider]")).not.toBeNull();
    });

    it("renders the no-flash inline <script>", () => {
        const { container } = renderProvider({ storageKey : "my-app" });
        const script = container.querySelector("script");
        expect(script).not.toBeNull();
        expect(script?.innerHTML).toContain("my-app");
        expect(script?.innerHTML).toContain("documentElement.className");
    });

    it("passes a nonce through to the inline <script>", () => {
        const { container } = renderProvider({ nonce : "abc123" });
        expect(container.querySelector("script")?.getAttribute("nonce")).toBe("abc123");
    });
});

describe("useTheme — outside a provider", () => {
    it("returns the default context (empty theme + a no-op setter)", () => {
        const Standalone = () => {
            const [theme, setTheme] = useTheme();
            return (
                <div>
                    <span data-testid="standalone-theme">{theme || "EMPTY"}</span>
                    <button onClick={() => setTheme("midnight")}>noop</button>
                </div>
            );
        };
        render(<Standalone />);
        expect(screen.getByTestId("standalone-theme")).toHaveTextContent("EMPTY");
        // Calling the no-op setter must not throw and must not mutate <html>.
        screen.getByRole("button", { name : "noop" }).click();
        expect(document.documentElement.className).toBe("");
    });
});

describe("ThemeProvider — switching theme", () => {
    it("updates document.documentElement.className to the new theme", async () => {
        const user = userEvent.setup();
        renderProvider();

        await user.click(screen.getByRole("button", { name : "to-midnight" }));

        expect(screen.getByTestId("theme")).toHaveTextContent("midnight");
        // className is fully reset then set to just the theme name.
        expect(document.documentElement.className).toBe("midnight");
    });

    it("replaces any previously-applied theme class (does not accumulate)", async () => {
        const user = userEvent.setup();
        renderProvider();

        await user.click(screen.getByRole("button", { name : "to-midnight" }));
        await user.click(screen.getByRole("button", { name : "toggle" })); // -> dawn

        expect(screen.getByTestId("theme")).toHaveTextContent("dawn");
        expect(document.documentElement.className).toBe("dawn");
        expect(document.documentElement.classList).toHaveLength(1);
    });

    it("supports an updater function passed to setTheme", async () => {
        const user = userEvent.setup();
        renderProvider();

        // mount effect set theme to "dawn"; toggle flips dawn -> midnight.
        await user.click(screen.getByRole("button", { name : "toggle" }));
        expect(screen.getByTestId("theme")).toHaveTextContent("midnight");
    });

    it("falls back to themeList[0] when the requested theme is not in the list", async () => {
        const user = userEvent.setup();
        renderProvider();

        await user.click(screen.getByRole("button", { name : "to-bogus" }));

        expect(screen.getByTestId("theme")).toHaveTextContent("dawn"); // themeList[0]
        expect(document.documentElement.className).toBe("dawn");
    });
});

describe("ThemeProvider — localStorage persistence", () => {
    it("persists the selected theme under the default storageKey", async () => {
        const user = userEvent.setup();
        renderProvider();

        await user.click(screen.getByRole("button", { name : "to-midnight" }));

        expect(localStorage.getItem("fictoan-theme")).toBe("midnight");
    });

    it("persists under a custom storageKey", async () => {
        const user = userEvent.setup();
        renderProvider({ storageKey : "my-app-theme" });

        await user.click(screen.getByRole("button", { name : "to-midnight" }));

        expect(localStorage.getItem("my-app-theme")).toBe("midnight");
        expect(localStorage.getItem("fictoan-theme")).toBeNull();
    });

    it("persists the fallback theme when an invalid theme is requested", async () => {
        const user = userEvent.setup();
        renderProvider();

        await user.click(screen.getByRole("button", { name : "to-bogus" }));

        expect(localStorage.getItem("fictoan-theme")).toBe("dawn");
    });
});

describe("ThemeProvider — reads initial value from localStorage", () => {
    it("seeds the theme from the default storageKey on mount", () => {
        localStorage.setItem("fictoan-theme", "dusk");
        renderProvider();
        expect(screen.getByTestId("theme")).toHaveTextContent("dusk");
        expect(document.documentElement.className).toBe("dusk");
    });

    it("seeds the theme from a custom storageKey on mount", () => {
        localStorage.setItem("my-app-theme", "midnight");
        renderProvider({ storageKey : "my-app-theme" });
        expect(screen.getByTestId("theme")).toHaveTextContent("midnight");
    });

    it("ignores a persisted value that is not in themeList (falls back to themeList[0])", () => {
        localStorage.setItem("fictoan-theme", "ghost-theme");
        renderProvider();
        // The mount effect runs setTheme("ghost-theme"), which validates against
        // themeList and falls back to themeList[0].
        expect(screen.getByTestId("theme")).toHaveTextContent("dawn");
    });
});

// startViewTransition is absent in jsdom, so these tests stub it to assert the
// animate contract: the mount path applies the theme instantly (animate:false,
// no spurious abort on hydration/Fast Refresh), real user switches crossfade,
// and a rejected `ready` promise (a skipped transition) is swallowed.
type VTDocument = Document & {
    startViewTransition ? : (cb: () => void) => { ready ? : Promise<unknown> };
};

describe("ThemeProvider — view transitions", () => {
    afterEach(() => {
        (document as VTDocument).startViewTransition = undefined;
    });

    it("does not start a view transition on mount (instant apply)", () => {
        const startViewTransition = vi.fn((cb: () => void) => {
            cb();
            return { ready: Promise.resolve() };
        });
        (document as VTDocument).startViewTransition = startViewTransition;

        renderProvider();

        expect(startViewTransition).not.toHaveBeenCalled();
        expect(document.documentElement.className).toBe("dawn");
    });

    it("starts exactly one view transition on a user-initiated switch", async () => {
        const startViewTransition = vi.fn((cb: () => void) => {
            cb();
            return { ready: Promise.resolve() };
        });
        (document as VTDocument).startViewTransition = startViewTransition;

        const user = userEvent.setup();
        renderProvider();

        await user.click(screen.getByRole("button", { name : "to-midnight" }));

        // 1 = the click; mount and the effect re-run both pass animate:false.
        expect(startViewTransition).toHaveBeenCalledTimes(1);
        expect(document.documentElement.className).toBe("midnight");
    });

    it("swallows a skipped-transition rejection (class still applies)", async () => {
        const startViewTransition = vi.fn((cb: () => void) => {
            cb();
            return { ready: Promise.reject(new Error("Transition was aborted because of invalid state")) };
        });
        (document as VTDocument).startViewTransition = startViewTransition;

        const user = userEvent.setup();
        renderProvider();

        await user.click(screen.getByRole("button", { name : "to-midnight" }));

        expect(document.documentElement.className).toBe("midnight");
        // Let the rejected `ready` settle; our .catch handles it, so nothing escapes.
        await Promise.resolve();
    });
});

describe("ThemeProvider — a11y", () => {
    it("has no axe violations with realistic content", async () => {
        const { container } = render(
            <ThemeProvider themeList={THEMES} currentTheme="dawn" storageKey="axe-app">
                <main>
                    <h1>Themed page</h1>
                    <p>Readable content inside the theme provider.</p>
                </main>
            </ThemeProvider>,
        );
        expect(await axe(container)).toHaveNoViolations();
    });
});
