// OTHER ===============================================================================================================
import ModalDocs from "./page.client";
import { generateComponentMetadata } from "../component-metadata";

export async function generateMetadata() {
    return generateComponentMetadata("modal");
}

export default function Page() {
    return <ModalDocs />;
}
