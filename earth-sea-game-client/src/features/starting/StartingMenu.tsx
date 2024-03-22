import { useNavigate } from "@solidjs/router";
import StartingMenuButton from "./components/StartingMenuButton";
import Routes from "@lib/Routes";
import PageTitle from "@components/PageTitle";
import { msalInstance, loginRequest } from "@lib/MsalConfig";
import { Show, createSignal } from "solid-js";

export default function StartingMenu() {
    const navigate = useNavigate();

    const [loadingLobby, setLoadingLobby] = createSignal();

    const onCreateOrManageLobby = async () => {
        setLoadingLobby(true);
        msalInstance
            .loginPopup(loginRequest)
            .then((loginResponse) => {
                msalInstance.setActiveAccount(loginResponse.account);
                navigate(Routes.manageLobby.root);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const onJoinLobby = () => {
        navigate(Routes.joinLobby);
    };

    return (
        <div class="bg-cover h-screen flex items-center p-8 justify-between flex-col bg-clemenceau_cv">
            <PageTitle>Between Earth and Seas</PageTitle>
            <div class="flex gap-8">
                <StartingMenuButton onClick={onJoinLobby}>Join Lobby</StartingMenuButton>
                <StartingMenuButton onclick={onCreateOrManageLobby}>
                    <Show when={loadingLobby()}>
                        <svg class="animate-spin ml-1 mr-3 h-7 w-7 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
                            <path
                                class="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            />
                        </svg>
                    </Show>
                    My Lobby
                </StartingMenuButton>
            </div>
        </div>
    );
}
