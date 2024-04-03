import { ChatMessageDbModel, EarthSeaGamePlayerDb, TablesOfDb } from "@lib/DB";
import { SignalREvents, SignalRMethods } from "@lib/SignalR";
import { ENationSchema, JoinGameOutput } from "@lib/schemas/GameLobbySchema";
import { ChatMessageSender } from "@lib/schemas/MessageSchema";
import { HubConnection } from "@microsoft/signalr";
import { Resource, createEffect, createMemo, createResource, onCleanup } from "solid-js";

interface TeamsChatHandler {
    chat: Resource<ChatMessageDbModel[]>;
    insertMessageInDb: (message: ChatMessageDbModel) => Promise<void>;
}

export interface PlayerChatWithOtherPlayersResources {
    earthNationChat: Resource<ChatMessageDbModel[]>;
    seaNationChat: Resource<ChatMessageDbModel[]>;
    easternIslandChat: Resource<ChatMessageDbModel[]>;
    gameMasterChat: Resource<ChatMessageDbModel[]>;
    onNewMessageFromCurrentPlayerToOtherPlayer: (
        recipientPlayer: ChatMessageSender,
        message: string,
    ) => Promise<void> | undefined;
}

function createChatResourceFromTable(
    dexieDb: () => EarthSeaGamePlayerDb,
    table: keyof TablesOfDb<EarthSeaGamePlayerDb>,
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

export function createPlayerChatResources(
    signalRConnection: Resource<HubConnection>,
    currentGame: () => JoinGameOutput,
): PlayerChatWithOtherPlayersResources {
    const dexieDb = createMemo(() => {
        const db = new EarthSeaGamePlayerDb();
        return db;
    });

    onCleanup(() => {
        dexieDb().close();
    });

    const gameMasterChatHandler = createChatResourceFromTable(dexieDb, "gameMasterChat");
    const earthNationChatHandler = createChatResourceFromTable(dexieDb, "earthNationChat");
    const easternIslandChatHandler = createChatResourceFromTable(dexieDb, "easternIslandChat");
    const seaNationChatHandler = createChatResourceFromTable(dexieDb, "seaNationChat");

    const createMessageDbModelFromMessage = (
        otherPlayer: ChatMessageSender,
        otherPlayerType: "Recipient" | "Sender",
        message: string,
    ) => {
        const currentNation = currentGame()?.nation;
        if (!currentNation) {
            return;
        }
        const sender = otherPlayerType === "Sender" ? otherPlayer : currentNation;
        const recipient = otherPlayerType === "Recipient" ? otherPlayer : currentNation;

        const newMessageModel: ChatMessageDbModel = {
            gameMaster: currentGame()?.gameMaster ?? "",
            content: message,
            date: new Date(),
            recipient: recipient,
            sender: sender,
        };

        switch (otherPlayer) {
            case "EarthNation":
                return earthNationChatHandler.insertMessageInDb(newMessageModel);
            case "EasternIsland":
                return easternIslandChatHandler.insertMessageInDb(newMessageModel);
            case "SeaNation":
                return seaNationChatHandler.insertMessageInDb(newMessageModel);
            case "GameMaster":
                return gameMasterChatHandler.insertMessageInDb(newMessageModel);
        }
    };

    const onGameMasterSentToPlayer = (message: string) => {
        return createMessageDbModelFromMessage("GameMaster", "Sender", message);
    };

    /**
     * Called when a player sends a message to a different player, what happens here in reality is the message is sent to a group
     * The group has always three members : The sending player, the recipient player, the game master
     * @param sendingPlayer Player who sent the message might be the current player
     * @param _ recipient player, ignored here because if the sendingPlayer is not the current player then the current player is the recipient
     * and if the sending player is the current player then the message is already in the db because it was written when the message was sent
     * @param message content of the message
     * @returns
     */
    const onPlayerSentToOtherPlayer = (sendingPlayer: string, _: string, message: string) => {
        console.log(sendingPlayer);
        const isValidSendingPlayer = ENationSchema.safeParse(sendingPlayer);
        if (!isValidSendingPlayer.success) {
            console.error(isValidSendingPlayer.error);
            return;
        }
        const sendingNation = isValidSendingPlayer.data;

        if (sendingNation === currentGame()?.nation) {
            return;
        }

        return createMessageDbModelFromMessage(sendingNation, "Sender", message);
    };

    createEffect(() => {
        signalRConnection()?.on(SignalREvents.gameMasterSentToPlayer, onGameMasterSentToPlayer);
        signalRConnection()?.on(SignalREvents.playerSentToOtherPlayer, onPlayerSentToOtherPlayer);
    });

    const onNewMessageFromCurrentPlayerToOtherPlayer = async (recipientPlayer: ChatMessageSender, message: string) => {
        await createMessageDbModelFromMessage(recipientPlayer, "Recipient", message);
        return signalRConnection()?.send(SignalRMethods.playerSendToOtherPlayer, recipientPlayer, message);
    };

    return {
        earthNationChat: earthNationChatHandler.chat,
        easternIslandChat: easternIslandChatHandler.chat,
        seaNationChat: seaNationChatHandler.chat,
        gameMasterChat: gameMasterChatHandler.chat,
        onNewMessageFromCurrentPlayerToOtherPlayer,
    };
}
