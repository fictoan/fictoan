// OTHER ===============================================================================================================
import FormDocs from "./page.client";
import { generateComponentMetadata } from "../component-metadata";

export async function generateMetadata() {
    return generateComponentMetadata("form");
}

export default function Page() {
    return <FormDocs />;
}
