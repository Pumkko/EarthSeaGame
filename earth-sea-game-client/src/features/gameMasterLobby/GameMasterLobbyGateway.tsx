import { QueryKeys } from "@lib/QueryClient";
import Routes from "@lib/Routes";
import { Navigate } from "@solidjs/router";
import { createQuery } from "@tanstack/solid-query";
import { Show } from "solid-js";

export default function GameMasterLobbyGateway() {
    const query = createQuery(() => ({
        queryKey: QueryKeys.gameMasterLobby,
    }));

    return (
        <>
            <Show when={query.isSuccess && !!query.data}>
                <Navigate href={Routes.gameMasterLobby.root} />
            </Show>
            <Show when={query.isSuccess && !query.data}>
                <Navigate href={Routes.gameMasterLobby.createLobby} />
            </Show>
        </>
    );
}
