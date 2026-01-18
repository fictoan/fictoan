// OTHER ===============================================================================================================
import ProgressBarDocs from "./page.client";
import { generateComponentMetadata } from "../component-metadata";

export async function generateMetadata() {
    return generateComponentMetadata("progress-bar");
}

export default function Page() {
    return <ProgressBarDocs />;
}
