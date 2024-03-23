import { Show, useContext } from "solid-js";
import { PlayerLobbyContext } from "../PlayerLobbyContext";
import JoinGame from "../joinGame/JoinGame";
export default function PlayerLobbyHome() {
    const context = useContext(PlayerLobbyContext)!;

    // No Idea why but using Switch and Match heres breaks with the following error: Cannot read properties of undefined (reading 'when')
    return (
        <>
            <Show when={!context.currentGame()}>
                <JoinGame />
            </Show>
            <Show when={!!context.currentGame()}>
                <div>Welcome to your game</div>
            </Show>
        </>
    );
}
