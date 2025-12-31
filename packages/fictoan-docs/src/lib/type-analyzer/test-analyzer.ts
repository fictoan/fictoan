// OTHER ===============================================================================================================
import { analyzeComponent } from "./TypeAnalyzer";

async function test() {
    console.log("Testing TypeAnalyzer with Badge component...\n");

    const result = await analyzeComponent("Badge");

    if (result) {
        console.log("Component:", result.displayName);
        console.log("Description:", result.description);
        console.log("\nProps:");

        Object.entries(result.props).forEach(([ name, prop ]) => {
            console.log(`\n  ${name}:`);
            console.log(`    type: ${prop.type.name}`);
            console.log(`    required: ${prop.required}`);
            console.log(`    default: ${prop.defaultValue?.value ?? "none"}`);
            console.log(`    description: ${prop.description || "no description"}`);
        });
    } else {
        console.log("Failed to analyze Accordion component");
    }
}

test().catch(console.error);