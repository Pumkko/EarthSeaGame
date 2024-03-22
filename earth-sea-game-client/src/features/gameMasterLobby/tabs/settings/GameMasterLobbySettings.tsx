import { Show, lazy, useContext } from "solid-js";
import { GameMasterLobbyContext } from "../../GameMasterLobbyContext";

const CreateLobby = lazy(() => import("./CreateLobby"));

export default function GameMasterLobbySettings() {
    const context = useContext(GameMasterLobbyContext)!;

    // No Idea why but using Switch and Match heres breaks with the following error: Cannot read properties of undefined (reading 'when')
    return (
        <>
            <Show when={context.query.isSuccess && !context.query.data}>
                <CreateLobby />
            </Show>
            <Show when={context.query.isSuccess && !!context.query.data}>
                <div>
                    <h1>Invite your friends</h1>
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
