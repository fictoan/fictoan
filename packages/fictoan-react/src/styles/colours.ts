// OKLCH colour definitions
// Hue: 0-360 degrees (OKLCH hue wheel)
// Chroma: colour intensity (0 = grey, ~0.4 = vivid)

export interface ColourDefinition {
    hue    : number;
    chroma : number;
}

// 36-colour palette with ~10° hue gaps
export const oklchColourDefinitions : Record<string, ColourDefinition> = {
    // Reds & Pinks (0-30°)
    pink    : {hue : 0, chroma : 0.185},
    rose    : {hue : 10, chroma : 0.175},
    crimson : {hue : 20, chroma : 0.195},
    red     : {hue : 30, chroma : 0.234},

    // Oranges & Earth tones (40-70°)
    salmon : {hue : 40, chroma : 0.165},
    sienna : {hue : 50, chroma : 0.095},
    orange : {hue : 60, chroma : 0.175},
    amber  : {hue : 70, chroma : 0.164},

    // Yellows (80-100°)
    gold   : {hue : 80, chroma : 0.155},
    yellow : {hue : 90, chroma : 0.155},
    lime   : {hue : 100, chroma : 0.145},

    // Greens (110-170°)
    chartreuse : {hue : 110, chroma : 0.145},
    spring     : {hue : 120, chroma : 0.14},
    pistachio  : {hue : 130, chroma : 0.1},
    sage       : {hue : 140, chroma : 0.09},
    green      : {hue : 150, chroma : 0.145},
    emerald    : {hue : 160, chroma : 0.155},
    jade       : {hue : 170, chroma : 0.125},

    // Teals & Cyans (180-210°)
    teal  : {hue : 180, chroma : 0.115},
    cyan  : {hue : 190, chroma : 0.135},
    aqua  : {hue : 200, chroma : 0.125},
    azure : {hue : 210, chroma : 0.145},

    // Blues (220-270°)
    sky      : {hue : 220, chroma : 0.145},
    cerulean : {hue : 230, chroma : 0.155},
    cobalt   : {hue : 240, chroma : 0.175},
    navy     : {hue : 250, chroma : 0.145},
    blue     : {hue : 260, chroma : 0.195},
    royal    : {hue : 270, chroma : 0.185},

    // Purples & Violets (280-330°)
    indigo  : {hue : 280, chroma : 0.165},
    iris    : {hue : 290, chroma : 0.15},
    violet  : {hue : 300, chroma : 0.135},
    plum    : {hue : 310, chroma : 0.125},
    purple  : {hue : 320, chroma : 0.125},
    magenta : {hue : 330, chroma : 0.165},

    // Magentas & Back to pink (340-350°)
    fuchsia : {hue : 340, chroma : 0.185},
    cerise  : {hue : 350, chroma : 0.19},

    // Neutrals (special cases)
    slate : {hue : 255, chroma : 0.02},
    grey  : {hue : 0, chroma : 0},
    brown : {hue : 55, chroma : 0.065},
};

// Colour names for type safety
export type OklchColourName = keyof typeof oklchColourDefinitions;
