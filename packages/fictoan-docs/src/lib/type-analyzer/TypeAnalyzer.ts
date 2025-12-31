export interface PropType {
    name : string;
}

export interface PropDefinition {
    defaultValue ? : { value: any } | null;
    description  ? : string;
    name           : string;
    required       : boolean;
    type           : PropType;
}

export interface ComponentMetadata {
    displayName : string;
    description : string;
    props       : { [key: string]: PropDefinition };
}

// Analyzes a component by calling the server-side API
export async function analyzeComponent(componentName: string): Promise<ComponentMetadata | null> {
    try {
        const response = await fetch(`/api/analyze-component?component=${componentName}`);
        
        if (!response.ok) {
            if (response.status === 404) {
                console.log(`Component ${componentName} not found or not supported`);
                return null;
            }
            throw new Error(`Failed to analyze component: ${response.statusText}`);
        }
        
        const metadata = await response.json();
        return metadata;
    } catch (error) {
        console.error('Error calling analyze API:', error);
        return null;
    }
}