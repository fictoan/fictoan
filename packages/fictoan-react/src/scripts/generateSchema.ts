// Generates dist/fictoan-schema.json — a machine-readable schema of every
// Fictoan component, its props, the universal Element prop set, and the
// design-system enums (spacing, emphasis, colours, ...).
//
// Run via: pnpm exec tsx src/scripts/generateSchema.ts

import { readFileSync, writeFileSync, mkdirSync, readdirSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { withCustomConfig } from "react-docgen-typescript";

import { componentMeta } from "./schema-meta";

const __dirname = dirname(fileURLToPath(import.meta.url));
const pkgRoot = resolve(__dirname, "..", "..");
const srcRoot = resolve(__dirname, "..");
const pkg = JSON.parse(readFileSync(resolve(pkgRoot, "package.json"), "utf8"));

// ---------------------------------------------------------------------------
// Helpers

const readText = (p : string) : string => readFileSync(p, "utf8");

const extractStringUnion = (source : string, typeName : string) : string[] | null => {
    const re = new RegExp(`export\\s+type\\s+${typeName}\\s*=\\s*([^;]+);`, "s");
    const match = source.match(re);
    if (!match) return null;
    const literals = [...match[1].matchAll(/"([^"]+)"/g)].map(m => m[1]);
    return literals.length > 0 ? literals : null;
};

// ---------------------------------------------------------------------------
// Source files

const constantsSrc = readText(resolve(srcRoot, "components", "Element", "constants.ts"));
const coloursSrc = readText(resolve(srcRoot, "styles", "colours.ts"));
const portionTypesSrc = readText(resolve(srcRoot, "components", "Portion", "types.ts"));

// ---------------------------------------------------------------------------
// Enums

const enumDefinitions : Array<[string, string]> = [
    [ "SpacingTypes", constantsSrc ],
    [ "EmphasisTypes", constantsSrc ],
    [ "ShadowTypes", constantsSrc ],
    [ "ShapeTypes", constantsSrc ],
    [ "OpacityTypes", constantsSrc ],
    [ "WeightTypes", constantsSrc ],
    [ "ButtonVariantTypes", constantsSrc ],
    [ "SpanTypes", portionTypesSrc ],
];

const enums : Record<string, string[]> = {};
for (const [ name, src ] of enumDefinitions) {
    const values = extractStringUnion(src, name);
    if (values) enums[name] = values;
}

// BasicColours
let basicColours : string[] = [];
const basicMatch = constantsSrc.match(/export\s+const\s+BasicColours\s*=\s*\[\s*([\s\S]+?)\s*\]/);
if (basicMatch) {
    basicColours = [...basicMatch[1].matchAll(/"([^"]+)"/g)].map(m => m[1]);
}

// OKLCH colour names
const oklchKeys : string[] = [];
const oklchBlock = coloursSrc.match(/oklchColourDefinitions[^=]*=\s*\{([\s\S]+?)\n\};/);
if (oklchBlock) {
    for (const m of oklchBlock[1].matchAll(/^\s*(\w+)\s*:\s*\{\s*hue/gm)) {
        oklchKeys.push(m[1]);
    }
}

const allColours = [ ...oklchKeys, ...basicColours ];

// ---------------------------------------------------------------------------
// Universal props (CommonProps interface)

interface UniversalProp {
    type : string;
}

const universalProps : Record<string, UniversalProp> = {};
const commonPropsBlock = constantsSrc.match(/export\s+interface\s+CommonProps\s*\{([\s\S]+?)\n\}/);
if (commonPropsBlock) {
    for (const m of commonPropsBlock[1].matchAll(/^\s*(\w+)\s*\??\s*:\s*([^;]+?);/gm)) {
        const [ , name, type ] = m;
        universalProps[name] = { type : type.trim() };
    }
}

// ---------------------------------------------------------------------------
// Per-component custom props

interface ComponentSchema {
    description    : string;
    import         : string;
    props          : Record<string, {
        type         : string;
        required   ? : boolean;
        description? : string;
        default    ? : string;
    }>;
    example      ? : string;
    composition  ? : { children?: string; parent?: string; siblings?: string };
    tips         ? : string[];
}

const docParser = withCustomConfig(
    resolve(pkgRoot, "tsconfig.json"),
    {
        savePropValueAsString : true,
        propFilter            : (prop : any) => {
            if (/node_modules/.test(prop.parent?.fileName || "")) return false;
            return true;
        },
    },
);
const componentsRoot = resolve(srcRoot, "components");

const componentDirs = readdirSync(componentsRoot, { withFileTypes : true })
    .filter(d => d.isDirectory() && d.name !== "Element")
    .map(d => d.name);

const components : Record<string, ComponentSchema> = {};
const universalPropNames = new Set(Object.keys(universalProps));

for (const dir of componentDirs) {
    const indexFile = resolve(componentsRoot, dir, "index.tsx");
    try {
        const docs = docParser.parse(indexFile);
        for (const doc of docs) {
            const name = doc.displayName;
            if (!name) continue;
            if (/^use[A-Z]/.test(name)) continue;  // hooks aren't components

            const customProps : ComponentSchema["props"] = {};
            for (const [ propName, propInfo ] of Object.entries(doc.props || {})) {
                if (universalPropNames.has(propName)) continue;
                const info = propInfo as any;
                const rawType = info.type?.name || "unknown";
                customProps[propName] = {
                    type        : rawType.replace(/\s*\|\s*undefined$/, "").trim(),
                    required    : info.required || undefined,
                    description : info.description || undefined,
                    default     : info.defaultValue?.value,
                };
            }

            const meta = componentMeta[name];
            components[name] = {
                description : meta?.description || doc.description || "",
                import      : `import { ${name} } from "fictoan-react";`,
                props       : customProps,
                ...(meta?.example && { example : meta.example }),
                ...(meta?.composition && { composition : meta.composition }),
                ...(meta?.tips && { tips : meta.tips }),
            };
        }
    } catch (err) {
        console.error(`! Skipped ${dir}: ${(err as Error).message}`);
    }
}

// ---------------------------------------------------------------------------
// Drift guard
//
// The curated examples in schema-meta.ts are the highest-signal pattern an LLM
// copies, so a prop that doesn't exist there is the worst kind of bug. Validate
// that every attribute on each example's ROOT tag is a real prop of that
// component (custom ∪ universal) or a known native HTML attribute, and fail the
// build otherwise. Root-tag-only scoping avoids false positives from child
// components in the example (e.g. a <Portion> inside a <Row> example). Tips are
// checked loosely against the union of all known names — warn only, since tips
// legitimately mention values, sibling-component props, and concepts.

const NATIVE_HTML_ATTRS = new Set([
    "id", "className", "class", "style", "key", "ref", "role", "tabIndex",
    "type", "value", "defaultValue", "name", "placeholder", "disabled",
    "required", "checked", "selected", "readOnly", "htmlFor", "href", "src",
    "alt", "title", "target", "rel", "min", "max", "step", "rows", "cols",
    "width", "height", "colSpan", "rowSpan",
    "onClick", "onChange", "onSubmit", "onInput", "onKeyDown", "onBlur", "onFocus",
]);

// The opening JSX tag of `componentName`, up to the first ">" that isn't part
// of an "=>" arrow inside an attribute value.
const openingTagOf = (snippet : string, componentName : string) : string => {
    const start = snippet.indexOf(`<${componentName}`);
    if (start === -1) return "";
    for (let i = start; i < snippet.length; i++) {
        if (snippet[i] === ">" && snippet[i - 1] !== "=") return snippet.slice(start, i);
    }
    return snippet.slice(start);
};

const jsxAttrNames = (tag : string) : string[] =>
    [ ...tag.matchAll(/[\s\n]([a-zA-Z][a-zA-Z0-9]*)\s*=/g) ].map(m => m[1]);

const backtickIdents = (text : string) : string[] =>
    [ ...text.matchAll(/`([a-zA-Z][a-zA-Z0-9]*)`/g) ].map(m => m[1]);

const allComponentPropNames = new Set<string>();
for (const c of Object.values(components)) {
    for (const p of Object.keys(c.props)) allComponentPropNames.add(p);
}
const tipKnown = new Set<string>([
    ...allComponentPropNames,
    ...universalPropNames,
    ...NATIVE_HTML_ATTRS,
    ...Object.values(enums).flat(),
    ...allColours,
]);

const driftErrors : string[] = [];
for (const [ name, comp ] of Object.entries(components)) {
    if (!comp.example) continue;
    const known = new Set<string>([
        ...Object.keys(comp.props), ...universalPropNames, ...NATIVE_HTML_ATTRS,
    ]);
    for (const attr of jsxAttrNames(openingTagOf(comp.example, name))) {
        if (!known.has(attr)) {
            driftErrors.push(`${name}: example uses <${name} ${attr}=...> but "${attr}" is not a prop of ${name} (nor a universal prop or known HTML attribute).`);
        }
    }
    for (const tip of comp.tips || []) {
        for (const ident of backtickIdents(tip)) {
            if (!tipKnown.has(ident)) {
                console.warn(`  ~ ${name}: tip mentions \`${ident}\` — not a known prop/value; check it isn't stale.`);
            }
        }
    }
}

if (driftErrors.length > 0) {
    console.error("\n✗ Schema-meta drift — example(s) reference props that don't exist:");
    for (const e of driftErrors) console.error(`  - ${e}`);
    console.error("\nFix the example in src/scripts/schema-meta.ts (or the component), then rebuild.\n");
    process.exit(1);
}

// ---------------------------------------------------------------------------
// Compose and write

const schema = {
    "$schema"        : "https://fictoan.io/schema/v1.json",
    name             : "fictoan-react",
    version          : pkg.version,
    framework        : "react",
    philosophy       : "Plain-English props, pure CSS, zero runtime. A universal Element prop set (spacing, colour, layout, responsiveness) works across every component.",
    docs             : "https://fictoan.io",
    enums            : { ...enums, Colours : allColours },
    colourModifiers  : {
        description : "Append modifiers to any colour name to vary it.",
        shade       : { pattern : "{colour}-{dark|light}{10..90}", example : "red-dark30, blue-light20" },
        opacity     : { pattern : "{colour}[-{dark|light}{10..90}]-opacity{0..90}", example : "red-opacity50, blue-dark30-opacity20" },
    },
    universalProps,
    components,
    compositionRules : [
        "Row > Portion: Portions must be direct children of a Row.",
        "Form: wraps inputs to give consistent vertical spacing between fields.",
        "ToastsProvider must wrap the app for useToasts() to work.",
        "ThemeProvider should be the outermost provider in your app tree.",
    ],
};

const targetFile = resolve(pkgRoot, "dist", "fictoan-schema.json");
mkdirSync(dirname(targetFile), { recursive : true });
writeFileSync(targetFile, JSON.stringify(schema, null, 2));

const componentCount = Object.keys(components).length;
const propCount = Object.keys(universalProps).length;
const enumCount = Object.keys(schema.enums).length;
console.log(`Wrote schema → ${targetFile}`);
console.log(`  ${componentCount} components · ${propCount} universal props · ${enumCount} enums · ${allColours.length} colours`);
