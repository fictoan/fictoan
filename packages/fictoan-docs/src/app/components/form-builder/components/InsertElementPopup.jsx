import React from "react";

import { Div, Badge } from "fictoan-react";

export const InsertElementPopup = ({onAddElement}) => {
    return (
        <Div id="line-wrapper">
            <Badge
                id="insert-element-popup"
                size="micro" shape="curved"
                bgColour="green-light20" textColour="green-dark40" borderColour="green-dark40"
                onClick={onAddElement}
            >
                Add element
            </Badge>
        </Div>
    )
};
