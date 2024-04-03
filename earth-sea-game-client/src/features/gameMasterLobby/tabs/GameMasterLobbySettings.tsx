import { useAuthenticatedGameMasterLobbyContext } from "../GameMasterLobbyContext";

export default function GameMasterLobbySettings() {
    const context = useAuthenticatedGameMasterLobbyContext();

    return (
        <>
            <div>
                <h1>Invite your friends</h1>
                <div>Game Master: {context.currentGame().gameMaster}</div>
                <div>Earth Nation Code : {context.currentGame().earthNation.inviteCode}</div>
                <div>Sea Nation Code : {context.currentGame().seaNation.inviteCode}</div>
                <div>Eastern Island Code : {context.currentGame().easternIsland.inviteCode}</div>
            </div>
        </>
    );
}
