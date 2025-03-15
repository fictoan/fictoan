import React, { useState } from "react";
import {
    Element,
    Divider,
    Portion,
    Row,
    Heading1,
    Heading4,
    Text,
    Article,
    Card,
    Header,
    Button,
    RadioTabGroup,
    Checkbox,
    Select,
    Div,
CodeBlock
} from "fictoan-react";

const RowPortionConfigurator = () => {
    // Row state
    const [gutters, setGutters] = useState("small");
    const [horizontalPadding, setHorizontalPadding] = useState("medium");
    const [retainLayout, setRetainLayout] = useState(false);
    const [layout, setLayout] = useState("grid");

    // Portion states
    const [portions, setPortions] = useState([{
        desktopSpan         : "half",
        tabletLandscapeSpan : "half",
        tabletPortraitSpan  : "whole",
        mobileSpan          : "whole",
    }]);

    const spanOptions = [
        { label: "Select width", value: "0", disabled: true },
        { label: "1 column", value: "1" },
        { label: "2 — one-twelfth", value: "one-twelfth" },
        { label: "3 — one-eighth", value: "one-eighth" },
        { label: "4 — one-sixth", value: "one-sixth" },
        { label: "5 columns", value: "5" },
        { label: "6 — one-fourth", value: "one-fourth" },
        { label: "7 columns", value: "7" },
        { label: "8 — one-third", value: "one-third" },
        { label: "9 columns", value: "9" },
        { label: "10 — five-twelfth", value: "five-twelfth" },
        { label: "11 columns", value: "11" },
        { label: "12 — half", value: "half" },
        { label: "13 columns", value: "13" },
        { label: "14 — seven-twelfth", value: "seven-twelfth" },
        { label: "15 columns", value: "15" },
        { label: "16 — two-third", value: "two-third" },
        { label: "17 columns", value: "17" },
        { label: "18 — three-fourth", value: "three-fourth" },
        { label: "19 columns", value: "19" },
        { label: "20 — five-sixth", value: "five-sixth" },
        { label: "21 — seven-eighth", value: "seven-eighth" },
        { label: "22 — eleven-twelfth", value: "eleven-twelfth" },
        { label: "23 columns", value: "23" },
        { label: "24 — whole", value: "whole" }
    ];

    return (
        <Article id="page-component">

        </Article>
    );
};

export default RowPortionConfigurator;
