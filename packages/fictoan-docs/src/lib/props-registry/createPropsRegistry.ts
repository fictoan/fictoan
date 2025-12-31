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
    if (!config.component) {
        throw new Error("PropsRegistry: component name is required");
    }

    // Normalize prop configs
    const normalizedProps: Record<string, PropConfig> = {};
    for (const [propName, propConfig] of Object.entries(config.props)) {
        normalizedProps[propName] = normalizePropConfig(propName, propConfig);
    }

    return {
        ...config,
        props: normalizedProps,
    };
}

// Get prop names in the order they appear in the registry
export function getOrderedPropNames(registry: PropsRegistryConfig): string[] {
    return Object.keys(registry.props);
}
