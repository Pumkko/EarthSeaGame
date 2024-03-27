import { Show, useContext } from "solid-js";
import { PlayerLobbyContext } from "../PlayerLobbyContext";
import PlayerChat from "./playerChat/PlayerChat";

export default function PlayerLobbyChat() {
    const context = useContext(PlayerLobbyContext);

    const currentNation = () => context?.currentGame()?.nation;

    return (
        <Show when={!!currentNation() && !!context}>
            <div class="grid grid-cols-3 h-full">
                <PlayerChat chat={context!.teamsChat.gameMasterChat} currentNation={currentNation()!} recipient={"GameMaster"} />
                <Show when={currentNation() !== "EarthNation"}>
                    <PlayerChat chat={context!.teamsChat.earthNationChat} currentNation={currentNation()!} recipient={"EarthNation"} />
                </Show>
                <Show when={currentNation() !== "SeaNation"}>
                    <PlayerChat chat={context!.teamsChat.seaNationChat} currentNation={currentNation()!} recipient={"SeaNation"} />
                </Show>
                <Show when={currentNation() !== "EasternIsland"}>
                    <PlayerChat chat={context!.teamsChat.easternIslandChat} currentNation={currentNation()!} recipient={"EasternIsland"} />
                </Show>
            </div>
        </Show>
    );
}
