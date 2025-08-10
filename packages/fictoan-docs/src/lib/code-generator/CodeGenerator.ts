// OTHER ===============================================================================================================
import { ComponentMetadata, PropDefinition } from "../type-analyzer/TypeAnalyzer";

interface GeneratedCode {
        imports             : string[];
        component           : string;
        hasState          ? : boolean;
        stateDeclarations ? : string[];
        helperFunctions   ? : string[];
}

/**
 * Generates complete, working code examples for components
 */
const createCodeGenerator = (
    componentName : string,
    metadata : ComponentMetadata,
    props : { [key : string] : any },
    childrenContent : string = "",
) => {
    /**
     * Generate complete code including all necessary parts
     */
    const generateCompleteCode = () : string => {
        const code = generateCodeParts();

        // Build the complete code
        let completeCode = "";

        // Add imports
        if (code.imports.length > 0) {
            completeCode += code.imports.join("\n") + "\n\n";
        }

        // Add function wrapper if we have state or helpers
        if (code.hasState || code.helperFunctions) {
            completeCode += `export const ${componentName}Example = () => {\n`;

            // Add state declarations
            if (code.stateDeclarations && code.stateDeclarations.length > 0) {
                code.stateDeclarations.forEach(state => {
                    completeCode += `    ${state}\n`;
                });
                completeCode += "\n";
            }

            // Add helper functions
            if (code.helperFunctions && code.helperFunctions.length > 0) {
                code.helperFunctions.forEach(helper => {
                    completeCode += `    ${helper}\n`;
                });
                completeCode += "\n";
            }

            // Add return statement with component
            completeCode += "    return (\n";
            const indentedComponent = code.component.split("\n").map(line => `        ${line}`).join("\n");
            completeCode += indentedComponent + "\n";
            completeCode += "    );\n";
            completeCode += "}";
        } else {
            // Simple component without state
            completeCode = code.component;
        }

        return completeCode;
    };

    /**
     * Generate just the JSX component code (for inline display)
     */
    const generateComponentJSX = () : string => {
        const parts = generateCodeParts();
        return parts.component;
    };

    const generateCodeParts = () : GeneratedCode => {
        const result : GeneratedCode = {
            imports           : [ `import { ${componentName} } from "fictoan-react";` ],
            component         : "",
            hasState          : false,
            stateDeclarations : [],
            helperFunctions   : [],
        };

        // Check for special components that need state
        if (needsState()) {
            result.hasState = true;
            result.imports.push(`import React, { useState } from "react";`);
        }

        // Generate props string
        const propsString = generatePropsString();

        // Handle different component patterns
        switch (componentName) {
            case "Accordion":
                result.component = generateAccordionCode(propsString);
                break;
            case "Badge":
                result.component = generateBadgeCode(propsString);
                if (props.withDelete) {
                    result.hasState = true;
                    result.helperFunctions?.push(
                        `const handleDelete = () => {\n        console.log('Badge deleted');\n    };`,
                    );
                }
                break;
            case "Button":
                result.component = generateButtonCode(propsString);
                if (props.onClick === undefined) {
                    result.helperFunctions?.push(
                        `const handleClick = () => {\n        console.log('Button clicked');\n    };`,
                    );
                }
                break;
            case "Breadcrumbs":
                result.component = generateBreadcrumbsCode(propsString);
                result.imports.push(`import { Link } from "fictoan-react";`);
                break;
            case "Callout":
                result.component = generateCalloutCode(propsString);
                break;
            case "Card":
                result.component = generateCardCode(propsString);
                break;
            case "Divider":
                result.component = generateDividerCode(propsString);
                break;
            case "Drawer":
                result.component = generateDrawerCode(propsString);
                // Replace the main import to include Button and imperative functions
                result.imports[0] = `import { ${componentName}, Button, showDrawer, hideDrawer } from "fictoan-react";`;
                result.hasState = false; // Drawer uses imperative API, not React state
                break;
            case "ListBox":
                result.component = generateListBoxCode(propsString);
                if (props.onChange === undefined) {
                    result.hasState = true;
                    result.stateDeclarations?.push(
                        `const [selectedValue, setSelectedValue] = useState(${props.allowMultiSelect ? "[]" : '""'});`,
                    );
                    result.helperFunctions?.push(
                        `const handleSelectionChange = (value) => {\n        setSelectedValue(value);\n        console.log('Selected:', value);\n    };`,
                    );
                }
                break;
            case "Modal":
                result.component = generateModalCode(propsString);
                // Replace the main import to include Button and imperative functions
                result.imports[0] = `import { ${componentName}, Button, showModal, hideModal } from "fictoan-react";`;
                result.hasState = false; // Modal uses imperative API, not React state
                break;
            case "OptionCard":
                result.component = generateOptionCardCode(propsString);
                break;
            case "OptionCardsGroup":
                result.component = generateOptionCardsGroupCode(propsString);
                result.imports[0] = `import { OptionCardsGroup, OptionCard } from "fictoan-react";`;
                result.hasState = true;
                result.stateDeclarations?.push(
                    `const [selectedIds, setSelectedIds] = useState(new Set());`
                );
                result.helperFunctions?.push(
                    `const handleSelectionChange = (newSelectedIds) => {\n        setSelectedIds(newSelectedIds);\n        console.log('Selected IDs:', Array.from(newSelectedIds));\n    };`
                );
                break;
            default:
                result.component = generateDefaultCode(propsString);
        }

        return result;
    };

    const generateAccordionCode = (propsString : string) : string => {
        // Get summary prop value or use default
        const summaryContent = props.summary || "Click to expand";
        const childrenContentValue = childrenContent || "Accordion content goes here";

        // Check if summary contains JSX/components
        const summaryProp = summaryContent.includes("<") && summaryContent.includes(">")
            ? `summary={${summaryContent}}`
            : `summary="${summaryContent}"`;

        // Add summary to props if not already there
        let finalPropsString = propsString;
        if (!propsString.includes("summary")) {
            finalPropsString = finalPropsString ? `${finalPropsString}\n    ${summaryProp}` : `    ${summaryProp}`;
        }

        // Generate complete Accordion with summary and children
        return `<${componentName}${finalPropsString ? "\n" + finalPropsString : ""}
>
    ${childrenContentValue}
</${componentName}>`;
    };

    const generateBadgeCode = (propsString : string) : string => {
        const content = childrenContent || "Badge";

        // Add onDelete handler if withDelete is true
        let finalPropsString = propsString;
        if (props.withDelete && !propsString.includes("onDelete")) {
            finalPropsString += finalPropsString ? "\n" : "";
            finalPropsString += "    onDelete={handleDelete}";
        }

        return `<${componentName}${finalPropsString ? "\n" + finalPropsString : ""}
>
    ${content}
</${componentName}>`;
    };

    const generateButtonCode = (propsString : string) : string => {
        // For Button, use children for the text content, not the label prop
        const content = props.children || childrenContent || "Click me";

        // Filter out children from props string since we handle it separately
        let finalPropsString = propsString.split("\n")
            .filter(line => !line.includes("children="))
            .join("\n");

        // Add onClick handler if not present
        if (!finalPropsString.includes("onClick")) {
            finalPropsString += finalPropsString ? "\n" : "";
            finalPropsString += "    onClick={handleClick}";
        }

        return `<${componentName}${finalPropsString ? "\n" + finalPropsString : ""}
>
    ${content}
</${componentName}>`;
    };

    const generateBreadcrumbsCode = (propsString : string) : string => {
        // Generate sample breadcrumb links
        const links = [
            "    <Link href=\"/\">Home</Link>",
            "    <Link href=\"/components\">Components</Link>",
            "    <Link href=\"/components/breadcrumbs\">Breadcrumbs</Link>",
        ].join("\n");

        return `<${componentName}${propsString ? "\n" + propsString : ""}
>
${links}
</${componentName}>`;
    };

    const generateCalloutCode = (propsString : string) : string => {
        const content = props.children || childrenContent || "Important information goes here";

        // Ensure kind prop is included (it's required)
        let finalPropsString = propsString;
        if (!propsString.includes("kind=")) {
            const defaultKind = props.kind || "info";
            finalPropsString = finalPropsString ? `${finalPropsString}\n    kind="${defaultKind}"` : `    kind="${defaultKind}"`;
        }

        return `<${componentName}${finalPropsString ? "\n" + finalPropsString : ""}
>
    ${content}
</${componentName}>`;
    };

    const generateCardCode = (propsString : string) : string => {
        const content = props.children || childrenContent || "Card content goes here";

        // Filter out children from props string since we handle it separately
        let finalPropsString = propsString.split("\n")
            .filter(line => !line.includes("children="))
            .join("\n");

        return `<${componentName}${finalPropsString ? "\n" + finalPropsString : ""}
>
    ${content}
</${componentName}>`;
    };

    const generateDividerCode = (propsString : string) : string => {
        // Divider is a self-closing component
        return `<${componentName}${propsString ? "\n" + propsString : ""}${!propsString ? " " : "\n"}/>`;
    };

    const generateDrawerCode = (propsString : string) : string => {
        const content = props.children || childrenContent || "Drawer content goes here";
        const drawerId = props.id || "sample-drawer";

        // Filter out children from props string since we handle it separately
        let finalPropsString = propsString.split("\n")
            .filter(line => !line.includes("children="))
            .join("\n");

        // Ensure id prop is included
        if (!finalPropsString.includes("id=")) {
            finalPropsString = finalPropsString ? `${finalPropsString}\n    id="${drawerId}"` : `    id="${drawerId}"`;
        }

        // Generate complete example with trigger button and drawer
        return `<>
    <Button onClick={() => showDrawer('${drawerId}')}>
        Open Drawer
    </Button>
    
    <${componentName}${finalPropsString ? "\n" + finalPropsString : ""}
    >
        ${content}
        
        <Button 
            onClick={() => hideDrawer('${drawerId}')}
            kind="secondary"
            marginTop="medium"
        >
            Close
        </Button>
    </${componentName}>
</>`;
    };

    const generateListBoxCode = (propsString : string) : string => {
        // Generate sample options if not provided
        const defaultOptions = [
            { value: "option1", label: "Option 1" },
            { value: "option2", label: "Option 2" },
            { value: "option3", label: "Option 3" },
            { value: "option4", label: "Option 4", disabled: true },
        ];

        // Ensure options prop is included
        let finalPropsString = propsString;
        if (!propsString.includes("options=")) {
            const optionsString = `options={${JSON.stringify(defaultOptions, null, 8).replace(/\n/g, "\n")}}`;
            finalPropsString = finalPropsString ? `${finalPropsString}\n    ${optionsString}` : `    ${optionsString}`;
        }

        // Add onChange handler if not present
        if (!finalPropsString.includes("onChange=")) {
            finalPropsString += finalPropsString ? "\n" : "";
            finalPropsString += "    onChange={handleSelectionChange}";
        }

        // Add value prop if state is being used
        if (props.onChange === undefined) {
            finalPropsString += finalPropsString ? "\n" : "";
            finalPropsString += "    value={selectedValue}";
        }

        return `<${componentName}${finalPropsString ? "\n" + finalPropsString : ""}
/>`;
    };

    const generateModalCode = (propsString : string) : string => {
        const content = props.children || childrenContent || "Modal content goes here";
        const modalId = props.id || "sample-modal";

        // Filter out children from props string since we handle it separately
        let finalPropsString = propsString.split("\n")
            .filter(line => !line.includes("children="))
            .join("\n");

        // Ensure id prop is included
        if (!finalPropsString.includes("id=")) {
            finalPropsString = finalPropsString ? `${finalPropsString}\n    id="${modalId}"` : `    id="${modalId}"`;
        }

        // Generate complete example with trigger button and modal
        return `<>
    <Button onClick={() => showModal('${modalId}')}>
        Open Modal
    </Button>
    
    <${componentName}${finalPropsString ? "\n" + finalPropsString : ""}
    >
        ${content}
        
        <Button 
            onClick={() => hideModal('${modalId}')}
            kind="secondary"
            marginTop="medium"
        >
            Close Modal
        </Button>
    </${componentName}>
</>`;
    };

    const generateOptionCardCode = (propsString : string) : string => {
        const content = props.children || childrenContent || "Option content";
        const cardId = props.id || "option-card-1";

        // Filter out children and id from props string since we handle them separately
        let filteredProps = propsString
            .split("\n")
            .filter(line => !line.includes("children=") && !line.includes("id="))
            .join("\n");

        return `<OptionCard 
    id="${cardId}"${filteredProps ? "\n" + filteredProps : ""}
>
    ${content}
</OptionCard>`;
    };

    const generateOptionCardsGroupCode = (propsString : string) : string => {
        // Filter out onSelectionChange from props string since we handle it separately
        let filteredProps = propsString
            .split("\n")
            .filter(line => !line.includes("onSelectionChange="))
            .join("\n");

        const finalPropsString = filteredProps + (filteredProps ? "\n" : "") + "    onSelectionChange={handleSelectionChange}";

        return `<OptionCardsGroup${finalPropsString ? "\n" + finalPropsString : ""}
>
    <OptionCard id="card-1">
        Option 1
    </OptionCard>
    
    <OptionCard id="card-2">
        Option 2  
    </OptionCard>
    
    <OptionCard id="card-3">
        Option 3
    </OptionCard>
</OptionCardsGroup>`;
    };

    const generateDefaultCode = (propsString : string) : string => {
        const hasChildren = metadata.props.children;
        const content = childrenContent || componentName;

        if (hasChildren) {
            return `<${componentName}${propsString ? "\n" + propsString : ""}
>
    ${content}
</${componentName}>`;
        } else {
            return `<${componentName}${propsString ? "\n" + propsString : ""}
/>`;
        }
    };

    const generatePropsString = () : string => {
        const propsArray : string[] = [];

        Object.entries(props).forEach(([ key, value ]) => {
            // Skip children as it's handled separately
            if (key === "children") return;

            // Skip summary for Accordion as we'll handle it in generateAccordionCode
            if (componentName === "Accordion" && key === "summary") return;

            // For Button, Card, Drawer, and OptionCard, skip children since we handle it as content, not a prop
            if ((componentName === "Button" || componentName === "Card" || componentName === "Drawer" || componentName === "OptionCard") && key === "children") return;

            // For OptionCardsGroup, skip onSelectionChange since we handle it separately
            if (componentName === "OptionCardsGroup" && key === "onSelectionChange") return;

            // Only include non-default values
            const propDef = metadata.props[key];
            if (propDef && shouldIncludeProp(key, value, propDef)) {
                const propString = formatPropValue(key, value);
                if (propString) {
                    propsArray.push(`    ${propString}`);
                }
            }
        });

        return propsArray.join("\n");
    };

    const shouldIncludeProp = (key : string, value : any, propDef : PropDefinition) : boolean => {
        // Always include required props
        if (propDef.required) return true;

        // Include if value is different from default
        if (propDef.defaultValue?.value !== undefined) {
            return value !== propDef.defaultValue.value;
        }

        // Include if value is explicitly set
        return value !== undefined && value !== null && value !== false && value !== "";
    };

    const formatPropValue = (key : string, value : any) : string | null => {
        if (value === true) {
            return key;
        }
        if (typeof value === "string" && value) {
            return `${key}="${value}"`;
        }
        if (typeof value === "number") {
            return `${key}={${value}}`;
        }
        if (typeof value === "boolean" && value === false) {
            return `${key}={false}`;
        }
        return null;
    };

    const needsState = () : boolean => {
        // Check if component typically needs state
        const stateComponents = [ "Modal", "Drawer", "Tooltip", "Tabs", "Collapse" ];
        return stateComponents.includes(componentName);
    };

    return {
        generateCompleteCode,
        generateComponentJSX,
    };
};

/**
 * Legacy class-based interface for backward compatibility
 * @deprecated Use createCodeGenerator instead
 */
export class CodeGenerator {
    private generator: ReturnType<typeof createCodeGenerator>;

    constructor(
        componentName : string,
        metadata : ComponentMetadata,
        props : { [key : string] : any },
        childrenContent : string = "",
    ) {
        this.generator = createCodeGenerator(componentName, metadata, props, childrenContent);
    }

    generateCompleteCode() : string {
        return this.generator.generateCompleteCode();
    }

    generateComponentJSX() : string {
        return this.generator.generateComponentJSX();
    }
}

// Export the modern functional API as the default
export { createCodeGenerator };