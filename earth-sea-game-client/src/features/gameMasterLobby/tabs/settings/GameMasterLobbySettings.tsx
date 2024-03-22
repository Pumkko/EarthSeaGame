import { QueryKeys } from "@lib/QueryKeys";
import { GameMasterLobby } from "@lib/schemas/GameLobbySchema";
import { createQuery } from "@tanstack/solid-query";
import { Show, lazy } from "solid-js";

const CreateLobby = lazy(() => import("./CreateLobby"));

export default function GameMasterLobbySettings() {
    const query = createQuery<GameMasterLobby | null>(() => ({
        queryKey: QueryKeys.gameMasterLobby,
    }));

    // No Idea why but using Switch and Match heres breaks with the following error: Cannot read properties of undefined (reading 'when')
    return (
        <>
            <Show when={query.isSuccess && !query.data}>
                <CreateLobby />
            </Show>
            <Show when={query.isSuccess && !!query.data}>
                <div>
                    <h1>Invite your friends</h1>
                    <div>Earth Nation Code : {query.data?.gameLobby.earthNation.inviteCode}</div>
                    <div>Sea Nation Code : {query.data?.gameLobby.seaNation.inviteCode}</div>
                    <div>Eastern Island Code : {query.data?.gameLobby.easternIsland.inviteCode}</div>
                </div>
            </Show>
        </>
    );
}
