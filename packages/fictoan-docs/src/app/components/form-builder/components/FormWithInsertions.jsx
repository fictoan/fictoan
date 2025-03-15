import React, { useRef, useState, useCallback } from "react";
import { InsertElementPopup } from "./InsertElementPopup";
import { Form } from "fictoan-react";

export const FormWithInsertions = ({ children, spacing = "small", onAddElement }) => {
    const [activeGap, setActiveGap] = useState(-1);
    const formRef = useRef(null);

    const handleMouseMove = useCallback((e) => {
        if (!formRef.current) return;

        const formBounds = formRef.current.getBoundingClientRect();
        const mouseY = e.clientY - formBounds.top;
        const formItems = formRef.current.querySelectorAll('[data-form-item]');

        for (let i = 0; i < formItems.length - 1; i++) {
            const currentElement = formItems[i];
            const nextElement = formItems[i + 1];
            const currentRect = currentElement.getBoundingClientRect();
            const nextRect = nextElement.getBoundingClientRect();

            const gapMiddle = (currentRect.bottom + nextRect.top) / 2 - formBounds.top;

            if (Math.abs(mouseY - gapMiddle) < 20) {
                setActiveGap(i);
                return;
            }
        }

        setActiveGap(-1);
    }, []);

    return (
        <div
            ref={formRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={() => setActiveGap(-1)}
            className="form-insertions-wrapper"
        >
            <Form spacing={spacing}>
                {React.Children.map(children, (child, index) => (
                    <>
                        {child}
                        {activeGap === index && (
                            <div className="insertion-point">
                                <InsertElementPopup onAddElement={onAddElement} />
                            </div>
                        )}
                    </>
                ))}
            </Form>
        </div>
    );
};
