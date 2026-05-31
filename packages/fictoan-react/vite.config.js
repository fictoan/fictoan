import { defineConfig } from "vite";
import { fileURLToPath } from "node:url";
import { visualizer } from "rollup-plugin-visualizer";
import dts from "vite-plugin-dts";
import svgr from "vite-plugin-svgr";
import react from "@vitejs/plugin-react";
import { execSync } from "child_process";
import path from "path";
import { readFileSync, writeFileSync } from "fs";
import ts from "typescript";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const pkg = JSON.parse(readFileSync(new URL("./package.json", import.meta.url)));

const input = {
    "index"            : "src/index.tsx",
    "components/index" : "src/components/index.tsx",
};

function preserveUseClient() {
    return {
        name    : "preserve-use-client",
        enforce : "post",
        generateBundle(options, bundle) {
            Object.entries(bundle).forEach(([_, chunk]) => {
                if (chunk.type === "chunk") {
                    chunk.code = chunk.code.replace(
                        /("use client";|('use client';))?/,
                        "\"use client\";\n",
                    );
                }
            });
        },
    };
}

function generateColors() {
    return {
        name       : "generate-colors",
        buildStart : {
            sequential : true,
            handler() {
                console.log("Generating color system...");
                execSync("pnpm exec tsx src/scripts/generateColourClasses.ts", { stdio : "inherit" });
            },
        },
        configureServer(server) {
            console.log("Generating color system...");
            execSync("pnpm exec tsx src/scripts/generateColourClasses.ts", { stdio : "inherit" });

            server.watcher.add("src/scripts/generateColourClasses.ts");
            server.watcher.on("change", (changedPath) => {
                if (changedPath.endsWith("generateColourClasses.ts")) {
                    console.log("Color generation script changed, regenerating...");
                    execSync("pnpm exec tsx src/scripts/generateColourClasses.ts", { stdio : "inherit" });
                }
            });
        },
    };
}

function createVisualizer() {
    return {
        ...visualizer({ gzipSize : true }),
        apply : "build",
    };
}

// Fix CSS for Turbopack compatibility
function fixCssForTurbopack() {
    return {
        name: "fix-css-for-turbopack",
        enforce: "post",
        closeBundle: {
            sequential: true,
            order: "post",
            handler() {
                const cssPath = path.resolve(__dirname, "dist/index.css");
                try {
                    let css = readFileSync(cssPath, "utf-8");
                    // Add newline before * universal selectors (Turbopack can't parse }*)
                    css = css.replace(/\}\*/g, "}\n*");
                    // Strip trailing whitespace
                    css = css.trimEnd();
                    writeFileSync(cssPath, css);
                    console.log("Fixed CSS for Turbopack compatibility");
                } catch (e) {
                    console.warn("Could not fix CSS for Turbopack:", e.message);
                }
            },
        },
    };
}

// Only the COLOUR utility files go in the later `fictoan.utilities` sub-layer —
// those are the ones a component's base rule shadowed (e.g. `[data-badge]`'s
// `background-color` beating `.bg-green-light60`). `utilities.css` (padding /
// margin / shape / …) deliberately stays in `fictoan.base`: some components
// legitimately *refine* those utilities — e.g. Row's responsive side-padding
// (`[data-row].padding-left-huge.padding-right-huge` + @media) overriding the flat
// `.padding-left-huge` — and that must be settled by specificity, not flipped by
// layer order (which would make the flat utility win and squeeze content on narrow
// viewports).
const UTILITY_CSS = [ "colours.css", "custom-colours.css" ];

// Bucket each CSS module into a cascade sub-layer at transform time, using
// RELATIVE layer names so wrapInFictoanLayer() can nest them inside the single
// outer `@layer fictoan { … }` block:
//   @layer utilities { … }  — the universal utility classes
//   @layer base      { … }  — everything else (components, globals, theme)
// Once wrapped they become fictoan.base / fictoan.utilities — both sub-layers of
// `fictoan`, so unlayered consumer CSS still overrides anything without
// !important. The base-before-utilities ORDER is pinned by the order statement
// wrapInFictoanLayer() injects, so a prop utility (.bg-*, .text-*) always wins
// over a component base rule (e.g. [data-badge] { background-color: … })
// regardless of where each rule physically lands in the bundle.
function layerCssByType() {
    return {
        name    : "layer-css-by-type",
        enforce : "pre",
        transform(code, id) {
            const file = id.split("?")[0];
            if (!file.endsWith(".css")) return null;
            const isUtility = UTILITY_CSS.some((name) => file.endsWith("/" + name));
            const layer = isUtility ? "utilities" : "base";
            return { code : `@layer ${layer} {\n${code}\n}`, map : null };
        },
    };
}

// Wrap the whole bundle in ONE `@layer fictoan { … }` block (same external shape
// as before sub-layers existed — critical because consumers do
// `@import "fictoan-react/dist/index.css"` FIRST, then @import their own fonts /
// theme CSS; CSS forbids @import after a @layer *block*, so emitting bare
// top-level @layer blocks here silently drops those later @imports).
// Inside, an `@layer base, utilities;` statement pins the sub-layer order so the
// utilities sub-layer (declared last) wins specificity ties over base.
function wrapInFictoanLayer() {
    return {
        name: "wrap-in-fictoan-layer",
        enforce: "post",
        closeBundle: {
            sequential: true,
            order: "post",
            handler() {
                const cssPath = path.resolve(__dirname, "dist/index.css");
                try {
                    const css = readFileSync(cssPath, "utf-8");
                    // Don't double-wrap if a previous run already added the layer.
                    if (css.trimStart().startsWith("@layer fictoan")) return;
                    writeFileSync(cssPath, `@layer fictoan {\n@layer base, utilities;\n${css}\n}\n`);
                    console.log("Wrapped CSS in @layer fictoan (base, utilities)");
                } catch (e) {
                    console.warn("Could not wrap CSS in @layer:", e.message);
                }
            },
        },
    };
}

export default defineConfig({
    resolve : {
        alias : {
            "$"           : path.resolve(__dirname, "./src"),
            "$components" : path.resolve(__dirname, "./src/components"),
            "$element"    : path.resolve(__dirname, "./src/components/Element/index"),
            "$hooks"      : path.resolve(__dirname, "./src/hooks"),
            "$form"       : path.resolve(__dirname, "./src/components/Form"),
            "$styles"     : path.resolve(__dirname, "./src/styles"),
            "$tags"       : path.resolve(__dirname, "./src/components/Element/Tags"),
            "$typography" : path.resolve(__dirname, "./src/components/Typography"),
            "$types"      : path.resolve(__dirname, "./src/types"),
            "$utils"      : path.resolve(__dirname, "./src/utils"),
        },
    },
    build   : {
        minify        : "esbuild",
        cssMinify     : true,
        // Keep all CSS in one dist/index.css (consumers import it once, and the
        // post-build @layer / Turbopack-fix plugins operate on that single file).
        cssCodeSplit  : false,
        sourcemap     : true,
        lib           : {
            entry   : input,
            formats : [ "es" ],
        },
        rollupOptions : {
            output   : {
                format              : "es",
                // One JS file per source module so a consumer's bundler can drop
                // the components they don't import. Nothing is removed from the
                // package — every component, prop, value, and the schema still
                // ship in full; this only changes what the CONSUMER's final
                // bundle ends up including.
                preserveModules     : true,
                preserveModulesRoot : "src",
                entryFileNames      : "[name].js",
                assetFileNames      : "index.[ext]",
            },
            external : [
                ...Object.keys(pkg.peerDependencies),
                "react/jsx-runtime",
                "react/jsx-dev-runtime",
                "react-dom/client",
            ],
        },
    },
    plugins : [
        generateColors(),
        layerCssByType(),
        svgr(),
        preserveUseClient(),
        createVisualizer(),
        react(),
        dts({
            insertTypesEntry : true,
            include          : ["src/**/*"],
            outputDir        : "dist/types",
            skipDiagnostics  : false,
            compilerOptions  : {
                baseUrl             : ".",
                paths               : {
                    "@/*"           : ["./src/*"],
                    "components/*"  : ["./src/components/*"],
                    "$/*"           : ["./src/*"],
                    "$components/*" : ["./src/components/*"],
                    "$element"      : ["./src/components/Element/index"],
                    "$hooks/*"      : ["./src/hooks/*"],
                    "$form/*"       : ["./src/components/Form/*"],
                    "$styles/*"     : ["./src/styles/*"],
                    "$tags"         : ["./src/components/Element/Tags"],
                    "$types/*"      : ["./src/types/*"],
                    "$utils/*"      : ["./src/utils/*"],
                },
                esModuleInterop     : true,
                allowJs             : true,
                declaration         : true,
                emitDeclarationOnly : true,
            },
            entryRoot        : "src",
            beforeWriteFile  : (filePath, content) => {
                // Replace any React imports with the simpler form
                content = content.replace(
                    /import\s*{\s*default\s+as\s+React\s*}\s+from\s+['"]react['"];?/g,
                    "import React from \"react\";",
                );

                // Add React import if it's missing and needed
                if (!content.includes("import") && content.includes("React.")) {
                    content = "import React from \"react\";\n" + content;
                }

                return {
                    filePath,
                    content,
                };
            },
        }),
        fixCssForTurbopack(),
        wrapInFictoanLayer(),
    ],
});
