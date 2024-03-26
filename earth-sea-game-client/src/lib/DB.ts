import Dexie, { Table } from "dexie";
import { ChatMessageModel } from "./schemas/MessageSchema";

export type TablesOfDb<T extends Dexie> = {
    [key in keyof T as T[key] extends Table<unknown> ? key : never]: T[key];
};

export type ChatMessageDbModel = ChatMessageModel & {
    id?: number;
    gameMaster: string;
};

export const DbNames = {
    gameMasterDb: "earthSeaGameDb:GameMasterDb",
    playerDb: "earthSeaGameDb:PlayerDb",
};

export class EarthSeaGameMasterDb extends Dexie {
    earthNationChat!: Table<ChatMessageDbModel>;
    seaNationChat!: Table<ChatMessageDbModel>;
    easternIslandChat!: Table<ChatMessageDbModel>;

    earthNationEasternIslandSpyChat!: Table<ChatMessageDbModel>;
    earthNationSeaNationSpyChat!: Table<ChatMessageDbModel>;
    seaNationEasternIslandSpyChat!: Table<ChatMessageDbModel>;

    constructor() {
        super(DbNames.gameMasterDb);
        this.version(1).stores({
            messages: "++id", // Primary key and indexed props
        });
    }
}

export class EarthSeaGamePlayerDb extends Dexie {
    // The player might play the Earth Nation and its recipients will be sea, eastern and game master
    // but the player might also be the eastern player so its recipient will be sea and earth and game master
    // that's why the variables here have a vague name (except the game master)
    firstOtherPlayerChat!: Table<ChatMessageDbModel>;
    secondOtherPlayerChat!: Table<ChatMessageDbModel>;
    gameMasterChat!: Table<ChatMessageDbModel>;

    constructor() {
        super(DbNames.playerDb);
        this.version(1).stores({
            messages: "++id", // Primary key and indexed props
        });
    }
}
