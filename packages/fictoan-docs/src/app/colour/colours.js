import { Div, Text } from "fictoan-react";

export const listOfColours = [
    "red",
    "salmon",
    "orange",
    "amber",
    "yellow",
    "spring",
    "pistachio",
    "green",
    "teal",
    "cyan",
    "sky",
    "blue",
    "indigo",
    "violet",
    "purple",
    "pink",
    "crimson",
    "brick",
    "sienna",
    "brown",
    "slate",
    "grey",
];

export const generateShades = (color) => [
    `${color}-dark90`,
    `${color}-dark80`,
    `${color}-dark70`,
    `${color}-dark60`,
    `${color}-dark50`,
    `${color}-dark40`,
    `${color}-dark30`,
    `${color}-dark20`,
    `${color}-dark10`,
    color,
    `${color}-light10`,
    `${color}-light20`,
    `${color}-light30`,
    `${color}-light40`,
    `${color}-light50`,
    `${color}-light60`,
    `${color}-light70`,
    `${color}-light80`,
    `${color}-light90`,
];

// Generate shades for the colors in listOfColours
export const colourOptionsWithShades = listOfColours.flatMap(color =>
    generateShades(color).map(shade => (
        {
            customLabel : (
                <Div verticallyCentreItems>
                    <Div
                        className="color-option"
                        bgColour={shade}
                        padding="nano" shape="rounded"
                    />
                    <Text marginLeft="nano">{shade}</Text>
                </Div>
            ),
            label       : shade,
            value       : shade,
        }
    )),
);

// Separate black, white, and transparent
export const basicColourOptions = [
    { label : "black", value : "black" },
    { label : "white", value : "white" },
    { label : "transparent", value : "transparent" },
].map(color => (
    {
        customLabel : (
            <Div verticallyCentreItems>
                <Div
                    className="color-option"
                    bgColour={color.value}
                    padding="nano"
                    shape="rounded"
                    style={{
                        backgroundColor : color.value === "transparent" ? "rgba(0,0,0,0)" : color.value,
                        border          : color.value === "transparent" ? "1px dashed rgba(0,0,0,0.3)" : "",
                    }}
                />
                <Text marginLeft="nano">{color.label}</Text>
            </Div>
        ),
        label       : color.label,
        value       : color.value,
    }
));

// Combine both sets of options
export const colourOptions = [...colourOptionsWithShades, ...basicColourOptions];
