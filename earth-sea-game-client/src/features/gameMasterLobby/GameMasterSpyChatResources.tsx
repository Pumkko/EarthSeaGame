import { ChatMessageDbModel, EarthSeaGameMasterDb, TablesOfDb } from "@lib/DB";
import { SignalREvents } from "@lib/SignalR";
import { ENation, ENationSchema, SenderAndRecipientGroup } from "@lib/schemas/GameLobbySchema";
import { HubConnection } from "@microsoft/signalr";
import { Resource, createEffect, createMemo, createResource } from "solid-js";

interface TeamsChatHandler {
    chat: Resource<ChatMessageDbModel[]>;
    insertMessageInDb: (message: ChatMessageDbModel) => Promise<void>;
}

export interface GameMasterSpyChatResources {
    earthSeaSpyChat: Resource<ChatMessageDbModel[]>;
    earthEasternSpyChat: Resource<ChatMessageDbModel[]>;
    seaEasternSpyChat: Resource<ChatMessageDbModel[]>;
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

type SenderAndRecipientMessageToGroup = {
    [nation in ENation]: {
        [otherNation in Exclude<ENation, nation>]: SenderAndRecipientGroup;
    };
};

const senderAndRecipientMessageToGroup: SenderAndRecipientMessageToGroup = {
    EarthNation: {
        EasternIsland: "EarthEasternGroup",
        SeaNation: "EarthSeaGroup",
    },
    EasternIsland: {
        EarthNation: "EarthEasternGroup",
        SeaNation: "SeaEasternGroup",
    },
    SeaNation: {
        EarthNation: "EarthSeaGroup",
        EasternIsland: "SeaEasternGroup",
    },
};

function isRecipientOtherNation<TSender extends ENation>(
    nation: TSender,
    otherNation: ENation,
): otherNation is Exclude<ENation, TSender> {
    return nation !== otherNation;
}

export function createGameMasterSpyChatResources(
    signalRConnection: () => HubConnection | undefined,
    gameMaster: () => string | undefined,
): GameMasterSpyChatResources {
    const dexieDb = createMemo(() => {
        const db = new EarthSeaGameMasterDb();
        return db;
    });

    const earthSeaSpyChat = createChatResourceFromTable(dexieDb, "earthNationSeaNationSpyChat");
    const earthEasternSpyChat = createChatResourceFromTable(dexieDb, "earthNationEasternIslandSpyChat");
    const seaEasternSpyChat = createChatResourceFromTable(dexieDb, "seaNationEasternIslandSpyChat");

    const createMessageDbModelFromMessage = <TSender extends ENation, TRecipient extends Exclude<ENation, TSender>>(
        sender: TSender,
        recipient: TRecipient,
        message: string,
    ) => {
        const newMessageModel: ChatMessageDbModel = {
            gameMaster: gameMaster() ?? "",
            content: message,
            date: new Date(),
            recipient: recipient,
            sender: sender,
        };

        const relevantChat = senderAndRecipientMessageToGroup[sender][recipient];

        switch (relevantChat) {
            case "EarthEasternGroup":
                return earthEasternSpyChat.insertMessageInDb(newMessageModel);
            case "EarthSeaGroup":
                return earthSeaSpyChat.insertMessageInDb(newMessageModel);
            case "SeaEasternGroup":
                return seaEasternSpyChat.insertMessageInDb(newMessageModel);
        }
    };

    const onPlayerSentToOtherPlayer = (sendingPlayer: string, recipientPlayer: string, message: string) => {
        const isValidSendingPlayer = ENationSchema.safeParse(sendingPlayer);
        if (!isValidSendingPlayer.success) {
            console.error(isValidSendingPlayer.error);
            return;
        }

        const isValidRecipientPlayer = ENationSchema.safeParse(recipientPlayer);
        if (!isValidRecipientPlayer.success) {
            console.error(isValidRecipientPlayer.error);
            return;
        }
        const sendingNation = isValidSendingPlayer.data;
        const recipientNation = isValidRecipientPlayer.data;

        if (isRecipientOtherNation(sendingNation, recipientNation)) {
            createMessageDbModelFromMessage(sendingNation, recipientNation, message);
        } else {
            console.error("Recipient and sender are identical, they should not be");
        }
    };

    createEffect(() => {
        signalRConnection()?.on(SignalREvents.playerSentToOtherPlayer, onPlayerSentToOtherPlayer);
    });

    return {
        earthEasternSpyChat: earthEasternSpyChat.chat,
        earthSeaSpyChat: earthSeaSpyChat.chat,
        seaEasternSpyChat: seaEasternSpyChat.chat,
    };
}
