import { FullPage } from "../styled/FullPage";
import BottomBar from "./BottomBar";
import TopBar from "./TopBar";

export default function Page({ profile, children }) {
    return (
        <FullPage>
            <TopBar profile={profile}/>
            {children}
            <BottomBar/>
        </FullPage>
    )
}