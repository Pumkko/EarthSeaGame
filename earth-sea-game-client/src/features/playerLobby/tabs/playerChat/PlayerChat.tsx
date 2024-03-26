import Chat from "@components/Chat";
import { ChatMessageDbModel, EarthSeaGamePlayerDb } from "@lib/DB";
import { ENation } from "@lib/schemas/GameLobbySchema";
import { ChatMessageSender } from "@lib/schemas/MessageSchema";
import { useContext, createMemo, createResource, createEffect } from "solid-js";
import { PlayerLobbyContext } from "../../PlayerLobbyContext";
import { SignalRMethods } from "@lib/SignalR";

interface PlayerChatProps {
    recipient: ChatMessageSender;
    currentNation: ENation;
    isMiddleChat?: boolean;
}

export default function PlayerChat(props: PlayerChatProps) {
    const context = useContext(PlayerLobbyContext);

    const dexieDb = createMemo(() => {
        const db = new EarthSeaGamePlayerDb();
        return db;
    });

    const [messages, { mutate }] = createResource(dexieDb, async (db) => {
        return await db.gameMasterChat.toArray();
    });

    const gameMaster = () => context?.currentGame()?.gameMaster;

    const onNewMessage = async (message: string, sender: ChatMessageSender, recipient: ChatMessageSender) => {
        const newMessageModel: ChatMessageDbModel = {
            gameMaster: gameMaster() ?? "",
            content: message,
            date: new Date(),
            recipient: recipient,
            sender: sender,
        };

        const newId = (await dexieDb().gameMasterChat.add(newMessageModel)) as number;

        mutate((m) => {
            if (!m) {
                return [];
            }

            return [
                ...m,
                {
                    ...newMessageModel,
                    id: newId,
                },
            ];
        });
    };

    const onNewMessageFromPlayer = (message: string) => {
        return onNewMessage(message, props.recipient, props.currentNation);
    };

    const onNewMessageFromRecipient = async (message: string) => {
        await onNewMessage(message, props.currentNation, props.recipient);

        if (props.recipient === "GameMaster") {
            return context?.signalRConnection()?.send(SignalRMethods.SendToGameMaster, message);
        } else {
            return context?.signalRConnection()?.send(SignalRMethods.PlayerSendToOtherPlayer, props.recipient, message);
        }
    };

    createEffect(() => {
        const messageMethodName = `${props.recipient}Message`;
        context?.signalRConnection()?.on(messageMethodName, onNewMessageFromPlayer);
    });

    return (
        <Chat
            isMiddleChat={props.isMiddleChat ?? false}
            currentUser={props.currentNation}
            recipient={props.recipient}
            messages={messages() ?? []}
            onNewMessage={onNewMessageFromRecipient}
        />
    );
}
