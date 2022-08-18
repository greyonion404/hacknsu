import { FullPage } from "../styled/FullPage";
import { Text } from "../styled/Text";

export default function Page({ profile, children }) {
    return (
        <FullPage>
            <Text>{"It's a Page"}</Text>
            {children}
        </FullPage>
    )
}