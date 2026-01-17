// OTHER ===============================================================================================================
import RadioTabGroupDocs from "./page.client";
import { generateComponentMetadata } from "../component-metadata";

export async function generateMetadata() {
    return generateComponentMetadata("radio-tab-group");
}

const Page = () => {
    return <RadioTabGroupDocs />;
}

export default Page;
