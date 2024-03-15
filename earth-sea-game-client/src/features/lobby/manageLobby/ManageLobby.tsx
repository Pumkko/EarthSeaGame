import { GameLobby } from "@lib/schemas/GameLobbySchema";
import { A, RouteSectionProps, useLocation } from "@solidjs/router";
import Routes from "@lib/Routes";
import ManageLobbyAnchor from "./ManageLobbyAnchor";

export interface ManageLobbyProps {
    lobby: GameLobby;
}

export default function ManageLobby(props: RouteSectionProps) {
    const { state } = useLocation<GameLobby>();

    return (
        <div class="h-screen bg-cover bg-center bg-rocket text-white flex flex-col">
            <div class="flex justify-center p-4 text-2xl border-b-2 ">
                <ManageLobbyAnchor href={Routes.myLobby.root} state={state}>
                    Option
                </ManageLobbyAnchor>
                <ManageLobbyAnchor href={Routes.myLobby.spyChat}>SpyChat</ManageLobbyAnchor>
                <ManageLobbyAnchor href={Routes.myLobby.teamsChat}>TeamsChat</ManageLobbyAnchor>
            </div>
            <div class="flex-grow">{props.children}</div>
        </div>
    );
}
