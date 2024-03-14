import { GameLobby } from "@lib/schemas/GameLobbySchema";
import { A, RouteSectionProps } from "@solidjs/router";
import Routes from "@lib/Routes";

export interface ManageLobbyProps {
    lobby: GameLobby;
}

export default function ManageLobby(props: RouteSectionProps) {
    return (
        <div class="h-screen bg-cover bg-center bg-rocket text-white">
            Hello from root
            <A replace={true} href={Routes.myLobby.root}>
                Option
            </A>
            <A replace={true} href={Routes.myLobby.spyChat}>
                SpyChat
            </A>
            <A replace={true} href={Routes.myLobby.teamsChat}>
                TeamsChat
            </A>
            {props.children}
        </div>
    );
}
