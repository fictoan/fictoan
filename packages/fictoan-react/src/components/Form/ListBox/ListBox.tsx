// REACT CORE ==========================================================================================================
import React, { useState, useRef, useEffect, MutableRefObject, KeyboardEvent } from "react";

// LOCAL COMPONENTS ====================================================================================================
import { Div } from "$tags";
import { Element } from "$element";

// HOOKS ===============================================================================================================
import { useClickOutside } from "$hooks/UseClickOutside";

// UTILS ===============================================================================================================
import { separateWrapperProps } from "$utils/propSeparation";

// STYLES ==============================================================================================================
import "./list-box.css";

// OTHER ===============================================================================================================
import { Badge } from "../../Badge/Badge";
import { FormItem, deriveAriaIds } from "../FormItem/FormItem";
import { InputField } from "../InputField/InputField";
import { ListBoxProps, OptionForListBoxProps, ListBoxElementType, ListBoxCustomProps } from "./constants";
import { Text } from "../../Typography/Text";
import { searchOptions } from "./listBoxUtils";

// COMPONENT ///////////////////////////////////////////////////////////////////////////////////////////////////////////
export const ListBox = React.forwardRef<ListBoxElementType, ListBoxProps>(
    (
        {
            options = [],
            label,
            helpText,
            errorText,
            placeholder = "Select an option",
            id,
            defaultValue,
            onChange,
            disabled,
            selectionLimit,
            allowMultiSelect = false,
            allowCustomEntries = false,
            isLoading,
            value,
            isFullWidth,
            className,
            required,
            size,
            ...props
        },
        ref
    ) => {
        const [isOpen, setIsOpen] = useState(false);
        const [searchValue, setSearchValue] = useState("");
        const [activeIndex, setActiveIndex] = useState(-1);
        const [openUpward, setOpenUpward] = useState(false);

        // Create a memoized version of the combined options
        const allOptions = React.useMemo(() => {
            return [...options];
        }, [options]);

        // Map a value or array of values to the matching option objects.
        const resolveSelectedOptions = React.useCallback(
            (val : string | string[] | undefined, opts : OptionForListBoxProps[]) : OptionForListBoxProps[] => {
                if (val == null || val === "") return [];
                const values = Array.isArray(val) ? val : [val];
                return values
                    .map(v => opts.find(o => o.value === v))
                    .filter((o) : o is OptionForListBoxProps => o !== undefined);
            },
            [],
        );

        // Internal state for uncontrolled mode. Lazy init from defaultValue so the
        // displayed selection is correct on first paint — no spurious onChange fires.
        const isControlled = value !== undefined;
        const [internalSelectedOptions, setInternalSelectedOptions] = useState<OptionForListBoxProps[]>(
            () => resolveSelectedOptions(defaultValue, allOptions),
        );

        // The effective selection: controlled value takes precedence, otherwise internal state.
        const selectedOptions = isControlled
            ? resolveSelectedOptions(value, allOptions)
            : internalSelectedOptions;

        const setSelectedOptions = React.useCallback((next : OptionForListBoxProps[]) => {
            if (!isControlled) setInternalSelectedOptions(next);
        }, [ isControlled ]);

        // The list-box wrapper renders as a <div>, not a <select> — the prior
        // HTMLSelectElement typing was a pre-existing mistake that only got
        // caught when Element's ref type tightened.
        const dropdownRef = useRef<HTMLDivElement>(null) as MutableRefObject<HTMLDivElement>;
        const searchInputRef = useRef<HTMLInputElement>(null);
        const dropdownMenuRef = useRef<HTMLDivElement>(null);

        const reactId = React.useId();
        const listboxId = id || `listbox-${reactId.replace(/:/g, "")}`;
        const { describedBy } = deriveAriaIds(listboxId, helpText, errorText);
        const filteredOptions = searchOptions(allOptions, searchValue);
        const activeOptionId = activeIndex >= 0 && filteredOptions[activeIndex]
            ? `${listboxId}-option-${filteredOptions[activeIndex].value}`
            : undefined;

        const handleSelectOption = (option: OptionForListBoxProps) => {
            if (option.disabled) return;

            let newSelectedOptions: OptionForListBoxProps[];
            if (allowMultiSelect) {
                const isSelected = selectedOptions.some(opt => opt.value === option.value);
                if (isSelected) {
                    newSelectedOptions = selectedOptions.filter(opt => opt.value !== option.value);
                } else {
                    if (selectionLimit && selectedOptions.length >= selectionLimit) {
                        return;
                    }
                    newSelectedOptions = [...selectedOptions, option];
                }
                setSelectedOptions(newSelectedOptions);
                onChange?.(newSelectedOptions.map(opt => opt.value));
            } else {
                newSelectedOptions = [option];
                setSelectedOptions(newSelectedOptions);
                onChange?.(option.value);
                setIsOpen(false);
            }

            setSearchValue("");
            setActiveIndex(-1);
        };

        const handleSearchChange = (value: string) => {
            setSearchValue(value);
        };

        const handleCustomEntry = () => {
            if (!searchValue.trim() || !allowCustomEntries) return;

            const customValue = searchValue.trim();
            const customOption: OptionForListBoxProps = {
                value: customValue,
                label: customValue,
            };

            // If this option doesn't exist yet
            if (!allOptions.some(opt => opt.value === customValue)) {
                handleSelectOption(customOption);
            }
        };

        const handleDeleteOption = (valueToRemove: string) => {
            if (allowMultiSelect) {
                // Filter out the option to remove
                const newSelectedOptions = selectedOptions.filter(opt => opt.value !== valueToRemove);

                // Update local state
                setSelectedOptions(newSelectedOptions);

                // Notify parent
                onChange?.(newSelectedOptions.map(opt => opt.value));
            } else {
                // For single-select mode, just clear everything
                setSelectedOptions([]);
                onChange?.("");
            }
        };

        const handleClearAll = () => {
            // Reset local state for both single and multi-select
            setSelectedOptions([]);

            // Notify parent with empty data
            onChange?.(allowMultiSelect ? [] : "");
        };

        const handleKeyDown = (event: KeyboardEvent) => {
            switch (event.key) {
                case "ArrowDown":
                    event.preventDefault();
                    if (!isOpen) {
                        setIsOpen(true);
                        setActiveIndex(0);
                    } else {
                        setActiveIndex(prev =>
                            prev < filteredOptions.length - 1 ? prev + 1 : prev
                        );
                    }
                    break;

                case "ArrowUp":
                    event.preventDefault();
                    setActiveIndex(prev => prev > 0 ? prev - 1 : prev);
                    break;

                case "Enter":
                    event.preventDefault();
                    if (allowCustomEntries && searchValue.trim()) {
                        const exactMatch = filteredOptions.find(opt =>
                            opt.label.toLowerCase() === searchValue.trim().toLowerCase()
                        );
                        if (exactMatch) {
                            handleSelectOption(exactMatch);
                        } else {
                            handleCustomEntry();
                        }
                    } else if (activeIndex >= 0 && filteredOptions[activeIndex]) {
                        handleSelectOption(filteredOptions[activeIndex]);
                    }
                    break;

                case "Escape":
                    event.preventDefault();
                    setIsOpen(false);
                    setActiveIndex(-1);
                    break;

                case " ": // Space key
                    if (!isOpen) {
                        event.preventDefault();
                        setIsOpen(true);
                        setActiveIndex(0);
                    }
                    break;

                case "Home":
                    if (isOpen) {
                        event.preventDefault();
                        setActiveIndex(0);
                    }
                    break;

                case "End":
                    if (isOpen) {
                        event.preventDefault();
                        setActiveIndex(filteredOptions.length - 1);
                    }
                    break;
            }
        };

        // When CLOSED, the combobox div is the only focusable element — the search input
        // that carries handleKeyDown mounts only while open. Without this a keyboard-only
        // user can't open the ListBox. Guarded by !isOpen so it only handles opening;
        // once open, focus moves to the search input which takes over.
        const handleComboboxKeyDown = (event: KeyboardEvent) => {
            if (disabled || isOpen) return;
            if (event.key === "ArrowDown" || event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                setIsOpen(true);
                setActiveIndex(0);
            }
        };

        useClickOutside(dropdownRef, () => {
            setIsOpen(false);
            setActiveIndex(-1);
        });

        useEffect(() => {
            if (isOpen && searchInputRef.current) {
                searchInputRef.current.focus();
            }
        }, [isOpen]);

        // Determine if dropdown should open upward based on available viewport space
        useEffect(() => {
            if (isOpen && dropdownRef.current) {
                const wrapperRect = dropdownRef.current.getBoundingClientRect();
                const viewportHeight = window.innerHeight;
                // Estimate dropdown height (max-height is 240px for options + search + padding)
                const estimatedDropdownHeight = 300;
                const spaceBelow = viewportHeight - wrapperRect.bottom;
                const spaceAbove = wrapperRect.top;

                // Open upward if not enough space below but enough space above
                setOpenUpward(spaceBelow < estimatedDropdownHeight && spaceAbove > spaceBelow);
            } else {
                setOpenUpward(false);
            }
        }, [isOpen]);

        useEffect(() => {
            if (activeIndex >= 0) {
                const activeOption = document.querySelector(`[data-index="${activeIndex}"]`);
                activeOption?.scrollIntoView({ block: "nearest" });
            }
        }, [activeIndex]);

        // Separate wrapper-level props (margin, padding, etc.) from input-specific props
        const { wrapperProps, inputProps } = separateWrapperProps(props);

        return (
            <FormItem
                label={label}
                htmlFor={listboxId}
                helpText={helpText}
                errorText={errorText}
                required={required}
                isFullWidth={isFullWidth}
                size={size}
                {...wrapperProps}
            >
                {/* PARENT */}
                <Element
                    as="div"
                    data-list-box
                    classNames={["list-box-wrapper", disabled ? "disabled" : "", className || ""]}
                    ref={dropdownRef}
                    isFullWidth={isFullWidth}
                    {...inputProps}
                >
                    <Div
                        className="list-box-input-wrapper"
                        id={listboxId}
                        onClick={() => !disabled && setIsOpen(!isOpen)}
                        onKeyDown={handleComboboxKeyDown}
                        role="combobox"
                        // `htmlFor` on the visible <label> only names native controls, not a
                        // role="combobox" div — so give the combobox its own accessible name.
                        aria-label={label}
                        aria-haspopup="listbox"
                        aria-expanded={isOpen}
                        aria-controls={`${listboxId}-listbox`}
                        aria-invalid={Boolean(errorText) || undefined}
                        aria-required={required}
                        aria-describedby={describedBy}
                        aria-disabled={disabled || undefined}
                        tabIndex={disabled ? -1 : 0}
                    >
                        {allowMultiSelect ? (
                            <>
                                {selectedOptions.length > 0 ? (
                                    <Div className="options-wrapper">
                                        <Div className="options-list">
                                            {selectedOptions.map(option => (
                                                <Badge
                                                    key={option.value}
                                                    actionIcon="cross"
                                                    onActionClick={() => handleDeleteOption(option.value)}
                                                    actionAriaLabel={`Remove ${option.label}`}
                                                    size="small"
                                                    shape="rounded"
                                                >
                                                    <Text>{option.label}</Text>
                                                </Badge>
                                            ))}
                                        </Div>
                                        {selectionLimit && selectedOptions.length >= selectionLimit && (
                                            <Text className="options-limit-warning" textColour="red" size="tiny">
                                                You can choose only {selectionLimit} option{selectionLimit === 1 ? "" : "s"}
                                            </Text>
                                        )}
                                    </Div>
                                ) : (
                                    <span className="placeholder">{placeholder}</span>
                                )}

                                {/* Clear button for multi-select */}
                                {selectedOptions.length > 0 && (
                                    <Div
                                        className="icon-wrapper clear-all"
                                        title="Clear all options"
                                        onClick={() => handleClearAll()}
                                    >
                                        <svg viewBox="0 0 24 24">
                                            <line x1="5" y1="5" x2="19" y2="19" />
                                            <line x1="5" y1="19" x2="19" y2="5" />
                                        </svg>
                                    </Div>
                                )}
                            </>
                        ) : (
                            selectedOptions[0]
                                ? <Text className="selected-option">{selectedOptions[0].label}</Text>
                                : <span className="placeholder">{placeholder}</span>
                        )}

                        <Div className="icon-wrapper chevrons">
                            <svg viewBox="0 0 24 24" aria-hidden="true">
                                <polyline points="6 9 12 4 18 9"></polyline>
                                <polyline points="6 15 12 20 18 15"></polyline>
                            </svg>
                        </Div>
                    </Div>

                    {/* DROPDOWN */}
                    {isOpen && !disabled && (
                        <Div
                            ref={dropdownMenuRef}
                            className={`list-box-dropdown${openUpward ? " opens-upward" : ""}`}
                        >
                            <Div className="list-box-search-wrapper">
                                <InputField
                                    type="text"
                                    ref={searchInputRef}
                                    className="list-box-search"
                                    placeholder={allowCustomEntries ? "Type to search or add new" : "Search"}
                                    value={searchValue}
                                    onChange={handleSearchChange}
                                    onKeyDown={handleKeyDown}
                                    aria-controls={`${listboxId}-listbox`}
                                    aria-activedescendant={activeOptionId}
                                    aria-label="Search options"
                                    isFullWidth
                                />
                                {allowCustomEntries && searchValue.trim() && !selectedOptions.some(opt =>
                                    opt.label.toLowerCase() === searchValue.trim().toLowerCase()) && (
                                    <kbd
                                        className="list-box-enter-key"
                                        aria-label="Press Enter to add custom option"
                                    >
                                        ↵
                                    </kbd>
                                )}
                            </Div>

                            {/* OPTIONS */}
                            <Element
                                as="ul"
                                id={`${listboxId}-listbox`}
                                className="list-box-options"
                                role="listbox"
                                aria-multiselectable={allowMultiSelect}
                                aria-busy={isLoading}
                                tabIndex={-1}
                            >
                                {filteredOptions.length > 0 ? (
                                    filteredOptions.map((option, index) => (
                                        <li
                                            key={option.value}
                                            id={`${listboxId}-option-${option.value}`}
                                            className={`list-box-option ${option.disabled ? "disabled" : ""} ${activeIndex === index ? "active" : ""}`}
                                            role="option"
                                            aria-selected={selectedOptions.some(opt => opt.value === option.value)}
                                            aria-disabled={option.disabled}
                                            onClick={() => handleSelectOption(option)}
                                            data-index={index}
                                            tabIndex={-1}
                                        >
                                            {option.customLabel || option.label}
                                        </li>
                                    ))
                                ) : (
                                    <li
                                        className="list-box-option disabled"
                                        role="alert"
                                        aria-live="polite"
                                    >
                                        {allowCustomEntries
                                            ? "Type and press Enter to add new option"
                                            : "No matches found"
                                        }
                                    </li>
                                )}
                            </Element>
                        </Div>
                    )}
                </Element>
            </FormItem>
        );
    }
);
ListBox.displayName = "ListBox";
