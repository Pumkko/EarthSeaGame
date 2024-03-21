import { useNavigate } from "@solidjs/router";
import StartingMenuButton from "./components/StartingMenuButton";
import Routes from "@lib/Routes";
import PageTitle from "@components/PageTitle";
import { msalInstance, loginRequest } from "@lib/msalConfig";

export default function StartingMenu() {
    const navigate = useNavigate();

    const onCreateOrManageLobby = async () => {
        await msalInstance.initialize();
        msalInstance
            .loginPopup(loginRequest)
            .then((loginResponse) => {
                console.log("id_token acquired at: " + new Date().toString());
                console.log(loginResponse);

                if (msalInstance.getActiveAccount()) {
                    console.log("Alles gut");
                }
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
                <StartingMenuButton onclick={onCreateOrManageLobby}>My Lobby</StartingMenuButton>
            </div>
        </div>
    );
}
