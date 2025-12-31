// REACT CORE ==========================================================================================================
import React, { useState } from "react";

// Original 22-color palette
const originalColors = {
    red: { hue: 29, chroma: 0.234 },
    salmon: { hue: 39, chroma: 0.175 },
    orange: { hue: 55, chroma: 0.175 },
    amber: { hue: 75, chroma: 0.164 },
    yellow: { hue: 95, chroma: 0.155 },
    spring: { hue: 125, chroma: 0.14 },
    pistachio: { hue: 135, chroma: 0.1 },
    green: { hue: 155, chroma: 0.145 },
    teal: { hue: 185, chroma: 0.115 },
    cyan: { hue: 195, chroma: 0.135 },
    sky: { hue: 220, chroma: 0.145 },
    blue: { hue: 265, chroma: 0.195 },
    indigo: { hue: 285, chroma: 0.165 },
    violet: { hue: 300, chroma: 0.135 },
    purple: { hue: 325, chroma: 0.125 },
    pink: { hue: 0, chroma: 0.185 },
    crimson: { hue: 15, chroma: 0.175 },
    brick: { hue: 25, chroma: 0.145 },
    sienna: { hue: 45, chroma: 0.095 },
    brown: { hue: 55, chroma: 0.065 },
    slate: { hue: 255, chroma: 0.02 },
    grey: { hue: 0, chroma: 0 },
};

// New 36-color palette with ~10° gaps
const expandedColors = {
    // Reds & Pinks (0-30°)
    pink:       { hue: 0,   chroma: 0.185 },
    rose:       { hue: 10,  chroma: 0.175 },
    crimson:    { hue: 20,  chroma: 0.195 },
    red:        { hue: 30,  chroma: 0.234 },

    // Oranges & Earth tones (40-70°)
    salmon:     { hue: 40,  chroma: 0.165 },
    sienna:     { hue: 50,  chroma: 0.095 },
    orange:     { hue: 60,  chroma: 0.175 },
    amber:      { hue: 70,  chroma: 0.164 },

    // Yellows (80-100°)
    gold:       { hue: 80,  chroma: 0.155 },
    yellow:     { hue: 90,  chroma: 0.155 },
    lime:       { hue: 100, chroma: 0.145 },

    // Greens (110-170°)
    chartreuse: { hue: 110, chroma: 0.145 },
    spring:     { hue: 120, chroma: 0.14 },
    pistachio:  { hue: 130, chroma: 0.1 },
    sage:       { hue: 140, chroma: 0.09 },
    green:      { hue: 150, chroma: 0.145 },
    emerald:    { hue: 160, chroma: 0.155 },
    jade:       { hue: 170, chroma: 0.125 },

    // Teals & Cyans (180-210°)
    teal:       { hue: 180, chroma: 0.115 },
    cyan:       { hue: 190, chroma: 0.135 },
    aqua:       { hue: 200, chroma: 0.125 },
    azure:      { hue: 210, chroma: 0.145 },

    // Blues (220-270°)
    sky:        { hue: 220, chroma: 0.145 },
    cerulean:   { hue: 230, chroma: 0.155 },
    cobalt:     { hue: 240, chroma: 0.175 },
    navy:       { hue: 250, chroma: 0.145 },
    blue:       { hue: 260, chroma: 0.195 },
    royal:      { hue: 270, chroma: 0.185 },

    // Purples & Violets (280-330°)
    indigo:     { hue: 280, chroma: 0.165 },
    iris:       { hue: 290, chroma: 0.15 },
    violet:     { hue: 300, chroma: 0.135 },
    plum:       { hue: 310, chroma: 0.125 },
    purple:     { hue: 320, chroma: 0.125 },
    magenta:    { hue: 330, chroma: 0.165 },

    // Magentas & Back to pink (340-350°)
    fuchsia:    { hue: 340, chroma: 0.185 },
    cerise:     { hue: 350, chroma: 0.19 },

    // Neutrals (special cases)
    slate:      { hue: 255, chroma: 0.02 },
    grey:       { hue: 0,   chroma: 0 },
    brown:      { hue: 55,  chroma: 0.065 },
};

// Display color using actual OKLCH
const toOklch = (hue, chroma, lightness = 0.65) => {
    return `oklch(${lightness} ${chroma} ${hue})`;
};

// Calculate gaps for a color set
const calculateGaps = (colors, threshold = 25) => {
    const sortedColors = Object.entries(colors)
        .filter(([_, def]) => def.chroma > 0.01)
        .sort((a, b) => a[1].hue - b[1].hue);

    const gaps = [];
    for (let i = 0; i < sortedColors.length; i++) {
        const current = sortedColors[i];
        const next = sortedColors[(i + 1) % sortedColors.length];
        let gap = next[1].hue - current[1].hue;
        if (gap < 0) gap += 360;
        if (gap > threshold) {
            gaps.push({
                startHue: current[1].hue,
                endHue: next[1].hue,
                gap: gap,
                startName: current[0],
                endName: next[0]
            });
        }
    }
    return gaps;
};

// Single color wheel component
const ColorWheel = ({ colors, title, subtitle, gaps, size = 320 }) => {
    const [hoveredColor, setHoveredColor] = useState(null);

    const centerX = size / 2;
    const centerY = size / 2;
    const radius = (size / 2) - 40;

    return (
        <div>
            <h3 style={{ margin: "0 0 4px 0", fontWeight: 600, fontSize: "16px" }}>{title}</h3>
            <p style={{ margin: "0 0 16px 0", opacity: 0.6, fontSize: "13px" }}>{subtitle}</p>

            <svg width={size} height={size} style={{ background: "#0d0d1a", borderRadius: "12px" }}>
                {/* Outer ring */}
                <circle
                    cx={centerX}
                    cy={centerY}
                    r={radius + 15}
                    fill="none"
                    stroke="#333"
                    strokeWidth="1"
                />

                {/* Hue reference circle */}
                <circle
                    cx={centerX}
                    cy={centerY}
                    r={radius}
                    fill="none"
                    stroke="#333"
                    strokeWidth="1"
                    strokeDasharray="2 2"
                />

                {/* Gap arcs */}
                {gaps.map((gap, i) => {
                    const startAngle = (gap.startHue - 90) * (Math.PI / 180);
                    const endAngle = (gap.endHue - 90) * (Math.PI / 180);
                    const arcRadius = radius + 8;

                    const x1 = centerX + arcRadius * Math.cos(startAngle);
                    const y1 = centerY + arcRadius * Math.sin(startAngle);
                    const x2 = centerX + arcRadius * Math.cos(endAngle);
                    const y2 = centerY + arcRadius * Math.sin(endAngle);

                    const largeArc = gap.gap > 180 ? 1 : 0;

                    return (
                        <path
                            key={i}
                            d={`M ${x1} ${y1} A ${arcRadius} ${arcRadius} 0 ${largeArc} 1 ${x2} ${y2}`}
                            fill="none"
                            stroke="#ff6b6b"
                            strokeWidth="3"
                            strokeLinecap="round"
                            opacity="0.6"
                        />
                    );
                })}

                {/* Degree markers */}
                {[0, 90, 180, 270].map((deg) => {
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
                            fill="#555"
                            fontSize="10"
                        >
                            {deg}°
                        </text>
                    );
                })}

                {/* Color dots */}
                {Object.entries(colors).map(([name, def]) => {
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
                                stroke={isHovered ? "#fff" : "none"}
                                strokeWidth="2"
                                style={{ cursor: "pointer", transition: "all 0.15s ease" }}
                                onMouseEnter={() => setHoveredColor(name)}
                                onMouseLeave={() => setHoveredColor(null)}
                            />
                        </g>
                    );
                })}

                <circle cx={centerX} cy={centerY} r="3" fill="#444" />
            </svg>

            {/* Hover info */}
            <div style={{ height: "70px", marginTop: "12px" }}>
                {hoveredColor && colors[hoveredColor] && (
                    <div style={{
                        padding: "12px",
                        background: "#252538",
                        borderRadius: "8px",
                        display: "flex",
                        alignItems: "center",
                        gap: "12px"
                    }}>
                        <div style={{
                            width: "40px",
                            height: "40px",
                            borderRadius: "6px",
                            background: toOklch(colors[hoveredColor].hue, colors[hoveredColor].chroma),
                            flexShrink: 0
                        }} />
                        <div>
                            <div style={{ fontWeight: 600, marginBottom: "2px" }}>{hoveredColor}</div>
                            <div style={{ fontSize: "12px", opacity: 0.6 }}>
                                hue: {colors[hoveredColor].hue}° &nbsp;•&nbsp; chroma: {colors[hoveredColor].chroma}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default function ColorWheelComparison() {
    const originalGaps = calculateGaps(originalColors, 25);
    const expandedGaps = calculateGaps(expandedColors, 15);

    // Stats
    const originalCount = Object.keys(originalColors).length;
    const expandedCount = Object.keys(expandedColors).length;
    const originalMaxGap = Math.max(...originalGaps.map(g => g.gap));
    const expandedMaxGap = expandedGaps.length > 0 ? Math.max(...expandedGaps.map(g => g.gap)) : 10;

    return (
        <div style={{
            fontFamily: "system-ui, sans-serif",
            padding: "32px",
            background: "#1a1a2e",
            minHeight: "100vh",
            color: "#fff"
        }}>
            <h1 style={{ margin: "0 0 8px 0", fontWeight: 600, fontSize: "24px" }}>
                Fictoan colour palette comparison
            </h1>
            <p style={{ margin: "0 0 32px 0", opacity: 0.6, fontSize: "14px" }}>
                Hover over dots to inspect colours. Red arcs indicate hue gaps.
            </p>

            {/* Comparison stats */}
            <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
                gap: "12px",
                marginBottom: "32px",
                maxWidth: "700px"
            }}>
                {[
                    { label: "Original", value: `${originalCount} colours`, sub: `max gap: ${originalMaxGap}°` },
                    { label: "Expanded", value: `${expandedCount} colours`, sub: `max gap: ${expandedMaxGap}°` },
                    { label: "Added", value: `+${expandedCount - originalCount}`, sub: "new colours" },
                    { label: "Target gap", value: "~10°", sub: "between hues" },
                ].map((stat, i) => (
                    <div key={i} style={{
                        background: "#252538",
                        padding: "16px",
                        borderRadius: "8px",
                        textAlign: "center"
                    }}>
                        <div style={{ fontSize: "11px", opacity: 0.5, textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "4px" }}>
                            {stat.label}
                        </div>
                        <div style={{ fontSize: "20px", fontWeight: 600 }}>{stat.value}</div>
                        <div style={{ fontSize: "11px", opacity: 0.5 }}>{stat.sub}</div>
                    </div>
                ))}
            </div>

            {/* Side by side wheels */}
            <div style={{ display: "flex", gap: "48px", flexWrap: "wrap", marginBottom: "48px" }}>
                <ColorWheel
                    colors={originalColors}
                    title="Original palette"
                    subtitle={`${originalCount} colours • ${originalGaps.length} gaps over 25°`}
                    gaps={originalGaps}
                />
                <ColorWheel
                    colors={expandedColors}
                    title="Expanded palette"
                    subtitle={`${expandedCount} colours • ${expandedGaps.length} gaps over 15°`}
                    gaps={expandedGaps}
                />
            </div>

            {/* New colors list */}
            <div style={{ maxWidth: "900px" }}>
                <h3 style={{ margin: "0 0 16px 0", fontWeight: 600 }}>
                    Expanded palette definition
                </h3>
                <div style={{
                    background: "#0d0d1a",
                    borderRadius: "8px",
                    padding: "20px",
                    fontFamily: "ui-monospace, monospace",
                    fontSize: "13px",
                    lineHeight: 1.7,
                    overflowX: "auto"
                }}>
                    <div style={{ color: "#6b7280" }}>{"// 36-colour palette with ~10° hue gaps"}</div>
                    <div style={{ color: "#c084fc" }}>{"const"} <span style={{ color: "#f472b6" }}>colors</span> <span style={{ color: "#6b7280" }}>:</span> <span style={{ color: "#22d3ee" }}>Record</span><span style={{ color: "#6b7280" }}>{"<"}</span><span style={{ color: "#22d3ee" }}>ColorName</span><span style={{ color: "#6b7280" }}>{", "}</span><span style={{ color: "#22d3ee" }}>ColorDefinition</span><span style={{ color: "#6b7280" }}>{">"}</span> <span style={{ color: "#6b7280" }}>=</span> {"{"}</div>

                    {Object.entries(expandedColors).map(([name, def], i, arr) => {
                        const isNew = !originalColors[name];
                        const padName = name.padEnd(11);
                        const padHue = String(def.hue).padStart(3);
                        const comma = i < arr.length - 1 ? "," : "";

                        return (
                            <div key={name} style={{ marginLeft: "24px" }}>
                                <span style={{ color: isNew ? "#4ade80" : "#94a3b8" }}>{padName}</span>
                                <span style={{ color: "#6b7280" }}>{" : { hue : "}</span>
                                <span style={{ color: "#f472b6" }}>{padHue}</span>
                                <span style={{ color: "#6b7280" }}>{", chroma : "}</span>
                                <span style={{ color: "#f472b6" }}>{def.chroma}</span>
                                <span style={{ color: "#6b7280" }}>{" }"}{comma}</span>
                                {isNew && <span style={{ color: "#4ade80", marginLeft: "12px" }}>{"// new"}</span>}
                            </div>
                        );
                    })}

                    <div>{"}"}</div>
                </div>

                {/* Legend */}
                <div style={{ marginTop: "16px", display: "flex", gap: "24px", fontSize: "13px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <div style={{ width: "12px", height: "12px", background: "#4ade80", borderRadius: "2px" }} />
                        <span style={{ opacity: 0.7 }}>New colour</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <div style={{ width: "12px", height: "12px", background: "#94a3b8", borderRadius: "2px" }} />
                        <span style={{ opacity: 0.7 }}>Existing (possibly adjusted hue)</span>
                    </div>
                </div>
            </div>

            {/* Color swatches */}
            <div style={{ marginTop: "48px", maxWidth: "900px" }}>
                <h3 style={{ margin: "0 0 16px 0", fontWeight: 600 }}>
                    Colour swatches (by hue)
                </h3>
                <div style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(100px, 1fr))",
                    gap: "8px"
                }}>
                    {Object.entries(expandedColors)
                        .filter(([_, def]) => def.chroma > 0.01)
                        .sort((a, b) => a[1].hue - b[1].hue)
                        .map(([name, def]) => {
                            const isNew = !originalColors[name];
                            return (
                                <div
                                    key={name}
                                    style={{
                                        background: "#252538",
                                        borderRadius: "8px",
                                        padding: "8px",
                                        border: isNew ? "1px solid #4ade8040" : "1px solid transparent"
                                    }}
                                >
                                    <div style={{
                                        height: "48px",
                                        borderRadius: "4px",
                                        background: toOklch(def.hue, def.chroma),
                                        marginBottom: "8px"
                                    }} />
                                    <div style={{ fontSize: "12px", fontWeight: 500 }}>{name}</div>
                                    <div style={{ fontSize: "10px", opacity: 0.5 }}>{def.hue}°</div>
                                </div>
                            );
                        })
                    }
                </div>

                {/* Neutrals */}
                <h4 style={{ margin: "24px 0 12px 0", fontWeight: 500, fontSize: "14px", opacity: 0.7 }}>
                    Neutrals (low/zero chroma)
                </h4>
                <div style={{ display: "flex", gap: "8px" }}>
                    {Object.entries(expandedColors)
                        .filter(([_, def]) => def.chroma <= 0.01 || ["brown", "slate"].includes(_))
                        .map(([name, def]) => (
                            <div
                                key={name}
                                style={{
                                    background: "#252538",
                                    borderRadius: "8px",
                                    padding: "8px",
                                    width: "100px"
                                }}
                            >
                                <div style={{
                                    height: "48px",
                                    borderRadius: "4px",
                                    background: toOklch(def.hue, Math.max(def.chroma, 0.02)),
                                    marginBottom: "8px",
                                    border: def.chroma === 0 ? "1px solid #444" : "none"
                                }} />
                                <div style={{ fontSize: "12px", fontWeight: 500 }}>{name}</div>
                                <div style={{ fontSize: "10px", opacity: 0.5 }}>chroma: {def.chroma}</div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    );
}