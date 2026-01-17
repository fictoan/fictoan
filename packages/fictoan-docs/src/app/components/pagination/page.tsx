// OTHER ===============================================================================================================
import PaginationDocs from "./page.client";
import { generateComponentMetadata } from "../component-metadata";

export async function generateMetadata() {
    return generateComponentMetadata("pagination");
}

const Page = () => {
    return <PaginationDocs />;
}

export default Page;
