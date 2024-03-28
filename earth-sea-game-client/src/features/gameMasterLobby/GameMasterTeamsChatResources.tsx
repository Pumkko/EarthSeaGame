import { ChatMessageDbModel, EarthSeaGameMasterDb, TablesOfDb } from "@lib/DB";
import { SignalREvents, SignalRMethods } from "@lib/SignalR";
import { ENation, ENationSchema } from "@lib/schemas/GameLobbySchema";
import { ChatMessageSender } from "@lib/schemas/MessageSchema";
import { HubConnection } from "@microsoft/signalr";
import { Resource, createEffect, createMemo, createResource, onCleanup } from "solid-js";

interface TeamsChatHandler {
    chat: Resource<ChatMessageDbModel[]>;
    insertMessageInDb: (message: ChatMessageDbModel) => Promise<void>;
}

export interface GameMasterChatWithPlayerResources {
    earthNationChat: Resource<ChatMessageDbModel[]>;
    seaNationChat: Resource<ChatMessageDbModel[]>;
    easternIslandChat: Resource<ChatMessageDbModel[]>;
    onNewMessageFromGameMasterToPlayer: (playerNation: ENation, message: string) => Promise<void> | undefined;
}

function createChatResourceFromTable(
    dexieDb: () => EarthSeaGameMasterDb,
    table: keyof TablesOfDb<EarthSeaGameMasterDb>,
): TeamsChatHandler {
    const [chat, { mutate }] = createResource(dexieDb, async (db) => {
        return await db[table].toArray();
    });

    const insertMessageInDb = async (message: ChatMessageDbModel) => {
        const newId = (await dexieDb()[table].add(message)) as number;

        mutate((m) => {
            if (!m) {
                return [];
            }

            return [
                ...m,
                {
                    ...message,
                    id: newId,
                },
            ];
        });
    };

    return {
        chat,
        insertMessageInDb,
    };
}

export function createGameMasterTeamsChatResources(
    signalRConnection: () => HubConnection | undefined,
    gameMaster: () => string | undefined,
): GameMasterChatWithPlayerResources {
    const dexieDb = createMemo(() => {
        const db = new EarthSeaGameMasterDb();
        return db;
    });

    onCleanup(() => {
        dexieDb().close();
    });

    const earthNationChatHandler = createChatResourceFromTable(dexieDb, "earthNationChat");
    const easternIslandChatHandler = createChatResourceFromTable(dexieDb, "easternIslandChat");
    const seaNationChatHandler = createChatResourceFromTable(dexieDb, "seaNationChat");

    const createMessageDbModelFromMessage = (
        sender: ChatMessageSender,
        recipient: ChatMessageSender,
        message: string,
    ) => {
        if (sender === recipient) {
            console.error("Message sender and recipient are identical");
        }

        const newMessageModel: ChatMessageDbModel = {
            gameMaster: gameMaster() ?? "",
            content: message,
            date: new Date(),
            recipient: recipient,
            sender: sender,
        };

        const relevantChat = recipient !== "GameMaster" ? recipient : sender;

        switch (relevantChat) {
            case "EarthNation":
                return earthNationChatHandler.insertMessageInDb(newMessageModel);
            case "EasternIsland":
                return easternIslandChatHandler.insertMessageInDb(newMessageModel);
            case "SeaNation":
                return seaNationChatHandler.insertMessageInDb(newMessageModel);
        }
    };

    const onPlayerSentToGameMaster = (nation: string, message: string) => {
        const isValidNation = ENationSchema.safeParse(nation);
        if (!isValidNation.success) {
            console.error(isValidNation.error);
            return;
        }

        const enation = isValidNation.data;
        createMessageDbModelFromMessage(enation, "GameMaster", message);
    };

    const onNewMessageFromGameMasterToPlayer = async (playerNation: ENation, message: string) => {
        await createMessageDbModelFromMessage("GameMaster", playerNation, message);
        return signalRConnection()?.send(SignalRMethods.gameMasterSendToPlayer, playerNation, message);
    };

    createEffect(() => {
        signalRConnection()?.on(SignalREvents.playerSentToGameMaster, onPlayerSentToGameMaster);
    });

    return {
        earthNationChat: earthNationChatHandler.chat,
        easternIslandChat: easternIslandChatHandler.chat,
        seaNationChat: seaNationChatHandler.chat,
        onNewMessageFromGameMasterToPlayer,
    };
}
