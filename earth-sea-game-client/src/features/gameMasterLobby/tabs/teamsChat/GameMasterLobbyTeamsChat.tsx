import { Show, useContext } from "solid-js";
import { GameMasterLobbyContext } from "../../GameMasterLobbyContext";
import Chat from "@components/Chat";

export default function GameMasterLobbyTeamsChat() {
    const context = useContext(GameMasterLobbyContext);

    return (
        <Show when={!!context}>
            <div class="grid grid-cols-3 h-full">
                <Chat
                    key="GameMasterChatEarthNation"
                    currentUser="GameMaster"
                    title="Earth Nation"
                    messages={context!.teamsChat.earthNationChat() ?? []}
                    onNewMessage={(message) => {
                        return context?.teamsChat.onNewMessageFromGameMasterToPlayer("EarthNation", message);
                    }}
                />
                <Chat
                    key="GameMasterChatSeaNation"
                    currentUser="GameMaster"
                    title="Sea Nation"
                    messages={context!.teamsChat.seaNationChat() ?? []}
                    onNewMessage={(message) => {
                        return context?.teamsChat.onNewMessageFromGameMasterToPlayer("SeaNation", message);
                    }}
                />
                <Chat
                    key="GameMasterChatEasternIsland"
                    currentUser="GameMaster"
                    title="Eastern Island"
                    messages={context!.teamsChat.easternIslandChat() ?? []}
                    onNewMessage={(message) => {
                        return context?.teamsChat.onNewMessageFromGameMasterToPlayer("EasternIsland", message);
                    }}
                />
            </div>
        </Show>
    );
}
