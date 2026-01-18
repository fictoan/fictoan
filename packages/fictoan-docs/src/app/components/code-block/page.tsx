// OTHER ===============================================================================================================
import CodeBlockDocs from "./page.client";
import { generateComponentMetadata } from "../component-metadata";

export async function generateMetadata() {
    return generateComponentMetadata("code-block");
}

export default function Page() {
    return <CodeBlockDocs />;
}
