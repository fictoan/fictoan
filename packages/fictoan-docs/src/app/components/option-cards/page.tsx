// OTHER ===============================================================================================================
import OptionCardsDocs from "./page.client";
import { generateComponentMetadata } from "../component-metadata";

export async function generateMetadata() {
    return generateComponentMetadata("option-cards");
}

const Page = () => {
    return <OptionCardsDocs />;
}

export default Page;
