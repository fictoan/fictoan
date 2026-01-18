// OTHER ===============================================================================================================
import NotificationsDocs from "./page.client";
import { generateComponentMetadata } from "../component-metadata";

export async function generateMetadata() {
    return generateComponentMetadata("notifications");
}

export default function Page() {
    return <NotificationsDocs />;
}
