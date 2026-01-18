// OTHER ===============================================================================================================
import AccordionDocs from "./page.client";
import { generateComponentMetadata } from "../component-metadata";

export async function generateMetadata() {
    return generateComponentMetadata("accordion");
}

export default function Page() {
    return <AccordionDocs />;
}
