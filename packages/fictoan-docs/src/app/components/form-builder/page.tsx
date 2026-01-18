// OTHER ===============================================================================================================
import FormBuilderDocs from "./page.client";
import { generateComponentMetadata } from "../component-metadata";

export async function generateMetadata() {
    return generateComponentMetadata("form-builder");
}

export default function Page() {
    return <FormBuilderDocs />;
}
