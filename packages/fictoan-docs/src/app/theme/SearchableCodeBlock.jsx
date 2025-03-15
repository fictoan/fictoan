"use client";

import React, { useState } from "react";

import {
    InputField,
    Text,
    CodeBlock,
} from "fictoan-react";

export const SearchableCodeBlock = ({ source, language, ...props }) => {
    const [searchString, setSearchString] = useState("");
    const [filteredSource, setFilteredSource] = useState(source);
    const [matchCount, setMatchCount] = useState(0);

    const handleSearch = (value) => {
        const search = value.toLowerCase();
        setSearchString(search);

        if (!search) {
            setFilteredSource(source);
            setMatchCount(0);
            return;
        }

        const sourceLines = source.split("\n");
        let currentGroup = "";
        let groupedResults = {};
        let totalMatches = 0;

        sourceLines.forEach(line => {
            if (line.startsWith("/*") && line.endsWith("*/")) {
                currentGroup = line;
                groupedResults[currentGroup] = [];
            } else if (line.toLowerCase().includes(search)) {
                const formattedLine = line.replace(/\s*:\s*/g, " : ").trim();
                groupedResults[currentGroup].push(formattedLine);
                totalMatches++;
            }
        });

        const resultString = Object.entries(groupedResults)
            .filter(([group, lines]) => lines.length > 0)
            .map(([group, lines]) => `${group}\n${lines.join("\n")}`)
            .join("\n\n");

        setFilteredSource(resultString);
        setMatchCount(totalMatches);
    };

    return (
        <>
            <InputField
                type="text"
                value={searchString}
                onChange={handleSearch}
                placeholder="Search for a variable"
                marginBottom="micro"
            />

            {searchString && (
                <Text verticalMargin="nano">
                    Found {matchCount} result{matchCount !== 1 ? "s" : ""} for <code>{searchString}</code>
                </Text>
            )}

            <CodeBlock withSyntaxHighlighting source={filteredSource} language={language} {...props} />
        </>
    );
};
