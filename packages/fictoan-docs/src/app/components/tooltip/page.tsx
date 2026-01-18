// OTHER ===============================================================================================================
import TooltipDocs from "./page.client";
import { generateComponentMetadata } from "../component-metadata";

export async function generateMetadata() {
    return generateComponentMetadata("tooltip");
}

export default function Page() {
    return <TooltipDocs />;
}
