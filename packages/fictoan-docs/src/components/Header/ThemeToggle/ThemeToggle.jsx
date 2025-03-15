import React, { useState } from "react";

import { Div, Text, useTheme } from "fictoan-react";

import "./theme-toggle.css";

export const ThemeToggle = () => {
    const [ theme, setTheme ] = useTheme();
    const [clockwiseRotation, setClockwiseRotation] = useState(180); // Start at 180deg

    const toggleTheme = () => {
        if (theme === "theme-light") {
            setTheme("theme-dark");
        } else {
            setTheme("theme-light");
        }
        setClockwiseRotation(prev => prev + 180);
    };

    return (
        <Div id="theme-toggle" onClick={toggleTheme}>
            <Div id="celestial-bodies" style={{ transform: `rotateZ(${clockwiseRotation}deg)` }}>
                <Text id="theme-dark">🌞</Text>
                <Text id="theme-light">🌜</Text>
            </Div>

            <Div id="clouds">
                <Text>☁️</Text>
            </Div>

            <Div id="stars">
                <Text>✨</Text>
                <Text>✨</Text>
            </Div>

            <Div id="landscape">
                <Text>🏔</Text>
                <Text>🏔</Text>
            </Div>

            <Div id="airplane">
                <Text>🛫</Text>
            </Div>
        </Div>
    );
}
