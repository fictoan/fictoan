// REACT CORE ==========================================================================================================
import React, { useMemo, useRef, useEffect, useState, useCallback } from "react";

// LOCAL COMPONENTS ====================================================================================================
import { Div } from "$tags";
import { Element } from "$element";
import { FormItem } from "../FormItem/FormItem";
import { SpacingTypes } from "../../Element/constants";
import { separateWrapperProps } from "../../../utils/propSeparation";

// STYLES ==============================================================================================================
import "./radio-tab-group.css";

// OTHER ===============================================================================================================
import { RadioTabGroupProps, RadioButtonElementType } from "./constants";

interface IndicatorPosition {
    width: number;
    transform: string;
}

// COMPONENT ///////////////////////////////////////////////////////////////////////////////////////////////////////////
export const RadioTabGroup = React.forwardRef<HTMLDivElement, RadioTabGroupProps>(
    (
        {
            id,
            name,
            label,
            helpText,
            errorText,
            options,
            defaultValue,
            value,
            required,
            onChange,
            size = "medium",
            bgColour,
            disabled,
            ...props
        },
        ref
    ) => {
        const derivedName = useMemo(() => name || id, [name, id]);
        const optionsWrapperRef = useRef<HTMLDivElement>(null);

        const [indicatorPos, setIndicatorPos] = useState<IndicatorPosition>({
            width: 0,
            transform: "translateX(0)",
        });
        const [needsScroll, setNeedsScroll] = useState(false);
        const [scrollPosition, setScrollPosition] = useState(0);
        const [maxScroll, setMaxScroll] = useState(0);

        const labelsRef = useRef<(HTMLLabelElement | null)[]>([]);

        const measureWidths = useCallback(() => {
            if (!optionsWrapperRef.current) return;

            const wrapper = optionsWrapperRef.current;
            const inputWrapper = wrapper.closest("[data-input-wrapper]");

            if (wrapper && inputWrapper) {
                const totalContentWidth = wrapper.scrollWidth;
                const availableWidth = inputWrapper.clientWidth;
                const needsToScroll = totalContentWidth > availableWidth;

                setNeedsScroll(needsToScroll);
                setMaxScroll(needsToScroll ? totalContentWidth - availableWidth : 0);
            }
        }, []);

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
        }, [measureWidths]);

        // Update indicator position based on selected radio
        useEffect(() => {
            const selectedIndex = options.findIndex(option => option.value === value);
            if (selectedIndex >= 0) {
                const updateIndicator = () => {
                    const label = labelsRef.current[selectedIndex];
                    if (label) {
                        const width = label.offsetWidth;
                        let transform = "translateX(0)";

                        if (selectedIndex > 0) {
                            const offset = labelsRef.current
                                .slice(0, selectedIndex)
                                .reduce((acc, label) => acc + (label?.offsetWidth || 0), 0);
                            transform = `translateX(${offset}px)`;
                        }

                        setIndicatorPos({ width, transform });
                    }
                };

                // Wait for fonts to load before measuring to get correct widths
                if (document.fonts && document.fonts.ready) {
                    document.fonts.ready.then(() => {
                        requestAnimationFrame(() => {
                            requestAnimationFrame(updateIndicator);
                        });
                    });
                } else {
                    const timeoutId = setTimeout(updateIndicator, 100);
                    return () => clearTimeout(timeoutId);
                }
            }
        }, [value, options]);

        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            onChange?.(e.target.value);
        };

        // Separate wrapper-level props (margin, padding, etc.) from component-specific props
        const { wrapperProps, inputProps } = separateWrapperProps(props);

        const handleScroll = useCallback((direction: "left" | "right") => {
            const wrapper = optionsWrapperRef.current;
            if (!wrapper) return;

            const visibleWidth = wrapper.clientWidth;
            const scrollAmount = visibleWidth * 0.8;

            let newPosition = direction === "right"
                ? Math.min(scrollPosition + scrollAmount, maxScroll)
                : Math.max(scrollPosition - scrollAmount, 0);

            setScrollPosition(newPosition);

            requestAnimationFrame(() => {
                wrapper.style.transform = `translateX(-${newPosition}px)`;
            });
        }, [scrollPosition, maxScroll]);

        const canScrollLeft = scrollPosition > 0;
        const canScrollRight = scrollPosition < maxScroll;

        const classNames: string[] = [];
        if (size) {
            classNames.push(`size-${size}`);
        }

        return (
            <FormItem
                label={label}
                htmlFor={id}
                helpText={helpText}
                errorText={errorText}
                required={required}
                size={size}
                {...wrapperProps}
            >
                <Element
                    as="div"
                    data-radio-tab-group
                    ref={ref}
                    classNames={classNames}
                    name={derivedName}
                    {...inputProps}
                >
                    {/* LEFT SCROLL BUTTON */}
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

                    {/* RADIO OPTIONS */}
                    <Div className="rtg-options-container">
                        <Div
                            className="rtg-options-wrapper"
                            ref={optionsWrapperRef}
                        >
                            {/* INDICATOR */}
                            <Div
                                className="indicator"
                                style={{
                                    width: `${indicatorPos.width}px`,
                                    transform: indicatorPos.transform,
                                }}
                            />

                            {options.map((option, index) => {
                                const { id: optionId, ...optionProps } = option;
                                const finalId = optionId || `${id}-option-${index}`;

                                return (
                                    <React.Fragment key={finalId}>
                                        <input
                                            type="radio"
                                            {...optionProps}
                                            id={finalId}
                                            name={derivedName}
                                            checked={value === option.value}
                                            disabled={disabled || option.disabled}
                                            onChange={handleChange}
                                        />
                                        <label
                                            ref={el => { labelsRef.current[index] = el; }}
                                            htmlFor={finalId}
                                        >
                                            {option.label}
                                        </label>
                                    </React.Fragment>
                                );
                            })}
                        </Div>

                        {/* RIGHT SCROLL BUTTON */}
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
                </Element>
            </FormItem>
        );
    }
);
RadioTabGroup.displayName = "RadioTabGroup";
