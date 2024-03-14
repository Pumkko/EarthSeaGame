import { GameLobby } from "@lib/schemas/GameLobbySchema";
import { A, RouteSectionProps, useLocation } from "@solidjs/router";
import Routes from "@lib/Routes";

export interface ManageLobbyProps {
    lobby: GameLobby;
}

export default function ManageLobby(props: RouteSectionProps) {
    const { state } = useLocation<GameLobby>();

    return (
        <div class="h-screen bg-cover bg-center bg-rocket text-white">
            Hello from root {state?.lobbyName}
            <A replace={true} href={Routes.myLobby.root} state={state}>
                Option
            </A>
            <A replace={true} href={Routes.myLobby.spyChat} state={state}>
                SpyChat
            </A>
            <A replace={true} href={Routes.myLobby.teamsChat} state={state}>
                TeamsChat
            </A>
            {props.children}
        </div>
    );
}
