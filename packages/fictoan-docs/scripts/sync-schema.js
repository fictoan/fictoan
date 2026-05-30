// Copies the freshly built fictoan-react schema into the docs public/
// directory so it serves at https://fictoan.io/fictoan-schema.json.

const { copyFileSync, existsSync, mkdirSync } = require("node:fs");
const { dirname, resolve } = require("node:path");

const src = resolve(__dirname, "..", "..", "fictoan-react", "dist", "fictoan-schema.json");
const dest = resolve(__dirname, "..", "public", "fictoan-schema.json");

if (!existsSync(src)) {
    console.warn(`[sync-schema] Source not found at ${src} — run pnpm --filter fictoan-react build first. Skipping.`);
    process.exit(0);
}

mkdirSync(dirname(dest), { recursive : true });
copyFileSync(src, dest);
console.log(`[sync-schema] ${src} → ${dest}`);
