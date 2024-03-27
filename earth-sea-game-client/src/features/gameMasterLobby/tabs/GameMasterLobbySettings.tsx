import Routes from "@lib/Routes";
import { Navigate } from "@solidjs/router";
import { Show, useContext } from "solid-js";
import { GameMasterLobbyContext } from "../GameMasterLobbyContext";

export default function GameMasterLobbySettings() {
    const context = useContext(GameMasterLobbyContext)!;

    // No Idea why but using Switch and Match heres breaks with the following error: Cannot read properties of undefined (reading 'when')
    return (
        <>
            <Show when={context.query.isSuccess && !context.query.data}>
                <Navigate href={Routes.gameMasterLobby.createLobby} />
            </Show>
            <Show when={context.query.isSuccess && !!context.query.data}>
                <div>
                    <h1>Invite your friends</h1>
                    <div>Game Master: {context.query.data?.gameLobby.gameMaster}</div>
                    <div>Earth Nation Code : {context.query.data?.gameLobby.earthNation.inviteCode}</div>
                    <div>Sea Nation Code : {context.query.data?.gameLobby.seaNation.inviteCode}</div>
                    <div>Eastern Island Code : {context.query.data?.gameLobby.easternIsland.inviteCode}</div>

                    <Show when={context.signalRConnection()}>
                        <button
                            onClick={() => {
                                context.signalRConnection()?.send("Echo", "master", "hello");
                            }}
                        >
                            Click Me
                        </button>
                    </Show>
                </div>
            </Show>
        </>
    );
}
