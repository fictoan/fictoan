import { ElementType, FormEvent, HTMLProps } from "react";

import { oklchColourDefinitions, type OklchColourName } from "../../styles/colours";

// Basic colours without hue/chroma (not part of OKLCH definitions)
export const BasicColours = ["transparent", "black", "white"] as const;
type BasicColoursType = typeof BasicColours[number];

// Combined list of all available colours
export const FictoanColours = [...Object.keys(oklchColourDefinitions), ...BasicColours] as const;

type Luminance = "dark" | "light";
type ShadeLevel = 10 | 20 | 30 | 40 | 50 | 60 | 70 | 80 | 90;
type OpacityLevel = 0 | 5 | 10 | 20 | 30 | 40 | 50 | 60 | 70 | 80 | 90;
type CustomColours = "hue" | "tint" | "shade" | "analogue" | "accent";

// prettier-ignore
export type EmphasisTypes = "primary" | "secondary" | "tertiary" | "custom";
export type SpacingTypes = "none" | "nano" | "micro" | "tiny" | "small" | "medium" | "large" | "huge";
export type ShadowTypes  = "none" | "mild" | "hard" | "soft";
export type ShapeTypes   = "rounded" | "curved";
export type OpacityTypes = "0" | "5" | "10" | "20" | "30" | "40" | "50" | "60" | "70" | "80" | "90";
export type WeightTypes  = "100" | "200" | "300" | "400" | "500" | "600" | "700" | "800" | "900";

export type ColourPropTypes =
    | `${OklchColourName}-${Luminance}${ShadeLevel}`
    | `${OklchColourName}-${Luminance}${ShadeLevel}-opacity${OpacityLevel}`
    | `${OklchColourName}-opacity${OpacityLevel}`
    | `${BasicColoursType}-opacity${OpacityLevel}`
    | OklchColourName
    | BasicColoursType
    | CustomColours
    | "";

// prettier-ignore
export interface CommonProps {
    // STYLING =================================================================
    bgColor      ? : ColourPropTypes;
    bgColour     ? : ColourPropTypes;
    bgOpacity    ? : OpacityTypes;
    textColor    ? : ColourPropTypes;
    textColour   ? : ColourPropTypes;
    borderColor  ? : ColourPropTypes;
    borderColour ? : ColourPropTypes;
    borderOpacity? : OpacityTypes;
    fillColor    ? : ColourPropTypes;
    fillColour   ? : ColourPropTypes;
    strokeColor  ? : ColourPropTypes;
    strokeColour ? : ColourPropTypes;
    shadow       ? : ShadowTypes;
    shape        ? : ShapeTypes;
    opacity      ? : OpacityTypes;

    // LAYOUT ==================================================================
    // Flexbox -----------------------------------------------------------------
    layoutAsFlexbox   ? : boolean;
    stackVertically   ? : boolean;
    stackHorizontally ? : boolean;

    // Grid --------------------------------------------------------------------
    layoutAsGrid    ? : boolean;
    columns         ? : string;

    // Common ------------------------------------------------------------------
    gap             ? : SpacingTypes;

    // SPACING =================================================================
    // Margin ------------------------------------------------------------------
    margin                 ? : SpacingTypes;
    horizontalMargin       ? : SpacingTypes;
    verticalMargin         ? : SpacingTypes;

    marginTop              ? : SpacingTypes;
    marginRight            ? : SpacingTypes;
    marginBottom           ? : SpacingTypes;
    marginLeft             ? : SpacingTypes;

    // Padding -----------------------------------------------------------------
    padding                ? : SpacingTypes;
    horizontalPadding      ? : SpacingTypes;
    verticalPadding        ? : SpacingTypes;

    paddingTop             ? : SpacingTypes;
    paddingRight           ? : SpacingTypes;
    paddingBottom          ? : SpacingTypes;
    paddingLeft            ? : SpacingTypes;

    // ALIGNMENT ===============================================================
    horizontallyCentreThis ? : boolean;
    horizontallyCenterThis ? : boolean;
    verticallyCentreItems  ? : boolean;
    verticallyCenterItems  ? : boolean;
    pushItemsToEnds        ? : boolean;
    isFullWidth            ? : boolean;
    isFullHeight           ? : boolean;

    // RESPONSIVENESS ==========================================================
    hideOnMobile              ? : boolean;
    showOnlyOnMobile          ? : boolean;
    hideOnTabletPortrait      ? : boolean;
    showOnlyOnTabletPortrait  ? : boolean;
    hideOnTabletLandscape     ? : boolean;
    showOnlyOnTabletLandscape ? : boolean;
    hideOnDesktop             ? : boolean;
    showOnlyOnDesktop         ? : boolean;

    // TEXT ====================================================================
    weight ? : WeightTypes;

    // GENERAL =================================================================
    classNames ? : string[];
}

export interface CommonAndHTMLProps<T extends {}>
    extends CommonProps, Omit<HTMLProps<T>, "as" | "size" | "ref" | "shape"> {}

// Fictoan has two different types of event handlers, one for standard events and one for direct values
// This generic event handler type is a union of the two
export type FlexibleEventHandler<T, V = any> =
    | ((event: T) => void)
    | ((value: V) => void);

// prettier-ignore
export interface ElementProps<T extends {}> extends CommonProps, Omit<HTMLProps<T>, "as" | "ref" | "shape"> {
    as        ? : ElementType;
    className ? : string;
    ariaLabel ? : string;
    onChange  ? : FlexibleEventHandler<FormEvent<T>, any>;
}
