import Chat from "@components/Chat";
import { createSignal, useContext } from "solid-js";
import { GameMasterLobbyContext } from "../GameMasterLobbyContext";
import { ChatMessageModel } from "@lib/schemas/MessageSchema";

export default function GameMasterLobbyTeamsChat() {
    const context = useContext(GameMasterLobbyContext)!;

    const [earthNationMessages, setEarthNationMessages] = createSignal<ChatMessageModel[]>([]);

    context.signalRConnection()?.on("EarthNationMessage", (message) => {
        setEarthNationMessages((m) => [
            ...m,
            {
                content: message,
                date: new Date(),
                recipient: "GameMaster",
                sender: "EarthNation",
            },
        ]);
    });

    return (
        <div class="grid grid-cols-3 h-full">
            <Chat
                currentUser="GameMaster"
                messages={earthNationMessages()}
                onNewMessage={(message) => {
                    setEarthNationMessages((m) => [
                        ...m,
                        {
                            content: message,
                            date: new Date(),
                            recipient: "EarthNation",
                            sender: "GameMaster",
                        },
                    ]);
                    return context.signalRConnection()!.send("SendToPlayer", "EarthNation", message);
                }}
            />
            <div class="border-x-2">Two</div>
            <div>Three</div>
        </div>
    );
}
