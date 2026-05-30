// REACT CORE ==========================================================================================================
import React from "react";

// UI ==================================================================================================================
import { Text } from "fictoan-react";

// The package.json subpath is whitelisted in fictoan-react's exports field
// so this resolves cleanly under bundler module resolution.
import { version as VERSION } from "fictoan-react/package.json";

export const VersionBadge = () => {
    return (
        <Text weight="600" marginRight="micro">
            v{VERSION}
        </Text>
    );
};
