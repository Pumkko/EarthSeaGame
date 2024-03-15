import { GameLobby } from "@lib/schemas/GameLobbySchema";
import { useLocation } from "@solidjs/router";

export default function ManageLobbyOptions() {
    const { state } = useLocation<GameLobby>();

    return (
        <div>
            <h1>Invite your friends</h1>
            <div>{state?.earthNationInviteCode}</div>
            <div>{state?.seaNationInviteCode}</div>
            <div>{state?.easternIslandInviteCode}</div>
        </div>
    );
}
