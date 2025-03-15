// Footer.tsx
import React, { useEffect, useRef, useState } from "react";
import { Footer, Portion, Row, Text } from "fictoan-react";
import "./footer.css";

export const SiteFooter = () => {
    const [isVisible, setIsVisible] = useState(false);
    const footerRef = useRef(null);

    const currentYear = new Date().getFullYear();

    useEffect(() => {
        const OVERSCROLL_THRESHOLD = 50; // Amount of overscroll needed to show footer

        const handleScroll = () => {
            const scrollTop = window.scrollY;
            const windowHeight = window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight;
            const maxScrollTop = documentHeight - windowHeight;

            // Calculate how much we've overscrolled past the bottom
            const overscrollAmount = scrollTop - maxScrollTop;

            if (overscrollAmount >= OVERSCROLL_THRESHOLD && !isVisible) {
                setIsVisible(true);
            } else if (overscrollAmount < OVERSCROLL_THRESHOLD && isVisible) {
                setIsVisible(false);
            }
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, [isVisible]);

    return (
        <div
            ref={footerRef}
            className={`sliding-footer ${isVisible ? "visible" : ""}`}
        >
            <Footer verticalPadding="small">
                <Row horizontalPadding="medium" marginBottom="none">
                    <Portion>
                        <Text textColour="white">&copy;{currentYear} Fictoan</Text>
                    </Portion>
                </Row>
            </Footer>
        </div>
    );
};
