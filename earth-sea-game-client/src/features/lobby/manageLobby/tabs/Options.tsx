import { QueryKeys } from "@lib/QueryKeys";
import { GameLobby } from "@lib/schemas/GameLobbySchema";
import { createQuery } from "@tanstack/solid-query";
import { Show, lazy } from "solid-js";

const CreateLobby = lazy(() => import("../../createLobby/CreateLobby"));

export default function ManageLobbyOptions() {
    const query = createQuery<GameLobby | null>(() => ({
        queryKey: QueryKeys.lobby,
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
                    <div>Earth Nation Code : {query.data?.earthNation.inviteCode}</div>
                    <div>Sea Nation Code : {query.data?.seaNation.inviteCode}</div>
                    <div>Eastern Island Code : {query.data?.easternIsland.inviteCode}</div>
                </div>
            </Show>
        </>
    );
}
