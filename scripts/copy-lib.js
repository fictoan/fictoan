const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

// Paths
const fictoanReactDir = path.resolve(__dirname, "../packages/fictoan-react");
const sourceDir = path.resolve(fictoanReactDir, "dist");
const targetNodeModulesDir = path.resolve(__dirname, "../packages/fictoan-docs/node_modules/fictoan-react");
const targetDir = path.resolve(targetNodeModulesDir, "dist");

// Ensure the target directories exist
if (!fs.existsSync(targetNodeModulesDir)) {
    fs.mkdirSync(targetNodeModulesDir, { recursive : true });
}

// Copy function
function copyFolderSync(from, to) {
    // Create the target folder if it doesn't exist
    if (!fs.existsSync(to)) {
        fs.mkdirSync(to, { recursive : true });
    }

    // Read the source directory
    const files = fs.readdirSync(from);

    // Copy each file/directory
    files.forEach(file => {
        const sourceFile = path.join(from, file);
        const targetFile = path.join(to, file);

        const stat = fs.statSync(sourceFile);

        if (stat.isDirectory()) {
            // Recursively copy subdirectories
            copyFolderSync(sourceFile, targetFile);
        } else {
            // Copy file
            fs.copyFileSync(sourceFile, targetFile);
        }
    });
}

// Update package.json in docs node_modules to match the current version
function updatePackageVersion() {
    const sourcePackageJson = path.resolve(__dirname, "../packages/fictoan-react/package.json");
    const targetPackageJson = path.resolve(__dirname, "../packages/fictoan-docs/node_modules/fictoan-react/package.json");

    if (fs.existsSync(sourcePackageJson) && fs.existsSync(targetPackageJson)) {
        const sourceData = JSON.parse(fs.readFileSync(sourcePackageJson, "utf8"));
        const targetData = JSON.parse(fs.readFileSync(targetPackageJson, "utf8"));

        targetData.version = sourceData.version;

        fs.writeFileSync(targetPackageJson, JSON.stringify(targetData, null, 2));
        console.log(`Updated fictoan-react version to ${sourceData.version} in docs node_modules`);
    }
}

// Copy all required package files, not just dist
function copyPackageFiles() {
    // First, ensure target directory exists
    if (!fs.existsSync(targetNodeModulesDir)) {
        fs.mkdirSync(targetNodeModulesDir, { recursive : true });
    }

    // Files to copy from source package (excluding node_modules, etc)
    const filesToCopy = [
        "package.json",
        "dist",
        "LICENSE",
        "README.md",
    ];

    // Copy each required file/directory
    filesToCopy.forEach(file => {
        const sourcePath = path.resolve(__dirname, `../packages/fictoan-react/${file}`);
        const targetPath = path.resolve(targetNodeModulesDir, file);

        if (fs.existsSync(sourcePath)) {
            if (fs.statSync(sourcePath).isDirectory()) {
                copyFolderSync(sourcePath, targetPath);
            } else {
                // Create directory if it doesn't exist
                const targetDir = path.dirname(targetPath);
                if (!fs.existsSync(targetDir)) {
                    fs.mkdirSync(targetDir, { recursive : true });
                }
                fs.copyFileSync(sourcePath, targetPath);
            }
        }
    });
}

// Build and copy function
function buildAndCopy() {
    console.log("Building fictoan-react...");
    
    // Build the library
    try {
        execSync("npm run build", { 
            cwd: fictoanReactDir, 
            stdio: "inherit" 
        });
        console.log("✓ Build completed successfully");
    } catch (err) {
        console.error("✗ Build failed:", err.message);
        process.exit(1);
    }

    // Copy all required package files
    try {
        copyPackageFiles();
        console.log("✓ Successfully copied fictoan-react files to fictoan-docs node_modules");
    } catch (err) {
        console.error("✗ Error copying library files:", err);
        process.exit(1);
    }
}

// Execute the build and copy
buildAndCopy();
