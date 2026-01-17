"use client";

// REACT CORE ==========================================================================================================
import Link from "next/link";
import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

// UI ==================================================================================================================
import { Badge, Div, Header, Text, InputField, Card, CodeBlock, Element, Modal } from "fictoan-react";

// ASSETS ==============================================================================================================
import SearchIcon from "../../../assets/icons/search.svg";

// STYLES ==============================================================================================================
import "./search-bar.css";

// OTHER ===============================================================================================================
import Fuse from "fuse.js";
import { generateSearchIndex, searchConfig } from "./searchIndex";

interface SearchResult {
    title         : string;
    description ? : string;
    type          : string;
    path          : string;
    icon        ? : React.ComponentType;
    value       ? : string;
}

interface ComponentResultProps {
    result     : SearchResult;
    isSelected : boolean;
    onClick    : () => void;
}

interface ThemeResultProps {
    result     : SearchResult;
    isSelected : boolean;
    onClick    : () => void;
}

interface SearchResultItemProps {
    result     : SearchResult;
    isSelected : boolean;
    onClick    : () => void;
}

export const SearchBar = () => {
    const router = useRouter();

    // MODAL STATE /////////////////////////////////////////////////////////////////////////////////////////////////////
    const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);

    // SEARCH //////////////////////////////////////////////////////////////////////////////////////////////////////////
    const [ searchTerm, setSearchTerm ] = useState("");
    const [ results, setResults ] = useState<SearchResult[]>([]);
    const [ fuse, setFuse ] = useState<any>(null);
    const [ selectedIndex, setSelectedIndex ] = useState(-1);
    const [ copiedVariable, setCopiedVariable ] = useState<string | null>(null);
    const searchInputRef = useRef<HTMLInputElement>(null);

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
    }, [ searchTerm ]);

    // Focus input when modal opens
    useEffect(() => {
        if (isSearchModalOpen) {
            // Small delay to ensure modal is rendered
            setTimeout(() => {
                searchInputRef.current?.focus();
            }, 100);
        }
    }, [isSearchModalOpen]);

    const handleSearch = (value : string) => {
        setSearchTerm(value);
        if (!value.trim() || !fuse) {
            setResults([]);
            return;
        }
        const searchResults = fuse.search(value);
        setResults(searchResults.map((result : { item : SearchResult; }) => result.item));
    };

    // Create a flattened list of all results in display order
    const orderedResults = [ "component", "theme" ].reduce<SearchResult[]>((acc, type) => {
        const groupResults = results.filter(result => result.type === type);
        return [ ...acc, ...groupResults ];
    }, []);

    // Scroll selected item into view
    useEffect(() => {
        if (selectedIndex >= 0) {
            const selectedElement = document.querySelector(".search-result-item[data-selected=\"true\"]");
            if (selectedElement) {
                selectedElement.scrollIntoView({block : "nearest", behavior : "smooth"});
            }
        }
    }, [ selectedIndex ]);

    // HANDLE KEYBOARD SHORTCUTS ///////////////////////////////////////////////////////////////////////////////////////
    // Open search modal when "/" is pressed (but not when typing in an input)
    useEffect(() => {
        const handleKeyDown = (e : KeyboardEvent) => {
            // Don't trigger if user is typing in an input, textarea, or contenteditable
            const activeElement = document.activeElement;
            const isTyping = activeElement instanceof HTMLInputElement ||
                             activeElement instanceof HTMLTextAreaElement ||
                             activeElement?.getAttribute("contenteditable") === "true";

            if (e.key === "/" && !isTyping) {
                e.preventDefault();
                setIsSearchModalOpen(true);
            }
        };

        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, []);

    const handleSearchInputKeyDown = (e : React.KeyboardEvent<HTMLInputElement>) => {
        // Only handle keyboard events when we have results
        if (orderedResults.length === 0) return;

        switch (e.key) {
            case "ArrowDown":
                e.preventDefault();
                setSelectedIndex(prev =>
                    prev < orderedResults.length - 1 ? prev + 1 : prev,
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
                            console.error("Failed to copy text: ", err);
                        });
                    } else {
                        // Handle component navigation as before
                        router.push(selectedResult.path);
                        setIsSearchModalOpen(false);
                    }
                }
                break;

            case "Escape":
                setIsSearchModalOpen(false);
                break;

            default:
                break;
        }
    };

    // RESULT COMPONENTS ///////////////////////////////////////////////////////////////////////////////////////////////
    const ComponentResult = ({result, isSelected, onClick} : ComponentResultProps) => (
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

    const ThemeResult = ({result, isSelected, onClick} : ThemeResultProps) => (
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

    const SearchResultItem = ({result, isSelected, onClick} : SearchResultItemProps) => {
        const ResultComponent = result.type === "component" ? ComponentResult : ThemeResult;

        return (
            <Div className="search-result-item" data-selected={isSelected}>
                <ResultComponent
                    result={result}
                    isSelected={isSelected}
                    onClick={onClick}
                />
            </Div>
        );
    };

    const closeModal = () => {
        setIsSearchModalOpen(false);
        setSearchTerm("");
        setResults([]);
    };

    return (
        <>
            {/* HEADER SEARCH INPUT ================================================================================ */}
            <Div
                showOnlyOnMobile showOnlyOnTabletPortrait
                onClick={() => setIsSearchModalOpen(true)}
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
                    onChange={(value : string) => handleSearch(value)}
                    placeholder="Search components and variables"
                    onClick={() => setIsSearchModalOpen(true)}
                />

                <kbd>/</kbd>
            </Div>

            {/* SEARCH MODAL ======================================================================================= */}
            <Modal
                id="search-modal"
                isOpen={isSearchModalOpen}
                onClose={closeModal}
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
                            onChange={(value : string) => handleSearch(value)}
                            placeholder="Search components and CSS variables"
                        />
                    </Header>

                    <Div className="search-results" padding="micro">
                        {results.length > 0 ? (
                            <>
                                {/* Group results by type */}
                                {[ "component", "theme" ].map(type => {
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
                                                        onClick={closeModal}
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
