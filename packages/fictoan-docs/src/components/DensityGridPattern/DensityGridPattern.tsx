"use client";

import React, { useMemo, useState, useEffect, useRef } from "react";

import "./density-grid-pattern.css";

type FadeDirection = "to-right" | "to-left" | "to-bottom" | "to-top";

interface DensityGridPatternProps {
    dotSize?: number;
    gap?: number;
    color?: string;
    fadeDirection?: FadeDirection;
    opacity?: number;
    height?: string;
    className?: string;
}

interface Dot {
    id: string;
    x: number;
    y: number;
}

export const DensityGridPattern: React.FC<DensityGridPatternProps> = ({
    dotSize = 4,
    gap = 20,
    color = "#4f46e5",
    fadeDirection = "to-right",
    opacity = 0.8,
    height = "100%",
    className,
}) => {
    const svgRef = useRef<SVGSVGElement>(null);
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

    // Measure the actual element dimensions
    useEffect(() => {
        const updateDimensions = () => {
            if (svgRef.current) {
                const rect = svgRef.current.getBoundingClientRect();
                setDimensions({ width: rect.width, height: rect.height });
            }
        };

        updateDimensions();
        window.addEventListener("resize", updateDimensions);
        return () => window.removeEventListener("resize", updateDimensions);
    }, []);

    // Calculate grid based on actual dimensions
    // Add 1 to ensure dots can fill to the edges
    const cols = Math.max(1, Math.ceil(dimensions.width / gap) + 1);
    const rows = Math.max(1, Math.ceil(dimensions.height / gap) + 1);

    const dots = useMemo<Dot[]>(() => {
        if (dimensions.width === 0 || dimensions.height === 0) return [];

        const tempDots: Dot[] = [];

        for (let i = 0; i < cols; i++) {
            for (let j = 0; j < rows; j++) {
                let probability = 1;

                if (fadeDirection === "to-right") probability = 1 - i / (cols - 1);
                else if (fadeDirection === "to-left") probability = i / (cols - 1);
                else if (fadeDirection === "to-bottom") probability = 1 - j / (rows - 1);
                else if (fadeDirection === "to-top") probability = j / (rows - 1);

                // Mathematical curve for natural tapering
                const adjustedProbability = Math.pow(probability, 1.5);

                if (Math.random() < adjustedProbability) {
                    tempDots.push({
                        id: `${i}-${j}`,
                        x: i * gap,
                        y: j * gap,
                    });
                }
            }
        }
        return tempDots;
    }, [gap, fadeDirection, cols, rows, dimensions.width, dimensions.height]);

    // Position the SVG based on fade direction so the dense side is anchored
    const getPositionStyle = (): React.CSSProperties => {
        switch (fadeDirection) {
            case "to-top":
                return { bottom: 0 };
            case "to-bottom":
                return { top: 0 };
            case "to-left":
                return { right: 0 };
            case "to-right":
                return { left: 0 };
            default:
                return { top: 0 };
        }
    };

    return (
        <svg
            ref={svgRef}
            className={`density-grid-pattern ${className || ""}`}
            viewBox={dimensions.width > 0 ? `0 0 ${dimensions.width} ${dimensions.height}` : undefined}
            style={{ opacity, height, ...getPositionStyle() }}
            aria-hidden="true"
        >
            {dimensions.width > 0 && (
                <g>
                    {dots.map((dot) => (
                        <rect
                            key={dot.id}
                            x={dot.x}
                            y={dot.y}
                            width={dotSize}
                            height={dotSize}
                            fill={color}
                        />
                    ))}
                </g>
            )}
        </svg>
    );
};
