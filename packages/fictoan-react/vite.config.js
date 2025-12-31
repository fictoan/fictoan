import { defineConfig } from "vite";
import { fileURLToPath } from "node:url";
import { visualizer } from "rollup-plugin-visualizer";
import dts from "vite-plugin-dts";
import svgr from "vite-plugin-svgr";
import react from "@vitejs/plugin-react";
import { execSync } from "child_process";
import path from "path";
import { readFileSync } from "fs";
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
                execSync("npx tsx src/scripts/generateColourClasses.ts", { stdio : "inherit" });
            },
        },
        configureServer(server) {
            console.log("Generating color system...");
            execSync("npx tsx src/scripts/generateColourClasses.ts", { stdio : "inherit" });

            server.watcher.add("src/scripts/generateColourClasses.ts");
            server.watcher.on("change", (changedPath) => {
                if (changedPath.endsWith("generateColourClasses.ts")) {
                    console.log("Color generation script changed, regenerating...");
                    execSync("npx tsx src/scripts/generateColourClasses.ts", { stdio : "inherit" });
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

export default defineConfig({
    resolve : {
        alias : {
            "$"           : path.resolve(__dirname, "./src"),
            "$colour"     : path.resolve(__dirname, "./src/colour/colour"),
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
        sourcemap     : true,
        lib           : {
            entry    : input,
            name     : pkg.name,
            fileName : "index",
        },
        rollupOptions : {
            output   : [
                {
                    format         : "es",
                    entryFileNames : "[name].js",
                    assetFileNames : "index.[ext]",
                    banner         : `"use client;"`,
                },
            ],
            external : [...Object.keys(pkg.peerDependencies)],
        },
    },
    plugins : [
        generateColors(),
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
    ],
});
