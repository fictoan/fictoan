// CREATE PROPS REGISTRY ===============================================================================================
// Factory function to create a props registry with validation and defaults

import {
    PropsRegistryConfig,
    PropConfig,
    PropOption,
} from "./types";

// Normalize options to PropOption format
function normalizeOptions(options: PropOption[] | string[] | undefined): PropOption[] | undefined {
    if (!options) return undefined;

    return options.map((opt) => {
        if (typeof opt === "string") {
            return { value: opt, label: opt };
        }
        return opt;
    });
}

// Validate and normalize a prop config
function normalizePropConfig(propName: string, config: PropConfig): PropConfig {
    return {
        ...config,
        label: config.label || propName,
        options: normalizeOptions(config.options),
    };
}

// Create the registry with validation
export function createPropsRegistry(config: PropsRegistryConfig): PropsRegistryConfig {
    // Validate required fields
    if (!config.component) {
        throw new Error("PropsRegistry: component name is required");
    }

    // Normalize prop configs
    const normalizedProps: Record<string, PropConfig> = {};
    if (config.props) {
        for (const [propName, propConfig] of Object.entries(config.props)) {
            normalizedProps[propName] = normalizePropConfig(propName, propConfig);
        }
    }

    // Build the normalized registry
    const registry: PropsRegistryConfig = {
        ...config,
        props: normalizedProps,
        demo: {
            hasChildren: false,
            ...config.demo,
        },
    };

    return registry;
}

// Helper to check if a prop should be visible
export function isPropVisible(
    propName: string,
    registry: PropsRegistryConfig,
    inheritedPropNames: string[] = []
): boolean {
    // Check if explicitly hidden
    if (registry.props?.[propName]?.hidden) {
        return false;
    }

    // Check inherited prop visibility
    const isInherited = inheritedPropNames.includes(propName);
    if (isInherited) {
        if (registry.hideInheritedProps) {
            // Hidden unless explicitly shown
            return registry.showInheritedProps?.includes(propName) ?? false;
        }
    }

    return true;
}

// Get ordered list of prop names
export function getOrderedPropNames(
    allPropNames: string[],
    registry: PropsRegistryConfig
): string[] {
    const orderedProps: string[] = [];
    const remainingProps = new Set(allPropNames);

    // First, add props in the specified order
    if (registry.propOrder) {
        for (const propName of registry.propOrder) {
            if (remainingProps.has(propName)) {
                orderedProps.push(propName);
                remainingProps.delete(propName);
            }
        }
    }

    // Then, add remaining props alphabetically
    const sortedRemaining = Array.from(remainingProps).sort();
    orderedProps.push(...sortedRemaining);

    return orderedProps;
}
