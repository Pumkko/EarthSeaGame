import PageTitle from "@components/PageTitle";
import { loginRequest, msalInstance } from "@lib/AuthConfig";
import { QueryKeys } from "@lib/QueryClient";
import Routes from "@lib/Routes";
import { useNavigate } from "@solidjs/router";
import { useQueryClient } from "@tanstack/solid-query";
import { useLanguage } from "../LanguageProvider";
import StartingMenuButton from "./components/StartingMenuButton";
export default function StartingMenu() {
    const navigate = useNavigate();
    const language = useLanguage();
    const queryClient = useQueryClient();

    const onCreateOrManageLobby = async () => {
        try {
            const loginResponse = await msalInstance.loginPopup(loginRequest);
            msalInstance.setActiveAccount(loginResponse.account);
            queryClient.removeQueries({
                queryKey: QueryKeys.gameMasterLobby,
            });
            navigate(Routes.gameMasterLobby.gateway);
        } catch (e) {
            console.error(e);
        }
    };

    const onJoinLobby = () => {
        queryClient.removeQueries({
            queryKey: QueryKeys.playerLobby,
        });
        navigate(Routes.playerLobby.gateway);
    };

    return (
        <div class="bg-cover h-screen flex items-center p-8 justify-between flex-col bg-clemenceau_cv">
            <PageTitle>{language().gameTitle()}</PageTitle>
            <div class="flex gap-8">
                <StartingMenuButton onClick={onJoinLobby}>
                    {language().startingMenu.joinGameButton()}
                </StartingMenuButton>
                <StartingMenuButton onclick={onCreateOrManageLobby}>
                    {language().startingMenu.myGameButton()}
                </StartingMenuButton>
            </div>
        </div>
    );
}
