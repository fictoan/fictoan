import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import { fileURLToPath } from "node:url";

// A dedicated test config — deliberately NOT extending vite.config.js, which
// pulls in the colour-generation, dts, visualiser and @layer-wrapping plugins
// that are build-only and would just slow tests down. Tests run against `src`
// (the docs app consumes the library via `workspace:*` source, so that is the
// surface we ship), in jsdom. The whole prop -> className / attribute / inline-
// style contract is assertable here; anything that needs a real layout engine,
// the Popover API, the @layer cascade or container queries is out of scope for
// this tier and belongs to a future browser/visual suite.
const resolve = (p: string) => fileURLToPath(new URL(p, import.meta.url));

export default defineConfig({
    plugins : [ react() ],
    resolve : {
        alias : {
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
        },
    },
    test    : {
        globals      : true,
        environment  : "jsdom",
        setupFiles   : [ "./vitest.setup.ts" ],
        include      : [ "src/**/*.{test,spec}.{ts,tsx}" ],
        // CSS imports resolve to empty modules — we assert classNames and inline
        // styles, never computed styles (jsdom has no layout/cascade engine).
        css          : false,
        restoreMocks : true,
        clearMocks   : true,
    },
});
