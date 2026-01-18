// OTHER ===============================================================================================================
import ListBoxDocs from "./page.client";
import { generateComponentMetadata } from "../component-metadata";

export async function generateMetadata() {
    return generateComponentMetadata("list-box");
}

export default function Page() {
    return <ListBoxDocs />;
}
