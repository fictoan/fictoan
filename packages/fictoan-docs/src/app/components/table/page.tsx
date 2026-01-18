// OTHER ===============================================================================================================
import TableDocs from "./page.client";
import { generateComponentMetadata } from "../component-metadata";

export async function generateMetadata() {
    return generateComponentMetadata("table");
}

export default function Page() {
    return <TableDocs />;
}
