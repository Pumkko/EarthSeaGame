import { BrowserAuthError } from "@azure/msal-browser";
import { QueryKeys } from "@lib/QueryClient";
import Routes from "@lib/Routes";
import { Navigate } from "@solidjs/router";
import { createQuery } from "@tanstack/solid-query";
import { Match, Switch } from "solid-js";

export default function GameMasterLobbyGateway() {
    const query = createQuery(() => ({
        queryKey: QueryKeys.gameMasterLobby,
        throwOnError: (error) => {
            if (error instanceof BrowserAuthError) {
                return false;
            }
            return true;
        },
    }));

    return (
        <Switch>
            <Match when={query.isSuccess && !!query.data}>
                <Navigate href={Routes.gameMasterLobby.root} />
            </Match>
            <Match when={query.isSuccess && !query.data}>
                <Navigate href={Routes.gameMasterLobby.createLobby} />
            </Match>
            <Match when={query.isError && query.error instanceof BrowserAuthError}>
                <Navigate href={Routes.startingMenu} />
            </Match>
        </Switch>
    );
}
