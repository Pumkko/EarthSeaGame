import Chat from "@components/Chat";
import { Show, useContext } from "solid-js";
import { useLanguage } from "../../LanguageProvider";
import { PlayerLobbyContext } from "../PlayerLobbyContext";

export default function PlayerLobbyChat() {
    const context = useContext(PlayerLobbyContext);

    const currentNation = () => context?.currentGame()?.nation;

    const language = useLanguage();

    return (
        <Show when={!!currentNation() && !!context}>
            <div class="grid grid-cols-3 h-full">
                <Chat
                    messages={context!.teamsChat.gameMasterChat() ?? []}
                    currentUser={currentNation()!}
                    title={language().messageSender.GameMaster()}
                    key="CurrentPlayerChatWithGameMaster"
                    onNewMessage={(message) => {
                        return context?.teamsChat.onNewMessageFromCurrentPlayerToOtherPlayer("GameMaster", message);
                    }}
                />
                <Show when={currentNation() !== "EarthNation"}>
                    <Chat
                        messages={context!.teamsChat.earthNationChat() ?? []}
                        currentUser={currentNation()!}
                        title={language().messageSender.EarthNation()}
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
                        title={language().messageSender.SeaNation()}
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
                        title={language().messageSender.EasternIsland()}
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
