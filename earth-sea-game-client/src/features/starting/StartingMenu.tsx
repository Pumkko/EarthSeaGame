import PageTitle from "@components/PageTitle";
import { loginRequest, msalInstance } from "@lib/MsalConfig";
import { QueryKeys } from "@lib/QueryClient";
import Routes from "@lib/Routes";
import { useNavigate } from "@solidjs/router";
import { useQueryClient } from "@tanstack/solid-query";
import StartingMenuButton from "./components/StartingMenuButton";
export default function StartingMenu() {
    const navigate = useNavigate();

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
        navigate(Routes.playerLobby.root);
    };

    return (
        <div class="bg-cover h-screen flex items-center p-8 justify-between flex-col bg-clemenceau_cv">
            <PageTitle>Between Earth and Seas</PageTitle>
            <div class="flex gap-8">
                <StartingMenuButton onClick={onJoinLobby}>Join Lobby</StartingMenuButton>
                <StartingMenuButton onclick={onCreateOrManageLobby}>My Lobby</StartingMenuButton>
            </div>
        </div>
    );
}
