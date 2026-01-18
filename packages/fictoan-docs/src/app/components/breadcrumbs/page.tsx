// OTHER ===============================================================================================================
import BreadcrumbsDocs from "./page.client";
import { generateComponentMetadata } from "../component-metadata";

export async function generateMetadata() {
    return generateComponentMetadata("breadcrumbs");
}

export default function Page() {
    return <BreadcrumbsDocs />;
}
