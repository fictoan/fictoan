// OTHER ===============================================================================================================
import MeterDocs from "./page.client";
import { generateComponentMetadata } from "../component-metadata";

export async function generateMetadata() {
    return generateComponentMetadata("meter");
}

export default function Page() {
    return <MeterDocs />;
}
