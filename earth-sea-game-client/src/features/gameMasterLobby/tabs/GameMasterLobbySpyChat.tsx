import { Show, useContext } from "solid-js";
import { GameMasterLobbyContext } from "../GameMasterLobbyContext";
import Chat from "@components/Chat";
export default function GameMasterLobbySpyChat() {
    const context = useContext(GameMasterLobbyContext);

    return (
        <Show when={!!context}>
            <div class="grid grid-cols-3 h-full">
                <Chat
                    key="GameMasterChatSpyEarthAndEastern"
                    currentUser="EarthNation"
                    messages={context!.spyChat.earthEasternSpyChat() ?? []}
                />
                <Chat
                    key="GameMasterChatSpyEarthAndSea"
                    currentUser="SeaNation"
                    messages={context!.spyChat.earthSeaSpyChat() ?? []}
                />
                <Chat
                    key="GameMasterChatSpyEasternAndSea"
                    currentUser="EasternIsland"
                    messages={context!.spyChat.seaEasternSpyChat() ?? []}
                />
            </div>
        </Show>
    );
}
