import Dexie, { Table } from "dexie";
import { ChatMessageModel } from "./schemas/MessageSchema";

export type ChatMessageDbModel = ChatMessageModel & {
    id?: number;
    gameMaster: string;
};

export class EarthSeaGameDexieDb extends Dexie {
    messages!: Table<ChatMessageDbModel>;

    constructor(dbType: string) {
        super(`earthSeaGameDb:${dbType}`);
        this.version(1).stores({
            messages: "++id", // Primary key and indexed props
        });
    }
}
