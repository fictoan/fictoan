// OTHER ===============================================================================================================
import DrawerDocs from "./page.client";
import { generateComponentMetadata } from "../component-metadata";

export async function generateMetadata() {
    return generateComponentMetadata("drawer");
}

export default function Page() {
    return <DrawerDocs />;
}
