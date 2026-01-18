// OTHER ===============================================================================================================
import InputFieldDocs from "./page.client";
import { generateComponentMetadata } from "../component-metadata";

export async function generateMetadata() {
    return generateComponentMetadata("input-field");
}

export default function Page() {
    return <InputFieldDocs />;
}
