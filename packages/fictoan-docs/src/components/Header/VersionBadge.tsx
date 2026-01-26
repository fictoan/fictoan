// REACT CORE ==========================================================================================================
import React from "react";

// UI ==================================================================================================================
import { Text } from "fictoan-react";

const VERSION = "2.0.0-beta.6";

export const VersionBadge = () => {
    return (
        <Text weight="600" marginRight="micro">
            v{VERSION}
        </Text>
    );
};
