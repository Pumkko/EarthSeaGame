import { useNavigate } from "@solidjs/router";
import StartingMenuButton from "./components/StartingMenuButton";
import Routes from "@lib/Routes";

export default function StartingMenu() {
    const navigate = useNavigate();

    const onMyLobby = () => {
        navigate(Routes.myLobby);
    };

    return (
        <div class="bg-cover h-screen flex items-center p-8 justify-between flex-col bg-clemenceau_cv">
            <h1 class="text-9xl text-white">Between Earth and Seas</h1>
            <div class="flex gap-8">
                <StartingMenuButton>Join Lobby</StartingMenuButton>
                <StartingMenuButton onclick={onMyLobby}>My Lobby</StartingMenuButton>
            </div>
        </div>
    );
}
