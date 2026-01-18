// OTHER ===============================================================================================================
import DividerDocs from "./page.client";
import { generateComponentMetadata } from "../component-metadata";

export async function generateMetadata() {
    return generateComponentMetadata("divider");
}

export default function Page() {
    return <DividerDocs />;
}
