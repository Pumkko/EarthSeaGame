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
            collapse: string;
            civilWar: string;
            seaNationProtectionTreaty: string;
            warlordEraBegins: string;
            greatWarBegins: string;
            atomicBombings: string;
            greatWarEnds: string;
            secondCivilWarBegins: string;
            rebirthOfTheNation: string;
            firstStraitCrisis: string;
            southerNationBorderConflict: string;
            treatyOfUnity: string;
            cohabitationTreaty: string;
            southernNationIndependence: string;
            secondStraitCrisis: string;
            firstNuclearReactor: string;
            sinkingOfTheNepture: string;
        };
    };
}
