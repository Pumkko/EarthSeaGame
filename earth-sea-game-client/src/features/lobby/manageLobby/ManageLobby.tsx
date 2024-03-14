import { GameLobby } from "@lib/schemas/GameLobbySchema";
import { A, RouteSectionProps } from "@solidjs/router";
import Routes from "@lib/Routes";

export interface ManageLobbyProps {
    lobby: GameLobby;
}

export default function ManageLobby(props: RouteSectionProps) {
    return (
        <div class="h-screen bg-cover bg-center bg-rocket">
            Hello from root
            <A href={Routes.myLobby.root}>Option</A>
            <A href={Routes.myLobby.spyChat}>SpyChat</A>
            <A href={Routes.myLobby.teamsChat}>TeamsChat</A>
            {props.children}
        </div>
    );
}
