import { GameLobby } from "@lib/schemas/GameLobbySchema";
import Routes from "@lib/Routes";

import { RouteSectionProps } from "@solidjs/router";
import NavBarAnchor from "@components/NavBarAnchor";
import { GameMasterLobbyContextProvider } from "./GameMasterLobbyContext";
export interface ManageLobbyProps {
    lobby: GameLobby;
}

export default function GameMasterLobby(props: RouteSectionProps) {
    return (
        <GameMasterLobbyContextProvider>
            <div class="h-screen bg-cover bg-center bg-rocket text-white flex flex-col">
                <div class="flex justify-center p-4 text-2xl border-b-2 ">
                    <NavBarAnchor href={Routes.manageLobby.root}>Option</NavBarAnchor>
                    <NavBarAnchor href={Routes.manageLobby.spyChat}>SpyChat</NavBarAnchor>
                    <NavBarAnchor href={Routes.manageLobby.teamsChat}>TeamsChat</NavBarAnchor>
                </div>
                <div class="flex-grow overflow-auto">{props.children}</div>
            </div>
        </GameMasterLobbyContextProvider>
    );
}
