import Chat from "@components/Chat";
import { Show, onMount } from "solid-js";
import { useAuthenticatedGameMasterLobbyContext } from "../GameMasterLobbyContext";
export default function GameMasterLobbySpyChat() {
    const context = useAuthenticatedGameMasterLobbyContext();

    onMount(() => {
        context.setNumberOfUnreadSpyMessages(0);
    });

    return (
        <Show when={!!context}>
            <div class="grid grid-cols-3 h-full">
                <Chat
                    key="GameMasterChatSpyEarthAndEastern"
                    currentUser="EarthNation"
                    messages={context.spyChat.earthEasternSpyChat() ?? []}
                />
                <Chat
                    key="GameMasterChatSpyEarthAndSea"
                    currentUser="SeaNation"
                    messages={context.spyChat.earthSeaSpyChat() ?? []}
                />
                <Chat
                    key="GameMasterChatSpyEasternAndSea"
                    currentUser="EasternIsland"
                    messages={context.spyChat.seaEasternSpyChat() ?? []}
                />
            </div>
        </Show>
    );
}
