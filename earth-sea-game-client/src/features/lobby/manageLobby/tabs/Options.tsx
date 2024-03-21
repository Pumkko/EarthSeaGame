import { QueryKeys } from "@lib/QueryKeys";
import { GameLobby } from "@lib/schemas/GameLobbySchema";
import { createQuery } from "@tanstack/solid-query";

export default function ManageLobbyOptions() {
    const query = createQuery<GameLobby | null>(() => ({
        queryKey: QueryKeys.lobby,
    }));

    return (
        <div>
            <h1>Invite your friends</h1>
            <div>Earth Nation Code : {query.data?.earthNation.inviteCode}</div>
            <div>Sea Nation Code : {query.data?.seaNation.inviteCode}</div>
            <div>Eastern Island Code : {query.data?.easternIsland.inviteCode}</div>
        </div>
    );
}
