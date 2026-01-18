// OTHER ===============================================================================================================
import TabsDocs from "./page.client";
import { generateComponentMetadata } from "../component-metadata";

export async function generateMetadata() {
    return generateComponentMetadata("tabs");
}

export default function Page() {
    return <TabsDocs />;
}
