// OTHER ===============================================================================================================
import ButtonGroupDocs from "./page.client";
import { generateComponentMetadata } from "../component-metadata";

export async function generateMetadata() {
    return generateComponentMetadata("button-group");
}

const Page = () => {
    return <ButtonGroupDocs />;
}

export default Page;
