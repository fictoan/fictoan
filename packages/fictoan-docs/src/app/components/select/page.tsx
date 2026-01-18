// OTHER ===============================================================================================================
import SelectDocs from "./page.client";
import { generateComponentMetadata } from "../component-metadata";

export async function generateMetadata() {
    return generateComponentMetadata("select");
}

export default function Page() {
    return <SelectDocs />;
}
