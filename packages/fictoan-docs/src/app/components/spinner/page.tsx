// OTHER ===============================================================================================================
import SpinnerDocs from "./page.client";
import { generateComponentMetadata } from "../component-metadata";

export async function generateMetadata() {
    return generateComponentMetadata("spinner");
}

export default function Page() {
    return <SpinnerDocs />;
}
