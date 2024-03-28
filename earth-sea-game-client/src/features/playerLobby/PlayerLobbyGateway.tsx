import { JoinWithTokenQueryData, QueryKeys } from "@lib/QueryClient";
import Routes from "@lib/Routes";
import { Navigate } from "@solidjs/router";
import { createQuery } from "@tanstack/solid-query";
import { Show } from "solid-js";

export default function GameMasterLobbyGateway() {
    const playerGame = createQuery<JoinWithTokenQueryData>(() => ({
        queryKey: QueryKeys.playerLobby,
    }));

    return (
        <>
            <Show when={playerGame.isSuccess && !!playerGame.data}>
                <Navigate href={Routes.playerLobby.root} />
            </Show>
            <Show when={playerGame.isSuccess && !playerGame.data}>
                <Navigate href={Routes.playerLobby.joinLobby} />
            </Show>
        </>
    );
}
