// OTHER ===============================================================================================================
import CardDocs from "./page.client";
import { generateComponentMetadata } from "../component-metadata";

export async function generateMetadata() {
    return generateComponentMetadata("card");
}

export default function Page() {
    return <CardDocs />;
}
