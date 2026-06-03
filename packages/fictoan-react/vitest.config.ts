import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import { fileURLToPath } from "node:url";

// One runner, two projects:
//   - "unit"    — jsdom, the fast bulk (prop -> className/attribute/inline-style
//                 contract, controlled state, keyboard, static a11y). Default.
//   - "browser" — real Chromium via Playwright, only the things jsdom can't do:
//                 the @layer cascade, container queries, the Popover lifecycle,
//                 color-mix, geometry. Specs are named *.browser.test.tsx.
// Run: `pnpm test` (unit) · `pnpm test:browser` · `pnpm test:all`.
const resolve = (p: string) => fileURLToPath(new URL(p, import.meta.url));

const alias = {
    "$"           : resolve("./src"),
    "$components" : resolve("./src/components"),
    "$element"    : resolve("./src/components/Element/index"),
    "$hooks"      : resolve("./src/hooks"),
    "$form"       : resolve("./src/components/Form"),
    "$styles"     : resolve("./src/styles"),
    "$tags"       : resolve("./src/components/Element/Tags"),
    "$typography" : resolve("./src/components/Typography"),
    "$types"      : resolve("./src/types"),
    "$utils"      : resolve("./src/utils"),
};

export default defineConfig({
    test : {
        projects : [
            {
                plugins : [ react() ],
                resolve : { alias },
                test    : {
                    name         : "unit",
                    globals      : true,
                    environment  : "jsdom",
                    setupFiles   : [ "./vitest.setup.ts" ],
                    include      : [ "src/**/*.{test,spec}.{ts,tsx}" ],
                    exclude      : [ "src/**/*.browser.{test,spec}.{ts,tsx}", "node_modules/**" ],
                    // CSS imports resolve to empty modules — jsdom has no layout/cascade engine.
                    css          : false,
                    restoreMocks : true,
                    clearMocks   : true,
                },
            },
            {
                plugins      : [ react() ],
                resolve      : { alias },
                // Pre-bundle so Vite doesn't optimise deps mid-run and reload the
                // browser (which aborts the suite with "No test suite found").
                optimizeDeps : {
                    include : [
                        "@testing-library/react",
                        "@testing-library/jest-dom/vitest",
                        "react/jsx-dev-runtime",
                        "react-dom/client",
                    ],
                },
                test    : {
                    name       : "browser",
                    globals    : true,
                    include    : [ "src/**/*.browser.{test,spec}.{ts,tsx}" ],
                    setupFiles : [ "./vitest.browser.setup.ts" ],
                    browser    : {
                        enabled   : true,
                        provider  : "playwright",
                        headless  : true,
                        instances : [ { browser : "chromium" } ],
                    },
                },
            },
        ],
    },
});
