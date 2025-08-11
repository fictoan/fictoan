// REACT CORE ==========================================================================================================
import React from "react";

// LOCAL COMPONENTS ====================================================================================================
import { CommonAndHTMLProps, ColourPropTypes, ShapeTypes } from "../Element/constants";
import { Element } from "$element";

// STYLES ==============================================================================================================
import "./progress-bar.css";

// OTHER ===============================================================================================================
import { Text } from "../Typography/Text";

export interface ProgressBarLabelCustomProps {
    suffix ? : string;
}

export interface ProgressBarCustomProps {
    label      ? : string;
    value      ? : number;
    suffix     ? : string;
    height     ? : string;
    max        ? : number;
    shape      ? : ShapeTypes;
    bgColor    ? : ColourPropTypes;
    bgColour   ? : ColourPropTypes;
    fillColor  ? : ColourPropTypes;
    fillColour ? : ColourPropTypes;
}

export type ProgressBarElementType = HTMLProgressElement;
export type ProgressBarProps = Omit<CommonAndHTMLProps<ProgressBarElementType>, keyof ProgressBarCustomProps> &
                               ProgressBarCustomProps;
export type ProgressBarMetaProps = Omit<CommonAndHTMLProps<HTMLDivElement>, keyof ProgressBarLabelCustomProps> &
                                   ProgressBarLabelCustomProps;

// COMPONENT ///////////////////////////////////////////////////////////////////////////////////////////////////////////
export const ProgressBar = React.forwardRef(
    (
        {
            label,
            value,
            height,
            max = 100,
            shape,
            bgColor,
            bgColour,
            fillColor,
            fillColour,
            ...props
        } : ProgressBarProps, ref : React.Ref<ProgressBarElementType>) => {
        const validValue = Math.max(0, Math.min(max, Number(value) || 0));
        const progressText = `${validValue}${props.suffix || ""}`;

        // Use UK spelling as primary, fall back to US spelling
        const backgroundColour = bgColour || bgColor;
        const progressFillColour = fillColour || fillColor;

        // Build CSS custom properties for styling
        const progressBarStyles : React.CSSProperties = {
            height,
            ...(backgroundColour && {"--progress-bar-bg" : `var(--${backgroundColour})`}),
            ...(progressFillColour && {"--progress-bar-fill" : `var(--${progressFillColour})`}),
        };

        return (
            <>
                {label && (
                    <Element<HTMLDivElement>
                        as="div"
                        data-progress-bar-meta
                        aria-hidden="true"
                    >
                        <Text>{label}</Text>
                        <Text>
                            {progressText}
                        </Text>
                    </Element>
                )}

                <Element<ProgressBarElementType>
                    as="progress"
                    data-progress-bar
                    ref={ref}
                    value={validValue}
                    max={max}
                    aria-label={label}
                    aria-valuemin={0}
                    aria-valuemax={max}
                    aria-valuenow={validValue}
                    aria-valuetext={`${label ? `${label}: ` : ""}${progressText}`}
                    shape={shape}
                    {...props}
                    style={progressBarStyles}
                />
            </>
        );
    },
);