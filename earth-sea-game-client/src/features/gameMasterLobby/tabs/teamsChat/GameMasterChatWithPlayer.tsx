import { ENation } from "@lib/schemas/GameLobbySchema";
import { GameMasterLobbyContext } from "../../GameMasterLobbyContext";
import Chat from "@components/Chat";
import { ChatMessageSender } from "@lib/schemas/MessageSchema";
import { useContext, createEffect, createMemo, createResource } from "solid-js";
import { ChatMessageDbModel, EarthSeaGameDexieDb } from "@lib/DB";

interface GameMasterChatWithPlayerProps {
    nation: ENation;
}

export default function GameMasterChatWithPlayer(props: GameMasterChatWithPlayerProps) {
    const context = useContext(GameMasterLobbyContext);

    const dexieDb = createMemo(() => {
        const db = new EarthSeaGameDexieDb(`gameMasterTo${props.nation}Db`);
        return db;
    });

    const [messages, { mutate }] = createResource(dexieDb, async (db) => {
        return await db.messages.toArray();
    });

    const gameMaster = () => context?.query.data?.gameLobby.gameMaster;

    const onNewMessage = async (message: string, sender: ChatMessageSender, recipient: ChatMessageSender) => {
        const newMessageModel: ChatMessageDbModel = {
            gameMaster: gameMaster() ?? "",
            content: message,
            date: new Date(),
            recipient: recipient,
            sender: sender,
        };

        const newId = (await dexieDb().messages.add(newMessageModel)) as number;

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
        return onNewMessage(message, props.nation, "GameMaster");
    };

    const onNewMessageFromGameMaster = async (message: string) => {
        await onNewMessage(message, "GameMaster", props.nation);
        return context?.signalRConnection()?.send("SendToPlayer", "EarthNation", message);
    };

    createEffect(() => {
        const messageMethodName = `${props.nation}Message`;
        context?.signalRConnection()?.on(messageMethodName, onNewMessageFromPlayer);
    });

    return <Chat currentUser="GameMaster" recipient={props.nation} messages={messages() ?? []} onNewMessage={onNewMessageFromGameMaster} />;
}
