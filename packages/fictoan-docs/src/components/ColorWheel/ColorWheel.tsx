"use client";

// REACT CORE ==========================================================================================================
import React, { useState } from "react";

// UI ==================================================================================================================
import { ColourDefinition } from "fictoan-react";

// STYLES ==============================================================================================================
import "./color-wheel.css";

interface ColorWheelProps {
    colours : Record<string, ColourDefinition>;
}

const toOklch = (hue : number, chroma : number, lightness : number = 0.65) : string => {
    return `oklch(${lightness} ${chroma} ${hue})`;
};

// Internal size for viewBox calculations
const VIEWBOX_SIZE = 320;

export const ColorWheel : React.FC<ColorWheelProps> = ({ colours }) => {
    const [ hoveredColor, setHoveredColor ] = useState<string | null>(null);

    const centerX = VIEWBOX_SIZE / 2;
    const centerY = VIEWBOX_SIZE / 2;
    const radius = (VIEWBOX_SIZE / 2) - 40;

    // Generate conic gradient stops using OKLCH
    const gradientStops = Array.from({ length: 36 }, (_, i) => {
        const hue = i * 10;
        return `oklch(0.45 0.12 ${hue}) ${hue}deg`;
    }).join(", ");

    return (
        <div className="color-wheel-wrapper">
            <div className="color-wheel-container">
                {/* Hue gradient background */}
                <div
                    className="color-wheel-gradient"
                    style={{
                        background: `conic-gradient(from 0deg, ${gradientStops}, oklch(0.45 0.12 0))`,
                    }}
                />
                <svg
                    viewBox={`0 0 ${VIEWBOX_SIZE} ${VIEWBOX_SIZE}`}
                    className="color-wheel-svg"
                >
                    {/* Outer ring */}
                    <circle
                        cx={centerX}
                        cy={centerY}
                        r={radius + 15}
                        fill="none"
                        className="color-wheel-outer-ring"
                    />

                    {/* Hue reference circle */}
                    <circle
                        cx={centerX}
                        cy={centerY}
                        r={radius}
                        fill="none"
                        className="color-wheel-inner-ring"
                    />

                    {/* Degree markers */}
                    {[ 0, 90, 180, 270 ].map((deg) => {
                        const angle = (deg - 90) * (Math.PI / 180);
                        const x = centerX + (radius + 25) * Math.cos(angle);
                        const y = centerY + (radius + 25) * Math.sin(angle);
                        return (
                            <text
                                key={deg}
                                x={x}
                                y={y}
                                textAnchor="middle"
                                dominantBaseline="middle"
                                className="color-wheel-degree-label"
                            >
                                {deg}°
                            </text>
                        );
                    })}

                    {/* Colour dots */}
                    {Object.entries(colours).map(([ name, def ]) => {
                        const angle = (def.hue - 90) * (Math.PI / 180);
                        const dotRadius = radius * (def.chroma > 0.01 ? 1 : 0.15);
                        const x = centerX + dotRadius * Math.cos(angle);
                        const y = centerY + dotRadius * Math.sin(angle);
                        const dotSize = 4 + def.chroma * 30;
                        const isHovered = hoveredColor === name;

                        return (
                            <g key={name}>
                                <line
                                    x1={centerX}
                                    y1={centerY}
                                    x2={x}
                                    y2={y}
                                    stroke={toOklch(def.hue, def.chroma)}
                                    strokeWidth={isHovered ? 2 : 1}
                                    opacity={isHovered ? 0.8 : 0.2}
                                />
                                <circle
                                    cx={x}
                                    cy={y}
                                    r={isHovered ? dotSize + 3 : dotSize}
                                    fill={toOklch(def.hue, def.chroma)}
                                    stroke={isHovered ? "var(--white)" : "none"}
                                    strokeWidth="2"
                                    className="color-wheel-dot"
                                    onMouseEnter={() => setHoveredColor(name)}
                                    onMouseLeave={() => setHoveredColor(null)}
                                />
                            </g>
                        );
                    })}

                    <circle cx={centerX} cy={centerY} r="3" className="color-wheel-center" />
                </svg>
            </div>

            {/* Hover info */}
            <div className="color-wheel-info">
                {hoveredColor && colours[hoveredColor] && (
                    <div className="color-wheel-info-card">
                        <div
                            className="color-wheel-info-swatch"
                            style={{
                                background : toOklch(colours[hoveredColor].hue, colours[hoveredColor].chroma),
                            }}
                        />
                        <div className="color-wheel-info-text">
                            <div className="color-wheel-info-name">{hoveredColor}</div>
                            <div className="color-wheel-info-values">
                                hue: {colours[hoveredColor].hue}° · chroma: {colours[hoveredColor].chroma}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
