import { ChatMessageSender } from "@lib/schemas/MessageSchema";

type MessageSenderToLanguage = {
    [key in ChatMessageSender]: string;
};

type TimelineEventI18n = {
    event: string;
    details: string;
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
            collapse: TimelineEventI18n;
            civilWar: TimelineEventI18n;
            seaNationProtectionTreaty: TimelineEventI18n;
            warlordEraBegins: TimelineEventI18n;
            greatWarBegins: TimelineEventI18n;
            atomicBombings: TimelineEventI18n;
            greatWarEnds: TimelineEventI18n;
            secondCivilWarBegins: TimelineEventI18n;
            rebirthOfTheNation: TimelineEventI18n;
            firstStraitCrisis: TimelineEventI18n;
            southerNationBorderConflict: TimelineEventI18n;
            treatyOfUnity: TimelineEventI18n;
            cohabitationTreaty: TimelineEventI18n;
            southernNationIndependence: TimelineEventI18n;
            secondStraitCrisis: TimelineEventI18n;
            firstNuclearReactor: TimelineEventI18n;
            sinkingOfTheNepture: TimelineEventI18n;
        };
    };
}
