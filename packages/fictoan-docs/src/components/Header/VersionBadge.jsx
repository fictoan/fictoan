import React, { useState, useEffect } from "react";
import { Text } from "fictoan-react";

export const VersionBadge = () => {
    const [version, setVersion] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadVersion = async () => {
            try {
                const response = await fetch("https://registry.npmjs.org/fictoan-react/latest");
                const data = await response.json();
                setVersion(data.version);
            } catch (error) {
                console.error("Error fetching version:", error);
                // setVersion("v1.8.4"); // Fallback to current version
            } finally {
                setIsLoading(false);
            }
        };

        loadVersion();
    }, []);

    if (isLoading) {
        return (
            <Text weight="600" marginRight="micro">Loading...</Text>
        );
    }

    return (
        <Text weight="600" marginRight="micro">
            v{version}
        </Text>
    );
};
