import { readFile } from "fs/promises";
import { join } from "path";
import { globby } from "globby";

interface ValidationIssue {
    type: "error" | "warning" | "suggestion";
    category: "props" | "typescript" | "css" | "accessibility" | "forwardRef" | "naming";
    message: string;
    line?: number;
    suggestion?: string;
}

interface ValidationResult {
    component: string;
    path: string;
    issues: ValidationIssue[];
    score: number; // 0-100, higher is better
}

export async function validatePatternsTool(args: { 
    componentName?: string;
    validateAll?: boolean;
    strict?: boolean;
}): Promise<{
    content: [{
        type: "text";
        text: string;
    }];
}> {
    try {
        const { componentName, validateAll = false, strict = false } = args;
        
        // Determine which components to validate
        let componentsToValidate: string[] = [];
        
        if (validateAll) {
            // Find all component files
            const componentFiles = await globby([
                "../fictoan-react/src/components/**/*.tsx",
                "!../fictoan-react/src/components/**/index.tsx"
            ], {
                cwd: process.cwd(),
                absolute: true
            });
            
            componentsToValidate = componentFiles;
        } else if (componentName) {
            // Find the specific component
            const componentFiles = await globby([
                `../fictoan-react/src/components/**/${componentName}.tsx`,
                `../fictoan-react/src/components/**/${componentName}/*.tsx`
            ], {
                cwd: process.cwd(),
                absolute: true
            });
            
            if (componentFiles.length === 0) {
                return {
                    content: [{
                        type: "text",
                        text: `❌ Component "${componentName}" not found`
                    }]
                };
            }
            
            componentsToValidate = componentFiles.filter(file => !file.endsWith('index.tsx'));
        } else {
            return {
                content: [{
                    type: "text",
                    text: "❌ Please specify either componentName or set validateAll to true"
                }]
            };
        }

        const results: ValidationResult[] = [];
        
        for (const filePath of componentsToValidate) {
            const result = await validateComponent(filePath, strict);
            if (result) {
                results.push(result);
            }
        }

        // Generate report
        const report = generateValidationReport(results, strict);
        
        return {
            content: [{
                type: "text",
                text: report
            }]
        };
        
    } catch (error) {
        return {
            content: [{
                type: "text",
                text: `❌ Error validating patterns: ${error instanceof Error ? error.message : String(error)}`
            }]
        };
    }
}

async function validateComponent(filePath: string, strict: boolean): Promise<ValidationResult | null> {
    try {
        const content = await readFile(filePath, 'utf-8');
        const componentName = extractComponentName(filePath);
        
        if (!componentName) return null;
        
        const issues: ValidationIssue[] = [];
        
        // 1. Validate prop naming conventions
        validatePropNaming(content, issues);
        
        // 2. Validate TypeScript interface structure
        validateTypeScriptInterface(content, componentName, issues);
        
        // 3. Validate CSS variable naming (if CSS file exists)
        await validateCSSVariables(filePath, componentName, issues);
        
        // 4. Validate responsive prop patterns
        validateResponsiveProps(content, issues);
        
        // 5. Validate accessibility attributes
        validateAccessibility(content, issues);
        
        // 6. Validate ForwardRef implementation
        validateForwardRef(content, componentName, issues);
        
        // 7. Additional strict validations
        if (strict) {
            validateStrictPatterns(content, componentName, issues);
        }
        
        // Calculate score (higher is better)
        const score = calculateScore(issues);
        
        return {
            component: componentName,
            path: filePath,
            issues,
            score
        };
        
    } catch (error) {
        return null;
    }
}

function extractComponentName(filePath: string): string | null {
    const fileName = filePath.split('/').pop()?.replace('.tsx', '');
    return fileName && fileName !== 'index' ? fileName : null;
}

function validatePropNaming(content: string, issues: ValidationIssue[]): void {
    const lines = content.split('\n');
    
    lines.forEach((line, index) => {
        // Check for boolean props that should start with 'is', 'has', 'show', etc.
        const booleanPropMatch = line.match(/(\w+)\s*\?\s*:\s*boolean/);
        if (booleanPropMatch) {
            const propName = booleanPropMatch[1];
            if (!propName.match(/^(is|has|show|hide|enable|disable|allow|can|should|will)/i)) {
                issues.push({
                    type: "suggestion",
                    category: "props",
                    message: `Boolean prop "${propName}" should start with is/has/show/etc for clarity`,
                    line: index + 1,
                    suggestion: `Consider renaming to "is${propName.charAt(0).toUpperCase() + propName.slice(1)}"`
                });
            }
        }
        
        // Check for spacing props using Fictoan conventions
        const spacingMatch = line.match(/(\w+)\s*\?\s*:\s*string.*?(margin|padding)/i);
        if (spacingMatch) {
            const propName = spacingMatch[1];
            if (!propName.match(/^(margin|padding)(Top|Right|Bottom|Left|All|X|Y)?$/)) {
                issues.push({
                    type: "warning",
                    category: "props",
                    message: `Spacing prop "${propName}" doesn't follow Fictoan naming conventions`,
                    line: index + 1,
                    suggestion: "Use marginTop, paddingAll, etc."
                });
            }
        }
        
        // Check for color props
        const colorMatch = line.match(/(\w+)\s*\?\s*:\s*string.*?(color|colour)/i);
        if (colorMatch) {
            const propName = colorMatch[1];
            if (!propName.includes('Colour') && !propName.includes('Color')) {
                issues.push({
                    type: "suggestion",
                    category: "props",
                    message: `Color prop "${propName}" should include 'Colour' or 'Color' in name`,
                    line: index + 1,
                    suggestion: `Consider "${propName}Colour" or "${propName}Color"`
                });
            }
        }
    });
}

function validateTypeScriptInterface(content: string, componentName: string, issues: ValidationIssue[]): void {
    // Check if interface extends CommonAndHTMLProps
    if (!content.includes('CommonAndHTMLProps')) {
        issues.push({
            type: "error",
            category: "typescript",
            message: `${componentName}Props interface should extend CommonAndHTMLProps`,
            suggestion: `interface ${componentName}Props extends CommonAndHTMLProps {`
        });
    }
    
    // Check if props interface exists
    const interfaceRegex = new RegExp(`interface\\s+${componentName}Props`);
    if (!interfaceRegex.test(content)) {
        issues.push({
            type: "error",
            category: "typescript",
            message: `Missing ${componentName}Props interface`,
            suggestion: `Add: interface ${componentName}Props extends CommonAndHTMLProps { ... }`
        });
    }
    
    // Check for proper export
    if (!content.includes(`export { ${componentName} }`)) {
        issues.push({
            type: "warning",
            category: "typescript",
            message: `Component ${componentName} should be properly exported`,
            suggestion: `Add: export { ${componentName} };`
        });
    }
}

async function validateCSSVariables(filePath: string, componentName: string, issues: ValidationIssue[]): Promise<void> {
    try {
        const cssPath = filePath.replace('.tsx', '.css');
        const cssContent = await readFile(cssPath, 'utf-8');
        
        // Check for component-scoped CSS variables
        const expectedPrefix = `--${componentName.toLowerCase()}-`;
        const variableMatches = cssContent.match(/--[\w-]+/g);
        
        if (variableMatches) {
            variableMatches.forEach(variable => {
                if (!variable.startsWith(expectedPrefix) && !variable.startsWith('--ff-')) {
                    issues.push({
                        type: "warning",
                        category: "css",
                        message: `CSS variable "${variable}" should be prefixed with "${expectedPrefix}" or "--ff-"`,
                        suggestion: `Use ${expectedPrefix}${variable.replace('--', '')}`
                    });
                }
            });
        }
        
        // Check for state variations
        const stateVariables = ['default', 'hover', 'active', 'focus', 'disabled'];
        const hasStateVariations = stateVariables.some(state => 
            cssContent.includes(`${expectedPrefix}${state}`)
        );
        
        if (!hasStateVariations) {
            issues.push({
                type: "suggestion",
                category: "css",
                message: "Consider adding CSS variables for different states (hover, active, focus, disabled)",
                suggestion: `Add variables like ${expectedPrefix}hover-bg, ${expectedPrefix}active-color, etc.`
            });
        }
        
    } catch (error) {
        // CSS file doesn't exist, which might be okay
    }
}

function validateResponsiveProps(content: string, issues: ValidationIssue[]): void {
    // Check if responsive props are properly documented
    const hasResponsiveComment = content.includes('responsive') || content.includes('Responsive');
    const hasCommonAndHTMLProps = content.includes('CommonAndHTMLProps');
    
    if (hasCommonAndHTMLProps && !hasResponsiveComment) {
        issues.push({
            type: "suggestion",
            category: "props",
            message: "Consider adding comment about inherited responsive props from CommonAndHTMLProps",
            suggestion: "Add comment: // Responsive props inherited from CommonAndHTMLProps"
        });
    }
}

function validateAccessibility(content: string, issues: ValidationIssue[]): void {
    const lines = content.split('\n');
    
    lines.forEach((line, index) => {
        // Check for disabled state accessibility
        if (line.includes('isDisabled') && line.includes('true')) {
            const hasAriaDisabled = content.includes('aria-disabled');
            const hasTabIndex = content.includes('tabIndex');
            
            if (!hasAriaDisabled) {
                issues.push({
                    type: "warning",
                    category: "accessibility",
                    message: "Disabled state should include aria-disabled attribute",
                    line: index + 1,
                    suggestion: 'Add: aria-disabled={isDisabled}'
                });
            }
            
            if (!hasTabIndex) {
                issues.push({
                    type: "suggestion",
                    category: "accessibility",
                    message: "Consider adding tabIndex={-1} for disabled interactive elements",
                    line: index + 1,
                    suggestion: 'Add: tabIndex={isDisabled ? -1 : undefined}'
                });
            }
        }
        
        // Check for interactive elements without proper roles
        if (line.includes('onClick') && !content.includes('role=') && !line.includes('<button')) {
            issues.push({
                type: "warning",
                category: "accessibility",
                message: "Interactive elements should have proper ARIA roles",
                line: index + 1,
                suggestion: 'Add: role="button" or use semantic HTML elements'
            });
        }
    });
}

function validateForwardRef(content: string, componentName: string, issues: ValidationIssue[]): void {
    if (!content.includes('forwardRef')) {
        issues.push({
            type: "warning",
            category: "forwardRef",
            message: `${componentName} should use forwardRef for better ref forwarding`,
            suggestion: `Wrap component with forwardRef: forwardRef<HTMLElement, ${componentName}Props>(...)`
        });
    }
    
    // Check for proper ref typing
    if (content.includes('forwardRef') && !content.includes('HTMLElement')) {
        issues.push({
            type: "suggestion",
            category: "forwardRef",
            message: "ForwardRef should specify proper HTML element type",
            suggestion: "Use specific HTML element type like HTMLButtonElement, HTMLDivElement, etc."
        });
    }
}

function validateStrictPatterns(content: string, componentName: string, issues: ValidationIssue[]): void {
    // Strict validation rules
    
    // Check for consistent indentation
    const lines = content.split('\n');
    let inconsistentIndentation = false;
    lines.forEach((line, index) => {
        if (line.trim() && line.startsWith('  ') && line.startsWith('    ')) {
            // Mixed spaces and tabs
            inconsistentIndentation = true;
        }
    });
    
    if (inconsistentIndentation) {
        issues.push({
            type: "error",
            category: "typescript",
            message: "Inconsistent indentation detected",
            suggestion: "Use consistent 4-space indentation throughout the file"
        });
    }
    
    // Check for proper JSDoc comments
    if (!content.includes('/**') && !content.includes('//')) {
        issues.push({
            type: "suggestion",
            category: "typescript",
            message: "Consider adding JSDoc comments for better documentation",
            suggestion: "Add /** Component description */ above the component"
        });
    }
    
    // Check for default props patterns
    if (content.includes('defaultProps')) {
        issues.push({
            type: "warning",
            category: "typescript",
            message: "defaultProps is deprecated in favor of default parameters",
            suggestion: "Use default parameters in destructuring instead of defaultProps"
        });
    }
}

function calculateScore(issues: ValidationIssue[]): number {
    let score = 100;
    
    issues.forEach(issue => {
        switch (issue.type) {
            case 'error':
                score -= 15;
                break;
            case 'warning':
                score -= 5;
                break;
            case 'suggestion':
                score -= 1;
                break;
        }
    });
    
    return Math.max(0, score);
}

function generateValidationReport(results: ValidationResult[], strict: boolean): string {
    if (results.length === 0) {
        return "No components found to validate.";
    }
    
    let report = `# Fictoan Pattern Validation Report\n\n`;
    report += `**Validation Mode**: ${strict ? 'Strict' : 'Standard'}\n`;
    report += `**Components Validated**: ${results.length}\n\n`;
    
    // Summary statistics
    const totalIssues = results.reduce((sum, result) => sum + result.issues.length, 0);
    const averageScore = results.reduce((sum, result) => sum + result.score, 0) / results.length;
    const errorCount = results.reduce((sum, result) => 
        sum + result.issues.filter(i => i.type === 'error').length, 0);
    const warningCount = results.reduce((sum, result) => 
        sum + result.issues.filter(i => i.type === 'warning').length, 0);
    const suggestionCount = results.reduce((sum, result) => 
        sum + result.issues.filter(i => i.type === 'suggestion').length, 0);
    
    report += `## Summary\n`;
    report += `- **Average Score**: ${averageScore.toFixed(1)}/100\n`;
    report += `- **Total Issues**: ${totalIssues}\n`;
    report += `  - ❌ Errors: ${errorCount}\n`;
    report += `  - ⚠️ Warnings: ${warningCount}\n`;
    report += `  - 💡 Suggestions: ${suggestionCount}\n\n`;
    
    // Sort results by score (worst first)
    results.sort((a, b) => a.score - b.score);
    
    // Detailed results
    results.forEach(result => {
        const scoreEmoji = result.score >= 90 ? '✅' : result.score >= 70 ? '⚠️' : '❌';
        
        report += `## ${scoreEmoji} ${result.component} (Score: ${result.score}/100)\n\n`;
        
        if (result.issues.length === 0) {
            report += `✅ No issues found!\n\n`;
        } else {
            // Group issues by category
            const categories = [...new Set(result.issues.map(i => i.category))];
            
            categories.forEach(category => {
                const categoryIssues = result.issues.filter(i => i.category === category);
                report += `### ${category.charAt(0).toUpperCase() + category.slice(1)} Issues\n\n`;
                
                categoryIssues.forEach(issue => {
                    const emoji = issue.type === 'error' ? '❌' : issue.type === 'warning' ? '⚠️' : '💡';
                    report += `${emoji} **${issue.type.toUpperCase()}**: ${issue.message}`;
                    if (issue.line) {
                        report += ` (Line ${issue.line})`;
                    }
                    report += `\n`;
                    if (issue.suggestion) {
                        report += `   *Suggestion: ${issue.suggestion}*\n`;
                    }
                    report += `\n`;
                });
            });
        }
        
        report += `---\n\n`;
    });
    
    // Recommendations
    if (totalIssues > 0) {
        report += `## Recommendations\n\n`;
        
        if (errorCount > 0) {
            report += `🔴 **Critical**: Fix ${errorCount} error(s) immediately - these may cause build failures or runtime issues.\n\n`;
        }
        
        if (warningCount > 0) {
            report += `🟡 **Important**: Address ${warningCount} warning(s) to improve code quality and maintainability.\n\n`;
        }
        
        if (suggestionCount > 0) {
            report += `🔵 **Optional**: Consider ${suggestionCount} suggestion(s) to enhance code consistency and best practices.\n\n`;
        }
        
        report += `### General Improvements\n`;
        report += `- Ensure all components extend \`CommonAndHTMLProps\`\n`;
        report += `- Use descriptive boolean prop names (is/has/show/etc.)\n`;
        report += `- Follow Fictoan CSS variable naming conventions\n`;
        report += `- Include proper accessibility attributes\n`;
        report += `- Use forwardRef for better ref handling\n`;
    }
    
    return report;
}