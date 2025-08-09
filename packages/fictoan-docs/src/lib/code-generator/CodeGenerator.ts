import { ComponentMetadata, PropDefinition } from '../type-analyzer/TypeAnalyzer';

interface GeneratedCode {
    imports: string[];
    component: string;
    hasState?: boolean;
    stateDeclarations?: string[];
    helperFunctions?: string[];
}

/**
 * Generates complete, working code examples for components
 */
export class CodeGenerator {
    private componentName: string;
    private metadata: ComponentMetadata;
    private props: { [key: string]: any };
    private childrenContent: string;
    
    constructor(
        componentName: string, 
        metadata: ComponentMetadata, 
        props: { [key: string]: any },
        childrenContent: string = ''
    ) {
        this.componentName = componentName;
        this.metadata = metadata;
        this.props = props;
        this.childrenContent = childrenContent;
    }
    
    /**
     * Generate complete code including all necessary parts
     */
    generateCompleteCode(): string {
        const code = this.generateCodeParts();
        
        // Build the complete code
        let completeCode = '';
        
        // Add imports
        if (code.imports.length > 0) {
            completeCode += code.imports.join('\n') + '\n\n';
        }
        
        // Add function wrapper if we have state or helpers
        if (code.hasState || code.helperFunctions) {
            completeCode += `export function ${this.componentName}Example() {\n`;
            
            // Add state declarations
            if (code.stateDeclarations && code.stateDeclarations.length > 0) {
                code.stateDeclarations.forEach(state => {
                    completeCode += `    ${state}\n`;
                });
                completeCode += '\n';
            }
            
            // Add helper functions
            if (code.helperFunctions && code.helperFunctions.length > 0) {
                code.helperFunctions.forEach(helper => {
                    completeCode += `    ${helper}\n`;
                });
                completeCode += '\n';
            }
            
            // Add return statement with component
            completeCode += '    return (\n';
            const indentedComponent = code.component.split('\n').map(line => `        ${line}`).join('\n');
            completeCode += indentedComponent + '\n';
            completeCode += '    );\n';
            completeCode += '}';
        } else {
            // Simple component without state
            completeCode = code.component;
        }
        
        return completeCode;
    }
    
    /**
     * Generate just the JSX component code (for inline display)
     */
    generateComponentJSX(): string {
        const parts = this.generateCodeParts();
        return parts.component;
    }
    
    private generateCodeParts(): GeneratedCode {
        const result: GeneratedCode = {
            imports: [`import { ${this.componentName} } from '@fictoan/fictoan-react';`],
            component: '',
            hasState: false,
            stateDeclarations: [],
            helperFunctions: []
        };
        
        // Check for special components that need state
        if (this.needsState()) {
            result.hasState = true;
            result.imports.push(`import React, { useState } from 'react';`);
        }
        
        // Generate props string
        const propsString = this.generatePropsString();
        
        // Handle different component patterns
        switch (this.componentName) {
            case 'Accordion':
                result.component = this.generateAccordionCode(propsString);
                break;
            case 'Badge':
                result.component = this.generateBadgeCode(propsString);
                if (this.props.withDelete) {
                    result.hasState = true;
                    result.helperFunctions?.push(
                        `const handleDelete = () => {\n        console.log('Badge deleted');\n    };`
                    );
                }
                break;
            case 'Button':
                result.component = this.generateButtonCode(propsString);
                if (this.props.onClick === undefined) {
                    result.helperFunctions?.push(
                        `const handleClick = () => {\n        console.log('Button clicked');\n    };`
                    );
                }
                break;
            case 'Breadcrumbs':
                result.component = this.generateBreadcrumbsCode(propsString);
                result.imports.push(`import { Link } from '@fictoan/fictoan-react';`);
                break;
            case 'Callout':
                result.component = this.generateCalloutCode(propsString);
                break;
            case 'Card':
                result.component = this.generateCardCode(propsString);
                break;
            default:
                result.component = this.generateDefaultCode(propsString);
        }
        
        return result;
    }
    
    private generateAccordionCode(propsString: string): string {
        // Get summary prop value or use default
        const summaryContent = this.props.summary || 'Click to expand';
        const childrenContent = this.childrenContent || 'Accordion content goes here';
        
        // Check if summary contains JSX/components
        const summaryProp = summaryContent.includes('<') && summaryContent.includes('>')
            ? `summary={${summaryContent}}`
            : `summary="${summaryContent}"`;
        
        // Add summary to props if not already there
        let finalPropsString = propsString;
        if (!propsString.includes('summary')) {
            finalPropsString = finalPropsString ? `${finalPropsString}\n    ${summaryProp}` : `    ${summaryProp}`;
        }
        
        // Generate complete Accordion with summary and children
        return `<${this.componentName}${finalPropsString ? '\n' + finalPropsString : ''}
>
    ${childrenContent}
</${this.componentName}>`;
    }
    
    private generateBadgeCode(propsString: string): string {
        const content = this.childrenContent || 'Badge';
        
        // Add onDelete handler if withDelete is true
        let finalPropsString = propsString;
        if (this.props.withDelete && !propsString.includes('onDelete')) {
            finalPropsString += finalPropsString ? '\n' : '';
            finalPropsString += '    onDelete={handleDelete}';
        }
        
        return `<${this.componentName}${finalPropsString ? '\n' + finalPropsString : ''}
>
    ${content}
</${this.componentName}>`;
    }
    
    private generateButtonCode(propsString: string): string {
        // For Button, use children for the text content, not the label prop
        const content = this.props.children || this.childrenContent || 'Click me';
        
        // Filter out children from props string since we handle it separately
        let finalPropsString = propsString.split('\n')
            .filter(line => !line.includes('children='))
            .join('\n');
        
        // Add onClick handler if not present
        if (!finalPropsString.includes('onClick')) {
            finalPropsString += finalPropsString ? '\n' : '';
            finalPropsString += '    onClick={handleClick}';
        }
        
        return `<${this.componentName}${finalPropsString ? '\n' + finalPropsString : ''}
>
    ${content}
</${this.componentName}>`;
    }
    
    private generateBreadcrumbsCode(propsString: string): string {
        // Generate sample breadcrumb links
        const links = [
            '    <Link href="/">Home</Link>',
            '    <Link href="/components">Components</Link>',
            '    <Link href="/components/breadcrumbs">Breadcrumbs</Link>'
        ].join('\n');
        
        return `<${this.componentName}${propsString ? '\n' + propsString : ''}
>
${links}
</${this.componentName}>`;
    }
    
    private generateCalloutCode(propsString: string): string {
        const content = this.props.children || this.childrenContent || 'Important information goes here';
        
        // Ensure kind prop is included (it's required)
        let finalPropsString = propsString;
        if (!propsString.includes('kind=')) {
            const defaultKind = this.props.kind || 'info';
            finalPropsString = finalPropsString ? `${finalPropsString}\n    kind="${defaultKind}"` : `    kind="${defaultKind}"`;
        }
        
        return `<${this.componentName}${finalPropsString ? '\n' + finalPropsString : ''}
>
    ${content}
</${this.componentName}>`;
    }
    
    private generateCardCode(propsString: string): string {
        const content = this.props.children || this.childrenContent || 'Card content goes here';
        
        // Filter out children from props string since we handle it separately
        let finalPropsString = propsString.split('\n')
            .filter(line => !line.includes('children='))
            .join('\n');
        
        return `<${this.componentName}${finalPropsString ? '\n' + finalPropsString : ''}
>
    ${content}
</${this.componentName}>`;
    }
    
    private generateDefaultCode(propsString: string): string {
        const hasChildren = this.metadata.props.children;
        const content = this.childrenContent || this.componentName;
        
        if (hasChildren) {
            return `<${this.componentName}${propsString ? '\n' + propsString : ''}
>
    ${content}
</${this.componentName}>`;
        } else {
            return `<${this.componentName}${propsString ? '\n' + propsString : ''}
/>`;
        }
    }
    
    private generatePropsString(): string {
        const propsArray: string[] = [];
        
        Object.entries(this.props).forEach(([key, value]) => {
            // Skip children as it's handled separately
            if (key === 'children') return;
            
            // Skip summary for Accordion as we'll handle it in generateAccordionCode
            if (this.componentName === 'Accordion' && key === 'summary') return;
            
            // For Button and Card, skip children since we handle it as content, not a prop
            if ((this.componentName === 'Button' || this.componentName === 'Card') && key === 'children') return;
            
            // Only include non-default values
            const propDef = this.metadata.props[key];
            if (propDef && this.shouldIncludeProp(key, value, propDef)) {
                const propString = this.formatPropValue(key, value);
                if (propString) {
                    propsArray.push(`    ${propString}`);
                }
            }
        });
        
        return propsArray.join('\n');
    }
    
    private shouldIncludeProp(key: string, value: any, propDef: PropDefinition): boolean {
        // Always include required props
        if (propDef.required) return true;
        
        // Include if value is different from default
        if (propDef.defaultValue?.value !== undefined) {
            return value !== propDef.defaultValue.value;
        }
        
        // Include if value is explicitly set
        return value !== undefined && value !== null && value !== false && value !== '';
    }
    
    private formatPropValue(key: string, value: any): string | null {
        if (value === true) {
            return key;
        }
        if (typeof value === 'string' && value) {
            return `${key}="${value}"`;
        }
        if (typeof value === 'number') {
            return `${key}={${value}}`;
        }
        if (typeof value === 'boolean' && value === false) {
            return `${key}={false}`;
        }
        return null;
    }
    
    private needsState(): boolean {
        // Check if component typically needs state
        const stateComponents = ['Modal', 'Drawer', 'Tooltip', 'Tabs', 'Collapse'];
        return stateComponents.includes(this.componentName);
    }
}