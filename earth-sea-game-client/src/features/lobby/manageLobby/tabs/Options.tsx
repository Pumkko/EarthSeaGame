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
            <div>{query.data?.earthNationInviteCode}</div>
            <div>{query.data?.seaNationInviteCode}</div>
            <div>{query.data?.easternIslandInviteCode}</div>
        </div>
    );
}
