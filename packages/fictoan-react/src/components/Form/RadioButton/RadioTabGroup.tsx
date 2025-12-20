// REACT CORE ==========================================================================================================
import React, { useMemo, useRef, useEffect, useState, useCallback } from "react";

// LOCAL COMPONENTS ====================================================================================================
import { Div } from "$tags";

// UTILS ===============================================================================================================
import { separateFictoanFromHTMLProps } from "$utils/propSeparation";

// INPUT ===============================================================================================================
import { BaseInputComponent } from "../BaseInputComponent/BaseInputComponent";
import type { BaseInputComponentWithIconProps } from "../BaseInputComponent/constants";

// STYLES ==============================================================================================================
import "./radio-tab-group.css";

// OTHER ===============================================================================================================
import {
    RadioTabGroupProps,
    RadioTabGroupInternalProps,
    RadioGroupProps,
    RadioButtonElementType,
} from "./constants";

interface IndicatorPosition {
        width     : number;
        transform : string;
}

/**
 * Extended props interface for RadioTabGroupOptions component
 * Includes internal props for scroll measurement and DOM ref management
 */
interface ExtendedRadioGroupProps extends Omit<RadioGroupProps, "as"> {
    onMeasure         : (needsScroll: boolean, maxScroll: number) => void;
    optionsWrapperRef : React.RefObject<HTMLDivElement>;
}

/**
 * Internal component that renders the radio tab options with scrolling support
 * Manages the sliding indicator animation and horizontal scroll buttons
 *
 * @internal
 */
const RadioTabGroupOptions = (
    {
        id,
        name,
        options,
        defaultValue,
        value,
        required,
        onChange,
        onMeasure,
        optionsWrapperRef,
        ...props
    }: ExtendedRadioGroupProps) => {
    const derivedName                           = useMemo(() => name || id, [ name, id ]);

    const [ indicatorPos, setIndicatorPos ]     = useState<IndicatorPosition>({
        width     : 0,
        transform : "translateX(0)",
    });
    const [ needsScroll, setNeedsScroll ]       = useState(false);
    const [ scrollPosition, setScrollPosition ] = useState(0);
    const [ maxScroll, setMaxScroll ]           = useState(0);

    const labelsRef                             = useRef<(HTMLLabelElement | null)[]>([]);

    const measureWidths = useCallback(() => {
        if (!optionsWrapperRef.current) return;

        const wrapper      = optionsWrapperRef.current;
        const inputWrapper = wrapper.closest("[data-input-wrapper]");

        if (wrapper && inputWrapper) {
            const totalContentWidth = wrapper.scrollWidth;
            const availableWidth    = inputWrapper.clientWidth;
            const needsToScroll     = totalContentWidth > availableWidth;

            setNeedsScroll(needsToScroll);
            setMaxScroll(needsToScroll ? totalContentWidth - availableWidth : 0);
            onMeasure(needsToScroll, needsToScroll ? totalContentWidth - availableWidth : 0);
        }
    }, [ onMeasure ]);

    useEffect(() => {
        const wrapper = optionsWrapperRef.current;
        if (!wrapper) return;

        // Initial measurement
        measureWidths();

        // Set up observer for size changes
        const observer = new ResizeObserver(() => {
            measureWidths();
        });

        observer.observe(wrapper);
        if (wrapper.closest("[data-input-wrapper]")) {
            observer.observe(wrapper.closest("[data-input-wrapper]") as Element);
        }

        return () => observer.disconnect();
    }, [ measureWidths ]);

    // Update indicator position based on selected radio
    useEffect(() => {
        const selectedIndex = options.findIndex(option => option.value === value);
        if (selectedIndex >= 0) {
            const updateIndicator = () => {
                const label = labelsRef.current[selectedIndex];
                if (label) {
                    const width   = label.offsetWidth;
                    let transform = "translateX(0)";

                    if (selectedIndex > 0) {
                        const offset = labelsRef.current
                            .slice(0, selectedIndex)
                            .reduce((acc, label) => acc + (label?.offsetWidth || 0), 0);
                        transform    = `translateX(${offset}px)`;
                    }

                    setIndicatorPos({ width, transform });
                }
            };

            // Wait for fonts to load before measuring to get correct widths
            // This fixes initial render issue where fonts affect label width
            if (document.fonts && document.fonts.ready) {
                document.fonts.ready.then(() => {
                    // Double RAF to ensure layout is complete
                    requestAnimationFrame(() => {
                        requestAnimationFrame(updateIndicator);
                    });
                });
            } else {
                // Fallback for browsers without font loading API
                const timeoutId = setTimeout(updateIndicator, 100);
                return () => clearTimeout(timeoutId);
            }
        }
    }, [ value, options ]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (onChange) {
            onChange(e.target.value);
        }
    };

    const handleScroll = useCallback((direction: "left" | "right") => {
        const optionsWrapper = optionsWrapperRef.current;
        if (!optionsWrapper) return;

        const visibleWidth = optionsWrapper.clientWidth;
        // TODO: Scroll only a few options at a time, not straight to the end
        const scrollAmount = visibleWidth * 0.8;

        let newPosition = direction === "right"
            ? Math.min(scrollPosition + scrollAmount, maxScroll)
            : Math.max(scrollPosition - scrollAmount, 0);

        setScrollPosition(newPosition);

        requestAnimationFrame(() => {
            optionsWrapper.style.transform = `translateX(-${newPosition}px)`;
        });
    }, [ scrollPosition, maxScroll ]);

    const canScrollLeft  = scrollPosition > 0;
    const canScrollRight = scrollPosition < maxScroll;

    return (
        <Div data-radio-tab-group name={derivedName} required={required}>
            {/* LEFT SCROLL BUTTON ================================================================================= */}
            {needsScroll && canScrollLeft && (
                <Div
                    className="scroll-button left"
                    onClick={() => handleScroll("left")}
                >
                    <svg viewBox="0 0 24 24">
                        <polyline points="15 18 9 12 15 6" />
                    </svg>
                </Div>
            )}

            {/* RADIO OPTIONS ====================================================================================== */}
            <Div className="rtg-options-container">
                <Div
                    className="rtg-options-wrapper"
                    ref={optionsWrapperRef}
                >
                    {/* INDICATOR ---------------------------------------------------------------------------------- */}
                    <Div
                        className="indicator"
                        style={{
                            width     : `${indicatorPos.width}px`,
                            transform : indicatorPos.transform,
                        }}
                    />

                    {options.map((option, index) => {
                        const { id : optionId, ...optionProps } = option;
                        const finalId                           = optionId || `${id}-option-${index}`;

                        return (
                            <React.Fragment key={finalId}>
                                <input
                                    type="radio"
                                    {...props}
                                    {...optionProps}
                                    id={finalId}
                                    name={derivedName}
                                    checked={value === option.value}
                                    onChange={handleChange}
                                />
                                <label
                                    ref={el => labelsRef.current[index] = el}
                                    htmlFor={finalId}
                                >
                                    {option.label}
                                </label>
                            </React.Fragment>
                        );
                    })}
                </Div>

                {/* RIGHT SCROLL BUTTON ============================================================================ */}
                {needsScroll && canScrollRight && (
                    <Div
                        className="scroll-button right"
                        onClick={() => handleScroll("right")}
                    >
                        <svg viewBox="0 0 24 24">
                            <polyline points="9 6 15 12 9 18" />
                        </svg>
                    </Div>
                )}
            </Div>
        </Div>
    );
};

/**
 * RadioTabGroup - A tab-style radio button group with horizontal scrolling support
 *
 * A specialized radio button group that displays options as horizontal tabs with a sliding indicator.
 * Automatically handles overflow with scroll buttons and animates the active indicator to the selected tab.
 *
 * @component
 *
 * @example
 * ```tsx
 * // Controlled usage
 * const [selectedTab, setSelectedTab] = useState("option1");
 *
 * <RadioTabGroup
 *   name="preferences"
 *   size="medium"
 *   options={[
 *     { id: "opt1", label: "Option 1", value: "option1" },
 *     { id: "opt2", label: "Option 2", value: "option2" },
 *     { id: "opt3", label: "Option 3", value: "option3" },
 *   ]}
 *   value={selectedTab}
 *   onChange={setSelectedTab}
 *   label="Choose your preference"
 *   helpText="Select the option that best fits your needs"
 * />
 * ```
 *
 * @example
 * ```tsx
 * // Uncontrolled usage
 * <RadioTabGroup
 *   name="settings"
 *   defaultValue="medium"
 *   options={[
 *     { id: "s1", label: "Small", value: "small" },
 *     { id: "s2", label: "Medium", value: "medium" },
 *     { id: "s3", label: "Large", value: "large" },
 *   ]}
 * />
 * ```
 */
export const RadioTabGroup = React.forwardRef<HTMLDivElement, RadioTabGroupProps>(
    ({ size = "medium", ...props }, ref) => {
        const optionsWrapperRef = useRef<HTMLDivElement>(null);

        // Callback for measuring scroll state - handled internally by RadioTabGroupOptions
        const handleMeasure = useCallback(() => {
            // Measurement logic is handled within RadioTabGroupOptions component
        }, []);

        // Separate Fictoan-specific props for class generation
        const { fictoanProps } = separateFictoanFromHTMLProps({ size, ...props });

        const classNames: string[] = [];
        if (fictoanProps.size) {
            classNames.push(`size-${fictoanProps.size}`);
        }

        /**
         * Suppressing type error for internal props (onMeasure, optionsWrapperRef).
         *
         * ARCHITECTURAL EXPLANATION:
         * BaseInputComponent uses separateFictoanFromHTMLProps() to split incoming props into:
         * - fictoanProps: Framework-specific props (margins, colors, etc.)
         * - htmlProps: Everything else, passed to the wrapped component
         *
         * The internal props (onMeasure, optionsWrapperRef) are intentionally passed through htmlProps
         * to RadioTabGroupOptions. This works correctly at runtime but TypeScript cannot infer that
         * BaseInputComponent forwards arbitrary props to the component specified by the `as` prop.
         *
         * NOTE ON onChange:
         * As of v2.0, onChange is standardized to be value-based throughout Fictoan.
         * BaseInputComponent extracts the value from events and calls onChange(value).
         * This is the modern component library approach (Chakra UI, MUI, Radix UI).
         *
         * ALTERNATIVES CONSIDERED:
         * 1. Making BaseInputComponent fully generic with <K, ExtraProps> - Creates excessive type
         *    complexity (TS2859) and doesn't match the component's polymorphic nature
         * 2. Type assertion with 'as any' - Less clear about which props are problematic
         * 3. Creating a RadioTabGroup-specific wrapper - Unnecessary duplication
         *
         * CONCLUSION:
         * @ts-expect-error is the pragmatic solution used by many libraries (Radix UI, Chakra UI)
         * for complex prop forwarding patterns where TypeScript's type system limitations
         * prevent proper inference.
         */
        return (
            <BaseInputComponent<RadioButtonElementType>
                as={RadioTabGroupOptions}
                ref={ref}
                classNames={classNames}
                bgColour={props.bgColour}
                // @ts-expect-error - Internal props passed to wrapped component via htmlProps spread
                onMeasure={handleMeasure}
                optionsWrapperRef={optionsWrapperRef}
                size={size}
                {...props}
            />
        );
    },
);
RadioTabGroup.displayName = "RadioTabGroup";
