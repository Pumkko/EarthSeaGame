import { Show, useContext } from "solid-js";
import { GameMasterLobbyContext } from "../../GameMasterLobbyContext";
import Chat from "@components/Chat";
export default function GameMasterLobbySpyChat() {
    const context = useContext(GameMasterLobbyContext);

    return (
        <Show when={!!context}>
            <div class="grid grid-cols-3 h-full">
                <Chat
                    key="GameMasterChatEarthNation"
                    currentUser="EarthNation"
                    title="Spy Earth and Eastern"
                    messages={context!.spyChat.earthEasternSpyChat() ?? []}
                />
                <Chat
                    key="GameMasterChatSeaNation"
                    currentUser="SeaNation"
                    title="Spy Earth and Sea"
                    messages={context!.spyChat.earthSeaSpyChat() ?? []}
                />
                <Chat
                    key="GameMasterChatEasternIsland"
                    currentUser="EasternIsland"
                    title="Spy Sea and Eastern"
                    messages={context!.spyChat.seaEasternSpyChat() ?? []}
                />
            </div>
        </Show>
    );
}
