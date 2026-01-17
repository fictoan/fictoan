// OTHER ===============================================================================================================
import SkeletonDocs from "./page.client";
import { generateComponentMetadata } from "../component-metadata";

export async function generateMetadata() {
    return generateComponentMetadata("skeleton");
}

const Page = () => {
    return <SkeletonDocs />;
}

export default Page;
