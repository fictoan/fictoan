// OTHER ===============================================================================================================
import CheckboxDocs from "./page.client";
import { generateComponentMetadata } from "../component-metadata";

export async function generateMetadata() {
    return generateComponentMetadata("checkbox");
}

export default function Page() {
    return <CheckboxDocs />;
}
