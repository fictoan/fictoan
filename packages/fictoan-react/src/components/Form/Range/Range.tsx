// REACT CORE ==========================================================================================================
import React, { useCallback, useRef, useState, useEffect } from "react";

// LOCAL COMPONENTS ====================================================================================================
import { CommonAndHTMLProps } from "../../Element/constants";
import { Div } from "../../Element/Tags";

// INPUT ===============================================================================================================
import { BaseInputComponent } from "../BaseInputComponent/BaseInputComponent";
import { InputCommonProps } from "../BaseInputComponent/constants";

// STYLES ==============================================================================================================
import "./range.css";

// OTHER ===============================================================================================================
import { InputLabel } from "$/components";
import { Text } from "$/components";

// Single-thumb range
export interface SingleRangeCustomProps {
    min      ? : number;
    max      ? : number;
    step     ? : number;
    suffix   ? : string;
    value    ? : number;
    onChange ? : (value : number) => void;
}

// Dual-thumb range
export interface DualRangeCustomProps {
    min      ? : number;
    max      ? : number;
    step     ? : number;
    suffix   ? : string;
    value    ? : [ number, number ];
    onChange ? : (value : [ number, number ]) => void;
    minLabel ? : string;
    maxLabel ? : string;
}

export type RangeElementType = HTMLInputElement;

// Separate prop types for each mode
export type SingleRangeProps = Omit<CommonAndHTMLProps<RangeElementType>, "onChange" | "value"> &
                               InputCommonProps &
                               SingleRangeCustomProps;

export type DualRangeProps = Omit<CommonAndHTMLProps<RangeElementType>, "onChange" | "value"> &
                             InputCommonProps &
                             DualRangeCustomProps;

export type RangeProps = SingleRangeProps | DualRangeProps;

// Type guard to check if props are for dual-thumb mode
function isDualRangeProps(props : RangeProps) : props is DualRangeProps {
    return Array.isArray(props.value);
}

// COMPONENT ///////////////////////////////////////////////////////////////////////////////////////////////////////////
export const Range = React.forwardRef<RangeElementType, RangeProps>(
    (props, ref) => {
        if (isDualRangeProps(props)) {
            return <DualThumbRange {...props} forwardedRef={ref} />;
        }
        return <SingleThumbRange {...props} forwardedRef={ref} />;
    },
);
Range.displayName = "Range";

// SINGLE THUMB COMPONENT //////////////////////////////////////////////////////////////////////////////////////////////
interface SingleThumbRangeInternalProps extends SingleRangeProps {
    forwardedRef ? : React.Ref<RangeElementType>;
}

const SingleThumbRange = React.forwardRef<RangeElementType, SingleThumbRangeInternalProps>(
    ({label, value, suffix, onChange, forwardedRef, ...props}, _ref) => {
        const handleChange = useCallback((value : string) => {
            onChange?.(parseFloat(value));
        }, [ onChange ]);

        return (
            <BaseInputComponent<RangeElementType>
                as="input"
                type="range"
                data-range
                value={value?.toString()}
                onChange={handleChange}
                customLabel={label && (
                    <Div data-range-meta>
                        <InputLabel className="range-label" label={label} htmlFor={props.id} />
                        <Text className="range-value">
                            {value} {suffix && suffix}
                        </Text>
                    </Div>
                )}
                ref={forwardedRef}
                {...props}
            />
        );
    },
);

SingleThumbRange.displayName = "SingleThumbRange";

// DUAL THUMB COMPONENT ////////////////////////////////////////////////////////////////////////////////////////////////
interface DualThumbRangeInternalProps extends DualRangeProps {
    forwardedRef ? : React.Ref<RangeElementType>;
}

const DualThumbRange : React.FC<DualThumbRangeInternalProps> = ({
    label,
    value = [ 0, 100 ],
    suffix,
    onChange,
    min = 0,
    max = 100,
    step = 1,
    minLabel = "Minimum value",
    maxLabel = "Maximum value",
    id,
    disabled,
    ...props
}) => {
    const [ minValue, maxValue ] = value;
    const minThumbRef = useRef<HTMLButtonElement>(null);
    const maxThumbRef = useRef<HTMLButtonElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);
    const [ isDragging, setIsDragging ] = useState<"min" | "max" | null>(null);
    const [ activeThumb, setActiveThumb ] = useState<"min" | "max" | null>(null);

    // Convert value to percentage position
    const getPercent = useCallback((value : number) => {
        return ((value - min) / (max - min)) * 100;
    }, [ min, max ]);

    // Convert mouse/touch position to value
    const getValueFromPosition = useCallback((clientX : number) => {
        if (!trackRef.current) return min;

        const rect = trackRef.current.getBoundingClientRect();
        const percent = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
        const rawValue = min + percent * (max - min);

        // Snap to step
        const steppedValue = Math.round(rawValue / step) * step;
        return Math.max(min, Math.min(max, steppedValue));
    }, [ min, max, step ]);

    // Handle drag for either thumb
    const handleDrag = useCallback((clientX : number, thumb : "min" | "max") => {
        const newValue = getValueFromPosition(clientX);

        if (thumb === "min") {
            const clampedMin = Math.min(newValue, maxValue - step);
            onChange?.([ clampedMin, maxValue ]);
        } else {
            const clampedMax = Math.max(newValue, minValue + step);
            onChange?.([ minValue, clampedMax ]);
        }
    }, [ getValueFromPosition, minValue, maxValue, step, onChange ]);

    // Mouse events
    const handleMouseDown = useCallback((thumb : "min" | "max") => (e : React.MouseEvent) => {
        if (disabled) return;
        e.preventDefault();
        setIsDragging(thumb);
        setActiveThumb(thumb);
        handleDrag(e.clientX, thumb);
    }, [ disabled, handleDrag ]);

    useEffect(() => {
        if (!isDragging) return;

        const handleMouseMove = (e : MouseEvent) => {
            handleDrag(e.clientX, isDragging);
        };

        const handleMouseUp = () => {
            setIsDragging(null);
        };

        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);

        return () => {
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseup", handleMouseUp);
        };
    }, [ isDragging, handleDrag ]);

    // Touch events
    const handleTouchStart = useCallback((thumb : "min" | "max") => (e : React.TouchEvent) => {
        if (disabled) return;
        setIsDragging(thumb);
        setActiveThumb(thumb);
        handleDrag(e.touches[0].clientX, thumb);
    }, [ disabled, handleDrag ]);

    useEffect(() => {
        if (!isDragging) return;

        const handleTouchMove = (e : TouchEvent) => {
            e.preventDefault();
            handleDrag(e.touches[0].clientX, isDragging);
        };

        const handleTouchEnd = () => {
            setIsDragging(null);
        };

        document.addEventListener("touchmove", handleTouchMove, {passive : false});
        document.addEventListener("touchend", handleTouchEnd);

        return () => {
            document.removeEventListener("touchmove", handleTouchMove);
            document.removeEventListener("touchend", handleTouchEnd);
        };
    }, [ isDragging, handleDrag ]);

    // Keyboard navigation
    const handleKeyDown = useCallback((thumb : "min" | "max") => (e : React.KeyboardEvent) => {
        if (disabled) return;

        const currentValue = thumb === "min" ? minValue : maxValue;
        let newValue = currentValue;

        switch (e.key) {
            case "ArrowRight":
            case "ArrowUp":
                e.preventDefault();
                newValue = Math.min(currentValue + step, max);
                break;
            case "ArrowLeft":
            case "ArrowDown":
                e.preventDefault();
                newValue = Math.max(currentValue - step, min);
                break;
            case "Home":
                e.preventDefault();
                newValue = thumb === "min" ? min : minValue + step;
                break;
            case "End":
                e.preventDefault();
                newValue = thumb === "max" ? max : maxValue - step;
                break;
            case "PageUp":
                e.preventDefault();
                newValue = Math.min(currentValue + step * 10, max);
                break;
            case "PageDown":
                e.preventDefault();
                newValue = Math.max(currentValue - step * 10, min);
                break;
            default:
                return;
        }

        if (thumb === "min") {
            const clampedMin = Math.min(newValue, maxValue - step);
            onChange?.([ clampedMin, maxValue ]);
        } else {
            const clampedMax = Math.max(newValue, minValue + step);
            onChange?.([ minValue, clampedMax ]);
        }
    }, [ disabled, minValue, maxValue, min, max, step, onChange ]);

    const minPercent = getPercent(minValue);
    const maxPercent = getPercent(maxValue);

    return (
        <BaseInputComponent
            as="div"
            data-range
            customLabel={label && (
                <Div data-range-meta>
                    <InputLabel
                        className="range-label"
                        label={label}
                        htmlFor={id}
                    />
                    <Text className="range-value">
                        {minValue} – {maxValue} {suffix && suffix}
                    </Text>
                </Div>
            )}
            id={id}
            {...props}
        >
            <Div
                ref={trackRef}
                data-range-dual
                className={disabled ? "disabled" : ""}
                role="group"
                aria-labelledby={label ? `${id}-label` : undefined}
            >
                {/* Track background */}
                <Div className="range-track" aria-hidden="true" />

                {/* Filled track between thumbs */}
                <Div
                    className="range-track-fill"
                    style={{
                        left  : `${minPercent}%`,
                        right : `${100 - maxPercent}%`,
                    }}
                    aria-hidden="true"
                />

                {/* Min thumb */}
                <button
                    ref={minThumbRef}
                    id={`${id}-min`}
                    type="button"
                    className="range-thumb range-thumb-min"
                    style={{left : `${minPercent}%`}}
                    disabled={disabled}
                    onMouseDown={handleMouseDown("min")}
                    onTouchStart={handleTouchStart("min")}
                    onKeyDown={handleKeyDown("min")}
                    onFocus={() => setActiveThumb("min")}
                    onBlur={() => setActiveThumb(null)}
                    data-active={activeThumb === "min" || isDragging === "min"}
                    role="slider"
                    aria-label={minLabel}
                    aria-valuemin={min}
                    aria-valuemax={maxValue - step}
                    aria-valuenow={minValue}
                    aria-valuetext={`${minValue}${suffix ? ` ${suffix}` : ""}`}
                    aria-orientation="horizontal"
                />

                {/* Max thumb */}
                <button
                    ref={maxThumbRef}
                    id={`${id}-max`}
                    type="button"
                    className="range-thumb range-thumb-max"
                    style={{left : `${maxPercent}%`}}
                    disabled={disabled}
                    onMouseDown={handleMouseDown("max")}
                    onTouchStart={handleTouchStart("max")}
                    onKeyDown={handleKeyDown("max")}
                    onFocus={() => setActiveThumb("max")}
                    onBlur={() => setActiveThumb(null)}
                    data-active={activeThumb === "max" || isDragging === "max"}
                    role="slider"
                    aria-label={maxLabel}
                    aria-valuemin={minValue + step}
                    aria-valuemax={max}
                    aria-valuenow={maxValue}
                    aria-valuetext={`${maxValue}${suffix ? ` ${suffix}` : ""}`}
                    aria-orientation="horizontal"
                />
            </Div>
        </BaseInputComponent>
    );
};

DualThumbRange.displayName = "DualThumbRange";
