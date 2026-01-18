// OTHER ===============================================================================================================
import SidebarDocs from "./page.client";
import { generateComponentMetadata } from "../component-metadata";

export async function generateMetadata() {
    return generateComponentMetadata("sidebar");
}

export default function Page() {
    return <SidebarDocs />;
}
