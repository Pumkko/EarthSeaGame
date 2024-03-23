import NavBarAnchor from "@components/NavBarAnchor";
import Routes from "@lib/Routes";
import { PlayerLobbyContextProvider } from "./PlayerLobbyContext";
import { RouteSectionProps } from "@solidjs/router";

export default function PlayerLobby(props: RouteSectionProps) {
    return (
        <PlayerLobbyContextProvider>
            <div class="h-screen bg-cover bg-center bg-rocket text-white flex flex-col">
                <div class="flex justify-center p-4 text-2xl border-b-2 ">
                    <NavBarAnchor href={Routes.playerLobby.root}>Home</NavBarAnchor>
                    <NavBarAnchor href={Routes.playerLobby.chat}>Chat</NavBarAnchor>
                </div>
                <div class="flex-grow overflow-auto">{props.children}</div>
            </div>
        </PlayerLobbyContextProvider>
    );
}
