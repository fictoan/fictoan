// OTHER ===============================================================================================================
import ToastDocs from "./page.client";
import { generateComponentMetadata } from "../component-metadata";

export async function generateMetadata() {
    return generateComponentMetadata("toast");
}

export default function Page() {
    return <ToastDocs />;
}
