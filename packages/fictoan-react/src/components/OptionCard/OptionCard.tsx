// FRAMEWORK ===========================================================================================================
import React, { createContext, useContext, useState, ReactNode, useCallback, useRef, useEffect } from "react";

// FICTOAN =============================================================================================================
import { Element } from "$element";
import { Div } from "$tags";
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
    defaultSelectedIds      ? : Set<string>;  // Uncontrolled mode - initial selection
    selectedIds             ? : Set<string>;  // Controlled mode - external state
}

export interface OptionCardProps extends CardProps {
    id         : string;
    children   : ReactNode;
    disabled ? : boolean;
}

export interface OptionCardsGroupRef {
    selectAll     : () => void;
    selectNone    : () => void;
    selectInverse : () => void;
}

interface OptionCardsContextType {
    isSelected       : (id: string) => boolean;
    toggleSelection  : (id: string) => void;
    showTickIcon   ? : boolean;
    tickPosition   ? : TickPosition;
    selectAll      ? : () => void;
    selectNone     ? : () => void;
    selectInverse  ? : () => void;
    registerOption   : (id: string, disabled: boolean) => void;
    unregisterOption : (id: string) => void;
}

const OptionCardsContext = createContext<OptionCardsContextType>({
    isSelected       : () => false,
    toggleSelection  : () => {},
    showTickIcon     : false,
    tickPosition     : "top-right",
    selectAll        : () => {},
    selectNone       : () => {},
    selectInverse    : () => {},
    registerOption   : () => {},
    unregisterOption : () => {},
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
            selectedIds: selectedIdsProp,
            ...props
        },
        ref
    ) => {
        // Determine if controlled or uncontrolled mode
        const isControlled = selectedIdsProp !== undefined;

        // Internal state for uncontrolled mode only
        const [internalSelectedIds, setInternalSelectedIds] = useState<Set<string>>(
            defaultSelectedIds ? new Set(defaultSelectedIds) : new Set()
        );
        const availableOptionsRef = useRef<Map<string, boolean>>(new Map()); // id -> disabled

        // Use controlled value if provided, otherwise use internal state
        const selectedIds = isControlled ? selectedIdsProp : internalSelectedIds;

        // Wrapper to update selection - in controlled mode, just call onSelectionChange
        const updateSelectedIds = useCallback((newIds: Set<string>) => {
            if (!isControlled) {
                setInternalSelectedIds(newIds);
            }
            onSelectionChange?.(newIds);
        }, [isControlled, onSelectionChange]);

        const registerOption = useCallback((id: string, disabled: boolean) => {
            availableOptionsRef.current.set(id, disabled);
        }, []);

        const unregisterOption = useCallback((id: string) => {
            availableOptionsRef.current.delete(id);
        }, []);

        // Click to toggle an option ===================================================================================
        const toggleSelection = useCallback((id: string) => {
            const newSelectedIds = new Set(selectedIds);
            if (allowMultipleSelections) {
                if (newSelectedIds.has(id)) {
                    newSelectedIds.delete(id);
                } else {
                    if (selectionLimit && newSelectedIds.size >= selectionLimit) {
                        return;
                    }
                    newSelectedIds.add(id);
                }
            } else {
                if (newSelectedIds.has(id) && selectedIds.size === 1) {
                    newSelectedIds.clear();
                } else {
                    newSelectedIds.clear();
                    newSelectedIds.add(id);
                }
            }
            updateSelectedIds(newSelectedIds);
        }, [selectedIds, allowMultipleSelections, selectionLimit, updateSelectedIds]);

        // Select all available options ================================================================================
        const selectAll = useCallback(() => {
            if (!allowMultipleSelections) return;

            // Get all enabled options
            const enabledOptions = Array.from(availableOptionsRef.current.entries())
                .filter(([_, disabled]) => !disabled)
                .map(([id]) => id);

            // Respect selection limit if set
            const optionsToSelect = selectionLimit
                ? enabledOptions.slice(0, selectionLimit)
                : enabledOptions;

            updateSelectedIds(new Set(optionsToSelect));
        }, [allowMultipleSelections, selectionLimit, updateSelectedIds]);

        // De-select all options =======================================================================================
        const selectNone = useCallback(() => {
            updateSelectedIds(new Set());
        }, [updateSelectedIds]);

        // Invert selection ============================================================================================
        const selectInverse = useCallback(() => {
            if (!allowMultipleSelections) return;

            // Get all enabled options
            const enabledOptions = Array.from(availableOptionsRef.current.entries())
                .filter(([_, disabled]) => !disabled)
                .map(([id]) => id);

            // Select options that are not currently selected
            const invertedSelection = enabledOptions.filter(id => !selectedIds.has(id));

            // Respect selection limit if set
            const optionsToSelect = selectionLimit
                ? invertedSelection.slice(0, selectionLimit)
                : invertedSelection;

            updateSelectedIds(new Set(optionsToSelect));
        }, [selectedIds, allowMultipleSelections, selectionLimit, updateSelectedIds]);

        const isSelected = useCallback((id: string) => {
            return selectedIds.has(id);
        }, [selectedIds]);

        // Expose methods via ref
        React.useImperativeHandle(ref, () => ({
            selectAll,
            selectNone,
            selectInverse,
        }), [selectAll, selectNone, selectInverse]);

        const contextValue = {
            isSelected,
            toggleSelection,
            showTickIcon,
            tickPosition,
            selectAll,
            selectNone,
            selectInverse,
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
OptionCardsGroup.displayName = "OptionCardsGroup";

export const useOptionCard = (id: string) => {
    const context = useContext(OptionCardsContext);
    return {
        isSelected      : context.isSelected(id),
        toggleSelection : () => context.toggleSelection(id),
        showTickIcon    : context.showTickIcon,
    };
};

export const useOptionCardsGroup = () => {
    const { selectAll, selectNone, selectInverse } = useContext(OptionCardsContext);
    return { selectAll, selectNone, selectInverse };
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
            aria-disabled={disabled}
            aria-selected={isSelected(id)}
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
