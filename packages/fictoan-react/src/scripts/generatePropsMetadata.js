import { writeFileSync, mkdirSync, readdirSync } from "fs";
import { resolve, dirname } from "path";
import { parse } from "react-docgen-typescript";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const tsconfigPath = resolve(__dirname, "..", "..", "tsconfig.json");

const options = {
    savePropValueAsString : true,
    propFilter            : (prop) => {
        // Exclude props from node_modules
        if (/node_modules/.test(prop.parent?.fileName || "")) {
            return false;
        }
        
        // Exclude common props from Element/constants.ts (CommonProps interface)
        if (prop.parent?.fileName?.includes("Element/constants.ts") && 
            prop.parent?.name === "CommonProps") {
            return false;
        }
        
        return true;
    },
    // Pass the tsconfigPath directly to the parse function
    // The compilerOptions will be read from this file
};

const componentsPath = resolve(__dirname, "..", "components");
const targetFile = resolve(__dirname, "..", "..", "dist", "props-metadata.json");

const componentDirs = readdirSync(componentsPath, { withFileTypes : true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);

const allMetadata = {};

for (const componentDir of componentDirs) {
    const componentFile = resolve(componentsPath, componentDir, "index.tsx");
    try {
        console.log(`Parsing component: ${componentFile}`);
        // Pass tsconfigPath as the second argument to parse
        const metadata = parse(componentFile, { ...options, tsconfigPath });
        metadata.forEach(doc => {
            // No post-processing filter here, rely on propFilter and tsconfig resolution
            allMetadata[doc.displayName] = {
                displayName : doc.displayName,
                description : doc.description,
                props       : doc.props,
            };
        });
    } catch (error) {
        console.error(`Error parsing component ${componentDir}:`, error);
    }
}

mkdirSync(dirname(targetFile), { recursive : true });
writeFileSync(targetFile, JSON.stringify(allMetadata, null, 2));

console.log(`Successfully generated props metadata to ${targetFile}`);