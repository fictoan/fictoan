"use client";

// EXTERNAL DEPS =======================================================================================================
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Fuse from "fuse.js";

// INTERNAL DEPS =======================================================================================================
import {
    Badge,
    Div,
    Header,
    Heading5,
    Text,
    InputField,
    Card,
    CodeBlock,
    Element,
    Modal,
    showModal,
    hideModal,
} from "fictoan-react";

// STYLES ==============================================================================================================
import "./search-bar.css";

// ASSETS ==============================================================================================================
import SearchIcon from "../../../assets/icons/search.svg";

// DATA ================================================================================================================
import { generateSearchIndex, searchConfig } from "./searchIndex";

export const SearchBar = () => {
    const router = useRouter();

    // SEARCH //////////////////////////////////////////////////////////////////////////////////////////////////////////
    const [searchTerm, setSearchTerm] = useState("");
    const [results, setResults] = useState([]);
    const [fuse, setFuse] = useState(null);
    const searchInputRef = useRef(null);
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const [copiedVariable, setCopiedVariable] = useState(null);

    // Initialize search ===============================================================================================
    useEffect(() => {
        const initSearch = async () => {
            const searchContent = await generateSearchIndex();
            setFuse(new Fuse(searchContent, searchConfig));
        };
        initSearch();
    }, []);

    // Reset selected index when search term changes
    useEffect(() => {
        setSelectedIndex(-1);
    }, [searchTerm]);

    const handleSearch = (value) => {
        setSearchTerm(value);
        if (!value.trim() || !fuse) {
            setResults([]);
            return;
        }
        const searchResults = fuse.search(value);
        setResults(searchResults.map(result => result.item));
    };

    // Create a flattened list of all results in display order
    const orderedResults = ["component", "theme"].reduce((acc, type) => {
        const groupResults = results.filter(result => result.type === type);
        return [...acc, ...groupResults];
    }, []);

    // Scroll selected item into view
    useEffect(() => {
        if (selectedIndex >= 0) {
            const selectedElement = document.querySelector(".search-result-item[data-selected=\"true\"]");
            if (selectedElement) {
                selectedElement.scrollIntoView({ block : "nearest", behavior : "smooth" });
            }
        }
    }, [selectedIndex]);

    // HANDLE KEYBOARD SHORTCUTS ///////////////////////////////////////////////////////////////////////////////////////
    // Open search modal when "/" is pressed
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === "/") {
                e.preventDefault();
                showModal("search-modal");
                searchInputRef.current?.focus();
            }
        };

        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, []);

    const handleSearchInputKeyDown = (e) => {
        // Only handle keyboard events when we have results
        if (orderedResults.length === 0) return;

        switch (e.key) {
            case "ArrowDown":
                e.preventDefault();
                setSelectedIndex(prev => 
                    prev < orderedResults.length - 1 ? prev + 1 : prev
                );
                break;

            case "ArrowUp":
                e.preventDefault();
                setSelectedIndex(prev => prev > 0 ? prev - 1 : prev);
                break;

            case "Enter":
                e.preventDefault();
                if (selectedIndex >= 0) {
                    const selectedResult = orderedResults[selectedIndex];
                    
                    if (selectedResult.type === "theme") {
                        // Copy theme variable to clipboard
                        const textToCopy = `${selectedResult.title}: ${selectedResult.value};`;
                        navigator.clipboard.writeText(textToCopy)
                            .then(() => {
                                setCopiedVariable(selectedResult.title);
                                setTimeout(() => {
                                    setCopiedVariable(null);
                                }, 300000);
                            })
                            .catch(err => {
                                console.error('Failed to copy text: ', err);
                            });
                    } else {
                        // Handle component navigation as before
                        router.push(selectedResult.path);
                        hideModal("search-modal");
                    }
                }
                break;

            case "Escape":
                hideModal("search-modal");
                break;

            default:
                break;
        }
    };

    // RESULT COMPONENTS ///////////////////////////////////////////////////////////////////////////////////////////////
    // Component result ================================================================================================
    const ComponentResult = ({ result, isSelected, onClick }) => (
        <Link href={result.path} onClick={onClick}>
            <Card
                className={`result-card result-component ${isSelected ? "highlighted" : null}`}
                padding="nano" shape="rounded"
            >
                {result.icon && (
                    <Element as={result.icon} className="result-icon" />
                )}
                <Div>
                    <Text weight="400">{result.title}</Text>
                    <Text weight="400" isSubtext>{result.description}</Text>
                </Div>
            </Card>
        </Link>
    );

    // Theme result ====================================================================================================
    const ThemeResult = ({ result, isSelected, onClick }) => (
        <Card
            className={`result-card result-theme ${isSelected ? "highlighted" : null}`}
            padding="nano" shape="rounded"
        >
            <CodeBlock withSyntaxHighlighting language="css">{result.title} : {result.value}</CodeBlock>
            {copiedVariable === result.title && (
                <Badge
                    className="copied-variable-confirmation"
                    size="small" bgColour="spring-light30" textColour="green-dark20"
                >
                    COPIED!
                </Badge>
            )}
        </Card>
    );

    // Search result item ==============================================================================================
    const SearchResultItem = ({ result, isSelected, onClick }) => {
        const ResultComponent = result.type === "component" ? ComponentResult : ThemeResult;

        return (
            <Div className="search-result-item" data-selected={isSelected}>
                <ResultComponent
                    result={result}
                    isSelected={isSelected}
                />
            </Div>
        );
    };

    return (
        <>
            {/* HEADER SEARCH INPUT ================================================================================ */}
            <Div
                showOnlyOnMobile showOnlyOnTabletPortrait
                onClick={() => showModal("search-modal")}
                role="button"
            >
                <SearchIcon id="header-search-icon" />
            </Div>

            <Div hideOnMobile hideOnTabletPortrait verticallyCentreItems>
                <InputField
                    id="header-search-input"
                    className="search-input"
                    type="search"
                    value={searchTerm}
                    onChange={(value) => handleSearch(value)}
                    placeholder="Search components and variables"
                    onClick={() => showModal("search-modal")}
                />

                <kbd>/</kbd>
            </Div>

            {/* SEARCH MODAL ======================================================================================= */}
            <Modal
                id="search-modal"
                shape="rounded"
                showBackdrop
                blurBackdrop
            >
                <Card shape="rounded">
                    <Header padding="micro">
                        <InputField
                            id="modal-search-input"
                            type="search"
                            ref={searchInputRef}
                            value={searchTerm}
                            onKeyDown={handleSearchInputKeyDown}
                            onChange={(value) => handleSearch(value)}
                            placeholder="Search components and CSS variables"
                        />
                    </Header>

                    <Div className="search-results" padding="micro">
                        {results.length > 0 ? (
                            <>
                                {/* Group results by type */}
                                {["component", "theme"].map(type => {
                                    const groupResults = results.filter(result => result.type === type);
                                    if (groupResults.length === 0) return null;

                                    return (
                                        <Div key={type} marginBottom="micro">
                                            <Header verticallyCentreItems pushItemsToEnds marginBottom="nano">
                                                <Text size="small" weight="600">
                                                    {type === "component" ? "COMPONENTS" : "THEME VARIABLES"}
                                                </Text>

                                                {type === "theme" && (
                                                    <Text size="small">Hit Enter to copy</Text>
                                                )}
                                            </Header>
                                            {groupResults.map((result) => {
                                                const resultIndex = orderedResults.findIndex(r => r === result);
                                                const isSelected = resultIndex === selectedIndex;

                                                return (
                                                    <SearchResultItem
                                                        key={result.title}
                                                        result={result}
                                                        isSelected={isSelected}
                                                        onClick={() => {
                                                            hideModal("search-modal");
                                                            setSearchTerm("");
                                                            setResults([]);
                                                        }}
                                                    />
                                                );
                                            })}
                                        </Div>
                                    );
                                })}
                            </>
                        ) : searchTerm && (
                            <Text textColour="red-light30">
                                Hm, nothing matching "{searchTerm}"—try something else?
                            </Text>
                        )}
                    </Div>
                </Card>
            </Modal>
        </>
    );
};
