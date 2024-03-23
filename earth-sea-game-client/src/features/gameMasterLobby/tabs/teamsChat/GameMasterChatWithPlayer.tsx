import { ENation } from "@lib/schemas/GameLobbySchema";
import { GameMasterLobbyContext } from "../../GameMasterLobbyContext";
import Chat from "@components/Chat";
import { ChatMessageModel } from "@lib/schemas/MessageSchema";
import { useContext, createSignal, createEffect } from "solid-js";

interface GameMasterChatWithPlayerProps {
    nation: ENation;
}

export default function GameMasterChatWithPlayer(props: GameMasterChatWithPlayerProps) {
    const context = useContext(GameMasterLobbyContext);
    const [playerMessages, setPlayerMessages] = createSignal<ChatMessageModel[]>([]);
    const onNewMessageFromPlayer = (message: string) => {
        setPlayerMessages((m) => [
            ...m,
            {
                content: message,
                date: new Date(),
                recipient: "GameMaster",
                sender: props.nation,
            },
        ]);
    };

    createEffect(() => {
        const messageMethodName = `${props.nation}Message`;
        context?.signalRConnection()?.on(messageMethodName, onNewMessageFromPlayer);
    });

    return (
        <Chat
            currentUser="GameMaster"
            messages={playerMessages()}
            onNewMessage={(message) => {
                setPlayerMessages((m) => [
                    ...m,
                    {
                        content: message,
                        date: new Date(),
                        recipient: props.nation,
                        sender: "GameMaster",
                    },
                ]);
                return context?.signalRConnection()?.send("SendToPlayer", "EarthNation", message);
            }}
        />
    );
}
