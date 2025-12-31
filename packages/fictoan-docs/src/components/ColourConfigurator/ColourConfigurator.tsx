"use client";

// REACT CORE ==========================================================================================================
import React, { useState, useCallback, useEffect } from "react";

// CAROUSEL ============================================================================================================
import useEmblaCarousel from "embla-carousel-react";

// UI ==================================================================================================================
import {
    Card,
    Text,
    Div,
    OptionCard,
    OptionCardsGroup,
    CodeBlock,
    FictoanColours,
    type OpacityTypes,
} from "fictoan-react";

// STYLES ==============================================================================================================
import "./colour-configurator.css";

// TYPES ===============================================================================================================
interface ColourCarouselProps {
    children : React.ReactNode;
    label    : string;
}

// COLOUR CAROUSEL COMPONENT ///////////////////////////////////////////////////////////////////////////////////////////
const ColourCarousel : React.FC<ColourCarouselProps> = ({ children, label }) => {
    const [emblaRef, emblaApi] = useEmblaCarousel({
        dragFree      : true,
        align         : "start",
        containScroll : "trimSnaps",
    });

    const [canScrollPrev, setCanScrollPrev] = useState(false);
    const [canScrollNext, setCanScrollNext] = useState(false);

    const onSelect = useCallback(() => {
        if (!emblaApi) return;
        setCanScrollPrev(emblaApi.canScrollPrev());
        setCanScrollNext(emblaApi.canScrollNext());
    }, [emblaApi]);

    useEffect(() => {
        if (!emblaApi) return;
        onSelect();
        emblaApi.on("select", onSelect);
        emblaApi.on("reInit", onSelect);
        emblaApi.on("scroll", onSelect);
        return () => {
            emblaApi.off("select", onSelect);
            emblaApi.off("reInit", onSelect);
            emblaApi.off("scroll", onSelect);
        };
    }, [emblaApi, onSelect]);

    return (
        <Div className="colour-carousel-section">
            <Text weight="600" marginBottom="none">
                {label}
            </Text>

            <Div className="colour-carousel" ref={emblaRef}>
                {children}
                {canScrollPrev && <Div className="carousel-fade carousel-fade-left" />}
                {canScrollNext && <Div className="carousel-fade carousel-fade-right" />}
            </Div>
        </Div>
    );
};

// MAIN COMPONENT //////////////////////////////////////////////////////////////////////////////////////////////////////
export const ColourConfigurator : React.FC = () => {
    const [selectedColour, setSelectedColour] = useState("");
    const [selectedLuminance, setSelectedLuminance] = useState("");
    const [selectedOpacity, setSelectedOpacity] = useState<OpacityTypes | "">("");

    const alphaLevels : OpacityTypes[] = ["0", "5", "10", "20", "30", "40", "50", "60", "70", "80", "90"];
    const shadeLevels = [10, 20, 30, 40, 50, 60, 70, 80, 90];

    // COMPUTE THE CARD'S BACKGROUND COLOR /////////////////////////////////////////////////////////////////////////////
    const computedValues = React.useMemo(() => {
        // When transparent is selected with luminance or opacity
        if (selectedColour === "transparent" && (selectedLuminance || selectedOpacity)) {
            return {
                displayText : "Oh, Mr. Smarty-pants!",
                bgColour    : "transparent",
                bgOpacity   : undefined,
            };
        }

        if (!selectedColour) {
            return {
                displayText : "Select a colour",
                bgColour    : "",
                bgOpacity   : undefined,
            };
        }

        // Build the bgColour (colour + optional luminance)
        const bgColour = selectedLuminance
            ? `${selectedColour}-${selectedLuminance}`
            : selectedColour;

        // Build display text showing the new API
        let displayText = bgColour;
        if (selectedOpacity) {
            displayText = `bgColour="${bgColour}" bgOpacity="${selectedOpacity}"`;
        }

        return {
            displayText,
            bgColour,
            bgOpacity : (selectedOpacity || undefined) as OpacityTypes | undefined,
        };
    }, [selectedColour, selectedLuminance, selectedOpacity]);

    return (
        <Div className="colour-configurator">
            {/* DEMO COMPONENT ///////////////////////////////////////////////////////////////////////////////////////// */}
            <Div
                className="configurator-preview"
                padding="small"
                shape="rounded"
                data-centered-children
            >
                <Text weight="600" textColour="black" marginBottom="micro">
                    {computedValues.displayText}
                </Text>

                <Card
                    verticalPadding="small"
                    horizontalPadding="micro"
                    bgColour={computedValues.bgColour}
                    bgOpacity={computedValues.bgOpacity}
                >
                    <CodeBlock withSyntaxHighlighting language="jsx" showCopyButton>
                        {[
                            `/* Example use */`,
                            `<Card${computedValues.bgColour ? ` bgColour="${computedValues.bgColour}"` : ""}${computedValues.bgOpacity ? ` bgOpacity="${computedValues.bgOpacity}"` : ""}>`,
                            "    Your content here",
                            "</Card>",
                        ].join("\n")}
                    </CodeBlock>
                </Card>
                <Div className="gradient-bg" />
            </Div>

            {/* CAROUSEL SECTIONS ////////////////////////////////////////////////////////////////////////////////////// */}
            <Div className="colour-carousel-wrapper">
                {/* STEP 1 — COLOUR */}
                <ColourCarousel label="First, pick a colour">
                    <OptionCardsGroup
                        showTickIcon
                        onSelectionChange={(selectedIds) => {
                            const colorId = Array.from(selectedIds)[0];
                            if (colorId) {
                                const colorIndex = colorId.split("-")[1];
                                setSelectedColour(FictoanColours[parseInt(colorIndex)]);
                            } else {
                                setSelectedColour("");
                            }
                        }}
                    >
                        {FictoanColours.map((colour, index) => (
                            <OptionCard
                                key={colour}
                                id={`colour-${index}`}
                                padding="nano"
                                shape="rounded"
                            >
                                <Div
                                    className="colour-indicator"
                                    shape="rounded"
                                    bgColour={colour}
                                    marginBottom="nano"
                                />
                                <Text align="centre" size="small">{colour}</Text>
                            </OptionCard>
                        ))}
                    </OptionCardsGroup>
                </ColourCarousel>

                {/* STEP 2 — LUMINANCE */}
                <ColourCarousel label="...then, luminance">
                    <OptionCardsGroup
                        showTickIcon
                        onSelectionChange={(selectedIds) => {
                            const luminanceId = Array.from(selectedIds)[0];
                            if (luminanceId) {
                                setSelectedLuminance(luminanceId);
                            } else {
                                setSelectedLuminance("");
                            }
                        }}
                    >
                        {/* Light shades */}
                        {shadeLevels.map((level) => (
                            <OptionCard
                                key={`light${level}`}
                                id={`light${level}`}
                                padding="nano"
                                shape="rounded"
                            >
                                <Div
                                    className="colour-indicator"
                                    shape="rounded"
                                    borderColour="slate-dark10"
                                    borderOpacity="40"
                                    bgColour={selectedColour ? `${selectedColour}-light${level}` : "transparent"}
                                    marginBottom="nano"
                                />
                                <Text align="centre" size="small">light{level}</Text>
                            </OptionCard>
                        ))}

                        {/* Dark shades */}
                        {shadeLevels.map((level) => (
                            <OptionCard
                                key={`dark${level}`}
                                id={`dark${level}`}
                                padding="nano"
                                shape="rounded"
                            >
                                <Div
                                    className="colour-indicator"
                                    shape="rounded"
                                    borderColour="slate-dark10"
                                    borderOpacity="40"
                                    bgColour={selectedColour ? `${selectedColour}-dark${level}` : "transparent"}
                                    marginBottom="nano"
                                />
                                <Text align="centre" size="small">dark{level}</Text>
                            </OptionCard>
                        ))}
                    </OptionCardsGroup>
                </ColourCarousel>

                {/* STEP 3 — OPACITY */}
                <ColourCarousel label="...finally, opacity">
                    <OptionCardsGroup
                        showTickIcon
                        onSelectionChange={(selectedIds) => {
                            const opacityId = Array.from(selectedIds)[0];
                            if (opacityId) {
                                const levelIndex = parseInt(opacityId.split("-")[1]);
                                setSelectedOpacity(alphaLevels[levelIndex]);
                            } else {
                                setSelectedOpacity("");
                            }
                        }}
                    >
                        {alphaLevels.map((level, index) => (
                            <OptionCard
                                key={level}
                                id={`level-${index}`}
                                padding="nano"
                                shape="rounded"
                            >
                                <Div
                                    className="colour-indicator"
                                    shape="rounded"
                                    borderColour="slate-dark10"
                                    borderOpacity="40"
                                    bgColour={selectedColour || "transparent"}
                                    bgOpacity={selectedColour ? level : undefined}
                                    marginBottom="nano"
                                />
                                <Text align="centre" size="small">{level}</Text>
                            </OptionCard>
                        ))}
                    </OptionCardsGroup>
                </ColourCarousel>
            </Div>
        </Div>
    );
};
