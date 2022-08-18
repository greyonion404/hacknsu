import { FullPage } from "../styled/FullPage";
import { Text } from "../styled/Text";
import TopBar from "./TopBar";

export default function Page({ profile, children }) {
    return (
        <FullPage>
            <TopBar profile={profile}/>
            {children}
        </FullPage>
    )
}