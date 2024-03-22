import { GameLobby } from "@lib/schemas/GameLobbySchema";
import Routes from "@lib/Routes";
import ManageLobbyAnchor from "./ManageLobbyAnchor";
import { RouteSectionProps } from "@solidjs/router";
export interface ManageLobbyProps {
    lobby: GameLobby;
}

export default function ManageLobby(props: RouteSectionProps) {
    return (
        <div class="h-screen bg-cover bg-center bg-rocket text-white flex flex-col">
            <div class="flex justify-center p-4 text-2xl border-b-2 ">
                <ManageLobbyAnchor href={Routes.manageLobby.root}>Option</ManageLobbyAnchor>
                <ManageLobbyAnchor href={Routes.manageLobby.spyChat}>SpyChat</ManageLobbyAnchor>
                <ManageLobbyAnchor href={Routes.manageLobby.teamsChat}>TeamsChat</ManageLobbyAnchor>
            </div>
            <div class="flex-grow overflow-auto">{props.children}</div>
        </div>
    );
}
