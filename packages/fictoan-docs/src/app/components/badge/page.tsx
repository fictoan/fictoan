// OTHER ===============================================================================================================
import BadgeDocs from "./page.client";
import { generateComponentMetadata } from "../component-metadata";

export async function generateMetadata() {
    return generateComponentMetadata("badge");
}

export default function Page() {
    return <BadgeDocs />;
}
