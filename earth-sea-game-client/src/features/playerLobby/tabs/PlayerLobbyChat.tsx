import { Show, useContext } from "solid-js";
import { PlayerLobbyContext } from "../PlayerLobbyContext";
import PlayerChat from "./playerChat/PlayerChat";

export default function PlayerLobbyChat() {
    const context = useContext(PlayerLobbyContext);

    const currentNation = () => context?.currentGame()?.nation;

    return (
        <Show when={!!currentNation()}>
            <div class="grid grid-cols-3 h-full">
                <PlayerChat currentNation={currentNation()!} recipient={"GameMaster"} />
                <div class="border-x-2">Two</div>
                <div>Three</div>
            </div>
        </Show>
    );
}
