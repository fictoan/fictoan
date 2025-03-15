// FRAMEWORK ===========================================================================================================
import React, { createContext, useContext, useState, ReactNode, useCallback, useRef, useEffect } from "react";

// FICTOAN =============================================================================================================
import { Element } from "$element/Element";
import { Div } from "$element/Tags";
import { Card, CardElementType, CardProps } from "../Card/Card";

// STYLES ==============================================================================================================
import "./option-card.css";

// TYPES ===============================================================================================================
export type TickPosition =
    | "top-left"
    | "top-right"
    | "bottom-left"
    | "bottom-right"
    | "centre-left"
    | "center-left"
    | "centre-right"
    | "center-right"
    | "centre-top"
    | "center-top"
    | "center-bottom"
    | "centre-bottom"
    | "centre"
    | "center";

export interface OptionCardsProviderProps {
    children                  : ReactNode;
    allowMultipleSelections ? : boolean;
    showTickIcon            ? : boolean;
    tickPosition            ? : TickPosition;
    onSelectionChange       ? : (selectedIds: Set<string>) => void;
    selectionLimit          ? : number;
    defaultSelectedIds      ? : Set<string>;
}

export interface OptionCardProps extends CardProps {
    id         : string;
    children   : ReactNode;
    disabled ? : boolean;
}

export interface OptionCardsGroupRef {
    selectAllOptions   : () => void;
    clearAllOptions    : () => void;
    setSelectedOptions : (ids: string[]) => void;
    setSelectedIds     : (ids: Set<string>) => void;
}

interface OptionCardsContextType {
    isSelected           : (id: string) => boolean;
    toggleSelection      : (id: string) => void;
    showTickIcon       ? : boolean;
    tickPosition       ? : TickPosition;
    selectAllOptions   ? : () => void;
    clearAllOptions    ? : () => void;
    setSelectedOptions ? : (ids: string[]) => void;
    setSelectedIds     ? : (ids: Set<string>) => void;
    registerOption       : (id: string, disabled: boolean) => void;
    unregisterOption     : (id: string) => void;
}

const OptionCardsContext = createContext<OptionCardsContextType>({
    isSelected         : () => false,
    toggleSelection    : () => {},
    showTickIcon       : false,
    tickPosition       : "top-right",
    selectAllOptions   : () => {},
    clearAllOptions    : () => {},
    setSelectedOptions : () => {},
    setSelectedIds     : () => {},
    registerOption     : () => {},
    unregisterOption   : () => {},
});

// COMPONENT ///////////////////////////////////////////////////////////////////////////////////////////////////////////
export const OptionCardsGroup = React.forwardRef<OptionCardsGroupRef, OptionCardsProviderProps>(
    (
        {
            children,
            allowMultipleSelections = false,
            showTickIcon,
            onSelectionChange,
            tickPosition = "top-right",
            selectionLimit,
            defaultSelectedIds,
            ...props
        },
        ref
    ) => {
        // Initialize with defaultSelectedIds if provided
        const [selectedIds, setSelectedIds] = useState<Set<string>>(
            defaultSelectedIds ? new Set(defaultSelectedIds) : new Set()
        );
        const availableOptionsRef = useRef<Map<string, boolean>>(new Map()); // id -> disabled
        
        // Apply defaultSelectedIds if provided after mount or when it changes
        useEffect(() => {
            if (defaultSelectedIds && defaultSelectedIds.size > 0) {
                setSelectedIds(new Set(defaultSelectedIds));
                onSelectionChange?.(new Set(defaultSelectedIds));
            }
        }, [defaultSelectedIds, onSelectionChange]);

        const registerOption = useCallback((id: string, disabled: boolean) => {
            availableOptionsRef.current.set(id, disabled);
        }, []);

        const unregisterOption = useCallback((id: string) => {
            availableOptionsRef.current.delete(id);
        }, []);

        // Click to toggle an option ===================================================================================
        const toggleSelection = useCallback((id: string) => {
            setSelectedIds(prevSelectedIds => {
                const newSelectedIds = new Set(prevSelectedIds);
                if (allowMultipleSelections) {
                    if (newSelectedIds.has(id)) {
                        newSelectedIds.delete(id);
                    } else {
                        if (selectionLimit && newSelectedIds.size >= selectionLimit) {
                            return prevSelectedIds;
                        }
                        newSelectedIds.add(id);
                    }
                } else {
                    if (newSelectedIds.has(id) && prevSelectedIds.size === 1) {
                        newSelectedIds.clear();
                    } else {
                        newSelectedIds.clear();
                        newSelectedIds.add(id);
                    }
                }
                onSelectionChange?.(newSelectedIds);
                return newSelectedIds;
            });
        }, [allowMultipleSelections, onSelectionChange, selectionLimit]);

        // Select all available options ================================================================================
        const selectAllOptions = useCallback(() => {
            if (!allowMultipleSelections) return;

            setSelectedIds(prevSelectedIds => {
                const newSelectedIds = new Set(prevSelectedIds);

                // Get all enabled options
                const enabledOptions = Array.from(availableOptionsRef.current.entries())
                    .filter(([_, disabled]) => !disabled)
                    .map(([id]) => id);

                // Respect selection limit if set
                const optionsToAdd = selectionLimit
                    ? enabledOptions.slice(0, selectionLimit)
                    : enabledOptions;

                optionsToAdd.forEach(id => newSelectedIds.add(id));
                onSelectionChange?.(newSelectedIds);
                return newSelectedIds;
            });
        }, [allowMultipleSelections, selectionLimit, onSelectionChange]);

        // De-select all options =======================================================================================
        const clearAllOptions = useCallback(() => {
            setSelectedIds(new Set());
            onSelectionChange?.(new Set());
        }, [onSelectionChange]);

        // Set selected options - improved for more reliable state updates ==============================================
        const setSelectedOptions = useCallback((ids: string[]) => {
            if (ids) {
                console.log("Setting selected options:", ids);
                // Use functional update to ensure we're working with latest state
                setSelectedIds(() => {
                    const newSet = new Set(ids);
                    onSelectionChange?.(newSet);
                    return newSet;
                });
            }
        }, [onSelectionChange]);
        
        // Extra helper method to set using a Set directly
        const setSelectedIdSet = useCallback((ids: Set<string>) => {
            if (ids) {
                console.log("Setting selected ids:", Array.from(ids));
                setSelectedIds(() => {
                    const newSet = new Set(ids);
                    onSelectionChange?.(newSet);
                    return newSet;
                });
            }
        }, [onSelectionChange]);

        const isSelected = useCallback((id: string) => {
            return selectedIds.has(id);
        }, [selectedIds]);

        // Expose methods via ref
        React.useImperativeHandle(ref, () => ({
            selectAllOptions,
            clearAllOptions,
            setSelectedOptions,
            setSelectedIds: setSelectedIdSet
        }), [selectAllOptions, clearAllOptions, setSelectedOptions, setSelectedIdSet]);

        const contextValue = {
            isSelected,
            toggleSelection,
            showTickIcon,
            tickPosition,
            selectAllOptions,
            clearAllOptions,
            setSelectedOptions,
            setSelectedIds: setSelectedIdSet,
            registerOption,
            unregisterOption,
        };

        return (
            <OptionCardsContext.Provider value={contextValue}>
                <Div data-option-cards-group className={`tick-${tickPosition}`}>
                    {children}
                </Div>
            </OptionCardsContext.Provider>
        );
    }
);

export const useOptionCard = (id: string) => {
    const context = useContext(OptionCardsContext);
    return {
        isSelected      : context.isSelected(id),
        toggleSelection : () => context.toggleSelection(id),
        showTickIcon    : context.showTickIcon,
    };
};

export const useOptionCardsGroup = () => {
    const { 
        selectAllOptions, 
        clearAllOptions, 
        setSelectedOptions,
        setSelectedIds 
    } = useContext(OptionCardsContext);
    
    return { 
        selectAllOptions, 
        clearAllOptions, 
        setSelectedOptions,
        setSelectedIds 
    };
};

export const OptionCard: React.FC<OptionCardProps> = ({ id, children, disabled = false, ...props }) => {
    const { isSelected, toggleSelection, showTickIcon, registerOption, unregisterOption } = useContext(OptionCardsContext);
    const [showDeselect, setShowDeselect] = useState(false);
    const [isInitialHover, setIsInitialHover] = useState(true);

    // Register/unregister this option
    React.useEffect(() => {
        registerOption(id, disabled);
        return () => unregisterOption(id);
    }, [id, disabled, registerOption, unregisterOption]);

    let classNames = [];

    if (isSelected(id)) {
        classNames.push("selected");
    }

    if (disabled) {
        classNames.push("disabled");
    }

    if (showDeselect) {
        classNames.push("show-deselect");
    }

    const handleMouseEnter = () => {
        if (isSelected(id) && !isInitialHover) {
            setShowDeselect(true);
        }
    };

    const handleMouseLeave = () => {
        setShowDeselect(false);
        setIsInitialHover(false);
    };

    const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (!disabled) {
            setIsInitialHover(true);
            setShowDeselect(false);
            toggleSelection(id);
            props.onClick?.(e);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if ((e.key === "Enter" || e.key === " ") && !disabled) {
            e.preventDefault();
            setIsInitialHover(true);
            setShowDeselect(false);
            toggleSelection(id);
        }
    };

    return (
        <Element<CardElementType>
            as={Card}
            data-option-card
            role="button"
            tabIndex={disabled ? -1 : 0}
            aria-disabled={disabled ? "true" : "false"}
            aria-selected={isSelected(id) ? "true" : "false"}
            classNames={classNames}
            onClick={handleClick}
            onKeyDown={handleKeyDown}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            {...props}
        >
            {showTickIcon && (
                <>
                    <svg viewBox="0 0 24 24" className="tick-icon">
                        <circle cx="12" cy="12" r="11" />
                        <path d="M8 13 L11 15 L16 9" />
                    </svg>

                    <svg viewBox="0 0 24 24" className="deselect-icon">
                        <circle cx="12" cy="12" r="11" />
                        <path d="M8 8 L16 16 M16 8 L8 16" />
                    </svg>
                </>
            )}
            {children}
        </Element>
    );
};
