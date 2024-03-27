import { Show, useContext } from "solid-js";
import { PlayerLobbyContext } from "../PlayerLobbyContext";
import Chat from "@components/Chat";

export default function PlayerLobbyChat() {
    const context = useContext(PlayerLobbyContext);

    const currentNation = () => context?.currentGame()?.nation;

    return (
        <Show when={!!currentNation() && !!context}>
            <div class="grid grid-cols-3 h-full">
                <Chat
                    messages={context!.teamsChat.gameMasterChat() ?? []}
                    currentUser={currentNation()!}
                    title="Game Master"
                    key="CurrentPlayerChatWithGameMaster"
                    onNewMessage={(message) => {
                        return context?.teamsChat.onNewMessageFromCurrentPlayerToOtherPlayer("GameMaster", message);
                    }}
                />
                <Show when={currentNation() !== "EarthNation"}>
                    <Chat
                        messages={context!.teamsChat.earthNationChat() ?? []}
                        currentUser={currentNation()!}
                        title={currentNation()!}
                        key="CurrentPlayerChatWithEarthNation"
                        onNewMessage={(message) => {
                            return context?.teamsChat.onNewMessageFromCurrentPlayerToOtherPlayer(
                                "EarthNation",
                                message,
                            );
                        }}
                    />
                </Show>
                <Show when={currentNation() !== "SeaNation"}>
                    <Chat
                        messages={context!.teamsChat.seaNationChat() ?? []}
                        currentUser={currentNation()!}
                        title={currentNation()!}
                        key="CurrentPlayerChatWithSeaNation"
                        onNewMessage={(message) => {
                            return context?.teamsChat.onNewMessageFromCurrentPlayerToOtherPlayer("SeaNation", message);
                        }}
                    />
                </Show>
                <Show when={currentNation() !== "EasternIsland"}>
                    <Chat
                        messages={context!.teamsChat.easternIslandChat() ?? []}
                        currentUser={currentNation()!}
                        title={currentNation()!}
                        key="CurrentPlayerChatWithEasternIsland"
                        onNewMessage={(message) => {
                            return context?.teamsChat.onNewMessageFromCurrentPlayerToOtherPlayer(
                                "EasternIsland",
                                message,
                            );
                        }}
                    />
                </Show>
            </div>
        </Show>
    );
}
