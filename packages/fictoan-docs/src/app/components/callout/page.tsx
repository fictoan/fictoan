// OTHER ===============================================================================================================
import CalloutDocs from "./page.client";
import { generateComponentMetadata } from "../component-metadata";

export async function generateMetadata() {
    return generateComponentMetadata("callout");
}

export default function Page() {
    return <CalloutDocs />;
}
