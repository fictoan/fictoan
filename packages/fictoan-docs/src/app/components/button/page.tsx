// OTHER ===============================================================================================================
import ButtonDocs from "./page.client";
import { generateComponentMetadata } from "../component-metadata";

export async function generateMetadata() {
    return generateComponentMetadata("button");
}

const Page = () => {
    return <ButtonDocs />;
}

export default Page;
