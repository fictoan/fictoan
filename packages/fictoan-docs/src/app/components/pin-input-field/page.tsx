// OTHER ===============================================================================================================
import PinInputFieldDocs from "./page.client";
import { generateComponentMetadata } from "../component-metadata";

export async function generateMetadata() {
    return generateComponentMetadata("pin-input-field");
}

const Page = () => {
    return <PinInputFieldDocs />;
}

export default Page;
