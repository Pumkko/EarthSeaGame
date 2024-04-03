import Chat from "@components/Chat";
import { Show, onMount } from "solid-js";
import { useLanguage } from "../../LanguageProvider";
import { useAuthenticatedGameMasterLobbyContext } from "../GameMasterLobbyContext";

export default function GameMasterLobbyTeamsChat() {
    const context = useAuthenticatedGameMasterLobbyContext();

    const language = useLanguage();

    onMount(() => {
        context.setNumberOfUnreadTeamsMessages(0);
    });

    return (
        <Show when={!!context}>
            <div class="grid grid-cols-3 h-full">
                <Chat
                    key="GameMasterChatEarthNation"
                    currentUser="GameMaster"
                    title={language().messageSender.EarthNation()}
                    messages={context.teamsChat.earthNationChat() ?? []}
                    onNewMessage={(message) => {
                        return context.teamsChat.onNewMessageFromGameMasterToPlayer("EarthNation", message);
                    }}
                />
                <Chat
                    key="GameMasterChatSeaNation"
                    currentUser="GameMaster"
                    title={language().messageSender.SeaNation()}
                    messages={context.teamsChat.seaNationChat() ?? []}
                    onNewMessage={(message) => {
                        return context.teamsChat.onNewMessageFromGameMasterToPlayer("SeaNation", message);
                    }}
                />
                <Chat
                    key="GameMasterChatEasternIsland"
                    currentUser="GameMaster"
                    title={language().messageSender.EasternIsland()}
                    messages={context.teamsChat.easternIslandChat() ?? []}
                    onNewMessage={(message) => {
                        return context.teamsChat.onNewMessageFromGameMasterToPlayer("EasternIsland", message);
                    }}
                />
            </div>
        </Show>
    );
}
