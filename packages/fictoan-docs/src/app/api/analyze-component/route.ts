// REACT CORE ==========================================================================================================
import { NextRequest, NextResponse } from "next/server";

// OTHER ===============================================================================================================
import * as fs from "fs";
import * as path from "path";
import * as ts from "typescript";

interface PropType {
    name : string;
}

interface PropDefinition {
    defaultValue ? : { value : any } | null;
    description  ? : string;
    name           : string;
    required       : boolean;
    type           : PropType;
}

interface ComponentMetadata {
    displayName : string;
    description : string;
    props       : { [key : string] : PropDefinition };
}

export const GET = async (request: NextRequest) => {
    const searchParams = request.nextUrl.searchParams;
    const componentName = searchParams.get("component");

    if (!componentName) {
        return NextResponse.json({ error: "Component name is required" }, { status: 400 });
    }

    try {
        const metadata = await analyzeComponent(componentName);
        if (!metadata) {
            return NextResponse.json({ error: "Component not found or not supported" }, { status: 404 });
        }
        return NextResponse.json(metadata);
    } catch (error) {
        console.error("Error analyzing component:", error);
        return NextResponse.json({ error: "Failed to analyze component" }, { status: 500 });
    }
};

const analyzeComponent = async (componentName: string): Promise<ComponentMetadata | null> => {
    // List of components we can analyze
    const supportedComponents = ["Accordion", "Badge", "Button", "Breadcrumbs", "Callout", "Card", "Divider", "Drawer", "ListBox", "Modal", "OptionCard", "OptionCardsGroup", "Pagination", "Meter", "ProgressBar", "Table"];
    if (!supportedComponents.includes(componentName)) {
        return null;
    }

    // Find the actual component source file
    let componentPath: string;
    
    if (componentName === "ListBox") {
        // ListBox is nested deeper in the Form folder
        componentPath = path.join(
            process.cwd(),
            "../fictoan-react/src/components/Form/ListBox",
            `${componentName}.tsx`,
        );
    } else if (componentName === "OptionCard" || componentName === "OptionCardsGroup") {
        // Both OptionCard and OptionCardsGroup are in the same file
        componentPath = path.join(
            process.cwd(),
            "../fictoan-react/src/components/OptionCard",
            "OptionCard.tsx",
        );
    } else if (componentName === "Pagination") {
        // Pagination has its props in a separate constants file
        componentPath = path.join(
            process.cwd(),
            "../fictoan-react/src/components/Pagination",
            "Pagination.tsx",
        );
    } else {
        componentPath = path.join(
            process.cwd(),
            "../fictoan-react/src/components",
            componentName,
            `${componentName}.tsx`,
        );
    }

    if (!fs.existsSync(componentPath)) {
        console.log(`Component file not found: ${componentPath}`);
        return null;
    }

    // Read and parse the source file
    const sourceCode = fs.readFileSync(componentPath, "utf-8");

    // Create a temporary program to parse this single file
    const compilerOptions: ts.CompilerOptions = {
        target: ts.ScriptTarget.ESNext,
        module: ts.ModuleKind.ESNext,
        jsx: ts.JsxEmit.React,
        strict: true,
        esModuleInterop: true,
        skipLibCheck: true,
        forceConsistentCasingInFileNames: true,
    };

    const sourceFile = ts.createSourceFile(
        componentPath,
        sourceCode,
        ts.ScriptTarget.ESNext,
        true,
    );

    const program = ts.createProgram([componentPath], compilerOptions);
    const checker = program.getTypeChecker();

    // For ListBox and Pagination, also read the constants file where the props interface is defined
    if (componentName === "ListBox") {
        const constantsPath = path.join(
            process.cwd(),
            "../fictoan-react/src/components/Form/ListBox/constants.ts",
        );
        
        if (fs.existsSync(constantsPath)) {
            const constantsCode = fs.readFileSync(constantsPath, "utf-8");
            const constantsFile = ts.createSourceFile(
                constantsPath,
                constantsCode,
                ts.ScriptTarget.ESNext,
                true,
            );
            
            // Try to find props interface in constants file
            const propsInterface = findPropsInterface(constantsFile, componentName);
            if (propsInterface) {
                const props = extractPropsFromInterface(propsInterface, checker, constantsFile);
                return {
                    displayName: componentName,
                    description: extractJSDocDescription(propsInterface) || `${componentName} component`,
                    props,
                };
            }
        }
    }

    if (componentName === "Pagination") {
        const constantsPath = path.join(
            process.cwd(),
            "../fictoan-react/src/components/Pagination/constants.ts",
        );
        
        if (fs.existsSync(constantsPath)) {
            const constantsCode = fs.readFileSync(constantsPath, "utf-8");
            const constantsFile = ts.createSourceFile(
                constantsPath,
                constantsCode,
                ts.ScriptTarget.ESNext,
                true,
            );
            
            // Try to find props interface in constants file
            const propsInterface = findPropsInterface(constantsFile, componentName);
            if (propsInterface) {
                const props = extractPropsFromInterface(propsInterface, checker, constantsFile);
                return {
                    displayName: componentName,
                    description: extractJSDocDescription(propsInterface) || `${componentName} component`,
                    props,
                };
            }
        }
    }

    // Find the props interface
    const propsInterface = findPropsInterface(sourceFile, componentName);
    if (!propsInterface) {
        console.log(`Props interface not found for ${componentName}`);
        return null;
    }

    // Extract prop definitions from the interface
    const props = extractPropsFromInterface(propsInterface, checker, sourceFile);

    // Find default values from component implementation
    const componentNode = findComponentDeclaration(sourceFile, componentName);
    if (componentNode) {
        extractDefaultValues(componentNode, props);
    }

    return {
        displayName: componentName,
        description: extractJSDocDescription(propsInterface) || `${componentName} component`,
        props,
    };
};

const findPropsInterface = (sourceFile: ts.SourceFile, componentName: string): ts.InterfaceDeclaration | null => {
    let propsInterface: ts.InterfaceDeclaration | null = null;

    const visit = (node: ts.Node) => {
        if (ts.isInterfaceDeclaration(node)) {
            const name = node.name?.text;
            // Look for ComponentCustomProps or ComponentProps
            if (name === `${componentName}CustomProps` || name === `${componentName}Props`) {
                propsInterface = node;
            }
            // Handle special case for OptionCardsGroup which uses OptionCardsProviderProps
            else if (componentName === "OptionCardsGroup" && name === "OptionCardsProviderProps") {
                propsInterface = node;
            }
            // Handle special case for Pagination which uses PaginationCustomProps
            else if (componentName === "Pagination" && name === "PaginationCustomProps") {
                propsInterface = node;
            }
        }
        ts.forEachChild(node, visit);
    };

    visit(sourceFile);
    return propsInterface;
};

const extractPropsFromInterface = (
    interfaceNode: ts.InterfaceDeclaration,
    checker: ts.TypeChecker,
    sourceFile: ts.SourceFile,
): { [key: string]: PropDefinition } => {
    const props: { [key: string]: PropDefinition } = {};

    interfaceNode.members.forEach(member => {
        if (ts.isPropertySignature(member) && member.name) {
            const propName = member.name.getText(sourceFile);

            // Get the type text
            let typeName = "any";
            if (member.type) {
                typeName = extractTypeText(member.type, sourceFile);
            }

            props[propName] = {
                name: propName,
                required: !member.questionToken,
                type: {
                    name: typeName,
                },
                defaultValue: null,
                description: extractJSDocDescription(member),
            };
        }
    });

    return props;
};

const extractTypeText = (typeNode: ts.TypeNode, sourceFile: ts.SourceFile): string => {
    // Handle union types
    if (ts.isUnionTypeNode(typeNode)) {
        return typeNode.types
            .map(t => extractTypeText(t, sourceFile))
            .join(" | ");
    }

    // Handle literal types
    if (ts.isLiteralTypeNode(typeNode)) {
        if (ts.isStringLiteral(typeNode.literal)) {
            return `'${typeNode.literal.text}'`;
        }
        return typeNode.literal.getText(sourceFile);
    }

    // Handle type references (e.g., ReactNode, boolean, string, SpacingTypes)
    if (ts.isTypeReferenceNode(typeNode)) {
        const typeName = typeNode.typeName.getText(sourceFile);

        // Try to resolve known type aliases
        if (typeName === "SpacingTypes") {
            return "'none' | 'nano' | 'micro' | 'tiny' | 'small' | 'medium' | 'large' | 'huge'";
        }
        if (typeName === "ShapeTypes") {
            return "'none' | 'rounded' | 'curved'";
        }
        if (typeName === "EmphasisTypes") {
            return "'primary' | 'secondary' | 'tertiary' | 'custom'";
        }
        if (typeName === "ColourPropTypes") {
            return "string"; // Simplified for now - represents theme color values
        }
        if (typeName === "TickPosition") {
            return "'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'centre-left' | 'center-left' | 'centre-right' | 'center-right' | 'centre-top' | 'center-top' | 'center-bottom' | 'centre-bottom' | 'centre' | 'center'";
        }

        return typeName;
    }

    // Handle keyword types
    if (typeNode.kind === ts.SyntaxKind.BooleanKeyword) {
        return "boolean";
    }
    if (typeNode.kind === ts.SyntaxKind.StringKeyword) {
        return "string";
    }
    if (typeNode.kind === ts.SyntaxKind.NumberKeyword) {
        return "number";
    }

    // Default to the text representation
    return typeNode.getText(sourceFile);
};

const findComponentDeclaration = (sourceFile: ts.SourceFile, componentName: string): ts.Node | null => {
    let componentNode: ts.Node | null = null;

    const visit = (node: ts.Node) => {
        // Look for: export const Component = React.forwardRef(...)
        if (ts.isVariableStatement(node)) {
            const declaration = node.declarationList.declarations[0];
            if (declaration.name && ts.isIdentifier(declaration.name)) {
                if (declaration.name.text === componentName) {
                    componentNode = declaration.initializer || null;
                }
            }
        }
        // Look for: export function Component(...)
        else if (ts.isFunctionDeclaration(node)) {
            if (node.name?.text === componentName) {
                componentNode = node;
            }
        }

        if (!componentNode) {
            ts.forEachChild(node, visit);
        }
    };

    visit(sourceFile);
    return componentNode;
};

const extractDefaultValues = (componentNode: ts.Node, props: { [key: string]: PropDefinition }): void => {
    const visit = (node: ts.Node) => {
        // Look for function parameters with destructuring
        if (ts.isFunctionExpression(node) || ts.isArrowFunction(node)) {
            const params = node.parameters;
            if (params.length > 0 && params[0].name) {
                if (ts.isObjectBindingPattern(params[0].name)) {
                    params[0].name.elements.forEach(element => {
                        if (ts.isBindingElement(element) && element.initializer) {
                            let propName = "";
                            if (element.name && ts.isIdentifier(element.name)) {
                                propName = element.name.text;
                            }

                            if (propName && props[propName]) {
                                // Extract the default value
                                const defaultText = element.initializer.getText();
                                props[propName].defaultValue = {
                                    value: parseDefaultValue(defaultText),
                                };
                            }
                        }
                    });
                }
            }
        }

        ts.forEachChild(node, visit);
    };

    visit(componentNode);
};

const parseDefaultValue = (text: string): any => {
    // Remove quotes for strings
    if (text.startsWith("\"") || text.startsWith("'")) {
        return text.slice(1, -1);
    }
    // Parse booleans
    if (text === "true") return true;
    if (text === "false") return false;
    // Parse numbers
    if (!isNaN(Number(text))) return Number(text);
    // Default
    return text;
};

const extractJSDocDescription = (node: ts.Node): string | undefined => {
    const jsDocs = ts.getJSDocCommentsAndTags(node);
    if (jsDocs.length > 0) {
        const comment = jsDocs[0];
        if ("comment" in comment) {
            if (typeof comment.comment === "string") {
                return comment.comment;
            }
            if (Array.isArray(comment.comment)) {
                return comment.comment.map(c =>
                    typeof c === "string" ? c : c.text,
                ).join("");
            }
        }
    }
    return undefined;
};