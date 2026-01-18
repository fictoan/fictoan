// OTHER ===============================================================================================================
import RangeDocs from "./page.client";
import { generateComponentMetadata } from "../component-metadata";

export async function generateMetadata() {
    return generateComponentMetadata("range");
}

export default function Page() {
    return <RangeDocs />;
}
