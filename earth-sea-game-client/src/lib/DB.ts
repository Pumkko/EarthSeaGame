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
            earthNationChat: "++id",
            seaNationChat: "++id",
            easternIslandChat: "++id",
            earthNationEasternIslandSpyChat: "++id",
            earthNationSeaNationSpyChat: "++id",
            seaNationEasternIslandSpyChat: "++id",
        });
    }

    clearGameTable() {
        return Promise.allSettled([
            this.earthNationChat.clear(),
            this.seaNationChat.clear(),
            this.easternIslandChat.clear(),
            this.earthNationEasternIslandSpyChat.clear(),
            this.earthNationSeaNationSpyChat.clear(),
            this.seaNationEasternIslandSpyChat.clear(),
        ]);
    }
}

export class EarthSeaGamePlayerDb extends Dexie {
    // One of this tables is going to be empty for each player, for the sea nation player the sea nation table will be empty
    // But it's okay having those table declared greatly simplifies the managment of the db
    earthNationChat!: Table<ChatMessageDbModel>;
    seaNationChat!: Table<ChatMessageDbModel>;
    easternIslandChat!: Table<ChatMessageDbModel>;

    gameMasterChat!: Table<ChatMessageDbModel>;

    constructor() {
        super(DbNames.playerDb);
        this.version(1).stores({
            earthNationChat: "++id",
            seaNationChat: "++id",
            easternIslandChat: "++id",
            gameMasterChat: "++id",
        });
    }

    clearGameTable() {
        return Promise.allSettled([
            this.earthNationChat.clear(),
            this.seaNationChat.clear(),
            this.easternIslandChat.clear(),
            this.gameMasterChat.clear(),
        ]);
    }
}
