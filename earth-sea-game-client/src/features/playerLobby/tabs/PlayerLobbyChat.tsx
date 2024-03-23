import Chat from "@components/Chat";
import { createSignal, useContext } from "solid-js";
import { PlayerLobbyContext } from "../PlayerLobbyContext";
import { ChatMessageModel } from "@lib/schemas/MessageSchema";

export default function PlayerLobbyChat() {
    const context = useContext(PlayerLobbyContext);

    const [messages, setMessages] = createSignal<ChatMessageModel[]>([]);

    context?.signalRConnection()?.on("GameMasterMessage", (message) => {
        setMessages((m) => [
            ...m,
            {
                content: message,
                date: new Date(),
                recipient: context?.currentGame()!.nation,
                sender: "GameMaster",
            },
        ]);
    });

    return (
        <div class="grid grid-cols-3 h-full">
            <Chat
                currentUser={context!.currentGame()!.nation}
                recipient="GameMaster"
                messages={messages()}
                onNewMessage={(message) => {
                    setMessages((m) => [
                        ...m,
                        {
                            content: message,
                            date: new Date(),
                            recipient: "GameMaster",
                            sender: context!.currentGame()!.nation,
                        },
                    ]);
                    return context?.signalRConnection()?.send("SendToGameMaster", message);
                }}
            />
            <div class="border-x-2">Two</div>
            <div>Three</div>
        </div>
    );
}
