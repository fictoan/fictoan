// REACT CORE ==========================================================================================================
import Link from "next/link";

// UI ==================================================================================================================
import { Div, Heading2 } from "fictoan-react";

const NotFound = () => {
    return (
        <Div>
            <Heading2>Not found</Heading2>
            <p>Could not find requested resource</p>
            <Link href="/">Return Home</Link>
        </Div>
    );
}

export default NotFound;