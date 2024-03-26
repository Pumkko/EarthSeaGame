import { Show, useContext } from "solid-js";
import GameMasterChatWithPlayer from "./GameMasterChatWithPlayer";
import { GameMasterLobbyContext } from "../../GameMasterLobbyContext";

export default function GameMasterLobbyTeamsChat() {
    const context = useContext(GameMasterLobbyContext);

    return (
        <Show when={!!context}>
            <div class="grid grid-cols-3 h-full">
                <GameMasterChatWithPlayer nation="EarthNation" chat={context!.teamsChat.earthNationChat} />
                <GameMasterChatWithPlayer isMiddleChat={true} nation="SeaNation" chat={context!.teamsChat.seaNationChat} />
                <GameMasterChatWithPlayer nation="EasternIsland" chat={context!.teamsChat.easternIslandChat} />
            </div>
        </Show>
    );
}
