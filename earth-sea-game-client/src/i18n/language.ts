import { ChatMessageSender } from "@lib/schemas/MessageSchema";

type MessageSenderToLanguage = {
    [key in ChatMessageSender]: string;
};

export interface Language {
    gameTitle: string;
    startingMenu: {
        joinGameButton: string;
        myGameButton: string;
    };
    messageSender: MessageSenderToLanguage;
    playerLobby: {
        homeTab: string;
        chatTab: string;
    };
    gameMasterLobby: {
        homeTab: string;
        spyChatTab: string;
        teamsChatTab: string;
    };
    timelines: {
        earthNation: {
            earthNationCollapse: string;
        };
    };
}
