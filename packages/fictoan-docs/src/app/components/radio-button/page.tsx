// OTHER ===============================================================================================================
import RadioButtonDocs from "./page.client";
import { generateComponentMetadata } from "../component-metadata";

export async function generateMetadata() {
    return generateComponentMetadata("radio-button");
}

export default function Page() {
    return <RadioButtonDocs />;
}
